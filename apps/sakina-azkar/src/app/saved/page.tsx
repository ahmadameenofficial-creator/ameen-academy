import type { Metadata } from 'next';
import { SavedLibrary } from '@/components/saved-library';
export const metadata: Metadata = { title: 'المحفوظات',robots:{index:false,follow:true} };
export default function SavedPage() { return <SavedLibrary />; }
