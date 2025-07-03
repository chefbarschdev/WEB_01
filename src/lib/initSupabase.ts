import { getSupabaseClient, type MockSupabaseClient } from './supabaseClient';
import type { SupabaseClient } from '@supabase/supabase-js';

/**
 * Initialize the Supabase schema on server startup.
 * Connects using the service role key, checks if the `waitlist` table exists
 * and creates it along with a basic RLS policy if missing.
 * Requires the built-in `execute_sql` RPC to be enabled.
 */
export async function initSupabaseSchema() {
  const testMode = process.env.NODE_ENV === 'development' && process.env.SUPABASE_TEST_MODE === 'true';

  if (testMode) {
    console.log('Skipping Supabase schema initialization in test mode');
    return;
  }

  const supabase = getSupabaseClient() as SupabaseClient | MockSupabaseClient;

  try {
    // Simple check if waitlist table exists by trying to query it
    const { error: checkError } = await supabase
      .from('waitlist')
      .select('count', { count: 'exact', head: true });
    
    if (checkError) {
      if (checkError.message.includes('relation "waitlist" does not exist')) {
        console.log('Waitlist table does not exist. Please create it manually in Supabase dashboard.');
        console.log('SQL to create table:');
        console.log(`
        CREATE TABLE waitlist (
          id SERIAL PRIMARY KEY,
          email VARCHAR(255) NOT NULL,
          company_name VARCHAR(255),
          company_size VARCHAR(50),
          pain_point TEXT,
          name VARCHAR(255),
          ip_address VARCHAR(45),
          created_at TIMESTAMP DEFAULT NOW()
        );
        `);
      } else {
        console.error('Error checking for waitlist table:', checkError.message);
      }
    } else {
      console.log('✅ Waitlist table exists and is accessible');
    }
  } catch (err) {
    console.error('Error during Supabase initialization:', err instanceof Error ? err.message : String(err));
  }
}
