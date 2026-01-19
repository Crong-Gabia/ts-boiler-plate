# Database Naming (Conventions)

## Tables
- **복수형으로 통일**
- snake_case

## Columns
- snake_case
- PK: id
- FK: {entity}_id

## Soft Delete / Timestamps
- created_at, updated_at
- soft delete: **is_deleted (boolean)** + **deleted_at (timestamp, optional)**

## Index
- PK/UK 외에, 조회/조인/정렬/필터 조건 컬럼에 적절히 인덱스 생성 (다중 컬럼 시 사용 패턴 순서 고려)
- 과도한 인덱스는 쓰기 성능/스토리지 비용 증가 → 사용 패턴 보고 최소화
- FK 컬럼에는 조회/조인 빈도에 따라 인덱스 고려

## Booleans
- is_*, has_*

## Units
- amount_krw, size_bytes 등 단위 포함
