'use client';

import { useState } from 'react';
import AppHeader from '@/components/layout/AppHeader';
import EmptyState from '@/components/layout/EmptyState';
import ItemForm from '@/features/items/components/ItemForm';
import FilterTabs, { FilterValue } from '@/features/items/components/FilterTabs';
import ItemList from '@/features/items/components/ItemList';
import { useItems } from '@/features/items/useItems';

const EMPTY_MESSAGES: Record<FilterValue, string> = {
  all: '아직 항목이 없어요. 추가해볼까요?',
  assignment: '등록된 과제가 없어요.',
  lecture: '등록된 강의가 없어요.',
  exam: '등록된 시험이 없어요.',
};

export default function AppPage() {
  const { items, addItem, toggleItem, deleteItem, editItem } = useItems();
  const [filter, setFilter] = useState<FilterValue>('all');

  const filtered = filter === 'all' ? items : items.filter((i) => i.type === filter);

  return (
    <>
      <AppHeader />
      <ItemForm onAdd={addItem} />
      <FilterTabs selected={filter} onChange={setFilter} />
      <main className="flex-1">
        {filtered.length === 0 ? (
          <EmptyState message={EMPTY_MESSAGES[filter]} />
        ) : (
          <ItemList
            items={filtered}
            onToggle={toggleItem}
            onDelete={deleteItem}
            onEdit={editItem}
            emptyMessage={EMPTY_MESSAGES[filter]}
          />
        )}
      </main>
    </>
  );
}
