export type GroupId = 'daily' | 'prayer' | 'duas' | 'travel' | 'wellbeing';
export interface Category {
  id: string;
  title: string;
  description: string;
  icon: string;
  group: GroupId;
  featured: boolean;
  count: number;
}
export interface Dhikr {
  id: string;
  categoryId: string;
  text: string;
  note: string;
  repeat: number | null;
  reference: string;
  keywords: string;
  sourceRow: number;
}
