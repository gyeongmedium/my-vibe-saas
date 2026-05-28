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
    <div className="win95-listbox" style={{ margin: '0 12px 12px', minHeight: 120 }}>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {items.map((item, i) => (
          <li key={item.id} style={i > 0 ? { borderTop: '1px solid #e0e0e0' } : {}}>
            <ItemCard item={item} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} />
          </li>
        ))}
      </ul>
    </div>
  );
}
