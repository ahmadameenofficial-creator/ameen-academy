import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { SiteHeader, SiteFooter } from '@/components/site-shell';
import './globals.css';
import { ThemeSync } from '@/components/theme';
import { WebApp } from '@/components/web-app';

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
  metadataBase: new URL('https://azkar.ameen.academy'),
  manifest: '/manifest.webmanifest',
  appleWebApp: { capable: true, title: 'سكينة', statusBarStyle: 'black-translucent' },
  icons: { icon: '/icon.svg', apple: '/icons/icon-180.png' },
  openGraph: { title: 'سكينة — رفيقك في الذكر', description: 'أذكارك في مساحة هادئة، بدون إعلانات.', locale: 'ar_EG', type: 'website', images: [{ url: '/brand/social.png', width: 1200, height: 630, alt: 'شعار سكينة' }] },
  twitter: { card: 'summary_large_image', images: ['/brand/social.png'] },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover', themeColor: [{ media: '(prefers-color-scheme: light)', color: '#ffffff' }, { media: '(prefers-color-scheme: dark)', color: '#081321' }] };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const themeBootstrap = `try{var s=JSON.parse(localStorage.getItem('sakina:reading:v1')||'{}');var t=s.version===1?s.theme:'system';document.documentElement.dataset.theme=t==='dark'||t==='light'?t:matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light'}catch(e){document.documentElement.dataset.theme=matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light'}`;
  return <html lang="ar" dir="rtl" className={ibm.variable} suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: themeBootstrap }} /></head><body><ThemeSync /><SiteHeader /><main id="main">{children}</main><WebApp /><SiteFooter /></body></html>;
}
