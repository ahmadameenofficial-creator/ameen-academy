'use client';

import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import {
  ArrowLeft,
  Check,
  ChevronDown,
  Hand,
  Minus,
  Moon,
  Plus,
  Settings2,
  Sun,
  X,
} from 'lucide-react';
import type { Category, Dhikr } from '@/lib/types';
import { number, withoutDiacritics } from '@/lib/text';
import { useReading } from '@/lib/reading-store';
import { countDhikr } from '@/lib/count-dhikr';
import { hundredProgress, supportsHundredSession } from '@/lib/hundred-session';
import { useSessionPreferences } from '@/lib/session-preferences-store';
import { useScreenAwake } from '@/lib/use-screen-awake';
import './hundred-session.css';

export function HundredSession({
  entry,
  category,
  nextEntry,
  onSelect,
  onExit,
  onContinue,
}: {
  entry: Dhikr;
  category: Category;
  nextEntry?: Dhikr;
  onSelect: (entry: Dhikr) => void;
  onExit: () => void;
  onContinue: () => void;
}) {
  const { state, dispatch, ready, persistent } = useReading();
  const { preferences, update } = useSessionPreferences();
  const progress = hundredProgress(state.counts[entry.id] ?? 0);
  const screen = useScreenAwake(preferences.keepAwake && !progress.completed);
  const canVibrate = typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function';
  const dialogRef = useRef<HTMLDialogElement>(null);
  const settingsRef = useRef<HTMLDetailsElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const completionRef = useRef<HTMLHeadingElement>(null);
  const completedByTap = useRef(false);
  const [openedDay] = useState(state.day);
  const [announcement, setAnnouncement] = useState('');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const labelId = useId();
  const totalId = useId();
  const hintId = useId();
  const settingsId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const overflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    titleRef.current?.focus({ preventScroll: true });
    return () => {
      dialog.close();
      document.body.style.overflow = overflow;
      if (opener?.isConnected) opener.focus({ preventScroll: true });
    };
  }, []);

  useEffect(() => {
    if (progress.completed && completedByTap.current) {
      completedByTap.current = false;
      completionRef.current?.focus({ preventScroll: true });
    }
  }, [progress.completed]);

  function increment() {
    if (!ready || progress.completed) return;
    const result = countDhikr(entry);
    if (!result.changed) return;
    if (result.count === 100) completedByTap.current = true;
    if (result.count % 10 === 0) {
      setAnnouncement(
        result.count === 100
          ? 'أتممت 100 تكرار. تقبّل الله منك.'
          : 'أتممت ' + number(result.count) + ' تكرارًا، باقي ' + number(100 - result.count) + '.',
      );
      if (preferences.haptics && canVibrate) {
        try {
          navigator.vibrate(result.count === 100 ? [25, 60, 25] : 20);
        } catch {}
      }
    }
  }

  function undo() {
    const { current } = dispatch({ type: 'decrement', id: entry.id, limit: 100 });
    setAnnouncement('تم التراجع. أتممت ' + number(current.counts[entry.id] ?? 0) + ' من 100.');
  }

  function containFocus(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== 'Tab') return;
    const focusable = Array.from(
      event.currentTarget.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), summary, [tabindex]:not([tabindex="-1"])',
      ),
    ).filter((element) => element.getClientRects().length > 0);
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement;
    if (!first || !last) return;
    if (event.shiftKey && (active === first || !focusable.includes(active as HTMLElement))) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && (active === last || !focusable.includes(active as HTMLElement))) {
      event.preventDefault();
      first.focus();
    }
  }

  if (!supportsHundredSession(entry)) return null;

  return (
    <dialog
      ref={dialogRef}
      className="hundred-session"
      aria-labelledby={labelId}
      aria-describedby={hintId}
      data-hand={preferences.hand}
      onKeyDown={containFocus}
      onCancel={(event) => {
        event.preventDefault();
        onExit();
      }}
    >
      <div className="hundred-layout">
        <header className="hundred-header">
          <span className="hundred-symbol" aria-hidden="true">
            {category.id === 'morning' ? <Sun size={23} /> : <Moon size={23} />}
          </span>
          <div>
            <p>{category.title}</p>
            <h2 id={labelId} ref={titleRef} tabIndex={-1}>
              جلسة المئة
            </h2>
          </div>
          <button
            className="hundred-settings-shortcut"
            aria-label="إعدادات جلسة المئة"
            aria-controls={settingsId}
            aria-expanded={settingsOpen}
            onClick={() => {
              const settings = settingsRef.current;
              if (!settings) return;
              settings.open = !settings.open;
              if (settings.open)
                requestAnimationFrame(() =>
                  settings.scrollIntoView({
                    block: 'nearest',
                    behavior: matchMedia('(prefers-reduced-motion: reduce)').matches
                      ? 'instant'
                      : 'smooth',
                  }),
                );
            }}
          >
            <Settings2 size={21} />
          </button>
          <button className="hundred-close" aria-label="إغلاق جلسة المئة" onClick={onExit}>
            <X size={22} />
          </button>
        </header>

        <div className="hundred-body">
          <section className="hundred-reading" aria-label="نص الذكر وإعدادات الجلسة">
            <div className="hundred-text-label">
              <span>على مهل، مرة بعد مرة</span>
              <span>100 تكرار</span>
            </div>
            {entry.title && <h3 className="hundred-entry-title">{entry.title}</h3>}
            <p className="hundred-text" style={{ fontSize: state.fontSize + 'px' }}>
              {state.diacritics ? entry.text : withoutDiacritics(entry.text)}
            </p>
            <p className="hundred-explanation" id={hintId}>
              اقرأ الذكر كاملًا، ثم اضغط ضغطة واحدة. يمكنك التوقف والاستكمال من نفس العدد اليوم.
            </p>
            {entry.reference && (
              <p className="hundred-reference">
                المصدر:{' '}
                {entry.referenceUrl ? (
                  <a href={entry.referenceUrl} target="_blank" rel="noopener noreferrer">
                    {entry.reference}
                  </a>
                ) : (
                  entry.reference
                )}
              </p>
            )}

            <details
              className="hundred-settings"
              id={settingsId}
              ref={settingsRef}
              onToggle={(event) => setSettingsOpen(event.currentTarget.open)}
            >
              <summary>
                <Settings2 size={18} /> إعدادات الجلسة <ChevronDown size={17} />
              </summary>
              <div className="hundred-settings-content">
                <div className="hundred-font-controls" role="group" aria-label="حجم خط الجلسة">
                  <span>
                    حجم الخط <b>{number(state.fontSize)}</b>
                  </span>
                  <button
                    className="icon-button"
                    aria-label="تصغير خط الجلسة"
                    disabled={!ready || state.fontSize <= 20}
                    onClick={() => dispatch({ type: 'font', size: state.fontSize - 2 })}
                  >
                    <Minus size={18} />
                  </button>
                  <button
                    className="icon-button"
                    aria-label="تكبير خط الجلسة"
                    disabled={!ready || state.fontSize >= 36}
                    onClick={() => dispatch({ type: 'font', size: state.fontSize + 2 })}
                  >
                    <Plus size={18} />
                  </button>
                </div>
                <fieldset className="hundred-hand-options">
                  <legend>
                    <Hand size={17} /> اليد المفضلة
                  </legend>
                  {(['right', 'left'] as const).map((hand) => (
                    <label key={hand}>
                      <input
                        type="radio"
                        name="session-hand"
                        value={hand}
                        checked={preferences.hand === hand}
                        onChange={() => update({ hand })}
                      />
                      <span>{hand === 'right' ? 'اليمنى' : 'اليسرى'}</span>
                    </label>
                  ))}
                </fieldset>
                <label className="hundred-toggle">
                  <input
                    type="checkbox"
                    checked={preferences.haptics}
                    disabled={!canVibrate}
                    onChange={(event) => update({ haptics: event.target.checked })}
                  />
                  <span>
                    اهتزاز خفيف كل 10 تكرارات
                    <small>
                      {canVibrate ? 'اختياري، بدون صوت' : 'الاهتزاز غير متاح في هذا المتصفح'}
                    </small>
                  </span>
                </label>
                <label className="hundred-toggle">
                  <input
                    type="checkbox"
                    checked={preferences.keepAwake}
                    disabled={!screen.supported}
                    onChange={(event) => update({ keepAwake: event.target.checked })}
                  />
                  <span>
                    إبقاء الشاشة مفتوحة
                    <small>
                      {!screen.supported
                        ? 'غير متاح في هذا المتصفح'
                        : screen.status === 'active'
                          ? 'مفعّل أثناء جلسة العدّ'
                          : screen.status === 'unavailable'
                            ? 'تعذّر تفعيله؛ قد تمنعه إعدادات الجهاز'
                            : 'أثناء الجلسة، بحسب دعم الجهاز'}
                    </small>
                  </span>
                </label>
              </div>
            </details>
            {!persistent && (
              <p className="hundred-warning" role="status">
                الحفظ غير متاح. احتفظ بهذه الصفحة مفتوحة حتى لا تفقد العدد.
              </p>
            )}
            {state.day !== openedDay && (
              <p className="hundred-warning" role="status">
                بدأ يوم جديد حسب توقيت جهازك؛ بدأت عدّادات اليوم من الصفر.
              </p>
            )}
          </section>

          <section className="hundred-counting" aria-label="العدّ والتقدم">
            <div className="hundred-stage-heading">
              <span>
                {progress.completed
                  ? 'أتممت المراحل كلها'
                  : 'المرحلة ' + number(progress.stage) + ' من 10'}
              </span>
              <b>{number(progress.withinStage)} / 10</b>
            </div>
            <div
              className="hundred-stages"
              role="progressbar"
              aria-label="تقدم المئة"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress.count}
              aria-valuetext={
                'أتممت ' + number(progress.count) + '، باقي ' + number(progress.remaining)
              }
            >
              {Array.from({ length: 10 }, (_, index) => (
                <span
                  key={index}
                  aria-hidden="true"
                  className={
                    index < progress.completedStages
                      ? 'stage-done'
                      : index === progress.completedStages && !progress.completed
                        ? 'stage-current'
                        : ''
                  }
                >
                  <i
                    style={{
                      width: Math.max(0, Math.min(10, progress.count - index * 10)) * 10 + '%',
                    }}
                  />
                </span>
              ))}
            </div>
            <div className="hundred-total" id={totalId}>
              <span>
                أتممت <b>{number(progress.count)}</b>
              </span>
              <span>
                باقي <b>{number(progress.remaining)}</b>
              </span>
            </div>
            <button
              className={'hundred-tap' + (progress.completed ? ' hundred-tap-complete' : '')}
              aria-label={progress.completed ? 'اكتملت المئة' : 'تسجيل تكرار واحد'}
              aria-describedby={totalId}
              disabled={!ready || progress.completed}
              onClick={increment}
              onKeyDown={(event) => {
                if (event.repeat && (event.key === 'Enter' || event.key === ' '))
                  event.preventDefault();
              }}
              onContextMenu={(event) => event.preventDefault()}
            >
              <span className="hundred-tap-number" aria-hidden="true">
                {progress.completed ? <Check size={46} /> : <Plus size={28} />}
                <b>{number(progress.count)}</b>
                <span>/ 100</span>
              </span>
              <span>{progress.completed ? 'تقبّل الله منك' : 'اضغط بعد كل تكرار'}</span>
            </button>
            <div className="hundred-counter-actions">
              <button
                className="hundred-undo"
                onClick={undo}
                disabled={!ready || progress.count === 0}
              >
                <Minus size={19} /> تراجع عن ضغطة
              </button>
              <span>{persistent ? 'العدد محفوظ على جهازك' : 'العدد محفوظ لهذه الزيارة فقط'}</span>
            </div>
            <p className="hundred-stage-note">10 مراحل لتسهيل المتابعة، والعدد المطلوب يظل 100.</p>
            {progress.completed && (
              <div className="hundred-completion">
                <h3 ref={completionRef} tabIndex={-1}>
                  <Check size={20} /> أتممت هذا الذكر
                </h3>
                <p>خذ نفسًا، وكمّل وردك على راحتك.</p>
              </div>
            )}
          </section>
        </div>

        <footer className="hundred-footer">
          {progress.completed ? (
            <>
              {nextEntry && (
                <button className="hundred-next" onClick={() => onSelect(nextEntry)}>
                  جلسة المئة التالية <ArrowLeft size={18} />
                </button>
              )}
              <button className="hundred-pause" onClick={onContinue}>
                متابعة باقي الورد <ArrowLeft size={18} />
              </button>
            </>
          ) : (
            <button className="hundred-pause" onClick={onExit}>
              توقف الآن، وكمّل لاحقًا <ArrowLeft size={18} />
            </button>
          )}
          <small>عدّادات الصباح والمساء مستقلة.</small>
        </footer>
        <p className="visually-hidden" role="status" aria-live="polite" aria-atomic="true">
          {announcement}
        </p>
      </div>
    </dialog>
  );
}
