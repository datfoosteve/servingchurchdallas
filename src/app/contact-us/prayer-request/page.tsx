"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const schema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  request: z.string().min(1, { message: 'Prayer request is required' }),
});


const PrayerRequestPage: React.FC = () => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema)
  });

  const onSubmit: SubmitHandler<z.infer<typeof schema>> = data => {
    console.log(data);
    form.reset();  // Reset the form after submission
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Prayer Requests</h1>
      <Tabs defaultValue="public" className="w-full">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="public">Public Prayer</TabsTrigger>
          <TabsTrigger value="private">Private Prayer</TabsTrigger>
        </TabsList>
        <TabsContent value="public">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Input {...form.register('name')} placeholder="Your Name" />
            {form.formState.errors.name && <p>{form.formState.errors.name.message}</p>}
            <Input {...form.register('request')} placeholder="Your Prayer Request" />
            {form.formState.errors.request && <p>{form.formState.errors.request.message}</p>}
            <Button type="submit">Submit Public Request</Button>
          </form>
        </TabsContent>
        <TabsContent value="private">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Input {...form.register('name')} placeholder="Your Name" />
            {form.formState.errors.name && <p>{form.formState.errors.name.message}</p>}
            <Input {...form.register('request')} placeholder="Your Prayer Request" />
            {form.formState.errors.request && <p>{form.formState.errors.request.message}</p>}
            <Button type="submit">Send Private Request</Button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PrayerRequestPage;