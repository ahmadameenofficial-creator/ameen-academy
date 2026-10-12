export type GroupId = 'daily' | 'prayer' | 'duas' | 'travel' | 'wellbeing';
export type PrayerId = 'fajr' | 'maghrib' | 'dhuhr' | 'asr' | 'isha';
export interface Category {
  id: string;
  title: string;
  description: string;
  icon: string;
  group: GroupId;
  featured: boolean;
  count: number;
  children?: string[];
  prayers?: PrayerId[];
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
  title?: string;
  counterKind: 'fixed' | 'free' | 'instruction' | 'reading';
  referenceUrl?: string;
  appliesTo?: PrayerId[];
  curated?: boolean;
}
