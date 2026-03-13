-- Change payments FK from CASCADE to RESTRICT to prevent accidental deletion of financial records.
-- SQLite does not support ALTER CONSTRAINT, so we recreate the table.

CREATE TABLE payments_new (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  invoice_id INTEGER NOT NULL,
  payment_date TEXT NOT NULL,
  amount REAL NOT NULL,
  method TEXT,
  reference TEXT,
  note TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT payments_invoice_fk FOREIGN KEY (invoice_id) REFERENCES invoices (id) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT payments_amount_check CHECK (amount > 0)
);

INSERT INTO payments_new SELECT * FROM payments;
DROP TABLE payments;
ALTER TABLE payments_new RENAME TO payments;

CREATE INDEX IF NOT EXISTS idx_payments_invoice_id ON payments (invoice_id);
CREATE INDEX IF NOT EXISTS idx_payments_payment_date ON payments (payment_date);
