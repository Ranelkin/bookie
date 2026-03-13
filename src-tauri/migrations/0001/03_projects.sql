CREATE TABLE IF NOT EXISTS projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  company_id INTEGER NOT NULL,
  customer_id INTEGER,
  project_number TEXT,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  hourly_rate REAL,
  starts_on TEXT,
  ends_on TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT projects_company_fk FOREIGN KEY (company_id) REFERENCES companies (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT projects_customer_fk FOREIGN KEY (customer_id) REFERENCES customers (id) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT projects_company_project_number_unique UNIQUE (company_id, project_number)
);

CREATE INDEX IF NOT EXISTS idx_projects_company_id ON projects (company_id);
CREATE INDEX IF NOT EXISTS idx_projects_customer_id ON projects (customer_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects (status);
