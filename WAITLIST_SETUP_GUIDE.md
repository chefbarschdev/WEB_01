# Waitlist Setup Guide

## Current Status ✅

Your project has been successfully set up with:
- ✅ Repository cloned from GitHub
- ✅ Dependencies installed
- ✅ Mock Supabase client for local testing
- ✅ Build process working
- ✅ Development server running

## Testing the Waitlist Locally

### 1. Test Mode (Current Setup)
The project is currently configured in **test mode** which uses a mock Supabase client:

```bash
npm run dev
```

Then visit: http://localhost:5173/join

**What happens in test mode:**
- Form submissions are logged to console
- No actual database storage
- No environment variable errors
- Perfect for UI/UX testing

### 2. Setting Up Real Supabase (For Production)

To test with a real database, follow these steps:

#### Step 1: Create a Free Supabase Project
1. Go to [supabase.com](https://supabase.com) <mcreference link="https://supabase.com" index="1">1</mcreference>
2. Sign up/login and create a new project
3. Wait for the project to be ready (2-3 minutes)

#### Step 2: Get Your Credentials
From your Supabase dashboard:
1. Go to **Settings** → **API**
2. Copy the **Project URL**
3. Copy the **anon/public** key
4. Copy the **service_role** key (for server operations)

#### Step 3: Create the Waitlist Table
In your Supabase dashboard, go to **SQL Editor** and run:

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

-- Enable Row Level Security
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Create policies for insert and select
CREATE POLICY waitlist_insert ON waitlist FOR INSERT WITH CHECK (true);
CREATE POLICY waitlist_select ON waitlist FOR SELECT USING (true);
```

#### Step 4: Update Environment Variables
Edit `.env.local` and replace with your real credentials:

```env
# Disable test mode for real Supabase
NODE_ENV=development
SUPABASE_TEST_MODE=false
ALLOWED_ORIGIN=http://localhost:5173

# Your real Supabase credentials
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Browser variables
PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

#### Step 5: Test with Real Database
```bash
npm run dev
```

Now form submissions will be stored in your Supabase database!

## Netlify Deployment

### Local Netlify Testing
```bash
# Build the project
npm run build

# Test with Netlify CLI (optional)
netlify dev
```

### Production Deployment
1. Connect your GitHub repo to Netlify
2. Set environment variables in Netlify dashboard:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ALLOWED_ORIGIN` (your domain)
   - `PUBLIC_SUPABASE_URL`
   - `PUBLIC_SUPABASE_ANON_KEY`

## Troubleshooting

### Common Issues:

1. **"Missing Supabase environment variables" error**
   - Check `.env.local` file exists
   - Verify all required variables are set
   - Restart dev server after changes

2. **"Invalid API key" error**
   - Double-check your Supabase keys
   - Ensure you're using the correct project
   - Verify the anon key is not truncated

3. **CORS errors**
   - Check `ALLOWED_ORIGIN` matches your domain
   - Verify Supabase RLS policies are correct

4. **Build failures**
   - Run `npm run lint` to check for errors
   - Ensure all TypeScript types are correct

## Testing Checklist

- [ ] Local dev server runs without errors
- [ ] Waitlist form loads on `/join` page
- [ ] Form validation works (required fields)
- [ ] Form submission shows success message
- [ ] Data appears in Supabase dashboard (if using real DB)
- [ ] Build process completes successfully
- [ ] Netlify deployment works

## Next Steps

1. **Test the current mock setup** - Visit http://localhost:5173/join
2. **Set up real Supabase** when ready for production
3. **Deploy to Netlify** with proper environment variables
4. **Add email notifications** (optional)
5. **Set up analytics** (optional)

---

**Current Status**: ✅ Ready for testing with mock data
**Next Action**: Test the waitlist form at http://localhost:5173/join