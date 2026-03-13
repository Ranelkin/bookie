ALTER TABLE invoices ADD COLUMN delivery_date TEXT;
ALTER TABLE invoices ADD COLUMN due_surcharge REAL NOT NULL DEFAULT 0;
