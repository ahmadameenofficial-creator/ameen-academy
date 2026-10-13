'use client';
import { useState } from 'react';
import {
  Bookmark,
  Check,
  ChevronDown,
  Copy,
  Minus,
  RotateCcw,
  Share2,
  Plus,
  Maximize2,
} from 'lucide-react';
import type { Dhikr, PrayerId } from '@/lib/types';
import { number, withoutDiacritics } from '@/lib/text';
import { useReading } from '@/lib/reading-store';
import { counterKey, prayers } from '@/lib/progress';
import { recordAnalytics } from '@/lib/analytics-client';
import { countDhikr } from '@/lib/count-dhikr';
import { supportsHundredSession } from '@/lib/hundred-session';

export function DhikrCard({
  entry,
  position,
  compact = false,
  scope,
  onHundredSession,
}: {
  entry: Dhikr;
  position: number;
  compact?: boolean;
  scope?: PrayerId;
  onHundredSession?: (entry: Dhikr) => void;
}) {
  const { state, dispatch, ready } = useReading();
  const [message, setMessage] = useState('');
  const key = counterKey(entry.id, scope);
  const count = Math.min(state.counts[key] ?? 0, entry.repeat ?? Number.MAX_SAFE_INTEGER);
  const completed = entry.repeat !== null && count >= entry.repeat;
  const saved = state.saved.includes(entry.id);
  const progress = entry.repeat ? Math.min(100, (count / entry.repeat) * 100) : 0;
  const copyText = entry.text + (entry.reference ? '\n\nالمصدر: ' + entry.reference : '');

  async function copy() {
    try {
      await navigator.clipboard.writeText(copyText);
      setMessage('تم نسخ الذكر');
      recordAnalytics('copy', '/azkar/' + entry.categoryId);
    } catch {
      setMessage('تعذّر النسخ تلقائيًا. يمكنك تحديد النص ونسخه.');
    }
  }
  async function share() {
    const url = window.location.origin + '/azkar/' + entry.categoryId + '#' + entry.id;
    try {
      if (navigator.share) await navigator.share({ title: 'ذكر من سكينة', text: copyText, url });
      else {
        await navigator.clipboard.writeText(copyText + '\n' + url);
        setMessage('تم نسخ الذكر ورابطه للمشاركة');
      }
      recordAnalytics('share', '/azkar/' + entry.categoryId);
    } catch (error) {
      if (!(error instanceof DOMException && error.name === 'AbortError'))
        setMessage('تعذّرت المشاركة. يمكنك نسخ الذكر.');
    }
  }

  const label =
    entry.counterKind === 'instruction'
      ? 'إرشاد'
      : entry.counterKind === 'reading'
        ? 'متابعة قراءة'
        : entry.repeat
          ? number(entry.repeat) + (entry.repeat >= 3 && entry.repeat <= 10 ? ' مرات' : ' مرة')
          : 'عدّاد حر';
  const caption = completed
    ? 'تقبّل الله منك'
    : entry.counterKind === 'reading'
      ? 'متابعة قراءة؛ ليس عدد تكرار مسنونًا'
      : entry.repeat
        ? 'اضغط بعد كل قراءة'
        : 'عدّاد حر؛ لا يوجد عدد محدد في المصدر';

  return (
    <article
      id={entry.id}
      className={'dhikr-card' + (completed ? ' completed' : '') + (compact ? ' compact-dhikr' : '')}
    >
      <div className="dhikr-card-header">
        <span className="entry-number">{number(position).padStart(2, '0')}</span>
        <span className={'repeat-label' + (completed ? ' done-label' : '')}>
          {completed ? (
            <>
              <Check size={15} /> اكتمل
            </>
          ) : (
            label
          )}
        </span>
        <div className="entry-actions">
          <button
            className={'icon-button' + (saved ? ' saved' : '')}
            onClick={() => dispatch({ type: 'save', id: entry.id, scope })}
            aria-label={saved ? 'إزالة من المحفوظات' : 'حفظ الذكر'}
            aria-pressed={saved}
            disabled={!ready}
          >
            <Bookmark size={19} fill={saved ? 'currentColor' : 'none'} />
          </button>
          <button className="icon-button" onClick={copy} aria-label="نسخ الذكر">
            <Copy size={18} />
          </button>
          <button className="icon-button" onClick={share} aria-label="مشاركة الذكر">
            <Share2 size={18} />
          </button>
        </div>
      </div>
      {entry.title && <h2 className="dhikr-card-title">{entry.title}</h2>}
      {scope && (
        <p className="scope-label">عدّاد صلاة {prayers.find((p) => p.id === scope)?.title}</p>
      )}
      <p className="dhikr-text" style={{ fontSize: String(state.fontSize) + 'px' }}>
        {state.diacritics ? entry.text : withoutDiacritics(entry.text)}
      </p>
      {entry.reference && (
        <p className="reference">
          <span>المصدر</span>
          {entry.referenceUrl ? (
            <a href={entry.referenceUrl} target="_blank" rel="noopener noreferrer">
              {entry.reference}
            </a>
          ) : (
            entry.reference
          )}
        </p>
      )}
      {entry.note && (
        <details className="dhikr-note">
          <summary>
            الفضل والتوضيح <ChevronDown size={16} />
          </summary>
          <p>{entry.note}</p>
          <span className="note-attribution">
            {entry.curated
              ? 'راجع المرجع المشار إليه؛ تفاصيل فصل النص والعدد محفوظة في سجل التصحيحات.'
              : 'كما ورد في قاعدة البيانات؛ لم يُراجع التخريج مستقلًا.'}
          </span>
        </details>
      )}
      {entry.counterKind !== 'instruction' ? (
        <div className="counter-area">
          <div className="counter-meta">
            <span className="counter-caption">{caption}</span>
            <div className="counter-tools">
              <button
                className="icon-button"
                aria-label="تراجع عن ضغطة"
                disabled={!ready || count === 0}
                onClick={() => dispatch({ type: 'decrement', id: key, limit: entry.repeat })}
              >
                <Minus size={19} />
              </button>
              <button
                className="icon-button"
                aria-label="تصفير عداد الذكر"
                disabled={!ready || count === 0}
                onClick={() => dispatch({ type: 'reset', ids: [key] })}
              >
                <RotateCcw size={18} />
              </button>
            </div>
          </div>
          <button
            className={'count-button' + (completed ? ' count-complete' : '')}
            disabled={!ready || completed}
            onClick={() => countDhikr(entry, scope)}
            aria-label={completed ? 'اكتمل الذكر' : 'تسجيل قراءة الذكر'}
          >
            <span key={count} className="animated-count">
              {completed ? <Check size={27} /> : <Plus size={24} />}
              <b>{number(count)}</b>
              {entry.repeat && <span className="count-limit">/ {number(entry.repeat)}</span>}
            </span>
            <span className="count-button-caption">{completed ? 'اكتمل' : 'اضغط للعدّ'}</span>
          </button>
          {onHundredSession && supportsHundredSession(entry) && (
            <button
              className="hundred-card-launch"
              disabled={!ready}
              onClick={() => onHundredSession(entry)}
            >
              <Maximize2 size={19} />
              {completed ? 'عرض جلسة المئة' : count > 0 ? 'استكمال جلسة المئة' : 'فتح جلسة المئة'}
              <span>10 × 10</span>
            </button>
          )}
        </div>
      ) : (
        <p className="instruction-caption">نص إرشادي؛ لا يُعدّ كتكرار لذكر.</p>
      )}
      {entry.repeat && (
        <div
          className="entry-progress"
          role="progressbar"
          aria-label="تقدم الذكر"
          aria-valuemin={0}
          aria-valuemax={entry.repeat}
          aria-valuenow={Math.min(count, entry.repeat)}
        >
          <span style={{ width: String(progress) + '%' }} />
        </div>
      )}
      {message && (
        <p className="inline-message" role="status">
          {message}
          <button onClick={() => setMessage('')} aria-label="إغلاق الرسالة">
            ×
          </button>
        </p>
      )}
    </article>
  );
}
