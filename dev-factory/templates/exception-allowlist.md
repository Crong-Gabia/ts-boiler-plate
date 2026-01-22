# Exception Allowlist (Template)

> 예외는 반드시 "왜 필요한지"를 기록하고 만료를 둡니다.

## Format
```md
- Rule: <rule-id-or-name>
  Scope: <file/glob/service>
  Reason: <왜 예외가 필요한가>
  Risk: <무슨 위험이 생기는가>
  Owner: <책임자>
  Expires: YYYY-MM-DD | condition:<조건>
  Link: <issue/pr>
```
