# BTS THE CITY ARIRANG — SEOUL 💜

방탄소년단 'BTS THE CITY ARIRANG SEOUL' 마스터 가이드 랜딩페이지

## 🚀 배포 방법 (Vercel)

### 방법 1: GitHub 연동 (추천)

1. **GitHub에 레포 만들기**
   - GitHub.com → New Repository → 이름: `bts-arirang-seoul`
   - Public or Private 선택 후 Create

2. **이 폴더를 GitHub에 업로드**
   ```bash
   cd bts-arirang-seoul
   git init
   git add .
   git commit -m "BTS THE CITY ARIRANG SEOUL landing page"
   git branch -M main
   git remote add origin https://github.com/[내아이디]/bts-arirang-seoul.git
   git push -u origin main
   ```

3. **Vercel에서 배포**
   - [vercel.com](https://vercel.com) 접속 → GitHub 로그인
   - "Add New Project" 클릭
   - 방금 만든 `bts-arirang-seoul` 레포 선택
   - Framework Preset: `Vite` 자동 감지됨
   - "Deploy" 클릭
   - 완료! `https://bts-arirang-seoul.vercel.app` 같은 링크 생성

### 방법 2: Vercel CLI로 바로 배포

```bash
# Vercel CLI 설치
npm i -g vercel

# 프로젝트 폴더에서 실행
cd bts-arirang-seoul
npm install
vercel
```

## 🛠 로컬에서 확인하기

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:5173` 접속

## 📁 프로젝트 구조

```
bts-arirang-seoul/
├── index.html          # HTML 엔트리
├── package.json        # 의존성
├── vite.config.js      # Vite 설정
├── .gitignore
├── public/
│   ├── bts-logo.png    # ← BTS 로고 여기에!
│   └── army-logo.png   # ← ARMY 로고 여기에!
└── src/
    ├── main.jsx        # React 엔트리
    └── App.jsx         # 랜딩페이지 전체
```

## 💜 로고 넣기

`public/` 폴더에 아래 파일을 넣어주세요:

- **bts-logo.png** — BTS 공식 로고 (투명 배경)
- **army-logo.png** — ARMY 공식 로고 (투명 배경)

흰색 로고를 추천합니다 (다크 배경). 파일이 없으면 텍스트로 자동 대체됩니다.
