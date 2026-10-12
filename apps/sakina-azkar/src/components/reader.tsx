'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, Eye, EyeOff, Maximize2, Minimize2, RotateCcw, Minus, Plus } from 'lucide-react';
import type { Category, Dhikr, PrayerId } from '@/lib/types';
import { number } from '@/lib/text';
import { counterKey, prayers } from '@/lib/progress';
import { useReading } from '@/lib/reading-store';
import { Icon } from './icon';
import { DhikrCard } from './dhikr-card';
import { Reveal } from './reveal';

export function Reader({ category, entries }: { category: Category; entries: Dhikr[] }) {
  const { state, dispatch, ready, persistent } = useReading();
  const [focus, setFocus] = useState(false);
  const [hideCompleted, setHideCompleted] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [selectedScope, setSelectedScope] = useState<PrayerId | undefined>(category.prayers?.[0]);
  const scope = selectedScope && category.prayers?.includes(selectedScope) ? selectedScope : category.prayers?.[0];
  const applicable = entries.filter(e => !e.appliesTo?.length || !scope || e.appliesTo.includes(scope));
  const countable = applicable.filter(e => e.repeat !== null);
  const completed = countable.filter(e => (state.counts[counterKey(e.id, scope)] ?? 0) >= e.repeat!).length;
  const progress = countable.length ? completed / countable.length * 100 : 0;
  const visible = applicable.filter(e => !hideCompleted || e.repeat === null || (state.counts[counterKey(e.id, scope)] ?? 0) < e.repeat);
  const prayerTitle = prayers.find(p => p.id === scope)?.title;

  return <div className={'reader container' + (focus ? ' focus-mode' : '')}>
    <Link href="/library" className="back-link"><ArrowRight size={18} /> مكتبة الأذكار</Link>
    <header className="reader-header">
      <span className="reader-category-icon"><Icon name={category.icon} size={36} /></span>
      <span className="eyebrow">وقتٌ لك، وقلبك</span>
      <h1>{category.title}</h1>
      <p>{category.description}</p>
      <div className="reader-meta"><span>{number(applicable.length)} نصًا</span><span className="dot" /><span>تقدمك محفوظ على هذا الجهاز</span></div>
    </header>
    {category.prayers && <section className="prayer-selection" aria-label="اختيار الصلاة">
      <div className="prayer-tabs" role="group" aria-label="الصلاة الحالية">
        {category.prayers.map(id => <button key={id} aria-pressed={scope === id}
          onClick={() => { setSelectedScope(id); setConfirmReset(false); }}>
          {prayers.find(p => p.id === id)?.title}
        </button>)}
      </div>
      <p>تتابع الآن أذكار {prayerTitle}. عدّادات كل صلاة مستقلة.</p>
      {category.prayers.includes('fajr') && <small>دعاء العلم النافع خاص بالفجر؛ يظهر عند اختيار الفجر فقط.</small>}
      <Link href="/azkar/after-prayer" className="subtle-link">اختيار مجموعة صلاة أخرى</Link>
    </section>}
    {countable.length > 0 && <div className="session-progress">
      <div><span>{completed === countable.length ? <><Check size={17} /> أتممت بطاقات الجلسة ذات العدد المحدد</> : 'وردك، خطوة بخطوة'}</span><b>{number(completed)} / {number(countable.length)}</b></div>
      <div className="session-progress-track" role="progressbar" aria-label="تقدم الجلسة"
        aria-valuemin={0} aria-valuemax={countable.length} aria-valuenow={completed}>
        <span style={{ width: String(progress) + '%' }} />
      </div>
      <small>العدّادات الحرة والنصوص الإرشادية لا تدخل في نسبة الإكمال.</small>
    </div>}
    <div className="reading-toolbar" aria-label="إعدادات القراءة">
      <div className="font-controls">
        <button className="icon-button" aria-label="تصغير الخط" onClick={() => dispatch({ type: 'font', size: state.fontSize - 2 })} disabled={!ready || state.fontSize <= 20}><Minus size={17} /></button>
        <span>حجم الخط <b>{number(state.fontSize)}</b></span>
        <button className="icon-button" aria-label="تكبير الخط" onClick={() => dispatch({ type: 'font', size: state.fontSize + 2 })} disabled={!ready || state.fontSize >= 36}><Plus size={17} /></button>
      </div>
      <div className="toolbar-actions">
        <button aria-pressed={state.diacritics} onClick={() => dispatch({ type: 'diacritics' })} disabled={!ready}>التشكيل</button>
        <button aria-label={hideCompleted ? 'إظهار المكتمل' : 'إخفاء المكتمل'} aria-pressed={hideCompleted} onClick={() => setHideCompleted(!hideCompleted)}>
          {hideCompleted ? <Eye size={17} /> : <EyeOff size={17} />}<span>{hideCompleted ? 'إظهار المكتمل' : 'إخفاء المكتمل'}</span>
        </button>
        <button aria-pressed={focus} onClick={() => setFocus(!focus)}>
          {focus ? <Minimize2 size={17} /> : <Maximize2 size={17} />}<span>تركيز</span>
        </button>
      </div>
    </div>
    {!persistent && <p className="storage-warning" role="status">الحفظ غير متاح في هذا المتصفح. تقدمك الحالي سيظل متاحًا حتى تغادر الصفحة.</p>}
    <div className="reader-content">{visible.map(entry => <Reveal key={entry.id + (scope ?? '')}>
      <DhikrCard entry={entry} position={applicable.indexOf(entry) + 1} scope={scope} />
    </Reveal>)}</div>
    {!visible.length && <div className="completion-state">
      <span><Check size={35} /></span><h2>لحظة سكينة تستحقها.</h2>
      <p>أتممت بطاقات هذا القسم ذات العدد المحدد.</p>
      <button className="button button-secondary" onClick={() => setHideCompleted(false)}>عرض الأذكار المكتملة</button>
    </div>}
    <div className="reader-bottom">
      <p>الذكر على مهل أجمل. خُذ وقتك.</p>
      {confirmReset ? <div className="reset-confirm" role="group" aria-label="تأكيد تصفير القسم">
        <span>{scope ? 'تصفير عدّادات صلاة ' + prayerTitle + ' فقط؟' : 'تصفير عدّادات هذا القسم؟'}</span>
        <button className="button button-danger" onClick={() => {
          dispatch({ type: 'reset', ids: applicable.map(e => counterKey(e.id, scope)) });
          setConfirmReset(false);
        }}>نعم، تصفير</button>
        <button className="button button-secondary" onClick={() => setConfirmReset(false)}>إلغاء</button>
      </div> : <button className="text-link" onClick={() => setConfirmReset(true)}><RotateCcw size={16} /> بدء هذا القسم من جديد</button>}
      <small>تبدأ العدّادات من جديد كل يوم حسب توقيت جهازك. المحفوظات وإعدادات القراءة تبقى.</small>
      <Link href="/sources" className="subtle-link">عن مصدر النصوص ومراجعتها</Link>
    </div>
  </div>;
}
