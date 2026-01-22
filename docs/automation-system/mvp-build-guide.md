# MVP Build Guide

이 문서는 "문서 기반 트리거 → PR 기반 구현 → 시험장 배포 → 통합 테스트 → PR 피드백" 루프를 **MVP 수준으로 실제 구축**하기 위한 가이드입니다.

## 0) MVP 성공 기준(Proof)
아래가 모두 충족되면 MVP가 "동작"합니다.

- Functional
  - `ROADMAP.md`에서 어떤 단계의 `Status`를 `in_progress`로 변경하면, 해당 작업이 큐잉되어 PR이 생성된다.
  - PR이 업데이트될 때마다 이미지가 빌드/푸시된다.
  - 배포된 시험장 환경에서 통합 테스트가 실행된다.
- Observable
  - PR에 체크/코멘트로 통합 테스트 PASS/FAIL이 남는다.
  - 시험장 URL/namespace와 커밋 SHA가 결과에 포함된다.
- Pass/Fail
  - `GET /health` -> 200 OK
  - Body에 `status: up`

## 1) 필수 인프라(최소)

### GitHub
- PR 이벤트를 받을 수 있어야 함(GitHub Actions 또는 GitHub App)
- 레지스트리 push 권한(예: GHCR)

### Container Registry
- 예: GHCR, ECR, GCR 중 1개
- CI에서 로그인/푸시 가능해야 함

### Kubernetes 시험장
- 최소 1개 클러스터 + namespace 운용 권한
- Ingress 또는 Port-forward 등 테스트 호출 경로 확보
- DB/Cache/Storage는 "공유"로 시작해도 되지만, 연결 정보는 비밀로 관리

### ArgoCD
- 시험장 배포를 GitOps로 관리
- 권장: App-of-Apps 또는 ApplicationSet(확장 시)

## 2) 리포지토리 "문서 트리거" 설계

### 파일 책임
- 입력:
  - `project_description.md`: 프로젝트 목적/요구/제약
  - `ROADMAP.md`: 단계별 작업 지시(상태 전이)
- 생성/갱신(시스템):
  - `GEMINI.md`, `AGENTS.md`, `ROADMAP.md` (정책에 따라)

### 트리거 규칙(MVP)
- `ROADMAP.md`에서 특정 단계의 `Status`가 `in_progress`로 변경되면 작업을 큐잉
- 변경 감지는 "diff 기반"으로 수행(이전 상태 대비)

## 3) 오케스트레이터(Jules) MVP 구현 포인트

### 워커/큐(최소)
- 저장소 단위로 "단일 작업 큐"만 있어도 시작 가능
- 중복 실행 방지(아이템포턴시):
  - `phase-01`이 이미 처리 중이면 동일 단계 재큐잉 금지
  - 처리 상태는 PR 라벨/코멘트/전용 상태 저장소(확장 시) 중 하나로 기록

### PR 생성 규칙
- 브랜치: `feature/<phase-id>-<short>`
- PR 타깃: `develop` (repo `docs/guidelines/workflow.md` 준수)
- PR 본문에 포함:
  - 변경 요약
  - 검증 방법
  - 리스크/롤백
  - 통합 테스트 결과 링크(자동 코멘트와 중복 가능)

## 4) Coder(격리 개발 환경) MVP

### 최소 요구사항
- Docker 이미지에 아래가 포함되어야 함:
  - git
  - node/npm(or bun)
  - 프로젝트 빌드 툴체인
- 입력(환경변수/파일):
  - 작업 지시(phase id, 목표, acceptance)
  - PR 토큰(최소 권한)

### 권장 운영
- 작업 단위로 컨테이너 실행(또는 상시 실행 컨테이너 + 작업 컨텍스트 마운트)
- 작업 로그는 외부 저장소로 보관(확장 시)

## 5) CI MVP(이미지 빌드/푸시)

### 트리거
- PR opened/synchronize

### 산출물
- 컨테이너 이미지: `<registry>/<app>:pr-<id>-<sha>`

### 게이트(선택)
- 타입체크/린트/Ruler 검사 실패 시 배포/테스트 중단

## 6) ArgoCD 시험장 배포 MVP

### 배포 방식(2안)
1) 단일 스테이징(가장 단순)
   - 항상 같은 namespace에 최신 PR 버전 배포
   - 동시 PR 검증이 어렵고 테스트가 충돌할 수 있음
2) PR별 namespace(권장, 확장 친화)
   - `pr-<id>` namespace에 배포
   - 자원 사용량은 늘지만 충돌이 줄어듦

MVP는 1)로 시작해도 되지만, "운영형"으로 가려면 2)를 추천합니다.

## 7) 통합 테스트 MVP(Karate/Supertest)

### 실행 타이밍
- 배포 완료 신호 이후(ArgoCD sync 성공)

### 최소 시나리오
- `GET /health` -> 200 + `status: up`

### 결과 보고
- PR 체크 + PR 코멘트(둘 중 하나만 해도 시작 가능)
- 코멘트 템플릿은 `docs/automation-system/verification.md`를 사용

## 8) Secrets/권한(MVP 최소 원칙)
- PR 작성/코멘트 권한은 최소화(필요한 repo scope만)
- Registry/K8s 접근 토큰은 CI 전용으로 분리
- DB/Cache 연결 정보는 절대 PR 로그에 노출하지 않기(마스킹)
