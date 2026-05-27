## Why

현재 앱은 UI 뼈대만 있고 핵심 기능이 작동하지 않는다. 새로 추가한 시험 항목은 `dailyPlan: []`으로 생성되어 배분 알고리즘이 전혀 호출되지 않으며, 새로고침하면 모든 데이터가 사라진다. MVP의 핵심 가치 제안(시험 범위 자동 배분)이 실제로 동작하게 만들어야 한다.

## What Changes

- **시험 범위 자동 배분**: `lib/examSchedule.ts` 구현 및 `ItemForm`에서 시험 생성 시 자동 호출
- **localStorage 영속성**: `features/items/storage.ts` 구현, 새로고침 후에도 데이터 유지
- **CRUD 훅 분리**: `features/items/useItems.ts`로 상태·로직 캡슐화, `app/page.tsx` 인라인 로직 제거
- **항목 삭제**: `ItemCard`에 삭제 버튼 추가, `useItems`에 `deleteItem` 핸들러 구현

## Capabilities

### New Capabilities

- `exam-schedule`: 시험 범위(scope)와 마감일(dueDate)을 받아 날짜별 공부량 배열(`DailyStudyPlan[]`) 생성
- `item-persistence`: localStorage 기반 항목 읽기/쓰기 유틸리티
- `item-crud`: 항목 추가·완료토글·삭제를 캡슐화하는 커스텀 훅

### Modified Capabilities

<!-- 기존 spec 없음 -->

## Impact

- `src/lib/examSchedule.ts` — 신규 파일
- `src/features/items/storage.ts` — 신규 파일
- `src/features/items/useItems.ts` — 신규 파일
- `src/features/items/components/ItemForm.tsx` — 시험 생성 시 distributeScope 호출 추가
- `src/features/items/components/ItemCard.tsx` — 삭제 버튼 추가
- `src/app/app/page.tsx` — useItems 훅으로 교체, 인라인 CRUD 로직 제거
