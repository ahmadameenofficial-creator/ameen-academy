import Link from 'next/link';
import { accountDirectory } from '@/lib/account-db';
import { number } from '@/lib/text';
const genderNames = { male: 'ذكر', female: 'أنثى', unspecified: 'غير محدد' };
const countries = new Intl.DisplayNames(['ar'], { type: 'region' });
function date(value: string) {
  return new Intl.DateTimeFormat('ar-EG', { dateStyle: 'medium', timeZone: 'Africa/Cairo' }).format(new Date(value));
}
export async function AccountDirectory({ page, from, to }: { page: number; from: string; to: string }) {
  let data;
  try { data = await accountDirectory(page); }
  catch { return <section className="dashboard-card"><h2>حسابات Google</h2><p>تعذر تحميل بيانات الحسابات؛ أعد المحاولة لاحقًا.</p></section>; }
  const href = (index: number) => '/dashboard?from=' + from + '&to=' + to + '&accountsPage=' + index + '#registered-accounts';
  return <section id="registered-accounts" className="dashboard-card account-directory">
    <div className="account-directory-heading"><h2>حسابات Google</h2><strong>{number(data.total)} حساب</strong></div>
    <p className="dashboard-card-note">البريد مرتبط بهوية Google. العمر وبلد الإقامة والنوع بيانات يضيفها المستخدم طوعًا، وليست استنتاجًا من Google أو عنوان الشبكة. الحسابات مستقلة عن إحصائيات الزوار المجهولة.</p>
    {data.accounts.length ? <>
      <div className="account-table-wrap"><table>
        <caption>بيانات الحسابات المسجلة، مرتبة حسب آخر ظهور</caption>
        <thead><tr><th scope="col">بريد Google</th><th scope="col">العمر</th><th scope="col">بلد الإقامة</th><th scope="col">النوع</th><th scope="col">تاريخ الربط</th><th scope="col">آخر ظهور</th></tr></thead>
        <tbody>{data.accounts.map((account, index) => <tr key={account.email ?? String(index)}>
          <td dir="ltr">{account.email ?? 'حساب سابق؛ لم يُضف البريد بعد'}</td>
          <td>{account.consent && account.age !== null ? number(account.age) : 'غير مضاف'}</td>
          <td>{account.consent && account.country ? countries.of(account.country) ?? account.country : 'غير مضاف'}</td>
          <td>{account.consent && account.gender ? genderNames[account.gender] : 'غير مضاف'}</td>
          <td>{date(account.created_at)}</td><td>{date(account.last_seen)}</td>
        </tr>)}</tbody>
      </table></div>
      {data.pages > 1 && <nav className="account-pagination" aria-label="صفحات الحسابات">{data.page > 1 && <Link href={href(data.page - 1)}>السابق</Link>}<span>صفحة {number(data.page)} من {number(data.pages)}</span>{data.page < data.pages && <Link href={href(data.page + 1)}>التالي</Link>}</nav>}
    </> : <p className="dashboard-empty-small">ستظهر الحسابات هنا بعد تسجيل الدخول إلى Google. لا توجد بيانات شخصية تجريبية.</p>}
  </section>;
}
