## 1. 시험 범위 자동 배분 알고리즘

- [x] 1.1 `src/lib/examSchedule.ts` 생성 — `distributeScope(scope, unit, dueDate)` 함수 구현
- [x] 1.2 당일 마감 엣지 케이스 처리 (남은 일수 0 이하 → 전체를 당일에 배정)
- [x] 1.3 `ItemForm.tsx` 수정 — 시험 생성 시 `distributeScope` 호출하여 `dailyPlan` 채우기

## 2. localStorage 영속성

- [x] 2.1 `src/features/items/storage.ts` 생성 — `loadItems()`, `saveItems(items)` 구현
- [x] 2.2 `loadItems`: `study-planner-items` 키 파싱, 실패 시 빈 배열 반환

## 3. useItems 훅

- [x] 3.1 `src/features/items/useItems.ts` 생성 — `useItems()` 훅 구현
- [x] 3.2 초기 상태: `loadItems()` 결과 사용 (비어있으면 mockItems)
- [x] 3.3 items 변경 시 `useEffect`로 `saveItems()` 호출
- [x] 3.4 `addItem`: 마감일 순 정렬 유지
- [x] 3.5 `toggleItem`: completed ↔ pending 토글
- [x] 3.6 `deleteItem`: id로 항목 제거

## 4. 항목 삭제 UI

- [x] 4.1 `ItemCard.tsx` — `onDelete` prop 추가
- [x] 4.2 완료(completed) 항목에만 삭제 버튼 표시
- [x] 4.3 삭제 버튼: 접근성 aria-label 포함 ("항목 삭제")

## 5. 앱 페이지 리팩터

- [x] 5.1 `src/app/app/page.tsx` — 인라인 CRUD 로직 제거, `useItems()` 훅으로 교체
- [x] 5.2 `ItemList` → `ItemCard`로 `onDelete` 핸들러 전달
- [x] 5.3 `pnpm build`로 타입 오류 없음 확인
