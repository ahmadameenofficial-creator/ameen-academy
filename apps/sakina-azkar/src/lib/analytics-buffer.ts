import { parseEvents, sourceNames, uuidPattern, type AnalyticsEvent } from './analytics-contract';
export interface VisitInfo {
  id: string;
  source: string;
  returning: boolean;
}
interface Pending {
  event: AnalyticsEvent;
  visit: VisitInfo;
  sending: boolean;
}
/** Retain unacknowledged IDs across reloads; the server deduplicates retries. */
export class AnalyticsBuffer {
  private pending = new Map<string, Pending>();
  get size() {
    return this.pending.size;
  }
  add(event: AnalyticsEvent, visit: VisitInfo) {
    const previous =
      event.name === 'counter'
        ? [...this.pending.values()].find(
            (row) =>
              !row.sending &&
              row.visit.id === visit.id &&
              row.event.name === event.name &&
              row.event.path === event.path &&
              event.at - row.event.at < 15000 &&
              row.event.quantity + event.quantity <= 100,
          )
        : undefined;
    if (previous) previous.event.quantity += event.quantity;
    else this.pending.set(event.id, { event, visit: { ...visit }, sending: false });
    while (this.pending.size > 80) this.pending.delete(this.pending.keys().next().value!);
  }
  take() {
    const first = [...this.pending.values()].find((row) => !row.sending);
    if (!first) return null;
    const rows = [...this.pending.values()]
      .filter((row) => !row.sending && row.visit.id === first.visit.id)
      .slice(0, 40);
    rows.forEach((row) => {
      row.sending = true;
    });
    return { visit: first.visit, events: rows.map((row) => ({ ...row.event })) };
  }
  finish(ids: string[], retry = false) {
    ids.forEach((id) => {
      if (retry) {
        const row = this.pending.get(id);
        if (row) row.sending = false;
      } else this.pending.delete(id);
    });
  }
  clear() {
    this.pending.clear();
  }
  serialize() {
    return JSON.stringify([...this.pending.values()].map(({ event, visit }) => ({ event, visit })));
  }
  hydrate(value: string | null, now = Date.now()) {
    try {
      const rows = JSON.parse(value ?? '[]');
      if (!Array.isArray(rows)) return;
      for (const row of rows.slice(-80)) {
        if (
          !row?.visit ||
          !uuidPattern.test(row.visit.id) ||
          !sourceNames.includes(row.visit.source) ||
          typeof row.visit.returning !== 'boolean' ||
          !/^\/(?:library|saved|sources|progress|azkar\/[a-z0-9-]+)?$/.test(
            row.event?.path ?? 'invalid',
          )
        )
          continue;
        const parsed = parseEvents([row.event], new Set([row.event.path]), now);
        if (parsed && !this.pending.has(parsed[0].id))
          this.pending.set(parsed[0].id, {
            event: parsed[0],
            visit: { id: row.visit.id, source: row.visit.source, returning: row.visit.returning },
            sending: false,
          });
      }
    } catch {
      /* Ignore corrupted storage instead of interrupting reading. */
    }
  }
}
