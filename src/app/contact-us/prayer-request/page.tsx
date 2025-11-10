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
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import Turnstile from "@marsidev/react-turnstile";

const prayerRequestSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Please enter a valid email address' }).optional().or(z.literal('')),
  request: z.string().min(10, { message: 'Prayer request must be at least 10 characters' }),
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
  const turnstileRef = useRef<any>(null);
  const supabase = createClient();

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  const form = useForm<PrayerRequestFormValues>({
    resolver: zodResolver(prayerRequestSchema),
    defaultValues: {
      name: '',
      email: '',
      request: '',
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
    // Validate Turnstile
    if (!turnstileToken) {
      toast.error('Security Verification Required', {
        description: 'Please complete the security verification below.',
        duration: 5000,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const requestBody: any = {
        ...data,
        isPublic,
        turnstileToken,
      };

      // If logged in, include member_id and show_name preference
      if (isLoggedIn && user) {
        requestBody.member_id = user.id;
        requestBody.show_name = showName;
      }

      const response = await fetch('/api/prayer-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit prayer request');
      }

      form.reset();

      // Reset Turnstile after successful submission
      if (turnstileRef.current) {
        turnstileRef.current.reset();
      }
      setTurnstileToken(null);

      // Show success toast
      if (isPublic) {
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
    } catch (error: any) {
      console.error('Error submitting prayer request:', error);

      // Reset Turnstile on error
      if (turnstileRef.current) {
        turnstileRef.current.reset();
      }
      setTurnstileToken(null);

      toast.error('Submission Failed', {
        description: error.message || 'There was an error submitting your request. Please try again or contact us directly.',
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

                {/* Cloudflare Turnstile */}
                <div className="flex flex-col items-center gap-2 py-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <Shield className="h-4 w-4" />
                    <span>Security Verification</span>
                  </div>
                  {siteKey ? (
                    <Turnstile
                      ref={turnstileRef}
                      siteKey={siteKey}
                      onSuccess={(token) => setTurnstileToken(token)}
                      onError={() => {
                        toast.error('Security verification failed', {
                          description: 'Please refresh the page and try again.',
                          duration: 5000,
                        });
                        setTurnstileToken(null);
                      }}
                      onExpire={() => setTurnstileToken(null)}
                      options={{
                        theme: 'light',
                        size: 'normal',
                      }}
                    />
                  ) : (
                    <p className="text-sm text-red-600">Security verification not configured</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  disabled={isSubmitting || !turnstileToken}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Prayer Request'}
                </Button>
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

                {/* Cloudflare Turnstile */}
                <div className="flex flex-col items-center gap-2 py-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <Shield className="h-4 w-4" />
                    <span>Security Verification</span>
                  </div>
                  {siteKey ? (
                    <Turnstile
                      ref={turnstileRef}
                      siteKey={siteKey}
                      onSuccess={(token) => setTurnstileToken(token)}
                      onError={() => {
                        toast.error('Security verification failed', {
                          description: 'Please refresh the page and try again.',
                          duration: 5000,
                        });
                        setTurnstileToken(null);
                      }}
                      onExpire={() => setTurnstileToken(null)}
                      options={{
                        theme: 'light',
                        size: 'normal',
                      }}
                    />
                  ) : (
                    <p className="text-sm text-red-600">Security verification not configured</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  disabled={isSubmitting || !turnstileToken}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Private Prayer Request'}
                </Button>
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
