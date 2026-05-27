# item-crud Specification

## Purpose
TBD - created by archiving change complete-core-features. Update Purpose after archive.
## Requirements
### Requirement: useItems 훅으로 CRUD 캡슐화
시스템은 `useItems()` 커스텀 훅을 SHALL 제공하며, `{ items, addItem, toggleItem, deleteItem }`을 반환해야 한다. `app/app/page.tsx`의 인라인 CRUD 로직을 이 훅으로 대체한다.

#### Scenario: 훅 초기화 시 저장된 항목 로드
- **WHEN** AppPage가 마운트
- **THEN** useItems는 localStorage에서 항목을 로드하여 items 상태를 초기화

#### Scenario: addItem 호출 시 마감일 순 정렬 유지
- **WHEN** addItem(newItem)이 호출
- **THEN** items 배열이 dueDate 오름차순으로 정렬된 상태로 업데이트

### Requirement: 완료된 항목 삭제
시스템은 완료 상태(status: 'completed')인 항목에 삭제 버튼을 SHALL 표시해야 한다. 삭제 버튼 클릭 시 해당 항목이 목록에서 즉시 제거되고 localStorage에서도 삭제된다.

#### Scenario: 완료 항목 삭제
- **WHEN** 완료된 항목의 삭제 버튼 클릭
- **THEN** 해당 항목이 목록에서 사라지고 새로고침 후에도 나타나지 않음

#### Scenario: 미완료 항목에 삭제 버튼 없음
- **WHEN** 미완료(pending) 항목이 목록에 표시
- **THEN** 삭제 버튼이 보이지 않음

