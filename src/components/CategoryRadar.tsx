import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from 'recharts';
import type { Hospital } from '../types/hospital';

interface CategoryRadarProps {
  hospital: Hospital;
}

export default function CategoryRadar({ hospital }: CategoryRadarProps) {
  
  const data = hospital.categoryScores.map(c => ({
    subject: c.name.replace(/\//g, '\n'), // Multi-line axis label
    score: c.score,
    top10Avg: c.top10Avg,
    marketAvg: c.marketAvg,
    rawName: c.name
  }));

  const CustomTick = ({ payload, x, y, textAnchor, stroke, radius }: any) => {
    const lines = payload.value.split('\n');
    return (
      <g>
        <text x={x} y={y} dy={0} textAnchor={textAnchor} fill="#64748b" fontSize={11} fontWeight={600}>
          {lines.map((line: string, index: number) => (
            <tspan x={x} dy={index === 0 ? 0 : 14} key={index}>
              {line}
            </tspan>
          ))}
        </text>
      </g>
    );
  };

  return (
    <div className="mt-12">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-800">6개 카테고리 성과</h2>
        <p className="text-sm text-slate-400 mt-1">시장평균 / 상위10% / 선택업체 비교</p>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col lg:flex-row gap-8">
        
        {/* Radar Chart */}
        <div className="flex-1 min-w-0 min-h-[400px] flex items-center justify-center">
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="subject" tick={<CustomTick />} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
              
              <Radar name="시장평균" dataKey="marketAvg" stroke="#cbd5e1" strokeWidth={2} strokeDasharray="3 3" fill="none" />
              <Radar name="상위10%" dataKey="top10Avg" stroke="#f59e0b" strokeWidth={2} strokeDasharray="3 3" fill="none" />
              <Radar name={hospital.name} dataKey="score" stroke="#3b82f6" strokeWidth={2} fill="#3b82f6" fillOpacity={0.15} />
              
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} iconType="plainline" />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Category Details */}
        <div className="flex-1 flex flex-col justify-center gap-3">
          {data.map((c, i) => (
            <div key={i} className="flex flex-col gap-2">
              <div className="flex justify-between items-end">
                <span className="text-sm font-bold text-slate-700">{c.rawName}</span>
                <span className="text-sm font-bold text-primary">{c.score.toFixed(1)}</span>
              </div>
              
              <div className="relative w-full h-1.5 bg-slate-100 rounded-full">
                {/* Market Avg Marker */}
                <div 
                  className="absolute top-1/2 -translate-y-1/2 w-0.5 h-3 bg-slate-400 z-10"
                  style={{ left: `${c.marketAvg}%` }}
                  title={`시장평균: ${c.marketAvg}`}
                />
                {/* Top 10% Marker */}
                <div 
                  className="absolute top-1/2 -translate-y-1/2 w-0.5 h-3 bg-warning z-10"
                  style={{ left: `${c.top10Avg}%` }}
                  title={`상위10%: ${c.top10Avg}`}
                />
                {/* Score Bar */}
                <div 
                  className="absolute top-0 left-0 h-full bg-primary rounded-full"
                  style={{ width: `${c.score}%` }}
                />
              </div>
              
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-slate-400">avg {c.marketAvg.toFixed(1)}</span>
                <span className={`font-semibold ${c.score >= c.marketAvg ? 'text-positive' : 'text-negative'}`}>
                  {c.score >= c.marketAvg ? '+' : ''}{(c.score - c.marketAvg).toFixed(1)}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
