interface StudyTimerProps {
  seconds: number;
}

export default function StudyTimer({ seconds }: StudyTimerProps) {
  const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
  const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');

  return (
    <div className="win95-sunken" style={{
      background: '#000', color: '#00ff00',
      fontFamily: 'monospace', fontSize: 36,
      fontWeight: 'bold', letterSpacing: 6,
      padding: '12px 28px',
    }}>
      {h}:{m}:{s}
    </div>
  );
}
