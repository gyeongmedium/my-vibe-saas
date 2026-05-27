# UX / UI Spec

## 1. Design Reference

Follow:

- docs/DESIGN.md

## 2. Screen Map

| Screen | Route | Purpose |
|---|---|---|
| Landing Page | `/` | 서비스 소개와 앱 진입 |
| App Page | `/app` | 핵심 기능 사용 (할 일 관리) |
| Study Mode | `/app` (overlay) | 캐릭터와 함께하는 집중 공부 모드 |

## 3. Landing Page

### Purpose

서비스의 문제, 가치, 핵심 기능을 설명하고 사용자를 앱 화면으로 이동시킨다.

### Required Sections

- Hero
- Problem
- Core Features
- CTA Button

### Key Copy

- Headline: "시험기간, 이제 헤매지 마세요"
- Subheadline: "과제, 온라인 강의, 시험 범위까지 — 마감을 놓치지 않게 정리하고, 귀여운 공부 친구와 함께 집중해요."
- CTA: "지금 시작하기"

### Section Details

#### Hero
캐릭터 일러스트와 함께 Headline, Subheadline, CTA 버튼을 표시한다.

#### Problem
시험기간에 대학생이 겪는 세 가지 어려움을 카드 또는 목록으로 제시한다.
- 과제와 온라인 강의 마감을 놓친다
- 시험 범위가 넓어 공부를 어떻게 나눠야 할지 모른다
- 시험기간에는 집중이 잘 안 된다

#### Core Features
핵심 기능 세 가지를 아이콘과 짧은 설명으로 소개한다.
- 마감기한 관리: 과제와 강의 마감일을 한눈에
- 시험 범위 배분: 범위를 입력하면 날짜별 공부량 자동 계산
- 캐릭터 공부 모드: 귀여운 친구와 함께 집중

#### CTA Button
"지금 시작하기" 버튼을 누르면 `/app`으로 이동한다.

## 4. App Page

### Purpose

사용자가 실제 기능을 수행하는 화면이다.

### Required Areas

- **Header**: 앱 이름, 오늘 날짜, 공부 모드 시작 버튼
- **Input Form**: 유형 선택(과제/강의/시험) + 항목명 + 마감기한 입력. 시험 유형 선택 시 범위 입력 필드가 추가로 표시된다.
- **Filter Area**: 전체 / 과제 / 강의 / 시험 탭으로 목록을 필터링한다.
- **List Area**: 항목 카드 목록을 마감기한 오름차순으로 표시한다. 시험 항목은 오늘의 공부 범위를 함께 표시한다.
- **Empty State**: 등록된 항목이 없거나 필터 결과가 없을 때 캐릭터 이미지와 안내 문구를 표시한다.
- **Status Action**: 각 항목 카드에 완료 체크박스, 수정 버튼, 삭제 버튼을 제공한다.

### Study Mode Overlay

공부 모드 버튼을 누르면 화면 전체를 덮는 오버레이가 표시된다.
- 캐릭터 애니메이션 (공부 중 상태)
- 경과 시간 타이머
- 일시정지 / 초기화 / 종료 버튼

## 5. Component Plan

| Component | Purpose | Requirement Link |
|---|---|---|
| AppHeader | 앱 이름, 오늘 날짜, 공부 모드 시작 버튼 | FR-008 |
| ItemForm | 유형 선택, 항목명, 마감기한, 시험 범위 입력 | FR-001, FR-002, FR-003 |
| FilterTabs | 유형별 항목 필터 탭 | FR-006 |
| ItemList | 마감기한 순 항목 카드 목록 | FR-004 |
| ItemCard | 항목 정보, 완료 토글, 수정/삭제 | FR-004, FR-005, FR-007 |
| ExamDailyPlan | 시험 항목의 날짜별 공부량 표시 | FR-003 |
| EmptyState | 항목 없음 안내 (캐릭터 이미지 포함) | FR-004 |
| StudyModeOverlay | 캐릭터 공부 모드 전체 화면 오버레이 | FR-008 |
| StudyCharacter | 공부 중 캐릭터 애니메이션 | FR-009 |
| StudyTimer | 경과 시간 타이머 | FR-009 |

## 6. Interaction Rules

- 항목 생성 후 입력창은 초기화된다.
- 필수값이 없으면 생성 버튼을 눌러도 항목이 추가되지 않는다.
- 시험 유형 선택 시 범위 입력 필드가 즉시 나타난다.
- 완료 체크박스를 누르면 항목 상태가 화면에 즉시 반영된다.
- 필터 탭을 변경하면 목록이 즉시 바뀐다.
- 공부 모드 오버레이는 종료 버튼 또는 ESC 키로 닫힌다.
- 항목 삭제 시 확인 없이 즉시 삭제된다 (MVP 기준, undo 미지원).

## 7. Accessibility Rules

- 모든 입력 필드에는 label이 있어야 한다.
- 버튼 텍스트는 기능을 설명해야 한다.
- 색상만으로 상태를 구분하지 않는다 (완료 상태는 색상 + 취소선 병행).
- 주요 영역은 heading 구조를 가진다.
- 필터 탭은 aria-selected 속성으로 선택 상태를 표현한다.
- 공부 모드 오버레이 진입 시 포커스가 오버레이 내부로 이동한다.
