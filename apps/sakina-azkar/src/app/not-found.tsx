import Link from 'next/link';
export default function NotFound() {
  return <div className="container empty-state not-found"><span className="eyebrow">٤٠٤</span><h1>الصفحة غير موجودة</h1><p>يمكنك الرجوع للمكتبة واختيار القسم الذي تبحث عنه.</p><Link href="/library" className="button button-primary">مكتبة الأذكار</Link></div>;
}
