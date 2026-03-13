CREATE TABLE IF NOT EXISTS companies (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  legal_name TEXT,
  street TEXT,
  postal_code TEXT,
  city TEXT,
  country_code TEXT NOT NULL DEFAULT 'DE',
  tax_number TEXT,
  vat_id TEXT,
  bank_account_holder TEXT,
  bank_iban TEXT,
  bank_bic TEXT,
  bank_name TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT companies_name_unique UNIQUE (name)
);
