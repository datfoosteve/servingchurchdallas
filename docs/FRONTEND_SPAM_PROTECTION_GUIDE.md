# Frontend Integration Guide: Prayer Wall Spam Protection

This guide provides complete code examples for integrating the spam protection system into your Next.js frontend.

## Prerequisites

Before starting, ensure you have:
- ✅ Run migration 008 in Supabase
- ✅ Deployed submitPrayer and reportPrayer Edge Functions
- ✅ Set up Cloudflare Turnstile account
- ✅ Configured all environment variables

---

## Step 1: Install Dependencies

```bash
npm install @marsidev/react-turnstile
```

---

## Step 2: Add Environment Variable

Add to your `.env.local`:

```env
# Cloudflare Turnstile Public Site Key
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_cloudflare_site_key_here

# Supabase Project Reference (for Edge Functions)
NEXT_PUBLIC_SUPABASE_PROJECT_REF=nftofcjmsuwrzzrahozd
```

---

## Step 3: Update Prayer Request Form

**File:** `src/app/contact-us/prayer-request/page.tsx`

### Changes Overview:
1. Add Cloudflare Turnstile widget
2. Add honeypot field (hidden from users, catches bots)
3. Track form start time (prevents instant bot submissions)
4. Call Edge Function instead of API route
5. Handle spam detection responses

### Complete Updated Code:

