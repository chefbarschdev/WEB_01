import { type RequestHandler } from '@builder.io/qwik-city';
import Stripe from 'stripe';

export const onPost: RequestHandler = async ({ request, json }) => {
  try {
    const { amount } = await request.json();
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
      apiVersion: '2024-04-10',
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: amount,
            product_data: { name: 'Donation' },
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/donation/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/donation/cancel`,
    });

    json(200, { url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('Stripe error:', message);
    json(500, { error: message });
  }
};

export const onOptions: RequestHandler = async ({ headers }) => {
  const allowedOrigin = process.env.ALLOWED_ORIGIN || '*';
  headers.set('Access-Control-Allow-Origin', allowedOrigin);
  headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Content-Type');
};
