'use client';

import { useState } from 'react';
import AppHeader from '@/components/layout/AppHeader';
import EmptyState from '@/components/layout/EmptyState';
import ItemForm from '@/features/items/components/ItemForm';
import FilterTabs, { FilterValue } from '@/features/items/components/FilterTabs';
import ItemList from '@/features/items/components/ItemList';
import StudyModeOverlay from '@/features/study-mode/components/StudyModeOverlay';
import { mockItems } from '@/features/items/mock-data';
import { StudyItem } from '@/features/items/types';

export default function AppPage() {
  const [items, setItems] = useState<StudyItem[]>(mockItems);
  const [filter, setFilter] = useState<FilterValue>('all');
  const [isStudyMode, setIsStudyMode] = useState(false);

  const handleAdd = (item: StudyItem) => {
    setItems((prev) =>
      [...prev, item].sort((a, b) => a.dueDate.localeCompare(b.dueDate))
    );
  };

  const handleToggle = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: item.status === 'completed' ? 'pending' : 'completed' }
          : item
      )
    );
  };

  const filtered = filter === 'all' ? items : items.filter((i) => i.type === filter);

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col max-w-md mx-auto">
      <AppHeader onStudyModeOpen={() => setIsStudyMode(true)} />

      <ItemForm onAdd={handleAdd} />

      <FilterTabs selected={filter} onChange={setFilter} />

      <main className="flex-1">
        {filtered.length === 0 ? (
          <EmptyState message="아직 항목이 없어요. 추가해볼까요?" />
        ) : (
          <ItemList items={filtered} onToggle={handleToggle} />
        )}
      </main>

      {isStudyMode && (
        <StudyModeOverlay onClose={() => setIsStudyMode(false)} />
      )}
    </div>
  );
}
