CREATE TABLE IF NOT EXISTS invoices (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  company_id INTEGER NOT NULL,
  customer_id INTEGER NOT NULL,
  project_id INTEGER,
  invoice_number TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft',
  issue_date TEXT NOT NULL,
  due_date TEXT,
  service_period_start TEXT,
  service_period_end TEXT,
  currency TEXT NOT NULL DEFAULT 'EUR',
  net_amount REAL NOT NULL DEFAULT 0,
  tax_amount REAL NOT NULL DEFAULT 0,
  gross_amount REAL NOT NULL DEFAULT 0,
  issuer_name TEXT,
  issuer_tax_number TEXT,
  issuer_vat_id TEXT,
  issuer_bank_account_holder TEXT,
  issuer_bank_iban TEXT,
  issuer_bank_bic TEXT,
  issuer_bank_name TEXT,
  recipient_name TEXT,
  recipient_street TEXT,
  recipient_postal_code TEXT,
  recipient_city TEXT,
  recipient_country_code TEXT,
  notes TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT invoices_company_fk FOREIGN KEY (company_id) REFERENCES companies (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT invoices_customer_fk FOREIGN KEY (customer_id) REFERENCES customers (id) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT invoices_project_fk FOREIGN KEY (project_id) REFERENCES projects (id) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT invoices_number_unique UNIQUE (invoice_number),
  CONSTRAINT invoices_service_period_check CHECK (
    service_period_start IS NULL
    OR service_period_end IS NULL
    OR service_period_start <= service_period_end
  )
);

CREATE INDEX IF NOT EXISTS idx_invoices_issue_date ON invoices (issue_date);
CREATE INDEX IF NOT EXISTS idx_invoices_customer_id ON invoices (customer_id);
CREATE INDEX IF NOT EXISTS idx_invoices_status ON invoices (status);
CREATE INDEX IF NOT EXISTS idx_invoices_due_date ON invoices (due_date);
CREATE INDEX IF NOT EXISTS idx_invoices_company_id ON invoices (company_id);
CREATE INDEX IF NOT EXISTS idx_invoices_project_id ON invoices (project_id);
