# Security Review — 시험 플래너 MVP

**검토일:** 2026-05-29  
**대상:** Frontend-only Next.js 14 앱 (백엔드 없음, 인증 없음, API 키 없음)  
**배포:** https://study-planner-mvp.vercel.app

---

## 요약

| 위험 등급 | 건수 | 내용 |
|---|---|---|
| **Medium** | 1 | HTTP 보안 헤더 미설정 (CSP / X-Frame-Options 없음) |
| **Low** | 5 | localStorage 역직렬화, 스토리지 키 중복, 입력 길이 제한 없음, focus trap 미구현 |
| **None** | 13 | XSS, eval, 오픈 리다이렉트, 외부 HTTP URL, 환경변수 노출 등 모두 해당 없음 |

---

## 1. 민감정보 노출

| 항목 | 결과 |
|---|---|
| `.env.local` 파일 | **없음** — 노출 위험 없음 |
| `process.env` / `NEXT_PUBLIC_` 사용 | **없음** |
| API 키, 토큰, 비밀번호 | **없음** |
| `.gitignore` 내 `.env*.local` 제외 | **확인됨** ✅ |
| 외부 API 호출 | **없음** — 완전 로컬 동작 |

> 현재 MVP에서 민감정보 노출 위험은 없음.

---

## 2. localStorage에 저장하면 안 되는 정보

### SEC-01 · JSON.parse 결과 타입 검증 없음 — Low

**파일:** `src/features/items/storage.ts` L9

```ts
return JSON.parse(raw) as StudyItem[];  // 런타임 검증 없는 타입 단언
```

TypeScript의 `as` 캐스팅은 런타임에 사라짐. DevTools에서 데이터를 직접 수정하거나 스키마가 변경된 경우, 앱이 오작동하거나 화면이 비워질 수 있음.

**권장 수정:**
```ts
const parsed = JSON.parse(raw);
if (!Array.isArray(parsed)) return [];
return parsed as StudyItem[];
```

---

### SEC-02 · 스토리지 키 문자열 중복 — Low

**파일:** `src/features/items/storage.ts` L3, `src/features/items/useItems.ts` L17

```ts
// storage.ts
const KEY = 'study-planner-items';

// useItems.ts (중복 선언)
const raw = localStorage.getItem('study-planner-items');
```

키가 두 곳에 하드코딩되어 있어 한쪽을 수정하면 조용히 항상 mockItems를 반환하게 됨.

**권장 수정:** `storage.ts`의 `KEY` 상수를 export하여 `useItems.ts`에서 import.

```ts
// storage.ts
export const STORAGE_KEY = 'study-planner-items';

// useItems.ts
import { STORAGE_KEY, loadItems, saveItems } from './storage';
const raw = localStorage.getItem(STORAGE_KEY);
```

> localStorage에 저장되는 데이터는 `StudyItem[]` (제목, 마감일, 유형, 상태)으로 개인정보에 해당하지 않음. 저장 자체는 적절함.

---

## 3. XSS 위험

| 패턴 | 검색 결과 |
|---|---|
| `dangerouslySetInnerHTML` | **없음** ✅ |
| `innerHTML` 직접 조작 | **없음** ✅ |
| `eval()` / `Function()` | **없음** ✅ |
| 사용자 입력을 HTML로 렌더링 | **없음** — 모두 React 텍스트 노드로 렌더링 ✅ |

> React는 기본적으로 JSX 내 변수를 이스케이프하므로 XSS 위험 없음.

---

### SEC-03 · 입력 길이 제한 없음 — Low

**파일:** `src/features/items/components/ItemForm.tsx` L61 (제목), L77 (시험 범위)

```tsx
<input id="item-title" type="text" ... />   // maxLength 없음
<input id="item-scope" type="number" min={1} ... />  // max 없음
```

XSS 위험은 없지만 매우 긴 제목은 레이아웃을 깨고, 매우 큰 범위 값은 localStorage 용량을 낭비할 수 있음. `ItemCard.tsx` L35의 수정 폼도 동일.

**권장 수정:**
```tsx
<input id="item-title" type="text" maxLength={200} ... />
<input id="item-scope" type="number" min={1} max={9999} ... />
```

