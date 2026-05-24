# VITAL - Hospital Review Intelligence Dashboard

VITAL은 수원시 병원의 네이버 리뷰 데이터를 분석하여 주요 성과 지표(KPI), 키워드 IPA 분석, 감성 변화 추이, 맞춤형 개선 인사이트를 시각적으로 제공하는 웹 대시보드입니다.

## 배포 구조

```
[로컬 개발]
React 프론트엔드 (localhost:5173) → FastAPI 백엔드 (127.0.0.1:8000) → SQLite DB

[배포 환경]
Vercel 프론트엔드 → Render FastAPI 백엔드 → SQLite DB
```

- **프론트엔드**: Vercel — https://vital-dashboard-wheat.vercel.app/
- **백엔드**: Render — FastAPI + SQLite DB

---

## 로컬 실행 방법

### 1. 백엔드 서버 실행

백엔드는 `backend` 디렉토리에 있으며 FastAPI로 작성되었습니다.

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

서버는 기본적으로 `http://127.0.0.1:8000`에서 실행됩니다.

### 2. 프론트엔드 서버 실행

새로운 터미널 창을 열고, 프로젝트 루트 디렉토리에서 프론트엔드를 실행합니다.

```bash
npm install
npm run dev
```

명령어 실행 후 브라우저에서 `http://localhost:5173`으로 접속하여 화면을 확인할 수 있습니다.

### 3. 환경변수 설정

프로젝트 루트에 `.env` 파일을 생성합니다.

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

### 4. 프로젝트 빌드 (선택)

배포 전에 로컬에서 빌드가 정상적으로 완료되는지 확인합니다.

```bash
npm run build
```

---

## 배포 방법

### 1단계: GitHub에 코드 업로드

```bash
git add .
git commit -m "배포 준비: Render 백엔드 + Vercel 프론트엔드"
git push origin main
```

### 2단계: Render에 백엔드 배포

1. [Render](https://render.com)에 접속하여 GitHub 계정으로 로그인합니다.
2. **New → Web Service**를 선택합니다.
3. GitHub 저장소 `SongUme/vital-dashboard`를 연결합니다.
4. 아래와 같이 설정합니다:

| 설정 항목 | 값 |
|-----------|-----|
| **Name** | `vital-dashboard-api` (원하는 이름) |
| **Root Directory** | `backend` |
| **Runtime** | Python 3 |
| **Build Command** | `pip install -r requirements.txt` |
| **Start Command** | `uvicorn main:app --host 0.0.0.0 --port $PORT` |

5. **Create Web Service**를 클릭하여 배포합니다.
6. 배포 완료 후 발급된 URL을 확인합니다. (예: `https://vital-dashboard-api.onrender.com`)

### 3단계: Render 백엔드 API 동작 확인

브라우저에서 아래 주소에 접속하여 JSON이 정상 반환되는지 확인합니다.

```
https://Render에서_발급받은_URL/api/options
https://Render에서_발급받은_URL/api/hospitals
```

### 4단계: Vercel 프론트엔드 환경변수 설정

1. [Vercel](https://vercel.com) 대시보드에서 `vital-dashboard` 프로젝트를 선택합니다.
2. **Settings → Environment Variables**로 이동합니다.
3. 환경변수를 추가합니다:

| Key | Value |
|-----|-------|
| `VITE_API_BASE_URL` | `https://Render에서_발급받은_URL` |

> **중요**: Value에 URL 뒤에 `/`를 붙이지 마세요.

### 5단계: Vercel 재배포

환경변수 설정 후 반드시 재배포해야 적용됩니다.

1. Vercel 대시보드 → **Deployments** 탭
2. 가장 최근 배포의 **⋯** 메뉴 → **Redeploy** 클릭
3. 배포 완료 후 https://vital-dashboard-wheat.vercel.app/ 에서 확인

---

## 프로젝트 구조

```
Hospital Analystic/
├── src/                    # React 프론트엔드 소스
│   ├── api/
│   │   ├── client.ts       # API 호출 클라이언트
│   │   └── adapters.ts     # 데이터 변환 어댑터
│   ├── components/         # UI 컴포넌트
│   ├── types/              # TypeScript 타입 정의
│   └── utils/              # 유틸리티 함수
├── backend/                # FastAPI 백엔드
│   ├── main.py             # API 엔드포인트
│   ├── db.py               # SQLite DB 연결
│   ├── requirements.txt    # Python 패키지 목록
│   ├── runtime.txt         # Python 버전 지정
│   └── data/
│       └── vital_hospital_reviews.db  # SQLite DB
├── DB/                     # 원본 DB (로컬 전용)
├── package.json            # 프론트엔드 패키지 설정
├── vite.config.ts          # Vite 설정
├── .env                    # 로컬 환경변수 (Git 미포함)
└── .gitignore
```

## API 엔드포인트

| 엔드포인트 | 설명 |
|-----------|------|
| `GET /api/options` | 구/군, 진료과 필터 옵션 |
| `GET /api/hospitals` | 병원 목록 (district, specialty 파라미터) |
| `GET /api/rankings` | 병원 순위 |
| `GET /api/hospitals/{id}` | 병원 상세 분석 데이터 |
| `GET /api/hospitals/{id}/keywords` | 키워드 IPA 분석 |
| `GET /api/hospitals/{id}/categories` | 카테고리별 성과 |
| `GET /api/hospitals/{id}/time-series` | 감성 변화 추이 |
| `GET /api/hospitals/{id}/anomaly-reviews` | 이상 구간 리뷰 |
| `GET /api/hospitals/{id}/insights` | 개선 인사이트 |

## 기술 스택

- **프론트엔드**: React 19, TypeScript, Vite 8, TailwindCSS 4, Recharts
- **백엔드**: FastAPI, Uvicorn, SQLite3
- **배포**: Vercel (프론트엔드), Render (백엔드)
