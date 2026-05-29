import { DailyStudyPlan } from '@/features/items/types';
import { formatDate } from './utils';

export function distributeScope(
  scope: number,
  unit: 'chapter' | 'page',
  dueDate: string
): DailyStudyPlan[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);

  const msPerDay = 1000 * 60 * 60 * 24;
  const days = Math.floor((due.getTime() - today.getTime()) / msPerDay) + 1;

  if (days <= 0) {
    return [{ date: dueDate, amount: scope, completed: false }];
  }

  const base = Math.floor(scope / days);
  const remainder = scope % days;
  const plan: DailyStudyPlan[] = [];

  for (let i = 0; i < days; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const dateStr = formatDate(d);
    plan.push({
      date: dateStr,
      amount: i === 0 ? base + remainder : base,
      completed: false,
    });
  }

  return plan;
}
