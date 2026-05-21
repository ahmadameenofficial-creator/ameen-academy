export interface CourseSummary {
  id: string;
  slug: string;
  title: string;
  shortDescription: string | null;
  thumbnail: string | null;
  category: string;
  level: string;
  price: number;
  comparePrice: number | null;
  duration: number;
  isFeatured: boolean;
  instructor: { name: string; image: string | null };
  _count: { enrollments: number; lessons: number; ratings: number };
  avgRating: number;
}

export interface LessonSummary {
  id: string;
  title: string;
  duration: number;
  isFree: boolean;
  order: number;
}

export interface ModuleWithLessons {
  id: string;
  title: string;
  description: string | null;
  order: number;
  lessons: LessonSummary[];
}
