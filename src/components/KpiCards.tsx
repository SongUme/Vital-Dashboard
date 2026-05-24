import React from 'react';
import type { Hospital } from '../types/hospital';

interface KpiCardsProps {
  hospital: Hospital;
}

export default function KpiCards({ hospital }: KpiCardsProps) {
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case '유지강화': return 'bg-positive/10 text-positive border-positive/20';
      case '집중개선': return 'bg-negative/10 text-negative border-negative/20';
      case '과잉가능': return 'bg-warning/10 text-warning border-warning/20';
      default: return 'bg-slate-100 text-slate-500 border-slate-200';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. 종합 점수 */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
        <h3 className="text-sm font-semibold text-slate-500 mb-2">종합 점수</h3>
        <div className="flex items-end gap-1 mb-3">
          <span className="text-4xl font-extrabold text-slate-800">{hospital.totalScore.toFixed(1)}</span>
          <span className="text-sm font-medium text-slate-400 mb-1">점</span>
        </div>
        <p className="text-xs font-medium text-positive flex items-center gap-1">
          ▲ 12.4 <span className="text-slate-400 font-normal">시장 평균 대비</span>
        </p>
      </div>

      {/* 2. 순위 */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
        <h3 className="text-sm font-semibold text-slate-500 mb-2">{hospital.district} {hospital.department} 내 순위</h3>
        <div className="flex items-end gap-1 mb-3">
          <span className="text-4xl font-extrabold text-slate-800">#{hospital.districtRank}</span>
          <span className="text-sm font-medium text-slate-400 mb-1">/ {hospital.districtTotal || '-'}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs px-2 py-1 rounded-full border font-semibold ${getStatusColor(hospital.status)}`}>
            {hospital.status}
          </span>
          <span className="text-xs text-slate-400 font-medium break-keep">
            {hospital.city} 전체 {hospital.department} 기준 #{hospital.cityRank || '-'} / {hospital.cityTotal || '-'}
          </span>
        </div>
      </div>

      {/* 3. 긍정 리뷰 비율 */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
        <h3 className="text-sm font-semibold text-slate-500 mb-2">긍정 리뷰 비율</h3>
        <div className="flex items-end gap-1 mb-3">
          <span className="text-4xl font-extrabold text-slate-800">{hospital.positiveRate.toFixed(1)}</span>
          <span className="text-sm font-medium text-slate-400 mb-1">%</span>
        </div>
        <p className="text-xs font-medium text-positive flex items-center gap-1">
          ▲ {(hospital.positiveRate - 50).toFixed(1)} <span className="text-slate-400 font-normal">평균 대비</span>
        </p>
      </div>

      {/* 4. 부정 리뷰 비율 */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
        <h3 className="text-sm font-semibold text-slate-500 mb-2">부정 리뷰 비율</h3>
        <div className="flex items-end gap-1 mb-3">
          <span className="text-4xl font-extrabold text-slate-800">{hospital.negativeRate.toFixed(1)}</span>
          <span className="text-sm font-medium text-slate-400 mb-1">%</span>
        </div>
        <p className={`text-xs font-medium flex items-center gap-1 ${hospital.negativeRate < 10 ? 'text-positive' : 'text-negative'}`}>
          {hospital.negativeRate < 10 ? '▼' : '▲'} {Math.abs(hospital.negativeRate - 10).toFixed(1)} <span className="text-slate-400 font-normal">평균 10% 기준</span>
        </p>
      </div>
    </div>
  );
}
