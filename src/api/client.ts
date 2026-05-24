import type { Hospital } from '../types/hospital';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

const fallbackHospital: Hospital = {
  id: '',
  name: '분석 대상 없음',
  city: '수원시',
  district: '',
  department: '',
  reviewCount: 0,
  totalScore: 0,
  districtRank: 0,
  districtTotal: 0,
  cityRank: 0,
  cityTotal: 0,
  positiveRate: 0,
  negativeRate: 0,
  status: '분석중' as any,
  statusDescription: '',
  categoryScores: [],
  positiveKeywords: [],
  negativeKeywords: [],
  position: { importance: 0, satisfaction: 0 },
  keywordPositions: [],
  sentimentTrends: [],
  improvementActions: []
};

async function fetchJson(endpoint: string) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);
  if (!response.ok) {
    throw new Error(`API error ${response.status}: ${endpoint}`);
  }
  return response.json();
}

const toHospital = (payload: any): Hospital => {
  const h = payload?.hospital || payload || {};
  return {
    id: String(h.id ?? h.hospital_id ?? ''),
    name: h.name ?? h.hospital_name ?? '알 수 없음',
    city: h.city ?? '수원시',
    district: h.district ?? h.district_name ?? '',
    department: h.department ?? h.specialty_name ?? '',
    reviewCount: Number(h.reviewCount ?? h.review_count ?? 0),
    totalScore: Number(h.totalScore ?? h.overall_score ?? 0),
    districtRank: Number(h.districtRank ?? h.rank_in_specialty_district ?? 0),
    districtTotal: Number(h.districtTotal ?? h.total_hospitals_in_specialty_district ?? 0),
    cityRank: Number(h.cityRank ?? h.rank_in_specialty_all_suwon ?? 0),
    cityTotal: Number(h.cityTotal ?? h.total_hospitals_in_specialty ?? 0),
    positiveRate: Number(h.positiveRate ?? 0),
    negativeRate: Number(h.negativeRate ?? 0),
    status: (h.status ?? h.score_grade ?? '분석중') as any,
    statusDescription: h.statusDescription ?? '',
    categoryScores: payload?.categoryScores ?? h.categoryScores ?? [],
    positiveKeywords: payload?.positiveKeywords ?? h.positiveKeywords ?? [],
    negativeKeywords: payload?.negativeKeywords ?? h.negativeKeywords ?? [],
    position: h.position ?? { importance: Number(h.totalScore ?? h.overall_score ?? 0), satisfaction: Number(h.totalScore ?? h.overall_score ?? 0) },
    keywordPositions: payload?.keywordPositions ?? h.keywordPositions ?? [],
    sentimentTrends: payload?.sentimentTrends ?? h.sentimentTrends ?? [],
    improvementActions: payload?.improvementActions ?? h.improvementActions ?? []
  };
};

export const getOptions = async () => {
  return fetchJson('/api/options');
};

export const getHospitals = async (district?: string, specialty?: string) => {
  const params = new URLSearchParams();
  if (district) params.append('district', district);
  if (specialty) params.append('specialty', specialty);
  const query = params.toString() ? `?${params.toString()}` : '';
  const data = await fetchJson(`/api/hospitals${query}`);
  return Array.isArray(data) ? data.map(toHospital) : [];
};

export const getRankings = async (district?: string, specialty?: string) => {
  const params = new URLSearchParams();
  if (district) params.append('district', district);
  if (specialty) params.append('specialty', specialty);
  const query = params.toString() ? `?${params.toString()}` : '';
  const data = await fetchJson(`/api/rankings${query}`);
  return Array.isArray(data) ? data.map(toHospital) : [];
};

export const getHospitalDetail = async (hospitalId: string) => {
  const payload = await fetchJson(`/api/hospitals/${hospitalId}`);
  return toHospital(payload);
};

// 아래 함수들은 기존 App 구조 호환용이다.
// 실제 데이터는 /api/hospitals/{id} 통합 API에서 이미 반환된다.
export const getKeywords = async (hospitalId: string) => {
  const payload = await fetchJson(`/api/hospitals/${hospitalId}`);
  return payload.keywordPositions ?? [];
};

export const getCategories = async (hospitalId: string) => {
  const payload = await fetchJson(`/api/hospitals/${hospitalId}`);
  return payload.categoryScores ?? [];
};

export const getTimeSeries = async (hospitalId: string) => {
  const payload = await fetchJson(`/api/hospitals/${hospitalId}`);
  return payload.sentimentTrends ?? [];
};

export const getAnomalyReviews = async (hospitalId: string) => {
  const payload = await fetchJson(`/api/hospitals/${hospitalId}`);
  return (payload.sentimentTrends ?? []).flatMap((t: any) => t.anomalyReviews ?? []);
};

export const getInsights = async (hospitalId: string) => {
  const payload = await fetchJson(`/api/hospitals/${hospitalId}`);
  return payload.improvementActions ?? [];
};
