ALTER TABLE settings_s3 ADD COLUMN auto_backup_enabled INTEGER NOT NULL DEFAULT 0;
ALTER TABLE settings_s3 ADD COLUMN last_auto_backup_at TEXT;
