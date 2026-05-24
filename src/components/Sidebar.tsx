import React from 'react';
import { Search, Activity, X } from 'lucide-react';

interface SidebarProps {
  selectedCity?: string;
  selectedDistrict?: string;
  selectedDept?: string;
  searchKeyword?: string;
  onDistrictChange?: (district: string) => void;
  onDeptChange?: (dept: string) => void;
  onSearchChange?: (keyword: string) => void;
  onAnalyze?: () => void;
  isOpen?: boolean;
  onClose?: () => void;
  districts?: string[];
  departments?: string[];
}

const DEFAULT_DISTRICTS = ['영통구', '팔달구', '장안구', '권선구'];
const DEFAULT_DEPARTMENTS = ['내과', '치과', '피부과', '정형외과', '이비인후과', '산부인과', '소아과'];

export default function Sidebar({
  selectedCity = '수원시',
  selectedDistrict = '',
  selectedDept = '',
  searchKeyword = '',
  onDistrictChange = () => {},
  onDeptChange = () => {},
  onSearchChange = () => {},
  onAnalyze = () => {},
  isOpen = false,
  onClose = () => {},
  districts = [],
  departments = []
}: SidebarProps) {
  const districtOptions = Array.isArray(districts) && districts.length > 0 ? districts : DEFAULT_DISTRICTS;
  const departmentOptions = Array.isArray(departments) && departments.length > 0 ? departments : DEFAULT_DEPARTMENTS;

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      <div className={`
        fixed top-0 left-0 h-screen w-80 bg-white border-r border-slate-200 flex flex-col z-50
        transition-transform duration-300 ease-in-out shadow-2xl lg:shadow-[2px_0_10px_rgba(0,0,0,0.02)]
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
      `}>
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Activity className="w-8 h-8 text-teal-500" strokeWidth={2.5} />
              <h1 className="font-black text-3xl tracking-tight text-blue-700">VITAL</h1>
            </div>
            <p className="text-[10px] text-slate-400 font-semibold tracking-widest pl-1">
              REVIEW INTELLIGENCE DASHBOARD
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 -mr-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 p-6 flex flex-col gap-6 overflow-y-auto">
          <div>
            <h2 className="text-xs font-bold text-slate-400 mb-4 tracking-wider">SEARCH SETUP</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">시/도</label>
                <select
                  value={selectedCity}
                  disabled
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700"
                >
                  <option value="수원시">수원시</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">구/군</label>
                <select
                  value={selectedDistrict}
                  onChange={e => onDistrictChange(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                >
                  <option value="">전체</option>
                  {districtOptions.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">진료과</label>
                <select
                  value={selectedDept}
                  onChange={e => onDeptChange(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                >
                  <option value="">전체</option>
                  {departmentOptions.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">병원 검색</label>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchKeyword}
                    onChange={e => onSearchChange(e.target.value)}
                    placeholder="병원명 입력"
                    className="w-full p-2.5 pl-9 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
                  />
                </div>
              </div>

              <button
                onClick={onAnalyze}
                className="w-full py-3 bg-primary hover:bg-primary-hover text-white rounded-xl text-sm font-semibold shadow-md shadow-primary/25 transition-all active:scale-[0.98] mt-4"
              >
                리포트 분석 실행
              </button>
            </div>
          </div>

          <hr className="border-slate-100" />

          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 mt-auto">
            <h2 className="text-[10px] font-bold text-slate-400 mb-2 tracking-wider">NOW VIEWING</h2>
            <p className="font-bold text-slate-800 text-lg mb-1 break-keep">
              {selectedDistrict || '전체'} {selectedDept || '전체'}
            </p>
            <p className="text-xs text-slate-500">
              순위 목록에서 병원을 선택하면 상세 분석이 표시됩니다.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
