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
    <div
      role="tablist"
      aria-label="항목 유형 필터"
      style={{ display: 'flex', gap: 4, padding: '12px 12px 0', borderBottom: '2px solid #808080' }}
    >
      {TABS.map((tab) => {
        const isActive = selected === tab.value;
        return (
          <button
            key={tab.value}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.value)}
            style={isActive ? {
              fontSize: 13, padding: '6px 20px',
              background: '#c0c0c0',
              border: '2px solid',
              borderColor: '#ffffff #808080 #c0c0c0 #ffffff',
              borderBottom: '2px solid #c0c0c0',
              position: 'relative', top: 2, fontWeight: 'bold', zIndex: 1,
            } : {
              fontSize: 13, padding: '6px 20px',
              background: '#a8a8a8',
              border: '2px solid',
              borderColor: '#d0d0d0 #606060 #808080 #d0d0d0',
              position: 'relative', top: 0,
            }}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
