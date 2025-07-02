import type { RequestHandler } from '@builder.io/qwik-city';
import { createClient } from '@supabase/supabase-js';

// Supabase client using server-side credentials. Keys are loaded from
// environment variables defined in `.env.local`.
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface WaitlistData {
  email: string;
  company: string;
  size: string;
  pain: string;
  name: string;
}

export const onPost: RequestHandler = async ({ json, request }) => {
  try {
    const data: WaitlistData = await request.json();
    const ip =
      request.headers.get('x-forwarded-for') ||
      request.headers.get('cf-connecting-ip') ||
      request.headers.get('x-real-ip') ||
      'unknown';

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
  } catch (error) {
    console.error('API error:', error);
    json(500, {
      success: false,
      error: 'Internal server error',
    });
  }
};

// Handle preflight requests for CORS
export const onOptions: RequestHandler = async ({ headers }) => {
  headers.set('Access-Control-Allow-Origin', '*');
  headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Content-Type');
};
