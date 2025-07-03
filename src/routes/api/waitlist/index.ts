import type { RequestHandler } from '@builder.io/qwik-city';
import { getSupabaseClient } from '~/lib/supabaseClient';

interface WaitlistData {
  email: string;
  company: string;
  size: string;
  pain: string;
  name: string;
}

export const onPost: RequestHandler = async ({ json, request, headers }) => {
  const allowedOrigin = process.env.ALLOWED_ORIGIN || '*';
  headers.set('Access-Control-Allow-Origin', allowedOrigin);
  headers.set('Access-Control-Allow-Headers', 'Content-Type');
  headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');

  try {
    const data: WaitlistData = await request.json();
    const ip =
      request.headers.get('x-forwarded-for') ||
      request.headers.get('cf-connecting-ip') ||
      request.headers.get('x-real-ip') ||
      'unknown';

    const supabase = getSupabaseClient();

    if (!data.email || !data.company || !data.size || !data.pain || !data.name) {
      json(400, { success: false, error: 'Missing required fields' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      json(400, { success: false, error: 'Invalid email format' });
      return;
    }

    const { error } = await supabase.from('waitlist').insert({
      email: data.email,
      company_name: data.company,
      company_size: data.size,
      pain_point: data.pain,
      name: data.name,
      ip_address: ip,
      created_at: new Date().toISOString(),
    });

    if (error) {
      console.error('Supabase error:', error);
      if ((error as { code?: string }).code === '23505') {
        json(409, { success: false, error: 'Email already registered' });
      } else {
        json(500, { success: false, error: 'Database error' });
      }
      return;
    }

    json(200, { success: true, message: 'Successfully joined waitlist' });
  } catch (err) {
    console.error('API error:', err);
    const message = err instanceof Error ? err.message : 'Internal server error';
    json(500, { success: false, error: message });
  }
};

export const onOptions: RequestHandler = async ({ headers }) => {
  const allowedOrigin = process.env.ALLOWED_ORIGIN || '*';
  headers.set('Access-Control-Allow-Origin', allowedOrigin);
  headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Content-Type');
};
