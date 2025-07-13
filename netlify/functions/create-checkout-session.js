const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Helper function to handle CORS
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json',
};

exports.handler = async (event) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const { amount, name, email, message } = JSON.parse(event.body);

    // Validate required fields
    if (!amount || !name || !email) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    // Create a Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Donation',
              description: message?.substring(0, 300) || 'Thank you for your generous donation!',
            },
            unit_amount: Math.round(amount * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${event.headers.origin || 'https://your-site.netlify.app'}/donation/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${event.headers.origin || 'https://your-site.netlify.app'}/donate/`,
      customer_email: email,
      metadata: {
        name: name.substring(0, 100),
        email: email.substring(0, 100),
        message: message?.substring(0, 300) || '',
      },
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ id: session.id }),
    };
  } catch (err) {
    console.error('Error creating checkout session:', err);
    return {
      statusCode: err.statusCode || 500,
      headers,
      body: JSON.stringify({ 
        error: err.message || 'Error creating checkout session' 
      }),
    };
  }
};
