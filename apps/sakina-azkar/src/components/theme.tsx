'use client';
import { useEffect, useRef } from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useReading } from '@/lib/reading-store';
import type { Theme } from '@/lib/progress';

export function ThemeSync() {
  const { state, ready } = useReading();
  useEffect(() => {
    if (!ready) return;
    const preference = matchMedia('(prefers-color-scheme: dark)');
    const apply = () => {
      const resolved = state.theme === 'system' ? preference.matches ? 'dark' : 'light' : state.theme;
      document.documentElement.dataset.theme = resolved;
    };
    apply();
    preference.addEventListener('change', apply);
    return () => preference.removeEventListener('change', apply);
  }, [state.theme, ready]);
  return null;
}

const choices: { id: Theme; title: string; icon: typeof Sun }[] = [
  { id: 'light', title: 'الوضع الفاتح', icon: Sun },
  { id: 'dark', title: 'الوضع الليلي', icon: Moon },
  { id: 'system', title: 'حسب الجهاز', icon: Monitor },
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
  const CurrentIcon = choices.find(c => c.id === state.theme)?.icon ?? Monitor;
  return <details ref={ref} className="theme-control" onKeyDown={event => {
    if (event.key === 'Escape' && ref.current) { ref.current.open = false; ref.current.querySelector('summary')?.focus(); }
  }}>
    <summary aria-label="إعدادات المظهر"><CurrentIcon size={20} /><span>المظهر</span></summary>
    <div className="theme-menu" role="group" aria-label="اختيار مظهر الموقع">{choices.map(choice => <button key={choice.id} aria-pressed={state.theme === choice.id} disabled={!ready} onClick={() => { dispatch({ type: 'theme', theme: choice.id }); if (ref.current) ref.current.open = false; }}><choice.icon size={17} />{choice.title}</button>)}</div>
  </details>;
}
