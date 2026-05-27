'use client';

import { ItemType } from '../types';

export type FilterValue = ItemType | 'all';

const TABS: { label: string; value: FilterValue }[] = [
  { label: '전체', value: 'all' },
  { label: '과제', value: 'assignment' },
  { label: '강의', value: 'lecture' },
  { label: '시험', value: 'exam' },
];

interface FilterTabsProps {
  selected: FilterValue;
  onChange: (value: FilterValue) => void;
}

export default function FilterTabs({ selected, onChange }: FilterTabsProps) {
  return (
    <div role="tablist" aria-label="항목 유형 필터" className="flex gap-2 px-4 py-3">
      {TABS.map((tab) => (
        <button
          key={tab.value}
          role="tab"
          aria-selected={selected === tab.value}
          onClick={() => onChange(tab.value)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
            selected === tab.value
              ? 'bg-pink-400 text-white'
              : 'bg-pink-50 text-pink-400 hover:bg-pink-100'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
