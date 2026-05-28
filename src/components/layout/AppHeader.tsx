export default function AppHeader() {
  const today = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  });

  return (
    <header className="flex items-center justify-between px-4 py-4 border-b border-pink-100">
      <div>
        <h1 className="text-xl font-bold text-pink-500">🐣 시험 플래너</h1>
        <p className="text-xs text-gray-400 mt-0.5">{today}</p>
      </div>
    </header>
  );
}
