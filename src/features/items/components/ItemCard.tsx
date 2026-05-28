'use client';

import { useState } from 'react';
import { StudyItem } from '../types';
import ExamDailyPlan from './ExamDailyPlan';

const TYPE_LABEL: Record<StudyItem['type'], string> = {
  assignment: '과제',
  lecture: '강의',
  exam: '시험',
};

const TYPE_COLOR: Record<StudyItem['type'], string> = {
  assignment: 'bg-blue-50 text-blue-400',
  lecture: 'bg-yellow-50 text-yellow-500',
  exam: 'bg-pink-50 text-pink-400',
};

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
    setEditTitle(item.title);
    setEditDueDate(item.dueDate);
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <div className="rounded-2xl p-4 bg-white border border-pink-200 flex flex-col gap-2">
        <label htmlFor={`edit-title-${item.id}`} className="sr-only">항목 제목</label>
        <input
          id={`edit-title-${item.id}`}
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          className="w-full px-3 py-2 rounded-xl border border-pink-100 text-sm outline-none focus:border-pink-300"
        />
        <label htmlFor={`edit-due-${item.id}`} className="sr-only">마감기한</label>
        <input
          id={`edit-due-${item.id}`}
          type="date"
          value={editDueDate}
          onChange={(e) => setEditDueDate(e.target.value)}
          className="w-full px-3 py-2 rounded-xl border border-pink-100 text-sm outline-none focus:border-pink-300 text-gray-600"
        />
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="flex-1 py-1.5 rounded-xl bg-pink-400 text-white text-sm font-medium hover:bg-pink-500 transition-colors"
          >
            저장
          </button>
          <button
            onClick={handleCancel}
            className="flex-1 py-1.5 rounded-xl bg-pink-50 text-pink-400 text-sm font-medium hover:bg-pink-100 transition-colors"
          >
            취소
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`rounded-2xl p-4 transition-opacity ${
        isCompleted ? 'opacity-40' : 'bg-pink-100/40'
      }`}
    >
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          aria-label={`${item.title} 완료 처리`}
          checked={isCompleted}
          onChange={() => onToggle(item.id)}
          className="mt-1 w-4 h-4 accent-pink-400 cursor-pointer"
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${TYPE_COLOR[item.type]}`}>
              {TYPE_LABEL[item.type]}
            </span>
            <span className="text-xs text-gray-400">{item.dueDate} 까지</span>
          </div>
          <p className={`text-sm font-medium text-gray-700 ${isCompleted ? 'line-through' : ''}`}>
            {item.title}
          </p>
          {item.type === 'exam' && !isCompleted && (
            <ExamDailyPlan dailyPlan={item.dailyPlan} unit={item.unit} />
          )}
        </div>

        <div className="flex gap-1 shrink-0">
          {!isCompleted && (
            <button
              onClick={() => setIsEditing(true)}
              aria-label="항목 수정"
              className="text-gray-300 hover:text-pink-400 transition-colors text-sm px-1"
            >
              ✎
            </button>
          )}
          {isCompleted && (
            <button
              onClick={() => onDelete(item.id)}
              aria-label="항목 삭제"
              className="text-gray-300 hover:text-red-400 transition-colors text-sm px-1"
            >
              ✕
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
