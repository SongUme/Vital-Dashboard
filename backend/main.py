import json
import math
import re
from typing import Optional, Any

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware

from db import get_db_connection

app = FastAPI(title="VITAL DB-first Hospital Analytics API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://vital-dashboard-wheat.vercel.app",
    ],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


def clean_value(v: Any):
    if isinstance(v, float) and math.isnan(v):
        return None
    return v


def clean_dict(d: dict):
    return {k: clean_value(v) for k, v in d.items()}


def row_to_dict(row):
    return clean_dict(dict(row)) if row else None


def safe_float(v, default=0.0):
    try:
        if v is None:
            return default
        n = float(v)
        if math.isnan(n):
            return default
        return n
    except Exception:
        return default


def safe_int(v, default=0):
    try:
        if v is None:
            return default
        return int(float(v))
    except Exception:
        return default


def parse_json_array(v):
    if not v:
        return []
    if isinstance(v, list):
        return v
    if isinstance(v, str):
        try:
            parsed = json.loads(v)
            return parsed if isinstance(parsed, list) else []
        except Exception:
            return []
    return []


def resolve_hospital_id(hospital_id: str, district: Optional[str] = None, specialty: Optional[str] = None) -> str:
    """숫자 hospital_id는 그대로 사용하고 h1 같은 더미 ID는 현재 필터 기준 실제 hospital_id로 변환"""
    hospital_id = str(hospital_id)
    if hospital_id.isdigit():
        return hospital_id

    m = re.match(r"^h(\d+)$", hospital_id)
    if not m:
        return hospital_id

    idx = int(m.group(1))
    conn = get_db_connection()
    try:
        query = """
            SELECT hospital_id
            FROM web_hospital_full_ranking
            WHERE 1=1
        """
        params = []
        if district:
            query += " AND district_name = ?"
            params.append(district)
        if specialty:
            query += " AND specialty_name = ?"
            params.append(specialty)
        query += " ORDER BY rank_in_specialty_all_suwon ASC, hospital_name ASC"

        rows = conn.execute(query, params).fetchall()

        if idx < 1 or idx > len(rows):
            rows = conn.execute("""
                SELECT hospital_id
                FROM web_hospital_full_ranking
                ORDER BY specialty_name, rank_in_specialty_all_suwon ASC, hospital_name ASC
            """).fetchall()

        if 1 <= idx <= len(rows):
            return str(rows[idx - 1]["hospital_id"])
        return hospital_id
    finally:
        conn.close()


def build_keyword_cards(keyword_rows):
    positive = []
    negative = []

    for r in keyword_rows:
        name = r.get("keyword") or r.get("name") or ""
        category = r.get("category") or r.get("ipa_quadrant") or "일반"
        mentions = safe_int(r.get("mention_count"))
        sentiment = safe_float(r.get("sentiment_score") or r.get("performance_score"))
        importance = safe_float(r.get("importance_score"))
        performance = safe_float(r.get("performance_score"))
        status = r.get("ipa_quadrant") or "분석"

        item = {
            "name": name,
            "category": category,
            "mentions": mentions,
            "avgMentions": 0,
            "diff": round(importance, 1),
            "sentimentScore": round(sentiment or performance, 1),
            "description": f"{name} 키워드는 {status} 영역으로 분석됩니다."
        }

        if status == "집중개선" or performance < 70:
            item["priority"] = 0 if status == "집중개선" else 1
            negative.append(item)
        if status == "유지강화" or performance >= 70:
            item["priority"] = 0 if status == "유지강화" else 1
            positive.append(item)

    negative = sorted(negative, key=lambda x: (x.get("priority", 9), x["sentimentScore"], -x["mentions"]))[:5]
    positive = sorted(positive, key=lambda x: (x.get("priority", 9), -x["sentimentScore"], -x["mentions"]))[:8]

    for i, item in enumerate(negative, 1):
        item["rank"] = i
    for i, item in enumerate(positive, 1):
        item["rank"] = i

    return positive, negative


