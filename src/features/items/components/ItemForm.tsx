'use client';

import { useState } from 'react';
import { ItemType, StudyItem } from '../types';
import { distributeScope } from '@/lib/examSchedule';

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
      id: crypto.randomUUID(), type, title: title.trim(),
      dueDate, status: 'pending' as const, createdAt: new Date().toISOString(),
    };
    const newItem: StudyItem =
      type === 'exam'
        ? { ...base, type: 'exam', scope: Number(scope), unit, dailyPlan: distributeScope(Number(scope), unit, dueDate) }
        : type === 'lecture' ? { ...base, type: 'lecture' } : { ...base, type: 'assignment' };
    onAdd(newItem);
    setTitle(''); setDueDate(''); setScope('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ background: '#c0c0c0', padding: '20px 24px', borderBottom: '1px solid #808080' }}>
      {/* 유형 선택 */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
        {TYPE_OPTIONS.map((opt) => (
          <button
            key={opt.value} type="button"
            aria-pressed={type === opt.value}
            onClick={() => setType(opt.value)}
            className={`win95-btn ${type === opt.value ? 'win95-btn-pressed' : ''}`}
            style={{ flex: 1, fontSize: 13 }}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* 제목 */}
      <div style={{ marginBottom: 14 }}>
        <label htmlFor="item-title" style={{ display: 'block', fontSize: 13, marginBottom: 5 }}>항목 제목:</label>
        <input id="item-title" type="text" placeholder="제목을 입력하세요" value={title}
          onChange={(e) => setTitle(e.target.value)} className="win95-input" />
      </div>

      {/* 마감기한 */}
      <div style={{ marginBottom: 14 }}>
        <label htmlFor="item-due" style={{ display: 'block', fontSize: 13, marginBottom: 5 }}>마감기한:</label>
        <input id="item-due" type="date" value={dueDate}
          onChange={(e) => setDueDate(e.target.value)} className="win95-input" />
      </div>

      {/* 시험 범위 */}
      {type === 'exam' && (
        <div style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
          <div style={{ flex: 1 }}>
            <label htmlFor="item-scope" style={{ display: 'block', fontSize: 13, marginBottom: 5 }}>시험 범위:</label>
            <input id="item-scope" type="number" min={1} placeholder="총 범위" value={scope}
              onChange={(e) => setScope(e.target.value)} className="win95-input" />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 13, marginBottom: 5 }}>단위:</label>
            <select aria-label="범위 단위" value={unit}
              onChange={(e) => setUnit(e.target.value as 'chapter' | 'page')}
              className="win95-input" style={{ width: 90 }}>
              <option value="chapter">챕터</option>
              <option value="page">페이지</option>
            </select>
          </div>
        </div>
      )}

      {error && (
        <p role="alert" style={{ fontSize: 12, color: '#cc0000', marginBottom: 12 }}>
          {error}
        </p>
      )}

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
        <button type="submit" className="win95-btn" style={{ fontSize: 13, fontWeight: 'bold' }}>
          추가하기
        </button>
      </div>
    </form>
  );
}
