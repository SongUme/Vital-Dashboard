import React, { useState } from 'react';
import type { Hospital, KeywordInfo  } from '../types/hospital';
import { safeText } from '../utils/safeText';

interface KeywordAnalysisProps {
  hospital: Hospital;
}

export default function KeywordAnalysis({ hospital }: KeywordAnalysisProps) {
  const [activeTab, setActiveTab] = useState<'positive' | 'negative'>('positive');

  const keywords = activeTab === 'positive' ? hospital.positiveKeywords : hospital.negativeKeywords;
  
  const getKeywordEmoji = (name: string) => {
    const emojiMap: Record<string, string> = {
      "친절함": "😊", "전문성": "👩‍⚕️", "깨끗한 시설": "✨", "상세한 설명": "📋",
      "빠른 진료": "⚡", "주차 편리": "🅿️", "재방문 의사": "🔄", "정확한 진단": "🎯",
      "현대적 장비": "🔬", "따뜻한 분위기": "🌸", "합리적 가격": "💰", "대중교통 접근": "🚇",
      "긴 대기시간": "⏳", "불친절한 직원": "😠", "비싼 비용": "💸", "예약 어려움": "📞",
      "주차 부족": "🚫", "설명 부족": "❓", "접수 혼잡": "🌪️", "과잉진료 의심": "🤔"
    };
    return emojiMap[name] || "📌";
  };

  return (
    <div className="mt-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800">감성 키워드 순위</h2>
          <p className="text-sm text-slate-400 mt-1">감성 비율이 높은 키워드</p>
        </div>
        
        <div className="flex bg-slate-100 p-1 rounded-xl w-fit">
          <button
            onClick={() => setActiveTab('positive')}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
              activeTab === 'positive' 
                ? 'bg-positive text-white shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            긍정 키워드
          </button>
          <button
            onClick={() => setActiveTab('negative')}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
              activeTab === 'negative' 
                ? 'bg-white text-slate-800 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            부정 키워드
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {keywords.map((kw, i) => (
          <div key={i} className={`bg-white rounded-2xl p-5 border shadow-sm relative overflow-hidden group
            ${activeTab === 'positive' ? 'border-positive/20 hover:border-positive/50' : 'border-negative/20 hover:border-negative/50'}
          `}>
            {/* Left Accent border */}
            <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${activeTab === 'positive' ? 'bg-positive' : 'bg-negative'}`} />
            
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-slate-50 border border-slate-100 shadow-inner`}>
                {getKeywordEmoji(kw.name)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-400">{String(kw.rank).padStart(2, '0')}</span>
                  <h3 className="font-bold text-slate-800">{safeText(kw.name ?? kw.keyword ?? kw)}</h3>
                  <span className="text-[10px] bg-blue-50 text-primary px-2 py-0.5 rounded-full font-semibold border border-blue-100">
                    {safeText(kw.category)}
                  </span>
                </div>
              </div>
              <div className="ml-auto flex items-end">
                <span className={`text-lg font-bold ${activeTab === 'positive' ? 'text-positive' : 'text-negative'}`}>
                  {activeTab === 'positive' ? '+' : '-'}{kw.sentimentScore.toFixed(1)}
                </span>
              </div>
            </div>

            <div className="w-full bg-slate-100 h-1 rounded-full mb-3 overflow-hidden">
              <div 
                className={`h-full rounded-full ${activeTab === 'positive' ? 'bg-positive' : 'bg-negative'}`} 
                style={{ width: `${kw.sentimentScore}%` }}
              />
            </div>

            <div className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
              <span>{kw.mentions.toLocaleString()}회 언급</span>
              <span>·</span>
              <span>업계 평균 {kw.avgMentions.toLocaleString()}회</span>
              <span className={`font-bold ml-1 ${kw.diff > 0 ? (activeTab === 'positive' ? 'text-positive' : 'text-negative') : 'text-slate-400'}`}>
                {kw.diff > 0 ? '+' : ''}{kw.diff}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}