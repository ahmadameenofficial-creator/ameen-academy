import Link from 'next/link';
import { ArrowLeft, ArrowUpLeft, Bookmark, CircleCheck, Heart, Sparkles } from 'lucide-react';
import { categories, entries, number } from '@/lib/catalog';
import { CategoryCard } from '@/components/category-card';
import { Explorer } from '@/components/explorer';
import { DailyProgress } from '@/components/daily-progress';
import { Reveal } from '@/components/reveal';
import { pageMetadata, siteUrl, jsonLd } from '@/lib/seo';
export const metadata=pageMetadata('/','أذكار الصباح والمساء وأذكار بعد الصلاة','سكينة: مكتبة الأذكار المكتوبة، من أذكار الصباح والمساء والنوم إلى أذكار بعد الصلاة، مع عدّادات مستقلة، ومراجع متاحة، وتطبيق قابل للتثبيت.');

export default function Home() {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:jsonLd({'@context':'https://schema.org','@graph':[{'@type':'WebSite','@id':siteUrl+'/#website',url:siteUrl+'/',name:'سكينة',alternateName:'Sakina',inLanguage:'ar',description:'مكتبة الأذكار المكتوبة مع عدّادات ومتابعة محلية'},{'@type':'Organization','@id':siteUrl+'/#organization',name:'سكينة',url:siteUrl+'/',logo:siteUrl+'/brand/sakina-logo.png'}]})}}/>
    <section className="hero container">
      <div className="hero-copy"><div className="hero-eyebrow"><span className="live-dot" /> مساحة صغيرة، لأثرٍ كبير</div><h1>ذِكرٌ يطمئنّ<br />به <span>قلبك.</span><Sparkles className="hero-spark" size={39} strokeWidth={1.1} aria-hidden="true" /></h1><p>وسط زحمة يومك، خُد لحظة لنفسك.<br />أذكارك وأدعيتك، في مساحة هادئة تليق بها.</p><div className="hero-actions"><Link href="/azkar/morning" className="button button-primary">ابدأ بأذكار الصباح <ArrowUpLeft size={20} /></Link><Link href="#library" className="hero-secondary">استكشف الأذكار <ArrowLeft size={18} /></Link></div><div className="hero-trust"><span><CircleCheck size={15} /> بدون إعلانات</span><span><Heart size={15} /> صُمّم للقراءة بهدوء</span></div></div>
      <div className="hero-art" aria-label="ألا بذكر الله تطمئن القلوب، سورة الرعد، الآية 28"><div className="ornament-ring ring-one" /><div className="ornament-ring ring-two" /><div className="ornament-ring ring-three" /><div className="art-star star-one">✦</div><div className="art-star star-two">✧</div><div className="art-star star-three">✦</div><div className="art-quote"><span className="quote-mark">۞</span><p>أَلَا بِذِكْرِ اللَّهِ<br />تَطْمَئِنُّ الْقُلُوبُ</p><span className="verse-source">سورة الرعد · الآية ٢٨</span></div><div className="art-caption"><span className="caption-line" /> لحظة ذكر، مساحة سكينة <span className="caption-line" /></div></div>
    </section>
    <div className="container"><DailyProgress /></div>
    <Reveal className="daily-section container"><div className="section-heading"><div><span className="eyebrow">رفيق يومك</span><h2>أذكار تعود إليها كل يوم</h2></div><span className="section-note">ابدأ من هنا <span>↙</span></span></div><div className="featured-grid">{categories.filter(c => c.featured).map((category, index) => <Reveal key={category.id} delay={index * 45}><CategoryCard category={category} featured /></Reveal>)}</div></Reveal>
    <Reveal className="gentle-banner container"><div className="banner-icon"><Bookmark size={28} strokeWidth={1.3} /></div><div><h2>أذكارك المفضلة، أقرب إليك.</h2><p>احفظ ما تحب، واستكمل عدّادك من حيث توقفت. كلّه على جهازك.</p></div><Link href="/saved" className="text-link">محفوظاتك <ArrowLeft size={18} /></Link></Reveal>
    <div className="container"><Explorer /></div>
    <Reveal className="closing-note container"><span>✦</span><p>لا تحتاج الكثير من الوقت.<br /><strong>فقط قلبًا حاضرًا.</strong></p><div className="closing-stats"><span><b>{number(entries.length)}</b> نصًا</span><i /><span><b>{number(categories.length)}</b> تصنيفًا</span><i /><span>مساحة بلا إعلانات</span></div></Reveal>
  </>;
}
