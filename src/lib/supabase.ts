import { createClient } from '@supabase/supabase-js';

// Mock Supabase client interface for testing
interface MockSupabaseClient {
  from: (table: string) => {
    insert: (data: Record<string, unknown>) => Promise<{ data: { id: number } | null; error: null }>;
    select: () => {
      eq: () => {
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
        // Simulate successful insert
        return { data: { id: Math.random() }, error: null };
      },
      select: () => ({
        eq: () => ({
          single: async () => ({ data: null, error: null })
        })
      })
    })
  };
}

export function createSupabaseServerClient() {
  const url = process.env.SUPABASE_URL || process.env.PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey =
    process.env.SUPABASE_ANON_KEY || process.env.PUBLIC_SUPABASE_ANON_KEY;
  const key = serviceKey || anonKey;
  const testMode = process.env.NODE_ENV === 'development' && process.env.SUPABASE_TEST_MODE === 'true';

  // In production, we must have valid credentials
  if (!testMode && (!url || !key)) {
    throw new Error('Supabase credentials are missing in production');
  }

  // Use mock client in test mode or when credentials are missing in development
  if (testMode || !url || !key) {
    if (!testMode) {
      console.warn('Missing Supabase credentials, using mock client for testing');
    } else {
      console.log('Using Supabase test mode');
    }
    return createMockSupabaseClient();
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
