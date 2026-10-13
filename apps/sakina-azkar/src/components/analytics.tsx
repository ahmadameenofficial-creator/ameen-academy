'use client';
import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import {
  analyticsConsent,
  configureAnalytics,
  consentKey,
  flushAnalytics,
  recordAnalytics,
} from '@/lib/analytics-client';
export function Analytics() {
  const pathname = usePathname();
  const [available, setAvailable] = useState(false);
  const [choice, setChoice] = useState<string | null>(null);
  const previous = useRef('');
  useEffect(() => {
    if (pathname.startsWith('/dashboard')) return;
    let active = true;
    void configureAnalytics().then((enabled) => {
      if (!active || navigator.doNotTrack === '1') return;
      setAvailable(enabled);
      try {
        setChoice(localStorage.getItem(consentKey));
      } catch {}
      if (previous.current !== pathname) {
        recordAnalytics('page_view', pathname);
        previous.current = pathname;
      }
    });
    let last = performance.now();
    let visible = document.visibilityState === 'visible';
    const recordTime = () => {
      const now = performance.now();
      const seconds = Math.min(30, Math.floor((now - last) / 1000));
      if (visible && seconds > 0) recordAnalytics('engaged', pathname, seconds);
      last = now;
      visible = document.visibilityState === 'visible';
    };
    const timer = window.setInterval(() => {
      recordTime();
      void flushAnalytics();
    }, 15000);
    const visibility = () => {
      recordTime();
      if (document.visibilityState === 'hidden') void flushAnalytics(true);
    };
    const leaving = () => {
      recordTime();
      void flushAnalytics(true);
    };
    const storage = (event: StorageEvent) => {
      if (event.key === consentKey) {
        analyticsConsent(event.newValue === 'yes');
        setChoice(event.newValue);
      }
    };
    const offline = () => recordAnalytics('offline_use', pathname);
    window.addEventListener('pagehide', leaving);
    window.addEventListener('online', offline);
    window.addEventListener('storage', storage);
    document.addEventListener('visibilitychange', visibility);
    return () => {
      active = false;
      clearInterval(timer);
      recordTime();
      void flushAnalytics();
      window.removeEventListener('pagehide', leaving);
      window.removeEventListener('online', offline);
      window.removeEventListener('storage', storage);
      document.removeEventListener('visibilitychange', visibility);
    };
  }, [pathname]);
  if (!available || pathname.startsWith('/dashboard')) return null;
  return (
    <section className="analytics-choice container" aria-label="إعدادات إحصائيات الاستخدام">
      <details open={choice === null}>
        <summary>إحصائيات الاستخدام</summary>
        <p>
          هل تسمح بمشاركة إحصائيات الاستخدام لتحسين سكينة؟ لا نرسل اسمك أو نصوص الأذكار أو بحثك أو
          محفوظاتك. الاختيار لا يؤثر على استخدام الموقع.
        </p>
        <div>
          <button
            className="button button-secondary"
            aria-pressed={choice === 'yes'}
            onClick={() => {
              analyticsConsent(true);
              setChoice('yes');
              recordAnalytics('page_view', pathname);
              void flushAnalytics();
            }}
          >
            السماح بالإحصائيات
          </button>
          <button
            className="button button-secondary"
            aria-pressed={choice === 'no'}
            onClick={() => {
              analyticsConsent(false);
              setChoice('no');
            }}
          >
            عدم المشاركة
          </button>
        </div>
      </details>
    </section>
  );
}
