# Technical Design

## 1. 문서 목적

이 문서는 서비스의 기술 구현 방향을 정리한다.  
제품의 가치나 사용자 문제는 Product Brief에서 다루고, 이 문서에서는 실제 개발자가 구현할 구조를 정의한다.

---

## 2. Architecture Overview

## 전체 구조

```text
User
→ Next.js App
→ Pages / Routes
→ UI Components
→ Feature Logic
→ Client State
→ Storage
→ Future Backend
```

## 이번 MVP의 구현 범위

* 단일 사용자 기준
* 프론트엔드 중심 구현
* 서버 DB 없이 localStorage 사용
* 인증, 결제, 실시간 기능 제외

---

## 3. Tech Stack

| Area            | Technology       | Reason              |
| --------------- | ---------------- | ------------------- |
| Framework       | Next.js 14       | App Router 기반 웹앱 구현 |
| UI Library      | React 18         | 컴포넌트 기반 UI 구성       |
| Language        | TypeScript       | 타입 기반 안정성 확보        |
| Styling         | Tailwind CSS     | 빠른 UI 스타일링          |
| AI Coding       | Claude Code      | 코드 생성, 수정, 검토       |
| Version Control | GitHub           | 커밋, 브랜치, 비교 실험      |
| Test            | Playwright later | 4회차 테스트 자동화 예정      |

---

## 4. Route Design

| Route  | File Path              | Purpose       | Notes       |
| ------ | ---------------------- | ------------- | ----------- |
| `/`    | `src/app/page.tsx`     | Landing Page  | 서비스 소개, CTA |
| `/app` | `src/app/app/page.tsx` | Main App Page | 실제 기능 사용 화면 |

---

## 5. Source Structure

```text
src/
  app/
    layout.tsx
    globals.css
    page.tsx                          # Landing Page
    app/
      page.tsx                        # Main App Page

  components/
    ui/
      Button.tsx
      Input.tsx
      Card.tsx
      Checkbox.tsx

    layout/
      AppHeader.tsx
      EmptyState.tsx

  features/
    items/
      types.ts                        # 공통 타입 정의
      mock-data.ts                    # 초기 화면 구성용 목 데이터
      storage.ts                      # localStorage 읽기/쓰기
      useItems.ts                     # 항목 CRUD 커스텀 훅
      components/
        ItemForm.tsx
        ItemList.tsx
        ItemCard.tsx
        FilterTabs.tsx
        ExamDailyPlan.tsx
        EmptyState.tsx

    study-mode/
      useStudyTimer.ts                # 타이머 커스텀 훅
      components/
        StudyModeOverlay.tsx
        StudyCharacter.tsx
        StudyTimer.tsx

  lib/
    examSchedule.ts                   # 시험 범위 자동 배분 로직
    utils.ts                          # 날짜 포맷 등 공통 유틸
```

## 폴더 역할

| Folder                               | Role                   |
| ------------------------------------ | ---------------------- |
| `src/app`                            | Next.js route와 page 관리 |
| `src/components/ui`                  | 재사용 가능한 기본 UI 컴포넌트     |
| `src/components/layout`              | 레이아웃 관련 컴포넌트           |
| `src/features/items`                 | 항목 관리 기능 단위 코드          |
| `src/features/items/components`      | items 기능 전용 컴포넌트       |
| `src/features/study-mode`            | 캐릭터 공부 모드 기능 단위 코드     |
| `src/features/study-mode/components` | study-mode 전용 컴포넌트    |
| `src/lib`                            | 순수 로직 유틸 (UI 의존성 없음)   |

---

## 6. Feature Module Design

## 핵심 Feature

| Feature              | Description               | Priority |
| -------------------- | ------------------------- | -------- |
| Item Create          | 과제/강의/시험 항목 생성            | Must     |
| Item List            | 마감기한 순 항목 목록 표시           | Must     |
| Item Status Update   | 항목 완료 상태 토글               | Must     |
| Exam Scope Distribute| 시험 범위 입력 → 날짜별 공부량 자동 배분  | Must     |
| Item Filter          | 유형별(과제/강의/시험) 항목 필터링      | Should   |
| Item Delete/Edit     | 항목 삭제 또는 수정               | Should   |
| Study Mode           | 캐릭터와 함께하는 집중 공부 타이머 모드    | Must     |

## 이번 회차에서 구현할 Feature

* Route 구조 (Landing Page, App Page)
* Landing Page 초안 (Hero, Problem, Core Features, CTA)
* App Page shell (Header, Form, Filter, List 영역)
* types.ts 기본 타입 정의
* mock-data.ts 초기 목 데이터
* 컴포넌트 placeholder
* localStorage 기반 storage.ts

