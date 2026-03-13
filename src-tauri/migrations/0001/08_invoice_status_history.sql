CREATE TABLE IF NOT EXISTS invoice_status_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  invoice_id INTEGER NOT NULL,
  from_status TEXT,
  to_status TEXT NOT NULL,
  changed_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  changed_by TEXT,
  note TEXT,
  CONSTRAINT invoice_status_history_invoice_fk FOREIGN KEY (invoice_id) REFERENCES invoices (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_invoice_status_history_invoice_id ON invoice_status_history (invoice_id);
CREATE INDEX IF NOT EXISTS idx_invoice_status_history_changed_at ON invoice_status_history (changed_at);
