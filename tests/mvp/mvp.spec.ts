/**
 * MVP E2E 테스트 — 핵심 사용자 흐름 9가지
 *
 * T-01  과제 항목 생성
 * T-02  필수 입력 미기입 → 추가 차단
 * T-03  시험 항목 생성 + 범위 자동 배분
 * T-04  목록 마감기한 오름차순 정렬
 * T-05  완료 토글 (체크 → 취소선 / 언체크 → 복원)
 * T-06  완료 항목 삭제 / 미완료 항목에 삭제 없음
 * T-07  유형별 필터링
 * T-08  localStorage 영속성 (새로고침 후 유지 / 손상 데이터 복구)
 * T-09  공부 모드 타이머 (시작 → 일시정지 → 재개 → 초기화)
 */

import { test, expect, Page } from '@playwright/test';

// ─── 공통 헬퍼 ────────────────────────────────────────────────────────────────

/** localStorage를 비우고 /app 으로 이동 */
async function freshApp(page: Page) {
  await page.goto('/app');
  await page.evaluate(() => localStorage.setItem('study-planner-items', '[]'));
  // goto 대신 reload — 동일 컨텍스트에서 강제 전체 새로고침하여 타이밍 이슈 방지
  await page.reload();
  await page.waitForLoadState('networkidle');
}

/** 과제/강의 항목 빠르게 추가 */
async function addItem(
  page: Page,
  type: '과제' | '강의' | '시험',
  title: string,
  dueDate: string,
  scope?: number,
) {
  await page.getByRole('button', { name: type, exact: true }).click();
  await page.getByLabel('항목 제목').fill(title);
  await page.getByLabel('마감기한').fill(dueDate);
  if (type === '시험' && scope !== undefined) {
    await page.getByLabel('시험 범위').fill(String(scope));
  }
  await page.getByRole('button', { name: '추가하기' }).click();
}

// ─── beforeEach: 각 테스트 전 초기화 ─────────────────────────────────────────

test.beforeEach(async ({ page }) => {
  await freshApp(page);
});

// ─────────────────────────────────────────────────────────────────────────────
// T-01. 과제 항목 생성
// ─────────────────────────────────────────────────────────────────────────────
test('T-01: 과제 항목 생성 — 목록에 유형 뱃지와 함께 표시', async ({ page }) => {
  // Given: 앱이 열려 있다
  // When: 과제 유형 선택 → 제목/날짜 입력 → 추가
  await addItem(page, '과제', '경영학 레포트', '2026-06-10');

  // Then: 목록에 항목과 과제 뱃지가 보인다
  const card = page.getByRole('listitem').filter({ hasText: '경영학 레포트' });
  await expect(card).toBeVisible();
  await expect(card.locator('span', { hasText: '과제' })).toBeVisible();
  await expect(card.getByText('2026-06-10 까지')).toBeVisible();
});

test('T-01: 강의 항목 생성 — 강의 뱃지로 표시', async ({ page }) => {
  await addItem(page, '강의', '데이터구조 5강', '2026-06-08');

  const card = page.getByRole('listitem').filter({ hasText: '데이터구조 5강' });
  await expect(card).toBeVisible();
  await expect(card.locator('span', { hasText: '강의' })).toBeVisible();
});

// ─────────────────────────────────────────────────────────────────────────────
// T-02. 필수 입력 미기입 → 추가 차단
// ─────────────────────────────────────────────────────────────────────────────
test('T-02: 제목 없이 추가 → 오류 메시지, 항목 미등록', async ({ page }) => {
  // 제출 전 항목 수 기록 (freshApp 이후 0이어야 하지만, 증가 여부로 검증)
  const countBefore = await page.getByRole('listitem').count();

  await page.getByLabel('마감기한').fill('2026-06-10');
  await page.getByRole('button', { name: '추가하기' }).click();

  // p[role="alert"] 로 Next.js 내장 route-announcer div 와 구분
  await expect(page.locator('p[role="alert"]')).toHaveText('제목을 입력해주세요.');
  // 항목 수가 증가하지 않았음을 확인
  await expect(page.getByRole('listitem')).toHaveCount(countBefore);
});

test('T-02: 날짜 없이 추가 → 오류 메시지, 항목 미등록', async ({ page }) => {
  const countBefore = await page.getByRole('listitem').count();

  await page.getByLabel('항목 제목').fill('제목만 입력');
  await page.getByRole('button', { name: '추가하기' }).click();

  await expect(page.locator('p[role="alert"]')).toHaveText('마감기한을 선택해주세요.');
  await expect(page.getByRole('listitem')).toHaveCount(countBefore);
});

test('T-02: 시험 유형에서 범위 0 → 오류 메시지', async ({ page }) => {
  await page.getByRole('button', { name: '시험', exact: true }).click();
  await page.getByLabel('항목 제목').fill('범위 없는 시험');
  await page.getByLabel('마감기한').fill('2026-06-20');
  // 범위 미입력 상태로 추가
  await page.getByRole('button', { name: '추가하기' }).click();

  await expect(page.locator('p[role="alert"]')).toHaveText('시험 범위를 1 이상 입력해주세요.');
});

