import { StudyItem } from './types';

export const mockItems: StudyItem[] = [
  {
    id: 'mock-1',
    type: 'assignment',
    title: '경영학원론 레포트',
    dueDate: '2026-06-03',
    status: 'pending',
    createdAt: '2026-05-27T09:00:00.000Z',
  },
  {
    id: 'mock-2',
    type: 'lecture',
    title: '데이터구조 5~7강',
    dueDate: '2026-06-01',
    status: 'pending',
    createdAt: '2026-05-27T09:01:00.000Z',
  },
  {
    id: 'mock-3',
    type: 'exam',
    title: '운영체제 중간고사',
    dueDate: '2026-06-10',
    status: 'pending',
    createdAt: '2026-05-27T09:02:00.000Z',
    scope: 8,
    unit: 'chapter',
    dailyPlan: [
      { date: '2026-05-27', amount: 1, completed: false },
      { date: '2026-05-28', amount: 1, completed: false },
      { date: '2026-05-29', amount: 1, completed: false },
      { date: '2026-05-30', amount: 1, completed: false },
      { date: '2026-05-31', amount: 1, completed: false },
      { date: '2026-06-01', amount: 1, completed: false },
      { date: '2026-06-02', amount: 1, completed: false },
      { date: '2026-06-03', amount: 1, completed: false },
    ],
  },
  {
    id: 'mock-4',
    type: 'assignment',
    title: '알고리즘 과제 3',
    dueDate: '2026-05-30',
    status: 'completed',
    createdAt: '2026-05-26T10:00:00.000Z',
  },
];
