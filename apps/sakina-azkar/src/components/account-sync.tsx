'use client';
import { useEffect } from 'react';
import { startAccountSync, useAccount, syncAccount, logoutAccount } from '@/lib/account-store';
export function AccountSync() {
  useEffect(startAccountSync, []);
  return null;
}
export function AccountControls() {
  const account = useAccount();
  return <section className="account-controls" aria-label="حفظ المتابعة بين الأجهزة">
    <h2>متابعتك معك، بين الأجهزة</h2>
    <p>{account.userId ? 'هذه بيانات حسابك. بيانات الزائر مستقلة وستعود إليها عند تسجيل الخروج.' : 'كل المزايا تعمل بدون حساب. اربط Google اختياريًا لحفظ متابعتك واستعادتها؛ بيانات الزائر لن تُنقل تلقائيًا إلى الحساب.'}</p>
    {!account.ready ? <p role="status">جارٍ التحقق من الربط…</p> : account.userId ? <div className="account-actions"><button className="button button-primary" onClick={() => void syncAccount()}>مزامنة الآن</button><button className="button button-secondary" onClick={() => void logoutAccount()}>تسجيل الخروج</button></div> : account.configured ? <button className="button button-secondary" onClick={() => { window.location.assign('/api/account/login'); }}>ربط Google</button> : <p>ربط Google غير متاح حاليًا؛ متابعتك محفوظة على هذا الجهاز.</p>}
    {account.status && <p role="status">{account.status}</p>}
  </section>;
}
