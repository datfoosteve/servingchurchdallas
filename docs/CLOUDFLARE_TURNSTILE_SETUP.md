# Cloudflare Turnstile Setup - Quick Guide

**Time Required:** 5 minutes
**Cost:** FREE

---

## Step 1: Create Cloudflare Account (if needed)

1. Go to https://dash.cloudflare.com/sign-up
2. Sign up with your email (theservingchurchdallas@gmail.com recommended)
3. Verify your email

---

## Step 2: Navigate to Turnstile

1. Log in to https://dash.cloudflare.com
2. In the left sidebar, click **"Turnstile"**
3. If you don't see it, click the ☰ menu icon and find **"Turnstile"**

---

## Step 3: Create a New Site

1. Click **"Add Site"** or **"Create Widget"** button
2. Fill out the form:

   **Site name:** `The Serving Church - Prayer Wall`

   **Domain:** `servingchurchdallas.com` (or your actual domain)
   - If testing locally first, add: `localhost`

   **Widget Mode:** Select **"Managed"** (recommended)
   - This automatically adjusts difficulty based on visitor behavior

3. Click **"Create"**

---

## Step 4: Get Your Keys

After creating the site, you'll see:

```
✅ Widget created successfully!

Site Key (Public):    1x00000000000000000000AA
Secret Key (Private): 1x0000000000000000000000000000000AA
```

**Copy both keys** - you'll need them next.

---

## Step 5: Add Keys to Your Project

### For Local Development (.env.local):

Create or update `/home/user/servingchurchdallas/.env.local`:

```env
# Cloudflare Turnstile Keys
NEXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA
```

### For Supabase Edge Functions:

Run these commands in your terminal:

```bash
# Set the secret key for Edge Functions
supabase secrets set TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA --project-ref nftofcjmsuwrzzrahozd
```

---

## Step 6: Test with Dummy Keys (Optional)

Cloudflare provides test keys for development:

**Always Passes:**
- Site Key: `1x00000000000000000000AA`
- Secret Key: `1x0000000000000000000000000000000AA`

**Always Fails:**
- Site Key: `2x00000000000000000000AB`
- Secret Key: `2x0000000000000000000000000000000AB`

**Forces Interactive Challenge:**
- Site Key: `3x00000000000000000000FF`
- Secret Key: `3x0000000000000000000000000000000FF`

Use these to test your integration before using real keys.

---

## Step 7: Verify Setup

1. Start your Next.js dev server: `npm run dev`
2. Go to prayer request form: http://localhost:3000/contact-us/prayer-request
3. You should see the Turnstile widget (checkbox or automatic verification)
4. Try submitting a prayer - it should work!

---

## Troubleshooting

### Widget doesn't appear
- Check console for errors
- Verify `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is in `.env.local`
- Restart your dev server after adding the key

### "Invalid site key" error
- Make sure you copied the **Site Key** (not Secret Key) to `.env.local`
- Check for extra spaces or missing characters

### CAPTCHA verification failed
- Check that `TURNSTILE_SECRET_KEY` is set in Supabase secrets
- Verify the secret key matches your site key

---

## Next Steps

After Turnstile is working:
1. ✅ Deploy Edge Functions (see SPAM_PROTECTION_SETUP.md)
2. ✅ Update frontend code (see FRONTEND_SPAM_PROTECTION_GUIDE.md)
3. ✅ Test the complete spam protection system

---

**Questions?** The Turnstile widget is just a security checkpoint - it's like a modern, invisible CAPTCHA that stops bots without annoying real users!
