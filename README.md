# VITAL - Hospital Review Intelligence Dashboard

VITAL은 병원의 리뷰 데이터를 분석하여 주요 성과 지표(KPI)와 고객 반응(Sentiment)을 시각적으로 제공하는 웹 대시보드입니다. 현재 프론트엔드 UI와 더미 데이터를 바탕으로 동작합니다.

## 프로젝트 실행 방법

이 프로젝트는 React + Vite + TypeScript 프론트엔드와 FastAPI + SQLite 백엔드 환경에서 동작합니다.
로컬 환경에서 프로젝트를 실행하려면 아래 단계를 따라주세요.

### 1. 백엔드 서버 실행

백엔드는 `backend` 디렉토리에 있으며 FastAPI로 작성되었습니다.

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```
서버는 기본적으로 `http://127.0.0.1:8000` 에서 실행됩니다.

### 2. 프론트엔드 서버 실행

새로운 터미널 창을 열고, 프로젝트 루트 디렉토리에서 프론트엔드를 실행합니다.

```bash
npm install
npm run dev
```
명령어 실행 후 브라우저에서 `http://localhost:5173`으로 접속하여 화면을 확인할 수 있습니다.

### 3. 프로젝트 빌드 (선택)
배포 전에 로컬에서 빌드가 정상적으로 완료되는지 확인합니다.
```bash
npm run build
```

---

## 배포 방법 (GitHub & Vercel)

VITAL 웹사이트를 누구나 볼 수 있도록 Vercel을 이용해 무료로 배포할 수 있습니다.

### 1. GitHub에 코드 업로드하기
터미널을 열고 다음 명령어를 순서대로 입력하세요.

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/내아이디/저장소이름.git
git push -u origin main
```
> **참고**: `https://github.com/내아이디/저장소이름.git` 부분은 본인의 GitHub Repository 주소로 변경해야 합니다.

### 2. Vercel로 배포하기
1. [Vercel](https://vercel.com/) 웹사이트에 접속하여 GitHub 계정으로 로그인합니다.
2. 대시보드 우측 상단의 **[Add New...] -> [Project]**를 클릭합니다.
3. 방금 업로드한 GitHub 저장소(Repository)를 찾아 **[Import]** 버튼을 클릭합니다.
4. 프로젝트 설정 화면이 나오면 아래와 같이 기본 설정이 올바른지 확인합니다.
   - **Framework Preset**: `Vite` (자동으로 인식됨)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. **[Deploy]** 버튼을 클릭합니다.
6. 배포가 완료되면 제공된 Vercel 도메인(`https://...vercel.app`)을 클릭하여 접속합니다.

백엔드 서버나 API 연결 없이, 현재 작성된 더미 데이터와 프론트엔드 코드를 통해 작동하므로, 브라우저에서 화면과 차트가 정상적으로 보이는지 확인하시면 됩니다.
