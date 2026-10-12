'use client';
import { useDeferredValue, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Search, X } from 'lucide-react';
import { categories, entries, getCategory, groups, number, searchCategories, searchEntries } from '@/lib/catalog';
import type { GroupId } from '@/lib/types';
import { CategoryCard } from './category-card';

export function Explorer({ full = false, initialQuery = '', autofocus = false }: { full?: boolean; initialQuery?: string; autofocus?: boolean }) {
  const [query, setQuery] = useState(initialQuery);
  const [group, setGroup] = useState<GroupId | 'all'>('all');
  const [limit, setLimit] = useState(24);
  const deferred = useDeferredValue(query.trim());
  const allMatches = searchCategories(deferred);
  const matched = allMatches.filter(c => group === 'all' || c.group === group);
  const textMatches = deferred ? searchEntries(deferred).filter(e => group === 'all' || getCategory(e.categoryId)?.group === group) : [];
  const visible = full || deferred || group !== 'all' ? matched : matched.slice(0, 18);
  return <section className="explorer" id="library" aria-label="مكتبة الأذكار">
    <div className="section-heading"><div><span className="eyebrow">لكل وقتٍ، ذكر</span><h2>{full ? 'مكتبة الأذكار' : 'اكتشف ما يطمئن قلبك'}</h2><p>{number(entries.length)} نصًا في {number(categories.length)} تصنيفًا. اختر ما يناسب لحظتك.</p></div>{!full && <Link className="text-link desktop-only" href="/library">المكتبة كاملة <ArrowLeft size={18} /></Link>}</div>
    <div className="search-field"><Search size={21} aria-hidden="true" /><input type="search" value={query} onChange={e => { setQuery(e.target.value); setLimit(24); }} placeholder="ابحث عن ذكر، دعاء، أو مناسبة…" aria-label="ابحث في الأذكار" autoFocus={autofocus} /><kbd className="search-hint">بحث في النصوص والتصنيفات</kbd>{query && <button className="icon-button" aria-label="مسح البحث" onClick={() => setQuery('')}><X size={19} /></button>}</div>
    <div className="filter-chips" role="group" aria-label="تصفية التصنيفات"><button className={group === 'all' ? 'selected' : ''} aria-pressed={group === 'all'} onClick={() => setGroup('all')}>كل الأذكار <span>{number(categories.length)}</span></button>{groups.map(g => <button key={g.id} aria-pressed={group === g.id} className={group === g.id ? 'selected' : ''} onClick={() => { setGroup(g.id); setLimit(24); }}>{g.title}</button>)}</div>
    {deferred && <p className="search-results-label" role="status">{number(matched.length)} تصنيفًا و{number(textMatches.length)} نصًا يطابق بحثك</p>}
    {visible.length > 0 && <div className="library-grid">{visible.map(c => <CategoryCard key={c.id} category={c} />)}</div>}
    {deferred && textMatches.length > 0 && <div className="text-results"><h3>داخل الأذكار</h3>{textMatches.slice(0, limit).map(entry => <Link className="text-result" href={`/azkar/${entry.categoryId}#${entry.id}`} key={entry.id}><span className="eyebrow">{getCategory(entry.categoryId)?.title}</span><p>{entry.text.slice(0, 200)}{entry.text.length > 200 ? '…' : ''}</p><ArrowUpLeftIcon /></Link>)}{textMatches.length > limit && <button className="button button-secondary" onClick={() => setLimit(limit + 24)}>عرض المزيد من النتائج</button>}</div>}
    {!visible.length && !textMatches.length && <div className="empty-state"><Search size={32} /><h3>ما لقيناش نتائج مطابقة</h3><p>جرّب كلمة أقصر، أو اختَر كل الأذكار.</p><button className="button button-secondary" onClick={() => { setQuery(''); setGroup('all'); }}>إعادة ضبط البحث</button></div>}
    {!full && !deferred && group === 'all' && <div className="center-link"><Link href="/library" className="button button-secondary">استكشف كل التصنيفات <ArrowLeft size={18} /></Link></div>}
  </section>;
}
function ArrowUpLeftIcon() { return <ArrowLeft size={18} className="result-arrow" aria-hidden="true" />; }
