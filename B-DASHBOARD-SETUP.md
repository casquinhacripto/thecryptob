# B-Dashboard Analytics Setup Guide

## 🎯 What is B-Dashboard?

B-Dashboard is your **private analytics dashboard** that tracks:
- ✅ Page visits & views
- ✅ Unique visitors & sessions
- ✅ Average session duration
- ✅ Button clicks & app interactions
- ✅ Widget usage & embeds
- ✅ Geographic data (countries/cities)
- ✅ Device breakdown (mobile/tablet/desktop)
- ✅ Browser & OS statistics
- ✅ Real-time activity feed

**Privacy-First:** No personal data, age, or gender tracking. Anonymous session-based analytics.

---

## 📦 Step 1: Set Up Supabase Database

### 1.1 Create Supabase Tables

1. Go to your **Supabase project**: https://supabase.com/dashboard/project/cryptosmartapp
2. Click **SQL Editor** in the left sidebar
3. Create a new query and paste the contents of `supabase-schema.sql`
4. Click **Run** to create the tables

This will create:
- `analytics_events` - Stores all tracking events
- `analytics_sessions` - Stores user session data
- Indexes for fast queries
- Row Level Security policies
- Auto-update triggers

### 1.2 Get Supabase Credentials

1. In your Supabase project, go to **Settings** → **API**
2. Copy these values:
   - **Project URL**: `https://xxx.supabase.co`
   - **Anon (public) key**: `eyJhbGc...`

---

## 🔐 Step 2: Configure Environment Variables

### 2.1 Create `.env.local` File

In the root of your project (`C:\Users\Cas\thecryptob-hub`), create a file named `.env.local`:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# B-Dashboard Password (IMPORTANT: Set a strong password!)
B_DASHBOARD_PASSWORD=YourSecurePassword123!

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://thecryptob.com
```

### 2.2 Set Your Dashboard Password

**IMPORTANT:** Change `YourSecurePassword123!` to a **strong, unique password** that only you know.

This password will protect your dashboard at `/bdashboard`.

---

## 🚀 Step 3: Test Locally

### 3.1 Start Development Server

```bash
cd C:\Users\Cas\thecryptob-hub
npm run dev
```

### 3.2 Accept Cookie Consent

1. Open `http://localhost:3002` (or your local port)
2. You'll see a **cookie consent banner** at the bottom
3. Click **"Accept & Continue"** to enable tracking

**Note:** Analytics only tracks users who accept cookies (privacy-first approach)

### 3.3 Test Analytics Tracking

1. Visit different pages:
   - Home page: `/`
   - Apps page: `/apps`
   - Support page: `/support`
   - About page: `/about`

2. Click on app buttons (VisionNote, CryptoSmartApp)

3. All activity is being tracked! ✅

### 3.4 Access Your Dashboard

1. Go to: `http://localhost:3002/bdashboard`
2. Enter your dashboard password
3. You should see:
   - **Overview cards** with stats
   - **Charts** showing pageviews over time
   - **Device breakdown** pie chart
   - **Top pages** and **top countries**
   - **Recent activity feed**

---

## 🌐 Step 4: Deploy to Production

### 4.1 Update Environment Variables in Production

**For Vercel:**
1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add the same variables from `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `B_DASHBOARD_PASSWORD`
   - `NEXT_PUBLIC_SITE_URL`

**For Google Cloud Run:**
1. Update your `cloudbuild.yaml` or deployment script
2. Add environment variables via `gcloud` command:

```bash
gcloud run services update thecryptob \
  --update-env-vars="NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co" \
  --update-env-vars="NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key" \
  --update-env-vars="B_DASHBOARD_PASSWORD=your_password" \
  --update-env-vars="NEXT_PUBLIC_SITE_URL=https://thecryptob.com"
```

### 4.2 Commit and Push

```bash
git add .
git commit -m "feat: Add B-Dashboard analytics system

• Analytics Features:
  - Privacy-focused cookie consent banner
  - Real-time event tracking (pageviews, clicks, sessions)
  - Supabase database integration
  - Admin dashboard at /bdashboard
  - Live charts and statistics
  - Geographic and device tracking
  - App click tracking

• Privacy Compliant:
  - No personal data collection
  - Anonymous session-based tracking
  - User consent required
  - No age/gender data

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"

