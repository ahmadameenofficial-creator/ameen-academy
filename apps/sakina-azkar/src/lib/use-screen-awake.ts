'use client';

import { useEffect, useState } from 'react';

/** Release on exit, completion or hiding; reacquire only when the session is visible again. */
export function useScreenAwake(enabled: boolean) {
  const supported = typeof navigator !== 'undefined' && 'wakeLock' in navigator;
  const [status, setStatus] = useState<'waiting' | 'active' | 'unavailable'>('waiting');

  useEffect(() => {
    if (!enabled || !supported) return;
    let alive = true;
    let requesting = false;
    let lock: WakeLockSentinel | null = null;

    async function acquire() {
      if (!alive || requesting || lock || document.visibilityState !== 'visible') return;
      requesting = true;
      try {
        const result = await navigator.wakeLock.request('screen');
        if (!alive || document.visibilityState !== 'visible') {
          await result.release();
          return;
        }
        lock = result;
        setStatus('active');
        result.addEventListener(
          'release',
          () => {
            if (lock === result) lock = null;
            if (alive) setStatus('waiting');
          },
          { once: true },
        );
      } catch {
        if (alive) setStatus('unavailable');
      } finally {
        requesting = false;
      }
    }

    function visibility() {
      if (document.visibilityState === 'visible') void acquire();
      else if (lock) void lock.release().catch(() => {});
    }

    void acquire();
    document.addEventListener('visibilitychange', visibility);
    return () => {
      alive = false;
      document.removeEventListener('visibilitychange', visibility);
      if (lock) void lock.release().catch(() => {});
    };
  }, [enabled, supported]);

  return { supported, status: !enabled ? 'off' : !supported ? 'unsupported' : status };
}
