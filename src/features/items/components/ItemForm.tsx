'use client';

import { useState } from 'react';
import { ItemType, StudyItem } from '../types';

const TYPE_OPTIONS: { label: string; value: ItemType }[] = [
  { label: '과제', value: 'assignment' },
  { label: '강의', value: 'lecture' },
  { label: '시험', value: 'exam' },
];

interface ItemFormProps {
  onAdd: (item: StudyItem) => void;
}

export default function ItemForm({ onAdd }: ItemFormProps) {
  const [type, setType] = useState<ItemType>('assignment');
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [scope, setScope] = useState('');
  const [unit, setUnit] = useState<'chapter' | 'page'>('chapter');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) { setError('제목을 입력해주세요.'); return; }
    if (!dueDate) { setError('마감기한을 선택해주세요.'); return; }
    if (type === 'exam' && (!scope || Number(scope) <= 0)) {
      setError('시험 범위를 1 이상 입력해주세요.');
      return;
    }
    setError('');

    const base = {
      id: crypto.randomUUID(),
      type,
      title: title.trim(),
      dueDate,
      status: 'pending' as const,
      createdAt: new Date().toISOString(),
    };

    const newItem: StudyItem =
      type === 'exam'
        ? { ...base, type: 'exam', scope: Number(scope), unit, dailyPlan: [] }
        : type === 'lecture'
        ? { ...base, type: 'lecture' }
        : { ...base, type: 'assignment' };

    onAdd(newItem);
    setTitle('');
    setDueDate('');
    setScope('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-4 my-4 p-4 rounded-2xl border border-pink-100 bg-white flex flex-col gap-3"
    >
      {/* 유형 선택 */}
      <div className="flex gap-2">
        {TYPE_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            aria-pressed={type === opt.value}
            onClick={() => setType(opt.value)}
            className={`flex-1 py-1.5 rounded-full text-sm font-medium transition-colors ${
              type === opt.value
                ? 'bg-pink-400 text-white'
                : 'bg-pink-50 text-pink-400 hover:bg-pink-100'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* 제목 */}
      <div>
        <label htmlFor="item-title" className="sr-only">항목 제목</label>
        <input
          id="item-title"
          type="text"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 rounded-xl border border-pink-100 text-sm outline-none focus:border-pink-300"
        />
      </div>

      {/* 마감기한 */}
      <div>
        <label htmlFor="item-due" className="sr-only">마감기한</label>
        <input
          id="item-due"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full px-3 py-2 rounded-xl border border-pink-100 text-sm outline-none focus:border-pink-300 text-gray-600"
        />
      </div>

      {/* 시험 범위 (시험 유형일 때만) */}
      {type === 'exam' && (
        <div className="flex gap-2">
          <div className="flex-1">
            <label htmlFor="item-scope" className="sr-only">시험 범위</label>
            <input
              id="item-scope"
              type="number"
              min={1}
              placeholder="범위 총량"
              value={scope}
              onChange={(e) => setScope(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-pink-100 text-sm outline-none focus:border-pink-300"
            />
          </div>
          <select
            aria-label="범위 단위"
            value={unit}
            onChange={(e) => setUnit(e.target.value as 'chapter' | 'page')}
            className="px-3 py-2 rounded-xl border border-pink-100 text-sm outline-none focus:border-pink-300 text-gray-600"
          >
            <option value="chapter">챕터</option>
            <option value="page">페이지</option>
          </select>
        </div>
      )}

      {error && <p role="alert" className="text-xs text-red-400">{error}</p>}

      <button
        type="submit"
        className="w-full py-2 rounded-xl bg-pink-400 text-white text-sm font-medium hover:bg-pink-500 transition-colors"
      >
        추가하기
      </button>
    </form>
  );
}
