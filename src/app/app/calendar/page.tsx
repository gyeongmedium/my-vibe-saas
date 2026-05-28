'use client';

import { useEffect, useState } from 'react';
import { useItems } from '@/features/items/useItems';
import { StudyItem } from '@/features/items/types';

const TYPE_COLOR: Record<StudyItem['type'], string> = {
  assignment: '#000080',
  lecture: '#808000',
  exam: '#800000',
};
const TYPE_LABEL: Record<StudyItem['type'], string> = {
  assignment: '과제', lecture: '강의', exam: '시험',
};
const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

export default function CalendarPage() {
  const { items } = useItems();
  const [current, setCurrent] = useState(new Date());
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const year = current.getFullYear();
  const month = current.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date().toISOString().slice(0, 10);

  const itemsByDate: Record<string, StudyItem[]> = {};
  items.forEach((item) => {
    if (!itemsByDate[item.dueDate]) itemsByDate[item.dueDate] = [];
    itemsByDate[item.dueDate].push(item);
  });

  const cells = Array.from({ length: firstDay + daysInMonth }, (_, i) =>
    i < firstDay ? null : i - firstDay + 1
  );

  if (!mounted) return (
    <div>
      <div className="win95-title">
        <span>달력</span>
      </div>
      <div style={{ background: '#c0c0c0', padding: '28px 32px', textAlign: 'center', fontSize: 13 }}>불러오는 중...</div>
    </div>
  );

  return (
    <div>
      {/* 타이틀바 */}
      <div className="win95-title">
        <div className="flex items-center gap-2">
          <span style={{ display: 'inline-block', width: 16, height: 16, background: '#ffffff', border: '1px solid #000', fontSize: 10, textAlign: 'center', lineHeight: '16px' }}>C</span>
          <span>달력</span>
        </div>
        <div className="flex gap-1">
          <button className="win95-title-btn">?</button>
          <button className="win95-title-btn">X</button>
        </div>
      </div>

      <div style={{ background: '#c0c0c0', padding: '28px 32px' }}>
        {/* 월 네비게이션 */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <button onClick={() => setCurrent(new Date(year, month - 1, 1))} aria-label="이전 달"
            className="win95-btn" style={{ minWidth: 60, fontSize: 14 }}>
            &lt;
          </button>
          <span style={{ fontSize: 16, fontWeight: 'bold' }}>{year}년 {month + 1}월</span>
          <button onClick={() => setCurrent(new Date(year, month + 1, 1))} aria-label="다음 달"
            className="win95-btn" style={{ minWidth: 60, fontSize: 14 }}>
            &gt;
          </button>
        </div>

        {/* 달력 본체 */}
        <div className="win95-sunken" style={{ background: '#fff' }}>
          {/* 요일 헤더 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', background: '#c0c0c0', borderBottom: '1px solid #808080' }}>
            {WEEKDAYS.map((d, i) => (
              <div key={d} style={{ textAlign: 'center', fontSize: 13, fontWeight: 'bold', padding: '12px 0', color: i === 0 ? '#cc0000' : i === 6 ? '#0000cc' : '#000' }}>
                {d}
              </div>
            ))}
          </div>

          {/* 날짜 그리드 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
            {cells.map((day, idx) => {
              if (!day) return <div key={`e-${idx}`} style={{ borderRight: '1px solid #e0e0e0', borderBottom: '1px solid #e0e0e0' }} />;
              const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              const dayItems = itemsByDate[dateStr] || [];
              const isToday = dateStr === today;
              const dow = (firstDay + day - 1) % 7;

              return (
                <div key={dateStr} style={{
                  minHeight: 88, padding: '10px 8px',
                  borderRight: '1px solid #e0e0e0', borderBottom: '1px solid #e0e0e0',
                  background: isToday ? '#000080' : '#fff',
                }}>
                  <div style={{ textAlign: 'right', fontSize: 14, fontWeight: 'bold', marginBottom: 6,
                    color: isToday ? '#fff' : dow === 0 ? '#cc0000' : dow === 6 ? '#0000cc' : '#000' }}>
                    {day}
                  </div>
                  {dayItems.slice(0, 2).map((item) => (
                    <div key={item.id} className="group relative cursor-default" style={{ marginBottom: 3, opacity: item.status === 'completed' ? 0.5 : 1 }}>
                      <div style={{ background: TYPE_COLOR[item.type], color: '#fff', fontSize: 11, padding: '2px 5px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                        {TYPE_LABEL[item.type]}
                      </div>
                      <div className="hidden group-hover:block pointer-events-none absolute bottom-full left-0 z-50"
                        style={{ background: '#ffffcc', border: '1px solid #000', fontSize: 11, padding: '3px 8px', whiteSpace: 'nowrap' }}>
                        {item.title}
                      </div>
                    </div>
                  ))}
                  {dayItems.length > 2 && <div style={{ fontSize: 10, color: '#808080' }}>+{dayItems.length - 2}</div>}
                </div>
              );
            })}
          </div>
        </div>

        {/* 범례 */}
        <div style={{ display: 'flex', gap: 24, marginTop: 20 }}>
          {(Object.entries(TYPE_COLOR) as [StudyItem['type'], string][]).map(([type, color]) => (
            <div key={type} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
              <div style={{ width: 14, height: 14, background: color }} />
              <span>{TYPE_LABEL[type]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
