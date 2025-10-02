# DangTrip

> 반려견 동반 산책/장소/커뮤니티/쇼핑을 한 곳에서 제공하는 모바일 앱 (React Native)

DangTrip은 반려견과 함께하는 산책, 장소 탐색(카페/병원), 커뮤니티, 쇼핑/쿠폰, 채팅까지 한 번에 즐길 수 있는 크로스플랫폼 앱입니다.

## 기술 스택

### Backend / API 연동
- 사내/개발 백엔드 REST API (토큰 기반 인증)
- Axios 기반 공통 API 헬퍼(`src/util/api.js`)

### Mobile (Frontend)
- React Native 0.80, React 19
- Navigation: `@react-navigation/native`, `@react-navigation/native-stack`
- Maps/Location: `react-native-maps`, `react-native-geolocation-service`
- Realtime: `@stomp/stompjs`, `sockjs-client`
- Media: `react-native-image-picker`, `react-native-webview`, `react-native-youtube-iframe`
- UI: `react-native-vector-icons`, `react-native-safe-area-context`, `react-native-screens`
- Address: `react-native-daum-postcode`

### Development
- TypeScript, Jest, ESLint, Prettier
- Metro, Android Studio, Xcode

## 구현 기능

### 1. 사용자 인증/프로필
- 로그인/회원가입, 토큰 기반 인증
- 내 정보 수정(주소/연락처/프로필/로그인 정보)

### 2. 지도/장소
- 카페/동물병원 목록 및 상세, 사용자 현재 위치 기반 탐색
- 지도 마커 및 카메라 이동, 장소 상세 화면 연계

### 3. 산책
- 근처/인기/추천/야간 산책로 목록 및 상세
- 산책 기록, 그룹 산책 참여/상세

### 4. 커뮤니티/채팅
- 게시글 작성/상세, 내 커뮤니티 관리
- 1:1 문의/채팅 (STOMP 기반)

### 5. 쇼핑/쿠폰
- 상품 목록/상세, 장바구니, 주문, 쿠폰함

### 6. 날씨/유틸
- 기상청 단기예보 기반 현재 기온/습도/하늘/강수 카드 Carousel
- 발표시간 보정 로직(`src/util/getKmaDateTime.js`)으로 데이터 공백 시간 대응

## 사용 API 및 오픈 API

### 백엔드 API
- BASE: `API_BASE` (예: `http://192.168.45.62:8080`) – 환경/에뮬레이터별 주소 분리
- 공통 헬퍼: `get/post/put/delete` + `*WithToken`로 표준화, 오류 로깅/토큰 주입 일관성

### 오픈 API
- Google Maps Platform (Maps SDK for Android/iOS)
  - 지도 렌더링/마커/카메라 이동
  - 이유: 안정적 성능과 풍부한 지도 인터랙션, 크로스플랫폼 일관성
- 기상청 단기예보(공공데이터포털)
  - 현재/예보 데이터로 산책 의사결정 지원
  - 이유: 공공 데이터 기반 신뢰성과 지역성
- 다음 우편번호(react-native-daum-postcode)
  - 주소 검색/자동완성으로 가입/프로필 UX 개선
  - 이유: 오입력 방지, 빠른 주소 입력 경험

## 프로젝트 특징

### 아키텍처/품질
- API 호출 헬퍼 일원화(토큰/에러 처리 표준화)
- TypeScript 도입으로 정적 타이핑 강화(점진적)
- 리스트/카드 UI 성능 최적화(가로 스크롤, 페이징, 이미지 플레이스홀더)

### 도메인 특화
- 산책 전 의사결정 보조(기상청 발표시간 보정)
- 플랫폼별 이미지 URL 분기(`Platform.OS`)로 네트워크 경로 안정화

## 프로젝트 구조

```
src/
  screens/              # Walk/WalkGroup/Cafe/Hospital/Community/Shopping/My 등 화면
  util/                 # api.js, getKmaDateTime.js, timeAgo.js 등 유틸
  data/                 # locations.json, MapStyle.json 등 정적 데이터
assets/                 # 이미지/아이콘/폰트
android/ ios/           # 네이티브 프로젝트
```

## 시작하기

### 필수 요구사항
- Node.js 18+
- Android Studio / Xcode
- Java JDK, Watchman(권장)

### 설치 및 실행

1) 의존성 설치
```
npm install
```

2) 개발 서버(메트로) 실행
```
npm start
```

3) Android 실행
```
npm run android
```

4) iOS 실행
```
cd ios && bundle install && bundle exec pod install && cd ..
npm run ios
```

## 환경 설정
- `src/util/api.js`의 `API_BASE`를 환경에 맞게 설정
  - Android 에뮬레이터: `http://10.0.2.2:<port>`
  - iOS 시뮬레이터: `http://localhost:<port>` 또는 Mac LAN IP
- 권한 문자열: `AndroidManifest.xml`, `Info.plist` 점검
- Google Maps API Key 플랫폼별 등록 필요

## 로드맵

### Phase 1: 기본 기능 고도화
- [x] 인증/프로필, 지도/산책, 커뮤니티/채팅, 쇼핑/쿠폰 기본 기능
- [x] 기상청 발표시간 보정 로직 반영

### Phase 2: 확장
- [ ] .env 기반 환경변수 도입 및 빌드 주입
- [ ] STOMP 실시간 알림/업데이트 강화
- [ ] E2E 테스트(Detox), 성능 프로파일링

### Phase 3: 고급 기능
- [ ] 개인화 추천(위치/이력 기반)
- [ ] 오프라인 모드/캐싱 전략
- [ ] 접근성 개선(스크린리더/동적 폰트)

## 라이선스

본 리포지토리의 라이선스가 별도 명시되지 않은 경우, 개인/학습 용도로만 사용하시기 바랍니다. 필요 시 `LICENSE` 파일을 추가해 주세요.
