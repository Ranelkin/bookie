CREATE TABLE IF NOT EXISTS customers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  company_id INTEGER NOT NULL,
  customer_number TEXT,
  name TEXT NOT NULL,
  contact_name TEXT,
  email TEXT,
  phone TEXT,
  street TEXT,
  postal_code TEXT,
  city TEXT,
  country_code TEXT NOT NULL DEFAULT 'DE',
  vat_id TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT customers_company_fk FOREIGN KEY (company_id) REFERENCES companies (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT customers_company_customer_number_unique UNIQUE (company_id, customer_number)
);

CREATE INDEX IF NOT EXISTS idx_customers_company_id ON customers (company_id);
