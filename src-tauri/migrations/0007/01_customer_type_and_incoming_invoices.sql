ALTER TABLE customers ADD COLUMN type TEXT NOT NULL DEFAULT 'kunde'
  CHECK (type IN ('kunde', 'lieferant', 'beides'));

CREATE TABLE IF NOT EXISTS incoming_invoices (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  company_id INTEGER NOT NULL,
  supplier_id INTEGER,
  invoice_number TEXT,
  invoice_date TEXT NOT NULL,
  net_amount REAL NOT NULL CHECK (net_amount >= 0),
  tax_amount REAL NOT NULL DEFAULT 0 CHECK (tax_amount >= 0),
  gross_amount REAL NOT NULL CHECK (gross_amount >= 0),
  status TEXT NOT NULL DEFAULT 'offen' CHECK (status IN ('offen', 'bezahlt')),
  file_data BLOB,
  file_name TEXT,
  file_type TEXT,
  notes TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (company_id) REFERENCES companies (id) ON DELETE CASCADE,
  FOREIGN KEY (supplier_id) REFERENCES customers (id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_incoming_invoices_company ON incoming_invoices (company_id);
CREATE INDEX IF NOT EXISTS idx_incoming_invoices_supplier ON incoming_invoices (supplier_id);
CREATE INDEX IF NOT EXISTS idx_incoming_invoices_status ON incoming_invoices (status);
CREATE INDEX IF NOT EXISTS idx_incoming_invoices_date ON incoming_invoices (invoice_date);
