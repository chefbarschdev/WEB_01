import type { RequestHandler } from '@builder.io/qwik-city';
import { createSupabaseServerClient } from '~/lib/supabase';

interface WaitlistData {
  email: string;
  company: string;
  size: string;
  pain: string;
  name: string;
}

export const onPost: RequestHandler = async ({ json, request, headers }) => {
  // Allow cross-origin requests from the configured origin
  const allowedOrigin = process.env.ALLOWED_ORIGIN || '*';
  headers.set('Access-Control-Allow-Origin', allowedOrigin);
  try {
    const data: WaitlistData = await request.json();
    const ip =
      request.headers.get('x-forwarded-for') ||
      request.headers.get('cf-connecting-ip') ||
      request.headers.get('x-real-ip') ||
      'unknown';

    const supabase = createSupabaseServerClient();

    // Validate required fields
    if (
      !data.email ||
      !data.company ||
      !data.size ||
      !data.pain ||
      !data.name
    ) {
      json(400, {
        success: false,
        error: 'Missing required fields',
      });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      json(400, {
        success: false,
        error: 'Invalid email format',
      });
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
      json(500, {
        success: false,
        error: 'Database error',
      });
      return;
    }

    json(200, {
      success: true,
      message: 'Successfully joined waitlist',
    });
    return;
  } catch (error) {
    console.error('API error:', error);
    json(500, {
      success: false,
      error: 'Internal server error',
    });
    return;
  }
};

// Handle preflight requests for CORS
export const onOptions: RequestHandler = async ({ headers }) => {
  const allowedOrigin = process.env.ALLOWED_ORIGIN || '*';
  headers.set('Access-Control-Allow-Origin', allowedOrigin);
  headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Content-Type');
};
