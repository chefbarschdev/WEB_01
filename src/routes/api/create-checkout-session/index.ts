import type { RequestHandler } from '@builder.io/qwik-city';
import Stripe from 'stripe';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
});

interface CheckoutSessionData {
  amount: number;
  name: string;
  email: string;
  message?: string;
}

export const onPost: RequestHandler = async ({ request, json }) => {
  try {
    const body = await request.json() as CheckoutSessionData;
    const { amount, name, email, message } = body;

    if (!amount || !name || !email) {
      json(400, { error: 'Missing required fields' });
      return;
    }

    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd', // Change to your preferred currency
            product_data: {
              name: 'Donation',
              description: message || 'Thank you for your generous donation!',
            },
            unit_amount: amount * 100, // amount in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${new URL(request.url).origin}/donation/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${new URL(request.url).origin}/donate/`,
      customer_email: email,
      metadata: {
        name,
        email,
        message: message || '',
      },
    });

    json(200, { id: session.id });
    return;
  } catch (err) {
    console.error('Error creating checkout session:', err);
    json(500, { error: 'Error creating checkout session' });
    return;
  }
};
