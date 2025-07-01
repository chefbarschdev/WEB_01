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
│   └── api/join-waitlist/ # API endpoint for form submissions
├── components/
│   ├── NavBar.tsx         # Navigation component
│   ├── Hero.tsx           # Hero section with CTA
│   ├── ValueProps.tsx     # Value proposition cards
│   ├── DemoShowcase.tsx   # Demo tabs container
│   ├── Chatbot.tsx        # Interactive AI chatbot
│   ├── CTAJoinWaitlist.tsx# Call-to-action banner
│   ├── WaitlistForm.tsx   # Email capture form
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

## 🔧 Environment Setup

### Supabase Configuration
Create a `.env.local` file:
```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### Database Schema
```sql
CREATE TABLE waitlist (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  company_size VARCHAR(50),
  pain_point TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
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

## 🤝 Contributing

1. Follow the existing code style
2. Use TypeScript for type safety
3. Test on mobile devices
4. Optimize for performance
5. Update documentation

## 📞 Support

For questions or issues:
- Email: support@aisolutions.com
- Documentation: [Internal Wiki]
- Slack: #dev-aisolutions

---

**Built with ❤️ using Qwik for maximum performance and user experience.**