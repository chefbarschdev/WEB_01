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
  // Allow cross-origin requests
  headers.set('Access-Control-Allow-Origin', '*');
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
      return json(400, {
        success: false,
        error: 'Missing required fields',
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return json(400, {
        success: false,
        error: 'Invalid email format',
      });
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
      return json(500, {
        success: false,
        error: 'Database error',
      });
    }

    return json(200, {
      success: true,
      message: 'Successfully joined waitlist',
    });
  } catch (error) {
    console.error('API error:', error);
    return json(500, {
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
