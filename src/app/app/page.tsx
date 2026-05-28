'use client';

import { useState } from 'react';
import AppHeader from '@/components/layout/AppHeader';
import EmptyState from '@/components/layout/EmptyState';
import ItemForm from '@/features/items/components/ItemForm';
import FilterTabs, { FilterValue } from '@/features/items/components/FilterTabs';
import ItemList from '@/features/items/components/ItemList';
import { useItems } from '@/features/items/useItems';

export default function AppPage() {
  const { items, addItem, toggleItem, deleteItem } = useItems();
  const [filter, setFilter] = useState<FilterValue>('all');

  const filtered = filter === 'all' ? items : items.filter((i) => i.type === filter);

  return (
    <>
      <AppHeader />
      <ItemForm onAdd={addItem} />
      <FilterTabs selected={filter} onChange={setFilter} />
      <main className="flex-1">
        {filtered.length === 0 ? (
          <EmptyState message="아직 항목이 없어요. 추가해볼까요?" />
        ) : (
          <ItemList items={filtered} onToggle={toggleItem} onDelete={deleteItem} />
        )}
      </main>
    </>
  );
}