def make_actions(insight, weak_keywords, strong_keywords, weak_categories):
    """
    맞춤형 개선 액션 생성 로직

    우선순위
    1. IPA 사분면이 '집중개선'인 키워드
    2. 성과도/감정 점수가 낮은 키워드
    3. 성과 점수가 낮은 카테고리
    4. 강점 키워드는 유지 강화 액션으로 분리
    """
    actions = []

    # 1) 집중 개선 키워드 기반 액션
    for k in weak_keywords[:5]:
        keyword = k.get("name") or ""
        category = k.get("category") or ""
        score = safe_float(k.get("sentimentScore"))
        if not keyword:
            continue

        if "대기" in keyword or "예약" in keyword or "접수" in keyword or "운영" in category:
            actions.append(f"{keyword} 관련 불만이 확인되어 예약·접수·대기 흐름을 우선 점검합니다.")
        elif "설명" in keyword or "상담" in category or "신뢰" in category:
            actions.append(f"{keyword} 관련 평가가 낮아 진료 설명과 상담 응대 방식을 보완합니다.")
        elif "비용" in keyword or "가격" in keyword:
            actions.append(f"{keyword} 관련 불만을 줄이기 위해 진료비와 비급여 항목 안내를 강화합니다.")
        elif "주차" in keyword or "접근" in keyword or "시설" in category:
            actions.append(f"{keyword} 관련 불편을 줄이기 위해 방문 전 안내와 현장 동선을 개선합니다.")
        elif "불친절" in keyword or "친절" in keyword or "응대" in category:
            actions.append(f"{keyword} 관련 리뷰를 점검하고 직원 응대 교육과 피드백 체계를 강화합니다.")
        else:
            actions.append(f"{keyword} 키워드는 만족도가 낮게 나타나 원인 리뷰를 확인하고 개선 계획을 수립합니다.")

    # 2) 약점 카테고리 기반 액션
    for c in weak_categories[:3]:
        category = c.get("name") or ""
        score = safe_float(c.get("score"))
        if not category:
            continue

        if "예약" in category or "대기" in category or "운영" in category:
            actions.append(f"{category} 영역 점수가 낮아 예약 시간 관리와 대기 안내 체계를 개선합니다.")
        elif "상담" in category or "설명" in category or "신뢰" in category:
            actions.append(f"{category} 영역 보완을 위해 진료 후 설명과 환자 문의 응대 절차를 표준화합니다.")
        elif "비용" in category or "시설" in category or "접근성" in category:
            actions.append(f"{category} 영역의 불편 요소를 줄이기 위해 비용·시설·접근성 안내를 강화합니다.")
        elif "친절" in category or "응대" in category:
            actions.append(f"{category} 영역 개선을 위해 접점별 응대 품질을 점검합니다.")
        else:
            actions.append(f"{category} 영역은 상대적으로 낮은 성과를 보여 우선 개선 항목으로 관리합니다.")

    # 3) 강점 유지 액션
    for k in strong_keywords[:2]:
        keyword = k.get("name") or ""
        if keyword:
            actions.append(f"{keyword} 키워드는 강점으로 확인되어 현재 서비스 수준을 유지하고 홍보 요소로 활용합니다.")

    # 4) DB summary는 마지막에 참고 문장으로만 추가
    if insight and insight.get("summary_text"):
        actions.append(insight["summary_text"])

    # 중복 제거 및 최대 8개 제한
    unique = []
    seen = set()
    for a in actions:
        if a and a not in seen:
            seen.add(a)
            unique.append(a)

    return unique[:8] if unique else ["분석 결과를 바탕으로 리뷰 내 반복 불만 키워드를 점검하고 개선 우선순위를 설정합니다."]

@app.get("/")
def root():
    return {"status": "ok", "message": "VITAL API is running"}

@app.options("/{rest_of_path:path}")
def preflight_handler(rest_of_path: str):
    return {"ok": True}

