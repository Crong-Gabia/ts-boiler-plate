# GitHub Actions MVP Ops Guide (External First)

이 문서는 회사 인프라(on-prem k8s, 사내 GitLab 등) 없이도 시작 가능한 **GitHub Actions 기반 MVP 운영 가이드**입니다.
목표는 배포가 아니라, Ruler/컨벤션을 PR gate로 강제해서 "표준 공정"을 먼저 정착시키는 것입니다.

## Private vs Public
결론: MVP는 **private 추천**입니다.

- private 추천 이유
  - 규칙/워크플로우가 빠르게 변함(외부 노출 가치 낮음)
  - 실수로 secret/토큰이 로그/커밋에 섞일 확률이 초기엔 높음
  - 내부 합의 전(특히 보안/인증 규칙)에는 논쟁이 잦아 공개 운영 비용이 큼
- public이 더 나은 경우
  - 오픈소스로 운영하고 외부 피드백/기여가 가치 있을 때
  - 룰셋이 안정화되고, secret 관리가 확실히 잡힌 이후

## EC2 같은 서버가 필요한가?
대부분의 MVP(코드 품질 gate)에는 **서버가 필요 없습니다.**

- 서버/EC2가 "불필요"한 경우
  - lint/typecheck/test만 PR 체크로 돌리려는 경우
  - GitHub-hosted runner로 충분
- 서버/EC2가 "필요"해지는 경우
  - 사내망/on-prem k8s 등 GitHub-hosted runner가 접근 불가한 네트워크에 붙어야 할 때
  - self-hosted runner를 운영해야 할 때
  - 장시간/대규모 빌드로 GitHub-hosted runner 한계가 있을 때

즉, 지금 단계에서는 EC2를 먼저 만들기보다, **PR gate(품질 강제)**부터 확정하는 것이 우선입니다.

## MVP 성공 기준(Proof)
- PR을 열면 Actions가 자동 실행된다.
- 실패하면 merge가 막힌다(required checks).
- PR 본문에 검증 방법/리스크/롤백이 누락되면 리뷰 단계에서 바로 잡힌다(템플릿/체크리스트).

## Repository Setup (MVP)

### 1) 브랜치 보호(Branch protection)
- 대상: `develop` (권장)
- 설정(필수)
  - Require a pull request before merging
  - Require status checks to pass before merging
  - Require branches to be up to date before merging(선택)
- Required checks(권장 이름)
  - `lint`
  - `typecheck`
  - `test`

### 2) PR 템플릿/체크리스트
- PR 본문에 반드시 포함
  - 변경 요약
  - 검증 방법(명령어/시나리오)
  - 리스크/롤백

템플릿은 아래 파일을 참고해서 `.github/PULL_REQUEST_TEMPLATE.md`로 복사합니다.
- `dev-factory/templates/github/PULL_REQUEST_TEMPLATE.md`

### 3) CODEOWNERS (Ruler 변경 보호)
- Ruler/표준 문서 변경은 지정된 소유자 리뷰가 없으면 merge 불가

템플릿은 아래 파일을 참고해서 `.github/CODEOWNERS`로 복사합니다.
- `dev-factory/templates/github/CODEOWNERS`

### 4) Secrets
- MVP에서는 외부 시스템 연동이 없더라도 다음을 지킵니다.
  - repo에 secret 커밋 금지
  - Actions 로그에 토큰/키 출력 금지
  - (확장) secret scan 도입

## Workflow Design (MVP)

### Job naming
Branch protection에 고정될 "required check" 이름이 바뀌면 운영이 깨집니다.
따라서 job name은 고정 문자열로 유지하세요.

권장:
- `lint`
- `typecheck`
- `test`

### What to run
- lint: 포맷/정적 분석(가능하면 auto-fix는 로컬, CI는 검증)
- typecheck: 컴파일/타입 검사(`tsc --noEmit` 형태)
- test: 최소 단위 테스트 + 핵심 시나리오(health 등)

## What to add later (Expansion)
- self-hosted runner (on-prem 연동 시)
- container build/push
- staging/ephemeral env deploy
- integration tests (Karate/Supertest)

## AI Worker (Serverless MVP)
"서버 0"로 PR을 자동 생성하는 MVP를 붙이려면 GitHub Actions에서 워커를 실행합니다.

- 워크플로우: `.github/workflows/ai-worker.yml`
- 워커 스크립트: `.github/scripts/ai_worker.mjs`

### 필요한 Secrets
- `OPENAI_API_KEY`

### 실행 방법
1) GitHub Actions 탭 -> `ai-worker` 선택
2) Run workflow
   - `issue_number`: 처리할 이슈 번호
   - `base_branch`: PR 타깃 브랜치(초기에는 `main` 추천)
   - `openai_model`: 모델명

### 산출물
- 브랜치: `ai/issue-<n>`
- PR: 이슈를 close하는 PR
- 생성 파일: `dev-factory-output/issue-<n>/plan.md`

### 교체 가능성
이 워커는 "계획 산출(plan-only)" MVP입니다.
나중에 opencode 기반 워커/도커 워커로 교체하더라도,
입력(이슈)과 출력(PR + 산출물 파일) 계약을 유지하면 갈아끼우기 쉽습니다.
