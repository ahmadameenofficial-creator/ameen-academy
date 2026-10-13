'use client';
import { useEffect, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { Bell, BellOff, Check, ChevronLeft, LoaderCircle, Moon, Sun } from 'lucide-react';
import { defaultReminderPreferences, reminderCities } from '@/lib/notification-contract';
import {
  newNotificationDevice,
  clearNotificationDevice,
  notificationPermission,
  notificationRegistration,
  notificationRequest,
  saveNotificationDevice,
  useNotificationDevice,
  wardProgress,
} from '@/lib/notification-client';
import { notificationHadiths, notificationMessage, type Ward } from '@/lib/notification-messages';
import { useReading } from '@/lib/reading-store';
const subscribePermission = (listener: () => void) => {
  window.addEventListener('focus', listener);
  document.addEventListener('visibilitychange', listener);
  return () => {
    window.removeEventListener('focus', listener);
    document.removeEventListener('visibilitychange', listener);
  };
};
type Configuration = {
  enabled: boolean;
  schedulerActive: boolean;
  publicKey: string | null;
  slots: { ward: Ward; at: string; phase: string }[];
};
export function NotificationSettings() {
  const device = useNotificationDevice();
  const { state, ready } = useReading();
  const permission = useSyncExternalStore(
    subscribePermission,
    notificationPermission,
    () => 'unknown',
  );
  const [preferences, setPreferences] = useState(device?.preferences ?? defaultReminderPreferences);
  const [configuration, setConfiguration] = useState<Configuration | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);
  const [ward, setWard] = useState<Ward>('morning');
  const [sequence, setSequence] = useState(0);
  const progress = wardProgress(state.day, state.counts);
  const preview = notificationMessage(
    ward,
    progress[ward] === 'started' ? 'started' : 'not-started',
    sequence,
    'preview',
  );
  const hadith = notificationHadiths[sequence % notificationHadiths.length];
  const city = reminderCities.find((city) => city.id === preferences.city)!;
  useEffect(() => {
    if (device) queueMicrotask(() => setPreferences(device.preferences));
  }, [device]);
  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/notifications/config?city=' + preferences.city, {
      signal: controller.signal,
      cache: 'no-store',
    })
      .then((response) => {
        if (!response.ok) throw new Error();
        return response.json();
      })
      .then(setConfiguration)
      .catch(() => {
        if (!controller.signal.aborted)
          setMessage('تعذّر الاتصال بخدمة الإشعارات. حاول عند عودة الإنترنت.');
      });
    return () => controller.abort();
  }, [preferences.city]);

  async function enable() {
    let activation: { id: string; token: string } | undefined;
    let subscription: PushSubscription | null = null;
    if (!consent && !device?.enabled) {
      setMessage('فعّل الموافقة على التذكير أولًا.');
      return;
    }
    if (!preferences.morning && !preferences.evening) {
      setMessage('اختر الصباح أو المساء لتفعيل التذكير.');
      return;
    }
    setBusy(true);
    setMessage('');
    try {
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        setMessage(
          permission === 'denied'
            ? 'الإشعارات محظورة. اسمح بها من إعدادات الموقع في المتصفح، ثم ارجع للتفعيل.'
            : 'لم يتم السماح بالإشعارات. يمكنك تفعيلها وقتما تحب.',
        );
        return;
      }
      if (!configuration?.enabled || !configuration.publicKey) {
        setMessage(
          'تم السماح بالإشعارات على جهازك. خدمة التذكير التلقائي تحتاج إكمال إعدادها؛ يمكنك تجربة إشعار الآن.',
        );
        return;
      }
      const registration = await notificationRegistration();
      subscription = await registration.pushManager.getSubscription();
      const applicationServerKey = Uint8Array.from(
        atob(configuration.publicKey.replace(/-/g, '+').replace(/_/g, '/')),
        (character) => character.charCodeAt(0),
      );
      if (!subscription)
        subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey,
        });
      const candidate =
        device && !device.removing
          ? { ...device, preferences }
          : newNotificationDevice(preferences);
      // Persist management credentials before enrollment so failed storage cannot leave an unmanaged subscription.
      saveNotificationDevice(candidate);
      activation = candidate;
      await notificationRequest('subscribe', {
        id: candidate.id,
        token: candidate.token,
        subscription: subscription.toJSON(),
        preferences,
        progress,
        consent: true,
      });
      saveNotificationDevice({ ...candidate, enabled: true });
      setMessage(
        configuration.schedulerActive
          ? 'تم تفعيل التذكير. سنذكّرك بالبدء أو الاستكمال، ويتوقف تذكير الورد بعد إتمامه.'
          : 'تم حفظ اشتراك الجهاز. الإرسال التلقائي يبدأ عند تشغيل خدمة التذكير.',
      );
    } catch (error) {
      if (activation && !device?.enabled) {
        try {
          await subscription?.unsubscribe();
        } catch {}
        try {
          await notificationRequest('unsubscribe', activation);
          clearNotificationDevice(activation.id);
        } catch {}
      } else if (device?.enabled) {
        try {
          saveNotificationDevice(device);
        } catch {}
      }
      setMessage(
        error instanceof Error && error.message === 'worker-update-required'
          ? 'انتظر اكتمال تجهيز سكينة، واضغط «تحديث التطبيق» أسفل الصفحة إن ظهر، ثم أعد التفعيل.'
          : 'تعذّر حفظ أو تفعيل التذكير. تأكد من الاتصال والسماح بالتخزين، ثم جرّب مرة أخرى.',
      );
    } finally {
      setBusy(false);
    }
  }
  async function disable() {
    setBusy(true);
    try {
      const registration = await navigator.serviceWorker.getRegistration('/');
      const subscription = await registration?.pushManager.getSubscription();
      if (subscription && !(await subscription.unsubscribe())) throw new Error();
      if (device) {
        saveNotificationDevice({ ...device, enabled: false, removing: true });
        try {
          await notificationRequest('unsubscribe', { id: device.id, token: device.token });
          clearNotificationDevice(device.id);
        } catch {}
      }
      setMessage('تم إيقاف اشتراك الإشعارات على هذا الجهاز.');
    } catch {
      setMessage('تعذّر إيقاف الاشتراك. يمكنك حظر الإشعارات من إعدادات الموقع في المتصفح.');
    } finally {
      setBusy(false);
    }
  }
  async function testNotification() {
    setBusy(true);
    try {
      if (Notification.permission !== 'granted') {
        setMessage('اسمح بالإشعارات على جهازك أولًا.');
        return;
      }
      const registration = await notificationRegistration();
      const payload = notificationMessage(ward, progress[ward], sequence, crypto.randomUUID());
      await registration.showNotification(payload.title, {
        body: payload.body,
        lang: 'ar',
        dir: 'rtl',
        icon: '/icons/icon-192.png',
        badge: '/icons/notification-badge.png',
        tag: 'sakina-test',
        data: { ward, hadith: payload.hadith },
      });
      setSequence((value) => value + 1);
      setMessage('تم طلب عرض إشعار تجريبي. قد تمنعه إعدادات عدم الإزعاج أو النظام.');
    } catch (error) {
      setMessage(
        error instanceof Error && error.message === 'worker-update-required'
          ? 'حدّث سكينة من زر «تحديث التطبيق» أسفل الصفحة، ثم جرّب الإشعار مرة أخرى.'
          : 'تعذّر عرض الإشعار. تأكد من إذن المتصفح واكتمال تجهيز التطبيق.',
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="notification-page container">
      <Link href={'/azkar/' + ward} className="back-link">
        العودة لأذكار {ward === 'morning' ? 'الصباح' : 'المساء'}
      </Link>
      <header className="notification-heading">
        <span>
          <Bell size={32} />
        </span>
        <div>
          <span className="eyebrow">تذكير هادئ، وفضل عظيم</span>
          <h1>إشعارات الصباح والمساء</h1>
          <p>ابدأ وردك، أو كمّله من مكانك. وفي كل تذكير حديث عن فضل الذكر.</p>
        </div>
      </header>
      <div className="notification-grid">
        <section className="notification-panel" aria-label="إعدادات تذكير الأذكار">
          <h2>تذكير يناسب يومك</h2>
          <div className="notification-city">
            <label htmlFor="notification-city">المدينة</label>
            <select
              id="notification-city"
              value={preferences.city}
              onChange={(event) => {
                setConfiguration(null);
                setPreferences({ ...preferences, city: event.target.value });
              }}
            >
              {reminderCities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.title}
                </option>
              ))}
            </select>
          </div>
          <p className="notification-hint">
            الصباح بعد الفجر بـ 15 دقيقة، والمساء بعد العصر بـ 15 دقيقة، بتوقيت المدينة المختارة.
          </p>
          <div className="notification-wards">
            {(['morning', 'evening'] as const).map((ward) => (
              <label key={ward}>
                <input
                  type="checkbox"
                  checked={preferences[ward]}
                  onChange={(event) =>
                    setPreferences({ ...preferences, [ward]: event.target.checked })
                  }
                />
                {ward === 'morning' ? <Sun size={20} /> : <Moon size={20} />}
                <span>أذكار {ward === 'morning' ? 'الصباح' : 'المساء'}</span>
              </label>
            ))}
          </div>
          <label className="notification-check">
            <input
              type="checkbox"
              checked={preferences.followup}
              onChange={(event) =>
                setPreferences({ ...preferences, followup: event.target.checked })
              }
            />
            <span>
              تذكير واحد بالاستكمال
              <small>قبل الشروق أو المغرب بنحو 20 دقيقة، إذا لم تُتمّ الورد.</small>
            </span>
          </label>
          <p className="notification-hint">
            حد أقصى تذكيران لكل ورد في اليوم. الأوقات محسوبة تقريبيًا؛ راجع مواقيت مسجدك. نعتمد
            الوقت المفضّل للذكر، مع وجود خلاف معتبر في امتداده.
          </p>
          {configuration && (
            <ul className="notification-times">
              {configuration.slots
                .filter((slot) => slot.phase === 'start')
                .map((slot) => (
                  <li key={slot.ward}>
                    {slot.ward === 'morning' ? 'تذكير الصباح اليوم' : 'تذكير المساء اليوم'}
                    <b>
                      {new Intl.DateTimeFormat('en-GB', {
                        timeZone: city.zone,
                        hour: '2-digit',
                        minute: '2-digit',
                        hourCycle: 'h23',
                        numberingSystem: 'latn',
                      }).format(new Date(slot.at))}
                    </b>
                  </li>
                ))}
            </ul>
          )}
          {!device?.enabled && (
            <label className="notification-check notification-consent">
              <input
                type="checkbox"
                checked={consent}
                onChange={(event) => setConsent(event.target.checked)}
              />
              <span>
                أوافق على تذكيرات الصباح والمساء
                <small>
                  نحفظ اشتراك هذا الجهاز والمدينة وحالة بدء وإتمام الورد لإيقاف التذكير. لا نرسل
                  نصوصك أو محفوظاتك، والموافقة مستقلة عن الإحصائيات.
                </small>
              </span>
            </label>
          )}
          {permission === 'install-required' ? (
            <div className="notification-notice">
              <h3>على iPhone وiPad</h3>
              <p>
                افتح سكينة في Safari، ثم «مشاركة» ← «إضافة إلى الشاشة الرئيسية». افتح التطبيق
                المثبّت لتفعيل الإشعارات. يتطلب iOS أو iPadOS 16.4 أو أحدث.
              </p>
              <Link href="/#install">طريقة تثبيت سكينة</Link>
            </div>
          ) : permission === 'unsupported' ? (
            <p className="notification-notice">
              الإشعارات غير مدعومة في هذا المتصفح. جرّب متصفحًا حديثًا أو تطبيق سكينة المثبّت.
            </p>
          ) : permission === 'denied' ? (
            <p className="notification-notice">
              إذن الإشعارات محظور. افتح إعدادات الموقع في المتصفح واسمح بالإشعارات؛ لا يمكن للموقع
              تغيير هذا الإذن بنفسه.
            </p>
          ) : null}
          {configuration?.enabled === false && (
            <p className="notification-notice">
              خدمة التذكير التلقائي قيد الإعداد. يمكنك تفعيل إذن الجهاز وتجربة الرسالة؛ التذكيرات
              المجدولة تبدأ بعد ربط خدمة الإرسال.
            </p>
          )}
          {configuration?.enabled && !configuration.schedulerActive && (
            <p className="notification-notice">
              التذكيرات التلقائية غير نشطة الآن. يمكنك تجهيز الاشتراك؛ يبدأ وصول التذكيرات بعد تشغيل
              الخدمة.
            </p>
          )}
          <div className="notification-buttons">
            <button
              className="button button-primary"
              disabled={
                !configuration ||
                !ready ||
                busy ||
                ['unknown', 'unsupported', 'install-required'].includes(permission)
              }
              onClick={enable}
            >
              {busy ? (
                <LoaderCircle size={19} className="notification-spinner" />
              ) : device?.enabled ? (
                <Check size={19} />
              ) : (
                <Bell size={19} />
              )}
              {device?.enabled ? 'حفظ إعدادات التذكير' : 'تفعيل إشعارات هذا الجهاز'}
            </button>
            {device?.enabled && (
              <button className="button button-secondary" disabled={busy} onClick={disable}>
                <BellOff size={19} /> إيقاف الإشعارات
              </button>
            )}
            <button
              className="button button-secondary"
              disabled={
                busy || permission === 'unsupported' || permission === 'install-required' || !ready
              }
              onClick={testNotification}
            >
              إشعار تجريبي
            </button>
          </div>
          {message && (
            <p className="notification-feedback" role="status">
              {message}
            </p>
          )}
        </section>
        <section
          className="notification-panel notification-preview-panel"
          aria-label="صيغ الإشعارات ومصادر الأحاديث"
        >
          <h2>رسالة قصيرة، ومعنى يبقى</h2>
          <div className="notification-preview-tabs" role="group" aria-label="معاينة الورد">
            {(['morning', 'evening'] as const).map((item) => (
              <button key={item} aria-pressed={ward === item} onClick={() => setWard(item)}>
                {item === 'morning' ? 'الصباح' : 'المساء'}
              </button>
            ))}
          </div>
          <div className="notification-preview">
            <span>
              <Bell size={18} /> سكينة
            </span>
            <h3>{preview.title}</h3>
            <p>{preview.body}</p>
            <strong>
              {preview.action} <ChevronLeft size={16} />
            </strong>
          </div>
          <p className="notification-hint">
            معاينة توضيحية؛ شكل الإشعار وحجم النص والأزرار يحدّدهم الجهاز والمتصفح. يظهر طلب البدء
            أو الاستكمال في العنوان حتى على الأجهزة التي لا تعرض أزرارًا.
          </p>
          <button className="text-link" onClick={() => setSequence((value) => value + 1)}>
            معاينة حديث آخر <ChevronLeft size={17} />
          </button>
          <blockquote className="notification-hadith">
            <p>{hadith.text}</p>
            <a href={hadith.url} target="_blank" rel="noopener noreferrer">
              {hadith.source} — اقرأ الحديث في مصدره
            </a>
          </blockquote>
          <p className="notification-hint">
            الأحاديث تتناوب من قائمة موثقة ثم تتكرر الدورة. نعرض مقتطفًا في الإشعار والنص المتعلق
            بالذكر هنا؛ لا نحسب الحسنات أو نعد بأجر محدد لكل ضغطة.
          </p>
          <details className="notification-platforms">
            <summary>الكمبيوتر، المتصفح، والتطبيق</summary>
            <p>
              على الكمبيوتر وAndroid، تظهر الإشعارات عبر نظام الجهاز عند السماح للمتصفح بها. على
              iPhone تحتاج إلى تثبيت التطبيق أولًا. التذكير في الخلفية يحتاج الإنترنت؛ إغلاق المتصفح
              تمامًا وإعدادات البطارية وعدم الإزعاج قد يؤخرانه أو يمنعانه.
            </p>
            <p>
              فتح الإشعار يعرض مصدر الحديث ويوجهك لأول ذكر غير مكتمل. حفظ العدادات يبقى على جهازك.
            </p>
          </details>
        </section>
      </div>
    </div>
  );
}
