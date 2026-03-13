-- Add default locale and legal country to organization settings
ALTER TABLE settings_organization ADD COLUMN default_locale TEXT NOT NULL DEFAULT 'de';
ALTER TABLE settings_organization ADD COLUMN default_legal_country TEXT NOT NULL DEFAULT 'DE';

-- Add per-invoice language and legal country
ALTER TABLE invoices ADD COLUMN language TEXT NOT NULL DEFAULT 'de';
ALTER TABLE invoices ADD COLUMN legal_country_code TEXT NOT NULL DEFAULT 'DE';
