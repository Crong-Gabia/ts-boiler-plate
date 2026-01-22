# project_description.md (Template)

## 프로젝트명
짝플루언스

## 한 줄 설명
컨플루언스/노션 같은 공동 편집 지식/문서 관리 서비스의 백엔드 API.

## 목표
- Markdown 기반 문서 작성/저장
- 문서 간 링크 및 고유 URL
- 공개 범위: 공간/페이지 트리/개별 페이지 단위 제어

## 핵심 기능(Functional)
- 문서 CRUD
- 문서 트리/공간 관리
- 권한/공개범위 모델
- 링크 파싱/참조 그래프(선택)

## 비기능 요구사항(Non-functional)
- 인증/인가: (예: JWT + RBAC)
- 감사 로그(누가/언제/무엇)
- 성능: (예: 목록/트리 조회 SLA)

## API 개요
- Base URL: /api
- Health: /health

## 참고
- 관련 문서/링크:
