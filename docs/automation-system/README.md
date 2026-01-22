# Automation System (Dev Factory)

개발 공정 자동화 관리자가 **기획/아키텍처 설계**에 집중하고, 반복적인 코딩/테스트/배포/검증은 시스템이 전담하는 "개발 공장(Dev Factory)" 운영 문서입니다.

## 문서 구성
- `docs/automation-system/architecture.md`: 구성요소/인터페이스/책임 분리
- `docs/automation-system/workflow.md`: 엔드투엔드 업무 시나리오(문서 → 구현 → PR → 배포 → 통합테스트 → 피드백)
- `docs/automation-system/roadmap-schema.md`: `ROADMAP.md` 스키마/상태 전이(자동화 트리거 기준)
- `docs/automation-system/artifacts.md`: `project_description.md` 입력과 생성 산출물(GEMINI/AGENTS/ROADMAP) 정의
- `docs/automation-system/verification.md`: CI/CD + 시험장 배포 + 통합 테스트/리포팅 규칙
- `docs/automation-system/mvp-build-guide.md`: 실제 MVP 구축 체크리스트/구현 포인트
- `docs/automation-system/expansion-paths.md`: MVP 이후 확장 옵션
- `docs/automation-system/templates/project_description.md`: 입력 문서 템플릿 예시
- `docs/automation-system/templates/ROADMAP.md`: 단계적 작업 계획(ROADMAP) 템플릿 예시

## 추천 구축 순서(MVP)
1) `docs/automation-system/roadmap-schema.md` 기준으로 `ROADMAP.md` 포맷 확정
2) `docs/automation-system/mvp-build-guide.md` 기준으로 트리거/큐/PR 생성부터 연결
3) `docs/automation-system/verification.md` 기준으로 시험장 배포 + 통합 테스트 + PR 코멘트까지 연결

## 빠른 시작(운영 관점)
1) 저장소 루트에 `project_description.md`를 작성/갱신
2) 시스템이 `GEMINI.md`, `AGENTS.md`, `ROADMAP.md` 생성/갱신
3) 공장 관리자(Human PM)가 `ROADMAP.md`에서 다음 단계 `Status`를 `in_progress`로 변경
4) 변경 감지 → 작업 큐잉 → AI 작업자(코더)가 구현/테스트 후 PR 생성
5) PR 기반 배포/통합테스트 결과가 PR 코멘트로 환류
6) Merge 후 시스템이 `ROADMAP.md`를 업데이트(완료 처리)
