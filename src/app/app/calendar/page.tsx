'use client';

import { useState } from 'react';
import { useItems } from '@/features/items/useItems';
import { StudyItem } from '@/features/items/types';

const TYPE_COLOR: Record<StudyItem['type'], string> = {
  assignment: 'bg-blue-400',
  lecture: 'bg-yellow-400',
  exam: 'bg-pink-400',
};

const TYPE_LABEL: Record<StudyItem['type'], string> = {
  assignment: '과제',
  lecture: '강의',
  exam: '시험',
};

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

export default function CalendarPage() {
  const { items } = useItems();
  const [current, setCurrent] = useState(new Date());

  const year = current.getFullYear();
  const month = current.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const today = new Date().toISOString().slice(0, 10);

  // 날짜별 항목 매핑
  const itemsByDate: Record<string, StudyItem[]> = {};
  items.forEach((item) => {
    if (!itemsByDate[item.dueDate]) itemsByDate[item.dueDate] = [];
    itemsByDate[item.dueDate].push(item);
  });

  const prevMonth = () => setCurrent(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrent(new Date(year, month + 1, 1));

  const cells = Array.from({ length: firstDay + daysInMonth }, (_, i) =>
    i < firstDay ? null : i - firstDay + 1
  );

  return (
    <div className="flex flex-col">
      {/* 헤더 */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-pink-100">
        <h1 className="text-xl font-bold text-pink-500">📅 달력</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={prevMonth}
            aria-label="이전 달"
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-pink-100 text-pink-400 transition-colors"
          >
            ‹
          </button>
          <span className="text-sm font-semibold text-gray-600">
            {year}년 {month + 1}월
          </span>
          <button
            onClick={nextMonth}
            aria-label="다음 달"
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-pink-100 text-pink-400 transition-colors"
          >
            ›
          </button>
        </div>
      </div>

      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 px-2 pt-3">
        {WEEKDAYS.map((d, i) => (
          <div
            key={d}
            className={`text-center text-xs font-medium pb-2 ${
              i === 0 ? 'text-red-400' : i === 6 ? 'text-blue-400' : 'text-gray-400'
            }`}
          >
            {d}
          </div>
        ))}
      </div>

      {/* 날짜 그리드 */}
      <div className="grid grid-cols-7 px-2 gap-y-1">
        {cells.map((day, idx) => {
          if (!day) return <div key={`empty-${idx}`} />;

          const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const dayItems = itemsByDate[dateStr] || [];
          const isToday = dateStr === today;
          const dayOfWeek = (firstDay + day - 1) % 7;

          return (
            <div key={dateStr} className="flex flex-col items-center py-1 min-h-[60px]">
              {/* 날짜 숫자 */}
              <span
                className={`w-7 h-7 flex items-center justify-center rounded-full text-sm font-medium mb-1 ${
                  isToday
                    ? 'bg-pink-400 text-white'
                    : dayOfWeek === 0
                    ? 'text-red-400'
                    : dayOfWeek === 6
                    ? 'text-blue-400'
                    : 'text-gray-600'
                }`}
              >
                {day}
              </span>

              {/* 항목 배지 */}
              <div className="flex flex-col gap-0.5 w-full px-0.5">
                {dayItems.slice(0, 2).map((item) => (
                  <div
                    key={item.id}
                    className={`text-white text-[9px] px-1 py-0.5 rounded truncate ${TYPE_COLOR[item.type]} ${
                      item.status === 'completed' ? 'opacity-40' : ''
                    }`}
                    title={item.title}
                  >
                    {TYPE_LABEL[item.type]}
                  </div>
                ))}
                {dayItems.length > 2 && (
                  <div className="text-[9px] text-gray-400 text-center">+{dayItems.length - 2}</div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 범례 */}
      <div className="flex gap-3 justify-center px-4 py-4 mt-2">
        {(Object.entries(TYPE_COLOR) as [StudyItem['type'], string][]).map(([type, color]) => (
          <div key={type} className="flex items-center gap-1">
            <div className={`w-2 h-2 rounded-full ${color}`} />
            <span className="text-xs text-gray-400">{TYPE_LABEL[type]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
