CREATE TABLE IF NOT EXISTS time_entries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  company_id INTEGER NOT NULL,
  customer_id INTEGER,
  project_id INTEGER,
  entry_date TEXT NOT NULL,
  started_at TEXT,
  ended_at TEXT,
  duration_minutes INTEGER,
  description TEXT,
  billable INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT time_entries_company_fk FOREIGN KEY (company_id) REFERENCES companies (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT time_entries_customer_fk FOREIGN KEY (customer_id) REFERENCES customers (id) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT time_entries_project_fk FOREIGN KEY (project_id) REFERENCES projects (id) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT time_entries_duration_check CHECK (duration_minutes IS NULL OR duration_minutes >= 0)
);

CREATE INDEX IF NOT EXISTS idx_time_entries_company_id ON time_entries (company_id);
CREATE INDEX IF NOT EXISTS idx_time_entries_customer_id ON time_entries (customer_id);
CREATE INDEX IF NOT EXISTS idx_time_entries_project_id ON time_entries (project_id);
CREATE INDEX IF NOT EXISTS idx_time_entries_entry_date ON time_entries (entry_date);
