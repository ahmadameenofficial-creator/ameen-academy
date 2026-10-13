'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
export function DashboardRefresh() {
  const router = useRouter();
  const [automatic, setAutomatic] = useState(false);
  useEffect(() => {
    if (!automatic) return;
    const timer = setInterval(() => {
      if (document.visibilityState === 'visible') router.refresh();
    }, 30000);
    return () => clearInterval(timer);
  }, [automatic, router]);
  return (
    <div className="dashboard-refresh">
      <button className="button button-secondary" onClick={() => router.refresh()}>
        تحديث الآن
      </button>
      <label>
        <input
          type="checkbox"
          checked={automatic}
          onChange={(event) => setAutomatic(event.target.checked)}
        />{' '}
        تحديث كل 30 ثانية
      </label>
    </div>
  );
}
