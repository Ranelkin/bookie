CREATE TABLE IF NOT EXISTS settings_s3 (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  enabled INTEGER NOT NULL DEFAULT 0,
  endpoint_url TEXT NOT NULL DEFAULT '',
  region TEXT NOT NULL DEFAULT 'eu-central-1',
  bucket_name TEXT NOT NULL DEFAULT '',
  access_key_id TEXT NOT NULL DEFAULT '',
  secret_access_key TEXT NOT NULL DEFAULT '',
  path_prefix TEXT NOT NULL DEFAULT 'rechnungen',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
