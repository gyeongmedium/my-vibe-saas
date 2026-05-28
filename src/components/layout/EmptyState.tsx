interface EmptyStateProps {
  message?: string;
}

export default function EmptyState({ message = '아직 등록된 항목이 없어요.' }: EmptyStateProps) {
  return (
    <div className="win95-listbox" style={{ margin: '0 12px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px 24px', gap: 12 }}>
      <div style={{
        width: 48, height: 48, border: '2px solid #808080',
        background: '#ffff80', display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 22, fontWeight: 'bold', color: '#000',
      }}>?</div>
      <p style={{ fontSize: 13, color: '#808080' }}>{message}</p>
    </div>
  );
}
