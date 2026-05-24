# VITAL 웹사이트 DB 명세 요약

이 프로젝트는 `DB/vital_hospital_reviews.db` SQLite 파일을 사용합니다.
백엔드 경로는 `backend/db.py`에 고정되어 있습니다.

## 주요 테이블

- `web_hospital_profile`: 병원 검색 및 필터용 기본 정보
- `web_hospital_detail_metrics`: 병원 상세 페이지 KPI 카드용 지표
- `web_hospital_full_ranking`: 진료과별 전체 병원 순위
- `web_hospital_keywords`: 키워드 IPA 분석용 데이터
- `web_hospital_categories`: 레이더 차트 및 카테고리 비교용 데이터
- `web_hospital_time_series`: 감정 변화 및 관리도 그래프용 데이터
- `web_lcl_anomaly_points`: LCL 이하 이상 지점
- `web_lcl_anomaly_reviews`: LCL 이하 지점과 연결된 실제 리뷰
- `web_lcl_anomaly_review_fallback`: 리뷰 매칭 보조 데이터
- `web_hospital_insights`: 맞춤형 개선 인사이트
- `web_api_payloads`: 병원 상세 페이지 통합 JSON 예비 테이블

## 포함 진료과

- 내과
- 산부인과
- 소아과
- 이비인후과
- 정형외과
- 치과
- 피부과

## 포함 지역

- 권선구
- 영통구
- 장안구
- 팔달구

## 백엔드 API 연결

- `/api/options`: 지역 및 진료과 목록
- `/api/hospitals`: 병원 목록
- `/api/rankings`: 선택 진료과 전체 순위
- `/api/hospitals/{hospital_id}`: 병원 상세 지표
- `/api/hospitals/{hospital_id}/keywords`: 키워드 IPA
- `/api/hospitals/{hospital_id}/categories`: 카테고리 레이더 차트
- `/api/hospitals/{hospital_id}/time-series`: 감정 변화 관리도
- `/api/hospitals/{hospital_id}/anomaly-reviews`: LCL 이하 지점 실제 리뷰
- `/api/hospitals/{hospital_id}/insights`: 개선 인사이트
