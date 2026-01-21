# Office Token 서비스 API 목록

## 범위
- 이 문서는 Postman 문서의 "서비스 API" 항목을 기준으로 정리합니다.
- 계정 연동 API(SSO/조직 연동)와 OAuth 인증(deprecated)은 제외합니다.
- 본 목록은 Office Token 인증을 전제로 합니다.

## 서비스 API 카테고리
- 전자결재
- 인사관리
- 알림
- 메일
- 메시징(문자, 알림톡)
- 세금계산서 API

## 전자결재
- POST https://api.hiworks.com/office/approval/documents (전자결재 기안(페이지 연동))
- GET https://api.hiworks.com/approval/v2/documents/{{문서 번호}} (문서 상태 조회)

### 전자결재 회계 정보 연동 - 코드 정보 연동
- POST https://api.hiworks.com/open/office/accounting/department (코스트 센터 추가)
- PUT https://api.hiworks.com/open/office/accounting/department (코스트 센터 수정)
- DELETE https://api.hiworks.com/open/office/accounting/department (코스트 센터 삭제)
- GET https://api.hiworks.com/open/office/accounting/department (코스트 센터 조회)
- POST https://api.hiworks.com/open/office/accounting/customer (거래처 추가)
- PUT https://api.hiworks.com/open/office/accounting/customer (거래처 수정)
- DELETE https://api.hiworks.com/open/office/accounting/customer (거래처 삭제)
- GET https://api.hiworks.com/open/office/accounting/customer (거래처 조회)
- POST https://api.hiworks.com/open/office/accounting/account (계정과목 추가)
- PUT https://api.hiworks.com/open/office/accounting/account (계정과목 수정)
- DELETE https://api.hiworks.com/open/office/accounting/account (계정과목 삭제)
- GET https://api.hiworks.com/open/office/accounting/account (계정과목 조회)

### 전자결재 회계 정보 연동
- GET https://api.hiworks.com/open/office/accounting/spending_report?fixed_date=201902&type=P&approval_status=C (지출결의 데이터 조회)
- PUT https://api.hiworks.com/open/office/accounting/spending_report (지출결의 데이터 수정)

## 인사관리
- GET https://api.hiworks.com/hrm/v2/organizations (조직도 조회)
- GET https://api.hiworks.com/hrm/v2/users (사용자 조회)

## 알림
- POST https://api.hiworks.com/office/v2/notify (알림 발송)

## 메일
- POST https://api.hiworks.com/office/v2/webmail/sendMail (메일 발송)

## 메시징(문자, 알림톡)
### 문자(SMS)
- POST https://api.hiworks.com/office/v2/sms/send (문자 발송)
- GET https://api.hiworks.com/{오피스주소}/sms/popup/write (문자 발송(팝업))
- GET https://api.hiworks.com/office/v2/sms/count?user_id=admin (문자 잔여 건수 조회)
- GET https://api.hiworks.com/office/v2/sms/result?user_id=admin&ref_key=SMS 전송 리턴키 (전송 내역 조회)
- GET https://api.hiworks.com/office/v2/sms/usage?user_id=admin (문자 사용 건수 조회)
- PUT https://api.hiworks.com/office/v2/sms/reserve (예약 발송 수정)
- DELETE https://api.hiworks.com/office/v2/sms/reserve (예약 발송 취소)

### 카카오 알림톡
- POST https://api.hiworks.com/kakao/v2/messages/ (알림톡 발송하기)
- GET https://api.hiworks.com/kakao/v2/balance?filter[user_id]=%오피스아이디% (잔여 건수 조회)
- GET https://api.hiworks.com/kakao/v2/messages/%ID% (전송 내역 조회)

## 세금계산서 API
### 세금계산서 작성
- POST https://bill-api.hiworks.com/v4/invoices (과세 세금계산서 작성)
- POST https://bill-api.hiworks.com/v4/invoices (영세 세금계산서 작성)
- POST https://bill-api.hiworks.com/v4/invoices (면세 계산서 작성)
- POST https://bill-api.hiworks.com/v4/invoices (거래명세서 작성)
- POST https://bill-api.hiworks.com/v4/invoices (간편서명 연동 발행)
- POST https://bill-api.hiworks.com/v4/invoices/amendment (수정 세금계산서 작성)

### 세금계산서 조회
- GET https://bill-api.hiworks.com/v4/invoices/{{문서번호}} (세금계산서 단일 조회)

### 세금계산서 삭제
- DELETE https://bill-api.hiworks.com/v4/invoices/{{문서번호}} (세금계산서, 계산서, 거래명세서 삭제)

### 사업자번호 검증
- POST https://bill-api.hiworks.com/v4/check/{{사업자번호}} (사업자 휴폐업 단일 조회)
- POST https://bill-api.hiworks.com/v4/validate (사업자등록정보 진위 검증)

## 참고
- 원문 문서: https://documenter.getpostman.com/view/6863253/S1TVWcri?version=latest#api
- SSO/계정 연동 가이드: ./hiworks-sso-integration-guide.md
