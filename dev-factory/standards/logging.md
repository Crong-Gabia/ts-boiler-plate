# Logging / Observability (MVP)

## 목표
- 배포된 환경에서 문제를 "재현 없이" 추적 가능하게 함

## MUST
- 에러 로그는 최소 필드 포함: `traceId`, `message`, `errorName`

## SHOULD
- 요청 단위 식별자(requestId/traceId) 전파
- 통합 테스트 결과에 환경 정보(namespace/url)와 커밋 SHA 기록
