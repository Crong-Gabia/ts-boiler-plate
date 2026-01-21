# 하이웍스 SSO 연동 가이드

## 목적
이 문서는 하이웍스 SSO 연동 방식(외부로 연동/내부로 연동)과 관련 API를 한곳에 정리합니다.

## 대상
- 인트라넷/업무 포털에 하이웍스 기능을 연동하려는 개발자
- 하이웍스 SSO 및 관련 API 호출을 필요한 서비스

## 용어
- Office Token: 오피스(그룹웨어) 권한으로 인증하는 토큰
- Access Token(OAuth, deprecated): 사용자 계정 접근용 OAuth 토큰 (신규 발급 불가)

## 인증 방식 개요
하이웍스 API는 2가지 토큰을 사용합니다.

1) Office Token
- 오피스 관리 > 오피스 API에서 발급
- 강력한 권한 보유: 관리/보안 주의 필요

2) Access Token (deprecated)
- OAuth 2.0 기반 사용자 인증
- 신규 발급 불가

## SSO 연동 방식
SSO 연동은 크게 2가지입니다.

### 1) SSO 외부로 연동 (External SSO)
하이웍스에 외부 애플리케이션을 연결합니다.

#### 흐름
1. [오피스 관리] - [서비스 연동(API)] - [SSO 관리] - [외부로 연동]에 연동 URL 추가
2. [오피스 관리] - [환경 설정] - [메뉴 설정] - [인트라넷 메뉴 설정] - [인트라넷 메뉴 추가]에서 1에서 만든 SSO 선택
3. 오피스 홈 또는 GNB에서 생성된 인트라넷 메뉴 클릭
4. 등록한 연동 URL로 사용자 정보 조회용 토큰이 리다이렉트
   - 예: https://{some-url}?token={token}
5. 4에서 받은 토큰으로 “외부로 연동 토큰 조회” API 호출

#### 관련 API
- GET https://link-api.hiworks.com/v4/tokens/{token}
  - 응답 예시
    - user-no: 사용자 고유 식별 번호
    - user-id: 사용자 계정 ID
    - user-name: 사용자 이름
    - employee-no: 사용자 사번

### 2) SSO 내부로 연동 (Internal SSO)
애플리케이션 내부에 하이웍스 서비스를 포함합니다.

#### 흐름
1. 임시키(tmpkey) 발급
2. 연동할 URL 호출
3. 최초 로그인 시 로그인 요청
4. 이후 별도 로그인 없이 애플리케이션에서 하이웍스 사용 가능

#### 서비스별 연동 URL
- 오피스 메인: https://api.hiworks.com/office/sso/validate/main
- 메일: https://api.hiworks.com/office/sso/validate/mail
- 전자결재: https://api.hiworks.com/office/sso/validate/approval
- (구)전자결재: https://api.hiworks.com/office/sso/validate/ea
- 게시판: https://api.hiworks.com/office/sso/validate/board
- 공용메일: https://api.hiworks.com/office/sso/validate/shared
- 메시징: https://api.hiworks.com/office/sso/validate/sms
- 일정관리: https://api.hiworks.com/office/sso/validate/schedule
- 주소록: https://api.hiworks.com/office/sso/validate/addr
- 전자세금계산서: https://api.hiworks.com/office/sso/validate/bill
- 예약: https://api.hiworks.com/office/sso/validate/booking
- 인사관리: https://api.hiworks.com/office/sso/validate/insa
- My Page: https://api.hiworks.com/office/sso/validate/mypage

#### 관련 API
- POST https://api.hiworks.com/office/sso/validate/tmpkey
  - 계정 연동에 필요한 임시키 발급

## 관련 API 요약
### SSO 외부로 연동
- GET /v4/tokens/{token}
  - Host: https://link-api.hiworks.com
  - Content-Type: application/json

### SSO 내부로 연동
- POST /office/sso/validate/tmpkey
  - Host: https://api.hiworks.com
  - Content-Type: application/json

## 참고 링크
- 서비스 API 목록(Office Token): ./office-token-api-list.md
- 원문 문서: https://documenter.getpostman.com/view/6863253/S1TVWcri?version=latest#intro
- Office Token 발급 가이드: https://customer.gabia.com/manual/hiworks/3403/4280
- 제휴 문의: https://partner.hiworks.com/partner/contact
- 개발자 포럼: https://developers.hiworks.com/community/forum
- 메일 문의: developers@gabia.com
