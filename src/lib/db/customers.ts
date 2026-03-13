import { getDb, safeFields } from "./connection";
import type { Customer } from "./types";

type CreateCustomer = Omit<Customer, "id" | "created_at" | "updated_at">;
type UpdateCustomer = Partial<CreateCustomer>;

const ALLOWED_COLUMNS = [
  "company_id",
  "customer_number",
  "name",
  "contact_name",
  "email",
  "phone",
  "street",
  "postal_code",
  "city",
  "country_code",
  "vat_id",
  "website",
  "type",
] as const;

export async function listCustomers(companyId: number): Promise<Customer[]> {
  const db = await getDb();
  return db.select(
    "SELECT * FROM customers WHERE company_id = $1 ORDER BY name",
    [companyId],
  );
}

export async function listSuppliers(companyId: number): Promise<Customer[]> {
  const db = await getDb();
  return db.select(
    "SELECT * FROM customers WHERE company_id = $1 AND type IN ('lieferant', 'beides') ORDER BY name",
    [companyId],
  );
}

export async function listClients(companyId: number): Promise<Customer[]> {
  const db = await getDb();
  return db.select(
    "SELECT * FROM customers WHERE company_id = $1 AND type IN ('kunde', 'beides') ORDER BY name",
    [companyId],
  );
}

export async function getCustomerById(
  id: number,
): Promise<Customer | undefined> {
  const db = await getDb();
  const rows = await db.select<Customer[]>(
    "SELECT * FROM customers WHERE id = $1",
    [id],
  );
  return rows[0];
}

export async function createCustomer(data: CreateCustomer): Promise<number> {
  const db = await getDb();
  const result = await db.execute(
    `INSERT INTO customers (company_id, customer_number, name, contact_name, email, phone, street, postal_code, city, country_code, vat_id, website, type)
		 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
    [
      data.company_id,
      data.customer_number,
      data.name,
      data.contact_name,
      data.email,
      data.phone,
      data.street,
      data.postal_code,
      data.city,
      data.country_code,
      data.vat_id,
      data.website,
      data.type,
    ],
  );
  return result.lastInsertId;
}

export async function updateCustomer(
  id: number,
  data: UpdateCustomer,
): Promise<void> {
  const fields = safeFields(data, ALLOWED_COLUMNS);
  if (fields.length === 0) return;

  const sets = fields.map(([key], i) => `${key} = $${i + 1}`);
  sets.push(`updated_at = CURRENT_TIMESTAMP`);
  const values = fields.map(([, v]) => v);
  values.push(id);

  const db = await getDb();
  await db.execute(
    `UPDATE customers SET ${sets.join(", ")} WHERE id = $${values.length}`,
    values,
  );
}

export async function deleteCustomer(id: number): Promise<void> {
  const db = await getDb();
  await db.execute("DELETE FROM customers WHERE id = $1", [id]);
}
