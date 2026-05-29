'use client';

import { useState } from 'react';
import { StudyItem } from '../types';
import { TYPE_LABEL } from '../constants';
import ExamDailyPlan from './ExamDailyPlan';

interface ItemCardProps {
  item: StudyItem;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, updates: { title: string; dueDate: string }) => void;
}

export default function ItemCard({ item, onToggle, onDelete, onEdit }: ItemCardProps) {
  const isCompleted = item.status === 'completed';
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(item.title);
  const [editDueDate, setEditDueDate] = useState(item.dueDate);

  function handleSave() {
    if (!editTitle.trim() || !editDueDate) return;
    onEdit(item.id, { title: editTitle.trim(), dueDate: editDueDate });
    setIsEditing(false);
  }
  function handleCancel() {
    setEditTitle(item.title); setEditDueDate(item.dueDate); setIsEditing(false);
  }

  if (isEditing) {
    return (
      <div className="win95-window" style={{ padding: '16px 20px', margin: '4px 8px' }}>
        <label htmlFor={`edit-title-${item.id}`} className="win95-form-label">제목:</label>
        <input id={`edit-title-${item.id}`} type="text" value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)} className="win95-input" style={{ marginBottom: 12 }} />
        <label htmlFor={`edit-due-${item.id}`} className="win95-form-label">마감기한:</label>
        <input id={`edit-due-${item.id}`} type="date" value={editDueDate}
          onChange={(e) => setEditDueDate(e.target.value)} className="win95-input" style={{ marginBottom: 14 }} />
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <button onClick={handleSave} className="win95-btn" style={{ fontSize: 13 }}>저장</button>
          <button onClick={handleCancel} className="win95-btn" style={{ fontSize: 13 }}>취소</button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="win95-listbox-item"
      style={{ padding: '10px 16px', display: 'flex', alignItems: 'flex-start', gap: 12, opacity: isCompleted ? 0.5 : 1, background: '#fff' }}
    >
      <input
        type="checkbox"
        aria-label={`${item.title} 완료 처리`}
        checked={isCompleted}
        onChange={() => onToggle(item.id)}
        style={{ width: 14, height: 14, marginTop: 3, cursor: 'pointer', flexShrink: 0 }}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <span style={{
            fontSize: 11, padding: '1px 6px',
            background: '#000080', color: '#fff',
            fontWeight: 'bold',
          }}>
            {TYPE_LABEL[item.type]}
          </span>
          <span style={{ fontSize: 12, color: '#808080' }}>{item.dueDate} 까지</span>
        </div>
        <p style={{ fontSize: 13, color: '#000', textDecoration: isCompleted ? 'line-through' : 'none' }}>
          {item.title}
        </p>
        {item.type === 'exam' && !isCompleted && (
          <ExamDailyPlan dailyPlan={item.dailyPlan} unit={item.unit} />
        )}
      </div>
      <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
        {!isCompleted && (
          <button onClick={() => setIsEditing(true)} aria-label="항목 수정"
            className="win95-btn" style={{ minWidth: 'auto', padding: '3px 12px', fontSize: 12 }}>
            수정
          </button>
        )}
        {isCompleted && (
          <button onClick={() => onDelete(item.id)} aria-label="항목 삭제"
            className="win95-btn" style={{ minWidth: 'auto', padding: '3px 12px', fontSize: 12 }}>
            삭제
          </button>
        )}
      </div>
    </div>
  );
}
