CREATE TABLE IF NOT EXISTS settings_organization (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  name TEXT NOT NULL DEFAULT '',
  country TEXT NOT NULL DEFAULT '',
  address TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  phone_number TEXT NOT NULL DEFAULT '',
  registering_id TEXT NOT NULL DEFAULT '',
  bank_name TEXT NOT NULL DEFAULT '',
  bank_iban TEXT NOT NULL DEFAULT '',
  vatin TEXT NOT NULL DEFAULT '',
  website TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS settings_invoice (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  currency TEXT NOT NULL DEFAULT 'EUR',
  decimal_places INTEGER NOT NULL DEFAULT 2,
  days_till_due INTEGER NOT NULL DEFAULT 14,
  due_surcharge REAL NOT NULL DEFAULT 0,
  notes TEXT NOT NULL DEFAULT '',
  invoice_number_format TEXT NOT NULL DEFAULT 'RE-{YYYY}-{COUNT}',
  invoice_number_incrementor INTEGER NOT NULL DEFAULT 1,
  company_logo_data_url TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT settings_invoice_decimal_places_check CHECK (decimal_places >= 0 AND decimal_places <= 6),
  CONSTRAINT settings_invoice_days_till_due_check CHECK (days_till_due >= 0),
  CONSTRAINT settings_invoice_incrementor_check CHECK (invoice_number_incrementor >= 1)
);

CREATE TABLE IF NOT EXISTS vat_taxes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  goods_value_percent REAL NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT vat_taxes_percent_check CHECK (goods_value_percent >= 0)
);

CREATE INDEX IF NOT EXISTS idx_vat_taxes_name ON vat_taxes (name);
