"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
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
});

type PrayerRequestFormValues = z.infer<typeof prayerRequestSchema>;

const PrayerRequestPage: React.FC = () => {
  const [isPublic, setIsPublic] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<PrayerRequestFormValues>({
    resolver: zodResolver(prayerRequestSchema),
    defaultValues: {
      name: '',
      email: '',
      request: '',
    },
  });

  const onSubmit: SubmitHandler<PrayerRequestFormValues> = async (data) => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/prayer-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          isPublic,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit prayer request');
      }

      form.reset();

      // Show success toast
      if (isPublic) {
        toast.success('Prayer Request Submitted!', {
          description: 'Thank you for sharing. We will be praying for you!',
          duration: 5000,
        });
      } else {
        toast.success('Private Prayer Request Submitted!', {
          description: 'Our pastoral team will be praying for you!',
          duration: 5000,
        });
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
    <div className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">Prayer Requests</h1>
        <p className="text-base text-gray-600 mb-8 text-center max-w-xl mx-auto">
          We believe in the power of prayer. Share your prayer request with us and our church family will lift you up in prayer.
        </p>

        <Tabs defaultValue="public" className="w-full bg-white rounded-lg shadow-lg p-6" onValueChange={(value) => setIsPublic(value === 'public')}>
          <TabsList className="grid grid-cols-2 mb-6 w-full">
          <TabsTrigger value="public">Public Prayer</TabsTrigger>
          <TabsTrigger value="private">Private Prayer</TabsTrigger>
        </TabsList>

        <TabsContent value="public">
          <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-sm text-blue-800">
              Public prayer requests may be shared with the congregation and prayer team.
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
                      <Input placeholder="Your Name" {...field} />
                    </FormControl>
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
                      <Input type="email" placeholder="your@email.com" {...field} />
                    </FormControl>
                    <FormDescription>
                      We&apos;ll only use this to follow up on your prayer request.
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

              <Button type="submit" variant="default" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Public Request'}
              </Button>
            </form>
          </Form>
        </TabsContent>

        <TabsContent value="private">
          <div className="mb-4 p-4 bg-purple-50 border border-purple-200 rounded-md">
            <p className="text-sm text-purple-800">
              Private prayer requests will only be seen by our pastoral staff and prayer team leaders.
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
                      <Input placeholder="Your Name" {...field} />
                    </FormControl>
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
                      <Input type="email" placeholder="your@email.com" {...field} />
                    </FormControl>
                    <FormDescription>
                      We&apos;ll only use this to follow up on your prayer request.
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

              <Button type="submit" variant="default" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Send Private Request'}
              </Button>
            </form>
          </Form>
        </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PrayerRequestPage;