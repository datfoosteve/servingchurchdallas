// app/contact-us/contact-church/page.tsx
"use client";

import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";

// Define the form schema using Zod
const formSchema = z.object({
  name: z.string().min(1, { message: "Please enter your name" }),
  email: z.string().email({ message: "Invalid email address" }),
  message: z.string().min(1, { message: "Please enter your message" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactChurchPage() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data); // Handle form submission, e.g., send to an API
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Contact the Church</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
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
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="your@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <textarea
                    className="form-textarea mt-1 block w-full"
                    rows={3}
                    placeholder="Your message..."
                    {...field}
                  ></textarea>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" variant="default">
            Send Message
          </Button>
        </form>
      </Form>
    </div>
  );
}
