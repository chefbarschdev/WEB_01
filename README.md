# AISOLUTIONS Qwik Site

A high-performance marketing funnel built with Qwik that showcases live AI demos and converts visitors into scheduled discovery calls.

## 🚀 Features

- **Lightning Fast**: Sub-1s load times with Qwik resumability
- **Live AI Demos**: Interactive chatbot and AI widgets
- **Conversion Optimized**: Three-page funnel designed for maximum conversion
- **Modern Stack**: Qwik + Qwik City + Tailwind CSS + Supabase
- **Mobile First**: Responsive design optimized for all devices

## 📁 Project Structure

```
src/
├── routes/
│   ├── index.tsx          # Landing page (blue theme)
│   ├── demo/index.tsx     # Demo showcase (red theme)
│   ├── join/index.tsx     # Wait-list page (green theme)
│   └── api/waitlist/      # API endpoint for form submissions
├── components/
│   ├── NavBar.tsx         # Navigation component
│   ├── Hero.tsx           # Hero section with CTA
│   ├── ValueProps.tsx     # Value proposition cards
│   ├── DemoShowcase.tsx   # Demo tabs container
│   ├── Chatbot.tsx        # Interactive AI chatbot
│   ├── CTAJoinWaitlist.tsx# Call-to-action banner
│   ├── WaitlistMachine.tsx# Waitlist state machine component
│   ├── WaitlistForm.tsx   # Legacy form component
│   ├── Testimonials.tsx   # Social proof section
│   ├── FAQ.tsx            # Frequently asked questions
│   └── Footer.tsx         # Site footer
├── lib/
│   └── fire-shader.js     # 3D fire effects (Three.js)
└── global.css             # Global styles and animations
```

## 🎨 Design System

### Color Themes

