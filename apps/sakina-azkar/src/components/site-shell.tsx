'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpLeft, BookOpen, Bookmark, Home, Search } from 'lucide-react';
import { Icon } from './icon';

export function SiteHeader() {
  const pathname = usePathname();
  return <>
    <a className="skip-link" href="#main">انتقل إلى المحتوى</a>
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand" aria-label="سكينة، الرئيسية"><span className="brand-mark"><Icon name="sparkles" size={27} /></span><span>سكينة<span className="brand-sub">رفيقك في الذكر</span></span></Link>
        <nav className="desktop-nav" aria-label="التنقل الرئيسي">
          <Link href="/" className={pathname === '/' ? 'active' : ''}>الرئيسية</Link>
          <Link href="/library" className={pathname.startsWith('/library') || pathname.startsWith('/azkar') ? 'active' : ''}>مكتبة الأذكار</Link>
          <Link href="/saved" className={pathname === '/saved' ? 'active' : ''}>المحفوظات</Link>
          <Link href="/sources" className={pathname === '/sources' ? 'active' : ''}>عن المحتوى</Link>
        </nav>
        <Link href="/library" className="header-cta">وقتٌ للذكر <ArrowUpLeft size={17} /></Link>
      </div>
    </header>
    <nav className="mobile-nav" aria-label="التنقل على الموبايل">
      {[{ href: '/', label: 'الرئيسية', icon: Home }, { href: '/library', label: 'الأذكار', icon: BookOpen }, { href: '/library?search=1', label: 'البحث', icon: Search }, { href: '/saved', label: 'المحفوظات', icon: Bookmark }].map(item => <Link key={item.label} href={item.href} className={(item.href === '/' ? pathname === '/' : item.label !== 'البحث' && pathname.startsWith(item.href)) ? 'active' : ''}><item.icon size={21} strokeWidth={1.7} /><span>{item.label}</span></Link>)}
    </nav>
  </>;
}
export function SiteFooter() {
  return <footer className="site-footer container"><div><Link href="/" className="footer-brand">سكينة<span className="tiny-star">✦</span></Link><p>مساحة هادئة، لقلبٍ يذكر الله.</p></div><div className="footer-links"><Link href="/sources">المصادر ومراجعة المحتوى</Link><span>بدون إعلانات. بدون حساب.</span></div></footer>;
}
