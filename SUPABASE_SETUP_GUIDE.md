# Supabase Setup Guide for Member Portal

## 1. Configure Email Redirect URLs

### Location
Supabase Dashboard → Authentication → URL Configuration

### Add These URLs
```
Production: https://servingchurchdallas.com/auth/callback
Local Dev: http://localhost:3000/auth/callback
```

**Important:** Both URLs must be in the "Redirect URLs" list for email verification to work.

---

## 2. Make Yourself a Pastor

### Where to Run SQL
1. Go to Supabase Dashboard
2. Click **SQL Editor** in left sidebar (looks like `<>`)
3. Click **"New query"**
4. Paste SQL below
5. Click **Run**

### SQL Query
```sql
-- Replace with your actual email address
UPDATE public.members
SET role = 'pastor'
WHERE email = 'theservingchurchdallas@gmail.com';

-- Verify it worked
SELECT email, role FROM public.members WHERE role = 'pastor';
```

---

## 3. Upload Email Templates

### Location
Supabase Dashboard → Authentication → Email Templates

### Confirm Signup Email
1. Click on **"Confirm signup"** template
2. Copy contents from `/email-templates/confirm-email.html`
3. Paste into "Message Body" field
4. Subject: `Welcome to The Serving Church!`
5. Click **Save**

### Reset Password Email
1. Click on **"Reset Password"** template
2. Copy contents from `/email-templates/reset-password.html`
3. Paste into "Message Body" field
4. Subject: `Reset Your Password - The Serving Church`
5. Click **Save**

---

## 4. Run Database Migration

### Location
Supabase Dashboard → SQL Editor

### Migration File
Copy and run the entire contents of:
`/supabase/migrations/003_member_portal_fixed.sql`

This creates:
- `members` table with roles
- `announcements` table
- `polls` and `poll_responses` tables
- Row Level Security policies
- Auto-create member profile trigger

---

## 5. Test the Member Portal

### Signup Flow
1. Go to `/auth/signup`
2. Create account with your email
3. Check email for verification link
4. Click link → should redirect to `/member/dashboard`

### Login Flow
1. Go to `/auth/login`
2. Enter credentials
3. Should redirect to dashboard

### Verify Pastor Role
After making yourself a pastor via SQL:
1. Login at `/auth/login`
2. Should redirect to `/admin/dashboard` (instead of `/member/dashboard`)

---

## Common Issues

### Email verification link doesn't work
- Check redirect URLs are configured in Authentication → URL Configuration
- Make sure `/auth/callback` route exists in your deployed app

### "Must be owner of table users" error
- Don't try to modify `auth.users` table
- Only modify tables in `public` schema

### Member profile not created on signup
- Check the trigger exists: `on_auth_user_created`
- Run migration file `003_member_portal_fixed.sql`

### Can't see admin dashboard
- Verify your role is set to 'pastor' or 'admin' in SQL
- Check middleware is allowing admin routes

---

## Quick SQL Commands

### Check your member profile
```sql
SELECT * FROM public.members WHERE email = 'your-email@example.com';
```

### Make someone a pastor
```sql
UPDATE public.members SET role = 'pastor' WHERE email = 'pastor@example.com';
```

### Make someone an admin
```sql
UPDATE public.members SET role = 'admin' WHERE email = 'admin@example.com';
```

### View all members and their roles
```sql
SELECT email, full_name, role, created_at FROM public.members ORDER BY created_at DESC;
```

### Delete a test member account
```sql
-- This will cascade and delete from auth.users too if set up correctly
DELETE FROM public.members WHERE email = 'test@example.com';
```
