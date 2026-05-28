'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { href: '/app',          label: '홈' },
  { href: '/app/calendar', label: '달력' },
  { href: '/app/study',    label: '공부 모드' },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [time, setTime] = useState('');

  useEffect(() => {
    const fmt = () => new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 10000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#008080' }}>
      {/* 앱 윈도우 */}
      <div className="win95-window flex flex-col flex-1 m-3 mb-16">
        {children}
      </div>

      {/* 작업 표시줄 */}
      <nav
        className="fixed bottom-0 left-0 w-full flex items-center px-2 gap-2"
        style={{ background: '#c0c0c0', height: 44, borderTop: '2px solid #ffffff' }}
      >
        {/* 시작 버튼 */}
        <div className="win95-btn flex items-center gap-2 font-bold" style={{ minWidth: 90, fontSize: 13 }}>
          <span style={{ fontWeight: 900, fontSize: 15 }}>■</span>
          <span>시작</span>
        </div>

        <div style={{ width: 2, height: 30, background: '#808080', borderRight: '1px solid #fff', margin: '0 4px' }} />

        {/* 네비게이션 */}
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={`win95-btn ${isActive ? 'win95-btn-pressed' : ''}`}
                style={{ minWidth: 110, fontSize: 13 }}
              >
                {item.label}
              </div>
            </Link>
          );
        })}

        {/* 시계 */}
        <div className="ml-auto win95-sunken flex items-center mr-1 px-4" style={{ height: 30, fontSize: 13 }}>
          {time}
        </div>
      </nav>
    </div>
  );
}
