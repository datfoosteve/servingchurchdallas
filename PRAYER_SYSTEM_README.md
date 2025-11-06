# 🙏 Prayer Request Management System

## Overview

Your church website now includes a comprehensive Prayer Request Management System with:

- ✅ **Database Storage** - All prayers saved to Supabase PostgreSQL
- ✅ **Admin Dashboard** - Manage prayers, update statuses, track engagement
- ✅ **Public Prayer Wall** - Display public prayers on homepage with "I'm Praying" feature
- ✅ **Email Notifications** - Resend integration (keeps working as before)
- ✅ **Authentication** - Secure admin access with Supabase Auth
- ✅ **Status Tracking** - Mark prayers as New, Praying, Answered, Ongoing, Archived
- ✅ **Privacy Controls** - Public/Private prayer requests
- ✅ **Engagement Tracking** - Track how many people are praying

---

## 🚀 Quick Start

### 1. Set Up Supabase (Required)

**Follow the detailed guide:** `SUPABASE_SETUP.md`

**Quick Steps:**
1. Create a free Supabase account at https://supabase.com
2. Create a new project
3. Run `supabase/schema.sql` in the SQL Editor
4. Copy your Project URL and anon key
5. Add to `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
   ```
6. Create an admin user in Supabase Authentication

### 2. Deploy

```bash
# Install dependencies (already done)
npm install

# Run locally
npm run dev

# Build for production
npm run build
```

### 3. Add Environment Variables to Vercel

Go to Vercel Dashboard → Your Project → Settings → Environment Variables

Add all the variables from `.env.local.example`

---

## 📂 What Was Added

### New Files

```
src/
├── lib/
│   └── supabase/
│       ├── client.ts          # Client-side Supabase client
│       ├── server.ts          # Server-side Supabase client
│       └── types.ts           # TypeScript types for prayers
├── app/
│   ├── admin/
│   │   ├── login/
│   │   │   └── page.tsx       # Admin login page
│   │   └── prayers/
│   │       └── page.tsx       # Admin dashboard
│   └── api/
│       ├── prayers/
│       │   ├── public/
│       │   │   └── route.ts   # GET public prayers
│       │   └── [id]/
│       │       └── pray/
│       │           └── route.ts  # POST "I'm praying"
│       └── admin/
│           └── prayers/
│               ├── route.ts      # GET all prayers (admin)
│               └── [id]/
│                   └── route.ts  # PATCH/DELETE prayer (admin)
├── components/
│   └── prayer-wall.tsx        # Public prayer wall component
├── middleware.ts              # Protect admin routes
└── supabase/
    └── schema.sql             # Database schema

Documentation:
├── SUPABASE_SETUP.md          # Detailed Supabase setup guide
├── PRAYER_SYSTEM_README.md    # This file
└── .env.local.example         # Environment variables template
```

### Modified Files

```
src/app/
├── page.tsx                   # Added PrayerWall component
└── api/
    └── prayer-requests/
        └── route.ts           # Enhanced to save to database
```

---

## 🔐 Admin Access

### Creating Admin Users

1. Go to your Supabase project
2. Click **"Authentication"** → **"Users"**
3. Click **"Add user"** → **"Create new user"**
4. Enter email and password
5. ✅ Check **"Auto Confirm User"**
6. Click **"Create user"**

### Logging In

1. Go to `https://yoursite.com/admin/login`
2. Enter admin email and password
3. You'll be redirected to `/admin/prayers`

### Admin Dashboard Features

- **View All Prayers** - See both public and private requests
- **Search & Filter** - Search by name/content, filter by status
- **Update Status** - Mark as Praying, Answered, Ongoing
- **Archive** - Remove old prayers from active list
- **Email Links** - Click email to contact requester
- **Prayer Count** - See how many people are praying

---

## 🎨 Public Prayer Wall

### Features

- **Auto-Updates** - Fetches latest 6 public prayers
- **"I'm Praying" Button** - Increments counter (one per IP per day)
- **Time Stamps** - Shows "2h ago", "3d ago", etc.
- **Responsive** - Looks great on all devices
- **Privacy** - Only shows public prayers, first name only

### Customization

