# Netlify Deployment Guide

## Prerequisites
- A Netlify account
- A Stripe account
- Node.js 18+ installed locally for development

## Environment Variables

You need to set the following environment variables in your Netlify site settings:

1. Go to your Netlify dashboard
2. Select your site
3. Go to **Site settings** > **Build & deploy** > **Environment**
4. Add the following variables:

```
# Required
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key

# Recommended for production
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Supabase (if used)
PUBLIC_SUPABASE_URL=your_supabase_url
PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Deploying to Netlify

### Option 1: Connect GitHub Repository
1. Push your code to a GitHub repository
2. Log in to Netlify
3. Click **Add new site** > **Import an existing project**
4. Select your GitHub repository
5. Configure the build settings:
   - **Build command:** `npm install && npm run build`
   - **Publish directory:** `dist`
   - **Base directory:** `WEB_01` (if your project is in a subdirectory)
6. Click **Deploy site**

### Option 2: Manual Deploy
1. Build your project locally:
   ```bash
   cd WEB_01
   npm install
   npm run build
   ```
2. Drag and drop the `dist` folder to Netlify's dashboard

## Setting Up Webhooks (Recommended for Production)

1. Go to your Stripe Dashboard > Developers > Webhooks
2. Click **Add endpoint**
3. Enter your Netlify function URL: `https://your-site.netlify.app/.netlify/functions/webhook`
4. Select the events to listen to (e.g., `checkout.session.completed`)
5. Copy the webhook signing secret and add it to your Netlify environment variables as `STRIPE_WEBHOOK_SECRET`

## Testing the Integration

1. Use test card numbers from Stripe's testing documentation
2. Test successful and failed payment scenarios
3. Verify webhook events are being received

## Troubleshooting

- **Build fails**: Check the build logs in the Netlify dashboard
- **CORS issues**: Ensure your function returns the correct CORS headers
- **Environment variables**: Double-check that all required variables are set in Netlify

## Security Considerations

- Never commit your Stripe secret keys to version control
- Use environment variables for all sensitive data
- Enable two-factor authentication on your Stripe account
- Regularly rotate your API keys

## Support

For issues with Netlify deployment, check the [Netlify documentation](https://docs.netlify.com/).
For Stripe integration issues, refer to the [Stripe documentation](https://stripe.com/docs).
