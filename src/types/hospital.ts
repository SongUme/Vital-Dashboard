export type HospitalStatus = '유지강화' | '집중개선' | '과잉가능' | '낮은우선';

export interface CategoryScore {
  name: string;
  score: number;
  marketAvg: number;
  top10Avg: number;
}

export interface KeywordInfo {
  rank: number;
  name: string;
  category: string;
  mentions: number;
  avgMentions: number;
  diff: number;
  sentimentScore: number;
  description: string;
}

export interface Position {
  importance: number; // x축
  satisfaction: number; // y축
}

export interface AnomalyReview {
  reviewDate: string;
  content: string;
  sentiment: '긍정' | '부정' | '보통';
  keywords: string[];
}

export interface SentimentTrend {
  date: string;
  sentimentScore: number;
  mean: number;
  ucl: number;
  lcl: number;
  isAnomaly: boolean;
  anomalyReviews: AnomalyReview[];
}

export interface KeywordPosition {
  name: string;
  importance: number;
  satisfaction: number;
  reviewCount: number;
  avgSentiment: number;
  status: HospitalStatus;
  insight: string;
}

export interface Hospital {
  id: string;
  name: string;
  city: string; // 시/도
  district: string; // 구/군
  department: string; // 진료과
  reviewCount: number;
  totalScore: number;
  districtRank: number;
  districtTotal: number;
  cityRank: number;
  cityTotal: number;
  positiveRate: number;
  negativeRate: number;
  status: HospitalStatus;
  statusDescription: string;
  categoryScores: CategoryScore[];
  positiveKeywords: KeywordInfo[];
  negativeKeywords: KeywordInfo[];
  position: Position;
  keywordPositions?: KeywordPosition[];
  sentimentTrends?: SentimentTrend[];
  improvementActions: string[];
}
