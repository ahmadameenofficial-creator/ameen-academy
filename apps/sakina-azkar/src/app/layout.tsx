import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { SiteHeader, SiteFooter } from '@/components/site-shell';
import './globals.css';

const ibm = localFont({
  src: [
    { path: '../../public/fonts/ibm-arabic-regular.ttf', weight: '400', style: 'normal' },
    { path: '../../public/fonts/ibm-arabic-medium.ttf', weight: '500', style: 'normal' },
    { path: '../../public/fonts/ibm-arabic-semibold.ttf', weight: '600', style: 'normal' },
    { path: '../../public/fonts/ibm-arabic-bold.ttf', weight: '700', style: 'normal' },
  ],
  variable: '--font-ibm', display: 'swap',
});
export const metadata: Metadata = {
  title: { default: 'سكينة — رفيقك في الذكر', template: '%s | سكينة' },
  description: 'مكتبة الأذكار والأدعية، بتجربة قراءة هادئة، وعدّادات ومحفوظات على جهازك. بدون إعلانات.',
  applicationName: 'سكينة',
  robots: { index: true, follow: true },
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#7a2038' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="ar" dir="rtl" className={ibm.variable}><body><SiteHeader /><main id="main">{children}</main><SiteFooter /></body></html>;
}
