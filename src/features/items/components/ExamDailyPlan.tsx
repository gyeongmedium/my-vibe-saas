import { DailyStudyPlan } from '../types';

interface ExamDailyPlanProps {
  dailyPlan: DailyStudyPlan[];
  unit: 'chapter' | 'page';
}

export default function ExamDailyPlan({ dailyPlan, unit }: ExamDailyPlanProps) {
  const today = new Date().toISOString().slice(0, 10);
  const todayPlan = dailyPlan.find((p) => p.date === today);

  if (!todayPlan) return null;

  const unitLabel = unit === 'chapter' ? '챕터' : '페이지';

  return (
    <div className="mt-2 text-xs text-pink-500 bg-pink-50 rounded-lg px-3 py-1.5">
      📚 오늘 목표: {todayPlan.amount}{unitLabel}
    </div>
  );
}