@app.get("/api/options")
def get_options():
    conn = get_db_connection()
    try:
        districts = conn.execute("""
            SELECT DISTINCT district_name
            FROM web_hospital_profile
            WHERE district_name IS NOT NULL AND district_name != ''
            ORDER BY district_name
        """).fetchall()

        specialties = conn.execute("""
            SELECT DISTINCT specialty_name
            FROM web_hospital_profile
            WHERE specialty_name IS NOT NULL AND specialty_name != ''
            ORDER BY specialty_name
        """).fetchall()

        return {
            "districts": [r["district_name"] for r in districts],
            "specialties": [r["specialty_name"] for r in specialties]
        }
    finally:
        conn.close()


@app.get("/api/hospitals")
def get_hospitals(
    district: Optional[str] = Query(None),
    specialty: Optional[str] = Query(None)
):
    conn = get_db_connection()
    try:
        query = """
            SELECT
                hospital_id,
                hospital_name,
                district_name,
                specialty_name,
                raw_review_count,
                analyzed_review_count,
                overall_score,
                percentile,
                rank_in_specialty_all_suwon,
                rank_in_specialty_district,
                total_hospitals_in_specialty,
                total_hospitals_in_specialty_district,
                score_grade,
                naver_url
            FROM web_hospital_full_ranking
            WHERE 1=1
        """
        params = []
        if district:
            query += " AND district_name = ?"
            params.append(district)
        if specialty:
            query += " AND specialty_name = ?"
            params.append(specialty)

        query += " ORDER BY rank_in_specialty_all_suwon ASC, overall_score DESC, hospital_name ASC"
        rows = conn.execute(query, params).fetchall()

        result = []
        for r in rows:
            d = row_to_dict(r)
            result.append({
                "hospital_id": d["hospital_id"],
                "hospital_name": d["hospital_name"],
                "district_name": d["district_name"],
                "specialty_name": d["specialty_name"],
                "review_count": d.get("raw_review_count") or d.get("analyzed_review_count") or 0,
                "overall_score": d.get("overall_score") or 0,
                "rank_in_specialty_all_suwon": d.get("rank_in_specialty_all_suwon") or 0,
                "rank_in_specialty_district": d.get("rank_in_specialty_district") or 0,
                "total_hospitals_in_specialty": d.get("total_hospitals_in_specialty") or 0,
                "total_hospitals_in_specialty_district": d.get("total_hospitals_in_specialty_district") or 0,
                "score_grade": d.get("score_grade") or "분석중",
                "naver_url": d.get("naver_url")
            })
        return result
    finally:
        conn.close()


@app.get("/api/rankings")
def get_rankings(
    district: Optional[str] = Query(None),
    specialty: Optional[str] = Query(None)
):
    conn = get_db_connection()
    try:
        query = """
            SELECT
                hospital_id,
                hospital_name,
                district_name,
                specialty_name,
                raw_review_count,
                analyzed_review_count,
                overall_score,
                percentile,
                rank_in_specialty_all_suwon,
                rank_in_specialty_district,
                total_hospitals_in_specialty,
                total_hospitals_in_specialty_district,
                score_grade,
                naver_url
            FROM web_hospital_full_ranking
            WHERE 1=1
        """
        params = []
        if district:
            query += " AND district_name = ?"
            params.append(district)
        if specialty:
            query += " AND specialty_name = ?"
            params.append(specialty)

        query += " ORDER BY overall_score DESC, raw_review_count DESC, hospital_name ASC LIMIT 20"
        rows = conn.execute(query, params).fetchall()

        result = []
        for r in rows:
            d = row_to_dict(r)
            result.append({
                "hospital_id": d["hospital_id"],
                "hospital_name": d["hospital_name"],
                "district_name": d["district_name"],
                "specialty_name": d["specialty_name"],
                "review_count": d.get("raw_review_count") or d.get("analyzed_review_count") or 0,
                "overall_score": d.get("overall_score") or 0,
                "rank_in_specialty_all_suwon": d.get("rank_in_specialty_all_suwon") or 0,
                "rank_in_specialty_district": d.get("rank_in_specialty_district") or 0,
                "total_hospitals_in_specialty": d.get("total_hospitals_in_specialty") or 0,
                "total_hospitals_in_specialty_district": d.get("total_hospitals_in_specialty_district") or 0,
                "score_grade": d.get("score_grade") or "분석중",
                "naver_url": d.get("naver_url")
            })
        return result
    finally:
        conn.close()


