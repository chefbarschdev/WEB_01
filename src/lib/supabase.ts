import { createClient } from '@supabase/supabase-js';

export function createSupabaseServerClient() {
  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey = process.env.SUPABASE_ANON_KEY;
  const key = serviceKey || anonKey;

  if (!url) {
    throw new Error('SUPABASE_URL environment variable is not set');
  }

  if (!serviceKey && !anonKey) {
    throw new Error(
      'No Supabase API key provided: set SUPABASE_SERVICE_ROLE_KEY or SUPABASE_ANON_KEY'
    );
  }

  if (!serviceKey) {
    console.warn(
      'SUPABASE_SERVICE_ROLE_KEY not provided, falling back to anon key.'
    );
  }

  return createClient(url, key);
}
