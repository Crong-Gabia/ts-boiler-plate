# Enforcement (Where to Gate)

MVP에서는 "로컬 -> CI"까지만 확실히 걸어도 효과가 큽니다.

## Gate 포인트

### 1) 로컬(선택)
- 목적: 개발자가 가장 빨리 피드백 받기
- 성격: auto-fixable 중심
  - 참고: "로컬에서 돌지 않고" 시작하려면 이 단계는 생략하고 CI만으로도 MVP는 운영 가능

### 2) CI(PR 체크) (MVP 필수)
- 목적: merge 전에 실패를 강제 차단
- 권장 순서:
  1) format/lint (auto-fixable)
  2) typecheck
  3) tests (단위/통합)
  4) security/API 규칙(초기에는 warn)

### 3) 배포 전(확장)
- 목적: 스테이징/시험장 배포 전 마지막 안전장치
- 형태: 이미지 스캔/정책 검사/통합 테스트

## 단계적 도입(권장)

### Phase A: 마찰 최소
- MUST: 타입체크, 테스트 실패만 block
- SHOULD: API 컨벤션, 보안 규칙은 warn

### Phase B: 안정화
- MUST 확대: 에러 모델/로그 필드/비밀 노출 금지

### Phase C: 운영형
- PR별 배포 + 통합 테스트를 MUST로 승격