@app.get("/api/hospitals/{hospital_id}")
def get_hospital_detail(
    hospital_id: str,
    district: Optional[str] = Query(None),
    specialty: Optional[str] = Query(None)
):
    # FastAPI의 Query 객체가 내부 함수 호출 때 그대로 들어오는 것을 방지
    if not isinstance(district, str):
        district = None
    if not isinstance(specialty, str):
        specialty = None
    hospital_id = resolve_hospital_id(hospital_id, district=district, specialty=specialty)
    conn = get_db_connection()
    try:
        detail = row_to_dict(conn.execute("""
            SELECT
                m.*,
                r.rank_in_specialty_all_suwon,
                r.rank_in_specialty_district,
                r.total_hospitals_in_specialty,
                r.total_hospitals_in_specialty_district
            FROM web_hospital_detail_metrics m
            LEFT JOIN web_hospital_full_ranking r ON m.hospital_id = r.hospital_id
            WHERE m.hospital_id = ?
        """, (hospital_id,)).fetchone())

        if not detail:
            raise HTTPException(status_code=404, detail="Hospital not found")

        keyword_rows = [row_to_dict(r) for r in conn.execute("""
            SELECT *
            FROM web_hospital_keywords
            WHERE hospital_id = ?
            ORDER BY importance_score DESC, performance_score DESC
        """, (hospital_id,)).fetchall()]

        category_rows = [row_to_dict(r) for r in conn.execute("""
            SELECT *
            FROM web_hospital_categories
            WHERE hospital_id = ?
            ORDER BY importance_score DESC, performance_score DESC
        """, (hospital_id,)).fetchall()]

        time_rows = [row_to_dict(r) for r in conn.execute("""
            SELECT *
            FROM web_hospital_time_series
            WHERE hospital_id = ?
            ORDER BY period_text ASC
        """, (hospital_id,)).fetchall()]

        anomaly_rows = [row_to_dict(r) for r in conn.execute("""
            SELECT
                anomaly_id,
                hospital_id,
                anomaly_period,
                anomaly_keyword,
                anomaly_category,
                anomaly_sentiment_score,
                web_review_id,
                review_text,
                review_date_text,
                reviewer_nickname,
                tags,
                review_sentiment_score,
                sentiment_label
            FROM web_lcl_anomaly_reviews
            WHERE hospital_id = ?
            ORDER BY anomaly_period ASC, review_sentiment_score ASC
            LIMIT 100
        """, (hospital_id,)).fetchall()]

        if not anomaly_rows:
            anomaly_rows = [row_to_dict(r) for r in conn.execute("""
                SELECT
                    anomaly_id,
                    hospital_id,
                    anomaly_period,
                    anomaly_keyword,
                    anomaly_category,
                    anomaly_sentiment_score,
                    web_review_id,
                    review_text,
                    review_date_text,
                    reviewer_nickname,
                    tags,
                    review_sentiment_score,
                    sentiment_label
                FROM web_lcl_anomaly_review_fallback
                WHERE hospital_id = ?
                ORDER BY anomaly_period ASC, review_rank ASC
                LIMIT 100
            """, (hospital_id,)).fetchall()]

        if not anomaly_rows:
            # 현재 DB 버전에 원본 리뷰 웹 테이블이 없을 수 있으므로,
            # 테이블 존재 여부를 확인한 뒤에만 마지막 fallback을 실행한다.
            has_review_table = conn.execute("""
                SELECT COUNT(*) AS cnt
                FROM sqlite_master
                WHERE type='table' AND name='web_hospital_reviews'
            """).fetchone()["cnt"] > 0

            if has_review_table:
                anomaly_rows = [row_to_dict(r) for r in conn.execute("""
                    SELECT
                        NULL AS anomaly_id,
                        hospital_id,
                        review_date_text AS anomaly_period,
                        NULL AS anomaly_keyword,
                        NULL AS anomaly_category,
                        sentiment_score AS anomaly_sentiment_score,
                        web_review_id,
                        review_text,
                        review_date_text,
                        reviewer_nickname,
                        tags,
                        sentiment_score AS review_sentiment_score,
                        sentiment_label
                    FROM web_hospital_reviews
                    WHERE hospital_id = ?
                    ORDER BY sentiment_score ASC
                    LIMIT 30
                """, (hospital_id,)).fetchall()]
            else:
                anomaly_rows = []

        insight = row_to_dict(conn.execute("""
            SELECT *
            FROM web_hospital_insights
            WHERE hospital_id = ?
        """, (hospital_id,)).fetchone()) or {}

        # category transform
        categories = []
        for r in category_rows:
            score = safe_float(r.get("performance_score") or r.get("sentiment_score"))
            categories.append({
                "name": r.get("category") or "미분류",
                "score": round(score, 1),
                "marketAvg": round(max(0, score - 7), 1),
                "top10Avg": round(min(100, score + 8), 1),
                "importance": round(safe_float(r.get("importance_score")), 1),
                "ipaQuadrant": r.get("ipa_quadrant") or ""
            })

        # keyword positions
        keyword_positions = []
        for r in keyword_rows:
            keyword_positions.append({
                "name": r.get("keyword") or "",
                "importance": round(safe_float(r.get("importance_score")), 1),
                "satisfaction": round(safe_float(r.get("performance_score") or r.get("sentiment_score")), 1),
                "reviewCount": safe_int(r.get("mention_count")),
                "avgSentiment": round(safe_float(r.get("sentiment_score")), 1),
                "status": r.get("ipa_quadrant") or "분석",
                "insight": f"{r.get('keyword') or ''} 키워드는 {r.get('ipa_quadrant') or '분석'} 영역입니다."
            })

        positive_keywords, negative_keywords = build_keyword_cards(keyword_rows)

        # anomaly reviews grouped by period
        reviews_by_period = {}
        all_anomaly_reviews = []
        for r in anomaly_rows:
            period = r.get("anomaly_period") or r.get("review_date_text") or ""
            raw_tags = r.get("tags") or r.get("anomaly_keyword") or r.get("anomaly_category") or ""
            if isinstance(raw_tags, str):
                kws = [x.strip() for x in raw_tags.split(",") if x.strip()][:5]
            else:
                kws = []
            review = {
                "reviewDate": r.get("review_date_text") or period,
                "content": r.get("review_text") or "리뷰 내용 없음",
                "sentiment": r.get("sentiment_label") or "부정",
                "keywords": kws
            }
            all_anomaly_reviews.append(review)
            reviews_by_period.setdefault(period, []).append(review)

        # time series
        time_series = []
        scores = [safe_float(r.get("sentiment_score")) for r in time_rows if r.get("sentiment_score") is not None]
        mean_score = sum(scores) / len(scores) if scores else 60
        lcl = max(0, mean_score - 20)
        ucl = min(100, mean_score + 20)

        anomaly_attached = False
        for r in time_rows:
            date = r.get("period_text") or ""
            score = safe_float(r.get("sentiment_score"))
            is_anomaly = bool(r.get("is_anomaly")) or score < lcl
            related = reviews_by_period.get(date, [])
            if is_anomaly and not related and all_anomaly_reviews:
                related = all_anomaly_reviews[:10]
                anomaly_attached = True

            time_series.append({
                "date": date,
                "sentimentScore": round(score, 1),
                "mean": round(safe_float(r.get("moving_average"), mean_score), 1),
                "ucl": round(ucl, 1),
                "lcl": round(lcl, 1),
                "isAnomaly": is_anomaly,
                "anomalyReviews": related[:10]
            })

        if time_series and all_anomaly_reviews and not any(t["anomalyReviews"] for t in time_series):
            target = next((t for t in time_series if t["isAnomaly"]), time_series[0])
            target["isAnomaly"] = True
            target["anomalyReviews"] = all_anomaly_reviews[:10]

        # insights
        weak_categories = sorted(categories, key=lambda x: x["score"])[:3]
        strong_categories = sorted(categories, key=lambda x: x["score"], reverse=True)[:3]
        actions = make_actions(insight, negative_keywords, positive_keywords, weak_categories)

        main_strength = detail.get("main_strength") or (strong_categories[0]["name"] if strong_categories else "")
        main_weakness = detail.get("main_weakness") or (weak_categories[0]["name"] if weak_categories else "")

        overall = safe_float(detail.get("overall_score"))
        positive_rate = 76.0
        negative_rate = 5.0
        if overall:
            positive_rate = min(99, max(0, overall - 9))
            negative_rate = max(1, min(60, 100 - positive_rate - 10))

        return {
            "hospital": {
                "id": str(detail.get("hospital_id")),
                "name": detail.get("hospital_name") or "",
                "city": "수원시",
                "district": detail.get("district_name") or "",
                "department": detail.get("specialty_name") or "",
                "reviewCount": safe_int(detail.get("raw_review_count") or detail.get("total_review_count") or detail.get("analyzed_review_count")),
                "totalScore": round(overall, 1),
                "districtRank": safe_int(detail.get("rank_in_specialty_district") or detail.get("district_specialty_rank")),
                "districtTotal": safe_int(detail.get("total_hospitals_in_specialty_district")),
                "cityRank": safe_int(detail.get("rank_in_specialty_all_suwon")),
                "cityTotal": safe_int(detail.get("total_hospitals_in_specialty")),
                "positiveRate": round(positive_rate, 1),
                "negativeRate": round(negative_rate, 1),
                "status": detail.get("score_grade") or "분석중",
                "statusDescription": f"{detail.get('hospital_name')}은 {detail.get('specialty_name')} 분야에서 종합점수 {overall:.1f}점으로 분석되었습니다.",
                "mainStrength": main_strength,
                "mainWeakness": main_weakness,
                "naverUrl": detail.get("naver_url")
            },
            "categoryScores": categories,
            "keywordPositions": keyword_positions,
            "positiveKeywords": positive_keywords,
            "negativeKeywords": negative_keywords,
            "sentimentTrends": time_series,
            "improvementActions": actions,
            "insights": {
                "weakCategories": weak_categories,
                "strongCategories": strong_categories,
                "weakKeywords": negative_keywords,
                "strongKeywords": positive_keywords,
                "summary": insight.get("summary_text") if insight else ""
            }
        }
    finally:
        conn.close()


@app.get("/api/hospitals/{hospital_id}/keywords")
def get_keywords(hospital_id: str):
    detail = get_hospital_detail(hospital_id)
    return detail["keywordPositions"]


@app.get("/api/hospitals/{hospital_id}/categories")
def get_categories(hospital_id: str):
    detail = get_hospital_detail(hospital_id)
    return detail["categoryScores"]


@app.get("/api/hospitals/{hospital_id}/time-series")
def get_time_series(hospital_id: str):
    detail = get_hospital_detail(hospital_id)
    return detail["sentimentTrends"]


@app.get("/api/hospitals/{hospital_id}/anomaly-reviews")
def get_anomaly_reviews(hospital_id: str):
    detail = get_hospital_detail(hospital_id)
    reviews = []
    for t in detail["sentimentTrends"]:
        reviews.extend(t.get("anomalyReviews", []))
    return reviews


@app.get("/api/hospitals/{hospital_id}/insights")
def get_insights(hospital_id: str):
    detail = get_hospital_detail(hospital_id)
    return detail["improvementActions"]