// ─────────────────────────────────────────────────────────────────────────────
// T-03. 시험 항목 생성 + 범위 자동 배분
// ─────────────────────────────────────────────────────────────────────────────
test('T-03: 시험 선택 시 범위 입력 필드 표시', async ({ page }) => {
  // Given: 기본 상태(과제 선택)
  await expect(page.getByLabel('시험 범위')).not.toBeVisible();

  // When: 시험 탭 클릭
  await page.getByRole('button', { name: '시험', exact: true }).click();

  // Then: 범위 입력 필드 노출
  await expect(page.getByLabel('시험 범위')).toBeVisible();
});

test('T-03: 시험 항목 추가 후 오늘 공부 목표 표시', async ({ page }) => {
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 6);

  // When: 6챕터 / +6일 시험 항목 추가 → 하루 1챕터 배분
  await addItem(page, '시험', '운영체제 기말', dueDate.toISOString().slice(0, 10), 6);

  // Then: 카드에 오늘 목표 표시
  const card = page.getByRole('listitem').filter({ hasText: '운영체제 기말' });
  await expect(card.getByText(/오늘 목표/).first()).toBeVisible();
});

test('T-03: 과제/강의 항목에는 오늘 목표 미표시', async ({ page }) => {
  await addItem(page, '과제', '일반 과제', '2026-06-15');

  const card = page.getByRole('listitem').filter({ hasText: '일반 과제' });
  await expect(card.getByText(/오늘 목표/)).not.toBeVisible();
});

// ─────────────────────────────────────────────────────────────────────────────
// T-04. 목록 마감기한 오름차순 정렬
// ─────────────────────────────────────────────────────────────────────────────
test('T-04: 마감 늦은 항목 먼저 추가해도 이른 순으로 정렬', async ({ page }) => {
  // 늦은 마감 항목 먼저 추가
  await addItem(page, '과제', '나중 마감 과제', '2026-08-01');
  // 이른 마감 항목 나중에 추가
  await addItem(page, '과제', '먼저 마감 과제', '2026-07-01');

  const items = page.getByRole('listitem');
  const count = await items.count();
  let earlierIdx = -1;
  let laterIdx = -1;

  for (let i = 0; i < count; i++) {
    const text = await items.nth(i).textContent();
    if (text?.includes('먼저 마감 과제')) earlierIdx = i;
    if (text?.includes('나중 마감 과제')) laterIdx = i;
  }

  expect(earlierIdx).toBeGreaterThanOrEqual(0);
  expect(laterIdx).toBeGreaterThanOrEqual(0);
  // 이른 마감이 위에 있어야 한다
  expect(earlierIdx).toBeLessThan(laterIdx);
});

// ─────────────────────────────────────────────────────────────────────────────
// T-05. 완료 토글
// ─────────────────────────────────────────────────────────────────────────────
test('T-05: 체크박스 클릭 → 취소선 표시', async ({ page }) => {
  await addItem(page, '과제', '완료 테스트 과제', '2026-06-15');

  await page.getByLabel('완료 테스트 과제 완료 처리').check();

  // 제목에 취소선 스타일 적용
  await expect(page.getByText('완료 테스트 과제')).toHaveCSS('text-decoration', /line-through/);
});

test('T-05: 완료 취소 → 취소선 제거, 미완료 복원', async ({ page }) => {
  await addItem(page, '과제', '완료 취소 과제', '2026-06-15');

  const checkbox = page.getByLabel('완료 취소 과제 완료 처리');
  await checkbox.check();
  await expect(page.getByText('완료 취소 과제')).toHaveCSS('text-decoration', /line-through/);

  await checkbox.uncheck();
  await expect(page.getByText('완료 취소 과제')).not.toHaveCSS('text-decoration', /line-through/);
});

// ─────────────────────────────────────────────────────────────────────────────
// T-06. 완료 항목 삭제 / 미완료에 삭제 없음
// ─────────────────────────────────────────────────────────────────────────────
test('T-06: 미완료 항목에 삭제 버튼 없음', async ({ page }) => {
  await addItem(page, '과제', '삭제 테스트 과제', '2026-06-15');

  const card = page.getByRole('listitem').filter({ hasText: '삭제 테스트 과제' });
  await expect(card.getByRole('button', { name: '항목 삭제' })).not.toBeVisible();
});

test('T-06: 완료 처리 후 삭제 버튼 표시 → 클릭 시 목록에서 제거', async ({ page }) => {
  await addItem(page, '과제', '삭제할 완료 과제', '2026-06-15');

  // 완료 처리
  await page.getByLabel('삭제할 완료 과제 완료 처리').check();

  // 삭제 버튼 나타남
  const card = page.getByRole('listitem').filter({ hasText: '삭제할 완료 과제' });
  const deleteBtn = card.getByRole('button', { name: '항목 삭제' });
  await expect(deleteBtn).toBeVisible();

  // 삭제 클릭 → 목록에서 사라짐
  await deleteBtn.click();
  await expect(page.getByText('삭제할 완료 과제')).not.toBeVisible();
});

