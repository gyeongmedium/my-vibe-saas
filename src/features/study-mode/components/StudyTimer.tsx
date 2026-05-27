interface StudyTimerProps {
  seconds: number;
}

export default function StudyTimer({ seconds }: StudyTimerProps) {
  const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
  const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');

  return (
    <div className="text-5xl font-bold text-pink-400 tracking-widest font-mono">
      {h}:{m}:{s}
    </div>
  );
}
