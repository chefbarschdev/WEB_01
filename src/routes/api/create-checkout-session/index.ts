import type { RequestHandler } from '@builder.io/qwik-city';
import Stripe from 'stripe';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export const onPost: RequestHandler = async ({ request, json }) => {
  try {
    const body = await request.json();
    const { amount, name, email, message } = body;

    // Create a Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Donation',
              description: message || 'Thank you for your generous donation!',
            },
            unit_amount: amount, // amount in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${new URL(request.url).origin}/donation/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${new URL(request.url).origin}/donate`,
      customer_email: email,
      metadata: {
        name,
        email,
        message: message || '',
      },
    });

    return json(200, { id: session.id });
  } catch (err) {
    console.error('Error creating checkout session:', err);
    return json(500, { error: 'Error creating checkout session' });
  }
};
