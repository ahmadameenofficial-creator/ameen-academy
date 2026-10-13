import type { Metadata } from 'next';
import { PersonalProgress } from '@/components/personal-progress';
export const metadata: Metadata = { title: 'متابعتك الأسبوعية' };
export default function ProgressPage() {
  return <PersonalProgress />;
}
