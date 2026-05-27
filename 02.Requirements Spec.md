# Requirements Spec

## 1. Actors

| Actor | Description |
|---|---|
| Primary User | 시험기간 중 과제, 강의, 시험 일정을 관리하는 대학생 |
| Optional Admin | 이번 MVP에서는 제외. 단일 사용자로 처리 |

## 2. Main Use Cases

### UC-001. 할 일 항목 생성

- Actor: 대학생
- Goal: 과제, 온라인 강의, 시험 항목을 등록한다
- Precondition: 앱 화면이 열려 있다
- Main Flow:
  1. 사용자가 항목 유형(과제 / 온라인 강의 / 시험)을 선택한다
  2. 사용자가 항목명과 마감기한(날짜)을 입력한다
  3. 시험 유형인 경우, 시험 범위(챕터 수 또는 페이지 수)를 추가로 입력한다
  4. 추가 버튼을 누른다
  5. 항목이 목록에 등록된다
- Alternative Flow: 필수 입력값(항목명, 마감기한)이 비어 있으면 경고 메시지를 표시하고 등록하지 않는다
- Result: 새 항목이 목록에 표시되고, 시험 유형은 날짜별 공부량이 자동 배분된다

### UC-002. 오늘 할 일 목록 확인

- Actor: 대학생
- Goal: 등록된 과제, 강의, 시험 항목과 오늘의 공부 목표를 한눈에 확인한다
- Precondition: 하나 이상의 항목이 등록되어 있다
- Main Flow:
  1. 사용자가 앱 화면을 연다
  2. 미완료 항목 목록이 마감기한 순으로 표시된다
  3. 시험 항목은 오늘 공부해야 할 범위가 함께 표시된다
- Alternative Flow: 등록된 항목이 없으면 빈 상태 안내 메시지를 표시한다
- Result: 사용자가 오늘 해야 할 과제, 강의, 시험 공부 범위를 한눈에 파악할 수 있다

### UC-003. 항목 완료 처리

- Actor: 대학생
- Goal: 완료한 과제, 강의, 오늘의 공부 분량을 완료 처리한다
- Precondition: 목록에 미완료 항목이 있다
- Main Flow:
  1. 사용자가 완료한 항목의 체크박스를 누른다
  2. 항목 상태가 '완료'로 변경된다
  3. 완료 항목은 목록에서 시각적으로 구분되거나 하단으로 이동한다
- Alternative Flow: 완료 취소 시 항목이 미완료 상태로 복원된다
- Result: 해당 항목이 완료 상태로 표시된다

### UC-004. 유형 및 상태 필터링

- Actor: 대학생
- Goal: 보고 싶은 유형(과제/강의/시험)으로 항목을 필터링한다
- Precondition: 여러 유형의 항목이 등록되어 있다
- Main Flow:
  1. 사용자가 필터 탭(전체 / 과제 / 강의 / 시험)을 선택한다
  2. 선택한 유형에 해당하는 항목만 목록에 표시된다
- Alternative Flow: 해당 필터 조건의 항목이 없으면 빈 상태 메시지를 표시한다
- Result: 원하는 유형의 항목만 빠르게 확인할 수 있다

### UC-005. 캐릭터 공부 모드 실행

- Actor: 대학생
- Goal: 캐릭터와 함께 공부하며 집중력을 유지한다
- Precondition: 앱 화면이 열려 있다
- Main Flow:
  1. 사용자가 공부 모드 시작 버튼을 누른다
  2. 화면에 캐릭터가 표시되고 타이머가 시작된다
  3. 공부 시간 동안 캐릭터가 함께 공부하는 애니메이션이 재생된다
  4. 사용자가 종료 버튼을 누르면 공부 모드가 종료된다
- Alternative Flow: 타이머를 일시정지하거나 초기화할 수 있다
- Result: 사용자가 캐릭터와 함께 집중해서 공부할 수 있다

## 3. Functional Requirements

