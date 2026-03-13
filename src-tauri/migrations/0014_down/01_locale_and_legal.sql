ALTER TABLE settings_organization DROP COLUMN default_locale;
ALTER TABLE settings_organization DROP COLUMN default_legal_country;
ALTER TABLE invoices DROP COLUMN language;
ALTER TABLE invoices DROP COLUMN legal_country_code;
