# UX / UI Spec

## 1. Design Reference

### 디자인 테마: Windows 95

전체 앱은 Windows 95 스타일을 따른다.

| 요소 | 값 |
|---|---|
| 배경 | `#008080` (teal 데스크탑) |
| 윈도우 배경 | `#c0c0c0` |
| 폰트 | `'MS Sans Serif', Arial, sans-serif` |
| 테두리 (raised) | `border-color: #fff #808080 #808080 #fff` |
| 테두리 (sunken) | `border-color: #808080 #fff #fff #808080` |
| 타이틀바 | `linear-gradient(to right, #000080, #1084d0)`, 흰 텍스트 |
| 버튼 | raised 3D 테두리, `#c0c0c0` 배경 |
| 입력 필드 | sunken 3D 테두리, 흰 배경 |
| 강조색 | `#000080` (navy) |

### Win95 CSS 클래스 (globals.css)

| 클래스 | 용도 |
|---|---|
| `.win95-window` | 윈도우 프레임 (raised) |
| `.win95-sunken` | 내부 컨텐츠 영역 (sunken) |
| `.win95-btn` | 3D 버튼 |
| `.win95-btn-pressed` | 눌린 상태 버튼 |
| `.win95-input` | 텍스트/날짜 입력 필드 |
| `.win95-title` | 타이틀바 (그라디언트) |
| `.win95-title-btn` | 타이틀바 내 `?` / `X` 버튼 |
| `.win95-listbox` | 목록 컨테이너 |
| `.win95-listbox-item` | 목록 항목 |

---

## 2. Screen Map

| Screen | Route | Purpose |
|---|---|---|
| Landing Page | `/` | 서비스 소개와 앱 진입 |
| App Page | `/app` | 핵심 기능 사용 (할 일 관리) |
| Calendar Page | `/app/calendar` | 월별 달력으로 일정 시각화 |
| Study Mode | `/app/study` | 캐릭터와 함께하는 집중 공부 모드 |

> 모든 `/app/*` 라우트는 `src/app/app/layout.tsx`의 Win95 윈도우 + 하단 태스크바를 공유한다.

---

## 3. Landing Page (`/`)

### Purpose

서비스의 문제, 가치, 핵심 기능을 설명하고 사용자를 앱 화면으로 이동시킨다.

### 디자인

teal 배경 위에 Win95 다이얼로그 윈도우(최대 너비 600px)로 구성된다.  
타이틀바: `S` 아이콘(노란 박스) + "시험 플래너" + `?` / `X` 버튼

### Required Sections

- Hero
- Problem
- Core Features
- CTA Button

### Key Copy

- Headline: "시험기간, 이제 헤매지 마세요"
- Subheadline: "과제·강의·시험 범위를 한 곳에서 관리하고 날짜별 공부량을 자동으로 계산해드려요."
- CTA: "시작하기"

### Section Details

#### Hero
Headline, Subheadline, "시작하기" 버튼을 표시한다. 캐릭터 이미지 없음.

#### Problem
시험기간에 대학생이 겪는 세 가지 어려움을 Win95 listbox 스타일로 제시한다.  
아이콘은 텍스트(`!`, `?`, `Z`)로 대체한다.

#### Core Features
핵심 기능 세 가지를 Win95 raised 카드로 소개한다.  
아이콘은 텍스트(`D`, `C`, `T`)로 대체한다.

#### CTA Button
"시작하기" 버튼을 누르면 `/app`으로 이동한다.

---

## 4. App Page (`/app`)

### Purpose

사용자가 실제 기능을 수행하는 화면이다.

### Layout

- **AppLayout (공유)**: teal 배경 + Win95 윈도우 프레임 + 하단 태스크바
- **태스크바**: `■ 시작` 버튼 | 구분선 | 홈 / 달력 / 공부 모드 링크 버튼 | 우측 시계

### Required Areas

- **Title Bar**: Win95 타이틀바 (`S` 아이콘, "시험 플래너", `?` / `X` 버튼)
- **Header**: 오늘 날짜 표시
- **Input Form**: 유형 선택(과제/강의/시험) + 항목명 + 마감기한. 시험 유형 선택 시 범위 입력 필드 추가 표시
- **Filter Area**: 전체 / 과제 / 강의 / 시험 탭
- **List Area**: 항목 카드 목록, 마감기한 오름차순
- **Empty State**: 항목 없을 때 `?` 아이콘 박스 + 안내 문구

