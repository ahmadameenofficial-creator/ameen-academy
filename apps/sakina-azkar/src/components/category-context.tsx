import Link from 'next/link';
import { categories } from '@/lib/catalog';
import type { Category } from '@/lib/types';
export function CategoryContext({ category }: { category: Category }) {
  const text: Record<string, string> = {
    morning:
      'هذه صفحة أذكار الصباح المكتوبة في سكينة. اقرأ كل ذكر على مهل، واستخدم عدّاده بحسب العدد المعروض. يمكنك تعديل حجم الخط والتشكيل، والرجوع إلى المراجع المدونة بجوار النصوص.',
    evening:
      'هذه صفحة أذكار المساء المكتوبة في سكينة. لكل صيغة بطاقة وعدّاد مستقلان، ويمكنك حفظ النصوص والرجوع إليها، مع الاطلاع على المراجع المتاحة والتوضيحات الخاصة بالأعداد.',
    sleep:
      'تجمع هذه الصفحة أذكار النوم في بطاقات منفصلة لسهولة القراءة والمتابعة. تظهر أعداد التكرار المدوّنة والمراجع المتاحة بجوار النصوص؛ يمكنك استخدام الوضع الليلي وحجم الخط المناسب لك.',
  };
  return (
    <section className="category-context" aria-label="عن هذا القسم">
      <h2>{category.title} في سكينة</h2>
      <p>
        {text[category.id] ??
          'نصوص ' +
            category.title +
            ' مرتبة للقراءة والمتابعة، مع عدّادات وتوضيح المراجع والأعداد المتاحة في المصدر.'}
      </p>
      <p>
        العدّاد الحر لا يفترض عدد تكرار مسنونًا. راجع{' '}
        <Link href="/sources">المصادر ومنهج مراجعة المحتوى</Link> لمعرفة أصل النصوص وحدود توثيقها.
      </p>
      {(category.id === 'morning' || category.id === 'evening') && <section className="category-faq" aria-label="أسئلة استخدام الأذكار">
        <h2>كيف تتابع {category.title}؟</h2>
        <details><summary>هل يُحفظ تقدمي قبل إكمال الأذكار؟</summary><p>نعم، تُحفظ قراءات كل عدّاد على جهازك، وتظهر نسبة التقدم الجزئي اليومية في الرئيسية وصفحة متابعتي، حتى لو لم تصل إلى 100%. يمكنك التراجع عن ضغطة خاطئة، وتتحدث النسبة وفق العدد الجديد.</p></details>
        <details><summary>هل أحتاج إلى حساب Google لقراءة الأذكار؟</summary><p>لا، القراءة والعدّادات والمتابعة متاحة للزائر. ربط Google اختياري لاستعادة متابعة حسابك بين الأجهزة، وتظل بيانات الزائر منفصلة عن بيانات الحساب.</p></details>
        <details><summary>أين أجد مصادر الأذكار وعدد التكرار؟</summary><p>تظهر المراجع المتاحة والأعداد بجوار بطاقات الأذكار. راجع صفحة المصادر لمعرفة منهج جمع النصوص وحدود مراجعتها؛ العدّاد الحر لا يحدد عددًا مسنونًا.</p></details>
        <p><Link href="/progress">افتح متابعتك اليومية</Link> أو <Link href="/library">تصفح مكتبة الأذكار</Link>.</p>
      </section>}
      <nav aria-label="أقسام أذكار مرتبطة">
        {categories
          .filter((item) => item.featured && item.id !== category.id)
          .slice(0, 5)
          .map((item) => (
            <Link key={item.id} href={'/azkar/' + item.id}>
              {item.title}
            </Link>
          ))}
      </nav>
    </section>
  );
}
