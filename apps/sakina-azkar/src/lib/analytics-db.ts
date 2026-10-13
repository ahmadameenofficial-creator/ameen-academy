import postgres from 'postgres';
import { dateRange, type AnalyticsEvent } from './analytics-contract';
let connection: ReturnType<typeof postgres> | undefined;
let schema: Promise<void> | undefined;
export function database() {
  if (!process.env.SAKINA_DATABASE_URL) throw new Error('Analytics database is not configured');
  connection ??= postgres(process.env.SAKINA_DATABASE_URL, {
    max: 2,
    idle_timeout: 20,
    connect_timeout: 8,
    prepare: false,
    onnotice: () => {},
  });
  return connection;
}
export async function ensureSchema() {
  schema ??= (async () => {
    const sql = database();
    await sql.begin(async (sql) => {
      await sql`SELECT pg_advisory_xact_lock(73918321)`;
      await sql`CREATE SCHEMA IF NOT EXISTS sakina_analytics`;
      await sql`CREATE TABLE IF NOT EXISTS sakina_analytics.sessions (id text PRIMARY KEY, started_at timestamptz NOT NULL DEFAULT now(), last_seen timestamptz NOT NULL DEFAULT now(), device text NOT NULL, browser text NOT NULL, os text NOT NULL, country text NOT NULL, source text NOT NULL, is_returning boolean NOT NULL DEFAULT false)`;
      await sql`CREATE TABLE IF NOT EXISTS sakina_analytics.events (id uuid PRIMARY KEY, session_id text NOT NULL REFERENCES sakina_analytics.sessions(id) ON DELETE CASCADE, name text NOT NULL, path text NOT NULL, quantity integer NOT NULL, occurred_at timestamptz NOT NULL, received_at timestamptz NOT NULL DEFAULT now())`;
      await sql`CREATE INDEX IF NOT EXISTS sakina_events_date_idx ON sakina_analytics.events(occurred_at)`;
      await sql`CREATE INDEX IF NOT EXISTS sakina_events_session_idx ON sakina_analytics.events(session_id)`;
      await sql`CREATE INDEX IF NOT EXISTS sakina_sessions_last_seen_idx ON sakina_analytics.sessions(last_seen)`;
      await sql`CREATE TABLE IF NOT EXISTS sakina_analytics.rate_limits (key text PRIMARY KEY, count integer NOT NULL, expires_at timestamptz NOT NULL)`;
      await sql`DELETE FROM sakina_analytics.sessions WHERE last_seen < now() - interval '90 days'`;
      await sql`DELETE FROM sakina_analytics.events WHERE occurred_at < now() - interval '90 days'`;
      await sql`DELETE FROM sakina_analytics.rate_limits WHERE expires_at < now() - interval '1 hour'`;
    });
  })().catch((error) => {
    schema = undefined;
    throw error;
  });
  await schema;
}
export async function withinLimit(key: string, maximum: number, seconds: number) {
  await ensureSchema();
  const sql = database();
  const rows =
    await sql`INSERT INTO sakina_analytics.rate_limits (key,count,expires_at) VALUES (${key},1,now()+${seconds}::int*interval '1 second') ON CONFLICT (key) DO UPDATE SET count = CASE WHEN sakina_analytics.rate_limits.expires_at < now() THEN 1 ELSE sakina_analytics.rate_limits.count+1 END, expires_at = CASE WHEN sakina_analytics.rate_limits.expires_at < now() THEN now()+${seconds}::int*interval '1 second' ELSE sakina_analytics.rate_limits.expires_at END RETURNING count`;
  return Number(rows[0].count) <= maximum;
}
export async function recordEvents(
  session: {
    id: string;
    device: string;
    browser: string;
    os: string;
    country: string;
    source: string;
    returning: boolean;
  },
  events: AnalyticsEvent[],
) {
  await ensureSchema();
  const sql = database();
  await sql.begin(async (tx) => {
    const { returning, ...dimensions } = session;
    await tx`INSERT INTO sakina_analytics.sessions ${tx({ ...dimensions, is_returning: returning })} ON CONFLICT (id) DO UPDATE SET last_seen=now()`;
    const rows = events.map((event) => ({
      id: event.id,
      session_id: session.id,
      name: event.name,
      path: event.path,
      quantity: event.quantity,
      occurred_at: new Date(event.at),
    }));
    await tx`INSERT INTO sakina_analytics.events ${tx(rows)} ON CONFLICT (id) DO NOTHING`;
  });
}
export interface Totals {
  sessions: number;
  views: number;
  engaged: number;
  seconds: number;
  counters: number;
  completions: number;
  installs: number;
  offline: number;
  returning: number;
  copies: number;
  shares: number;
}
export interface Breakdown {
  label: string;
  value: number;
}
export interface DashboardData {
  range: ReturnType<typeof dateRange>;
  current: Totals;
  previous: Totals;
  daily: { day: string; views: number; sessions: number }[];
  pages: Breakdown[];
  devices: Breakdown[];
  browsers: Breakdown[];
  systems: Breakdown[];
  countries: Breakdown[];
  sources: Breakdown[];
  categories: Breakdown[];
  active: number;
  firstEvent: string | null;
  quality: {
    lcp: number | null;
    inp: number | null;
    cls: number | null;
    errors: number;
    samples: number;
  };
}
export async function dashboardData(range: ReturnType<typeof dateRange>): Promise<DashboardData> {
  await ensureSchema();
  const sql = database();
  async function totals(from: string, until: string): Promise<Totals> {
    const rows =
      await sql`WITH e AS (SELECT * FROM sakina_analytics.events WHERE occurred_at >= (${from}::date::timestamp AT TIME ZONE 'Africa/Cairo') AND occurred_at < (${until}::date::timestamp AT TIME ZONE 'Africa/Cairo')), grouped AS (SELECT session_id, bool_or(name='page_view') AS visited, sum(CASE WHEN name='engaged' THEN quantity ELSE 0 END) AS seconds, bool_or(name IN ('counter','completion','copy','share')) AS interacted FROM e GROUP BY session_id) SELECT (SELECT count(*) FROM grouped WHERE visited) AS sessions, (SELECT coalesce(sum(quantity),0) FROM e WHERE name='page_view') AS views, (SELECT count(*) FROM grouped WHERE visited AND (seconds>=10 OR interacted)) AS engaged, (SELECT coalesce(sum(seconds),0) FROM grouped) AS seconds, (SELECT coalesce(sum(quantity),0) FROM e WHERE name='counter') AS counters, (SELECT coalesce(sum(quantity),0) FROM e WHERE name='completion') AS completions, (SELECT count(*) FROM e WHERE name='install') AS installs, (SELECT count(*) FROM e WHERE name='offline_use') AS offline, (SELECT count(*) FROM grouped g JOIN sakina_analytics.sessions s ON s.id=g.session_id WHERE g.visited AND s.is_returning) AS returning, (SELECT count(*) FROM e WHERE name='copy') AS copies, (SELECT count(*) FROM e WHERE name='share') AS shares`;
    return Object.fromEntries(
      Object.entries(rows[0]).map(([key, value]) => [key, Number(value)]),
    ) as unknown as Totals;
  }
  async function breakdown(dimension: 'device' | 'browser' | 'country' | 'source' | 'os') {
    const rows =
      await sql`SELECT s.${sql(dimension)} AS label, count(DISTINCT s.id)::int AS value FROM sakina_analytics.sessions s JOIN sakina_analytics.events e ON e.session_id=s.id WHERE e.name='page_view' AND e.occurred_at >= (${range.from}::date::timestamp AT TIME ZONE 'Africa/Cairo') AND e.occurred_at < (${range.until}::date::timestamp AT TIME ZONE 'Africa/Cairo') GROUP BY s.${sql(dimension)} ORDER BY value DESC LIMIT 10`;
    return rows as unknown as Breakdown[];
  }
  const [
    current,
    previous,
    daily,
    pages,
    categories,
    devices,
    browsers,
    systems,
    countries,
    sources,
    live,
    first,
    quality,
  ] = await Promise.all([
    totals(range.from, range.until),
    totals(range.previousFrom, range.previousUntil),
    sql`SELECT to_char(occurred_at AT TIME ZONE 'Africa/Cairo','YYYY-MM-DD') AS day, sum(quantity)::int AS views, count(DISTINCT session_id)::int AS sessions FROM sakina_analytics.events WHERE name='page_view' AND occurred_at >= (${range.from}::date::timestamp AT TIME ZONE 'Africa/Cairo') AND occurred_at < (${range.until}::date::timestamp AT TIME ZONE 'Africa/Cairo') GROUP BY day ORDER BY day`,
    sql`SELECT path AS label, sum(quantity)::int AS value FROM sakina_analytics.events WHERE name='page_view' AND occurred_at >= (${range.from}::date::timestamp AT TIME ZONE 'Africa/Cairo') AND occurred_at < (${range.until}::date::timestamp AT TIME ZONE 'Africa/Cairo') GROUP BY path ORDER BY value DESC LIMIT 10`,
    sql`SELECT path AS label, sum(quantity)::int AS value FROM sakina_analytics.events WHERE name='counter' AND occurred_at >= (${range.from}::date::timestamp AT TIME ZONE 'Africa/Cairo') AND occurred_at < (${range.until}::date::timestamp AT TIME ZONE 'Africa/Cairo') GROUP BY path ORDER BY value DESC LIMIT 10`,
    breakdown('device'),
    breakdown('browser'),
    breakdown('os'),
    breakdown('country'),
    breakdown('source'),
    sql`SELECT count(*)::int AS active FROM sakina_analytics.sessions WHERE last_seen >= now()-interval '5 minutes'`,
    sql`SELECT min(occurred_at) AS first FROM sakina_analytics.events`,
    sql`SELECT percentile_cont(0.75) WITHIN GROUP (ORDER BY quantity) FILTER (WHERE name='vital_lcp') AS lcp, percentile_cont(0.75) WITHIN GROUP (ORDER BY quantity) FILTER (WHERE name='vital_inp') AS inp, percentile_cont(0.75) WITHIN GROUP (ORDER BY quantity) FILTER (WHERE name='vital_cls') AS cls, count(*) FILTER (WHERE name='client_error')::int AS errors, count(*) FILTER (WHERE name IN ('vital_lcp','vital_inp','vital_cls'))::int AS samples FROM sakina_analytics.events WHERE occurred_at >= (${range.from}::date::timestamp AT TIME ZONE 'Africa/Cairo') AND occurred_at < (${range.until}::date::timestamp AT TIME ZONE 'Africa/Cairo')`,
  ]);
  return {
    range,
    current,
    previous,
    daily: daily as unknown as DashboardData['daily'],
    pages: pages as unknown as Breakdown[],
    categories: categories as unknown as Breakdown[],
    devices,
    browsers,
    systems,
    countries,
    sources,
    active: live[0].active,
    firstEvent: first[0].first ? new Date(first[0].first).toISOString() : null,
    quality: quality[0] as unknown as DashboardData['quality'],
  };
}
