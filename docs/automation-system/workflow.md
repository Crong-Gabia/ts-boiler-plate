# Workflow

## 엔드투엔드 시나리오

### 1) Project Initialization
1. [관리자] `project_description.md` 작성/커밋
2. [시스템] 문서 분석 → 표준(Ruler) 로딩 → 산출물 생성
   - `GEMINI.md`: 개발 가이드(도구/규칙)
   - `AGENTS.md`: 에이전트 역할/규칙(SSOT)
   - `ROADMAP.md`: 단계별 작업 계획(상태 기반)
3. [관리자] `ROADMAP.md` 검토 후 1단계를 `in_progress`로 변경/커밋

### 2) Development Phase (Async)
1. [시스템/Jules] `ROADMAP.md` 변경 감지 → `in_progress` 단계 큐잉
2. [시스템/Coder] 격리된 Docker 개발 공간에서 구현/테스트 수행
3. [Ruler] 컨벤션/보안/인증 가이드 준수 여부를 gate로 검증
4. [AI 작업자] 작업 단위 PR 생성(예: "Feature: Init Project Structure")

### 3) Deployment & Integration Testing
1. [CI] PR 이벤트 → 컨테이너 이미지 빌드/푸시
2. [ArgoCD] 새 이미지 감지 → 시험장(k8s namespace) 배포
3. [검증 시스템] 배포 완료 후 통합 테스트 실행(Karate/Supertest)
4. [시스템] 테스트 결과를 PR 코멘트/체크로 등록

### 4) Approve & Close the Loop
1. [관리자] PR 로직/검증 결과 확인 후 merge
2. [시스템] `ROADMAP.md` 업데이트
   - 현재 단계: `done`
   - 다음 단계: `todo` (또는 관리자가 시작 시점에 `in_progress`로 전환)

## 운영 원칙(최소)
- 트리거는 문서 변경 기반(`project_description.md`, `ROADMAP.md`)
- 작업 결과는 PR 단위로 관리(리뷰/롤백/추적성)
- 시험장 배포/통합테스트 결과가 승인 판단의 핵심 신호
