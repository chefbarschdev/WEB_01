import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// Minimal mock client used in development without real credentials
interface MockSupabaseClient {
  from: (table: string) => {
    insert: (data: Record<string, unknown>) => Promise<{ data: { id: number } | null; error: null }>;
    select: (columns?: string, opts?: Record<string, unknown>) => Promise<{ data: unknown; error: null }> & {
      eq: (column: string, value: unknown) => {
        single: () => Promise<{ data: null; error: null }>;
      };
    };
  };
}

// Mock Supabase client for testing
function createMockSupabaseClient(): MockSupabaseClient {
  return {
    from: (table: string) => ({
      insert: async (data: Record<string, unknown>) => {
        console.log(`[MOCK] Inserting into ${table}:`, data);
        return { data: { id: Math.random() }, error: null };
      },
      select: () =>
        Object.assign(Promise.resolve({ data: null, error: null }), {
          eq: () => ({
            single: async () => ({ data: null, error: null })
          })
        })
    })
  };
}

let supabase: SupabaseClient | MockSupabaseClient | null = null;

export function getSupabaseClient() {
  if (supabase) {
    return supabase;
  }
  const url = process.env.SUPABASE_URL || process.env.PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey =
    process.env.SUPABASE_ANON_KEY || process.env.PUBLIC_SUPABASE_ANON_KEY;
  const key = serviceKey || anonKey;
  const testMode = process.env.NODE_ENV === 'development' && process.env.SUPABASE_TEST_MODE === 'true';

  // Use mock client in test mode or when credentials are missing
  if (testMode || !url || !key) {
    if (!testMode) {
      console.warn('Missing Supabase credentials, using mock client for testing');
    } else {
      console.log('Using Supabase test mode');
    }
    supabase = createMockSupabaseClient();
    return supabase;
  }

  if (!serviceKey) {
    console.warn(
      'SUPABASE_SERVICE_ROLE_KEY not provided, falling back to anon key.'
    );
  }

  // The latest `@supabase/supabase-js` uses a single object to initialize the
  // client. The installed TypeScript types still expect the old positional
  // parameters, so we cast to `any` to avoid a compilation error while using
  // the modern API shape.
  // @ts-expect-error Supabase types may not yet support the object signature
  supabase = createClient({
    url,
    key,
    auth: { persistSession: false },
    global: { fetch },
  }) as unknown as SupabaseClient;

  return supabase;
}
