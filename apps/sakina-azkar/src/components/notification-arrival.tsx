'use client';
import { useEffect, useRef, useState } from 'react';
import { notificationHadiths, type Ward } from '@/lib/notification-messages';
import { useReading } from '@/lib/reading-store';
import type { Dhikr } from '@/lib/types';
export function NotificationArrival({ ward, entries }: { ward: Ward; entries: Dhikr[] }) {
  const { state, ready } = useReading();
  const [hadithId, setHadithId] = useState('');
  const followed = useRef(false);
  useEffect(() => {
    if (!ready || followed.current) return;
    const query = new URLSearchParams(window.location.search);
    const hadith = notificationHadiths.find((item) => item.id === query.get('hadith'));
    if (query.get('reminder') !== ward || !hadith) return;
    followed.current = true;
    queueMicrotask(() => setHadithId(hadith.id));
  }, [ready, ward]);
  const hadith = notificationHadiths.find((item) => item.id === hadithId);
  if (!hadith) return null;
  const next = entries.find(
    (entry) => entry.repeat !== null && (state.counts[entry.id] ?? 0) < entry.repeat,
  );
  return (
    <aside className="notification-arrival" aria-label="الحديث الوارد في التذكير">
      <p>قال رسول الله ﷺ: «{hadith.text}»</p>
      <a href={hadith.url} target="_blank" rel="noopener noreferrer">
        {hadith.source} — مصدر الحديث
      </a>
      {next ? (
        <button
          className="text-link"
          onClick={() => {
            const card = document.getElementById(next.id);
            card?.scrollIntoView({
              behavior: matchMedia('(prefers-reduced-motion: reduce)').matches
                ? 'instant'
                : 'smooth',
              block: 'center',
            });
            card?.querySelector<HTMLButtonElement>('.count-button')?.focus({ preventScroll: true });
          }}
        >
          استكمال أول ذكر غير مكتمل
        </button>
      ) : (
        <span>أتممت بطاقات الورد ذات العدد المحدد. تقبّل الله منك.</span>
      )}
    </aside>
  );
}
