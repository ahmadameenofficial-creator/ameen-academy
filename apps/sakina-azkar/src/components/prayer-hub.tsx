import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { Category } from '@/lib/types';
import { Icon } from './icon';

export function PrayerHub({ children }: { children: Category[] }) {
  return <div className="container reader prayer-hub">
    <Link href="/library" className="back-link"><ArrowRight size={18} /> مكتبة الأذكار</Link>
    <header className="reader-header"><span className="reader-category-icon"><Icon name="prayer" size={36} /></span><span className="eyebrow">بعد كل صلاة، مساحة للذكر</span><h1>أذكار بعد الصلاة</h1><p>اختَر المجموعة، ثم الصلاة. لكل ذكر عدّاد واضح، ولكل صلاة تقدم مستقل.</p></header>
    <div className="prayer-group-grid">{children.map(group => <Link href={`/azkar/${group.id}`} className="prayer-group-card" key={group.id}><Icon name={group.prayers?.includes('fajr') ? 'sunrise' : 'prayer'} size={33} /><h2>{group.title}</h2><p>{group.prayers?.includes('fajr') ? 'الإخلاص والمعوذتان ثلاث مرات، والتهليل عشر مرات. دعاء العلم النافع يظهر للفجر فقط.' : 'الإخلاص والمعوذتان مرة واحدة، مع عدّادات منفصلة للتسبيح والتحميد والتكبير.'}</p><span>ابدأ القراءة <ArrowLeft size={18} /></span></Link>)}</div>
    <p className="prayer-source-note">صيغ ما بعد الصلاة وأعدادها مرتبطة بمراجعها داخل كل بطاقة. اخترنا صيغة 33/33/33 مع التهليل تمام المائة؛ توجد صيغ أخرى ثابتة.</p>
  </div>;
}
