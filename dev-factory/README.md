# Dev Factory Standards

이 폴더는 기존 프로젝트 문서/규칙과 **완전히 분리된** "개발 공장(Dev Factory)" 운영 표준 세트입니다.
목표는 공장 관리자(개발 PM)가 기획/아키텍처 설계에 집중하고, 반복적인 구현/검증은 시스템이 수행하도록 만드는 것입니다.

## MVP 범위
MVP에서 표준화는 아래를 목표로 합니다.
- Ruler(정책 게이트)의 **규칙 레벨 정의 + 예외 프로세스**
- TypeScript / API / Auth / Security / Logging 최소 표준
- PR에 포함되어야 하는 검증 증거(테스트/리포트) 포맷

## 문서 구성
- `dev-factory/ruler/README.md`: Ruler의 역할/원칙/레벨(MUST/SHOULD/NICE)
- `dev-factory/ruler/enforcement.md`: 어디서 어떻게 gate를 거는지(로컬/CI/배포 전)
- `dev-factory/ruler/mvp-rules.md`: MVP MUST/SHOULD 규칙 목록(체크리스트)
- `dev-factory/standards/typescript.md`: 타입/코드 규칙(금지/권장)
- `dev-factory/standards/api.md`: API 컨벤션(경로/DTO/에러 모델)
- `dev-factory/standards/auth.md`: 인증/인가 가이드(MVP)
- `dev-factory/standards/security.md`: 보안 가이드(MVP)
- `dev-factory/standards/logging.md`: 로깅/관측성 가이드(MVP)
- `dev-factory/governance.md`: 소유권/변경 프로세스/예외 정책
- `dev-factory/templates/`: 운영 템플릿(예외 등록, 규칙 변경 PR 체크리스트 등)
- `dev-factory/ops/github-actions-mvp.md`: GitHub Actions 기반 MVP 운영 가이드(회사 인프라 없이 시작)
- `dev-factory/ops/rollout-plan.md`: Phase A/B/C 단계적 도입 계획(게이트 강화)

## 추천 도입 순서
1) `dev-factory/ruler/README.md`로 규칙 레벨 합의
2) `dev-factory/ruler/mvp-rules.md`로 MUST 10개/SHOULD 10개 확정
3) `dev-factory/standards/*`에 세부 표준 고정
4) gate는 단계적으로 적용(먼저 auto-fixable -> 다음 타입/테스트 -> 마지막 보안/API)

## 확장 방향(요약)
MVP 이후에는 아래 순서로 확장하는 것을 권장합니다.
- PR별 ephemeral env + 통합 테스트 자동화
- Policy-as-Code 강화(Secret scan, 인증 규칙, API lint)
- 작업 큐/대시보드(공장 가시성)

## MVP 운영(외부에서 시작)
회사 인프라와 무관하게 시작하려면 아래 문서를 기준으로 "PR gate"부터 먼저 고정하세요.
- `dev-factory/ops/github-actions-mvp.md`
- `dev-factory/ops/rollout-plan.md`