## 다음 회차로 넘길 Feature

* 실제 항목 생성 로직
* 목록 상태 관리 (useItems 훅)
* 완료 상태 토글 로직
* 시험 범위 자동 배분 (examSchedule.ts)
* 유형별 필터 로직
* 삭제/수정 로직
* 캐릭터 공부 모드 (StudyModeOverlay)

---

## 7. Data Model

## 기본 타입

```ts
// features/items/types.ts

export type ItemType   = 'assignment' | 'lecture' | 'exam';
export type ItemStatus = 'pending' | 'completed';

export interface BaseItem {
  id:        string;
  type:      ItemType;
  title:     string;
  dueDate:   string;      // YYYY-MM-DD
  status:    ItemStatus;
  createdAt: string;      // ISO string
}

export interface AssignmentItem extends BaseItem { type: 'assignment' }
export interface LectureItem    extends BaseItem { type: 'lecture' }

export interface DailyStudyPlan {
  date:      string;      // YYYY-MM-DD
  amount:    number;      // 해당 날 공부할 분량
  completed: boolean;
}

export interface ExamItem extends BaseItem {
  type:      'exam';
  scope:     number;                // 총 범위 (챕터 수 또는 페이지 수)
  unit:      'chapter' | 'page';
  dailyPlan: DailyStudyPlan[];
}

export type StudyItem = AssignmentItem | LectureItem | ExamItem;
```

## 서비스별 기본 필드

| Field       | Type         | Required | Description          |
| ----------- | ------------ | -------- | -------------------- |
| `id`        | `string`     | Yes      | 고유 ID (crypto.randomUUID) |
| `type`      | `ItemType`   | Yes      | 항목 유형 (과제/강의/시험)     |
| `title`     | `string`     | Yes      | 항목 제목               |
| `dueDate`   | `string`     | Yes      | 마감기한 (YYYY-MM-DD)   |
| `status`    | `ItemStatus` | Yes      | 진행 상태 (pending/completed) |
| `createdAt` | `string`     | Yes      | 생성 시각 (ISO string)  |

## 서비스별 추가 필드 (시험 항목 전용)

| Field       | Type                    | Required | Description             |
| ----------- | ----------------------- | -------- | ----------------------- |
| `scope`     | `number`                | Yes (시험) | 시험 범위 총량 (챕터 수/페이지 수) |
| `unit`      | `'chapter' \| 'page'`   | Yes (시험) | 범위 단위                  |
| `dailyPlan` | `DailyStudyPlan[]`      | Yes (시험) | 날짜별 공부량 자동 배분 결과       |

---

## 8. State Design

| State            | Type                     | Purpose          |
| ---------------- | ------------------------ | ---------------- |
| `items`          | `StudyItem[]`            | 현재 항목 목록         |
| `formInput`      | `Partial<StudyItem>`     | 입력 폼 상태          |
| `selectedFilter` | `ItemType \| 'all'`      | 유형별 필터 상태        |
| `validationError`| `string \| null`         | 입력 오류 메시지        |
| `isStudyMode`    | `boolean`                | 공부 모드 오버레이 표시 여부 |
| `isLoading`      | `boolean`                | 향후 서버 연동 대비      |

## 상태 관리 방식

이번 MVP에서는 별도 상태 관리 라이브러리를 사용하지 않는다.

* React `useState`
* `useItems` 커스텀 훅 (항목 CRUD + localStorage 동기화)
* `useStudyTimer` 커스텀 훅 (타이머 상태)
* 필요 시 `useMemo`로 필터 결과 최적화

---

## 9. Storage Strategy

## 1차 MVP

| Option       | Decision          |
| ------------ | ----------------- |
| DB           | 사용하지 않음           |
| API Server   | 사용하지 않음           |
| localStorage | 기본 저장 방식 (`study-items` 키) |
| mock data    | 초기 화면 구성용 (`mock-data.ts`) |

## 저장 흐름

```text
User Action
→ useItems 훅 호출
→ React State Update
→ localStorage Save (storage.ts)
→ UI Re-render
```

## 향후 확장 가능성

* storage.ts만 교체하면 서버 저장소로 전환 가능
* 사용자 인증 추가 시 userId 키로 분리
* Server Actions / API Route 연동

---

## 10. API Design

이번 MVP에서는 서버 API를 구현하지 않는다.

## 향후 확장 시 API 후보

