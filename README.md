Dangtrip — 포트폴리오 README (반려견 라이프스타일 앱)

Dangtrip은 반려견과 함께하는 삶을 더욱 풍요롭게 만들고자 개발된 크로스 플랫폼(iOS/Android) 모바일 애플리케이션입니다.
산책, 커뮤니티 활동, 주변 장소 탐색, 쇼핑까지 반려 생활 전반을 아우르는 기능을 React Native 기반 단일 코드베이스로 구현했습니다.

주요 기능 및 하이라이트
영역	주요 기능	특장점 (Highlights)
지도/위치	주변 카페/병원 마커 표시, 사용자 위치 기반 탐색	react-native-maps 기반의 일관된 지도 경험 제공
산책	개인/그룹 산책 기록, 근처/인기 산책로 목록 및 상세	기상청 단기예보 API 연동으로 산책 전 필수 정보 제공
커뮤니티	게시글 작성/조회, 내 커뮤니티 관리	STOMP/SockJS 기반 실시간 채팅 지원
쇼핑	상품 목록/상세, 장바구니/주문, 쿠폰 관리	토큰 기반 보호된 API + 헬퍼 일원화로 안정성 확보
UI/UX	로그인/회원가입, 프로필 수정, 1:1 문의, 날씨 카드 캐러셀	Daum 우편번호 서비스 연동으로 주소 입력 UX 개선
기술 스택 (Tech Stack)
1. 핵심 프레임워크 및 언어
기술	버전	채택 이유
React Native	0.80	단일 코드베이스로 iOS/Android 동시 대응, 개발 효율성 극대화
React	19	선언적 UI 구성 및 최신 트렌드 반영
TypeScript	-	정적 타이핑으로 코드 품질 향상, 대규모 프로젝트 유지보수성 강화
2. 라이브러리 및 네트워킹
기술	유형	채택 이유
@react-navigation	Navigation	표준 라우팅, 스택 기반 전환, 딥링크 확장성
axios	네트워킹	인터셉터 기반 토큰 처리, 에러 로직 단일화
@stomp/stompjs, sockjs-client	실시간	채팅, 알림 등 실시간 상호작용 대응
3. 기능 및 UI/UX
기술	기능	채택 이유
react-native-maps, geolocation-service	지도/위치	산책·탐색 기능 핵심, 기기 권한 관리와 지도 렌더링
webview, image-picker, youtube-iframe	미디어	외부 콘텐츠 임베드, 사용자 이미지 업로드, 영상 콘텐츠
vector-icons, safe-area-context, screens	UI	안정적이고 최적화된 UI 구성
Jest, ESLint, Prettier	품질/형상	코드 품질 유지 및 협업 환경 개선
외부 API 및 오픈 API 연동
1. 백엔드 API 연동 전략

API 헬퍼 일원화: 모든 백엔드 호출을 src/util/api.js 헬퍼 함수(get/post/put/delete*WithToken)로 관리
→ 중복 제거, 오류 로깅 통일, 토큰 주입 표준화

환경 분리: API_BASE 주소를 개발/에뮬레이터 환경별로 분리

2. 오픈 API 상세
API 서비스	사용처	기술적 의의
Google Maps Platform	지도 렌더링, 주변 장소 표시	플랫폼 간 일관된 지도 경험, 다양한 마커 지원
기상청 단기예보 (공공데이터포털)	기온/습도/하늘/강수 상태 표시	발표시간 보정 로직(getKmaDateTime)으로 데이터 공백 대응
Daum 우편번호 서비스	회원가입/프로필 주소 입력	주소 입력 UX 개선, react-native-daum-postcode 활용
프로젝트 구조 및 실행
1. 프로젝트 구조
src/
  screens/      # 화면 단위 (산책/그룹/커뮤니티/쇼핑/마이/병원/카페 등)
  util/         # API 헬퍼, 시간/날씨 유틸
  data/         # 정적 리소스(JSON)
assets/         # 이미지/아이콘/폰트
android, ios    # 네이티브 플랫폼 프로젝트

2. 실행 방법
# 의존성 설치
npm install

# Metro Bundler 실행
npm start

# Android 실행
npm run android

# iOS 실행
cd ios && bundle install && bundle exec pod install && cd ..
npm run ios

3. 환경 설정 메모

API_BASE 설정: src/util/api.js 수정

에뮬레이터 접근: Android → http://10.0.2.2:<port>, iOS → http://localhost:<port>

권한 설정: 위치/카메라 권한 → AndroidManifest.xml, Info.plist

지도 키: Google Maps API Key 등록 필요

향후 로드맵 (Roadmap)

.env 기반 환경변수 도입: 개발/운영 환경별 설정 분리, 보안 강화

실시간 알림 고도화: STOMP 기반 알림 및 데이터 업데이트 UX 향상

E2E 테스트 및 성능 프로파일링: Detox 기반 테스트, 성능 최적화 진행
