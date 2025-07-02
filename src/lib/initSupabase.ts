import { createClient } from '@supabase/supabase-js';

/**
 * Initialize the Supabase schema on server startup.
 * Connects using the service role key, checks if the `waitlist` table exists
 * and creates it along with a basic RLS policy if missing.
 * Requires the built-in `execute_sql` RPC to be enabled.
 */
export async function initSupabaseSchema() {
  const url = process.env.SUPABASE_URL;
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRole) {
    console.warn('Supabase environment variables are not set');
    return;
  }

  const supabase = createClient(url, serviceRole);

  // Check if the waitlist table already exists
  const checkSql =
    "SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'waitlist'";
  const { data: tableExists, error: checkError } = await supabase.rpc('execute_sql', {
    sql: checkSql,
  });
  if (checkError) {
    console.error('Error checking for waitlist table:', checkError);
    return;
  }
  if (Array.isArray(tableExists) && tableExists.length > 0) {
    // Table already present
    return;
  }

  const createSql = `
  CREATE TABLE IF NOT EXISTS waitlist (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    company_name VARCHAR(255),
    company_size VARCHAR(50),
    pain_point TEXT,
    name TEXT,
    ip_address TEXT,
    created_at TIMESTAMP DEFAULT NOW()
  );
  ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;
  CREATE POLICY waitlist_insert ON waitlist FOR INSERT WITH CHECK (true);
  CREATE POLICY waitlist_select ON waitlist FOR SELECT USING (true);
  `;

  const { error: createError } = await supabase.rpc('execute_sql', { sql: createSql });
  if (createError) {
    console.error('Error creating waitlist table:', createError);
  } else {
    console.log('Waitlist table created');
  }
}
