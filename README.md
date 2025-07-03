# Qwik + Supabase on Netlify Edge

A minimal starter using [Qwik City](https://qwik.builder.io/) with Tailwind CSS, deployed on Netlify Edge Functions and backed by Supabase.

## Quickstart

1. **Install dependencies**
   ```bash
   pnpm install
   ```
2. **Configure environment variables**
   Copy `.env.example` to `.env.local` and provide your Supabase credentials.
3. **Run in development**
   ```bash
   pnpm dev
   ```

## Deploying to Netlify

Build and deploy using the Netlify CLI:

```bash
npm run build
netlify deploy
```

Set the same environment variables in the Netlify dashboard for production.

## Folder Overview

```
src/
├── components/       # Reusable UI components
├── lib/              # Supabase client and helpers
├── routes/           # Qwik City routes (including API routes)
└── entry.*           # App entry points
```

Additional legacy and development files are kept in `archive/`.

## Supabase

The Supabase client is created in `src/lib/supabaseClient.ts`. Only the
`PUBLIC_*` variables are exposed to the browser; the service role key is
used server-side when available. Row Level Security should be enabled on
the `waitlist` table.

## Netlify

Edge functions are configured via `netlify.toml` and the adapter in
`adapters/netlify-edge/vite.config.ts`. Run `netlify dev` to preview the
production build locally.