| API              | Method   | Purpose           |
| ---------------- | -------- | ----------------- |
| `/api/items`     | `GET`    | 항목 목록 조회          |
| `/api/items`     | `POST`   | 항목 생성             |
| `/api/items/:id` | `PATCH`  | 항목 수정 또는 상태 변경    |
| `/api/items/:id` | `DELETE` | 항목 삭제             |

## 이번 회차 결정

* API 구현 없음
* 서버 DB 없음
* 클라이언트 상태와 localStorage 중심

---

## 11. Validation Rules

| Rule              | Description                     |
| ----------------- | ------------------------------- |
| Required Title    | 제목은 비어 있을 수 없다                  |
| Title Length      | 제목은 50자를 초과할 수 없다               |
| Required DueDate  | 마감기한은 비어 있을 수 없다                |
| Required Scope    | 시험 항목의 범위는 1 이상이어야 한다           |
| Valid Status      | 상태는 `pending` 또는 `completed`만 허용 |
| No Sensitive Data | 민감 정보는 저장하지 않는다                 |

---

## 12. Error Handling

| Situation              | Handling                      |
| ---------------------- | ----------------------------- |
| 제목 미입력                 | 입력 오류 메시지 표시, 생성 차단           |
| 마감기한 미입력               | 입력 오류 메시지 표시, 생성 차단           |
| 시험 범위 0 이하             | 입력 오류 메시지 표시, 생성 차단           |
| 시험 날짜가 오늘 이전           | 오류 메시지 표시 ("시험일이 이미 지났습니다")   |
| localStorage 읽기 실패     | 빈 배열로 fallback               |
| 알 수 없는 ItemType        | 렌더링 건너뜀 (방어적 처리)              |
| 데이터 없음                 | EmptyState 컴포넌트 표시            |

---

## 13. Accessibility Considerations

* 입력 필드는 label을 가진다.
* 버튼 텍스트는 기능을 설명한다.
* 색상만으로 상태를 구분하지 않는다 (완료: 색상 + 취소선 병행).
* 주요 영역은 heading 구조를 가진다.
* 필터 탭은 `aria-selected`로 선택 상태를 표현한다.
* 공부 모드 오버레이 진입 시 포커스가 오버레이 내부로 이동한다.
* 키보드로 주요 액션을 수행할 수 있어야 한다.

---

## 14. Security Considerations

이번 MVP에서 지킬 보안 원칙

* API key를 코드에 넣지 않는다.
* `.env` 파일을 GitHub에 올리지 않는다.
* 민감한 개인정보를 저장하지 않는다.
* localStorage에는 민감 정보 저장을 피한다.
* 인증이 필요한 기능은 이번 MVP에서 제외한다.

---

## 15. Decision Log

| Decision                  | Reason                           | Consequence          |
| ------------------------- | -------------------------------- | -------------------- |
| Next.js 14 App Router 사용  | 현재 Next.js 기본 구조와 수업 방향에 적합      | `src/app` 기준 라우팅     |
| TypeScript 사용             | 데이터 구조와 컴포넌트 props를 명확히 하기 위해    | 초기 작성량 증가            |
| localStorage 우선           | MVP 기간 안에 완성하기 위해                | 다중 사용자 기능 제외         |
| 전역 상태 라이브러리 없음           | MVP 규모에서 불필요한 의존성 제거             | 커스텀 훅으로 상태 관리        |
| ItemType으로 유형 분기          | 과제/강의/시험이 서로 다른 필드를 가짐          | 시험만 scope, dailyPlan 보유 |
| API 미구현                   | 시간 제한과 학습 목표 고려                  | 서버 기능은 향후 확장         |
| 날짜 라이브러리 없음              | 단순 날짜 연산만 필요, 번들 최소화             | lib/utils.ts에 직접 구현  |

---

## 16. Implementation Notes

3회차에서 구현할 때 Claude Code는 다음 순서를 따른다.

1. 현재 파일 구조 확인
2. `01.Product Brief.md` ~ `04.Technical Design.md` 문서 읽기
3. 수정 전 계획 제안
4. 작은 단위로 구현 (types → storage → hooks → components 순)
5. `npm run dev`로 실행하여 브라우저에서 확인
6. 변경 파일 요약
7. commit message 제안

---

## 17. Open Questions

| Question                    | Decision                              |
| --------------------------- | ------------------------------------- |
| 항목의 정확한 이름은 무엇인가?           | 과제(assignment), 온라인 강의(lecture), 시험(exam) |
| 상태값은 몇 개가 필요한가?             | 2개: `pending` / `completed`           |
| 삭제 기능을 넣을 것인가?              | Should 우선순위로 포함                       |
| 필터는 상태 기준인가, 유형 기준인가?       | 유형 기준 (과제 / 강의 / 시험 / 전체)            |
