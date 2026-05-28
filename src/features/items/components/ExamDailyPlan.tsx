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
    <div style={{
      marginTop: 6, fontSize: 11, padding: '2px 8px',
      background: '#000080', color: '#fff', display: 'inline-block',
    }}>
      오늘 목표: {todayPlan.amount}{unitLabel}
    </div>
  );
}
