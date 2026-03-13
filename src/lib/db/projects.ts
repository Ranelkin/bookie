import { getDb, safeFields } from "./connection";
import type { Project } from "./types";

type CreateProject = Omit<Project, "id" | "created_at" | "updated_at">;
type UpdateProject = Partial<CreateProject>;

const ALLOWED_COLUMNS = [
  "company_id",
  "customer_id",
  "project_number",
  "name",
  "description",
  "status",
  "hourly_rate",
  "starts_on",
  "ends_on",
] as const;

export async function listProjects(companyId: number): Promise<Project[]> {
  const db = await getDb();
  return db.select(
    "SELECT * FROM projects WHERE company_id = $1 ORDER BY name",
    [companyId],
  );
}

export async function getProjectById(id: number): Promise<Project | undefined> {
  const db = await getDb();
  const rows = await db.select<Project[]>(
    "SELECT * FROM projects WHERE id = $1",
    [id],
  );
  return rows[0];
}

export async function createProject(data: CreateProject): Promise<number> {
  const db = await getDb();
  const result = await db.execute(
    `INSERT INTO projects (company_id, customer_id, project_number, name, description, status, hourly_rate, starts_on, ends_on)
		 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
    [
      data.company_id,
      data.customer_id,
      data.project_number,
      data.name,
      data.description,
      data.status,
      data.hourly_rate,
      data.starts_on,
      data.ends_on,
    ],
  );
  return result.lastInsertId!;
}

export async function updateProject(
  id: number,
  data: UpdateProject,
): Promise<void> {
  const fields = safeFields(data, ALLOWED_COLUMNS);
  if (fields.length === 0) return;

  const sets = fields.map(([key], i) => `${key} = $${i + 1}`);
  sets.push(`updated_at = CURRENT_TIMESTAMP`);
  const values = fields.map(([, v]) => v);
  values.push(id);

  const db = await getDb();
  await db.execute(
    `UPDATE projects SET ${sets.join(", ")} WHERE id = $${values.length}`,
    values,
  );
}

export async function deleteProject(id: number): Promise<void> {
  const db = await getDb();
  await db.execute("DELETE FROM projects WHERE id = $1", [id]);
}
