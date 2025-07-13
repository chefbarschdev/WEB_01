# Stripe Donation Integration Guide

This document outlines the steps needed to integrate Stripe donations into the WEB_01 project.

## Prerequisites

1. Stripe Account: https://dashboard.stripe.com/register
2. Stripe API Keys (test and live)
3. Node.js and npm installed

## Setup Steps

### 1. Install Dependencies
```bash
npm install @stripe/stripe-js
npm install --save-dev @types/stripe__stripe-js
```

### 2. Environment Variables
Add to `.env`:
```
STRIPE_PUBLIC_KEY=pk_test_your_test_public_key
STRIPE_SECRET_KEY=sk_test_your_test_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Create Donation Component
Create: `src/components/donation/DonationCard.tsx`
- Amount selection buttons
- Custom amount input
- Donation button
- Loading states

### 4. Create API Route
Create: `src/routes/api/stripe/checkout/route.ts`
- Handle checkout session creation
- Process payment intents
- Handle webhook events

### 5. Create Success/Cancel Pages
- `src/routes/donation/success.tsx`
- `src/routes/donation/cancel.tsx`

### 6. Add to Navigation
Add donation link to main navigation

## Implementation Details

### Donation Flow
1. User selects amount/clicks donate
2. Create Stripe Checkout session
3. Redirect to Stripe Checkout
4. Handle successful/failed payments
5. Redirect back to success/cancel page

### Environment Configuration
- Test mode: Uses test keys
- Production: Uses live keys
- Webhook setup required for live mode

## Testing
1. Test with Stripe test cards:
   - Success: 4242 4242 4242 4242
   - Decline: 4000 0000 0000 0002

## Deployment
1. Set up environment variables in production
2. Configure webhook in Stripe Dashboard
3. Test end-to-end flow

## Security Considerations
- Never expose secret keys in client-side code
- Validate all webhook events
- Use HTTPS in production
- Implement rate limiting

## Resources
- [Stripe Docs](https://stripe.com/docs)
- [Stripe Checkout](https://stripe.com/docs/payments/checkout)
- [Stripe Webhooks](https://stripe.com/docs/webhooks)

## Notes
- Test thoroughly in development before going live
- Monitor Stripe Dashboard for failed payments
- Consider adding analytics for donation tracking
