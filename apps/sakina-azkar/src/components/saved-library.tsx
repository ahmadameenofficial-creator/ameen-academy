'use client';
import Link from 'next/link';
import { Bookmark, ArrowLeft } from 'lucide-react';
import { getEntry, getCategory, number } from '@/lib/catalog';
import { useReading } from '@/lib/reading-store';
import { DhikrCard } from './dhikr-card';

export function SavedLibrary() {
  const { state, ready } = useReading();
  const saved = state.saved.map(getEntry).filter(entry => entry !== undefined);
  return <div className="container saved-page"><span className="eyebrow">قريبٌ من قلبك</span><h1>محفوظاتك</h1><p className="page-description">أذكار تحب الرجوع إليها، في مكان واحد.</p>{!ready ? <p role="status">جارٍ استعادة محفوظاتك…</p> : saved.length ? <><p className="saved-count">{number(saved.length)} نصًا محفوظًا على هذا الجهاز</p><div className="saved-list">{saved.map((entry, index) => <div key={entry.id}><Link className="saved-category" href={`/azkar/${entry.categoryId}`}>{getCategory(entry.categoryId)?.title} <ArrowLeft size={15} /></Link><DhikrCard entry={entry} position={index + 1} compact scope={state.savedScopes[entry.id] ?? getCategory(entry.categoryId)?.prayers?.[0]} /></div>)}</div></> : <div className="empty-state saved-empty"><span className="empty-icon"><Bookmark size={35} /></span><h2>خلّي أذكارك المفضلة قريبة</h2><p>اضغط علامة الحفظ بجانب أي ذكر، وهتلاقيه هنا.</p><Link href="/library" className="button button-primary">استكشف الأذكار <ArrowLeft size={17} /></Link></div>}</div>;
}
