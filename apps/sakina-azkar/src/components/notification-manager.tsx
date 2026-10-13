'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useReading } from '@/lib/reading-store';
import {
  notificationRequest,
  clearNotificationDevice,
  saveNotificationDevice,
  useNotificationDevice,
  wardProgress,
} from '@/lib/notification-client';
export function NotificationManager() {
  const pathname = usePathname();
  return pathname.startsWith('/dashboard') ? null : <ProgressSync />;
}
function ProgressSync() {
  const device = useNotificationDevice();
  const { state, ready } = useReading();
  const progress = JSON.stringify(wardProgress(state.day, state.counts));
  useEffect(() => {
    if (!ready || !device || (!device.enabled && !device.removing)) return;
    let busy = false,
      stopped = false;
    async function sync(keepalive = false) {
      if (busy || stopped || !navigator.onLine) return;
      busy = true;
      try {
        if (!device) return;
        if (!device.enabled) {
          await notificationRequest('unsubscribe', { id: device.id, token: device.token });
          clearNotificationDevice(device.id);
          return;
        }
        await notificationRequest(
          'progress',
          { id: device.id, token: device.token, progress: JSON.parse(progress) },
          keepalive,
        );
      } catch (error) {
        if (
          device?.enabled &&
          error &&
          typeof error === 'object' &&
          'status' in error &&
          error.status === 403
        ) {
          saveNotificationDevice({ ...device, enabled: false, removing: false });
        }
        /* The persisted reading state is retried on visibility, reconnection and next visit. */
      } finally {
        busy = false;
      }
    }
    const changed = () => {
      void sync(document.visibilityState !== 'visible');
    };
    const timer = window.setTimeout(() => {
      void sync();
    }, 750);
    const retry = window.setInterval(() => {
      void sync();
    }, 60000);
    window.addEventListener('online', changed);
    document.addEventListener('visibilitychange', changed);
    return () => {
      stopped = true;
      window.clearTimeout(timer);
      window.clearInterval(retry);
      window.removeEventListener('online', changed);
      document.removeEventListener('visibilitychange', changed);
    };
  }, [device, progress, ready]);
  return null;
}
