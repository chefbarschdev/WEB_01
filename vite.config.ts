import { defineConfig } from 'vite';
import { qwikCity } from '@builder.io/qwik-city/vite';
import { qwikVite } from '@builder.io/qwik/optimizer';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(() => {
  const isSupabaseEnabled = process.env.SUPABASE_ENABLED !== 'false';
  return {
    resolve: {
      alias: {
        ...isSupabaseEnabled ? {} : { '@supabase/supabase-js': './supabase-mock.js' },
        '@supabase/supabase-js': './path/to/supabase/alias',
      },
    },
    plugins: [
      qwikCity(),
      qwikVite(),
      tsconfigPaths(),
      ...(isSupabaseEnabled ? [] : []),
      {
        name: 'mock-alias',
        resolveId(id) {
          if (id === '@supabase/supabase-js' && !isSupabaseEnabled) {
            return './supabase-mock.js';
          }
          return null;
        },
      },
    ],
    preview: {
      headers: {
        'Cache-Control': 'public, max-age=600',
      },
    },
  };
});
