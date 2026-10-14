'use client';
import { useSyncExternalStore } from 'react';
import { historySnapshot, restoreHistory, subscribeHistory, switchHistoryOwner } from './history-store';
import { restoreWardCounters, switchReadingOwner } from './reading-store';
import { readingDay } from './progress';
export interface AccountState { userId: string | null; configured: boolean; ready: boolean; status: string }
const initial: AccountState = { userId: null, configured: false, ready: false, status: '' };
let state = initial;
const listeners = new Set<() => void>();
let generation = 0, revision = 0, running = false, pending = false, applying = false;
let timer: ReturnType<typeof setTimeout> | undefined;
let unsubscribeHistory: (() => void) | undefined;
function emit() { listeners.forEach(listener => listener()); }
function status(message: string) { state = { ...state, status: message }; emit(); }
function setOwner(userId: string | null) {
  if (state.ready && state.userId === userId) return;
  try { if (userId) localStorage.setItem('sakina:account:active', userId); else localStorage.removeItem('sakina:account:active'); } catch {}
  generation++;
  revision = 0;
  applying = true;
  switchHistoryOwner(userId);
  switchReadingOwner(userId);
  applying = false;
  state = { ...state, userId, ready: true };
  emit();
}
async function remoteRecords(epoch: number) {
  const response = await fetch('/api/account/progress', { cache: 'no-store' });
  if (!response.ok) throw new Error('sync');
  const data = await response.json();
  if (epoch !== generation) return false;
  applying = true;
  try { restoreHistory(data.records); restoreWardCounters(); revision = data.revision; } finally { applying = false; }
  return true;
}
export async function syncAccount() {
  if (!state.userId) return;
  pending = true;
  if (running) return;
  running = true;
  const epoch = generation;
  try {
    status('جارٍ حفظ المتابعة…');
    if (!await remoteRecords(epoch)) return;
    let attempts = 0;
    while (pending && epoch === generation && attempts++ < 4) {
      pending = false;
      const response = await fetch('/api/account/progress', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ accountId: state.userId, revision, records: historySnapshot(), today: readingDay() }) });
      if (epoch !== generation) return;
      if (response.status === 409) { if (!await remoteRecords(epoch)) return; pending = true; continue; }
      if (!response.ok) throw new Error('sync');
      revision = (await response.json()).revision;
    }
    if (epoch === generation) status(pending ? 'تغيّر السجل على جهاز آخر؛ اضغط مزامنة لإعادة المحاولة.' : 'المتابعة محفوظة في حسابك');
  } catch { if (epoch === generation) status('تقدمك محفوظ على هذا الجهاز. تعذرت المزامنة؛ أعد المحاولة عند الاتصال.'); }
  finally { running = false; }
}
export async function refreshAccount() {
  try {
    const response = await fetch('/api/account/session', { cache: 'no-store' });
    if (!response.ok) throw new Error('session');
    const data = await response.json();
    const userId = typeof data.userId === 'string' && /^[a-f0-9]{64}$/.test(data.userId) ? data.userId : null;
    setOwner(userId);
    state = { ...state, configured: data.configured === true, ready: true, status: userId ? state.status : '' };
    emit();
    if (userId) await syncAccount();
  } catch { status('يمكنك متابعة القراءة بدون اتصال.'); }
}
export async function logoutAccount() {
  const response = await fetch('/api/account/logout', { method: 'POST' });
  if (!response.ok) { status('تعذر تسجيل الخروج؛ أعد المحاولة.'); return; }
  setOwner(null);
  status('عدت إلى بيانات الزائر على هذا الجهاز');
  try { localStorage.setItem('sakina:account:changed', String(Date.now())); } catch {}
}
function changed() {
  if (applying || !state.userId) return;
  clearTimeout(timer);
  timer = setTimeout(() => { void syncAccount(); }, 800);
}
function storage(event: StorageEvent) {
  if (event.key === 'sakina:account:changed' || event.key === 'sakina:account:active') void refreshAccount();
}
export function startAccountSync() {
  try { const cached = localStorage.getItem('sakina:account:active'); if (cached && /^[a-f0-9]{64}$/.test(cached)) setOwner(cached); } catch {}
  unsubscribeHistory ??= subscribeHistory(changed);
  window.addEventListener('focus', refreshAccount);
  window.addEventListener('online', refreshAccount);
  window.addEventListener('storage', storage);
  void refreshAccount();
  return () => {
    window.removeEventListener('focus', refreshAccount);
    window.removeEventListener('online', refreshAccount);
    window.removeEventListener('storage', storage);
    unsubscribeHistory?.(); unsubscribeHistory = undefined;
    clearTimeout(timer);
  };
}
export function useAccount() {
  return useSyncExternalStore(listener => { listeners.add(listener); return () => { listeners.delete(listener); }; }, () => state, () => initial);
}
