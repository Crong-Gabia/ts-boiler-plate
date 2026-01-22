# ROADMAP Schema

`ROADMAP.md`는 공정의 "작업 지시서" 역할을 합니다. 시스템은 이 파일의 상태 전이를 읽어 작업을 큐잉합니다.

## 상태 정의
- `todo`: 대기
- `in_progress`: 시스템이 작업을 큐잉해야 함(트리거)
- `blocked`: 진행 불가(사유/옵션/추천안 포함)
- `done`: 완료(merge + 검증 통과)

## 단계(Phase) 포맷(권장)
각 단계는 아래 메타를 포함합니다.

```md
## 1단계: 개발 환경 구축

- ID: phase-01
- Owner: <Human PM>
- Status: todo | in_progress | blocked | done
- Goal: <한 줄>

### Deliverables
- <산출물 1>

### Acceptance (Pass/Fail)
- <명확한 성공 기준 1>

### Notes
- <의존성/리스크>
```

## 상태 전이 규칙(권장)
- `todo` -> `in_progress`: 관리자가 시작 선언(시스템 트리거)
- `in_progress` -> `done`: PR merge + 통합 테스트 통과 시 시스템이 자동 변경
- `in_progress` -> `blocked`: 외부 입력 필요 시(사유/옵션 기록)
- `blocked` -> `in_progress`: 입력 해결 후 재시작

## Merge 충돌 최소화 팁
- 단계별로 고유 `ID`를 유지(이름 변경에 둔감)
- 시스템이 수정하는 영역(상태/결과)은 섹션을 고정된 위치/포맷으로 유지
