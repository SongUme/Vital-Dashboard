import type { Hospital, CategoryScore, KeywordPosition, SentimentTrend, AnomalyReview, KeywordInfo } from '../types/hospital';

// 안전한 숫자 변환
const safeNumber = (val: any, fallback = 0) => {
  if (val === null || val === undefined || val === '' || isNaN(Number(val))) return fallback;
  return Number(val);
};

const safeArray = (val: any) => Array.isArray(val) ? val : [];

const safeText = (val: any, fallback = ''): string => {
  if (val === null || val === undefined) return fallback;
  if (typeof val === 'string' || typeof val === 'number' || typeof val === 'boolean') return String(val);
  if (Array.isArray(val)) return val.map(v => safeText(v)).filter(Boolean).join(', ');
  if (typeof val === 'object') return String(val.name ?? val.keyword ?? val.category ?? val.content ?? val.review_text ?? fallback);
  return String(val);
};

const parseJsonArray = (val: any): any[] => {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  if (typeof val === 'string') {
    try {
      const parsed = JSON.parse(val);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return [];
};

const keywordToInfo = (d: any, i: number): KeywordInfo => ({
  rank: i + 1,
  name: safeText(d.name ?? d.keyword ?? d),
  category: safeText(d.category, '일반'),
  mentions: safeNumber(d.mentions ?? d.mention_count ?? d.reviewCount),
  avgMentions: safeNumber(d.avgMentions ?? d.review_coverage),
  diff: safeNumber(d.diff ?? d.importance_score),
  sentimentScore: safeNumber(d.sentimentScore ?? d.sentiment_score ?? d.performance_score),
  description: safeText(d.description) || `${safeText(d.keyword ?? d.name ?? d)} 관련 리뷰 분석 결과입니다.`
});

// 병원 리스트 아이템 변환
export const normalizeHospitalList = (data: any[]): Hospital[] => {
  return safeArray(data).map(d => ({
    id: String(d.hospital_id ?? d.id ?? ''),
    name: safeText(d.hospital_name ?? d.name, '알 수 없음'),
    city: '수원시',
    district: safeText(d.district_name ?? d.district),
    department: safeText(d.specialty_name ?? d.department),
    reviewCount: safeNumber(d.review_count ?? d.raw_review_count ?? d.analyzed_review_count),
    totalScore: safeNumber(d.overall_score ?? d.totalScore),
    districtRank: safeNumber(d.rank_in_specialty_district ?? d.district_specialty_rank ?? d.districtRank),
    districtTotal: safeNumber(d.total_hospitals_in_specialty_district ?? d.districtTotal),
    cityRank: safeNumber(d.rank_in_specialty_all_suwon ?? d.suwon_specialty_rank ?? d.cityRank),
    cityTotal: safeNumber(d.total_hospitals_in_specialty ?? d.cityTotal),
    positiveRate: safeNumber(d.positiveRate ?? d.positive_rate ?? 76),
    negativeRate: safeNumber(d.negativeRate ?? d.negative_rate ?? 5),
    status: safeText(d.score_grade ?? d.status, '분석중') as any,
    statusDescription: '',
    categoryScores: [],
    positiveKeywords: [],
    negativeKeywords: [],
    position: { importance: 0, satisfaction: safeNumber(d.overall_score ?? d.totalScore) },
    improvementActions: []
  }));
};

// 키워드 데이터 변환
export const normalizeKeywords = (data: any[]): KeywordPosition[] => {
  return safeArray(data).map(d => ({
    name: safeText(d.keyword ?? d.name),
    importance: safeNumber(d.importance_score ?? d.importance),
    satisfaction: safeNumber(d.performance_score ?? d.satisfaction ?? d.sentiment_score),
    reviewCount: safeNumber(d.mention_count ?? d.reviewCount),
    avgSentiment: safeNumber(d.sentiment_score ?? d.avgSentiment ?? d.performance_score),
    status: safeText(d.ipa_quadrant ?? d.status, '유지강화') as any,
    insight: safeText(d.insight) || `${safeText(d.keyword ?? d.name)} 키워드는 ${safeText(d.ipa_quadrant ?? d.status, '분석')} 영역에 위치합니다.`
  }));
};

// 카테고리 데이터 변환
export const normalizeCategories = (data: any[]): CategoryScore[] => {
  return safeArray(data).map(d => {
    const score = safeNumber(d.performance_score ?? d.score ?? d.sentiment_score);
    return {
      name: safeText(d.category ?? d.name, '미분류'),
      score,
      marketAvg: safeNumber(d.market_avg ?? d.marketAvg, Math.max(0, score - 7)),
      top10Avg: safeNumber(d.top10_avg ?? d.top10Avg, Math.min(100, score + 8))
    };
  });
};

// 시계열 데이터 변환
export const normalizeTimeSeries = (data: any[]): SentimentTrend[] => {
  return safeArray(data).map(d => {
    const score = safeNumber(d.sentiment_score ?? d.sentimentScore);
    const mean = safeNumber(d.moving_average ?? d.mean, 60);
    const lcl = safeNumber(d.lcl, Math.max(0, mean - 20));
    const ucl = safeNumber(d.ucl, Math.min(100, mean + 20));
    return {
      date: safeText(d.period_text ?? d.date),
      sentimentScore: score,
      mean,
      ucl,
      lcl,
      isAnomaly: Boolean(d.is_anomaly ?? d.isAnomaly ?? score < lcl),
      anomalyReviews: []
    };
  });
};

// 이상 리뷰 데이터 변환
export const normalizeAnomalyReviews = (data: any[]): AnomalyReview[] => {
  return safeArray(data).map(d => {
    const rawKeywords = d.keywords ?? d.anomaly_keyword ?? d.anomaly_category ?? d.tags;
    let keywords: any[] = [];
    if (Array.isArray(rawKeywords)) keywords = rawKeywords;
    else if (typeof rawKeywords === 'string') keywords = rawKeywords.split(',').map(v => v.trim()).filter(Boolean);
    else if (rawKeywords) keywords = [rawKeywords];

    return {
      reviewDate: safeText(d.anomaly_period ?? d.review_period ?? d.period_text ?? d.review_date_text ?? d.reviewDate),
      content: safeText(d.review_text ?? d.content, '리뷰 내용 없음'),
      sentiment: safeText(d.sentiment_label ?? d.sentiment, '부정') as any,
      keywords: keywords.map(k => safeText(k)).filter(Boolean)
    };
  });
};

// 인사이트 데이터 변환
export const normalizeInsights = (data: any[]): string[] => {
  const actions: string[] = [];
  safeArray(data).forEach(d => {
    const improvements = parseJsonArray(d.improvement_keywords_json);
    const strengths = parseJsonArray(d.strength_keywords_json);
    const weakCats = parseJsonArray(d.weak_categories_json);
    const strongCats = parseJsonArray(d.strong_categories_json);

    improvements.slice(0, 5).forEach((x: any) => {
      const keyword = safeText(x.keyword ?? x.name ?? x);
      const category = safeText(x.category);
      if (keyword) actions.push(`${keyword}${category ? `(${category})` : ''} 관련 리뷰를 우선 점검하고 개선 방안을 마련합니다.`);
    });

    if (weakCats.length > 0) {
      const c = weakCats[0];
      const category = safeText(c.category ?? c.name);
      if (category) actions.push(`${category} 영역은 만족도가 낮아 우선 개선 후보입니다.`);
    }

    strengths.slice(0, 2).forEach((x: any) => {
      const keyword = safeText(x.keyword ?? x.name ?? x);
      if (keyword) actions.push(`${keyword} 키워드는 강점으로 유지 강화할 필요가 있습니다.`);
    });

    if (d.summary_text) actions.push(safeText(d.summary_text));
  });
  return Array.from(new Set(actions)).filter(Boolean);
};

// 병원 상세 객체 변환
export const normalizeHospitalDetail = (data: any): Hospital => {
  const name = safeText(data.name ?? data.hospital_name, '알 수 없음');
  const totalScore = safeNumber(data.totalScore ?? data.overall_score);
  const mainStrength = safeText(data.main_strength);
  const mainWeakness = safeText(data.main_weakness);
  return {
    id: String(data.id ?? data.hospital_id ?? ''),
    name,
    city: data.city || '수원시',
    district: safeText(data.district ?? data.district_name),
    department: safeText(data.department ?? data.specialty_name),
    reviewCount: safeNumber(data.reviewCount ?? data.review_count ?? data.analyzed_review_count ?? data.raw_review_count),
    totalScore,
    districtRank: safeNumber(data.districtRank ?? data.rank_in_specialty_district ?? data.district_specialty_rank),
    districtTotal: safeNumber(data.districtTotal ?? data.total_hospitals_in_specialty_district),
    cityRank: safeNumber(data.cityRank ?? data.rank_in_specialty_all_suwon ?? data.suwon_specialty_rank),
    cityTotal: safeNumber(data.cityTotal ?? data.total_hospitals_in_specialty),
    positiveRate: safeNumber(data.positiveRate ?? data.positive_rate, 76),
    negativeRate: safeNumber(data.negativeRate ?? data.negative_rate, 5),
    status: safeText(data.status ?? data.score_grade, '분석중') as any,
    statusDescription: safeText(data.statusDescription) || `${name}은 리뷰 기반 종합점수 ${totalScore.toFixed(1)}점으로 분석되었습니다.`,
    categoryScores: safeArray(data.categoryScores ?? data.categories),
    positiveKeywords: safeArray(data.positiveKeywords),
    negativeKeywords: safeArray(data.negativeKeywords),
    position: data.position || { importance: totalScore, satisfaction: totalScore },
    keywordPositions: safeArray(data.keywordPositions ?? data.keywords),
    sentimentTrends: safeArray(data.sentimentTrends ?? data.timeSeries),
    improvementActions: safeArray(data.improvementActions ?? data.insights ?? [
      mainWeakness ? `${mainWeakness} 영역을 우선 개선합니다.` : '',
      mainStrength ? `${mainStrength} 영역은 강점으로 유지합니다.` : ''
    ]).filter(Boolean)
  };
};

export const buildKeywordCardsFromPositions = (positions: KeywordPosition[]) => {
  const arr = safeArray(positions);
  const positive = arr
    .filter(k => k.status === '유지강화' || k.satisfaction >= 70)
    .sort((a,b) => b.satisfaction - a.satisfaction)
    .slice(0,5)
    .map((k,i) => keywordToInfo({ keyword: k.name, category: k.status, mention_count: k.reviewCount, sentiment_score: k.avgSentiment, performance_score: k.satisfaction }, i));

  const negative = arr
    .filter(k => k.status === '집중개선' || k.satisfaction < 70)
    .sort((a,b) => a.satisfaction - b.satisfaction)
    .slice(0,5)
    .map((k,i) => keywordToInfo({ keyword: k.name, category: k.status, mention_count: k.reviewCount, sentiment_score: k.avgSentiment, performance_score: k.satisfaction }, i));

  return { positive, negative };
};
