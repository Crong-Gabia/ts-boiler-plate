# Artifacts

## 입력: project_description.md
프로젝트의 의도/목표/요구사항을 담는 단일 입력 문서입니다.

권장 섹션:
- 프로젝트 개요(한 문단)
- 핵심 기능(Functional)
- 비기능 요구사항(Non-functional: 보안/성능/가용성)
- 도메인 개념(엔티티/권한/공개범위)
- API 형태(REST/GraphQL 등) 및 인증 방식

## 생성 산출물(Generated)

### GEMINI.md
- 개발 가이드(실행/검증/리뷰 규칙)
- Ruler 규칙 요약(코딩 스타일, API 컨벤션, 보안/인증 가이드)

### AGENTS.md
- 에이전트 역할/권한/운영 규칙(SSOT)
- 보고 포맷/작업 흐름(브랜치 전략, PR 규칙)

### ROADMAP.md
- 단계적 작업 계획
- 상태 기반 자동화 트리거 정의(`in_progress` 등)

## 시스템이 관리하는 업데이트(권장)
- PR 생성/머지 시점에 `ROADMAP.md`의 상태를 업데이트
- 통합 테스트 결과 요약 링크/아티팩트 링크를 `ROADMAP.md` 또는 PR 코멘트에 남김
