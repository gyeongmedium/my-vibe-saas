import Link from 'next/link';

const PROBLEMS = [
  { emoji: '😵', text: '과제와 온라인 강의 마감을 놓친다' },
  { emoji: '📚', text: '시험 범위가 넓어 공부를 어떻게 나눠야 할지 모른다' },
  { emoji: '😴', text: '시험기간에는 집중이 잘 안 된다' },
];

const FEATURES = [
  {
    emoji: '📋',
    title: '마감기한 관리',
    desc: '과제와 강의 마감일을 한눈에 정리해요',
  },
  {
    emoji: '📅',
    title: '시험 범위 배분',
    desc: '범위를 입력하면 날짜별 공부량을 자동으로 계산해요',
  },
  {
    emoji: '🐣',
    title: '캐릭터 공부 모드',
    desc: '귀여운 친구와 함께 집중 타이머를 켜요',
  },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-pink-50 flex flex-col">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-6 pt-20 pb-16 gap-6">
        <span className="text-8xl animate-bounce">🐣</span>
        <h1 className="text-3xl font-bold text-gray-800 leading-snug">
          시험기간,<br />이제 헤매지 마세요
        </h1>
        <p className="text-gray-500 text-base max-w-xs leading-relaxed">
          과제, 온라인 강의, 시험 범위까지 — 마감을 놓치지 않게 정리하고,
          귀여운 공부 친구와 함께 집중해요.
        </p>
        <Link
          href="/app"
          className="mt-2 px-8 py-3 rounded-full bg-pink-400 text-white font-semibold text-base hover:bg-pink-500 transition-colors shadow-md"
        >
          지금 시작하기 →
        </Link>
      </section>

      {/* Problem */}
      <section className="px-6 py-10 bg-white">
        <h2 className="text-lg font-bold text-gray-700 text-center mb-6">
          이런 적 있지 않으셨나요?
        </h2>
        <ul className="flex flex-col gap-4 max-w-sm mx-auto">
          {PROBLEMS.map((p) => (
            <li key={p.text} className="flex items-start gap-3 bg-pink-50 rounded-2xl px-4 py-3">
              <span className="text-2xl">{p.emoji}</span>
              <p className="text-sm text-gray-600 leading-relaxed">{p.text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Core Features */}
      <section className="px-6 py-10">
        <h2 className="text-lg font-bold text-gray-700 text-center mb-6">
          이렇게 도와드릴게요
        </h2>
        <ul className="flex flex-col gap-4 max-w-sm mx-auto">
          {FEATURES.map((f) => (
            <li key={f.title} className="bg-white rounded-2xl px-5 py-4 shadow-sm flex items-start gap-4">
              <span className="text-3xl">{f.emoji}</span>
              <div>
                <p className="font-semibold text-gray-700 text-sm mb-0.5">{f.title}</p>
                <p className="text-xs text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <section className="flex flex-col items-center px-6 py-12 gap-4">
        <p className="text-gray-500 text-sm">지금 바로 시작해보세요</p>
        <Link
          href="/app"
          className="px-8 py-3 rounded-full bg-pink-400 text-white font-semibold text-base hover:bg-pink-500 transition-colors shadow-md"
        >
          지금 시작하기 →
        </Link>
      </section>
    </main>
  );
}
