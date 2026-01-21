# Code Style (Conventions)

이 문서는 전역 코드 컨벤션의 상세 규칙을 정의합니다.
TypeScript 규칙은 `docs/conventions/typescript-style.md`를 단일 진실로 사용합니다.

## Formatting
- Formatter가 단일 진실

## Imports
- 외부 → 내부 → 상대경로 순

## Type Safety
- 타입 오류 억제 금지

## JSON 요청/응답
- 필드 명명: snake_case 고정 (요청/응답 모두)
- 외부 API 계약이 camelCase일 때만 예외 허용

## Testing
- 테스트 파일 네이밍/위치 규칙
