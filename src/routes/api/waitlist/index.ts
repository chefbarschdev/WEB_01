import { type RequestHandler } from '@builder.io/qwik-city';
import { createClient } from '@supabase/supabase-js';

export const onPost: RequestHandler = async ({ request, json }) => {
  const { email } = await request.json();

  const url = process.env.SUPABASE_URL;
  const anon = process.env.SUPABASE_ANON_KEY;

  if (!url || !anon) {
    json(500, { error: 'Supabase env vars missing' });
    return;
  }

  const supabase = createClient(url, anon);

  const { error } = await supabase.from('waitlist').insert({ email });

  if (error) {
    json(500, { error: error.message });
    return;
  }

  json(200, { success: true });
};
