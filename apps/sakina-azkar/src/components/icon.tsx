import { BookOpen, Sun, Moon, Sparkles, Sunrise, Stars, Heart, Compass, Flower2, type LucideProps } from 'lucide-react';
const icons = { sun: Sun, moon: Moon, sunrise: Sunrise, stars: Stars, sparkles: Sparkles, prayer: Flower2, book: BookOpen, heart: Heart, compass: Compass };
export function Icon({ name, ...props }: LucideProps & { name: string }) {
  const Component = icons[name as keyof typeof icons] ?? BookOpen;
  return <Component strokeWidth={1.6} aria-hidden="true" {...props} />;
}
