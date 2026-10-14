'use client';
import { useEffect, useRef } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useReading } from '@/lib/reading-store';
import type { Theme } from '@/lib/progress';
import { recordAnalytics } from '@/lib/analytics-client';

export function ThemeSync() {
  const { state, ready } = useReading();
  useEffect(() => {
    if (!ready) return;
    document.documentElement.dataset.theme = state.theme;
    document.querySelectorAll('meta[name="theme-color"]').forEach(meta => {
      meta.setAttribute('content', state.theme === 'dark' ? '#171b20' : '#ffffff');
    });
  }, [state.theme, ready]);
  return null;
}

const choices: { id: Theme; title: string; icon: typeof Sun }[] = [
  { id: 'light', title: 'الوضع الفاتح', icon: Sun },
  { id: 'dark', title: 'الوضع الليلي', icon: Moon },
];
export function ThemeControl() {
  const { state, dispatch, ready } = useReading();
  const ref = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const closeOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) ref.current.open = false;
    };
    document.addEventListener('click', closeOutside);
    return () => document.removeEventListener('click', closeOutside);
  }, []);
  const CurrentIcon = choices.find(c => c.id === state.theme)?.icon ?? Sun;
  return <details ref={ref} className="theme-control" onKeyDown={event => {
    if (event.key === 'Escape' && ref.current) { ref.current.open = false; ref.current.querySelector('summary')?.focus(); }
  }}>
    <summary aria-label="إعدادات المظهر"><CurrentIcon size={20} /><span>المظهر</span></summary>
    <div className="theme-menu" role="group" aria-label="اختيار مظهر الموقع">{choices.map(choice => <button key={choice.id} aria-pressed={state.theme === choice.id} disabled={!ready} onClick={() => { dispatch({ type: 'theme', theme: choice.id }); recordAnalytics(choice.id === 'dark' ? 'theme_dark' : 'theme_light'); if (ref.current) ref.current.open = false; }}><choice.icon size={17} />{choice.title}</button>)}</div>
  </details>;
}
