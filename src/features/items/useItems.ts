'use client';

import { useEffect, useState } from 'react';
import { StudyItem } from './types';
import { loadItems, saveItems } from './storage';
import { mockItems } from './mock-data';

function sortByDueDate(items: StudyItem[]): StudyItem[] {
  return [...items].sort((a, b) => a.dueDate.localeCompare(b.dueDate));
}

export function useItems() {
  const [items, setItems] = useState<StudyItem[]>(() => {
    // SSR 환경에서는 localStorage 없으므로 mockItems 반환
    if (typeof window === 'undefined') return mockItems;
    // key가 없으면 첫 방문 → 샘플 데이터 표시
    const raw = localStorage.getItem('study-planner-items');
    if (raw === null) return mockItems;
    // key가 있으면 저장값 사용 (빈 배열 포함)
    return loadItems();
  });

  useEffect(() => {
    saveItems(items);
  }, [items]);

  function addItem(item: StudyItem) {
    setItems((prev) => sortByDueDate([...prev, item]));
  }

  function toggleItem(id: string) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: item.status === 'completed' ? 'pending' : 'completed' }
          : item
      )
    );
  }

  function deleteItem(id: string) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  function editItem(id: string, updates: { title: string; dueDate: string }) {
    setItems((prev) =>
      sortByDueDate(
        prev.map((item) =>
          item.id === id ? { ...item, ...updates } : item
        )
      )
    );
  }

  return { items, addItem, toggleItem, deleteItem, editItem };
}
