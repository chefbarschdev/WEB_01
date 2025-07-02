import { type RequestHandler } from '@builder.io/qwik-city';
import { createSupabaseServerClient } from '~/lib/supabase';

export const onPost: RequestHandler = async ({ request, json }) => {
  const { email } = await request.json();

  try {
    const supabase = createSupabaseServerClient();
    const { error } = await supabase.from('waitlist').insert({ email });

    if (error) {
      json(500, { error: error.message });
      return;
    }

    json(200, { success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    json(500, { error: message });
  }
};
