import { StudyItem } from './types';

const KEY = 'study-planner-items';

export function loadItems(): StudyItem[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    return JSON.parse(raw) as StudyItem[];
  } catch {
    return [];
  }
}

export function saveItems(items: StudyItem[]): void {
  localStorage.setItem(KEY, JSON.stringify(items));
}
