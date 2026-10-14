import { HandHeart, ArrowUpLeft } from 'lucide-react';
export function SponsorBanner({ placement }: { placement: 'header' | 'library' }) {
  if (placement === 'header') return <aside className="sponsor-banner sponsor-top" aria-label="مساحة إعلانية هادفة"><div className="container sponsor-top-inner"><span>مساحة إعلانية هادفة لدعم استمرار سكينة</span><a href="https://wa.me/201090912747?text=%D8%B4%D8%B1%D8%A7%D8%A1%20%D9%85%D8%B3%D8%A7%D8%AD%D8%A9%20%D8%A5%D8%B9%D9%84%D8%A7%D9%86%D9%8A%D8%A9%20%D9%81%D9%8A%20%D8%B3%D9%83%D9%8A%D9%86%D8%A9" target="_blank" rel="noopener noreferrer">اشتري مساحتك الإعلانية هنا <ArrowUpLeft size={16} /></a></div></aside>;
  return <aside className="sponsor-banner container" aria-label="مساحة إعلانية هادفة">
    <span className="sponsor-icon" aria-hidden="true"><HandHeart size={24} /></span>
    <div className="sponsor-copy">
      <span className="sponsor-label">مساحة إعلانية هادفة</span>
      <h2>أثر طيب، يدعم استمرار سكينة</h2>
      <p>رعاية محترمة ومختارة بعناية، دون محتوى مسيء أو إزعاج للقراءة.</p>
    </div>
    <a className="sponsor-contact" target="_blank" rel="noopener noreferrer" aria-label="تواصل للرعاية عبر واتساب: +201090912747" href="https://wa.me/201090912747?text=%D9%85%D8%B1%D8%AD%D8%A8%D9%8B%D8%A7%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%B1%D8%B9%D8%A7%D9%8A%D8%A9%20%D8%B3%D9%83%D9%8A%D9%86%D8%A9">تواصل للرعاية <ArrowUpLeft size={17} /></a>
  </aside>;
}