- **Landing Page**: Blue (`bg-blue-600` - #0D6EFD)
- **Demo Page**: Red (`bg-red-600` - #DC3545)
- **Wait-list Page**: Green (`bg-green-600` - #198754)

### Components

- White cards with subtle shadows
- Rounded corners (`rounded-2xl`)
- Hover animations (`hover:scale-105`)
- Fire glow effects for headlines

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. **Clone and install dependencies:**

   ```bash
   cd path/to/project
   pnpm install
   ```

2. **Start development server:**

   ```bash
   pnpm dev
   ```

3. **Build for production:**

   ```bash
   pnpm build
   ```

4. **Preview production build:**

   ```bash
   pnpm preview
   ```

5. **Run ESLint checks:**
   ```bash
   pnpm lint
   ```

## 🔧 Environment Setup

### Supabase Configuration

Copy `.env.example` to `.env.local` and fill in your Supabase credentials:

```bash
cp .env.example .env.local
```

```env
# Required server credentials
SUPABASE_URL=https://tpyfvcbudxtjqowwkmhu.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRweWZ2Y2J1ZHh0anFvd3drbWh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0NDAzNTYsImV4cCI6MjA2NzAxNjM1Nn0.CYt-h9Oywm8b_GxGQeJKSGOnAIzBIHikX3g6Cg
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Optional PUBLIC_ variants are also supported
PUBLIC_SUPABASE_URL=$SUPABASE_URL
PUBLIC_SUPABASE_ANON_KEY=$SUPABASE_ANON_KEY

# Qwik exposes only variables prefixed with PUBLIC_ to the browser.
# When deploying to Netlify ensure these vars exist or map your
# SUPABASE_URL and SUPABASE_ANON_KEY values to the PUBLIC_ versions.
```

The `SUPABASE_SERVICE_ROLE_KEY` is used during server start to automatically
create the `waitlist` table if it doesn't exist. The waitlist API will fall back
to `SUPABASE_ANON_KEY` if the service role key is not set. When this happens a
warning is logged but the API continues to function. Ensure the built-in
`execute_sql` RPC is enabled in your Supabase project so the initialization can
run successfully. Duplicate sign ups are detected and return a `409` response.

Ensure **Row Level Security** is enabled for the `waitlist` table since the anon key is exposed on the frontend. The initialization script creates simple insert/select policies for you.

When deploying to Netlify, you can install the official **Supabase Extension** from the Netlify Integrations catalog. The extension automatically injects `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` and `SUPABASE_ANON_KEY` into both your deploys and `netlify dev` sessions. This removes the need to manually copy `.env` files. If you prefer not to use the extension, define these variables manually in your site's **Environment Variables** settings so the edge functions can connect to Supabase during runtime.

Set `ALLOWED_ORIGIN` to your site's domain to control which origin may call the waitlist API. Example:

```env
ALLOWED_ORIGIN=https://example.com
```

### SMTP Configuration

Configure SMTP credentials so the contact form can send email notifications:

```env
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_username
SMTP_PASS=your_password
# Optional override for the recipient address
CONTACT_RECIPIENT=timnewlink@gmail.com
```

### Database Schema

```sql
CREATE TABLE waitlist (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  company_name VARCHAR(255),
  company_size VARCHAR(50),
  pain_point TEXT,
  name TEXT,
  ip_address TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Basic Row Level Security policies
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;
CREATE POLICY waitlist_insert ON waitlist FOR INSERT WITH CHECK (true);
CREATE POLICY waitlist_select ON waitlist FOR SELECT USING (true);
```

## 📊 Performance Targets

- **Load Time**: < 1s on mobile
- **CLS**: < 0.1
- **LCP**: < 1s
- **Lighthouse Score**: 95+

## 🔗 Integrations

- **Supabase**: Wait-list data storage
- **Calendly**: Discovery call scheduling
- **Stripe**: Payment processing for MVP Blueprint
- **PostHog**: Analytics and event tracking

## 📱 Pages Overview

### 1. Landing Page (`/`)

- Hero section with value proposition
- Three key benefits (Speed, Cost Savings, Expertise)
- Company logos and social proof
- Clear CTAs to demo and wait-list

### 2. Demo Page (`/demo/`)

- Interactive AI chatbot demo
- Tabbed interface for future demos
- Strong CTA to join wait-list
- Live demonstration of capabilities

### 3. Wait-list Page (`/join/`)

- Email capture form with validation
- Customer testimonials
- FAQ section
- Calendly embed after successful signup

## 🚀 Deployment

### Vercel (Recommended)

1. Connect GitHub repository
2. Add environment variables
3. Deploy automatically on push

### Manual Build

```bash
pnpm build
pnpm preview
```

## 📈 Analytics Events

- `page_view`: Track page visits
- `demo_interaction`: Chatbot usage
- `waitlist_signup`: Form submissions
- `cta_click`: Button interactions
- `calendly_open`: Scheduling attempts

## 🔒 Security

- Environment variables for sensitive data
- Input validation on all forms
- Rate limiting on API endpoints
- CORS configuration
- Secure headers

## 🚨 Lessons Learned: SSR & Netlify Deployment

### Critical Deployment Guidelines

Based on debugging sessions and successful deployments, follow these principles to avoid common pitfalls:

#### ✅ DO: Keep It Simple

1. **Minimal Polyfills**: Only add essential polyfills in `src/entry.netlify-edge.tsx`:
   ```typescript
   // Simple, working approach
   globalThis.window = undefined;
   globalThis.document = undefined;
   globalThis.navigator = undefined;
   ```

2. **Avoid Complex Vite Configs**: Don't over-engineer `vite.config.ts` with excessive `define` statements:
   ```typescript
   // ❌ AVOID: Complex globalThis definitions
   define: {
     'globalThis.window': 'undefined',
     'globalThis.document': 'undefined'
   }
   ```

3. **Target Specific Issues**: Make minimal, focused changes like:
   - Adding null checks for environment variables
   - Moving build tools to dependencies when needed
   - Simple SSR-safe conditionals

#### ❌ DON'T: Over-Engineer Solutions

1. **Complex Property Descriptors**: Avoid elaborate `Object.defineProperty` setups
2. **Excessive Polyfills**: Don't polyfill everything "just in case"
3. **Multiple SSR Strategies**: Stick to one consistent approach
4. **Premature Optimization**: Fix the actual error, not theoretical ones

#### 🔧 Proven Working Patterns

Reference these successful commits for guidance:
- `55bbb36`: "Fix TypeScript errors in initSupabase.ts for Netlify deployment"
- `8e791a8`: "Move ESLint and build tools to dependencies for Netlify"

#### 🐛 Common Error Patterns

**"ReferenceError: window is not defined"**
- **Root Cause**: Browser APIs accessed during SSR build
- **Solution**: Apply polyfills at the very top of entry files, before imports
- **Prevention**: Use `typeof window !== 'undefined'` checks in components

**Build Tool Missing in Production**
- **Root Cause**: Dev dependencies not available in Netlify build
- **Solution**: Move essential build tools to `dependencies` in `package.json`

#### 📋 Deployment Checklist

- [ ] Local build passes (`npm run build`)
- [ ] Environment variables configured in Netlify
- [ ] No complex polyfills or Vite configurations
- [ ] Build tools in `dependencies` if needed by production
- [ ] Test with `netlify dev` locally
- [ ] Commit message describes the specific fix

#### 🎯 Philosophy

**"Simple solutions that work > Complex solutions that might work"**

When debugging deployment issues:
1. Start with the simplest possible fix
2. Reference previous working commits
3. Avoid adding multiple "safety" measures at once
4. Test locally before deploying
5. Make one focused change per commit

## 🤝 Contributing

1. Follow the existing code style
2. Use TypeScript for type safety
3. Test on mobile devices
4. Optimize for performance
5. Update documentation
6. Run `pnpm lint` before committing
7. **Follow the SSR deployment guidelines above**

## 💡 Improvement Ideas

- ✅ Add a dedicated contact page with an embedded form.
- Publish case studies or blog posts to showcase success stories.
- Improve SEO by adding meta tags and structured data.

## 📞 Support

For questions or issues:

- Email: support@aisolutions.com
- Personal: tim.woell@gmail.com | +49 151 64438355 (Call or WhatsApp Tim Wöllmann)
- Documentation: [Internal Wiki]
- Slack: #dev-aisolutions

---

**Built with ❤️ using Qwik for maximum performance and user experience.**

## Netlify

This starter site is configured to deploy to [Netlify Edge Functions](https://docs.netlify.com/edge-functions/overview/), which means it will be rendered at an edge location near to your users.

### Local development

The [Netlify CLI](https://docs.netlify.com/cli/get-started/) can be used to preview a production build locally. To do so: First build your site, then to start a local server, run:

1. Install Netlify CLI globally `npm i -g netlify-cli`.
2. Build your site with both ssr and static `npm run build`.
3. Start a local server with `npm run serve`.
   In this project, `npm run serve` uses the `netlify dev` command to spin up a server that can handle Netlify's Edge Functions locally.
4. Visit [http://localhost:8888/](http://localhost:8888/) to check out your site.

### Edge Functions Declarations

[Netlify Edge Functions declarations](https://docs.netlify.com/edge-functions/declarations/)
can be configured to run on specific URL patterns. Each edge function declaration associates
one site path pattern with one function to execute on requests that match the path. A single request can execute a chain of edge functions from a series of declarations. A single edge function can be associated with multiple paths across various declarations.

This is useful to determine if a page response should be Server-Side Rendered (SSR) or
if the response should use a static-site generated (SSG) `index.html` file instead.

By default, the Netlify Edge adaptor will generate a `.netlify/edge-middleware/manifest.json` file, which is used by the Netlify deployment to determine which paths should, and should not, use edge functions.

To override the generated manifest, you can [add a declaration](https://docs.netlify.com/edge-functions/declarations/#add-a-declaration) to the `netlify.toml` using the `[[edge_functions]]` config. For example:

```toml
[[edge_functions]]
  path = "/admin"
  function = "auth"
```

### Addition Adapter Options

Netlify-specific option fields that can be passed to the adapter options:

- `excludedPath` this option accepts a `string` glob pattern that represents which path pattern should not go through the generated Edge Functions.

### Deployments

You can [deploy your site to Netlify](https://docs.netlify.com/site-deploys/create-deploys/) either via a Git provider integration or through the Netlify CLI. This starter site includes a `netlify.toml` file to configure your build for deployment.

#### Deploying via Git

Once your site has been pushed to your Git provider, you can either link it [in the Netlify UI](https://app.netlify.com/start) or use the CLI. To link your site to a Git provider from the Netlify CLI, run the command:

```shell
netlify link
```

This sets up [continuous deployment](https://docs.netlify.com/site-deploys/create-deploys/#deploy-with-git) for your site's repo. Whenever you push new commits to your repo, Netlify starts the build process..

#### Deploying manually via the CLI

If you wish to deploy from the CLI rather than using Git, you can use the command:

```shell
netlify deploy --build
```

You must use the `--build` flag whenever you deploy. This ensures that the Edge Functions that this starter site relies on are generated and available when you deploy your site.

Add `--prod` flag to deploy to production.

## License

This project is licensed under the [MIT License](LICENSE).
