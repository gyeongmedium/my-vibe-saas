import WindowTitleBar from './WindowTitleBar';

export default function AppHeader() {
  const today = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric', month: 'long', day: 'numeric', weekday: 'short',
  });

  return (
    <div>
      <WindowTitleBar icon="S" iconBg="#ffff00" title="시험 플래너" />
      <div style={{ background: '#c0c0c0', borderBottom: '1px solid #808080', padding: '6px 12px', fontSize: 12 }}>
        {today}
      </div>
    </div>
  );
}
