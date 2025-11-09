# Prayer Wall Spam Protection Setup Guide

## 🎯 Overview

This system implements **automatic spam detection and community moderation** for the prayer wall, ensuring clean submissions without manual approval queues.

### Key Features:
- ✅ **Auto-publish** - Clean prayers appear immediately
- ✅ **Smart detection** - AI-powered risk scoring
- ✅ **Community moderation** - 3 reports = auto-hide
- ✅ **Trust building** - Regular users get trusted
- ✅ **Zero manual work** - No approval queue needed

---

## 🔧 Prerequisites

1. **Cloudflare Turnstile Account** (Free)
   - Sign up at: https://dash.cloudflare.com/sign-up
   - Create a new site/widget
   - Get Site Key and Secret Key

2. **Supabase CLI** (for deploying Edge Functions)
   ```bash
   npm install -g supabase
   ```

3. **Environment Variables Ready**
   - IP_HASH_SALT (generate a random 32+ character string)
   - TURNSTILE_SECRET_KEY
   - RESEND_API_KEY

---

## 📦 Installation Steps

### **Step 1: Run Database Migration**

1. Open **Supabase Dashboard** → **SQL Editor**
2. Create new query
3. Copy contents of `supabase/migrations/008_prayer_autopublish_guardrails.sql`
4. Click **Run**

This creates:
- New columns on `prayers` table (status, ip_hash, risk_score, trust_level, reports)
- `prayer_reports` table for community moderation
- RLS policies for security
- Auto-hide trigger (3 reports = hidden)
- Helper functions

---

### **Step 2: Set Up Cloudflare Turnstile**

1. **Go to Cloudflare Dashboard**
   - https://dash.cloudflare.com/
   - Navigate to "Turnstile"

2. **Create New Site**
   - **Site name:** The Serving Church Prayer Wall
   - **Domain:** servingchurchdallas.com
   - **Widget type:** Managed
   - Click "Create"

3. **Save Your Keys**
   - **Site Key** - For frontend (public)
   - **Secret Key** - For backend (private)

---

### **Step 3: Configure Environment Variables**

#### **3a. Supabase Edge Function Secrets**

Run these commands in your terminal:

```bash
# Login to Supabase CLI
supabase login

# Link to your project
supabase link --project-ref nftofcjmsuwrzzrahozd

# Set secrets (replace with your actual values)
supabase secrets set TURNSTILE_SECRET_KEY="your_cloudflare_secret_key_here"
supabase secrets set IP_HASH_SALT="your_random_32_char_salt_here"
supabase secrets set PASTOR_EMAIL="theservingchurchdallas@gmail.com"
supabase secrets set RESEND_API_KEY="your_resend_api_key_here"
```

**Generate IP_HASH_SALT:**
```bash
# On Mac/Linux
openssl rand -base64 32

# Or Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

#### **3b. Frontend Environment Variable**

Add to your `.env.local`:

```env
# Cloudflare Turnstile (Public Site Key)
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_cloudflare_site_key_here
```

---

### **Step 4: Deploy Edge Functions**

1. **Deploy submitPrayer function:**
   ```bash
   supabase functions deploy submitPrayer --project-ref nftofcjmsuwrzzrahozd
   ```

2. **Deploy reportPrayer function:**
   ```bash
   supabase functions deploy reportPrayer --project-ref nftofcjmsuwrzzrahozd
   ```

3. **Verify deployment:**
   ```bash
   supabase functions list --project-ref nftofcjmsuwrzzrahozd
   ```

   You should see both functions listed.

---

### **Step 5: Get Edge Function URLs**

Your Edge Functions will be available at:

- **Submit Prayer:** `https://nftofcjmsuwrzzrahozd.supabase.co/functions/v1/submitPrayer`
- **Report Prayer:** `https://nftofcjmsuwrzzrahozd.supabase.co/functions/v1/reportPrayer`

---

### **Step 6: Update Frontend Code**

The frontend needs to be updated to:
1. Add Cloudflare Turnstile widget
2. Call Edge Functions instead of direct Supabase inserts
3. Add honeypot field
4. Track form start time
5. Show status badges (quarantine/public)
6. Add "Report" button to prayers

**See:** Frontend integration examples below

---

## 🎨 Frontend Integration

### **Install Turnstile React Package**

```bash
npm install @marsidev/react-turnstile
```

### **Prayer Submission Form Changes**

Key changes needed in `/src/app/contact-us/prayer-request/page.tsx`:

1. Add Turnstile widget
2. Add honeypot field (hidden)
3. Track form start time
4. Call Edge Function instead of Supabase

**Example snippets will be provided in separate implementation guide**

---

## 📊 How It Works

### **Spam Detection Logic**

When a prayer is submitted, the system calculates a **Risk Score (0-100)**:

| Factor | Risk Points |
|--------|-------------|
| Keyboard mashing (random text) | +25 |
| Multiple links or HTML | +25 |
| Very short content (<20 chars) | +10 |
| Excessive special characters | +10 |
| Repeated content from same IP | +20 |

And a **Trust Level (0-100)**:
- +15 points per clean prayer in last 30 days (max 30)

**Decision:**
- If `Risk - Trust ≥ 40` → **Quarantine** (visible but marked)
- Otherwise → **Public** (normal display)

### **Community Moderation**

