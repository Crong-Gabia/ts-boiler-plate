# Rollout Plan (Phase A/B/C)

규칙을 한 번에 강제하면 반발/마찰이 커져서 정착에 실패하는 경우가 많습니다.
MVP는 "작게 시작 -> 신뢰 확보 -> 강제 강화" 순서로 갑니다.

## Phase A (MVP - friction low)
목표: PR gate 정착, 실패 신호를 일관되게 만들기

- MUST로 강제(required checks)
  - `lint`
  - `typecheck`
  - `test`
- SHOULD로 시작(warn)
  - API 컨벤션(경로/DTO/에러 모델) - 문서 준수 유도
  - 보안 규칙(secret, logging) - 위반 사례 수집

## Phase B (Stabilize)
목표: 운영 사고를 줄이는 규칙을 MUST로 승격

- MUST 승격 후보
  - secret scan(최소)
  - 표준 에러 모델(코드/message/traceId)
  - 인증/인가 기본 규칙(401/403)
- 예외 프로세스 강제
  - allowlist + 만료 필수

## Phase C (Production-like)
목표: 배포/검증까지 자동화하고 "merge = 안전"으로 만들기

- on-prem 접근 가능해지면
  - self-hosted runner 도입
  - k8s 배포/통합 테스트 gate
- PR별 환경(ephemeral namespace)
  - 충돌 제거 + 병렬 검증

## Ruler 문서와의 연결
- 룰의 정의/레벨: `dev-factory/ruler/README.md`
- MVP 룰 체크리스트: `dev-factory/ruler/mvp-rules.md`
- gate 위치: `dev-factory/ruler/enforcement.md`