| ID | Requirement | Priority |
|---|---|---|
| FR-001 | 사용자는 과제, 온라인 강의, 시험 유형 중 하나를 선택하여 항목을 생성할 수 있다. | Must |
| FR-002 | 사용자는 항목에 이름과 마감기한(날짜)을 필수로 입력해야 한다. | Must |
| FR-003 | 시험 항목 생성 시 범위를 입력하면 오늘부터 시험 전날까지 날짜별 공부량이 자동 배분된다. | Must |
| FR-004 | 사용자는 등록된 항목 목록을 마감기한 순으로 확인할 수 있다. | Must |
| FR-005 | 사용자는 항목의 완료 상태를 토글할 수 있다. | Must |
| FR-006 | 사용자는 항목 유형(과제 / 강의 / 시험)으로 목록을 필터링할 수 있다. | Should |
| FR-007 | 사용자는 등록된 항목을 수정하거나 삭제할 수 있다. | Should |
| FR-008 | 사용자는 캐릭터와 함께 공부하는 집중 모드를 시작하고 종료할 수 있다. | Must |
| FR-009 | 집중 모드에서는 타이머가 표시되고 캐릭터 애니메이션이 재생된다. | Should |

## 4. Non-functional Requirements

| ID | Requirement |
|---|---|
| NFR-001 | 모바일 화면에서도 핵심 기능을 사용할 수 있어야 한다. |
| NFR-002 | 버튼과 입력 필드는 접근 가능한 이름(aria-label 등)을 가져야 한다. |
| NFR-003 | 민감한 정보(API 키, 환경변수)는 GitHub 저장소에 커밋하지 않는다. |
| NFR-004 | 기본 MVP는 단일 사용자 기준으로 구현하며 로그인 없이 동작한다. |
| NFR-005 | 귀여운 캐릭터 UI를 통해 사용자가 앱 사용의 즐거움을 느낄 수 있어야 한다. |

## 5. Acceptance Criteria

### AC-001. 항목 생성

Given 사용자가 항목 유형, 이름, 마감기한을 입력했을 때  
When 추가 버튼을 누르면  
Then 새 항목이 해당 유형으로 목록에 표시된다.

### AC-002. 시험 범위 자동 배분

Given 사용자가 시험 항목에 범위와 시험 날짜를 입력했을 때  
When 추가 버튼을 누르면  
Then 오늘부터 시험 전날까지 날짜별 공부량이 자동으로 배분되어 표시된다.

### AC-003. 목록 확인

Given 항목이 하나 이상 등록되어 있을 때  
When 사용자가 앱 화면을 열면  
Then 항목 목록이 마감기한 순으로 표시된다.

### AC-004. 완료 처리

Given 목록에 미완료 항목이 있을 때  
When 항목의 체크박스를 누르면  
Then 해당 항목의 상태가 완료로 변경되고 시각적으로 구분된다.

### AC-005. 필터

Given 여러 유형의 항목이 등록되어 있을 때  
When 특정 유형 필터(예: 시험)를 선택하면  
Then 해당 유형의 항목만 목록에 표시된다.

### AC-006. 캐릭터 공부 모드

Given 사용자가 공부 모드 시작 버튼을 눌렀을 때  
When 공부 모드 화면이 열리면  
Then 캐릭터 애니메이션과 타이머가 함께 표시된다.

## 6. Requirement Traceability Lite

| Requirement ID | Use Case | Acceptance Criteria | Test Candidate |
|---|---|---|---|
| FR-001 | UC-001 | AC-001 | E2E create item |
| FR-002 | UC-001 | AC-001 | E2E required field validation |
| FR-003 | UC-001 | AC-002 | E2E exam scope distribution |
| FR-004 | UC-002 | AC-003 | E2E view list |
| FR-005 | UC-003 | AC-004 | E2E toggle complete |
| FR-006 | UC-004 | AC-005 | E2E filter items |
| FR-007 | UC-001 | AC-001 | E2E edit/delete item |
| FR-008 | UC-005 | AC-006 | E2E study mode start/stop |
| FR-009 | UC-005 | AC-006 | E2E timer and animation |
