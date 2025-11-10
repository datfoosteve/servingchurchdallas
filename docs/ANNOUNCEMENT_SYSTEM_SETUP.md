# 🔔 Announcement System Setup Guide

Complete setup guide for the enhanced announcement system with push notifications and calendar sync.

## ✨ What's Been Built

Your announcement system now includes:

1. ✅ **Database-Driven Announcements** - Public announcements component fetches from Supabase
2. ✅ **Push Notifications** - Send instant notifications to members when posting announcements
3. ✅ **Calendar Sync** - Event announcements can be added to Google Calendar, Apple Calendar, etc.
4. ✅ **Priority & Categories** - Organize announcements by priority (low/normal/high/urgent) and category (general/event/prayer/update)
5. ✅ **Admin Controls** - Full CRUD interface at `/admin/announcements`

---

## 🚀 Setup Steps

### Step 1: Install Dependencies

Run this command in your project directory:

```bash
npm install
```

This will install the new `web-push` package that was added to `package.json`.

---

### Step 2: Generate VAPID Keys

VAPID keys are required for push notifications. Generate them using the web-push CLI:

```bash
npx web-push generate-vapid-keys
```

This will output something like:

```
=======================================

Public Key:
BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBUYIHBQFLXYp5Nksh8U

Private Key:
UUxI4O8-FbRouAevSmBQ6o18hgE4nSG3qwvJTfKc-ls

=======================================
```

**Copy both keys** - you'll need them in the next step.

---

### Step 3: Add Environment Variables

Add these variables to your `.env.local` file:

```env
# Push Notification VAPID Keys (from Step 2)
NEXT_PUBLIC_VAPID_PUBLIC_KEY=your_public_key_here
VAPID_PRIVATE_KEY=your_private_key_here
VAPID_SUBJECT=mailto:team@servingchurchdallas.com
```