- Any user can report inappropriate prayers
- Reports are anonymous (IP hashed)
- One report per IP per prayer
- **3 unique reports** → prayer auto-hides
- Rate limited: 5 reports/hour per IP

---

## 🔒 Security Features

1. ✅ **Cloudflare Turnstile** - Blocks bot submissions
2. ✅ **Honeypot Field** - Catches automated bots
3. ✅ **Minimum Fill Time** - Rejects instant submissions (<1.5s)
4. ✅ **Rate Limiting**
   - Submit: 3 prayers per 10 minutes per IP
   - Report: 5 reports per hour per IP
5. ✅ **IP Hashing** - Privacy-preserving tracking (salt + SHA-256)
6. ✅ **Input Sanitization** - XSS/HTML injection protection
7. ✅ **Service Role Only** - Inserts only via Edge Function

---

## 📝 Database Schema Changes

### **New Columns on `prayers` Table:**
```sql
status TEXT ('public' | 'quarantine' | 'hidden')
ip_hash TEXT
user_agent TEXT
risk_score INTEGER (0-100)
trust_level INTEGER (0-100)
reports INTEGER (count of community reports)
```

### **New Table: `prayer_reports`**
```sql
id UUID
prayer_id UUID (FK → prayers)
ip_hash TEXT
created_at TIMESTAMPTZ
UNIQUE(prayer_id, ip_hash)
```

---

## 🎯 Testing the System

### **Test Normal Submission:**
1. Go to `/contact-us/prayer-request`
2. Fill out form normally
3. Complete Turnstile CAPTCHA
4. Submit
5. Should see "Prayer submitted successfully" (status: public)

### **Test Spam Detection:**
Try submitting:
- Very short text: "test"
- Keyboard mash: "asdfasdfasdfasdf"
- Multiple links: "Check https://spam1.com and https://spam2.com"
- Should get status: quarantine

### **Test Rate Limiting:**
1. Submit 3 prayers quickly
2. Try a 4th within 10 minutes
3. Should get "Rate limit exceeded" error

### **Test Community Reporting:**
1. Submit a test prayer
2. Report it 3 times from different IPs/browsers
3. Prayer should disappear (status: hidden)

---

## 🚀 Deployment Checklist

- [ ] Migration 008 run in Supabase
- [ ] Cloudflare Turnstile account created
- [ ] Site Key and Secret Key obtained
- [ ] Environment variables set (Supabase secrets + .env.local)
- [ ] IP_HASH_SALT generated and set
- [ ] Edge Functions deployed (submitPrayer, reportPrayer)
- [ ] Frontend updated with Turnstile widget
- [ ] Honeypot field added to form
- [ ] Form calling Edge Function instead of Supabase
- [ ] Prayer wall showing status badges
- [ ] Report button added to prayers
- [ ] Tested normal submission flow
- [ ] Tested spam detection
- [ ] Tested rate limiting
- [ ] Tested community reporting

---

## 📊 Admin Monitoring

### **View Quarantined Prayers:**
```sql
SELECT id, name, prayer_request, risk_score, trust_level, created_at
FROM prayers
WHERE status = 'quarantine'
ORDER BY created_at DESC;
```

### **View Spam Statistics:**
```sql
SELECT
  status,
  COUNT(*) as count,
  AVG(risk_score) as avg_risk,
  AVG(trust_level) as avg_trust
FROM prayers
GROUP BY status;
```

### **View Top Reported Prayers:**
```sql
SELECT p.id, p.prayer_request, p.reports, p.status
FROM prayers p
WHERE p.reports > 0
ORDER BY p.reports DESC
LIMIT 10;
```

---

## 🐛 Troubleshooting

### **Edge Function Returns 400:**
- Check Turnstile token is valid
- Verify honeypot field is empty
- Ensure form started timestamp is present

### **"CAPTCHA verification failed":**
- Verify TURNSTILE_SECRET_KEY is set correctly
- Check Turnstile site domain matches
- Try regenerating Turnstile token

### **"Rate limit exceeded":**
- Normal behavior - wait 10 minutes
- Or clear by IP hash in database (for testing)

### **Prayers Not Appearing:**
- Check `status` field (might be 'quarantine' or 'hidden')
- Verify frontend is showing all statuses
- Check browser console for errors

### **Edge Function Not Deploying:**
```bash
# Check logs
supabase functions logs submitPrayer --project-ref nftofcjmsuwrzzrahozd

# Redeploy with verbose
supabase functions deploy submitPrayer --project-ref nftofcjmsuwrzzrahozd --debug
```

---

## 📞 Support

### **Supabase Functions Dashboard:**
https://supabase.com/dashboard/project/nftofcjmsuwrzzrahozd/functions

### **View Function Logs:**
```bash
supabase functions logs submitPrayer --project-ref nftofcjmsuwrzzrahozd
supabase functions logs reportPrayer --project-ref nftofcjmsuwrzzrahozd
```

### **Test Edge Function Locally:**
```bash
supabase functions serve submitPrayer --env-file .env.local
```

---

## 🔄 Future Enhancements

- [ ] Machine learning model for better spam detection
- [ ] Whitelist trusted email domains
- [ ] Automatic trust decay over time
- [ ] Admin dashboard for spam statistics
- [ ] Email notifications for reported prayers
- [ ] IP ban list for persistent spammers
- [ ] Integrate with Akismet or similar service

---

**Last Updated:** November 9, 2025
**Version:** 1.0
**Status:** Ready for Implementation
