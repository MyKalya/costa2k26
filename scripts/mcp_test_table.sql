-- Run in Supabase SQL Editor: https://supabase.com/dashboard/project/kxftjuaqunybknarjueo/sql
-- 1. Run this first to create the test table:
CREATE TABLE IF NOT EXISTS mcp_test (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  message text
);

-- 2. After running the Node script and confirming the result, run this to clean up:
-- DROP TABLE mcp_test;
