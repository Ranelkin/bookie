import { getDb, safeFields } from "./connection";
import type { Company } from "./types";

type CreateCompany = Omit<Company, "id" | "created_at" | "updated_at">;
type UpdateCompany = Partial<CreateCompany>;

const ALLOWED_COLUMNS = [
  "name",
  "legal_name",
  "street",
  "postal_code",
  "city",
  "country_code",
  "tax_number",
  "vat_id",
  "bank_account_holder",
  "bank_iban",
  "bank_bic",
  "bank_name",
] as const;

export async function listCompanies(): Promise<Company[]> {
  const db = await getDb();
  return db.select("SELECT * FROM companies ORDER BY name");
}

export async function getCompanyById(id: number): Promise<Company | undefined> {
  const db = await getDb();
  const rows = await db.select<Company[]>(
    "SELECT * FROM companies WHERE id = $1",
    [id],
  );
  return rows[0];
}

export async function createCompany(data: CreateCompany): Promise<number> {
  const db = await getDb();
  const result = await db.execute(
    `INSERT INTO companies (name, legal_name, street, postal_code, city, country_code, tax_number, vat_id, bank_account_holder, bank_iban, bank_bic, bank_name)
		 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
    [
      data.name,
      data.legal_name,
      data.street,
      data.postal_code,
      data.city,
      data.country_code,
      data.tax_number,
      data.vat_id,
      data.bank_account_holder,
      data.bank_iban,
      data.bank_bic,
      data.bank_name,
    ],
  );
  return result.lastInsertId;
}

export async function updateCompany(
  id: number,
  data: UpdateCompany,
): Promise<void> {
  const fields = safeFields(data, ALLOWED_COLUMNS);
  if (fields.length === 0) return;

  const sets = fields.map(([key], i) => `${key} = $${i + 1}`);
  sets.push(`updated_at = CURRENT_TIMESTAMP`);
  const values = fields.map(([, v]) => v);
  values.push(id);

  const db = await getDb();
  await db.execute(
    `UPDATE companies SET ${sets.join(", ")} WHERE id = $${values.length}`,
    values,
  );
}

export async function deleteCompany(id: number): Promise<void> {
  const db = await getDb();
  await db.execute("DELETE FROM companies WHERE id = $1", [id]);
}
