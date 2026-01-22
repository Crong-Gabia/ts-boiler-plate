# Architecture

## 목표
- 사람(공장 관리자)은 요구사항/설계/승인에 집중
- 시스템은 반복 공정(코딩/리팩토링/테스트/배포/검증/결과 보고)을 자동 수행
- 문서(`project_description.md`, `ROADMAP.md`)가 공정의 단일 입력(SOT)으로 동작

## 구성요소(Components)
### 공장 관리자 (Human PM)
- 입력 산출: `project_description.md`, `ROADMAP.md` 상태 전이(in_progress 전환)
- 승인: PR 리뷰/merge, 다음 단계 착수

### 표준/가드레일 (Ruler)
- 코딩 스타일, API 컨벤션, 보안/인증 가이드라인 준수 체크
- 동작 위치(권장):
  - 로컬/컨테이너 lint/typecheck gate
  - CI gate(PR 체크)

### 작업 오케스트레이션 (Jules)
- `ROADMAP.md`/PR 이벤트 기반 작업 큐잉
- 작업 단위로 PR 생성 및 결과 상태 관리

### 격리 실행 환경 (Coder)
- Docker 기반의 상시 실행 개발 공간(변경 주체가 바뀌어도 연속성)
- 입력: 작업 지시(단계/태스크), 저장소 코드
- 출력: 구현 커밋/PR, 테스트 결과, 빌드 산출물(이미지)

### CI / 아티팩트 빌더
- PR 생성/업데이트 시 컨테이너 이미지 빌드 및 레지스트리 푸시

### 시험장(테스트 배포) / 서비스 공간
- Kubernetes 네임스페이스(예: PR별 ephemeral namespace)
- DB/cache/storage 등 연결이 준비된 리소스 사용

### 배포(ArgoCD)
- 이미지/매니페스트 변경 감지 → 시험장 네임스페이스로 배포

### 검증 시스템
- 배포 완료 후 통합 테스트 수행
- 도구 예: Karate, Supertest
- 결과를 PR 코멘트/체크로 피드백

## 인터페이스(Inputs/Outputs)
### Inputs
- `project_description.md`: 프로젝트 목적/범위/핵심 요구사항
- `ROADMAP.md`: 단계/태스크/상태(in_progress 트리거)

### Outputs
- PR(MR) 단위 변경
- CI 빌드 산출물(이미지)
- 시험장 배포 버전
- 통합 테스트 리포트(PR 코멘트 + 로그 링크)
- `ROADMAP.md` 상태 업데이트(done/blocked)

## 상태 모델(권장)
`ROADMAP.md`의 각 단계는 아래 상태를 갖습니다.

- `todo`: 아직 시작 안 함
- `in_progress`: 자동화 트리거(큐잉) 대상
- `blocked`: 외부 입력/의사결정 필요(사유/옵션 기록)
- `done`: 완료(merge + 검증 통과 기준)