### Item Card

- 체크박스 + 유형 뱃지(navy 배경, 흰 글자) + 마감기한 + 제목
- 완료 항목: opacity 0.5 + 제목 취소선
- 미완료 항목: `수정` 버튼 표시
- 완료 항목: `삭제` 버튼 표시

---

## 5. Calendar Page (`/app/calendar`)

### Purpose

등록된 항목을 월별 달력으로 시각화한다.

### Layout

Win95 타이틀바 (`C` 아이콘, "달력")  
월 네비게이션 (`<` / `>` 버튼)  
7열 달력 그리드, 오늘 날짜는 `#000080` 배경으로 강조

### Item Display

날짜 셀에 최대 2개 항목 표시. 초과 시 `+N` 표시.  
항목 뱃지: 유형별 색상(과제 `#000080` / 강의 `#808000` / 시험 `#800000`)  
hover 시 툴팁(`#ffffcc` 배경)으로 항목 제목 표시

### Legend

하단에 유형별 색상 범례 표시

---

## 6. Study Mode (`/app/study`)

### Purpose

캐릭터와 함께 집중 공부 타이머를 제공한다.  
(이전 설계의 오버레이 방식 → 별도 페이지로 변경)

### Layout

Win95 타이틀바 (`T` 아이콘, "공부 모드 - 타이머")

### Required Elements

- **캐릭터**: ASCII face + 상태 문구
  - 실행 중: `(^o^)` + `[ 공부 중... ]`
  - 일시정지: `(-_-)` + `[ 일시정지 ]`
- **타이머**: 검정 배경 + 녹색(`#00ff00`) 7-segment 스타일 (`HH:MM:SS`)
- **상태 표시**: "타이머 실행 중..." / "일시정지됨"
- **버튼**: 일시정지/재개, 초기화

---

## 7. Component Plan

| Component | Purpose | Requirement Link |
|---|---|---|
| AppLayout | Win95 윈도우 프레임 + 태스크바 네비게이션 | 전체 레이아웃 |
| AppHeader | 앱 이름, 오늘 날짜 | - |
| ItemForm | 유형 선택, 항목명, 마감기한, 시험 범위 입력 | FR-001, FR-002, FR-003 |
| FilterTabs | 유형별 항목 필터 탭 (`role="tablist"`) | FR-006 |
| ItemList | 마감기한 순 항목 카드 목록 (`<ul>`) | FR-004 |
| ItemCard | 항목 정보, 완료 토글, 수정/삭제 | FR-004, FR-005, FR-007 |
| ExamDailyPlan | 시험 항목의 오늘 공부 목표 표시 | FR-003 |
| EmptyState | 항목 없음 안내 (`?` 아이콘 박스) | FR-004 |
| StudyCharacter | ASCII face 캐릭터 + 상태 문구 | FR-009 |
| StudyTimer | 경과 시간 타이머 (LED 스타일) | FR-009 |

> `StudyModeOverlay`는 제거됨. 공부 모드는 `/app/study` 페이지로 독립.

---

## 8. Interaction Rules

- 항목 생성 후 입력창은 초기화된다.
- 필수값이 없으면 생성 버튼을 눌러도 항목이 추가되지 않는다.
- 시험 유형 선택 시 범위 입력 필드가 즉시 나타난다.
- 완료 체크박스를 누르면 항목 상태가 화면에 즉시 반영된다.
- 필터 탭을 변경하면 목록이 즉시 바뀐다.
- 공부 모드는 태스크바 "공부 모드" 버튼으로 진입한다.
- 항목 삭제 시 확인 없이 즉시 삭제된다 (MVP 기준, undo 미지원).
- 달력 항목 뱃지에 hover하면 항목 제목 툴팁이 표시된다.

---

## 9. Accessibility Rules

- 모든 입력 필드에는 label이 있어야 한다.
- 버튼 텍스트는 기능을 설명해야 한다.
- 색상만으로 상태를 구분하지 않는다 (완료 상태는 색상 + 취소선 병행).
- 필터 탭은 `role="tablist"` / `role="tab"` / `aria-selected` 속성으로 선택 상태를 표현한다.
- 완료 체크박스는 `aria-label="${title} 완료 처리"` 형식을 따른다.
- 타이머 버튼은 `aria-label`로 현재 상태를 설명한다 (`타이머 일시정지` / `타이머 재개` / `타이머 초기화`).
