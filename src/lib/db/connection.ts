import Database from "@tauri-apps/plugin-sql";
import { createLogger } from "$lib/logger";

const log = createLogger("db");
const DB_URL = "sqlite:bookie.db";

let db: Database | null = null;

export async function getDb(): Promise<Database> {
  if (!db) {
    log.info("Establishing database connection");
    db = await Database.load(DB_URL);
    log.info("Database connection established");
  }
  return db;
}

/** Filters object entries to only include allowed column names, preventing SQL injection via dynamic keys. */
export function safeFields<T extends Record<string, unknown>>(
  data: T,
  allowedColumns: readonly string[],
): [string, unknown][] {
  return Object.entries(data).filter(
    ([key, v]) => v !== undefined && allowedColumns.includes(key),
  );
}

/** Runs a callback inside a SQLite transaction (BEGIN / COMMIT / ROLLBACK). */
export async function withTransaction<T>(
  fn: (db: Database) => Promise<T>,
): Promise<T> {
  const conn = await getDb();
  await conn.execute("BEGIN");
  try {
    const result = await fn(conn);
    await conn.execute("COMMIT");
    return result;
  } catch (err) {
    await conn.execute("ROLLBACK");
    throw err;
  }
}