**Important Notes:**
- Replace `your_public_key_here` and `your_private_key_here` with the keys from Step 2
- The public key MUST have `NEXT_PUBLIC_` prefix (it's used in the browser)
- The private key should NOT have the prefix (it's server-side only)
- You can change the email in `VAPID_SUBJECT` to your preferred contact email

---

### Step 4: Run Database Migration

Apply the push notification database schema to Supabase:

#### Option A: Via Supabase Dashboard (Recommended)

1. Go to your Supabase project: https://app.supabase.com
2. Navigate to **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy the contents of `/supabase/migrations/20240115_push_notifications.sql`
5. Paste into the SQL editor
6. Click **Run** (or press Ctrl/Cmd + Enter)
7. Verify success message appears

#### Option B: Via Supabase CLI

If you have the Supabase CLI installed:

```bash
npx supabase db push
```

---

### Step 5: Verify Service Worker

The service worker file is already created at `/public/sw.js`. To verify it's accessible:

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Open your browser to `http://localhost:3000/sw.js`
3. You should see the service worker code (not a 404 error)

---

### Step 6: Test the System

#### Test 1: Database-Driven Announcements

1. Go to `/admin/announcements`
2. Create a new announcement
3. Set `is_published` to true
4. Save it
5. Visit your homepage
6. Verify the announcement appears in the public announcements section

#### Test 2: Push Notifications

1. Open your site in a browser (must be HTTPS in production, localhost works for dev)
2. Look for a push notification permission prompt (you may need to add a subscribe button to your member settings)
3. Grant permission
4. Go to `/admin/announcements`
5. Create a new announcement
6. Check the **📱 Send Push Notification** checkbox
7. Save it
8. You should receive a push notification!

#### Test 3: Calendar Sync

1. Create an announcement with category set to **"event"**
2. Publish it
3. Go to your homepage
4. Find the event announcement
5. Click the **"Add to Calendar"** button
6. A `.ics` file should download
7. Open it with your calendar app (Google Calendar, Apple Calendar, etc.)
8. Verify the event is added correctly

---

## 🎯 Next Steps (Optional)

### Add Push Notification Subscription UI

Members need a way to subscribe to push notifications. Add a subscription toggle to your member settings page:

**Example component:**

```tsx
'use client';

import { usePushNotifications } from '@/hooks/usePushNotifications';
import { Button } from '@/components/ui/button';
import { Bell, BellOff } from 'lucide-react';

export function NotificationSettings() {
  const { isSupported, isSubscribed, loading, subscribe, unsubscribe } = usePushNotifications();

  if (!isSupported) {
    return (
      <div className="p-4 bg-gray-100 rounded-lg">
        <p className="text-sm text-gray-600">
          Push notifications are not supported in this browser.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 border rounded-lg">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Push Notifications
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Receive instant notifications for new announcements
          </p>
        </div>

        <Button
          onClick={isSubscribed ? unsubscribe : subscribe}
          disabled={loading}
          variant={isSubscribed ? "destructive" : "default"}
        >
          {loading ? "Loading..." : isSubscribed ? "Disable" : "Enable"}
        </Button>
      </div>

      {isSubscribed && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
          <p className="text-sm text-green-800">
            ✓ You're subscribed to push notifications
          </p>
        </div>
      )}
    </div>
  );
}
```

Add this to your member settings/profile page.

---

### Customize Notification Preferences

The database schema includes a `notification_preferences` column on the `members` table. You can build a preferences UI to let members choose which types of announcements they want to receive:

- General announcements
- Event announcements
- Prayer requests
- Urgent updates

**Schema:**
```json
{
  "announcements": true,
  "events": true,
  "prayer_requests": false
}
```

Then update `/src/app/api/push/send/route.ts` to filter subscribers based on their preferences.

---

## 📂 Files Created/Modified

### New Files Created:

1. `/supabase/migrations/20240115_push_notifications.sql` - Database schema
2. `/public/sw.js` - Service worker for push notifications
3. `/src/hooks/usePushNotifications.ts` - React hook for managing subscriptions
4. `/src/app/api/push/subscribe/route.ts` - Subscribe to notifications API
5. `/src/app/api/push/unsubscribe/route.ts` - Unsubscribe from notifications API
6. `/src/app/api/push/send/route.ts` - Send notifications API (admin only)
7. `/src/lib/calendar.ts` - Calendar (.ics) generation utilities
8. `/src/app/api/calendar/announcement/[id]/route.ts` - Calendar download API

### Modified Files:

1. `/src/components/announcements.tsx` - Now fetches from database + calendar button
2. `/src/app/admin/announcements/page.tsx` - Added push notification checkbox
3. `/package.json` - Added `web-push` and `@types/web-push` dependencies

---

## 🔒 Security Notes

### Row Level Security (RLS)

The database migration includes RLS policies:

- **push_subscriptions**: Users can only manage their own subscriptions
- **announcements**: Only admins/pastors can create/update/delete

### Admin-Only Push Notifications

The `/api/push/send` endpoint checks that the user has `admin` or `pastor` role before sending notifications.

### VAPID Keys

- Keep your `VAPID_PRIVATE_KEY` secret (never commit to git)
- Add `.env.local` to your `.gitignore` (should already be there)
- Use different VAPID keys for development and production

---

## 🐛 Troubleshooting

### Push Notifications Not Working

1. **Check browser support**: Push notifications require HTTPS (except on localhost)
2. **Check VAPID keys**: Ensure they're set correctly in `.env.local`
3. **Check permissions**: User must grant notification permission in browser
4. **Check service worker**: Visit `/sw.js` to ensure it loads
5. **Check console**: Look for error messages in browser dev tools

### Calendar Download Not Working

1. **Check announcement category**: Must be set to "event"
2. **Check API route**: Visit `/api/calendar/announcement/[some-id]` directly
3. **Check event parsing**: The `parseEventFromAnnouncement()` function expects event details in the announcement content

### Database Errors

1. **Run migration**: Ensure the migration was applied successfully
2. **Check RLS policies**: Verify policies in Supabase dashboard
3. **Check permissions**: Ensure service role key is set in `.env.local`

---

## 📞 Support

If you run into issues:

1. Check the browser console for error messages
2. Check the Supabase logs in your dashboard
3. Verify all environment variables are set correctly
4. Ensure the migration was applied successfully

---

## ✅ Checklist

Before going live, verify:

- [ ] Ran `npm install`
- [ ] Generated VAPID keys
- [ ] Added environment variables to `.env.local`
- [ ] Applied database migration
- [ ] Tested creating an announcement
- [ ] Tested push notifications
- [ ] Tested calendar download for events
- [ ] Added notification subscription UI to member settings
- [ ] Tested on mobile devices
- [ ] Verified HTTPS is enabled in production

---

**Made with 💙 for The Serving Church**
