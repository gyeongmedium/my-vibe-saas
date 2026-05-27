import { StudyItem } from '../types';
import ExamDailyPlan from './ExamDailyPlan';

const TYPE_LABEL: Record<StudyItem['type'], string> = {
  assignment: '과제',
  lecture: '강의',
  exam: '시험',
};

const TYPE_COLOR: Record<StudyItem['type'], string> = {
  assignment: 'bg-blue-50 text-blue-400',
  lecture: 'bg-yellow-50 text-yellow-500',
  exam: 'bg-pink-50 text-pink-400',
};

interface ItemCardProps {
  item: StudyItem;
  onToggle: (id: string) => void;
}

export default function ItemCard({ item, onToggle }: ItemCardProps) {
  const isCompleted = item.status === 'completed';

  return (
    <div
      className={`rounded-2xl p-4 border transition-opacity ${
        isCompleted ? 'opacity-50 border-gray-100 bg-gray-50' : 'border-pink-100 bg-white'
      }`}
    >
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          aria-label={`${item.title} 완료 처리`}
          checked={isCompleted}
          onChange={() => onToggle(item.id)}
          className="mt-1 w-4 h-4 accent-pink-400 cursor-pointer"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${TYPE_COLOR[item.type]}`}>
              {TYPE_LABEL[item.type]}
            </span>
            <span className="text-xs text-gray-400">{item.dueDate} 까지</span>
          </div>
          <p className={`text-sm font-medium text-gray-700 ${isCompleted ? 'line-through' : ''}`}>
            {item.title}
          </p>
          {item.type === 'exam' && !isCompleted && (
            <ExamDailyPlan dailyPlan={item.dailyPlan} unit={item.unit} />
          )}
        </div>
      </div>
    </div>
  );
}