```tsx
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { createClient } from '@/lib/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, UserX, Info, Shield } from 'lucide-react';
import { Turnstile } from '@marsidev/react-turnstile';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';

const prayerRequestSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Please enter a valid email address' }).optional().or(z.literal('')),
  request: z.string().min(10, { message: 'Prayer request must be at least 10 characters' }),
  // Honeypot field - should always be empty
  website: z.string().optional(),
});

type PrayerRequestFormValues = z.infer<typeof prayerRequestSchema>;

const PrayerRequestPage: React.FC = () => {
  const [isPublic, setIsPublic] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [member, setMember] = useState<any>(null);
  const [showName, setShowName] = useState(true);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const formStartTime = useRef<number>(Date.now());
  const supabase = createClient();

  const form = useForm<PrayerRequestFormValues>({
    resolver: zodResolver(prayerRequestSchema),
    defaultValues: {
      name: '',
      email: '',
      request: '',
      website: '', // Honeypot
    },
  });

  // Check if user is logged in and pre-fill form
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        setIsLoggedIn(true);
        setUser(user);

        // Get member data
        const { data: memberData } = await supabase
          .from('members')
          .select('*')
          .eq('id', user.id)
          .single();

        if (memberData) {
          setMember(memberData);

          // Pre-fill form with member data
          form.setValue('name', memberData.full_name || user.email || '');
          form.setValue('email', user.email || '');
        }
      }
    };

    checkUser();
  }, [supabase, form]);

  const onSubmit: SubmitHandler<PrayerRequestFormValues> = async (data) => {
    setIsSubmitting(true);

    try {
      // Validation: Check Turnstile token
      if (!turnstileToken) {
        toast.error('Security Verification Required', {
          description: 'Please complete the security check below the form.',
          duration: 5000,
        });
        setIsSubmitting(false);
        return;
      }

      // Validation: Check honeypot (bots fill this)
      if (data.website) {
        console.warn('Honeypot triggered - likely bot submission');
        setIsSubmitting(false);
        return;
      }

      // Prepare request body for Edge Function
      const requestBody = {
        name: data.name,
        email: data.email || undefined,
        prayer_request: data.request,
        is_public: isPublic,
        show_name: isLoggedIn ? showName : undefined,
        member_id: isLoggedIn && user ? user.id : undefined,
        turnstileToken,
        honeypot: data.website || '',
        startedAt: formStartTime.current,
      };

      // Call Supabase Edge Function instead of API route
      const response = await fetch(
        `https://${process.env.NEXT_PUBLIC_SUPABASE_PROJECT_REF}.supabase.co/functions/v1/submitPrayer`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        // Handle specific error messages
        if (result.error === 'Rate limit exceeded. Please wait a few minutes.') {
          toast.error('Submission Limit Reached', {
            description: 'You can submit up to 3 prayer requests per 10 minutes. Please try again shortly.',
            duration: 7000,
          });
        } else if (result.error === 'CAPTCHA verification failed') {
          toast.error('Security Verification Failed', {
            description: 'Please refresh the page and try again.',
            duration: 5000,
          });
        } else {
          throw new Error(result.error || 'Failed to submit prayer request');
        }
        setIsSubmitting(false);
        return;
      }

      // Success!
      form.reset();
      setTurnstileToken(null);
      formStartTime.current = Date.now(); // Reset form timer

      // Show appropriate success message based on status
      if (result.status === 'quarantine') {
        toast.success('Prayer Request Received!', {
          description: (
            <div>
              <p className="mb-2">Your prayer is under automatic review for quality assurance.</p>
              <p className="text-xs text-yellow-700">This is normal for new submitters. It will still appear on the prayer wall.</p>
            </div>
          ),
          duration: 7000,
        });
      } else if (isPublic) {
        toast.success('Prayer Request Submitted!', {
          description: showName && isLoggedIn
            ? 'Thank you for sharing. Your name will be shown with your prayer request.'
            : 'Thank you for sharing. We will be praying for you!',
          duration: 5000,
        });
      } else {
        toast.success('Private Prayer Request Submitted!', {
          description: 'Our pastoral team will be praying for you!',
          duration: 5000,
        });
      }

      // If logged in, reset form to member data
      if (isLoggedIn && member) {
        form.setValue('name', member.full_name || user.email || '');
        form.setValue('email', user.email || '');
      }
    } catch (error) {
      console.error('Error submitting prayer request:', error);
      toast.error('Submission Failed', {
        description: 'There was an error submitting your request. Please try again or contact us directly.',
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">Prayer Requests</h1>
        <p className="text-base text-gray-600 mb-8 text-center max-w-xl mx-auto">
          We believe in the power of prayer. Share your prayer request with us and our church family will lift you up in prayer.
        </p>

        {/* Member Status Card */}
        {isLoggedIn && member && (
          <Card className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="bg-blue-500 p-2 rounded-full">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    Logged in as {member.full_name || user.email}
                  </p>
                  <p className="text-sm text-gray-600">
                    Your prayers will be linked to your member account
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="public" className="w-full bg-white rounded-lg shadow-lg p-6" onValueChange={(value) => setIsPublic(value === 'public')}>
          <TabsList className="grid grid-cols-2 mb-6 w-full">
            <TabsTrigger value="public">Public Prayer</TabsTrigger>
            <TabsTrigger value="private">Private Prayer</TabsTrigger>
          </TabsList>

          <TabsContent value="public">
            <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-sm text-blue-800">
                Public prayer requests will be shared on the prayer wall for the entire congregation to see and pray for.
              </p>
            </div>

            {/* Anonymity Toggle for Logged-in Members */}
            {isLoggedIn && (
              <div className="mb-6 p-4 bg-purple-50 border border-purple-200 rounded-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {showName ? <User className="h-5 w-5 text-purple-600" /> : <UserX className="h-5 w-5 text-purple-600" />}
                    <div>
                      <Label htmlFor="show-name" className="text-sm font-semibold cursor-pointer">
                        {showName ? 'Show my name on prayer wall' : 'Post anonymously'}
                      </Label>
                      <p className="text-xs text-purple-700">
                        {showName
                          ? 'Your name will be displayed with your prayer request'
                          : 'Your prayer will show as "Anonymous"'}
                      </p>
                    </div>
                  </div>
                  <Switch
                    id="show-name"
                    checked={showName}
                    onCheckedChange={setShowName}
                  />
                </div>
              </div>
            )}

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your Name"
                          {...field}
                          disabled={isLoggedIn}
                        />
                      </FormControl>
                      {isLoggedIn && (
                        <FormDescription className="flex items-center gap-1">
                          <Info className="h-3 w-3" />
                          Name is pre-filled from your member account
                        </FormDescription>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="your@email.com"
                          {...field}
                          disabled={isLoggedIn}
                        />
                      </FormControl>
                      <FormDescription>
                        {isLoggedIn
                          ? 'Email is pre-filled from your member account'
                          : "We'll only use this to follow up on your prayer request."}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="request"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prayer Request *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Please share your prayer request..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* HONEYPOT FIELD - Hidden from real users, catches bots */}
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <div className="hidden" aria-hidden="true">
                      <Input
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        {...field}
                      />
                    </div>
                  )}
                />

                {/* Cloudflare Turnstile Widget */}
                <div className="flex justify-center py-4">
                  <Turnstile
                    siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                    onSuccess={(token) => setTurnstileToken(token)}
                    onError={() => setTurnstileToken(null)}
                    onExpire={() => setTurnstileToken(null)}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  disabled={isSubmitting || !turnstileToken}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Submitting...
                    </div>
                  ) : 'Submit Prayer Request'}
                </Button>

                {!turnstileToken && (
                  <p className="text-xs text-center text-gray-500 flex items-center justify-center gap-1">
                    <Shield className="w-3 h-3" />
                    Please complete the security check above to submit
                  </p>
                )}
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="private">
            <div className="mb-4 p-4 bg-purple-50 border border-purple-200 rounded-md">
              <p className="text-sm text-purple-800">
                Private prayer requests will only be seen by the pastoral team and will not be shared publicly.
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your Name"
                          {...field}
                          disabled={isLoggedIn}
                        />
                      </FormControl>
                      {isLoggedIn && (
                        <FormDescription className="flex items-center gap-1">
                          <Info className="h-3 w-3" />
                          Name is pre-filled from your member account
                        </FormDescription>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="your@email.com"
                          {...field}
                          disabled={isLoggedIn}
                        />
                      </FormControl>
                      <FormDescription>
                        {isLoggedIn
                          ? 'Email is pre-filled from your member account'
                          : 'So our pastoral team can follow up with you'}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="request"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prayer Request *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Please share your prayer request..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* HONEYPOT FIELD - Hidden from real users, catches bots */}
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <div className="hidden" aria-hidden="true">
                      <Input
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        {...field}
                      />
                    </div>
                  )}
                />

                {/* Cloudflare Turnstile Widget */}
                <div className="flex justify-center py-4">
                  <Turnstile
                    siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                    onSuccess={(token) => setTurnstileToken(token)}
                    onError={() => setTurnstileToken(null)}
                    onExpire={() => setTurnstileToken(null)}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  disabled={isSubmitting || !turnstileToken}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Submitting...
                    </div>
                  ) : 'Submit Private Prayer Request'}
                </Button>

                {!turnstileToken && (
                  <p className="text-xs text-center text-gray-500 flex items-center justify-center gap-1">
                    <Shield className="w-3 h-3" />
                    Please complete the security check above to submit
                  </p>
                )}
              </form>
            </Form>
          </TabsContent>
        </Tabs>

        {!isLoggedIn && (
          <Card className="mt-6 bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="h-5 w-5" />
                Are you a church member?
              </CardTitle>
              <CardDescription>
                Login to link your prayer requests to your member account and choose whether to show your name
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <a href="/auth/login">Login to Member Portal</a>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
};

export default PrayerRequestPage;
```

---

## Step 4: Update Prayer Wall Display

**File:** `src/app/prayers/page.tsx`

### Changes Overview:
1. Show status badges (public/quarantine)
2. Add "Report" button to each prayer
3. Filter out hidden prayers (handled by RLS automatically)

### Key Code Changes:

**Add state for reporting:**
```tsx
const [reportingPrayer, setReportingPrayer] = useState<string | null>(null);
```

**Add report handler function:**
```tsx
const handleReport = async (prayerId: string, prayerText: string) => {
  // Confirm with user
  if (!confirm(`Report this prayer as inappropriate?\n\n"${prayerText.slice(0, 100)}..."\n\nThis action is anonymous but will be reviewed.`)) {
    return;
  }

  setReportingPrayer(prayerId);

  try {
    const response = await fetch(
      `https://${process.env.NEXT_PUBLIC_SUPABASE_PROJECT_REF}.supabase.co/functions/v1/reportPrayer`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prayer_id: prayerId }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      if (data.error === 'Rate limit exceeded') {
        toast.error('Report Limit Reached', {
          description: 'You can report up to 5 prayers per hour. Please try again later.',
          duration: 5000,
        });
      } else if (data.error === 'You have already reported this prayer') {
        toast.info('Already Reported', {
          description: 'You have already reported this prayer. Thank you for your vigilance.',
          duration: 4000,
        });
      } else {
        throw new Error(data.error || 'Failed to report prayer');
      }
      return;
    }

    toast.success('Prayer Reported', {
      description: `Thank you for helping keep our prayer wall safe. This prayer has received ${data.reportCount} report${data.reportCount === 1 ? '' : 's'}.`,
      duration: 5000,
    });

    // Refresh prayers if it was hidden (3 reports)
    if (data.wasHidden) {
      fetchPrayers();
    }
  } catch (error) {
    console.error('Error reporting prayer:', error);
    toast.error('Report Failed', {
      description: 'There was an error reporting this prayer. Please try again.',
      duration: 5000,
    });
  } finally {
    setReportingPrayer(null);
  }
};
```

**Update prayer card rendering (add after line 232):**
```tsx
{prayers.map((prayer) => {
  const isAnswered = prayer.status === "answered";
  const isQuarantined = prayer.status === "quarantine";

  // Determine display name based on member account and show_name preference
  const getDisplayName = () => {
    if (prayer.member_id && prayer.show_name === false) {
      return "Anonymous";
    }
    if (prayer.member_id && prayer.show_name && prayer.member?.full_name) {
      return prayer.member.full_name;
    }
    return prayer.name;
  };

  const displayName = getDisplayName();
  const isMember = !!prayer.member_id;

  return (
    <Card
      key={prayer.id}
      className={`hover:shadow-xl transition-all duration-300 ${
        isAnswered
          ? "bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 border-2"
          : isQuarantined
          ? "bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-300 border-2"
          : "hover:-translate-y-1"
      }`}
    >
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              {displayName}
              {isMember && prayer.show_name && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 border border-blue-200">
                  Member
                </span>
              )}
            </div>
            {isAnswered && (
              <Sparkles className="w-5 h-5 text-green-600" />
            )}
            {isQuarantined && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700 border border-yellow-300">
                ⚠️ Under Review
              </span>
            )}
          </CardTitle>
          <span className="text-xs text-gray-500">
            {getTimeAgo(prayer.created_at)}
          </span>
        </div>
        {isAnswered && (
          <div className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full mt-2">
            <Sparkles className="w-3 h-3" />
            Answered Prayer!
          </div>
        )}
        {isQuarantined && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-2 mt-2">
            <p className="text-xs text-yellow-800">
              This prayer is under automatic review. It's still visible and can be prayed for.
            </p>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 text-sm mb-4 leading-relaxed">
          {prayer.request}
        </p>

        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant={prayingFor.has(prayer.id) ? "secondary" : "default"}
              onClick={() => handlePray(prayer.id)}
              disabled={prayingFor.has(prayer.id)}
              className="flex items-center gap-1"
            >
              🙏 {prayingFor.has(prayer.id) ? "Praying..." : "I'm Praying"}
            </Button>
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <Heart className="w-3 h-3" />
              {prayer.prayer_count} {prayer.prayer_count === 1 ? "person" : "people"}
            </span>
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleReport(prayer.id, prayer.request)}
            disabled={reportingPrayer === prayer.id}
            className="text-gray-500 hover:text-red-600 hover:bg-red-50"
          >
            {reportingPrayer === prayer.id ? (
              <div className="flex items-center gap-1 text-xs">
                <div className="w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                Reporting...
              </div>
            ) : (
              <span className="text-xs">⚠️ Report</span>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
})}
```

---

## Step 5: Update TypeScript Types

**File:** `src/lib/supabase/types.ts`

Add new fields to the Prayer type:

```typescript
export interface Prayer {
  id: string;
  name: string;
  email?: string;
  request: string;
  is_public: boolean;
  status: 'new' | 'public' | 'quarantine' | 'hidden' | 'answered';
  prayer_count: number;
  created_at: string;
  updated_at?: string;
  member_id?: string;
  show_name?: boolean;
  member?: {
    full_name: string;
    email: string;
  };
  // NEW FIELDS for spam protection
  ip_hash?: string;
  user_agent?: string;
  risk_score?: number;
  trust_level?: number;
  reports?: number;
}
```

---

## Step 6: Update Public Prayers API Route

**File:** `src/app/api/prayers/public/route.ts`

Ensure the query filters out hidden prayers (RLS should handle this, but double-check):

```typescript
const { data: prayers, error } = await supabase
  .from('prayers')
  .select(`
    *,
    member:members(full_name, email)
  `)
  .eq('is_public', true)
  .in('status', ['public', 'quarantine', 'answered']) // Exclude 'hidden'
  .order('created_at', { ascending: false })
  .range(offset, offset + limit - 1);
```

---

## Step 7: Optional - Admin Dashboard Updates

**File:** `src/app/admin/prayers/page.tsx`

Show quarantined prayers with special styling for pastor review:

```tsx
// Add filter state
const [statusFilter, setStatusFilter] = useState<'all' | 'public' | 'quarantine' | 'hidden'>('all');

// Update query
const query = supabase
  .from('prayers')
  .select('*, member:members(full_name, email)')
  .order('created_at', { ascending: false });

if (statusFilter !== 'all') {
  query.eq('status', statusFilter);
}

// Add filter buttons
<div className="flex gap-2 mb-6">
  <Button onClick={() => setStatusFilter('all')} variant={statusFilter === 'all' ? 'default' : 'outline'}>
    All
  </Button>
  <Button onClick={() => setStatusFilter('public')} variant={statusFilter === 'public' ? 'default' : 'outline'}>
    Public
  </Button>
  <Button onClick={() => setStatusFilter('quarantine')} variant={statusFilter === 'quarantine' ? 'default' : 'outline'}>
    Quarantine ⚠️
  </Button>
  <Button onClick={() => setStatusFilter('hidden')} variant={statusFilter === 'hidden' ? 'default' : 'outline'}>
    Hidden 🚫
  </Button>
</div>

// Show risk/trust scores in admin table
<div className="text-xs text-gray-500">
  <span className="font-semibold">Risk:</span> {prayer.risk_score}/100 |{' '}
  <span className="font-semibold">Trust:</span> {prayer.trust_level}/100 |{' '}
  <span className="font-semibold">Reports:</span> {prayer.reports}
</div>
```

---

## Testing Checklist

### Normal Submission
- [ ] Fill out prayer request form normally
- [ ] Complete Turnstile CAPTCHA
- [ ] Submit and verify success message
- [ ] Check prayer appears on prayer wall with "public" status

### Spam Detection
- [ ] Try submitting very short text (e.g., "test")
- [ ] Try keyboard mash (e.g., "asdfasdfasdfasdf")
- [ ] Try multiple links (e.g., "Check https://spam1.com and https://spam2.com")
- [ ] Verify these get "quarantine" status with yellow badge

### Rate Limiting
- [ ] Submit 3 prayers quickly
- [ ] Try submitting a 4th within 10 minutes
- [ ] Verify "Rate limit exceeded" error message

### Honeypot (Bot Detection)
- [ ] Use browser dev tools to make honeypot field visible
- [ ] Fill it out and submit
- [ ] Verify submission is silently rejected (no error shown to bot)

### Community Reporting
- [ ] Submit a test prayer
- [ ] Click "Report" button 3 times from different browsers/IPs
- [ ] Verify prayer disappears after 3rd report (status: hidden)
- [ ] Verify "Rate limit exceeded" after 5 reports in an hour

### Turnstile Widget
- [ ] Verify Turnstile widget loads correctly
- [ ] Try submitting without completing Turnstile
- [ ] Verify error message appears
- [ ] Complete Turnstile and verify submission works

---

## Troubleshooting

### Turnstile Widget Not Loading
```
Error: Invalid site key
```
**Fix:** Verify `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is set correctly in `.env.local`

### Edge Function 404 Error
```
Error: Failed to fetch
```
**Fix:** Verify `NEXT_PUBLIC_SUPABASE_PROJECT_REF` matches your project and Edge Functions are deployed

### Prayers Not Appearing
**Check:**
1. Status is 'public' or 'quarantine' (not 'hidden')
2. `is_public` is true
3. RLS policies allow SELECT for unauthenticated users
4. Check browser console for errors

### CORS Errors
**Fix:** Edge Functions already include CORS headers. If issues persist, check Supabase function logs:
```bash
supabase functions logs submitPrayer --project-ref nftofcjmsuwrzzrahozd
```

---

## Environment Variables Summary

**Required in `.env.local`:**
```env
# Existing
NEXT_PUBLIC_SUPABASE_URL=https://nftofcjmsuwrzzrahozd.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# New for spam protection
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_cloudflare_site_key
NEXT_PUBLIC_SUPABASE_PROJECT_REF=nftofcjmsuwrzzrahozd
```

**Required in Supabase (Edge Function secrets):**
```bash
TURNSTILE_SECRET_KEY=your_cloudflare_secret_key
IP_HASH_SALT=your_random_32_char_salt
PASTOR_EMAIL=theservingchurchdallas@gmail.com
RESEND_API_KEY=your_resend_api_key
```

---

## Next Steps

After completing this integration:

1. **Deploy to production:**
   ```bash
   git add .
   git commit -m "feat: integrate prayer wall spam protection"
   git push
   ```

2. **Monitor spam detection:**
   - Check admin dashboard for quarantined prayers
   - Review false positives and adjust risk thresholds if needed
   - Monitor Edge Function logs for errors

3. **Optional enhancements:**
   - Add admin "Approve" button to manually publish quarantined prayers
   - Email notifications when prayer reaches 3 reports
   - Whitelist trusted email domains (e.g., @servingchurchdallas.com)

---

**Questions?** Check the main setup guide: `SPAM_PROTECTION_SETUP.md`