Edit `src/components/prayer-wall.tsx` to:
- Change number of prayers shown (line 21: `limit=6`)
- Customize styling
- Modify card layout

---

## 📊 Database Schema

### Tables

**prayers**
```sql
- id (UUID, primary key)
- name (text, required)
- email (text, optional)
- request (text, required)
- is_public (boolean, default false)
- status (enum: new, praying, answered, ongoing, archived)
- prayer_count (integer, tracks "I'm praying" clicks)
- created_at (timestamp)
- updated_at (timestamp, auto-updates)
- archived_at (timestamp, nullable)
```

**prayer_responses**
```sql
- id (UUID, primary key)
- prayer_id (UUID, foreign key to prayers)
- ip_address (text, for spam prevention)
- created_at (timestamp)
- UNIQUE(prayer_id, ip_address, created_at::DATE) - prevents duplicate prayers
```

### Security (Row Level Security)

- ✅ Anonymous users can INSERT prayers
- ✅ Anonymous users can READ public prayers only
- ✅ Anonymous users can click "I'm Praying"
- ✅ Authenticated users (admins) can READ/UPDATE all prayers
- ✅ IP-based spam prevention on prayer responses

---

## 🔄 API Endpoints

### Public Endpoints

```
POST   /api/prayer-requests          # Submit a prayer (existing)
GET    /api/prayers/public           # Get public prayers
POST   /api/prayers/[id]/pray        # "I'm praying" button
```

### Admin Endpoints (Auth Required)

```
GET    /api/admin/prayers            # Get all prayers
PATCH  /api/admin/prayers/[id]       # Update prayer status
DELETE /api/admin/prayers/[id]       # Delete prayer
```

---

## 🎯 Usage Examples

### Submit a Prayer (Already Working)

Users go to `/contact-us/prayer-request` and fill out the form.

**What Happens:**
1. Saved to Supabase database ✅
2. Email sent to church (via Resend) ✅
3. Email includes link to admin dashboard ✅
4. If public, appears on Prayer Wall ✅

### Mark Prayer as "Praying"

**Admin Dashboard:**
1. Login at `/admin/login`
2. Click "Mark as Praying" button
3. Status updates immediately
4. Requester sees status if they check back

### "I'm Praying" Button (Public)

**Homepage Prayer Wall:**
1. Visitor clicks "I'm Praying"
2. Counter increments
3. Can only pray once per day (IP tracked)
4. Shows "X people praying"

---

## 🚧 Troubleshooting

### Can't log into admin

**Check:**
1. Did you create a user in Supabase Authentication?
2. Is "Auto Confirm User" checked?
3. Are your env vars set correctly?
4. Try password reset in Supabase dashboard

### Prayers not appearing on Prayer Wall

**Check:**
1. Is the prayer marked as "Public"?
2. Is it archived?
3. Is the status "new", "praying", or "ongoing"?
4. Check browser console for errors

### Database errors

**Check:**
1. Did you run the full `supabase/schema.sql`?
2. Are RLS policies enabled?
3. Check Supabase Dashboard → Logs

### "I'm Praying" button not working

**Check:**
1. Is the prayer public?
2. Have you already clicked it today? (IP limitation)
3. Check browser console and network tab

---

## 📈 Future Enhancements (Optional)

**Ideas for later:**
- Email confirmation to prayer requester
- Follow-up reminders after X days
- Prayer teams (assign prayers to groups)
- Analytics dashboard (prayer trends, response times)
- Export prayers to CSV
- Prayer request categories (health, family, job, etc.)
- SMS notifications for urgent prayers
- Integration with church app

---

## 🆘 Support

If you need help:
1. Check `SUPABASE_SETUP.md` for setup issues
2. Review Supabase logs: Dashboard → Logs
3. Check browser console (F12) for errors
4. Verify all environment variables are set
5. Contact your developer or web team

---

## 📝 Notes

- **Supabase free tier** is more than enough for a church (500MB DB, 2GB bandwidth)
- **Backup:** Supabase auto-backs up, but you can manually export too
- **Privacy:** Private prayers are NEVER shown publicly (RLS enforced)
- **Spam prevention:** IP-based limits prevent abuse
- **Email still works:** All existing email functionality is preserved

---

**🎉 Your prayer system is ready! May it bless your church and congregation.**
