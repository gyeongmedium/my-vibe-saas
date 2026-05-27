interface StudyCharacterProps {
  isRunning: boolean;
}

export default function StudyCharacter({ isRunning }: StudyCharacterProps) {
  return (
    <div className={`text-9xl select-none transition-transform ${isRunning ? 'animate-bounce' : ''}`}>
      {isRunning ? '🐣' : '🥚'}
    </div>
  );
}
