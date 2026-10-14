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
