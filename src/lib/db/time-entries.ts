import { getDb, safeFields } from "./connection";
import type { TimeEntry } from "./types";

type CreateTimeEntry = Omit<TimeEntry, "id" | "created_at" | "updated_at">;
type UpdateTimeEntry = Partial<CreateTimeEntry>;

const ALLOWED_COLUMNS = [
  "company_id",
  "customer_id",
  "project_id",
  "entry_date",
  "started_at",
  "ended_at",
  "duration_minutes",
  "description",
  "billable",
] as const;

export async function listTimeEntries(companyId: number): Promise<TimeEntry[]> {
  const db = await getDb();
  return db.select(
    "SELECT * FROM time_entries WHERE company_id = $1 ORDER BY entry_date DESC",
    [companyId],
  );
}

export async function getTimeEntryById(
  id: number,
): Promise<TimeEntry | undefined> {
  const db = await getDb();
  const rows = await db.select<TimeEntry[]>(
    "SELECT * FROM time_entries WHERE id = $1",
    [id],
  );
  return rows[0];
}

export async function createTimeEntry(data: CreateTimeEntry): Promise<number> {
  const db = await getDb();
  const result = await db.execute(
    `INSERT INTO time_entries (company_id, customer_id, project_id, entry_date, started_at, ended_at, duration_minutes, description, billable)
		 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
    [
      data.company_id,
      data.customer_id,
      data.project_id,
      data.entry_date,
      data.started_at,
      data.ended_at,
      data.duration_minutes,
      data.description,
      data.billable,
    ],
  );
  return result.lastInsertId;
}

export async function updateTimeEntry(
  id: number,
  data: UpdateTimeEntry,
): Promise<void> {
  const fields = safeFields(data, ALLOWED_COLUMNS);
  if (fields.length === 0) return;

  const sets = fields.map(([key], i) => `${key} = $${i + 1}`);
  sets.push(`updated_at = CURRENT_TIMESTAMP`);
  const values = fields.map(([, v]) => v);
  values.push(id);

  const db = await getDb();
  await db.execute(
    `UPDATE time_entries SET ${sets.join(", ")} WHERE id = $${values.length}`,
    values,
  );
}

export async function deleteTimeEntry(id: number): Promise<void> {
  const db = await getDb();
  await db.execute("DELETE FROM time_entries WHERE id = $1", [id]);
}
