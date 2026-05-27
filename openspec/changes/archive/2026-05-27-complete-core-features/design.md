## Context

현재 앱은 UI 뼈대와 목 데이터만 존재한다. 핵심 기능 3가지가 미구현 상태다:
1. 시험 범위 자동 배분 알고리즘(`lib/examSchedule.ts` 파일 없음)
2. localStorage 영속성(`storage.ts` 파일 없음, 새로고침 시 리셋)
3. 항목 삭제(UI 없음)

CRUD 로직이 `app/app/page.tsx`에 인라인으로 있어 확장이 어렵다.

스택: Next.js 14 App Router, React 18, TypeScript strict, Tailwind CSS, localStorage(외부 DB 없음).

## Goals / Non-Goals

**Goals:**
- `examSchedule.ts` 구현 및 ItemForm 시험 생성 시 자동 호출
- `storage.ts` 구현으로 새로고침 후에도 데이터 유지
- `useItems.ts` 훅으로 CRUD 로직 캡슐화
- ItemCard에 삭제 버튼 추가

**Non-Goals:**
- 로그인/인증
- 서버 DB 또는 외부 API
- 항목 수정(edit) — 이번 범위 제외
- 일별 공부량 완료 체크(`DailyStudyPlan.completed` 토글)
- 포모도로 타이머 등 공부 모드 확장

## Decisions

### D1: examSchedule 알고리즘 — 오늘부터 배분

CLAUDE.md 명세: `총 범위 ÷ 남은 일수 = 하루 분량, 나머지는 첫날 추가`

```
distributeScope(scope: number, unit, dueDate: string): DailyStudyPlan[]
  - startDate = 오늘 (new Date() 기준)
  - days = dueDate까지 남은 일수 (당일 포함)
  - days <= 0 이면 → [{ date: dueDate, amount: scope, completed: false }]
  - base = Math.floor(scope / days)
  - remainder = scope % days
  - 각 날짜에 base 배정, 첫날에 remainder 추가
```

**대안 고려**: 마지막날에 remainder 추가 → 첫날 추가가 더 보수적(미리 더 하도록 유도)이므로 채택.

### D2: localStorage 키 — 단일 키, JSON 직렬화

`study-planner-items` 키 하나에 `StudyItem[]` 전체를 JSON으로 저장.

**대안 고려**: 항목별 개별 키 → 읽기/쓰기가 복잡해지고 이득 없음. 단일 키 채택.

파싱 실패 시 빈 배열 반환(자동 복구).

### D3: useItems 훅 — 로컬 상태 + 사이드이펙트

```
useItems() → { items, addItem, toggleItem, deleteItem }
  - useState 초기값: loadItems() (localStorage → 실패 시 mockItems)
  - 변경 시마다 useEffect로 saveItems() 호출
```

전역 상태 라이브러리 없음(CLAUDE.md 원칙 유지).

### D4: 삭제 UI — ItemCard 내 아이콘 버튼

완료된 항목에만 삭제 버튼 표시 → 실수 방지.
미완료 항목 삭제는 롱프레스 또는 스와이프 필요 → 복잡성 증가로 이번 범위 제외.

**대안 고려**: 모든 항목에 표시 → UX 노이즈 증가. 완료 항목에만 표시 채택.

## Risks / Trade-offs

- [localStorage 용량 제한 ~5MB] → MVP 단일 사용자 기준 항목 수십~수백 개로 문제없음
- [distributeScope가 오늘 기준] → 앱을 며칠 안 열면 과거 날짜에 배분됨 → 현재는 허용, 추후 "오늘 이후만" 옵션 고려 가능
- [삭제 시 복구 불가] → localStorage 특성상 undo 없음. 완료 항목에만 삭제 노출로 리스크 최소화
- [mockItems 초기값] → localStorage가 비어있을 때 목 데이터가 보임. 첫 방문 UX를 위한 의도적 설계

## Open Questions

- 삭제 확인 다이얼로그 필요 여부? → 완료 항목 한정이므로 일단 없이 진행
- distributeScope에서 주말/공휴일 제외 원하는지? → MVP에서는 제외 없이 균등 배분
