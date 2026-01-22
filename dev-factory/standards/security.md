# Security (MVP)

## MUST
- 비밀 정보(키/토큰/패스워드) 커밋 금지
- 비밀 정보 로그 출력 금지(마스킹)
- 입력 검증(최소 validation) 없이 외부 입력을 신뢰하지 않기

## SHOULD
- CI에서 secret scanning을 gate로 추가(초기 warn -> 안정화 후 must)
- 의존성 취약점 점검(확장)
