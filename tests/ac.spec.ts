import { test, expect } from '@playwright/test';

// study-planner-items 키를 '[]'로 설정하면
// useItems가 "key 있음 → loadItems() → []" 경로를 타므로 mockItems 제외됨
test.beforeEach(async ({ page }) => {
  await page.goto('/app');
  await page.evaluate(() => {
    localStorage.setItem('study-planner-items', '[]');
  });
  await page.goto('/app');
});

// ─────────────────────────────────────────────
// AC-001. 항목 생성
// ─────────────────────────────────────────────
test('AC-001: 항목 생성 — 과제 유형 추가 후 목록에 표시', async ({ page }) => {
  await page.getByRole('button', { name: '과제' }).click();
  await page.getByLabel('항목 제목').fill('경영학 레포트');

  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 3);
  await page.getByLabel('마감기한').fill(dueDate.toISOString().slice(0, 10));

  await page.getByRole('button', { name: '추가하기' }).click();

  await expect(page.getByText('경영학 레포트')).toBeVisible();

  // 해당 카드 내 '과제' 배지만 확인
  const card = page.getByRole('listitem').filter({ hasText: '경영학 레포트' });
  await expect(card.locator('span', { hasText: '과제' })).toBeVisible();
});

test('AC-001: 필수값 미입력 시 오류 메시지 표시', async ({ page }) => {
  await page.getByRole('button', { name: '추가하기' }).click();
  await expect(page.getByText('제목을 입력해주세요.')).toBeVisible();
});

// ─────────────────────────────────────────────
// AC-002. 시험 범위 자동 배분
// ─────────────────────────────────────────────
test('AC-002: 시험 범위 자동 배분 — 오늘 목표 표시', async ({ page }) => {
  await page.getByRole('button', { name: '시험' }).click();
  await page.getByLabel('항목 제목').fill('운영체제 중간고사');

  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 6);
  await page.getByLabel('마감기한').fill(dueDate.toISOString().slice(0, 10));

  await page.getByLabel('시험 범위').fill('7');
  await page.getByRole('button', { name: '추가하기' }).click();

  // 해당 카드 내에서만 오늘 목표 확인
  const card = page.getByRole('listitem').filter({ hasText: '운영체제 중간고사' });
  await expect(card.getByText(/오늘 목표/).first()).toBeVisible();
});

// ─────────────────────────────────────────────
// AC-003. 목록 확인 — 마감기한 순 정렬
// ─────────────────────────────────────────────
test('AC-003: 목록이 마감기한 오름차순으로 표시됨', async ({ page }) => {
  // 늦은 마감기한 항목 먼저 추가
  await page.getByRole('button', { name: '과제' }).click();
  await page.getByLabel('항목 제목').fill('나중 마감 과제');
  await page.getByLabel('마감기한').fill('2026-08-01');
  await page.getByRole('button', { name: '추가하기' }).click();

  // 빠른 마감기한 항목 추가
  await page.getByLabel('항목 제목').fill('먼저 마감 과제');
  await page.getByLabel('마감기한').fill('2026-07-01');
  await page.getByRole('button', { name: '추가하기' }).click();

  // 각 항목의 인덱스를 비교해 순서 검증
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
  expect(earlierIdx).toBeLessThan(laterIdx);
});

// ─────────────────────────────────────────────
// AC-004. 완료 처리
// ─────────────────────────────────────────────
test('AC-004: 완료 토글 — 체크 후 취소선 표시', async ({ page }) => {
  await page.getByLabel('항목 제목').fill('테스트 과제');
  await page.getByLabel('마감기한').fill('2026-06-15');
  await page.getByRole('button', { name: '추가하기' }).click();

  await page.getByLabel('테스트 과제 완료 처리').check();

  const title = page.getByText('테스트 과제');
  await expect(title).toHaveClass(/line-through/);
});

// ─────────────────────────────────────────────
// AC-005. 필터
// ─────────────────────────────────────────────
test('AC-005: 유형 필터 — 시험만 표시', async ({ page }) => {
  // 과제 추가
  await page.getByRole('button', { name: '과제' }).click();
  await page.getByLabel('항목 제목').fill('과제 항목');
  await page.getByLabel('마감기한').fill('2026-06-10');
  await page.getByRole('button', { name: '추가하기' }).click();

  // 시험 추가
  await page.getByRole('button', { name: '시험' }).click();
  await page.getByLabel('항목 제목').fill('시험 항목');
  await page.getByLabel('마감기한').fill('2026-06-20');
  await page.getByLabel('시험 범위').fill('5');
  await page.getByRole('button', { name: '추가하기' }).click();

  await page.getByRole('tab', { name: '시험' }).click();

  await expect(page.getByText('시험 항목')).toBeVisible();
  await expect(page.getByText('과제 항목')).not.toBeVisible();
});

// ─────────────────────────────────────────────
// AC-006. 캐릭터 공부 모드
// ─────────────────────────────────────────────
test('AC-006: 공부 모드 — 캐릭터와 타이머 표시', async ({ page }) => {
  await page.goto('/app/study');

  await expect(page.getByText('🐣')).toBeVisible();
  await expect(page.getByText(/\d{2}:\d{2}:\d{2}/)).toBeVisible();
  await expect(page.getByRole('button', { name: '타이머 일시정지' })).toBeVisible();
});
