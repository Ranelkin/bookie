import { getDb } from "./connection";
import type { Payment } from "./types";

type CreatePayment = Omit<Payment, "id" | "created_at" | "updated_at">;

export async function listByInvoice(invoiceId: number): Promise<Payment[]> {
  const db = await getDb();
  return db.select(
    "SELECT * FROM payments WHERE invoice_id = $1 ORDER BY payment_date DESC",
    [invoiceId],
  );
}

export async function createPayment(data: CreatePayment): Promise<number> {
  const db = await getDb();
  const result = await db.execute(
    `INSERT INTO payments (invoice_id, payment_date, amount, method, reference, note)
		 VALUES ($1, $2, $3, $4, $5, $6)`,
    [
      data.invoice_id,
      data.payment_date,
      data.amount,
      data.method,
      data.reference,
      data.note,
    ],
  );
  return result.lastInsertId!;
}

export async function deletePayment(id: number): Promise<void> {
  const db = await getDb();
  await db.execute("DELETE FROM payments WHERE id = $1", [id]);
}
