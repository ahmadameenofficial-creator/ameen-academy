import type { Metadata } from 'next';
import { SavedLibrary } from '@/components/saved-library';
export const metadata: Metadata = { title: 'المحفوظات' };
export default function SavedPage() { return <SavedLibrary />; }
