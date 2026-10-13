'use client';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { recordAnalytics } from '@/lib/analytics-client';
import { Download, WifiOff, Check, RefreshCw, X } from 'lucide-react';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { number } from '@/lib/text';

interface InstallPrompt extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}
type OfflineStatus = 'preparing' | 'ready' | 'unavailable';
const subscribeNetwork = (callback: () => void) => {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () => { window.removeEventListener('online', callback); window.removeEventListener('offline', callback); };
};

export function WebApp() {
  const pathname = usePathname();
  return pathname.startsWith('/dashboard') ? null : <WebAppContent />;
}
function WebAppContent() {
  const online = useSyncExternalStore(subscribeNetwork, () => navigator.onLine, () => true);
  const [prompt, setPrompt] = useState<InstallPrompt | null>(null);
  const [installed, setInstalled] = useState(false);
  const [status, setStatus] = useState<OfflineStatus>('preparing');
  const [progress, setProgress] = useState(0);
  const [update, setUpdate] = useState<ServiceWorker | null>(null);
  const [instructions, setInstructions] = useState(false);
  const [installMessage, setInstallMessage] = useState('');
  const reloadForUpdate = useRef(false);

  useEffect(() => {
    const beforeInstall = (event: Event) => { event.preventDefault(); setPrompt(event as InstallPrompt); };
    const appInstalled = () => { setInstalled(true); setPrompt(null); recordAnalytics('install'); };
    window.addEventListener('beforeinstallprompt', beforeInstall);
    window.addEventListener('appinstalled', appInstalled);
    const display = matchMedia('(display-mode: standalone)');
    const displayChanged = () => setInstalled(display.matches || Boolean((navigator as Navigator & { standalone?: boolean }).standalone));
    queueMicrotask(displayChanged);
    display.addEventListener('change', displayChanged);
    return () => {
      window.removeEventListener('beforeinstallprompt', beforeInstall);
      window.removeEventListener('appinstalled', appInstalled);
      display.removeEventListener('change', displayChanged);
    };
  }, []);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return;
    if (!('serviceWorker' in navigator)) {
      queueMicrotask(() => setStatus('unavailable'));
      return;
    }
    let alive = true;
    const message = (event: MessageEvent) => {
      if (event.data?.type === 'OFFLINE_READY') setStatus(current => { if (current !== 'ready') recordAnalytics('offline_ready'); return 'ready'; });
      if (event.data?.type === 'OFFLINE_FAILED') setStatus(current => current === 'ready' ? current : 'unavailable');
      if (event.data?.type === 'OFFLINE_PROGRESS' && event.data.total > 0) {
        setProgress(Math.min(100, Math.round(event.data.completed / event.data.total * 100)));
      }
    };
    const controllerChanged = () => {
      if (reloadForUpdate.current) window.location.reload();
      else navigator.serviceWorker.controller?.postMessage({ type: 'OFFLINE_STATUS' });
    };
    navigator.serviceWorker.addEventListener('message', message);
    navigator.serviceWorker.addEventListener('controllerchange', controllerChanged);
    async function register() {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js', { scope: '/', updateViaCache: 'none' });
        if (!alive) return;
        if (registration.waiting) setUpdate(registration.waiting);
        registration.addEventListener('updatefound', () => {
          const worker = registration.installing;
          worker?.addEventListener('statechange', () => {
            if (!alive) return;
            if (worker.state === 'installed' && navigator.serviceWorker.controller) setUpdate(worker);
            if (worker.state === 'redundant' && !registration.active) setStatus('unavailable');
          });
        });
        const ready = await navigator.serviceWorker.ready;
        if (alive) ready.active?.postMessage({ type: 'OFFLINE_STATUS' });
      } catch {
        if (alive) setStatus('unavailable');
      }
    }
    void register();
    return () => {
      alive = false;
      navigator.serviceWorker.removeEventListener('message', message);
      navigator.serviceWorker.removeEventListener('controllerchange', controllerChanged);
    };
  }, []);

  async function install() {
    if (!prompt) { setInstructions(true); return; }
    try {
      await prompt.prompt();
      const choice = await prompt.userChoice;
      setPrompt(null);
      if (choice.outcome === 'accepted') setInstalled(true);
    } catch { setInstallMessage('تعذّر فتح نافذة التثبيت. جرّب إضافة التطبيق من قائمة المتصفح.'); }
  }

  return <>
    {!online && <div className="connection-notice" role="status"><WifiOff size={18} />
      {status === 'ready' ? 'أنت بدون إنترنت. الأذكار والعدّادات متاحة على جهازك.' : 'أنت بدون إنترنت. لم يكتمل حفظ مكتبة الأذكار بعد.'}
    </div>}
    <section id="install" className="web-app-panel container" aria-label="تطبيق سكينة">
      <div className="app-identity"><Image src="/brand/sakina-logo.png" width={300} height={100} alt="سكينة" className="app-logo" unoptimized />
        <div><h2>{installed ? 'سكينة على جهازك' : 'سكينة، أقرب إليك'}</h2><p>أضفه للشاشة الرئيسية، وافتح أذكارك كتطبيق.</p></div>
      </div>
      <div className="app-controls">
        {!installed && <button className="button button-primary" onClick={install}><Download size={19} /> تثبيت التطبيق</button>}
        <p className="offline-status" role="status" data-offline-status={status}>
          {status === 'ready' ? <><Check size={17} /> كل الأذكار جاهزة بدون إنترنت</>
            : status === 'preparing' ? <>جارٍ حفظ الأذكار على جهازك{progress > 0 ? ' · ' + number(progress) + '%' : '…'}</>
            : 'الحفظ بدون إنترنت غير متاح الآن؛ يمكنك استخدام الموقع أثناء الاتصال.'}
        </p>
      </div>
      {instructions && <div className="install-instructions" role="group" aria-label="طريقة تثبيت التطبيق">
        <div><h3>إضافة سكينة للشاشة الرئيسية</h3><button className="icon-button" onClick={() => setInstructions(false)} aria-label="إغلاق تعليمات التثبيت"><X size={19} /></button></div>
        <p>على iPhone أو iPad: افتح سكينة في Safari، اضغط «مشاركة»، ثم «إضافة إلى الشاشة الرئيسية».</p>
        <p>على Android أو الكمبيوتر: افتح قائمة المتصفح، ثم اختر «تثبيت التطبيق» أو «إضافة إلى الشاشة الرئيسية».</p>
      </div>}
      {installMessage && <p className="inline-message" role="status">{installMessage}</p>}
      {update && <div className="app-update" role="status"><p>نسخة جديدة جاهزة. عدّاداتك ومحفوظاتك ستبقى.</p>
        <button className="button button-secondary" onClick={() => { reloadForUpdate.current = true; update.postMessage({ type: 'SKIP_WAITING' }); }}><RefreshCw size={18} /> تحديث التطبيق</button>
      </div>}
    </section>
  </>;
}
