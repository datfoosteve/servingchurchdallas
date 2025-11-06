# 🗄️ Supabase Setup Guide

This guide will help you set up the Supabase database for your Prayer Request Management System.

---

## 📋 Prerequisites

- A Supabase account (free tier is perfect for this)
- 10 minutes of your time

---

## 🚀 Step-by-Step Setup

### 1. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Click **"Start your project"** or **"Sign In"**
3. Create a new organization (if first time)
4. Click **"New Project"**
5. Fill in:
   - **Name:** `serving-church-prayers` (or any name you like)
   - **Database Password:** Create a strong password (save it somewhere safe!)
   - **Region:** Choose closest to Dallas (e.g., "East US")
6. Click **"Create new project"**
7. Wait 2-3 minutes for project to initialize

---

### 2. Run the Database Schema

1. In your Supabase project, click **"SQL Editor"** in the left sidebar
2. Click **"New query"**
3. Copy the entire contents of `supabase/schema.sql` from this repo
4. Paste it into the SQL editor
5. Click **"Run"** (or press Ctrl/Cmd + Enter)
6. You should see success messages in green ✅

**What this does:**
- Creates `prayers` table
- Creates `prayer_responses` table
- Sets up security policies (RLS)
- Creates indexes for performance
- Creates helper functions

---

### 3. Get Your API Keys

1. In Supabase, click **"Project Settings"** (gear icon in sidebar)
2. Click **"API"** in the left menu
3. You'll see two important keys:

   **Project URL:**
   ```
   https://xxxxxxxxxxxxx.supabase.co
   ```

   **anon/public key:**
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJz...
   ```

4. Copy both of these - you'll need them next!

---

### 4. Add Environment Variables

1. Create or edit `.env.local` in your project root:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Existing variables (keep these)
RESEND_API_KEY=re_...
PRAYER_REQUEST_EMAIL=theservingchurchdallas@gmail.com
RESEND_FROM_EMAIL=onboarding@resend.dev
```

2. If deploying to Vercel, also add these in:
   - **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**

---

### 5. Create an Admin User (for Dashboard Access)

1. In Supabase, click **"Authentication"** in the left sidebar
2. Click **"Users"** tab
3. Click **"Add user"** → **"Create new user"**
4. Fill in:
   - **Email:** Your email (e.g., `pastor@servingchurchdallas.com`)
   - **Password:** Create a strong password
   - **Auto Confirm User:** ✅ Check this box
5. Click **"Create user"**

**Save these credentials!** You'll use them to log into `/admin/login`

---

### 6. Test Your Setup

1. Start your Next.js dev server:
   ```bash
   npm run dev
   ```

2. Go to `http://localhost:3000/contact-us/prayer-request`

3. Submit a test prayer request

4. Check if it appears in:
   - Your email (via Resend) ✅
   - Supabase Dashboard → **Table Editor** → `prayers` table ✅

5. Try logging in at `http://localhost:3000/admin/login` with your admin credentials

---

## 🔍 Verify Everything Works

### Check Database Tables

1. In Supabase, click **"Table Editor"**
2. You should see:
   - ✅ `prayers` table
   - ✅ `prayer_responses` table

### Check Row Level Security

1. In Supabase, click **"Authentication"** → **"Policies"**
2. You should see policies for:
   - ✅ Allow anonymous insert prayers
   - ✅ Allow anonymous read public prayers
   - ✅ Allow authenticated read all prayers
   - ✅ Allow authenticated update prayers

### Test Public Prayer Wall

1. Go to your homepage
2. Scroll to the **"Prayer Wall"** section
3. You should see public prayer requests
4. Click **"🙏 I'm Praying"** button
5. Counter should increment

---

## 🛠️ Troubleshooting

### "Failed to fetch" errors

**Problem:** Can't connect to Supabase

**Solution:**
1. Check your `.env.local` has correct `NEXT_PUBLIC_SUPABASE_URL`
2. Make sure you restarted your dev server after adding env vars
3. Verify API keys are correct (no extra spaces)

### "Row Level Security policy violation"

**Problem:** Can't read/write to database

**Solution:**
1. Make sure you ran the entire `schema.sql` file
2. Check that RLS policies were created in Supabase dashboard
3. Try disabling RLS temporarily to test (not recommended for production)

### Admin login doesn't work

**Problem:** Can't log into `/admin/login`

**Solution:**
1. Check you created a user in Supabase Authentication
2. Make sure "Auto Confirm User" was checked
3. Try resetting the password in Supabase dashboard
4. Check browser console for error messages

### Prayer requests not saving to database

**Problem:** Emails work but database is empty

**Solution:**
1. Check your API route is using the Supabase client
2. Verify `NEXT_PUBLIC_SUPABASE_URL` is set correctly
3. Check Supabase logs: Dashboard → **Logs** → **Postgres Logs**

---

## 📊 Monitoring & Maintenance

### View Recent Prayer Requests

1. Supabase Dashboard → **Table Editor** → `prayers`
2. Sort by `created_at` descending
3. Click any row to see full details

### Check Database Usage

1. Supabase Dashboard → **Settings** → **Usage**
2. Free tier includes:
   - 500 MB database space
   - 2 GB bandwidth per month
   - 50,000 monthly active users
   - Plenty for a church website! ✅

### Backup Your Data

Supabase automatically backs up your database, but you can also:
1. Go to **Settings** → **Backups**
2. Click **"Download backup"** for manual backup

---

## 🎉 You're Done!

Your prayer request system is now fully set up with:
- ✅ Database storage
- ✅ Admin dashboard
- ✅ Public prayer wall
- ✅ Email notifications (Resend)
- ✅ Secure authentication

**Next steps:**
- Share the prayer wall with your congregation
- Check the admin dashboard regularly
- Follow up on prayer requests
- Update statuses as prayers are answered

---

## 🆘 Need Help?

If you run into issues:
1. Check the [Supabase Documentation](https://supabase.com/docs)
2. Look at the error messages in browser console (F12)
3. Check Supabase logs in the dashboard
4. Reach out to your developer or the community

---

**Created with ❤️ for The Serving Church**
