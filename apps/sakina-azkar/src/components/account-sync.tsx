'use client';
import Link from 'next/link';
import { LogIn, UserRound } from 'lucide-react';
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
    <p>{account.userId ? 'هذه بيانات حسابك. بيانات الزائر مستقلة وستعود إليها عند تسجيل الخروج.' : 'كل المزايا تعمل بدون حساب. اربط Google اختياريًا لحفظ متابعتك واستعادتها؛ بيانات الزائر لن تُنقل تلقائيًا إلى الحساب. نحتفظ ببريد Google لإدارة حسابك، وأي بيانات إضافية تكون اختيارية.'}</p>
    {!account.ready ? <p role="status">جارٍ التحقق من الربط…</p> : account.userId ? <div className="account-actions"><button className="button button-primary" onClick={() => void syncAccount()}>مزامنة الآن</button><button className="button button-secondary" onClick={() => void logoutAccount()}>تسجيل الخروج</button></div> : account.configured ? <button className="button button-secondary" onClick={() => { window.location.assign('/api/account/login'); }}>ربط Google</button> : <p>ربط Google غير متاح حاليًا؛ متابعتك محفوظة على هذا الجهاز.</p>}
    {account.status && <p role="status">{account.status}</p>}
  </section>;
}

export function AccountHeader() {
  const account = useAccount();
  if (!account.ready || (!account.configured && !account.userId)) return null;
  return account.userId ? <Link className="header-account" href="/progress#account-profile" aria-label="حسابي وبياناتي"><UserRound size={18} /><span>حسابي</span></Link> : <button className="header-account" aria-label="ربط Google" title="ربط Google لحفظ متابعتك بين الأجهزة" onClick={() => window.location.assign('/api/account/login')}><LogIn size={18} /><span>ربط Google</span></button>;
}
