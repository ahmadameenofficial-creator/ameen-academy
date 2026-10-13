import { trafficSource, sourceNames, uuidPattern, type EventName } from './analytics-contract';
import { AnalyticsBuffer } from './analytics-buffer';
export const consentKey = 'sakina:analytics:consent';
const pendingKey = 'sakina:analytics:pending';
const buffer = new AnalyticsBuffer();
let hydrated = false;
let enabled: boolean | undefined;
let allowed = false;
let sending = 0;
let observingVitals = false;
let visit: { id: string; last: number; source: string; returning: boolean } | undefined;
function savePending() {
  try {
    sessionStorage.setItem(pendingKey, buffer.serialize());
  } catch {
    /* Telemetry must never interrupt reading. */
  }
}
function hydratePending() {
  if (hydrated || !allowed) return;
  hydrated = true;
  try {
    buffer.hydrate(sessionStorage.getItem(pendingKey));
  } catch {}
}
export async function configureAnalytics() {
  try {
    allowed = localStorage.getItem(consentKey) === 'yes';
    hydratePending();
    enabled = Boolean(
      (await (await fetch('/api/analytics/config', { cache: 'no-store' })).json()).enabled,
    );
    if (enabled && allowed) {
      observeVitals();
      void flushAnalytics();
    }
    if (!enabled) {
      buffer.clear();
      savePending();
    }
  } catch {
    enabled = false;
  }
  return enabled;
}
export function analyticsConsent(value: boolean) {
  allowed = value;
  try {
    localStorage.setItem(consentKey, value ? 'yes' : 'no');
  } catch {}
  if (enabled && allowed) {
    hydratePending();
    observeVitals();
  }
  if (!value) {
    buffer.clear();
    visit = undefined;
    try {
      sessionStorage.removeItem(pendingKey);
      sessionStorage.removeItem('sakina:analytics:visit');
      localStorage.removeItem('sakina:analytics:visited');
    } catch {}
  }
}
function observeVitals() {
  if (observingVitals || navigator.doNotTrack === '1') return;
  observingVitals = true;
  const path = window.location.pathname;
  void import('web-vitals')
    .then(({ onLCP, onINP, onCLS }) => {
      const vital = (name: EventName, value: number) => {
        recordAnalytics(name, path, value);
        void flushAnalytics(document.visibilityState === 'hidden');
      };
      onLCP((metric) => vital('vital_lcp', Math.max(1, Math.min(60000, Math.round(metric.value)))));
      onINP((metric) => vital('vital_inp', Math.max(1, Math.min(60000, Math.round(metric.value)))));
      onCLS((metric) =>
        vital('vital_cls', Math.max(0, Math.min(10000, Math.round(metric.value * 1000)))),
      );
    })
    .catch(() => {});
  window.addEventListener('error', () => recordAnalytics('client_error'));
  window.addEventListener('unhandledrejection', () => recordAnalytics('client_error'));
}
function session() {
  if (!visit) {
    try {
      const saved = JSON.parse(sessionStorage.getItem('sakina:analytics:visit') ?? 'null');
      if (
        saved &&
        typeof saved.id === 'string' &&
        uuidPattern.test(saved.id) &&
        Number.isFinite(saved.last) &&
        saved.last <= Date.now() + 300000 &&
        sourceNames.includes(saved.source) &&
        typeof saved.returning === 'boolean'
      )
        visit = saved;
    } catch {}
  }
  if (!visit || Date.now() - visit.last > 1800000) {
    let returning = false;
    try {
      returning = localStorage.getItem('sakina:analytics:visited') === 'yes';
      localStorage.setItem('sakina:analytics:visited', 'yes');
    } catch {}
    visit = {
      id: crypto.randomUUID(),
      last: Date.now(),
      source: trafficSource(
        document.referrer,
        location.origin,
        new URL(location.href).searchParams.get('utm_source') ?? undefined,
      ),
      returning,
    };
  }
  visit.last = Date.now();
  try {
    sessionStorage.setItem('sakina:analytics:visit', JSON.stringify(visit));
  } catch {}
  return visit;
}
export function recordAnalytics(name: EventName, path = window.location.pathname, quantity = 1) {
  try {
    if (enabled === undefined) {
      try {
        allowed = localStorage.getItem(consentKey) === 'yes';
      } catch {
        allowed = false;
      }
    }
    if (
      enabled === false ||
      !allowed ||
      navigator.doNotTrack === '1' ||
      path.startsWith('/dashboard') ||
      !navigator.onLine
    )
      return;
    hydratePending();
    buffer.add({ id: crypto.randomUUID(), name, path, quantity, at: Date.now() }, session());
    savePending();
    if (buffer.size >= 20) void flushAnalytics();
  } catch {
    enabled = false;
  }
}
export async function flushAnalytics(leaving = false) {
  if (enabled !== true || !allowed || (!leaving && sending >= 2) || !navigator.onLine) return;
  const batch = buffer.take();
  if (!batch) return;
  const ids = batch.events.map((event) => event.id);
  const payload = JSON.stringify({
    consent: true,
    session: batch.visit.id,
    source: batch.visit.source,
    returning: batch.visit.returning,
    events: batch.events,
  });
  savePending();
  // A beacon has no acknowledgement. Retain its IDs for an idempotent retry on reload.
  if (
    leaving &&
    navigator.sendBeacon?.(
      '/api/analytics/events',
      new Blob([payload], { type: 'application/json' }),
    )
  )
    return;
  sending++;
  let delivered = false;
  try {
    const response = await fetch('/api/analytics/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
      keepalive: true,
    });
    delivered = response.ok;
    buffer.finish(ids, response.status >= 500 && allowed);
  } catch {
    buffer.finish(ids, allowed);
  } finally {
    sending--;
    savePending();
    if (delivered && buffer.size && document.visibilityState === 'hidden')
      void flushAnalytics(true);
  }
}
