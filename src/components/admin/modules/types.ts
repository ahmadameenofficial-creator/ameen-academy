export interface Lesson {
  id: string;
  title: string;
  duration: number;
  isFree: boolean;
  order: number;
  videoId: string | null;
}

export interface Module {
  id: string;
  title: string;
  order: number;
  lessons: Lesson[];
}
