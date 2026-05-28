# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Project Overview

대학생 시험기간 관리 서비스. 과제·온라인 강의 마감기한 관리, 시험 범위 자동 배분, 캐릭터와 함께하는 공부 모드를 제공한다.  
단일 사용자 기준 프론트엔드 MVP. 로그인·DB·외부 API 없음.

설계 문서:
- `planning/md-design/01_PRODUCT_BRIEF.md` — 제품 목표, 문제, MVP 범위
- `planning/md-design/02_REQUIREMENTS_SPEC.md` — 유즈케이스, 기능 요구사항(FR), 인수 기준(AC)
- `planning/md-design/03_UX_UI_SPEC.md` — 화면 구성, 컴포넌트 계획, 인터랙션 규칙
- `planning/md-design/04_TECHNICAL_DESIGN.md` — 아키텍처, 소스 구조, 데이터 모델, 알고리즘
- `planning/md-design/05_DELIVERY_PLAN.md` — 회차별 구현 계획, QA 체크리스트

---

## Common Commands

```bash
pnpm dev          # 개발 서버 실행 (http://localhost:3000)
pnpm build        # 프로덕션 빌드
pnpm lint         # ESLint 실행
npx playwright test  # E2E 테스트 (4회차 이후)
```

---

## Tech Stack

| Area       | Technology       |
| ---------- | ---------------- |
| Framework  | Next.js 14 (App Router) |
| UI         | React 18         |
| Language   | TypeScript       |
| Styling    | Tailwind CSS     |
| Storage    | localStorage     |
| Test       | Playwright (4회차) |

---

## Source Structure

```text
src/
  app/
    layout.tsx
    globals.css
    page.tsx                          # Landing Page (/)
    app/
      page.tsx                        # Main App Page (/app)

  components/
    ui/          Button, Input, Card, Checkbox
    layout/      AppHeader, EmptyState

  features/
    items/
      types.ts         # 공통 타입
      mock-data.ts     # 목 데이터
      storage.ts       # localStorage 읽기/쓰기
      useItems.ts      # CRUD 커스텀 훅
      components/      ItemForm, ItemList, ItemCard, FilterTabs, ExamDailyPlan
    study-mode/
      useStudyTimer.ts
      components/      StudyModeOverlay, StudyCharacter, StudyTimer

  lib/
    examSchedule.ts    # 시험 범위 자동 배분 로직
    utils.ts           # 날짜 포맷 등 공통 유틸
```

---

## Data Model

```ts
export type ItemType   = 'assignment' | 'lecture' | 'exam';
export type ItemStatus = 'pending' | 'completed';

export interface BaseItem {
  id: string; type: ItemType; title: string;
  dueDate: string; status: ItemStatus; createdAt: string;
}
export interface AssignmentItem extends BaseItem { type: 'assignment' }
export interface LectureItem    extends BaseItem { type: 'lecture' }

export interface DailyStudyPlan {
  date: string; amount: number; completed: boolean;
}
export interface ExamItem extends BaseItem {
  type: 'exam'; scope: number; unit: 'chapter' | 'page';
  dailyPlan: DailyStudyPlan[];
}
export type StudyItem = AssignmentItem | LectureItem | ExamItem;
```

---

## Feature Priorities

| Feature | Priority |
|---|---|
| 항목 생성 (과제/강의/시험 유형 선택) | Must |
| 마감기한 순 목록 표시 | Must |
| 완료 상태 토글 | Must |
| 시험 범위 → 날짜별 공부량 자동 배분 | Must |
| 캐릭터 공부 모드 (타이머 + 애니메이션) | Must |
| 유형별 필터링 (과제/강의/시험) | Should |
| 항목 수정 / 삭제 | Should |
| localStorage 영속성 | Should |

---

## Non-goals (MVP에서 구현하지 않음)

- 로그인 / 인증
- 결제
- 서버 DB / API
- 실시간 협업
- 대용량 파일 업로드
- 다중 외부 API 연동
- 복잡한 관리자 권한

---

## Code Conventions

- **Language**: TypeScript strict mode
- **Styling**: Tailwind CSS (별도 CSS 파일 최소화)
- **Imports**: `@/` alias 사용 (`import ... from '@/features/items/types'`)
- **Naming**: 컴포넌트 PascalCase, 훅 camelCase (`useItems`), 상수 UPPER_SNAKE_CASE
- **Comments**: 코드가 스스로 설명하지 못하는 WHY만 작성
- **State**: 전역 상태 라이브러리 없이 `useState` + 커스텀 훅

---

## Key Algorithm

시험 범위 자동 배분 (`lib/examSchedule.ts`):

```
총 범위 / 시험까지 남은 일수 = 하루 분량 (나머지는 첫날에 추가)
```

---

## Environment Variables

MVP에서는 환경 변수 없음. 향후 백엔드 연동 시 `.env.local` 사용.  
`.env.local`은 절대 GitHub에 커밋하지 않는다.

---

## Implementation Order (3회차 기준)

1. `features/items/types.ts` 타입 정의
2. `features/items/storage.ts` localStorage 유틸
3. `features/items/useItems.ts` CRUD 훅
4. `features/items/components/` 컴포넌트
5. `lib/examSchedule.ts` 배분 로직
6. `features/study-mode/` 공부 모드

---

## Accessibility Rules

- 모든 입력 필드에 `label` 필수
- 버튼 텍스트는 기능을 설명
- 완료 상태: 색상 + 취소선 병행 (색상만 사용 금지)
- 필터 탭: `aria-selected` 사용
- 공부 모드 오버레이: 포커스 트랩 적용

---

## Before Starting Any Task

1. 이 파일(`CLAUDE.md`)과 관련 설계 문서를 읽는다.
2. 구현 범위가 Non-goals를 침범하지 않는지 확인한다.
3. 파일 수정 전 계획을 먼저 제안한다.
4. 구현 후 `pnpm build`로 타입 오류 없음을 확인한다.
