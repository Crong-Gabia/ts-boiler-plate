# ROADMAP

> 이 문서는 상태 변경(`in_progress`)이 자동화 트리거가 됩니다.

## 1단계: 개발 환경 구축
- ID: phase-01
- Owner: <Human PM>
- Status: todo | in_progress | blocked | done
- Goal: 프로젝트 초기 설정 + 헬스 체크 API 구현

### Deliverables
- 프로젝트 기본 구조(src 디렉토리 구조)
- 라우팅/로거/환경관리 기본 구현
- 기본 테스트(health check)

### Acceptance (Pass/Fail)
- `GET /health` -> 200 OK + `{ "status": "up" }`

## 2단계: 인증을 포함한 필수 요소 구현
- ID: phase-02
- Owner: <Human PM>
- Status: todo | in_progress | blocked | done
- Goal: 인증/인가 + API DTO base 모듈

### Deliverables
- 인증 구현
- API DTO Base 모듈

### Acceptance (Pass/Fail)
- 인증 없이 보호 API 호출 시 401
- 유효 토큰으로 보호 API 호출 시 200

## 3단계: 기능 구현 1
- ID: phase-03
- Owner: <Human PM>
- Status: todo | in_progress | blocked | done

## 4단계: 기능 구현 2
- ID: phase-04
- Owner: <Human PM>
- Status: todo | in_progress | blocked | done

## 최종단계: 성능 최적화 및 배포
- ID: phase-final
- Owner: <Human PM>
- Status: todo | in_progress | blocked | done
