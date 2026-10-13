import type { Metadata } from 'next';
import { NotificationSettings } from '@/components/notification-settings';
export const metadata: Metadata = {
  title: 'إشعارات الصباح والمساء',
  robots: { index: false, follow: true },
};
export default function NotificationsPage() {
  return <NotificationSettings />;
}
