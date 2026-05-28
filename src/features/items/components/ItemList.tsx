import { StudyItem } from '../types';
import ItemCard from './ItemCard';
import EmptyState from '@/components/layout/EmptyState';

interface ItemListProps {
  items: StudyItem[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, updates: { title: string; dueDate: string }) => void;
  emptyMessage?: string;
}

export default function ItemList({ items, onToggle, onDelete, onEdit, emptyMessage }: ItemListProps) {
  if (items.length === 0) {
    return <EmptyState message={emptyMessage ?? '조건에 맞는 항목이 없어요.'} />;
  }

  return (
    <ul className="flex flex-col gap-3 px-4 pb-6">
      {items.map((item) => (
        <li key={item.id}>
          <ItemCard item={item} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} />
        </li>
      ))}
    </ul>
  );
}
