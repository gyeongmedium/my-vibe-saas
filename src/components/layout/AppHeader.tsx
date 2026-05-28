export default function AppHeader() {
  const today = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric', month: 'long', day: 'numeric', weekday: 'short',
  });

  return (
    <div>
      <div className="win95-title">
        <div className="flex items-center gap-2">
          <span style={{
            display: 'inline-block', width: 16, height: 16,
            background: '#ffff00', border: '1px solid #000', fontSize: 10,
            textAlign: 'center', lineHeight: '16px', fontWeight: 'bold',
          }}>S</span>
          <span>시험 플래너</span>
        </div>
        <div className="flex gap-1">
          <button className="win95-title-btn">?</button>
          <button className="win95-title-btn">X</button>
        </div>
      </div>
      <div style={{ background: '#c0c0c0', borderBottom: '1px solid #808080', padding: '6px 12px', fontSize: 12 }}>
        {today}
      </div>
    </div>
  );
}
