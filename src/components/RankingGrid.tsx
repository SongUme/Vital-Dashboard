import React from 'react';
import type { Hospital } from '../types/hospital';
import { MapPin } from 'lucide-react';

interface RankingGridProps {
  hospitals: Hospital[];
  rankings?: any[];
  selectedHospitalId: string | null;
  onSelectHospital: (id: string) => void;
  title?: string;
}

export default function RankingGrid({ hospitals, rankings, selectedHospitalId, onSelectHospital, title }: RankingGridProps) {
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case '유지강화': return 'bg-positive/10 text-positive border-positive/20';
      case '집중개선': return 'bg-negative/10 text-negative border-negative/20';
      case '과잉가능': return 'bg-warning/10 text-warning border-warning/20';
      case '낮은우선': return 'bg-slate-100 text-slate-500 border-slate-200';
      default: return 'bg-slate-100 text-slate-500 border-slate-200';
    }
  };

  const getScoreBarColor = (score: number) => {
    if (score >= 80) return 'bg-positive';
    if (score >= 60) return 'bg-warning';
    return 'bg-negative';
  };

  // 백엔드의 rankings 데이터가 있으면 사용하고, 없으면 기존처럼 hospitals를 가공해서 사용
  let topHospitals: any[] = [];
  if (rankings && rankings.length > 0 && rankings !== hospitals) {
    topHospitals = rankings.map(r => ({
      id: String(r.id || r.hospital_id),
      name: r.name || r.hospital_name,
      totalScore: r.totalScore || r.overall_score || 0,
      district: r.district || r.district_name || '수원시',
      reviewCount: r.reviewCount || r.analyzed_review_count || r.review_count || 0,
      cityRank: r.cityRank || r.rank_in_specialty_all_suwon || 0,
      cityTotal: r.cityTotal || r.total_hospitals_in_specialty || 100,
      city: '수원시',
      status: r.status || r.score_grade || '분석중'
    }));
  } else {
    topHospitals = [...hospitals].sort((a, b) => b.totalScore - a.totalScore);
  }

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800">{title || '종합 점수 전체 순위'}</h2>
          <p className="text-sm text-slate-400 mt-1">리뷰 수 및 긍/부정 감성 점수 종합 결과</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {topHospitals.map((h, index) => {
          const isSelected = String(selectedHospitalId) === String(h.id);
          // 화면 표시 순위 = 현재 필터 결과 기준 index + 1
          const displayRank = index + 1;
          return (
            <div 
              key={h.id}
              onClick={() => onSelectHospital(h.id)}
              className={`rounded-2xl p-5 border cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md
                ${isSelected 
                  ? 'border-primary bg-blue-50/30 ring-1 ring-primary/20 scale-[1.02]' 
                  : 'border-slate-200 bg-white hover:border-primary/40'
                }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                  ${displayRank <= 3 ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-500'}`}
                >
                  {displayRank}
                </div>
                <span className={`text-[10px] px-2 py-1 rounded-full border font-semibold ${getStatusColor(h.status)}`}>
                  {h.status}
                </span>
              </div>
              
              <h3 className="font-bold text-slate-800 text-base mb-4 truncate" title={h.name}>{h.name}</h3>
              
              <div className="flex justify-between items-end mb-2">
                <span className="text-xs text-slate-400 font-medium">종합</span>
                <span className={`text-2xl font-extrabold ${isSelected ? 'text-primary' : 'text-slate-800'}`}>
                  {h.totalScore.toFixed(1)}
                </span>
              </div>
              
              {/* Score bar */}
              <div className="w-full bg-slate-100 h-1.5 rounded-full mb-4 overflow-hidden">
                <div 
                  className={`h-full rounded-full ${getScoreBarColor(h.totalScore)}`} 
                  style={{ width: `${h.totalScore}%` }}
                />
              </div>

              <div className="text-[11px] text-slate-500 space-y-1">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  <span>{h.district} · 리뷰 {h.reviewCount.toLocaleString()}건</span>
                </div>
                <div className="pl-4 text-slate-400">
                  {h.city} 전체 #{h.cityRank} · 상위 {h.cityTotal > 0 ? Math.max(1, Math.floor(h.cityRank / h.cityTotal * 100)) : '-'}%
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
