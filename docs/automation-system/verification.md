# Verification (CI/CD + Integration Testing)

## 목표
- PR 단위로 "빌드 → 배포 → 통합 테스트 → PR 피드백" 루프를 자동화
- 승인자는 결과만 보고 merge 판단 가능(재현 가능한 증거)

## 파이프라인(권장)
1) PR 생성/업데이트
2) CI 빌드
   - 컨테이너 이미지 빌드
   - 레지스트리 푸시
   - (선택) 타입체크/린트/Ruler gate
3) 시험장 배포
   - ArgoCD가 PR 버전을 k8s namespace로 배포
   - DB/cache/storage 등은 사전 준비 리소스에 연결
4) 통합 테스트
   - Karate 또는 Supertest로 API 시나리오 실행
5) 결과 보고
   - PR checks(성공/실패)
   - PR comment(요약 + 로그/리포트 링크)

## 성공 기준(예시)
- Health 체크
  - `GET /health` -> 200 OK
  - Body에 `status: up`

## PR 코멘트 포맷(권장)
```md
### Integration Test Result
- Environment: <namespace / url>
- Commit: <sha>
- Status: PASS | FAIL
- Reports:
  - <link>
- Notes:
  - <fail case 요약>
```

## 테스트 케이스 작성 원칙
- 사용자 시나리오 중심(계약/권한/에러 케이스 포함)
- 외부 리소스 의존성(DB/캐시)은 고정된 셋업(마이그레이션/시드)으로 재현 가능해야 함
