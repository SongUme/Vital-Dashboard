import React, { useState } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Cell } from 'recharts';
import type { Hospital, KeywordPosition } from '../types/hospital';
import { Lightbulb, Info, X, MessageSquare, Smile, Star, TrendingUp } from 'lucide-react';

interface Props {
  hospital: Hospital | null;
}

const PositioningMap: React.FC<Props> = ({ hospital }) => {
  const [selectedKeyword, setSelectedKeyword] = useState<KeywordPosition | null>(null);

  if (!hospital || !hospital.keywordPositions || hospital.keywordPositions.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8 mb-8 flex items-center justify-center h-64 text-slate-400">
        키워드 IPA 분석 데이터가 제공되지 않는 병원입니다.
      </div>
    );
  }

  const data = hospital.keywordPositions.map(k => ({
    ...k,
    x: k.satisfaction, // X축: 만족도 (성과도)
    y: k.importance,   // Y축: 중요도
  }));

  // Calculate averages for crosshairs to divide the 4 quadrants
  const avgX = data.length > 0 ? data.reduce((acc, curr) => acc + curr.x, 0) / data.length : 50;
  const avgY = data.length > 0 ? data.reduce((acc, curr) => acc + curr.y, 0) / data.length : 50;

  // Custom Tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload as KeywordPosition;
      return (
        <div className="bg-white p-3 border border-slate-200 shadow-lg rounded-xl text-sm z-50">
          <p className="font-bold text-slate-800 mb-1">#{dataPoint.name}</p>
          <p className="text-slate-600">중요도: {dataPoint.importance}</p>
          <p className="text-slate-600">만족도: {dataPoint.satisfaction}</p>
          <p className="text-blue-600 font-semibold mt-1">분석: {dataPoint.status}</p>
          <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
            <Info size={10} /> 클릭하여 상세 분석 보기
          </p>
        </div>
      );
    }
    return null;
  };

  const handlePointClick = (data: any) => {
    if (data && data.payload) {
      setSelectedKeyword(data.payload as KeywordPosition);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8 mb-8">
      <div className="mb-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            서비스 요소 중요도-만족도 분석 (키워드 IPA)
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            환자 리뷰 기반 주요 서비스 요소의 중요도와 만족도를 분석한 결과입니다.
          </p>
        </div>
        
        {/* Legend */}
        <div className="flex flex-wrap gap-3 text-xs font-medium text-slate-600 bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-100">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div> 유지강화 (강점)
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500"></div> 집중개선 (위기)
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div> 과잉노력 (잉여)
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div> 낮은우선순위 (열위)
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="w-full transition-all duration-300 ease-in-out relative">
          {/* Quadrant Labels */}
          <div className="absolute top-4 left-10 text-slate-300 font-black text-sm md:text-base z-0">집중개선</div>
          <div className="absolute top-4 right-10 text-slate-300 font-black text-sm md:text-base z-0">유지강화</div>
          <div className="absolute bottom-10 left-10 text-slate-300 font-black text-sm md:text-base z-0">낮은우선순위</div>
          <div className="absolute bottom-10 right-10 text-slate-300 font-black text-sm md:text-base z-0">과잉노력</div>

          <div style={{ width: '100%', height: '400px' }} className="relative pr-4 pb-4">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis 
                  type="number" 
                  dataKey="x" 
                  name="만족도" 
                  domain={[0, 100]} 
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                  axisLine={{ stroke: '#cbd5e1' }}
                  tickLine={false}
                />
                <YAxis 
                  type="number" 
                  dataKey="y" 
                  name="중요도" 
                  domain={[0, 100]} 
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                  axisLine={{ stroke: '#cbd5e1' }}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
                
                <ReferenceLine x={avgX} stroke="#94a3b8" strokeDasharray="5 5" label={{ position: 'top', value: '평균 만족도', fill: '#94a3b8', fontSize: 10 }} />
                <ReferenceLine y={avgY} stroke="#94a3b8" strokeDasharray="5 5" label={{ position: 'right', value: '평균 중요도', fill: '#94a3b8', fontSize: 10 }} />
                
                <Scatter name="Keywords" data={data} onClick={handlePointClick} style={{ cursor: 'pointer' }}>
                  {data.map((entry, index) => {
                    let color = '#3b82f6'; // default blue (유지강화)
                    if (entry.status === '집중개선') color = '#ef4444'; // red
                    else if (entry.status === '낮은우선') color = '#f59e0b'; // amber
                    else if (entry.status === '과잉가능') color = '#10b981'; // emerald
                    
                    const isSelected = selectedKeyword?.name === entry.name;

                    return (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={color} 
                        stroke={isSelected ? '#1e293b' : 'white'}
                        strokeWidth={isSelected ? 3 : 1}
                        r={isSelected ? 10 : 7}
                        className="transition-all duration-300 drop-shadow-md hover:opacity-80"
                      />
                    );
                  })}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
            
            {/* Axis Labels outside the chart area */}
            <div className="absolute -bottom-2 w-full text-center text-xs font-semibold text-slate-400">← 낮음 (만족도) 높음 →</div>
            <div className="absolute -left-6 top-1/2 -rotate-90 text-xs font-semibold text-slate-400 origin-center whitespace-nowrap">← 낮음 (중요도) 높음 →</div>
          </div>
        </div>

        {/* Insight Panel */}
        <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col">
          {selectedKeyword ? (
            <div className="flex flex-col gap-4">
              <div>
                <div className="flex items-center justify-between mb-4 border-b border-slate-200 pb-3">
                  <h4 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                    <span className="text-blue-500 font-extrabold">#</span> {selectedKeyword.name}
                  </h4>
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${
                      selectedKeyword.status === '유지강화' ? 'bg-blue-50 text-blue-600 border-blue-200' :
                      selectedKeyword.status === '집중개선' ? 'bg-red-50 text-red-600 border-red-200' :
                      selectedKeyword.status === '과잉가능' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' :
                      'bg-amber-50 text-amber-600 border-amber-200'
                    }`}>
                      {selectedKeyword.status === '과잉가능' ? '과잉노력' : selectedKeyword.status === '낮은우선' ? '낮은우선순위' : selectedKeyword.status}
                    </span>
                    <button 
                      onClick={() => setSelectedKeyword(null)}
                      className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors"
                      title="선택 해제"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-1.5">
                      <p className="text-xs text-slate-500 font-medium">중요도</p>
                      <Star size={14} className="text-amber-400 fill-amber-400" />
                    </div>
                    <p className="text-xl font-bold text-slate-800">{selectedKeyword.importance}<span className="text-sm font-normal text-slate-400"> / 5.0</span></p>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div className="bg-amber-400 h-full rounded-full" style={{ width: `${(selectedKeyword.importance / 5) * 100}%` }}></div>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-1.5">
                      <p className="text-xs text-slate-500 font-medium">만족도(성과)</p>
                      <TrendingUp size={14} className="text-blue-500" />
                    </div>
                    <p className="text-xl font-bold text-slate-800">{selectedKeyword.satisfaction}<span className="text-sm font-normal text-slate-400"> / 100</span></p>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div className="bg-blue-500 h-full rounded-full" style={{ width: `${selectedKeyword.satisfaction}%` }}></div>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-1.5">
                      <p className="text-xs text-slate-500 font-medium">관련 리뷰 수</p>
                      <MessageSquare size={14} className="text-indigo-500" />
                    </div>
                    <p className="text-lg font-bold text-slate-800">{selectedKeyword.reviewCount.toLocaleString()}<span className="text-sm font-normal text-slate-400"> 건</span></p>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-1.5">
                      <p className="text-xs text-slate-500 font-medium">평균 감성 점수</p>
                      <Smile size={14} className="text-emerald-500" />
                    </div>
                    <p className="text-lg font-bold text-slate-800">{selectedKeyword.avgSentiment}<span className="text-sm font-normal text-slate-400"> 점</span></p>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${selectedKeyword.avgSentiment}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden mt-2">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500"></div>
                <div className="flex items-center gap-2 mb-2 text-blue-600">
                  <Lightbulb size={16} />
                  <span className="font-bold text-sm">IPA 해석 및 제언</span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed font-semibold">
                  {selectedKeyword.insight}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center text-center p-4">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 mb-3 animate-bounce">
                <Info size={24} />
              </div>
              <h4 className="font-bold text-slate-800 text-base mb-1.5">키워드 세부 분석 보기</h4>
              <p className="text-sm text-slate-500 max-w-[450px] leading-relaxed mb-4">
                위쪽 IPA 그래프의 <strong>키워드 점(Dot)을 클릭</strong>하시면, 각 키워드별 중요도·만족도 및 맞춤형 개선 가이드를 이곳에서 상세히 확인하실 수 있습니다.
              </p>

              {/* Mini guide for quadrants - Wide structure */}
              <div className="w-full space-y-2.5 text-left bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">IPA 사분면 가이드</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-blue-50/50 border border-blue-100 flex flex-col gap-1">
                    <span className="font-bold text-blue-700">유지강화 (강점)</span>
                    <span className="text-[11px] text-slate-500">중요도·만족도 모두 높음</span>
                  </div>
                  <div className="p-3 rounded-lg bg-red-50/50 border border-red-100 flex flex-col gap-1">
                    <span className="font-bold text-red-700">집중개선 (위기)</span>
                    <span className="text-[11px] text-slate-500">중요도 높으나 만족도 낮음</span>
                  </div>
                  <div className="p-3 rounded-lg bg-emerald-50/50 border border-emerald-100 flex flex-col gap-1">
                    <span className="font-bold text-emerald-700">과잉노력 (잉여)</span>
                    <span className="text-[11px] text-slate-500">중요도 낮으나 만족도 높음</span>
                  </div>
                  <div className="p-3 rounded-lg bg-amber-50/50 border border-amber-100 flex flex-col gap-1">
                    <span className="font-bold text-amber-700">낮은우선순위 (열위)</span>
                    <span className="text-[11px] text-slate-500">중요도·만족도 모두 낮음</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PositioningMap;
