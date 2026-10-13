import type { Metadata } from 'next';
import { PersonalProgress } from '@/components/personal-progress';
export const metadata: Metadata = { title: 'متابعتك الأسبوعية',robots:{index:false,follow:true} };
export default function ProgressPage() {
  return <PersonalProgress />;
}
