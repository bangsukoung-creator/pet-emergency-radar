# 펫 응급 레이더 배포 가이드

## 📦 배포 옵션

### 1. GitHub Pages 배포 (권장)

#### 단계별 가이드

1. **저장소 설정**
   - GitHub에서 저장소 Settings로 이동
   - "Pages" 섹션 선택
   - Source를 "Deploy from a branch"로 설정
   - Branch를 "master" 또는 "main"으로 선택

2. **빌드 및 배포**
   ```bash
   npm run build
   git add dist/
   git commit -m "Build: Production build"
   git push origin master
   ```

3. **배포 확인**
   - GitHub Pages URL: `https://[username].github.io/pet-emergency-radar/`
   - 약 1-2분 후 사이트가 활성화됨

### 2. Vercel 배포

1. **Vercel 계정 생성**
   - https://vercel.com에 가입

2. **프로젝트 연결**
   - Vercel 대시보드에서 "New Project" 클릭
   - GitHub 저장소 선택
   - 기본 설정으로 배포

3. **배포 URL**
   - Vercel이 자동으로 URL 생성
   - 예: `https://pet-emergency-radar.vercel.app`

### 3. Netlify 배포

1. **Netlify 계정 생성**
   - https://netlify.com에 가입

2. **프로젝트 연결**
   - "New site from Git" 클릭
   - GitHub 저장소 선택
   - Build command: `npm run build`
   - Publish directory: `dist`

3. **배포 URL**
   - Netlify가 자동으로 URL 생성

## 🌐 커스텀 도메인 설정

### GitHub Pages
```
1. 저장소 Settings > Pages
2. Custom domain 입력
3. DNS 레코드 설정 (호스팅 제공자)
```

### Vercel/Netlify
```
1. 프로젝트 Settings
2. Domains 섹션에서 커스텀 도메인 추가
3. DNS 레코드 설정
```

## 🔧 환경 변수 설정

현재 앱은 환경 변수가 필요하지 않습니다. 필요시 다음과 같이 추가할 수 있습니다:

```bash
# .env.local 파일 생성
VITE_EMERGENCY_PHONE=+82XXXXXXXX
VITE_MAPS_API_KEY=your_api_key
```

## 📱 모바일 앱 배포 (선택사항)

### PWA (Progressive Web App) 변환

1. **manifest.json 추가**
   ```json
   {
     "name": "펫 응급 레이더",
     "short_name": "펫 응급",
     "description": "반려동물 응급처치 가이드",
     "start_url": "/",
     "display": "standalone",
     "background_color": "#ffffff",
     "theme_color": "#87CEEB",
     "icons": []
   }
   ```

2. **Service Worker 등록**
   - 오프라인 지원 추가
   - 캐싱 전략 구현

## 🚀 CI/CD 자동화

### GitHub Actions 예제

```yaml
name: Deploy

on:
  push:
    branches: [master, main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## 📊 배포 후 모니터링

### 성능 측정
- Google PageSpeed Insights
- Lighthouse
- WebPageTest

### 분석 도구
- Google Analytics
- Sentry (에러 추적)

## 🔒 보안 체크리스트

- [ ] HTTPS 활성화
- [ ] 보안 헤더 설정
- [ ] CORS 정책 검토
- [ ] 민감한 정보 제거
- [ ] 의존성 보안 업데이트

## 📞 긴급 연락처 설정

현재 플레이스홀더 번호를 실제 번호로 변경:

```javascript
// public/app.js에서
const phoneNumber = 'tel:+82XXXXXXXX'; // 실제 번호로 변경
```

## 🐛 배포 후 테스트

1. **기능 테스트**
   - 모든 화면 네비게이션 확인
   - 버튼 클릭 동작 확인
   - 이미지 로딩 확인

2. **모바일 테스트**
   - 반응형 디자인 확인
   - 터치 인터페이스 테스트
   - 다양한 기기에서 테스트

3. **접근성 테스트**
   - 키보드 네비게이션
   - 스크린 리더 호환성
   - 색상 대비 확인

## 📝 배포 체크리스트

- [ ] 모든 이미지 최적화
- [ ] 번들 크기 확인
- [ ] 캐싱 정책 설정
- [ ] 에러 페이지 설정
- [ ] 404 페이지 커스터마이징
- [ ] robots.txt 설정
- [ ] sitemap.xml 생성

---

**배포 완료 후 다음 URL에서 앱을 확인할 수 있습니다:**
- GitHub Pages: https://[username].github.io/pet-emergency-radar/
- Vercel: https://pet-emergency-radar.vercel.app
- Netlify: https://pet-emergency-radar.netlify.app
