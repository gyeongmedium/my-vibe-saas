interface EmptyStateProps {
  message?: string;
}

export default function EmptyState({
  message = '아직 등록된 항목이 없어요.',
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center gap-3">
      <span className="text-6xl">🐣</span>
      <p className="text-gray-400 text-sm">{message}</p>
    </div>
  );
}
