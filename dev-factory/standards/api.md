# API Conventions (MVP)

## 경로/리소스
- 리소스 중심: `/documents`, `/spaces/{id}`
- 동사 남발 금지: `/createDocument` 같은 패턴 지양

## DTO / Naming
- JSON 필드 네이밍을 프로젝트 전역으로 통일(예: snake_case 또는 camelCase)
- request/response DTO는 API 경계에서만 사용(도메인 모델과 분리)

## 에러 모델(권장 최소)
- 모든 에러 응답은 표준 구조로 반환
  - `code`: 기계 판독 가능한 에러 코드
  - `message`: 사람이 이해할 메시지
  - `traceId`: 로그/추적 연결용

## 상태 코드
- 400: 입력 오류
- 401: 인증 실패
- 403: 권한 없음
- 404: 리소스 없음
- 409: 충돌
- 500: 서버 오류(예측 불가)
