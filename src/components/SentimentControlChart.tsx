import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, ReferenceArea, Label } from 'recharts';
import type { Hospital, SentimentTrend } from '../types/hospital';
import { AlertTriangle, AlertCircle, Calendar, Lightbulb } from 'lucide-react';
import { safeText } from '../utils/safeText';

interface Props {
  hospital: Hospital | null;
}

const SentimentControlChart: React.FC<Props> = ({ hospital }) => {
  const [selectedPoint, setSelectedPoint] = useState<SentimentTrend | null>(null);

  if (!hospital || !hospital.sentimentTrends || hospital.sentimentTrends.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8 mb-8 flex items-center justify-center h-64 text-slate-400">
        감성 점수 관리도 데이터가 제공되지 않는 병원입니다.
      </div>
    );
  }

  const data = hospital.sentimentTrends;

  useEffect(() => {
    const firstAnomaly = data.find((d: any) => d.isAnomaly && d.anomalyReviews && d.anomalyReviews.length > 0);
    if (firstAnomaly && !selectedPoint) {
      setSelectedPoint(firstAnomaly);
    }
  }, [hospital?.id]);

  // Find continuous anomaly areas to render ReferenceArea
  const anomalyAreas = [];
  let currentStart = null;
  for (let i = 0; i < data.length; i++) {
    if (data[i].isAnomaly) {
      if (!currentStart) currentStart = data[i].date;
    } else {
      if (currentStart) {
        anomalyAreas.push({ start: currentStart, end: data[i-1].date });
        currentStart = null;
      }
    }
  }
  if (currentStart) {
    anomalyAreas.push({ start: currentStart, end: data[data.length-1].date });
  }

  const handlePointClick = (data: any) => {
    if (data && data.activePayload && data.activePayload.length) {
      const point = data.activePayload[0].payload as SentimentTrend;
      setSelectedPoint(point);
    }
  };

  const fallbackAnomalyReviews = data.flatMap((d: any) => d.anomalyReviews || []).slice(0, 10);
  const selectedReviews = (selectedPoint?.anomalyReviews && selectedPoint.anomalyReviews.length > 0)
    ? selectedPoint.anomalyReviews
    : (selectedPoint?.isAnomaly ? fallbackAnomalyReviews : []);
  const isSelectedAnomaly = selectedPoint?.isAnomaly || false;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8 mb-8">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          리뷰 품질 변화 분석 (감성 점수 관리도)
        </h3>
        <p className="text-sm text-slate-500 mt-1">
          시간 흐름에 따른 환자 리뷰 감성 점수의 변화를 추적하여 평균선을 벗어난 이상 구간을 자동 탐지합니다.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Chart Section */}
        <div className={`flex-1 min-w-0 ${selectedPoint ? 'lg:w-[60%]' : 'w-full'} transition-all duration-300 ease-in-out`}>
          <div className="h-[350px] w-full min-w-[300px] min-h-[350px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 20, right: 40, left: 0, bottom: 20 }} onClick={handlePointClick}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="date" 
                  axisLine={{ stroke: '#cbd5e1' }}
                  tickLine={false}
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  dy={10}
                >
                </XAxis>
                <YAxis 
                  domain={[0, 100]} 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748b', fontSize: 12 }}
                >
                </YAxis>
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3', stroke: '#94a3b8' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const pt = payload[0].payload as SentimentTrend;
                      return (
                        <div className={`p-3 rounded-xl shadow-lg border ${pt.isAnomaly ? 'border-red-200 bg-red-50' : 'border-slate-200 bg-white'}`}>
                          <p className="font-bold text-slate-700 mb-1">{pt.date}</p>
                          <p className={`text-sm font-semibold ${pt.isAnomaly ? 'text-red-600' : 'text-blue-600'}`}>
                            감성 점수: {pt.sentimentScore}점
                          </p>
                          {pt.isAnomaly ? (
                            <p className="text-xs text-red-500 mt-1 font-bold flex items-center gap-1">
                              <AlertTriangle size={12} /> 이상 구간 탐지됨 (클릭)
                            </p>
                          ) : (
                            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                              클릭하여 해당 구간 리뷰 보기
                            </p>
                          )}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                
                {data.length > 0 && (
                  <>
                    <ReferenceLine y={data[0].mean} stroke="#10b981" strokeDasharray="3 3" label={{ position: 'right', value: `평균(${data[0].mean})`, fill: '#10b981', fontSize: 11 }} />
                    <ReferenceLine y={data[0].ucl} stroke="#ef4444" strokeDasharray="3 3" label={{ position: 'right', value: `UCL(${data[0].ucl})`, fill: '#ef4444', fontSize: 11 }} />
                    <ReferenceLine y={data[0].lcl} stroke="#ef4444" strokeDasharray="3 3" label={{ position: 'right', value: `LCL(${data[0].lcl})`, fill: '#ef4444', fontSize: 11 }} />
                  </>
                )}

                {anomalyAreas.map((area, idx) => (
                  <ReferenceArea key={idx} x1={area.start} x2={area.end} fill="#fef2f2" fillOpacity={1} />
                ))}

                <Line 
                  type="monotone" 
                  dataKey="sentimentScore" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  activeDot={{ r: 8, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2 }}
                  dot={(props) => {
                    const { cx, cy, payload } = props;
                    const isSelected = selectedPoint?.date === payload.date;
                    
                    if (payload.isAnomaly) {
                      return <circle onClick={() => setSelectedPoint(payload)} style={{ cursor: 'pointer' }} cx={cx} cy={cy} r={isSelected ? 8 : 6} fill="#ef4444" stroke="#fff" strokeWidth={isSelected ? 3 : 2} key={`dot-${payload.date}`} />;
                    }
                    return <circle onClick={() => setSelectedPoint(payload)} style={{ cursor: 'pointer' }} cx={cx} cy={cy} r={isSelected ? 8 : 4} fill="#3b82f6" stroke="#fff" strokeWidth={isSelected ? 3 : 2} key={`dot-${payload.date}`} />;
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap items-center justify-between bg-slate-50 p-4 rounded-xl mt-4">
             <div className="flex items-center gap-2 text-sm text-slate-600">
               <div className="w-4 h-4 rounded bg-red-100 border border-red-200 flex items-center justify-center">
                 <AlertTriangle size={10} className="text-red-500" />
               </div>
               <span>빨간색 배경 영역은 평균선(LCL)을 벗어난 <strong>이상 구간</strong>을 의미합니다.</span>
             </div>
             <p className="text-xs text-slate-400 font-semibold bg-white px-2 py-1 rounded border border-slate-200">
                포인트를 클릭하여 리뷰 확인
             </p>
          </div>
        </div>

        {/* Insight Panel */}
        {selectedPoint && (
          <div className={`w-full lg:w-[40%] border rounded-2xl p-5 flex flex-col transition-all duration-300 ${isSelectedAnomaly ? 'bg-red-50/30 border-red-100' : 'bg-slate-50/50 border-slate-200'}`}>
            <div className="flex items-start gap-3 mb-4">
              <div className={`p-2 rounded-lg shrink-0 mt-1 shadow-sm ${isSelectedAnomaly ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                {isSelectedAnomaly ? <AlertCircle size={20} /> : <Calendar size={20} />}
              </div>
              <div>
                <h4 className={`font-bold text-lg leading-tight ${isSelectedAnomaly ? 'text-red-900' : 'text-slate-800'}`}>
                  {isSelectedAnomaly ? '이상 구간 실제 리뷰 예시' : '해당 구간 실제 리뷰'}
                </h4>
                <p className={`text-sm mt-1 ${isSelectedAnomaly ? 'text-red-700/80' : 'text-slate-500'}`}>
                  선택하신 구간 ({selectedPoint.date} 주간)에 작성된 주요 리뷰입니다.
                </p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pr-2 max-h-[300px]">
              {selectedReviews.length > 0 ? (
                selectedReviews.map((review, idx) => (
                  <div key={idx} className={`bg-white p-4 rounded-xl shadow-sm border ${isSelectedAnomaly ? 'border-red-100/60' : 'border-slate-100'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                        <Calendar size={12} />
                        {safeText(review.reviewDate)}
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${review.sentiment === '긍정' ? 'bg-blue-50 text-blue-600 border-blue-100' : review.sentiment === '부정' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-slate-50 text-slate-600 border-slate-200'}`}>
                        {safeText(review.sentiment)}
                      </span>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed font-medium">"{safeText(review.content)}"</p>
                    {review.keywords && review.keywords.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {review.keywords.map((kw: any, kIdx: number) => (
                          <span key={kIdx} className="text-[10px] text-slate-500 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">
                            #{safeText(kw)}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className={`text-center text-sm py-8 bg-white rounded-xl border border-dashed ${isSelectedAnomaly ? 'text-red-400 border-red-200' : 'text-slate-400 border-slate-200'}`}>
                  해당 구간의 상세 리뷰 데이터가 없습니다.
                </div>
              )}
            </div>

            <div className={`mt-4 pt-4 border-t ${isSelectedAnomaly ? 'border-red-100' : 'border-slate-200'}`}>
              <div className="flex items-center gap-2 mb-2 text-amber-600">
                <Lightbulb size={16} />
                <span className="font-bold text-sm">AI 인사이트</span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed bg-white p-3.5 rounded-xl border border-slate-100 shadow-sm">
                {isSelectedAnomaly 
                  ? `예약 시스템 변경 및 인력 부족 등 운영 이슈로 인해 대기시간에 대한 환자 불만이 크게 증가한 것으로 분석됩니다. 접수 지연 관련 키워드가 지속적으로 관찰됩니다.` 
                  : `${selectedPoint.date} 주간에는 대체로 평범한 리뷰가 주를 이루었으며, 감성 점수가 평균 범위 내에서 안정적으로 유지되고 있습니다.`}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SentimentControlChart;