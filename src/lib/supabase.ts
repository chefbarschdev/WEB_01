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
  return createMockSupabaseClient();
}

});
