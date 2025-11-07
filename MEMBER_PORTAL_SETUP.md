# Member Portal Setup Guide

## Phase 1: Authentication & Basic Dashboard

This initial phase provides member login, signup, and a basic dashboard.

## Setup Instructions

### 1. Set Up Supabase Environment Variables

Create a `.env.local` file in the root directory and add:

```env
NEXT_PUBLIC_SUPABASE_URL=https://nftofcjmsuwrzzrahozd.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

Get your `SUPABASE_ANON_KEY` from your Supabase dashboard:
1. Go to https://supabase.com/dashboard
2. Select your project
3. Go to Settings > API
4. Copy the `anon` `public` key

### 2. Run Database Migration

Run the SQL migration in your Supabase SQL editor:

1. Go to your Supabase dashboard
2. Click "SQL Editor"
3. Create a new query
4. Copy the contents of `supabase/migrations/003_member_portal.sql`
5. Run the migration

This creates:
- `members` table (user profiles)
- `announcements` table
- `polls` tables (for future use)
- Row Level Security policies
- Auto-trigger to create member profiles on signup

### 3. Configure Supabase Auth

In your Supabase dashboard:

1. Go to Authentication > URL Configuration
2. Add these redirect URLs:
   - `http://localhost:3000/auth/callback` (development)
   - `https://servingchurchdallas.com/auth/callback` (production)

3. Go to Authentication > Email Templates
4. Customize the confirmation email template (optional)

### 4. Create Your First Pastor Account

After running the migration:

1. Sign up at `/auth/signup`
2. Verify your email
3. Run this SQL in Supabase to make yourself a pastor:

```sql
UPDATE members
SET role = 'pastor'
WHERE email = 'your-email@example.com';
```

### 5. Install Dependencies (if needed)

```bash
npm install @supabase/ssr @supabase/supabase-js
```

## Features Included

### ✅ Authentication
- Email/password signup
- Email/password login
- Email verification
- Protected routes (middleware)

### ✅ Member Dashboard
- Welcome screen
- Quick links to Events, Prayer Wall
- Profile management (coming soon)
- Announcements (coming soon)

### ✅ Role-Based Access
- `member` - Regular members
- `pastor` - Church pastors (admin access)
- `admin` - System administrators

### ✅ Database Tables
- `members` - User profiles
- `announcements` - Church announcements
- `polls` - Polls/surveys (ready for Phase 2)

## What's Next

### Phase 2 Features (Coming Soon):
- Pastor admin panel for announcements
- Member profile editing
- Announcement system with notifications
- Basic analytics dashboard

### Phase 3 Features (Future):
- Polls & surveys
- Event RSVP system
- Live Q&A during sermons
- Member directory

## Routes

- `/auth/login` - Login page
- `/auth/signup` - Signup page
- `/auth/callback` - Email confirmation callback
- `/member/dashboard` - Member dashboard (protected)
- `/admin/dashboard` - Pastor/admin dashboard (protected, role-checked)

## Security

- Row Level Security (RLS) enabled on all tables
- Members can only update their own profiles
- Only pastors/admins can create announcements
- Middleware protects all `/member` and `/admin` routes

## Troubleshooting

### "Invalid API key" error
- Check your `.env.local` file has the correct Supabase URL and anon key
- Restart your dev server after adding environment variables

### Email not sending
- Check Supabase Auth settings
- For production, configure a custom SMTP provider in Supabase

### Can't access admin dashboard
- Make sure you've updated your role to 'pastor' or 'admin' in the database
- Check the `members` table in Supabase

## Support

Need help? Contact your developer or check:
- Supabase docs: https://supabase.com/docs
- Next.js docs: https://nextjs.org/docs
