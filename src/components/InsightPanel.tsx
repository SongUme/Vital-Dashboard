import React from 'react';
import type { Hospital } from '../types/hospital';
import { Check } from 'lucide-react';
import { safeText } from '../utils/safeText';

interface InsightPanelProps {
  hospital: Hospital;
  onDownload: () => void;
}

export default function InsightPanel({ hospital, onDownload }: InsightPanelProps) {
  
  const sortedCategories = [...hospital.categoryScores].sort((a, b) => a.score - b.score);
  const worstCategory = sortedCategories[0] || { name: '분석 데이터 없음', score: 0, marketAvg: 0, top10Avg: 0 };
  const bestCategory = sortedCategories[sortedCategories.length - 1] || worstCategory;
  const secondBestCategory = sortedCategories[sortedCategories.length - 2] || bestCategory;

  const fallbackNegativeKeywords = (hospital.keywordPositions || [])
    .filter((k: any) => k.status === '집중개선' || k.satisfaction < 70)
    .sort((a: any, b: any) => a.satisfaction - b.satisfaction)
    .slice(0, 5)
    .map((k: any, i: number) => ({
      rank: i + 1,
      name: k.name,
      category: k.status,
      mentions: k.reviewCount || 1,
      avgMentions: 0,
      diff: 0,
      sentimentScore: k.avgSentiment || k.satisfaction || 0,
      description: k.insight || `${k.name} 관련 개선이 필요합니다.`
    }));

  const fallbackPositiveKeywords = (hospital.keywordPositions || [])
    .filter((k: any) => k.status === '유지강화' || k.satisfaction >= 70)
    .sort((a: any, b: any) => b.satisfaction - a.satisfaction)
    .slice(0, 8)
    .map((k: any, i: number) => ({
      rank: i + 1,
      name: k.name,
      category: k.status,
      mentions: k.reviewCount || 1,
      avgMentions: 0,
      diff: 0,
      sentimentScore: k.avgSentiment || k.satisfaction || 0,
      description: k.insight || `${k.name} 관련 강점이 확인됩니다.`
    }));

  const topNegativeKeywords = (hospital.negativeKeywords && hospital.negativeKeywords.length > 0 ? [...hospital.negativeKeywords] : fallbackNegativeKeywords)
    .sort((a, b) => b.mentions - a.mentions)
    .slice(0, 5);

  const topPositiveKeywords = (hospital.positiveKeywords && hospital.positiveKeywords.length > 0 ? [...hospital.positiveKeywords] : fallbackPositiveKeywords)
    .sort((a, b) => b.mentions - a.mentions)
    .slice(0, 8);

  // SVG Gauge Math
  const score = hospital.totalScore;
  const radius = 60;
  const circumference = Math.PI * radius; // Half circle
  const dashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="mt-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800">맞춤형 개선 인사이트</h2>
          <p className="text-sm text-slate-400 mt-1">{hospital.name} · 자동 진단 결과</p>
        </div>
        
        <button 
          onClick={onDownload}
          className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-xl text-sm font-semibold shadow-md shadow-primary/20 transition-all flex items-center gap-2"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
          리포트 다운로드
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (Need Improvement & Actions) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Worst Category */}
          <div className="bg-white rounded-2xl p-6 border-l-4 border-l-negative border-y border-r border-slate-200 shadow-sm relative overflow-hidden">
            <span className="text-xs font-bold text-negative mb-2 block">우선 개선 필요</span>
            <div className="flex items-end gap-2 mb-2">
              <h3 className="text-2xl font-black text-slate-800">{worstCategory.name}</h3>
              <span className="text-xl font-bold text-negative">{worstCategory.score.toFixed(1)}점</span>
            </div>
            <p className="text-sm text-slate-500">
              시장 평균 {worstCategory.marketAvg.toFixed(1)}점 대비 <span className="text-negative font-bold">{Math.abs(worstCategory.score - worstCategory.marketAvg).toFixed(1)}점</span> 부족
            </p>
          </div>

          {/* Negative Keywords */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 mb-6">집중 개선 키워드 TOP 5</h3>
            <div className="space-y-4">
              {topNegativeKeywords.map((kw, i) => {
                const maxMentions = topNegativeKeywords[0]?.mentions || 1;
                const percent = (kw.mentions / maxMentions) * 100;
                return (
                  <div key={i} className="flex items-center gap-4 text-sm">
                    <span className="w-24 text-slate-700 font-medium truncate" title={safeText(kw.name ?? (kw as any).keyword ?? kw)}>{safeText(kw.name ?? (kw as any).keyword ?? kw)}</span>
                    <div className="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-[#e76e50] h-full rounded-full" style={{ width: `${percent}%` }} />
                    </div>
                    <span className="w-12 text-right font-bold text-slate-600">{((kw.mentions / Math.max(1, hospital.reviewCount)) * 100).toFixed(1)}%</span>
                    <span className="w-12 text-right text-slate-400 text-xs">{kw.mentions}건</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recommended Actions */}
          <div className="bg-white rounded-2xl p-6 border-l-4 border-l-warning border-y border-r border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 mb-4">추천 개선 액션</h3>
            <ul className="space-y-3">
              {hospital.improvementActions.map((action, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-warning/10 text-warning flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="text-sm text-slate-700 font-medium leading-relaxed">{safeText(action)}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Right Column (Strengths) */}
        <div className="flex flex-col gap-6">
          
          {/* Best Categories */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <span className="text-xs font-bold text-positive mb-4 block">유지 강화 영역</span>
            
            <div className="mb-6">
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-bold text-slate-800">{safeText(bestCategory.name ?? (bestCategory as any).category)}</h4>
                <span className="text-xs font-bold text-positive">+{Math.max(0, bestCategory.score - bestCategory.marketAvg).toFixed(1)}점</span>
              </div>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-bold text-positive">{bestCategory.score.toFixed(1)}</span>
                <span className="text-xs text-slate-400 mb-1">/ 평균 {bestCategory.marketAvg.toFixed(1)}</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-bold text-slate-800">{safeText(secondBestCategory.name ?? (secondBestCategory as any).category)}</h4>
                <span className="text-xs font-bold text-positive">+{Math.max(0, secondBestCategory.score - secondBestCategory.marketAvg).toFixed(1)}점</span>
              </div>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-bold text-positive">{secondBestCategory.score.toFixed(1)}</span>
                <span className="text-xs text-slate-400 mb-1">/ 평균 {secondBestCategory.marketAvg.toFixed(1)}</span>
              </div>
            </div>
          </div>

          {/* Positive Keywords */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex-1">
            <h3 className="text-sm font-bold text-slate-800 mb-4">강점 키워드</h3>
            <div className="flex flex-wrap gap-2">
              {topPositiveKeywords.map((kw, i) => (
                <span key={i} className="text-xs font-semibold px-2 py-1 bg-positive/10 text-positive rounded-lg">
                  {safeText(kw.name ?? (kw as any).keyword ?? kw)}
                </span>
              ))}
            </div>
          </div>

          {/* Gauge Summary */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col items-center justify-center py-8">
            <h3 className="text-sm font-bold text-slate-800 mb-6">종합 평가</h3>
            
            <div className="relative w-40 h-20 mb-4">
              <svg className="w-full h-full" viewBox="0 0 140 70">
                {/* Background arc */}
                <path 
                  d="M 10 70 A 60 60 0 0 1 130 70" 
                  fill="none" 
                  stroke="#f1f5f9" 
                  strokeWidth="16" 
                  strokeLinecap="round"
                />
                {/* Score arc (Color scale: red to yellow to green) */}
                <path 
                  d="M 10 70 A 60 60 0 0 1 130 70" 
                  fill="none" 
                  stroke={score >= 80 ? '#22c55e' : score >= 60 ? '#f59e0b' : '#ef4444'} 
                  strokeWidth="16" 
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={dashoffset}
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-0">
                <span className={`text-3xl font-black ${score >= 80 ? 'text-positive' : score >= 60 ? 'text-warning' : 'text-negative'}`}>
                  {score.toFixed(1)}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">상위 {Math.max(1, Math.floor(hospital.cityRank / hospital.cityTotal * 100))}% 수준</span>
              </div>
            </div>

            <div className="flex w-full justify-between px-4 mt-2">
              <div className="text-center">
                <p className="text-[10px] text-slate-400">시장 순위</p>
                <p className="text-sm font-bold text-primary">#{hospital.districtRank}</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] text-slate-400">긍정률</p>
                <p className="text-sm font-bold text-positive">{hospital.positiveRate.toFixed(0)}%</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] text-slate-400">부정률</p>
                <p className="text-sm font-bold text-slate-600">{hospital.negativeRate.toFixed(0)}%</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}