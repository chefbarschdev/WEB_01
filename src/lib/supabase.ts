import { createClient } from '@supabase/supabase-js';

function getEnv(name: string): string | undefined {
  const processEnv = typeof process !== 'undefined' ? process.env?.[name] : undefined;
  const denoEnv = typeof Deno !== 'undefined' ? Deno.env.get(name) : undefined;
  const netlifyEnv = (globalThis as any)?.Netlify?.env?.get?.(name);
  const metaEnv = (import.meta as any)?.env?.[name];
  return processEnv || denoEnv || netlifyEnv || metaEnv;
}

export function createSupabaseServerClient() {
  const url = getEnv('SUPABASE_URL') || getEnv('PUBLIC_SUPABASE_URL');
  const serviceKey = getEnv('SUPABASE_SERVICE_ROLE_KEY');
  const anonKey = getEnv('SUPABASE_ANON_KEY') || getEnv('PUBLIC_SUPABASE_ANON_KEY');
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

  return createClient(url, key);
}
