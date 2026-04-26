# 펫 응급 레이더 (Pet Emergency Radar)

반려동물의 응급 상황에서 신속한 응급처치 정보를 제공하는 웹앱입니다.

## 📋 프로젝트 개요

**펫 응급 레이더**는 강아지와 고양이의 응급 상황에 대한 빠른 응급처치 요약을 제공합니다. 이 앱은 응급처치용 가이드이며, **정확한 진단과 처치는 반드시 수의사의 판단을 따르셔야 합니다.**

### 주요 기능

- **3개 화면 구성**: 메인 화면, 강아지 응급처치, 고양이 응급처치
- **단계별 응급처치 정보**: 각 동물별 5가지 주요 응급상황 대응법
- **긴급 전화 연동**: 한 번의 클릭으로 긴급 전화 시작
- **주변 병원 찾기**: 지도 연동으로 근처 동물병원 검색
- **오프라인 지원**: localStorage를 통한 오프라인 콘텐츠 열람
- **모바일 최적화**: 반응형 디자인으로 모든 기기에서 최적 경험 제공
- **접근성**: WCAG 준수 및 키보드 네비게이션 지원

## 🎨 디자인 특징

- **귀여운 스타일**: Fredoka One, Baloo 2 폰트를 활용한 친근한 UI
- **밝은 색상 팔레트**: 파스텔 톤의 배경과 따뜻한 주황색 액센트
- **터치 친화적**: 버튼 높이 48-56px로 모바일 터치 최적화
- **부드러운 애니메이션**: 화면 전환 및 상호작용 시 자연스러운 애니메이션

## 📁 프로젝트 구조

```
pet-emergency-radar/
├── public/
│   ├── index.html          # 메인 HTML 파일
│   ├── app.js              # 메인 JavaScript (SPA 로직)
│   ├── styles.css          # 스타일시트
│   └── assets/
│       └── images/
│           ├── hero.png    # 메인 화면 이미지
│           ├── dog_main.jpg    # 강아지 화면 이미지
│           └── cat_main.jpg    # 고양이 화면 이미지
├── package.json            # 프로젝트 설정
├── vite.config.js          # Vite 설정
└── README.md              # 이 파일
```

## 🚀 설치 및 실행

### 요구사항

- Node.js 18.0 이상
- npm 또는 pnpm

### 설치

```bash
# 프로젝트 디렉토리로 이동
cd pet-emergency-radar

# 의존성 설치
npm install
# 또는
pnpm install
```

### 개발 서버 실행

```bash
npm run dev
# 또는
pnpm dev
```

브라우저에서 `http://localhost:5173`으로 접속하면 앱을 사용할 수 있습니다.

### 빌드

```bash
npm run build
# 또는
pnpm build
```

빌드 결과물은 `dist/` 디렉토리에 생성됩니다.

### 빌드 결과 미리보기

```bash
npm run preview
# 또는
pnpm preview
```

## 📱 화면 구성

### 1. 메인 화면 (Main Screen)
- 앱 타이틀: "펫 응급 레이더"
- 히어로 이미지 (반응형 중앙 정렬)
- 두 개의 큰 버튼: "강아지 응급처치 보기" / "고양이 응급처치 보기"
- 하단 주의 문구

### 2. 강아지 응급처치 화면 (Dog Emergency Screen)
- 뒤로가기 버튼
- 강아지 이미지
- 5단계 응급처치 카드:
  1. 의식·호흡 확인
  2. 출혈 처리
  3. 기도 막힘
  4. 중독 의심
  5. 체온 관리
- 액션 버튼: 긴급 전화, 병원 찾기, 메인으로

### 3. 고양이 응급처치 화면 (Cat Emergency Screen)
- 강아지 화면과 동일 구조
- 고양이 이미지
- 5단계 응급처치 카드 (고양이용)

## 🔧 기술 스택

- **Frontend Framework**: Vanilla JavaScript (SPA)
- **Build Tool**: Vite
- **Styling**: CSS3 (Flexbox, Grid, Gradients)
- **Fonts**: Google Fonts (Fredoka One, Baloo 2)
- **Storage**: localStorage (오프라인 지원)
- **APIs**: Geolocation API, Maps API

## ♿ 접근성 (Accessibility)

- WCAG 2.1 AA 준수
- 색 대비 4.5:1 이상 (텍스트)
- 키보드 네비게이션 지원
- 포커스 스타일 제공
- 모든 이미지에 alt 텍스트 포함
- 고대비 모드 지원
- 모션 감소 설정 지원

## 🌐 배포

### GitHub Pages 배포

1. GitHub 저장소 생성
2. 프로젝트 빌드:
   ```bash
   npm run build
   ```
3. `dist/` 폴더를 GitHub Pages로 배포

### Vercel 배포

1. [Vercel](https://vercel.com)에 가입
2. GitHub 저장소 연결
3. 자동 배포 설정

## ⚠️ 중요 안내

**이 앱은 응급 요약용입니다. 정확한 진단과 처치는 반드시 수의사의 판단을 따르세요. 심한 경우 즉시 병원 방문하시기 바랍니다.**

## 📝 라이선스

이 프로젝트는 개인 및 상업적 사용을 위해 자유롭게 사용할 수 있습니다.

## 👨‍💻 개발자

펫 응급 레이더 개발팀

## 🐛 버그 리포트 및 기능 요청

문제가 발생하거나 새로운 기능을 제안하고 싶으시면 GitHub Issues를 통해 알려주세요.

---

**마지막 업데이트**: 2026년 4월 26일
