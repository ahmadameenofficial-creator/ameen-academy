'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ArrowUpLeft, BookOpen, Bookmark, Home, Search, Download, ChartNoAxesColumn } from 'lucide-react';
import { ThemeControl } from './theme';

export function SiteHeader() {
  const pathname = usePathname();
  if (pathname.startsWith('/dashboard')) return null;
  return <>
    <a className="skip-link" href="#main">انتقل إلى المحتوى</a>
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand" aria-label="سكينة، الرئيسية"><span><Image className="brand-logo" src="/brand/sakina-logo.png" alt="سكينة" width={300} height={100} priority unoptimized /><span className="brand-sub">رفيقك في الذكر</span></span></Link>
        <nav className="desktop-nav" aria-label="التنقل الرئيسي">
          <Link href="/" className={pathname === '/' ? 'active' : ''}>الرئيسية</Link>
          <Link href="/library" className={pathname.startsWith('/library') || pathname.startsWith('/azkar') ? 'active' : ''}>مكتبة الأذكار</Link>
          <Link href="/saved" className={pathname === '/saved' ? 'active' : ''}>المحفوظات</Link>
          <Link href="/progress" className={pathname === '/progress' ? 'active' : ''}>متابعتي</Link>
          <Link href="/sources" className={pathname === '/sources' ? 'active' : ''}>عن المحتوى</Link>
        </nav>
        <div className="header-actions"><ThemeControl /><Link href="/progress" className="icon-button progress-shortcut" aria-label="متابعتك الأسبوعية"><ChartNoAxesColumn size={20}/></Link><Link href="/#install" className="icon-button" aria-label="تثبيت تطبيق سكينة"><Download size={20} /></Link><Link href="/library" className="header-cta">وقتٌ للذكر <ArrowUpLeft size={17} /></Link></div>
      </div>
    </header>
    <div className="dedication-banner">
      <p>هذا الموقع صدقة جارية على روح والدي <strong>أمين علي</strong>، ففضلًا ادعوا له بالرحمة والمغفرة.</p>
    </div>
    <nav className="mobile-nav" aria-label="التنقل على الموبايل">
      {[{ href: '/', label: 'الرئيسية', icon: Home }, { href: '/library', label: 'الأذكار', icon: BookOpen }, { href: '/library?search=1', label: 'البحث', icon: Search }, { href: '/saved', label: 'المحفوظات', icon: Bookmark }].map(item => <Link key={item.label} href={item.href} className={(item.href === '/' ? pathname === '/' : item.label !== 'البحث' && pathname.startsWith(item.href)) ? 'active' : ''}><item.icon size={21} strokeWidth={1.7} /><span>{item.label}</span></Link>)}
    </nav>
  </>;
}
export function SiteFooter() {
  const pathname = usePathname();
  if (pathname.startsWith('/dashboard')) return null;
  return <footer className="site-footer container"><div><Link href="/" className="footer-brand" aria-label="سكينة، الرئيسية"><Image className="footer-logo" src="/brand/sakina-logo.png" alt="سكينة" width={300} height={100} unoptimized /></Link><p>مساحة هادئة، لقلبٍ يذكر الله.</p></div><div className="footer-links"><Link href="/sources">المصادر ومراجعة المحتوى</Link><span>بدون إعلانات. بدون حساب.</span></div></footer>;
}
