'use client';
import { useEffect, useState } from 'react';
import { useAccount } from '@/lib/account-store';
import { countryCodes, type AccountProfile } from '@/lib/account-profile';
const names = new Intl.DisplayNames(['ar'], { type: 'region' });
const countries = countryCodes.map(code => ({ code, name: names.of(code) ?? code })).sort((a, b) => a.name.localeCompare(b.name, 'ar'));
export function AccountProfileForm() {
  const { userId } = useAccount();
  return userId ? <ProfileFields key={userId} userId={userId} /> : null;
}
function ProfileFields({ userId }: { userId: string }) {
  const [profile, setProfile] = useState<AccountProfile | null>(null);
  const [age, setAge] = useState('');
  const [country, setCountry] = useState('');
  const [gender, setGender] = useState('');
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState('');
  useEffect(() => {
    if (!userId) return;
    const controller = new AbortController();
    fetch('/api/account/profile', { cache: 'no-store', signal: controller.signal }).then(async response => {
      if (!response.ok) throw new Error('profile');
      const data: AccountProfile = await response.json();
      if (controller.signal.aborted) return;
      setProfile(data); setAge(data.age === null ? '' : String(data.age)); setCountry(data.country ?? ''); setGender(data.gender ?? ''); setConsent(data.consent);
    }).catch(() => { if (!controller.signal.aborted) setStatus('تعذر تحميل بيانات الحساب؛ أعد فتح الصفحة عند الاتصال.'); }).finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [userId]);
  if (!userId) return null;
  async function save(clear = false) {
    setSaving(true); setStatus('');
    try {
      const response = await fetch('/api/account/profile', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ accountId: userId, age: age === '' ? null : Number(age), country: country || null, gender: gender || null, consent: clear ? false : consent }) });
      if (!response.ok) throw new Error('save');
      const data: AccountProfile = await response.json();
      setProfile(data); setAge(data.age === null ? '' : String(data.age)); setCountry(data.country ?? ''); setGender(data.gender ?? ''); setConsent(data.consent);
      setStatus(clear || !data.consent ? 'تم حذف البيانات الاختيارية.' : 'تم حفظ بياناتك الاختيارية.');
    } catch { setStatus('تعذر الحفظ. راجع البيانات وحاول مرة أخرى.'); }
    finally { setSaving(false); }
  }
  return <section id="account-profile" className="account-profile" aria-label="بيانات حسابك الاختيارية">
    <h2>بيانات حسابك</h2>
    <p>نحفظ بريد Google لربط حسابك ومتابعتك. العمر والبلد والنوع اختياريون؛ يطّلع عليهم مالك سكينة في لوحة الإدارة إذا وافقت على حفظهم. يمكنك حذفهم لاحقًا، والقراءة لا تتطلب إضافتهم.</p>
    {loading ? <p role="status">جارٍ تحميل بيانات الحساب…</p> : profile && <>
      <p className="profile-email">بريد الحساب: <b dir="ltr">{profile.email ?? 'أعد ربط Google لإظهار بريد حسابك السابق'}</b></p>
      {!profile.email && <button type="button" className="button button-secondary" onClick={() => window.location.assign('/api/account/login')}>تحديث ربط Google</button>}
      <form onSubmit={event => { event.preventDefault(); void save(); }}>
        <div className="profile-fields">
          <label>العمر (اختياري)<input type="number" inputMode="numeric" min={1} max={120} step={1} value={age} onChange={event => setAge(event.target.value)} /></label>
          <label>بلد الإقامة (اختياري)<select value={country} onChange={event => setCountry(event.target.value)}><option value="">أفضل عدم تحديد البلد</option>{countries.map(item => <option key={item.code} value={item.code}>{item.name}</option>)}</select></label>
          <label>النوع (اختياري)<select value={gender} onChange={event => setGender(event.target.value)}><option value="">أفضل عدم ذكره</option><option value="male">ذكر</option><option value="female">أنثى</option></select></label>
        </div>
        <label className="profile-consent"><input type="checkbox" checked={consent} onChange={event => setConsent(event.target.checked)} />أوافق على حفظ هذه البيانات الاختيارية وعرضها لمالك سكينة في لوحة الإدارة.</label>
        <div className="account-actions"><button className="button button-primary" type="submit" disabled={saving}>حفظ البيانات</button><button className="button button-secondary" type="button" disabled={saving} onClick={() => void save(true)}>حذف البيانات الاختيارية</button></div>
      </form>
    </>}
    {status && <p role="status">{status}</p>}
  </section>;
}
