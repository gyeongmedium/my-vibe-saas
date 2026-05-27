'use client';

interface AppHeaderProps {
  onStudyModeOpen: () => void;
}

export default function AppHeader({ onStudyModeOpen }: AppHeaderProps) {
  const today = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  });

  return (
    <header className="flex items-center justify-between px-4 py-4 border-b border-pink-100 bg-white">
      <div>
        <h1 className="text-xl font-bold text-pink-500">🐣 시험 플래너</h1>
        <p className="text-xs text-gray-400 mt-0.5">{today}</p>
      </div>
      <button
        onClick={onStudyModeOpen}
        aria-label="공부 모드 시작"
        className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-pink-50 text-pink-500 text-sm font-medium hover:bg-pink-100 transition-colors"
      >
        🐥 공부 모드
      </button>
    </header>
  );
}
