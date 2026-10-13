'use client';
import { useEffect, useState, type ReactNode } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Eye,
  EyeOff,
  Maximize2,
  Minimize2,
  RotateCcw,
  Minus,
  Plus,
} from 'lucide-react';
import type { Category, Dhikr, PrayerId } from '@/lib/types';
import { number } from '@/lib/text';
import { counterKey, prayers } from '@/lib/progress';
import { useReading } from '@/lib/reading-store';
import { Icon } from './icon';
import { DhikrCard } from './dhikr-card';
import { Reveal } from './reveal';
import { recordCompletion } from '@/lib/history-store';
import { supportsHundredSession } from '@/lib/hundred-session';
import { HundredSession } from './hundred-session';
import { NotificationBell } from './notification-bell';
import { NotificationArrival } from './notification-arrival';

export function Reader({
  category,
  entries,
  context,
}: {
  category: Category;
  entries: Dhikr[];
  context: ReactNode;
}) {
  const { state, dispatch, ready, persistent } = useReading();
  const [focus, setFocus] = useState(false);
  const [hideCompleted, setHideCompleted] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [hundredEntryId, setHundredEntryId] = useState<string | null>(null);
  const [selectedScope, setSelectedScope] = useState<PrayerId | undefined>(category.prayers?.[0]);
  const scope =
    selectedScope && category.prayers?.includes(selectedScope)
      ? selectedScope
      : category.prayers?.[0];
  const applicable = entries.filter(
    (e) => !e.appliesTo?.length || !scope || e.appliesTo.includes(scope),
  );
  const countable = applicable.filter((e) => e.repeat !== null);
  const completed = countable.filter(
    (e) => (state.counts[counterKey(e.id, scope)] ?? 0) >= e.repeat!,
  ).length;
  const progress = countable.length ? (completed / countable.length) * 100 : 0;
  const visible = applicable.filter(
    (e) =>
      !hideCompleted ||
      e.repeat === null ||
      (state.counts[counterKey(e.id, scope)] ?? 0) < e.repeat,
  );
  const prayerTitle = prayers.find((p) => p.id === scope)?.title;
  const hundredEntries = applicable.filter(supportsHundredSession);
  const hundredEntry = hundredEntries.find((entry) => entry.id === hundredEntryId);
  const hundredResume =
    hundredEntries.find(
      (entry) => (state.counts[entry.id] ?? 0) > 0 && (state.counts[entry.id] ?? 0) < 100,
    ) ?? hundredEntries.find((entry) => (state.counts[entry.id] ?? 0) < 100);
  const nextHundred = hundredEntries.find(
    (entry) => entry.id !== hundredEntryId && (state.counts[entry.id] ?? 0) < 100,
  );
  function openHundred(entry: Dhikr) {
    setHundredEntryId(entry.id);
  }
  function continueWard() {
    const next = applicable.find(
      (entry) =>
        entry.id !== hundredEntryId &&
        entry.repeat !== null &&
        (state.counts[entry.id] ?? 0) < entry.repeat,
    );
    if (next) setHideCompleted(false);
    setHundredEntryId(null);
    if (next)
      requestAnimationFrame(() => {
        const element = document.getElementById(next.id);
        element?.scrollIntoView({
          behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
          block: 'center',
        });
        element?.querySelector<HTMLButtonElement>('.count-button')?.focus({ preventScroll: true });
      });
  }
  useEffect(() => {
    if (ready && countable.length > 0 && completed === countable.length)
      recordCompletion({ day: state.day, categoryId: category.id, ...(scope ? { scope } : {}) });
  }, [ready, countable.length, completed, state.day, category.id, scope]);

  return (
    <div className={'reader container' + (focus ? ' focus-mode' : '')}>
      <Link href="/library" className="back-link">
        <ArrowRight size={18} /> مكتبة الأذكار
      </Link>
      <header className="reader-header">
        <span className="reader-category-icon">
          <Icon name={category.icon} size={36} />
        </span>
        <span className="eyebrow">وقتٌ لك، وقلبك</span>
        <div className="reader-title-row"><h1>{category.title}</h1>{['morning','evening'].includes(category.id) && <NotificationBell />}</div>
        <p>{category.description}</p>
        <div className="reader-meta">
          <span>{number(applicable.length)} نصًا</span>
          <span className="dot" />
          <span>تقدمك محفوظ على هذا الجهاز</span>
        </div>
      </header>
      {['morning','evening'].includes(category.id) && <NotificationArrival ward={category.id as 'morning' | 'evening'} entries={entries} />}
      {category.prayers && (
        <section className="prayer-selection" aria-label="اختيار الصلاة">
          <div className="prayer-tabs" role="group" aria-label="الصلاة الحالية">
            {category.prayers.map((id) => (
              <button
                key={id}
                aria-pressed={scope === id}
                onClick={() => {
                  setSelectedScope(id);
                  setConfirmReset(false);
                }}
              >
                {prayers.find((p) => p.id === id)?.title}
              </button>
            ))}
          </div>
          <p>تتابع الآن أذكار {prayerTitle}. عدّادات كل صلاة مستقلة.</p>
          {category.prayers.includes('fajr') && (
            <small>دعاء العلم النافع خاص بالفجر؛ يظهر عند اختيار الفجر فقط.</small>
          )}
          <Link href="/azkar/after-prayer" className="subtle-link">
            اختيار مجموعة صلاة أخرى
          </Link>
        </section>
      )}
      {countable.length > 0 && (
        <div className="session-progress">
          <div>
            <span>
              {completed === countable.length ? (
                <>
                  <Check size={17} /> أتممت بطاقات الجلسة ذات العدد المحدد
                </>
              ) : (
                'وردك، خطوة بخطوة'
              )}
            </span>
            <b>
              {number(completed)} / {number(countable.length)}
            </b>
          </div>
          <div
            className="session-progress-track"
            role="progressbar"
            aria-label="تقدم الجلسة"
            aria-valuemin={0}
            aria-valuemax={countable.length}
            aria-valuenow={completed}
          >
            <span style={{ width: String(progress) + '%' }} />
          </div>
          <small>العدّادات الحرة والنصوص الإرشادية لا تدخل في نسبة الإكمال.</small>
        </div>
      )}
      {hundredEntries.length > 0 && (
        <section className="hundred-intro" aria-label="جلسات المئة">
          <span className="hundred-intro-number" aria-hidden="true">
            100
          </span>
          <div>
            <h2>المئة، خطوة بخطوة</h2>
            <p>ذكر واحد، زر واسع، و10 مراحل سهلة المتابعة.</p>
            {hundredResume && (state.counts[hundredResume.id] ?? 0) > 0 && (
              <small>
                كمّل من {number(state.counts[hundredResume.id])} — باقي{' '}
                {number(100 - state.counts[hundredResume.id])}
              </small>
            )}
          </div>
          <button onClick={() => openHundred(hundredResume ?? hundredEntries[0])} disabled={!ready}>
            {hundredResume
              ? (state.counts[hundredResume.id] ?? 0) > 0
                ? 'استكمال المئة'
                : 'ابدأ جلسة المئة'
              : 'عرض جلسات المئة'}
            <ArrowLeft size={18} />
          </button>
        </section>
      )}
      <div className="reading-toolbar" aria-label="إعدادات القراءة">
        <div className="font-controls">
          <button
            className="icon-button"
            aria-label="تصغير الخط"
            onClick={() => dispatch({ type: 'font', size: state.fontSize - 2 })}
            disabled={!ready || state.fontSize <= 20}
          >
            <Minus size={17} />
          </button>
          <span>
            حجم الخط <b>{number(state.fontSize)}</b>
          </span>
          <button
            className="icon-button"
            aria-label="تكبير الخط"
            onClick={() => dispatch({ type: 'font', size: state.fontSize + 2 })}
            disabled={!ready || state.fontSize >= 36}
          >
            <Plus size={17} />
          </button>
        </div>
        <div className="toolbar-actions">
          <button
            aria-pressed={state.diacritics}
            onClick={() => dispatch({ type: 'diacritics' })}
            disabled={!ready}
          >
            التشكيل
          </button>
          <button
            aria-label={hideCompleted ? 'إظهار المكتمل' : 'إخفاء المكتمل'}
            aria-pressed={hideCompleted}
            onClick={() => setHideCompleted(!hideCompleted)}
          >
            {hideCompleted ? <Eye size={17} /> : <EyeOff size={17} />}
            <span>{hideCompleted ? 'إظهار المكتمل' : 'إخفاء المكتمل'}</span>
          </button>
          <button aria-pressed={focus} onClick={() => setFocus(!focus)}>
            {focus ? <Minimize2 size={17} /> : <Maximize2 size={17} />}
            <span>تركيز</span>
          </button>
        </div>
      </div>
      <details className="reader-guide">
        <summary>كيف تتابع أذكارك؟</summary>
        <p>
          اضغط الزر الكبير بعد كل قراءة. الأرقام تعرض ما قرأته من العدد المحدد، ويمكنك التراجع عن
          ضغطة أو تصفير العداد. العدّاد الحر يظل مفتوحًا.
        </p>
        <p>
          أذكار الصلاة لها عدّادات مستقلة لكل صلاة. عند إتمام بطاقات القسم ذات العدد المحدد، يُضاف
          اليوم إلى <Link href="/progress">متابعتك الأسبوعية</Link>.
        </p>
      </details>
      {!persistent && (
        <p className="storage-warning" role="status">
          الحفظ غير متاح في هذا المتصفح. تقدمك الحالي سيظل متاحًا حتى تغادر الصفحة.
        </p>
      )}
      <div className="reader-content">
        {visible.map((entry) => (
          <Reveal key={entry.id + (scope ?? '')}>
            <DhikrCard
              entry={entry}
              position={applicable.indexOf(entry) + 1}
              scope={scope}
              onHundredSession={hundredEntries.length ? openHundred : undefined}
            />
          </Reveal>
        ))}
      </div>
      {!visible.length && (
        <div className="completion-state">
          <span>
            <Check size={35} />
          </span>
          <h2>لحظة سكينة تستحقها.</h2>
          <p>أتممت بطاقات هذا القسم ذات العدد المحدد.</p>
          <button className="button button-secondary" onClick={() => setHideCompleted(false)}>
            عرض الأذكار المكتملة
          </button>
        </div>
      )}
      {context}
      <div className="reader-bottom">
        <p>الذكر على مهل أجمل. خُذ وقتك.</p>
        {confirmReset ? (
          <div className="reset-confirm" role="group" aria-label="تأكيد تصفير القسم">
            <span>
              {scope ? 'تصفير عدّادات صلاة ' + prayerTitle + ' فقط؟' : 'تصفير عدّادات هذا القسم؟'}
            </span>
            <button
              className="button button-danger"
              onClick={() => {
                dispatch({ type: 'reset', ids: applicable.map((e) => counterKey(e.id, scope)) });
                setConfirmReset(false);
              }}
            >
              نعم، تصفير
            </button>
            <button className="button button-secondary" onClick={() => setConfirmReset(false)}>
              إلغاء
            </button>
          </div>
        ) : (
          <button className="text-link" onClick={() => setConfirmReset(true)}>
            <RotateCcw size={16} /> بدء هذا القسم من جديد
          </button>
        )}
        <small>
          تبدأ العدّادات من جديد كل يوم حسب توقيت جهازك. المحفوظات وإعدادات القراءة تبقى.
        </small>
        <Link href="/sources" className="subtle-link">
          عن مصدر النصوص ومراجعتها
        </Link>
      </div>
      {hundredEntry && (
        <HundredSession
          key={hundredEntry.id}
          entry={hundredEntry}
          category={category}
          nextEntry={nextHundred}
          onSelect={openHundred}
          onExit={() => setHundredEntryId(null)}
          onContinue={continueWard}
        />
      )}
    </div>
  );
}
