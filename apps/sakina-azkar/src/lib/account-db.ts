import type { ProfileDetails, AccountProfile } from './account-profile';
import { database } from './analytics-db';
import { parseHistory, type Completion } from './reading-history';
import { wardCounts, wardEntries, partialProgress } from './daily-progress';
let schema: Promise<void> | undefined;
async function ensureAccountSchema() {
  schema ??= (async () => {
    const sql = database();
    await sql.begin(async tx => {
      await tx`SELECT pg_advisory_xact_lock(73918322)`;
      await tx`CREATE SCHEMA IF NOT EXISTS sakina_personal`;
      await tx`CREATE TABLE IF NOT EXISTS sakina_personal.accounts (user_id text PRIMARY KEY, email text, age integer CHECK (age BETWEEN 1 AND 120), country text, gender text CHECK (gender IN ('male','female','unspecified')), profile_consent boolean NOT NULL DEFAULT false, created_at timestamptz NOT NULL DEFAULT now(), last_seen timestamptz NOT NULL DEFAULT now())`;
      await tx`CREATE TABLE IF NOT EXISTS sakina_personal.progress (user_id text PRIMARY KEY, revision integer NOT NULL DEFAULT 0, records jsonb NOT NULL DEFAULT '[]', updated_at timestamptz NOT NULL DEFAULT now())`;
    });
  })().catch(error => { schema = undefined; throw error; });
  await schema;
}
export function sanitizeAccountRecords(input: unknown, today: string): Completion[] {
  const records = parseHistory(JSON.stringify({ version: 1, records: input }), today);
  return records.map(row => {
    if (!['morning', 'evening'].includes(row.categoryId) || !row.counts) return row;
    const counts = wardCounts(row.categoryId, row.counts);
    return { ...row, counts, progress: partialProgress(wardEntries(row.categoryId), counts) };
  });
}
export async function getAccountProgress(userId: string) {
  await ensureAccountSchema();
  const rows = await database()`SELECT revision, records FROM sakina_personal.progress WHERE user_id=${userId}`;
  return rows.length ? { revision: Number(rows[0].revision), records: rows[0].records as Completion[] } : { revision: 0, records: [] as Completion[] };
}
export async function saveAccountProgress(userId: string, revision: number, records: Completion[]) {
  await ensureAccountSchema();
  const sql = database();
  const rows = await sql`INSERT INTO sakina_personal.progress (user_id,revision,records) SELECT ${userId},1,${sql.json(records.map(row => ({ ...row })))} WHERE ${revision}=0 ON CONFLICT (user_id) DO UPDATE SET records=EXCLUDED.records,revision=sakina_personal.progress.revision+1,updated_at=now() WHERE sakina_personal.progress.revision=${revision} RETURNING revision`;
  if (rows.length) return Number(rows[0].revision);
  // Existing users have revision > 0 and cannot take the INSERT branch.
  if (revision > 0) {
    const updated = await sql`UPDATE sakina_personal.progress SET records=${sql.json(records.map(row => ({ ...row })))}, revision=revision+1, updated_at=now() WHERE user_id=${userId} AND revision=${revision} RETURNING revision`;
    if (updated.length) return Number(updated[0].revision);
  }
  return null;
}

export async function registerAccount(userId: string, email: string | null) {
  await ensureAccountSchema();
  await database()`INSERT INTO sakina_personal.accounts (user_id,email) VALUES (${userId},${email}) ON CONFLICT (user_id) DO UPDATE SET email=coalesce(EXCLUDED.email,sakina_personal.accounts.email),last_seen=now()`;
}
export async function getAccountProfile(userId: string): Promise<AccountProfile> {
  await ensureAccountSchema();
  const rows = await database()`SELECT email,age,country,gender,profile_consent AS consent FROM sakina_personal.accounts WHERE user_id=${userId}`;
  return rows.length ? rows[0] as AccountProfile : { email: null, age: null, country: null, gender: null, consent: false };
}
export async function saveAccountProfile(userId: string, profile: ProfileDetails) {
  await ensureAccountSchema();
  await database()`INSERT INTO sakina_personal.accounts (user_id,age,country,gender,profile_consent) VALUES (${userId},${profile.age},${profile.country},${profile.gender},${profile.consent}) ON CONFLICT (user_id) DO UPDATE SET age=EXCLUDED.age,country=EXCLUDED.country,gender=EXCLUDED.gender,profile_consent=EXCLUDED.profile_consent,last_seen=now()`;
  return getAccountProfile(userId);
}
export interface DirectoryAccount extends AccountProfile {
  created_at: string;
  last_seen: string;
}
export async function accountDirectory(requestedPage = 1) {
  await ensureAccountSchema();
  const sql = database();
  const totalRows = await sql`SELECT count(*)::int AS total FROM sakina_personal.accounts`;
  const total = Number(totalRows[0].total);
  const pages = Math.max(1, Math.ceil(total / 50));
  const page = Math.max(1, Math.min(pages, Number.isSafeInteger(requestedPage) ? requestedPage : 1));
  const rows = await sql`SELECT email,age,country,gender,profile_consent AS consent,created_at,last_seen FROM sakina_personal.accounts ORDER BY last_seen DESC,user_id LIMIT 50 OFFSET ${(page - 1) * 50}`;
  return { accounts: rows as unknown as DirectoryAccount[], total, page, pages };
}
