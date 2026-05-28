interface StudyCharacterProps {
  isRunning: boolean;
}

export default function StudyCharacter({ isRunning }: StudyCharacterProps) {
  return (
    <div style={{ textAlign: 'center', userSelect: 'none' }}>
      <div style={{
        width: 80, height: 80,
        background: '#ffff80',
        border: '3px solid #000080',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        fontFamily: 'monospace', fontSize: 20,
        animation: isRunning ? 'pulse 1s infinite' : 'none',
        margin: '0 auto',
      }}>
        <span>{isRunning ? '(^o^)' : '(-_-)'}</span>
      </div>
      <div style={{ fontSize: 12, marginTop: 6, color: '#000080', fontWeight: 'bold' }}>
        {isRunning ? '[ 공부 중... ]' : '[ 일시정지 ]'}
      </div>
    </div>
  );
}
