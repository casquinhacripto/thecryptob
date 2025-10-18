# 🚀 B-Dashboard Quick Start

Your new Supabase project **"thecryptobApp"** is ready!

## ⚡ 2-Step Setup (3 minutes)

### Step 1: Run SQL Schema (1 minute)

1. Open: https://supabase.com/dashboard/project/ikfnwdzawdzdhupkascj/sql
2. Click **New Query**
3. Copy **ALL** contents from `supabase-schema.sql` file
4. Paste into SQL Editor
5. Click **Run**

✅ Tables created!

---

### Step 2: Get Anon Key & Add to .env.local (2 minutes)

1. Open: https://supabase.com/dashboard/project/ikfnwdzawdzdhupkascj/settings/api
2. Scroll to **Project API keys**
3. Copy the **`anon` `public`** key (long string starting with `eyJ...`)
4. Open `C:\Users\Cas\thecryptob-hub\.env.local`
5. Find this line:
   ```bash
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   ```
6. Replace `your_supabase_anon_key_here` with your actual key
7. Save the file

---

### Step 3: Restart Server & Test (1 minute)

Your dev server is already running. After updating `.env.local`:

1. Stop it (Ctrl+C in terminal)
2. Restart:
   ```bash
   cd C:\Users\Cas\thecryptob-hub
   npm run dev
   ```

3. Visit: http://localhost:3002
4. Accept cookie banner (bottom-right)
5. Click around to generate events
6. Go to: http://localhost:3002/bdashboard
7. Password: `1980_Casquinha#`

📊 **Your analytics dashboard is LIVE!**

---

## 🎯 Direct Links

- **SQL Editor**: https://supabase.com/dashboard/project/ikfnwdzawdzdhupkascj/sql
- **API Settings**: https://supabase.com/dashboard/project/ikfnwdzawdzdhupkascj/settings/api
- **Local Dashboard**: http://localhost:3002/bdashboard

---

## ✅ What's Already Done

- ✅ Supabase URL configured: `https://ikfnwdzawdzdhupkascj.supabase.co`
- ✅ Dashboard password set: `1980_Casquinha#`
- ✅ Cookie consent banner ready
- ✅ All analytics code deployed

---

## 📝 Only 2 Things You Need To Do:

1. Run the SQL schema (creates tables)
2. Add your anon key to `.env.local`

**That's it!** Everything else is ready to go! 🚀
