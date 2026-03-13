-- Clear S3 credentials from database (now stored in OS keyring)
UPDATE settings_s3 SET access_key_id = '', secret_access_key = '' WHERE id = 1;
