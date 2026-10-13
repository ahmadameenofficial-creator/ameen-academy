export const eventNames = [
  'page_view',
  'engaged',
  'counter',
  'completion',
  'install',
  'offline_ready',
  'offline_use',
  'copy',
  'share',
  'theme_dark',
  'theme_light',
  'vital_lcp',
  'vital_inp',
  'vital_cls',
  'client_error',
] as const;
export type EventName = (typeof eventNames)[number];
export interface AnalyticsEvent {
  id: string;
  name: EventName;
  path: string;
  quantity: number;
  at: number;
}
export const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
export function parseEvents(
  input: unknown,
  paths: Set<string>,
  now = Date.now(),
): AnalyticsEvent[] | null {
  if (!Array.isArray(input) || input.length < 1 || input.length > 40) return null;
  const result: AnalyticsEvent[] = [];
  for (const value of input) {
    if (!value || typeof value !== 'object') return null;
    const { id, name, path, quantity, at } = value;
    if (
      typeof id !== 'string' ||
      !uuidPattern.test(id) ||
      !eventNames.includes(name) ||
      typeof path !== 'string' ||
      !paths.has(path) ||
      !Number.isInteger(quantity) ||
      quantity < (name === 'vital_cls' ? 0 : 1) ||
      quantity >
        (name === 'engaged'
          ? 30
          : name === 'counter'
            ? 100
            : name === 'vital_lcp' || name === 'vital_inp'
              ? 60000
              : name === 'vital_cls'
                ? 10000
                : 1) ||
      !Number.isSafeInteger(at) ||
      at > now + 300000 ||
      at < now - 86400000
    )
      return null;
    result.push({ id, name, path, quantity, at });
  }
  return result;
}
export function deviceDimensions(agent: string) {
  const os = /iPhone|iPad|iPod/.test(agent)
    ? 'iOS'
    : /Android/.test(agent)
      ? 'Android'
      : /Windows/.test(agent)
        ? 'Windows'
        : /Macintosh/.test(agent)
          ? 'macOS'
          : /Linux/.test(agent)
            ? 'Linux'
            : 'other';
  const device = /iPad|Tablet|Android(?!.*Mobile)/.test(agent)
    ? 'tablet'
    : /Mobile|iPhone|iPod/.test(agent)
      ? 'mobile'
      : 'desktop';
  const browser = /Edg\//.test(agent)
    ? 'Edge'
    : /Firefox\//.test(agent)
      ? 'Firefox'
      : /Chrome|CriOS/.test(agent)
        ? 'Chrome'
        : /Safari/.test(agent)
          ? 'Safari'
          : 'other';
  return { os, device, browser };
}
export const sourceNames = [
  'direct',
  'google',
  'facebook',
  'instagram',
  'youtube',
  'tiktok',
  'whatsapp',
  'telegram',
  'email',
  'other',
] as const;
export function trafficSource(
  referrer: string,
  origin: string,
  campaign?: string,
): (typeof sourceNames)[number] {
  if (campaign && sourceNames.includes(campaign as (typeof sourceNames)[number]))
    return campaign as (typeof sourceNames)[number];
  try {
    const host = new URL(referrer).hostname;
    if (host === new URL(origin).hostname) return 'direct';
    for (const name of [
      'google',
      'facebook',
      'instagram',
      'youtube',
      'tiktok',
      'whatsapp',
      'telegram',
    ] as const) {
      if (
        host === name + '.com' ||
        host.endsWith('.' + name + '.com') ||
        (name === 'google' && /^([\w-]+\.)?google\.[a-z.]+$/.test(host))
      )
        return name;
    }
    return 'other';
  } catch {
    return 'direct';
  }
}
export function dateRange(
  from?: string,
  to?: string,
  today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Africa/Cairo' }).format(new Date()),
) {
  const valid = (value?: string): value is string =>
    Boolean(
      value &&
      /^\d{4}-\d{2}-\d{2}$/.test(value) &&
      Number.isFinite(Date.parse(value)) &&
      new Date(value + 'T00:00:00Z').toISOString().slice(0, 10) === value,
    );
  const shift = (date: string, days: number) =>
    new Date(Date.parse(date + 'T00:00:00Z') + days * 86400000).toISOString().slice(0, 10);
  const end = valid(to) && to <= today ? to : today;
  const start =
    valid(from) && from <= end && (Date.parse(end) - Date.parse(from)) / 86400000 < 90
      ? from
      : shift(end, -6);
  const days = Math.round((Date.parse(end) - Date.parse(start)) / 86400000) + 1;
  return {
    from: start,
    to: end,
    until: shift(end, 1),
    days,
    previousFrom: shift(start, -days),
    previousUntil: start,
  };
}