git push
```

### 4.3 Access Production Dashboard

Once deployed, access your dashboard at:
```
https://thecryptob.com/bdashboard
```

---

## 📊 Dashboard Features

### Overview Cards
- **Total Pageviews**: All page visits in last 30 days
- **Unique Visitors**: Unique sessions
- **Avg Session Time**: How long users stay
- **Total Clicks**: All button/link clicks
- **App Clicks**: Clicks on app demo buttons
- **Widget Views**: Widget page views
- **Widget Embeds**: Widget embed code copies
- **Countries**: Number of countries visiting

### Charts
1. **Pageviews Over Time**: Line chart showing daily trends (last 7 days)
2. **Device Breakdown**: Pie chart of mobile/tablet/desktop
3. **Top Pages**: Most visited pages
4. **Top Countries**: Countries with most visitors
5. **Recent Activity**: Live feed of latest events

### Real-Time Updates
- Click **Refresh** button to update data
- Data refreshes from Supabase every time

---

## 🛠️ Customization

### Change Dashboard URL

Currently: `/bdashboard`

To change it:
1. Rename folder: `app/bdashboard` → `app/your-new-url`
2. Dashboard will be at: `https://thecryptob.com/your-new-url`

### Add More Tracking

#### Track Custom Events

In any component:

```typescript
import { trackClick } from '@/lib/analytics';

// Track a button click
<button onClick={() => trackClick('newsletter-signup', undefined, 'cta')}>
  Subscribe
</button>
```

#### Track Page Views Automatically

Already enabled! The `usePageTracking()` hook in apps page tracks visits.

To add to other pages:

```typescript
'use client';

import { usePageTracking } from '@/hooks/usePageTracking';

export default function MyPage() {
  usePageTracking(); // Automatically tracks this page

  return <div>...</div>;
}
```

---

## 🔒 Security

### Dashboard Protection
- **Password protected**: Only you can access with `B_DASHBOARD_PASSWORD`
- **Session-based**: Login persists in browser session
- **No public access**: Regular users can't find or access `/bdashboard`

### Data Privacy
- **No personal data**: No names, emails, IPs stored
- **Anonymous sessions**: Session IDs are random
- **Consent required**: Users must accept cookies
- **Geographic only**: Country/city from IP (IP not stored)

### Supabase RLS (Row Level Security)
- **Public insert**: Anyone can track events (for analytics)
- **Authenticated read**: Only admin with password can view data
- **No public access**: Regular users can't query the database

---

## 📈 Analytics Flow

```
User visits site
     ↓
Cookie consent banner appears
     ↓
User accepts cookies
     ↓
Session ID created (localStorage)
     ↓
Page view tracked → Supabase
     ↓
User clicks app button
     ↓
Click event tracked → Supabase
     ↓
User leaves site
     ↓
Session duration saved → Supabase
     ↓
You check /bdashboard
     ↓
Dashboard queries Supabase
     ↓
Beautiful charts and stats! 📊
```

---

## 🐛 Troubleshooting

### Issue: Cookie banner doesn't appear
**Solution**: Clear localStorage and refresh: `localStorage.clear()`

### Issue: Dashboard shows "Unauthorized"
**Solution**: Check that `B_DASHBOARD_PASSWORD` matches in `.env.local` and dashboard login

### Issue: No data in dashboard
**Solution**:
1. Check Supabase tables exist (run `supabase-schema.sql`)
2. Ensure cookie consent was accepted
3. Check browser console for errors
4. Verify Supabase credentials in `.env.local`

### Issue: Charts not loading
**Solution**: Make sure you have data by visiting pages and clicking buttons first

### Issue: Geolocation not working
**Solution**: The IP geolocation API (ipapi.co) is free but rate-limited. It may fail occasionally. Data will still be tracked without location.

---

## 📝 Files Created

```
thecryptob-hub/
├── lib/
│   ├── analytics.ts              # Analytics tracking functions
│   ├── supabase.ts               # Supabase client
├── hooks/
│   └── usePageTracking.ts        # Auto page tracking hook
├── components/
│   └── shared/
│       └── CookieConsent.tsx     # Cookie consent banner
├── app/
│   ├── api/
│   │   └── analytics/
│   │       ├── route.ts          # Analytics API endpoint
│   │       └── session/
│   │           └── route.ts      # Session update endpoint
│   └── bdashboard/
│       └── page.tsx              # Admin dashboard page
├── supabase-schema.sql           # Database schema
├── .env.local.example            # Environment variables template
└── B-DASHBOARD-SETUP.md          # This file
```

---

## 🎉 You're All Set!

Your B-Dashboard is ready to track analytics for TheCrypto_B Hub!

### Quick Links:
- **Production Dashboard**: https://thecryptob.com/bdashboard
- **Local Dashboard**: http://localhost:3002/bdashboard
- **Supabase Project**: https://supabase.com/dashboard/project/cryptosmartapp

### Next Steps:
1. ✅ Set up Supabase tables
2. ✅ Configure `.env.local`
3. ✅ Test locally
4. ✅ Deploy to production
5. ✅ Access dashboard and enjoy your analytics!

---

**Built with ❤️ for TheCrypto_B Hub**
*Privacy-first analytics. No BS. Just data.*
