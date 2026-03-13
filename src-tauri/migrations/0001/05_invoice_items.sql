CREATE TABLE IF NOT EXISTS invoice_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  invoice_id INTEGER NOT NULL,
  project_id INTEGER,
  time_entry_id INTEGER,
  position INTEGER NOT NULL DEFAULT 0,
  description TEXT NOT NULL,
  quantity REAL NOT NULL DEFAULT 1,
  unit TEXT,
  unit_price_net REAL NOT NULL DEFAULT 0,
  tax_rate REAL NOT NULL DEFAULT 0,
  line_total_net REAL NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT invoice_items_invoice_fk FOREIGN KEY (invoice_id) REFERENCES invoices (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT invoice_items_project_fk FOREIGN KEY (project_id) REFERENCES projects (id) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT invoice_items_time_entry_fk FOREIGN KEY (time_entry_id) REFERENCES time_entries (id) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT invoice_items_quantity_check CHECK (quantity >= 0),
  CONSTRAINT invoice_items_unit_price_check CHECK (unit_price_net >= 0),
  CONSTRAINT invoice_items_line_total_check CHECK (line_total_net >= 0)
);

CREATE INDEX IF NOT EXISTS idx_invoice_items_invoice_id ON invoice_items (invoice_id);
CREATE INDEX IF NOT EXISTS idx_invoice_items_project_id ON invoice_items (project_id);
CREATE INDEX IF NOT EXISTS idx_invoice_items_time_entry_id ON invoice_items (time_entry_id);
