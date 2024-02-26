-- Add down migration script here
DROP INDEX IF EXISTS idx_user_id_on_days;
DROP TABLE IF EXISTS days;