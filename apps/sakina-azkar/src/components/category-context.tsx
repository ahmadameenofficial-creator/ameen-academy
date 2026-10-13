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
