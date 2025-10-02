반려견과 함께하는 라이프스타일 앱. 지도(카페/병원), 산책(개인/그룹), 커뮤니티, 쇼핑/쿠폰, 채팅, 프로필/인증 등 전반 기능을 React Native로 구현했습니다.

### 1) 기술 스택
- **React Native 0.80 / React 19**: 단일 코드베이스로 iOS/Android 동시 대응을 위해 선택
- **Navigation(@react-navigation)**: 스택 기반 전환과 딥링크 확장을 고려한 표준 라우팅
- **네트워킹(axios)**: 인터셉터/에러 처리 일원화와 토큰 기반 호출을 단순화
- **지도/위치(react-native-maps, geolocation-service)**: 산책/장소 기능의 핵심, 기기 위치 권한과 성능 고려
- **실시간( @stomp/stompjs, sockjs-client )**: 채팅/알림 등 실시간 상호작용 필요
- **UI(react-native-vector-icons, safe-area-context, screens)**: 안정적 UI 구성과 성능 최적화
- **미디어(webview, image-picker, youtube-iframe)**: 외부 콘텐츠/이미지 업로드/영상 임베드 대응
- **형상/Jest/ESLint/Prettier/TypeScript**: 일관된 품질과 정적 타이핑으로 유지보수성 강화

### 2) 구현 기능 요약
- 지도 화면: 카페/병원 마커, 사용자 위치 기반 탐색
- 산책: 근처/인기/추천/야간 산책로 목록, 상세, 산책 기록/그룹 산책
- 커뮤니티: 게시글 작성/상세/내 커뮤니티 관리
- 쇼핑: 상품 목록/상세/장바구니/주문, 쿠폰함 및 내 쿠폰
- 인증/프로필: 로그인/회원가입, 내 정보 수정(주소/연락처/프로필/로그인 정보)
- 채팅/문의: 1:1 문의 및 게시글 상세 대화
- 날씨 카드: 현재 기온/습도/하늘/강수 상태 카드 Carousel

### 3) 사용 API 및 오픈 API(WHY 포함)
- **백엔드 API**: `src/util/api.js`의 헬퍼(`get/post/put/delete*WithToken`)로 일원화
  - BASE: `API_BASE`(예: `http://192.168.45.62:8080`) — 환경/에뮬레이터별 주소 분리
  - 이유: 중복 제거, 오류 로깅 통일, 토큰 주입 표준화
- **기상청 단기예보 오픈 API(VilageFcstInfoService 2.0)**
  - 파일: `src/util/WeatherCarousel.js`, `src/util/getKmaDateTime.js`
  - 이유: 산책 전 날씨/강수/하늘 상태를 즉시 제공해 사용자 의사결정 지원
  - 특징: 발표시간 보정 로직으로 10분 지연 구간 데이터 공백 대응
- **지도/위치**: 기기 위치 권한과 지도 렌더링(`react-native-maps`)으로 주변 장소/산책로 경험 제공

#### 오픈 API 요약
- Google Maps Platform: 지도 렌더/마커/카메라(키 필요) — 안정적 성능과 풍부한 지도 인터랙션
- 기상청 단기예보: 현재/예보 데이터로 산책 의사결정 지원 — 발표시간 보정 적용
- 다음 우편번호(react-native-daum-postcode): 주소 검색/자동완성 — 가입·프로필 UX 개선

### 4) 프로젝트 구조
```
src/
  screens/      # 화면 단위(산책/그룹/커뮤니티/쇼핑/마이/병원/카페 등)
  util/         # API 헬퍼, 시간/날씨 유틸
  data/         # 정적 리소스(JSON)
assets/         # 이미지/아이콘/폰트
android, ios    # 네이티브 프로젝트
```

### 5) 실행 방법
```
npm install
npm start
npm run android
# iOS
cd ios && bundle install && bundle exec pod install && cd ..
npm run ios
```

### 6) 환경 설정 메모
- `src/util/api.js`의 `API_BASE`를 개발/배포 환경에 맞게 변경
  - Android 에뮬레이터: `http://10.0.2.2:<port>`
  - iOS 시뮬레이터: `http://localhost:<port>` 또는 Mac LAN IP
- 위치/카메라 등 권한 문자열: `AndroidManifest.xml`, `Info.plist`에 추가
- 지도 키(Google Maps 등) 플랫폼별 설정 필요

### 7) 프로젝트 특징(하이라이트)
- API 헬퍼 일원화로 호출부 단순화, 에러 로깅 일관성
- 날씨 발표시간 보정으로 오픈 API 현실 제약 대응
- 리스트/카드 UI 성능 최적화(가로 스크롤, 페이징, 이미지 플레이스홀더)
- 토큰 기반 보호 API 접근과 이미지 URL 빌드 분기(`Platform.OS`)

### 8) 로드맵(예시)
- .env 기반 환경변수 적용 및 빌드 시 주입
- STOMP 기반 알림/실시간 업데이트 고도화
- E2E 테스트(Detox) 및 성능 프로파일링 추가
