import type { RequestHandler } from '@builder.io/qwik-city';

// In a real implementation, you would import and configure Supabase here:
// import { createClient } from '@supabase/supabase-js';
// const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);

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
    
    // Validate required fields
    if (!data.email || !data.company || !data.size || !data.pain || !data.name) {
      json(400, {
        success: false,
        error: 'Missing required fields'
      });
      return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      json(400, {
        success: false,
        error: 'Invalid email format'
      });
      return;
    }
    
    // In a real implementation, you would insert into Supabase:
    /*
    const { error } = await supabase
      .from('waitlist')
      .insert({
        email: data.email,
        company: data.company,
        size: data.size,
        pain: data.pain,
        name: data.name,
        created_at: new Date().toISOString()
      });
    
    if (error) {
      console.error('Supabase error:', error);
      json(500, {
        success: false,
        error: 'Database error'
      });
      return;
    }
    */
    
    // For demo purposes, we'll just log the data and return success
    console.log('Waitlist signup:', {
      email: data.email,
      company: data.company,
      size: data.size,
      pain: data.pain,
      name: data.name,
      timestamp: new Date().toISOString()
    });
    
    // In a real implementation, you might also:
    // 1. Send a welcome email
    // 2. Add to email marketing list
    // 3. Trigger analytics events
    // 4. Send notifications to your team
    
    json(200, {
      success: true,
      message: 'Successfully joined waitlist'
    });
    
  } catch (error) {
    console.error('API error:', error);
    json(500, {
      success: false,
      error: 'Internal server error'
    });
  }
};

// Handle preflight requests for CORS
export const onOptions: RequestHandler = async ({ headers }) => {
  headers.set('Access-Control-Allow-Origin', '*');
  headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Content-Type');
};