// ─────────────────────────────────────────────────────────────────────────────
// T-07. 유형별 필터링
// ─────────────────────────────────────────────────────────────────────────────
test('T-07: 시험 필터 선택 → 시험만 표시, 과제 숨김', async ({ page }) => {
  await addItem(page, '과제', '과제 항목 A', '2026-06-10');
  await addItem(page, '시험', '시험 항목 B', '2026-06-20', 5);

  await page.getByRole('tab', { name: '시험' }).click();

  await expect(page.getByText('시험 항목 B')).toBeVisible();
  await expect(page.getByText('과제 항목 A')).not.toBeVisible();
});

test('T-07: 전체 필터로 돌아오면 모든 항목 표시', async ({ page }) => {
  await addItem(page, '과제', '과제 필터 테스트', '2026-06-10');
  await addItem(page, '시험', '시험 필터 테스트', '2026-06-20', 3);

  // 시험 필터 → 전체 필터
  await page.getByRole('tab', { name: '시험' }).click();
  await page.getByRole('tab', { name: '전체' }).click();

  await expect(page.getByText('과제 필터 테스트')).toBeVisible();
  await expect(page.getByText('시험 필터 테스트')).toBeVisible();
});

test('T-07: 해당 유형 항목 없을 때 빈 상태 메시지 표시', async ({ page }) => {
  // 과제만 추가 → 강의 탭 클릭
  await addItem(page, '과제', '과제만 있음', '2026-06-10');

  await page.getByRole('tab', { name: '강의' }).click();

  await expect(page.getByText(/없어요|없습니다/)).toBeVisible();
});

// ─────────────────────────────────────────────────────────────────────────────
// T-08. localStorage 영속성
// ─────────────────────────────────────────────────────────────────────────────
test('T-08: 항목 추가 후 새로고침해도 목록 유지', async ({ page }) => {
  await addItem(page, '과제', '영속성 테스트 과제', '2026-06-15');

  await page.reload();

  await expect(page.getByText('영속성 테스트 과제')).toBeVisible();
});

test('T-08: 완료 상태 새로고침 후에도 유지', async ({ page }) => {
  await addItem(page, '과제', '완료 영속 과제', '2026-06-15');
  await page.getByLabel('완료 영속 과제 완료 처리').check();

  await page.reload();

  await expect(page.getByLabel('완료 영속 과제 완료 처리')).toBeChecked();
});

test('T-08: localStorage 손상 데이터 → 에러 없이 빈 목록으로 복구', async ({ page }) => {
  // 유효하지 않은 JSON 저장
  await page.evaluate(() => localStorage.setItem('study-planner-items', '{not valid json}'));
  await page.reload();

  // 앱이 정상 로드되고 빈 상태 메시지 표시
  await expect(page.getByRole('alert')).not.toBeVisible();
  await expect(page.getByRole('listitem')).toHaveCount(0);
});

// ─────────────────────────────────────────────────────────────────────────────
// T-09. 공부 모드 타이머
// ─────────────────────────────────────────────────────────────────────────────
test.describe('T-09: 공부 모드', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/app/study');
  });

  test('진입 시 캐릭터(^o^)와 타이머 표시', async ({ page }) => {
    await expect(page.getByText('(^o^)')).toBeVisible();
    await expect(page.getByText(/\d{2}:\d{2}:\d{2}/)).toBeVisible();
    await expect(page.getByText('타이머 실행 중...')).toBeVisible();
  });

  test('일시정지 → 캐릭터 (-_-)로 변경, 상태 문구 변경', async ({ page }) => {
    await page.getByRole('button', { name: '타이머 일시정지' }).click();

    await expect(page.getByText('(-_-)')).toBeVisible();
    await expect(page.getByText('일시정지됨')).toBeVisible();
    await expect(page.getByRole('button', { name: '타이머 재개' })).toBeVisible();
  });

  test('재개 → 캐릭터 (^o^)로 복귀, 타이머 재시작', async ({ page }) => {
    await page.getByRole('button', { name: '타이머 일시정지' }).click();
    await page.getByRole('button', { name: '타이머 재개' }).click();

    await expect(page.getByText('(^o^)')).toBeVisible();
    await expect(page.getByText('타이머 실행 중...')).toBeVisible();
  });

  test('초기화 → 00:00:00으로 리셋, 정지 상태', async ({ page }) => {
    // 잠깐 기다려서 타이머가 0 이상이 되게 함
    await page.waitForTimeout(1500);
    await page.getByRole('button', { name: '타이머 초기화' }).click();

    await expect(page.getByText('00:00:00')).toBeVisible();
    await expect(page.getByText('일시정지됨')).toBeVisible();
  });
});
