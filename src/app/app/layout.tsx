'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { href: '/app', label: '홈', icon: '🏠' },
  { href: '/app/calendar', label: '달력', icon: '📅' },
  { href: '/app/study', label: '공부', icon: '📚' },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col">
      <div className="flex-1 pb-20">
        {children}
      </div>

      <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-pink-100 flex">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex-1 flex flex-col items-center justify-center py-3 gap-0.5 text-xs font-medium transition-colors ${
                isActive ? 'text-pink-500' : 'text-gray-400 hover:text-pink-400'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
