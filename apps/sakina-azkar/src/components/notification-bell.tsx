'use client';
import Link from 'next/link';
import { Bell, BellRing } from 'lucide-react';
import { useNotificationDevice } from '@/lib/notification-client';
export function NotificationBell() {
  const device = useNotificationDevice();
  const Icon = device?.enabled ? BellRing : Bell;
  return (
    <Link
      href="/notifications"
      className={'icon-button notification-bell' + (device?.enabled ? ' notifications-on' : '')}
      aria-label={device?.enabled ? 'إدارة إشعارات الصباح والمساء' : 'تفعيل إشعارات الصباح والمساء'}
      title="إشعارات الصباح والمساء"
    >
      <Icon size={21} strokeWidth={1.7} />
    </Link>
  );
}
