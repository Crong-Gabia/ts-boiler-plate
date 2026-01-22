# Ruler (Policy Gate)

Ruler는 "도구"가 아니라 **규칙 집합 + 실행 게이트**입니다.
AI 작업자/사람 작업자 누구든 동일한 품질을 내도록, 실패를 조기에 차단(fail fast)하는 것이 목적입니다.

## Ruler가 강제하는 것
- 코드 품질(타입 안정성, 에러 처리, 테스트)
- API 컨벤션(경로/DTO/에러 모델)
- 보안/인증 최소 규칙(비밀/로그/권한)

## 규칙 레벨
- MUST: 위반 시 PR block (merge 불가)
- SHOULD: 위반 시 경고(warn) + 근거 요구
- NICE: 정보(info)

## 규칙 타입
- Auto-fixable: 포맷/정렬 등 시스템이 자동 수정 가능
- Non-auto-fixable: 아키텍처/보안/권한/에러 모델 등 사람의 결정 필요

## 핵심 운영 원칙
- Ruler 변경은 PR로만(근거/영향/마이그레이션 포함)
- 예외는 코드 주석이 아니라 "예외 문서 + 만료"로만 관리
- 규칙은 단계적으로 강화(처음부터 모든 MUST 강제 금지)

다음 문서를 함께 보세요.
- `dev-factory/ruler/enforcement.md`
- `dev-factory/ruler/mvp-rules.md`
