'use client';
export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <div className="container empty-state"><h1>تعذّر عرض الصفحة</h1><p>حاول مرة أخرى. محفوظاتك تبقى في متصفحك.</p><button className="button button-primary" onClick={reset}>إعادة المحاولة</button></div>;
}
