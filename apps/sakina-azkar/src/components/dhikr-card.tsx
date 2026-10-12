'use client';
import { useState } from 'react';
import { Bookmark, Check, ChevronDown, Copy, Minus, RotateCcw, Share2, Plus } from 'lucide-react';
import type { Dhikr } from '@/lib/types';
import { number, withoutDiacritics } from '@/lib/text';
import { useReading } from '@/lib/reading-store';

export function DhikrCard({ entry, position, compact = false }: { entry: Dhikr; position: number; compact?: boolean }) {
  const { state, dispatch, ready } = useReading();
  const [message, setMessage] = useState('');
  const count = state.counts[entry.id] ?? 0;
  const completed = entry.repeat !== null && count >= entry.repeat;
  const saved = state.saved.includes(entry.id);
  const progress = entry.repeat ? Math.min(100, count / entry.repeat * 100) : 0;
  const copyText = `${entry.text}${entry.reference ? `\n\nالمصدر: ${entry.reference}` : ''}`;
  async function copy() {
    try { await navigator.clipboard.writeText(copyText); setMessage('تم نسخ الذكر'); }
    catch { setMessage('تعذّر النسخ تلقائيًا. يمكنك تحديد النص ونسخه.'); }
  }
  async function share() {
    const url = `${window.location.origin}/azkar/${entry.categoryId}#${entry.id}`;
    try {
      if (navigator.share) await navigator.share({ title: 'ذكر من سكينة', text: copyText, url });
      else { await navigator.clipboard.writeText(`${copyText}\n${url}`); setMessage('تم نسخ الذكر ورابطه للمشاركة'); }
    } catch (error) { if (!(error instanceof DOMException && error.name === 'AbortError')) setMessage('تعذّرت المشاركة. يمكنك نسخ الذكر.'); }
  }
  return <article id={entry.id} className={`dhikr-card ${completed ? 'completed' : ''} ${compact ? 'compact-dhikr' : ''}`}>
    <div className="dhikr-card-header"><span className="entry-number">{number(position).padStart(2, '٠')}</span><span className={`repeat-label ${completed ? 'done-label' : ''}`}>{completed ? <><Check size={15} /> اكتمل</> : entry.repeat ? `${number(entry.repeat)} ${entry.repeat === 1 ? 'مرة' : 'مرات'}` : 'ذكر بعدّاد حر'}</span><div className="entry-actions"><button className={`icon-button ${saved ? 'saved' : ''}`} onClick={() => dispatch({ type: 'save', id: entry.id })} aria-label={saved ? 'إزالة من المحفوظات' : 'حفظ الذكر'} aria-pressed={saved} disabled={!ready}><Bookmark size={19} fill={saved ? 'currentColor' : 'none'} /></button><button className="icon-button" onClick={copy} aria-label="نسخ الذكر"><Copy size={18} /></button><button className="icon-button" onClick={share} aria-label="مشاركة الذكر"><Share2 size={18} /></button></div></div>
    <p className="dhikr-text" style={{ fontSize: `${state.fontSize}px` }}>{state.diacritics ? entry.text : withoutDiacritics(entry.text)}</p>
    {entry.reference && <p className="reference"><span>المصدر</span> {entry.reference}</p>}
    {entry.note && <details className="dhikr-note"><summary>الفضل والتوضيح <ChevronDown size={16} /></summary><p>{entry.note}</p><span className="note-attribution">كما ورد في قاعدة البيانات؛ لم يُراجع التخريج مستقلًا.</span></details>}
    <div className="counter-area"><div><span className="counter-caption">{completed ? 'تقبّل الله منك' : entry.repeat ? 'اضغط بعد كل قراءة' : 'عدّاد حر، بدون عدد محدد في المصدر'}</span><div className="counter-tools"><button className="icon-button" aria-label="تراجع عن ضغطة" disabled={!ready || count === 0} onClick={() => dispatch({ type: 'decrement', id: entry.id })}><Minus size={16} /></button><button className="icon-button" aria-label="تصفير عداد الذكر" disabled={!ready || count === 0} onClick={() => dispatch({ type: 'reset', ids: [entry.id] })}><RotateCcw size={15} /></button></div></div><button className={`count-button ${completed ? 'count-complete' : ''}`} disabled={!ready || completed} onClick={() => dispatch({ type: 'increment', id: entry.id, limit: entry.repeat })} aria-label={completed ? 'اكتمل الذكر' : 'تسجيل قراءة الذكر'}><span key={count} className="animated-count">{completed ? <Check size={22} /> : <Plus size={20} />}<b>{number(count)}</b>{entry.repeat && <span className="count-limit">/ {number(entry.repeat)}</span>}</span></button></div>
    {entry.repeat && <div className="entry-progress" role="progressbar" aria-label="تقدم الذكر" aria-valuemin={0} aria-valuemax={entry.repeat} aria-valuenow={Math.min(count, entry.repeat)}><span style={{ width: `${progress}%` }} /></div>}
    {message && <p className="inline-message" role="status">{message}<button onClick={() => setMessage('')} aria-label="إغلاق الرسالة">×</button></p>}
  </article>;
}
