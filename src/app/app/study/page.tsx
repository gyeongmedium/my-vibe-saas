'use client';

import { useEffect, useRef, useState } from 'react';
import StudyCharacter from '@/features/study-mode/components/StudyCharacter';
import StudyTimer from '@/features/study-mode/components/StudyTimer';

export default function StudyPage() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isRunning]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] gap-8 px-6">
      <h2 className="text-lg font-bold text-pink-400">공부 중이에요 🌸</h2>
      <StudyCharacter isRunning={isRunning} />
      <StudyTimer seconds={seconds} />

      <div className="flex gap-3">
        <button
          onClick={() => setIsRunning((r) => !r)}
          aria-label={isRunning ? '타이머 일시정지' : '타이머 재개'}
          className="px-5 py-2 rounded-full bg-white border border-pink-200 text-pink-400 text-sm font-medium hover:bg-pink-100 transition-colors"
        >
          {isRunning ? '일시정지' : '재개'}
        </button>
        <button
          onClick={() => { setSeconds(0); setIsRunning(false); }}
          aria-label="타이머 초기화"
          className="px-5 py-2 rounded-full bg-white border border-pink-200 text-pink-400 text-sm font-medium hover:bg-pink-100 transition-colors"
        >
          초기화
        </button>
      </div>
    </div>
  );
}
