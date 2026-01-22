# TypeScript Standards (MVP)

## 목표
- 런타임 버그를 타입 단계에서 차단
- AI 작업자가 생성한 코드도 동일한 안정성을 갖도록 강제

## MUST
- 타입 suppress 금지(`as any`, `@ts-ignore`, `@ts-expect-error` 등)
- 공용 함수/모듈은 명시적 타입 제공
- 예외 케이스를 숨기는 타입(무의미한 union/옵셔널 남발) 금지

## SHOULD
- I/O 경계(API 요청/응답, DB row)는 DTO 타입으로 분리
- 에러는 타입으로 분류(도메인 에러 vs 시스템 에러)
