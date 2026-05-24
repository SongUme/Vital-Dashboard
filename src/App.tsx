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
import { Menu, Activity, Search, BarChart3 } from 'lucide-react';
import { safeText } from './utils/safeText';

function App() {
  const [selectedCity] = useState<string>('수원시');

  // pending: 드롭다운에서 선택 중인 값 (아직 적용 안 됨)
  const [pendingDistrict, setPendingDistrict] = useState<string>('');
  const [pendingDept, setPendingDept] = useState<string>('');

  // applied: 실제 분석에 적용된 값 (버튼 클릭 후)
  const [appliedDistrict, setAppliedDistrict] = useState<string>('');
  const [appliedDept, setAppliedDept] = useState<string>('');

  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [rankings, setRankings] = useState<Hospital[]>([]);
  const [selectedHospitalId, setSelectedHospitalId] = useState<string | null>(null);
  const [selectedHospitalInfo, setSelectedHospitalInfo] = useState<Hospital | null>(null);
  const [options, setOptions] = useState<{districts: string[], specialties: string[]}>({ districts: [], specialties: [] });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDetailLoading, setIsDetailLoading] = useState<boolean>(false);

  // 분석이 실행되었는지 여부
  const [hasAnalyzed, setHasAnalyzed] = useState<boolean>(false);

  // 옵션 로딩 (페이지 최초 1회)
  React.useEffect(() => {
    getOptions()
      .then(setOptions)
      .catch((err) => console.error('옵션 로딩 실패', err));
  }, []);

  // 병원 상세 데이터 로딩 (사용자가 병원 클릭 시에만)
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

  // "리포트 분석 실행" 버튼 클릭 핸들러
  const handleAnalyze = () => {
    setIsSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // pending → applied 적용
    const district = pendingDistrict;
    const dept = pendingDept;
    setAppliedDistrict(district);
    setAppliedDept(dept);

    // 기존 선택 초기화
    setSelectedHospitalId(null);
    setSelectedHospitalInfo(null);
    setHasAnalyzed(true);
    setIsLoading(true);

    // "전체"인 경우 빈 문자열로 전달 (query param 생략)
    const districtParam = district || undefined;
    const deptParam = dept || undefined;

    Promise.all([
      getHospitals(districtParam, deptParam),
      getRankings(districtParam, deptParam)
    ])
      .then(([hospitalData, rankingData]) => {
        setHospitals(hospitalData);
        setRankings(rankingData);
      })
      .catch((err) => {
        console.error('병원 목록 로딩 실패', err);
        setHospitals([]);
        setRankings([]);
      })
      .finally(() => setIsLoading(false));
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

  // TOP20 제목 생성
  const getRankingTitle = () => {
    const d = appliedDistrict || '전체';
    const s = appliedDept || '전체';
    if (d === '전체' && s === '전체') return '전체 병원 종합 순위 TOP20';
    if (d === '전체') return `수원시 전체 ${s} 종합 순위 TOP20`;
    if (s === '전체') return `${d} 전체 진료과 종합 순위 TOP20`;
    return `${d} ${s} 종합 순위 TOP20`;
  };

  // 현재 분석 기준 breadcrumb
  const getBreadcrumb = () => {
    if (!hasAnalyzed) return '현재 분석 기준을 선택해주세요.';
    const parts = [selectedCity];
    if (appliedDistrict) parts.push(appliedDistrict);
    if (appliedDept) parts.push(appliedDept);
    if (selectedHospitalInfo) parts.push(selectedHospitalInfo.name);
    return `현재 분석 기준: ${parts.join(' > ')}`;
  };

  // NOW VIEWING 텍스트
  const getNowViewingText = () => {
    if (!hasAnalyzed) return { title: '분석 대기', desc: '분석할 병원을 선택해주세요.' };
    if (!selectedHospitalInfo) return { 
      title: `${appliedDistrict || '전체'} ${appliedDept || '전체'}`, 
      desc: '병원 목록에서 병원을 선택하면 상세 분석이 표시됩니다.' 
    };
    return { 
      title: selectedHospitalInfo.name, 
      desc: `${selectedHospitalInfo.district} · ${selectedHospitalInfo.department}` 
    };
  };

  const nowViewing = getNowViewingText();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex">
      <Sidebar
        selectedCity={selectedCity}
        selectedDistrict={pendingDistrict}
        selectedDept={pendingDept}
        searchKeyword={searchKeyword}
        onDistrictChange={setPendingDistrict}
        onDeptChange={setPendingDept}
        onSearchChange={setSearchKeyword}
        onAnalyze={handleAnalyze}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        districts={options.districts}
        departments={options.specialties}
        nowViewingTitle={nowViewing.title}
        nowViewingDesc={nowViewing.desc}
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

          {/* 초기 상태: 분석 전 */}
          {!hasAnalyzed ? (
            <div className="flex items-center justify-center h-[70vh]">
              <div className="text-center max-w-md">
                <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold text-slate-700 mb-3">VITAL 분석을 시작하세요</h2>
                <p className="text-slate-500 leading-relaxed">
                  좌측 패널에서 지역과 진료과를 선택한 뒤<br />
                  <strong className="text-primary">리포트 분석 실행</strong> 버튼을 눌러주세요.
                </p>
              </div>
            </div>

          /* 로딩 중 */
          ) : isLoading ? (
            <div className="flex items-center justify-center h-[70vh]">
              <div className="text-center">
                <Activity className="w-12 h-12 text-primary animate-pulse mx-auto mb-4" />
                <p className="text-slate-500 font-medium">DB 기준 병원 데이터를 불러오는 중입니다...</p>
              </div>
            </div>

          /* 분석 실행 완료 후 */
          ) : (
            <>
              {/* Breadcrumb */}
              <div className="flex flex-col md:flex-row md:items-start justify-between mb-8 gap-4">
                <div>
                  <div className="text-xs font-semibold text-slate-400 mb-2 flex items-center flex-wrap gap-1 md:gap-2">
                    <span>{getBreadcrumb()}</span>
                  </div>

                  {selectedHospitalInfo ? (
                    <>
                      <h1 className="text-2xl md:text-3xl font-black text-slate-800 mb-3 break-keep">
                        {selectedHospitalInfo.name} 분석 리포트
                      </h1>
                      <p className="text-sm text-slate-500">
                        네이버 리뷰 <span className="font-bold text-slate-700">{(selectedHospitalInfo.reviewCount || 0).toLocaleString()}건</span>을 분석한 시장 종합 리포트입니다.
                      </p>
                    </>
                  ) : (
                    <>
                      <h1 className="text-2xl md:text-3xl font-black text-slate-800 mb-3 break-keep">
                        {appliedDistrict || '전체'} {appliedDept || '전체'} 분석
                      </h1>
                      <p className="text-sm text-slate-500">
                        아래 병원 목록에서 병원을 선택하면 상세 리포트가 표시됩니다.
                      </p>
                    </>
                  )}
                </div>

                {selectedHospitalInfo && (
                  <button
                    onClick={handleDownloadReport}
                    className="shrink-0 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-5 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition-colors flex items-center gap-2 self-start"
                  >
                    리포트 다운로드
                  </button>
                )}
              </div>

              <div className="space-y-8">
                {/* 병원 상세가 선택된 경우 KPI 표시 */}
                {selectedHospitalInfo && (
                  <KpiCards hospital={selectedHospitalInfo} />
                )}

                {/* 병원 상세 로딩 중 */}
                {isDetailLoading && selectedHospitalId && (
                  <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm text-center">
                    <Activity className="w-8 h-8 text-primary animate-pulse mx-auto mb-3" />
                    <p className="text-slate-500 font-medium">병원 상세 분석 데이터를 불러오는 중입니다...</p>
                  </div>
                )}

                {/* TOP20 순위 */}
                {filteredHospitals.length > 0 ? (
                  <RankingGrid
                    hospitals={filteredHospitals}
                    rankings={rankings}
                    selectedHospitalId={selectedHospitalId}
                    onSelectHospital={setSelectedHospitalId}
                    title={getRankingTitle()}
                  />
                ) : (
                  <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center text-slate-500 shadow-sm">
                    선택한 조건에 해당하는 병원이 없습니다.
                  </div>
                )}

                {/* 병원 선택 전 안내 */}
                {!selectedHospitalInfo && !isDetailLoading && (
                  <div className="bg-white rounded-2xl p-12 border border-slate-200 shadow-sm text-center">
                    <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mx-auto mb-4">
                      <BarChart3 className="w-8 h-8 text-slate-300" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-600 mb-2">상세 분석 리포트</h3>
                    <p className="text-slate-400">
                      위 순위 목록에서 병원을 선택하면 상세 분석 리포트가 표시됩니다.
                    </p>
                  </div>
                )}

                {/* 병원 상세 리포트 */}
                {selectedHospitalInfo && !isDetailLoading && (
                  <>
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                      <CategoryRadar hospital={selectedHospitalInfo} />
                      <PositioningMap hospital={selectedHospitalInfo} />
                    </div>

                    <KeywordAnalysis hospital={selectedHospitalInfo} />
                    <SentimentControlChart hospital={selectedHospitalInfo} />
                    <InsightPanel hospital={selectedHospitalInfo} onDownload={handleDownloadReport} />
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
