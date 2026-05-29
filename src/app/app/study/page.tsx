'use client';

import { useEffect, useRef, useState } from 'react';
import StudyCharacter from '@/features/study-mode/components/StudyCharacter';
import StudyTimer from '@/features/study-mode/components/StudyTimer';
import WindowTitleBar from '@/components/layout/WindowTitleBar';

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
    <div>
      <WindowTitleBar icon="T" iconBg="#00ff00" title="공부 모드 - 타이머" />

      <div style={{ background: '#c0c0c0', padding: '40px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28 }}>
        <StudyCharacter isRunning={isRunning} />
        <StudyTimer seconds={seconds} />

        <div className="win95-sunken" style={{ background: '#fff', padding: '10px 24px', fontSize: 13 }}>
          {isRunning ? '타이머 실행 중...' : '일시정지됨'}
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <button
            onClick={() => setIsRunning((r) => !r)}
            aria-label={isRunning ? '타이머 일시정지' : '타이머 재개'}
            className="win95-btn"
            style={{ fontSize: 13, minWidth: 100 }}
          >
            {isRunning ? '일시정지' : '재개'}
          </button>
          <button
            onClick={() => { setSeconds(0); setIsRunning(false); }}
            aria-label="타이머 초기화"
            className="win95-btn"
            style={{ fontSize: 13, minWidth: 100 }}
          >
            초기화
          </button>
        </div>
      </div>
    </div>
  );
}
