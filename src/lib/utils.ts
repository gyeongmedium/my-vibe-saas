/** 오늘 날짜를 YYYY-MM-DD 형식으로 반환 */
export function getTodayString(): string {
  return new Date().toISOString().slice(0, 10);
}

/** Date 객체를 YYYY-MM-DD 형식으로 변환 */
export function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}