---

## 4. dangerouslySetInnerHTML 사용 여부

```
검색 결과: src/ 전체에서 dangerouslySetInnerHTML 없음 ✅
```

---

## 5. 외부 링크 보안 속성

| 패턴 | 검색 결과 |
|---|---|
| `target="_blank"` | **없음** ✅ |
| `rel=` 속성 | **없음** (외부 링크 자체가 없으므로 필요 없음) ✅ |
| `http://` 외부 URL | **없음** ✅ |

> 앱 내 링크는 모두 내부 경로(`/app`, `/app/calendar` 등)이므로 `rel="noopener noreferrer"` 이슈 없음.

---

## 6. 배포 전 확인해야 할 설정

### SEC-04 · HTTP 보안 헤더 미설정 — **Medium**

**파일:** `next.config.mjs` (전체 4줄, 헤더 설정 없음)

현재 배포된 앱에 아래 헤더가 없음:

| 헤더 | 없을 때 위험 |
|---|---|
| `X-Frame-Options: DENY` | 클릭재킹 — 타사 iframe에 앱 삽입 가능 |
| `X-Content-Type-Options: nosniff` | MIME 스니핑 공격 |
| `Content-Security-Policy` | XSS가 도입될 경우 완화 레이어 없음 |
| `Referrer-Policy` | 레퍼러 헤더로 URL 정보 노출 |
| `Permissions-Policy` | 카메라/마이크/위치 권한 불필요하게 허용 |

**권장 수정 — `next.config.mjs`:**

```js
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options',           value: 'DENY' },
          { key: 'X-Content-Type-Options',     value: 'nosniff' },
          { key: 'Referrer-Policy',            value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy',         value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Content-Security-Policy',
            // 인라인 style이 많으므로 'unsafe-inline' 필요
            value: "default-src 'self'; style-src 'self' 'unsafe-inline'; font-src 'self'; script-src 'self'",
          },
        ],
      },
    ];
  },
};
export default nextConfig;
```

---

### SEC-05 · Focus Trap 미구현 — Low

**파일:** `src/app/app/study/page.tsx`

공부 모드 페이지가 별도 라우트로 변경되어 오버레이 포커스 트랩 이슈는 감소했으나, `CLAUDE.md` 접근성 규칙("공부 모드 오버레이: 포커스 트랩 적용")에 명시된 요구사항. 향후 오버레이 패턴 재도입 시 반드시 구현 필요.

---

## 7. 검사 결과가 없는 항목 (양호)

| 검사 항목 | 결과 |
|---|---|
| `dangerouslySetInnerHTML` | 없음 ✅ |
| `eval` / `Function()` | 없음 ✅ |
| `sessionStorage` 민감정보 | 사용 안 함 ✅ |
| `process.env` / 환경변수 노출 | 없음 ✅ |
| 외부 HTTP(비-HTTPS) URL | 없음 ✅ |
| API 키 / 시크릿 하드코딩 | 없음 ✅ |
| `target="_blank"` + rel 누락 | 외부 링크 없음 ✅ |
| `crypto` 오용 | `crypto.randomUUID()` 올바르게 사용 ✅ |
| `pnpm-lock.yaml` 커밋 | 확인됨 ✅ |

---

## 8. 조치 우선순위

| 우선순위 | ID | 조치 내용 | 난이도 |
|---|---|---|---|
| 🔴 즉시 | SEC-04 | `next.config.mjs`에 HTTP 보안 헤더 추가 | 쉬움 (10분) |
| 🟡 권장 | SEC-01 | localStorage JSON.parse 배열 검증 추가 | 쉬움 (5분) |
| 🟡 권장 | SEC-02 | STORAGE_KEY 상수 export/import로 단일화 | 쉬움 (5분) |
| 🟢 선택 | SEC-03 | 입력 필드에 maxLength / max 속성 추가 | 쉬움 (5분) |
| 🟢 선택 | SEC-05 | 오버레이 재도입 시 focus trap 구현 | 보통 |

---

*이 문서는 코드 정적 분석 기반으로 작성되었으며 침투 테스트를 포함하지 않습니다.*
