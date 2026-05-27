export type ItemType = 'assignment' | 'lecture' | 'exam';
export type ItemStatus = 'pending' | 'completed';

export interface BaseItem {
  id: string;
  type: ItemType;
  title: string;
  dueDate: string; // YYYY-MM-DD
  status: ItemStatus;
  createdAt: string;
}

export interface AssignmentItem extends BaseItem {
  type: 'assignment';
}

export interface LectureItem extends BaseItem {
  type: 'lecture';
}

export interface DailyStudyPlan {
  date: string; // YYYY-MM-DD
  amount: number;
  completed: boolean;
}

export interface ExamItem extends BaseItem {
  type: 'exam';
  scope: number;
  unit: 'chapter' | 'page';
  dailyPlan: DailyStudyPlan[];
}

export type StudyItem = AssignmentItem | LectureItem | ExamItem;
