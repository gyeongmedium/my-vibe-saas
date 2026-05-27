'use client';

import { useEffect, useRef, useState } from 'react';
import StudyCharacter from './StudyCharacter';
import StudyTimer from './StudyTimer';

interface StudyModeOverlayProps {
  onClose: () => void;
}

export default function StudyModeOverlay({ onClose }: StudyModeOverlayProps) {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isRunning]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="공부 모드"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-pink-50 gap-8"
    >
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
        <button
          ref={closeButtonRef}
          onClick={onClose}
          aria-label="공부 모드 종료"
          className="px-5 py-2 rounded-full bg-pink-400 text-white text-sm font-medium hover:bg-pink-500 transition-colors"
        >
          종료
        </button>
      </div>
    </div>
  );
}
