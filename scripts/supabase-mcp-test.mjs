/**
 * One-off test: insert into mcp_test, read back, then you drop the table in Supabase SQL Editor.
 * Run: node scripts/supabase-mcp-test.mjs
 * Requires: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local (or env)
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync } from "fs";
import { pathToFileURL } from "url";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadEnv() {
  const envPath = join(__dirname, "..", ".env.local");
  if (!existsSync(envPath)) return;
  const content = readFileSync(envPath, "utf8");
  for (const line of content.split("\n")) {
    const m = line.match(/^\s*([^#=]+)=(.*)$/);
    if (m) process.env[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, "");
  }
}

loadEnv();

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !key) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. Add them to .env.local.");
  process.exit(1);
}

const supabase = createClient(url, key);

async function main() {
  console.log("1. Inserting row into mcp_test...");
  const { data: insertData, error: insertError } = await supabase
    .from("mcp_test")
    .insert({ message: "Supabase MCP is working" })
    .select("id, message")
    .single();

  if (insertError) {
    if (insertError.code === "42P01" || insertError.message?.includes("does not exist")) {
      console.error("Table mcp_test does not exist. Run this SQL in Supabase SQL Editor first:\n");
      console.error("  CREATE TABLE mcp_test (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), message text);\n");
      process.exit(1);
    }
    console.error("Insert error:", insertError);
    process.exit(1);
  }

  console.log("   Inserted:", insertData);

  console.log("\n2. Reading back...");
  const { data: rows, error: selectError } = await supabase
    .from("mcp_test")
    .select("id, message")
    .eq("message", "Supabase MCP is working");

  if (selectError) {
    console.error("Select error:", selectError);
    process.exit(1);
  }

  console.log("   Result:", rows);

  console.log("\n✓ Supabase connection is working. You can now drop the test table in SQL Editor:");
  console.log("  DROP TABLE mcp_test;");
}

main();
