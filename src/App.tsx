import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import KpiCards from './components/KpiCards';
import RankingGrid from './components/RankingGrid';
import KeywordAnalysis from './components/KeywordAnalysis';
import PositioningMap from './components/PositioningMap';
import SentimentControlChart from './components/SentimentControlChart';
import CategoryRadar from './components/CategoryRadar';
import InsightPanel from './components/InsightPanel';

import { getOptions, getHospitals, getHospitalDetail, getRankings } from './api/client';
import type { Hospital } from './types/hospital';
import { Menu, Activity } from 'lucide-react';
import { safeText } from './utils/safeText';

function App() {
  const [selectedCity] = useState<string>('수원시');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('영통구');
  const [selectedDept, setSelectedDept] = useState<string>('내과');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [rankings, setRankings] = useState<Hospital[]>([]);
  const [selectedHospitalId, setSelectedHospitalId] = useState<string | null>(null);
  const [selectedHospitalInfo, setSelectedHospitalInfo] = useState<Hospital | null>(null);
  const [options, setOptions] = useState<{districts: string[], specialties: string[]}>({ districts: [], specialties: [] });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDetailLoading, setIsDetailLoading] = useState<boolean>(false);

  React.useEffect(() => {
    getOptions()
      .then(setOptions)
      .catch((err) => console.error('옵션 로딩 실패', err));
  }, []);

  React.useEffect(() => {
    setIsLoading(true);

    Promise.all([
      getHospitals(selectedDistrict, selectedDept),
      getRankings(selectedDistrict, selectedDept)
    ])
      .then(([hospitalData, rankingData]) => {
        setHospitals(hospitalData);
        setRankings(rankingData);

        if (hospitalData.length > 0) {
          const exists = selectedHospitalId && hospitalData.some(h => String(h.id) === String(selectedHospitalId));
          if (!exists) setSelectedHospitalId(String(hospitalData[0].id));
        } else {
          setSelectedHospitalId(null);
          setSelectedHospitalInfo(null);
        }
      })
      .catch((err) => {
        console.error('병원 목록 로딩 실패', err);
        setHospitals([]);
        setRankings([]);
        setSelectedHospitalId(null);
      })
      .finally(() => setIsLoading(false));
  }, [selectedDistrict, selectedDept]);

  React.useEffect(() => {
    if (!selectedHospitalId) {
      setSelectedHospitalInfo(null);
      return;
    }

    setIsDetailLoading(true);
    getHospitalDetail(selectedHospitalId)
      .then((detail) => {
        const fromList = hospitals.find(h => String(h.id) === String(selectedHospitalId));
        const merged = { ...fromList, ...detail } as Hospital;
        setSelectedHospitalInfo(merged);
      })
      .catch((err) => {
        console.error('병원 상세 데이터 로딩 실패', err);
        setSelectedHospitalInfo(null);
      })
      .finally(() => setIsDetailLoading(false));
  }, [selectedHospitalId, hospitals]);

  const handleAnalyze = () => {
    setIsSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDownloadReport = () => {
    if (!selectedHospitalInfo) return;

    const content = `
      <h1>VITAL 분석 리포트 - ${selectedHospitalInfo.name}</h1>
      <p>종합 점수: ${selectedHospitalInfo.totalScore}점</p>
      <p>지역 내 순위: ${selectedHospitalInfo.district} ${selectedHospitalInfo.department} ${selectedHospitalInfo.districtRank}위 / ${selectedHospitalInfo.districtTotal}개</p>
      <p>수원시 전체 순위: ${selectedHospitalInfo.city} ${selectedHospitalInfo.department} ${selectedHospitalInfo.cityRank}위 / ${selectedHospitalInfo.cityTotal}개</p>
      <p>긍정 리뷰 비율: ${selectedHospitalInfo.positiveRate}%</p>
      <p>부정 리뷰 비율: ${selectedHospitalInfo.negativeRate}%</p>
      <h2>업체 포지셔닝: ${selectedHospitalInfo.status}</h2>
      <p>${selectedHospitalInfo.statusDescription}</p>
      <h2>추천 개선 액션</h2>
      <ul>
        ${selectedHospitalInfo.improvementActions.map(a => `<li>${safeText(a)}</li>`).join('')}
      </ul>
    `;

    const blob = new Blob([content], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedHospitalInfo.name}_VITAL_분석리포트.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredHospitals = hospitals.filter(h =>
    h.name.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex">
      <Sidebar
        selectedCity={selectedCity}
        selectedDistrict={selectedDistrict}
        selectedDept={selectedDept}
        searchKeyword={searchKeyword}
        onDistrictChange={setSelectedDistrict}
        onDeptChange={setSelectedDept}
        onSearchChange={setSearchKeyword}
        onAnalyze={handleAnalyze}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        districts={options.districts}
        departments={options.specialties}
      />

      <main className="flex-1 lg:ml-72 min-w-0 transition-all duration-300">
        <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-30 px-4 flex items-center justify-between">
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 rounded-lg hover:bg-slate-100">
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2 font-bold text-primary">
            <Activity className="w-5 h-5" />
            VITAL
          </div>
          <div className="w-10" />
        </div>

        <div className="p-4 md:p-8 lg:p-10 pt-20 lg:pt-10 max-w-[1600px] mx-auto">
          {isLoading ? (
            <div className="flex items-center justify-center h-[70vh]">
              <div className="text-center">
                <Activity className="w-12 h-12 text-primary animate-pulse mx-auto mb-4" />
                <p className="text-slate-500 font-medium">DB 기준 병원 데이터를 불러오는 중입니다...</p>
              </div>
            </div>
          ) : !selectedHospitalInfo || isDetailLoading ? (
            <div className="flex items-center justify-center h-[70vh]">
              <div className="text-center">
                <Activity className="w-12 h-12 text-primary animate-pulse mx-auto mb-4" />
                <p className="text-slate-500 font-medium">병원 상세 분석 데이터를 불러오는 중입니다...</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-col md:flex-row md:items-start justify-between mb-8 gap-4">
                <div>
                  <div className="text-xs font-semibold text-slate-400 mb-2 flex items-center flex-wrap gap-1 md:gap-2">
                    <span>현재 분석 기준: {selectedCity}</span>
                    {selectedDistrict && <><span>{'>'}</span><span>{selectedDistrict}</span></>}
                    {selectedDept && <><span>{'>'}</span><span>{selectedDept}</span></>}
                  </div>
                  <h1 className="text-2xl md:text-3xl font-black text-slate-800 mb-3 break-keep">
                    {selectedHospitalInfo.name} 분석 리포트
                  </h1>
                  <p className="text-sm text-slate-500">
                    네이버 리뷰 <span className="font-bold text-slate-700">{(selectedHospitalInfo.reviewCount || 0).toLocaleString()}건</span>을 분석한 시장 종합 리포트입니다.
                  </p>
                </div>

                <button
                  onClick={handleDownloadReport}
                  className="shrink-0 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-5 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition-colors flex items-center gap-2 self-start"
                >
                  리포트 다운로드
                </button>
              </div>

              <div className="space-y-8">
                <KpiCards hospital={selectedHospitalInfo} />

                {filteredHospitals.length > 0 ? (
                  <RankingGrid
                    hospitals={filteredHospitals}
                    rankings={rankings}
                    selectedHospitalId={selectedHospitalId}
                    onSelectHospital={setSelectedHospitalId}
                    title={`${selectedDistrict || '전체'} ${selectedDept || '전체'} 종합 전체 순위`}
                  />
                ) : (
                  <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center text-slate-500 shadow-sm">
                    현재 선택한 조건에 해당하는 병원이 없습니다.
                  </div>
                )}

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                  <CategoryRadar hospital={selectedHospitalInfo} />
                  <PositioningMap hospital={selectedHospitalInfo} />
                </div>

                <KeywordAnalysis hospital={selectedHospitalInfo} />
                <SentimentControlChart hospital={selectedHospitalInfo} />
                <InsightPanel hospital={selectedHospitalInfo} onDownload={handleDownloadReport} />
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
