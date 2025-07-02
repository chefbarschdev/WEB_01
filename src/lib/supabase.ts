import { createClient } from '@supabase/supabase-js';

export function createSupabaseServerClient() {
  const url = process.env.SUPABASE_URL || process.env.PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey =
    process.env.SUPABASE_ANON_KEY || process.env.PUBLIC_SUPABASE_ANON_KEY;
  const key = serviceKey || anonKey;

  if (!url || !key) {
    throw new Error(
      'Missing Supabase environment variables (SUPABASE_URL/PUBLIC_SUPABASE_URL and API key)'
    );
  }

  if (!serviceKey) {
    console.warn(
      'SUPABASE_SERVICE_ROLE_KEY not provided, falling back to anon key.'
    );
  }

  return createClient(url, key, {
    auth: { persistSession: false },
    global: { fetch },
  });
}
