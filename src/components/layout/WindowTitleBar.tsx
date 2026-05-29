interface WindowTitleBarProps {
  /** 타이틀바 왼쪽 아이콘 문자 (예: 'C', 'T', 'S') */
  icon: string;
  /** 아이콘 배경색 (기본값: '#c0c0c0') */
  iconBg?: string;
  /** 윈도우 제목 */
  title: string;
}

export default function WindowTitleBar({ icon, iconBg = '#c0c0c0', title }: WindowTitleBarProps) {
  return (
    <div className="win95-title">
      <div className="flex items-center gap-2">
        <span style={{
          display: 'inline-block', width: 16, height: 16,
          background: iconBg, border: '1px solid #000',
          fontSize: 10, textAlign: 'center', lineHeight: '16px', fontWeight: 'bold',
        }}>
          {icon}
        </span>
        <span>{title}</span>
      </div>
      <div className="flex gap-1">
        <button className="win95-title-btn">?</button>
        <button className="win95-title-btn">X</button>
      </div>
    </div>
  );
}
