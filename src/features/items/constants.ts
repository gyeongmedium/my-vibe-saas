import { ItemType } from './types';

export const TYPE_LABEL: Record<ItemType, string> = {
  assignment: '과제',
  lecture: '강의',
  exam: '시험',
};

export const TYPE_COLOR: Record<ItemType, string> = {
  assignment: '#000080',
  lecture: '#808000',
  exam: '#800000',
};

export const TYPE_OPTIONS: { label: string; value: ItemType }[] = [
  { label: '과제', value: 'assignment' },
  { label: '강의', value: 'lecture' },
  { label: '시험', value: 'exam' },
];
