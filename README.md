Dangtrip — 포트폴리오 README (표 버전)

Dangtrip은 반려견과 함께하는 삶을 더욱 풍요롭게 만들고자 개발된 크로스 플랫폼(iOS/Android) 모바일 애플리케이션입니다.
산책, 커뮤니티 활동, 주변 장소 탐색, 쇼핑까지 반려 생활 전반을 아우르는 기능을 React Native 기반 단일 코드베이스로 구현했습니다.

주요 기능 및 하이라이트
영역	주요 기능	특장점
지도/위치	주변 카페/병원 마커 표시, 사용자 위치 기반 탐색	react-native-maps 기반 일관된 지도 경험
산책	개인/그룹 산책 기록, 근처/인기 산책로 목록 및 상세	기상청 단기예보 API 연동, 산책 전 필수 정보 제공
커뮤니티	게시글 작성/조회, 내 커뮤니티 관리	STOMP/SockJS 기반 실시간 채팅
쇼핑	상품 목록/상세, 장바구니/주문, 쿠폰 관리	토큰 기반 보호된 API, 헬퍼 일원화
UI/UX	로그인/회원가입, 프로필 수정, 1:1 문의, 날씨 카드 캐러셀	Daum 우편번호 서비스 연동으로 UX 개선
기술 스택

프론트엔드: React Native (0.80), React (19), TypeScript

네트워킹: axios (토큰 기반 인터셉터)

실시간 통신: @stomp/stompjs, sockjs-client

지도/위치: react-native-maps, geolocation-service

UI/UX: vector-icons, safe-area-context, screens

백엔드: Spring Boot, MyBatis, Oracle DB

배포: AWS EC2 & RDS, Docker, Jenkins

외부 API 연동

Google Maps Platform → 지도 렌더링 및 마커 표시

기상청 단기예보 API → 기온/습도/하늘/강수 상태 날씨 카드 제공

Daum 우편번호 서비스 → 주소 입력 UX 개선 (react-native-daum-postcode 활용)

프로젝트 구조
src/
  screens/      # 화면 단위 (산책/그룹/커뮤니티/쇼핑/마이/병원/카페 등)
  util/         # API 헬퍼, 유틸 함수
  data/         # 정적 리소스(JSON)
assets/         # 이미지/아이콘/폰트
android, ios    # 네이티브 프로젝트

실행 방법
npm install       # 의존성 설치
npm start         # Metro Bundler 실행
npm run android   # 안드로이드 실행
npm run ios       # iOS 실행

향후 로드맵

.env 기반 환경 변수 관리

STOMP 기반 알림 고도화

Detox 기반 E2E 테스트, 성능 프로파일링

📌 Dangtrip — 포트폴리오 README (리스트 버전)

Dangtrip은 반려견과 함께하는 삶을 더욱 풍요롭게 만들고자 개발된 크로스 플랫폼(iOS/Android) 모바일 애플리케이션입니다.

주요 기능 및 하이라이트

지도/위치
· 주변 카페/병원 마커 표시, 사용자 위치 기반 탐색
· react-native-maps 활용으로 일관된 지도 경험 제공

산책
· 개인/그룹 산책 기록, 근처/인기 산책로 목록 및 상세 정보 제공
· 기상청 단기예보 API 연동으로 산책 전 날씨 확인 가능

커뮤니티
· 게시글 작성 및 조회, 마이 커뮤니티 관리
· STOMP/SockJS 기반 실시간 채팅 지원

쇼핑
· 상품 목록/상세, 장바구니/주문, 쿠폰 관리 기능 제공
· 토큰 기반 보호된 API 접근, API 헬퍼 일원화

UI/UX
· 로그인/회원가입, 프로필 수정, 1:1 문의, 날씨 카드 캐러셀
· Daum 우편번호 서비스 연동으로 주소 입력 UX 개선

기술 스택

프론트엔드: React Native (0.80), React (19), TypeScript

네트워킹: axios (토큰 기반 인터셉터)

실시간 통신: @stomp/stompjs, sockjs-client

지도/위치: react-native-maps, geolocation-service

UI/UX: vector-icons, safe-area-context, screens

백엔드: Spring Boot, MyBatis, Oracle DB

배포: AWS EC2 & RDS, Docker, Jenkins

외부 API 연동

Google Maps Platform → 지도 렌더링, 마커 표시

기상청 단기예보 API → 기온/습도/하늘/강수 상태 제공

Daum 우편번호 서비스 → 주소 검색/입력 UX 개선

프로젝트 구조

src/screens → 산책, 그룹, 커뮤니티, 쇼핑, 마이, 병원, 카페 등 화면 단위

src/util → API 헬퍼, 시간/날씨 유틸

src/data → 정적 리소스(JSON)

assets → 이미지, 아이콘, 폰트

android, ios → 네이티브 프로젝트

실행 방법

npm install

npm start (Metro Bundler 실행)

npm run android (안드로이드 실행)

npm run ios (iOS 실행: pod install 필요)

향후 로드맵

.env 기반 환경 변수 관리

STOMP 기반 알림 고도화

Detox 기반 E2E 테스트 및 성능 최적화
