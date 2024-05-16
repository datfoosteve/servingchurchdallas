"use client";

import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar"; // Adjust the import path as necessary
import "react-calendar/dist/Calendar.css"; // Keep if you need to override default styles
import { format } from "date-fns";
const Link = React.lazy(() => import('next-view-transitions').then(module => ({ default: module.Link })));

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const EventsPage: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Upcoming Events
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Join us for inspiring worship, fellowship, and growth.
            </p>
          </div>
        </div>
      </section>

      <section className="w-screen py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white p-4 shadow rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Calendar Component */}
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate} // Assuming onSelect is the correct prop to handle date changes
            className="rounded-md border p-4"
          />
          
          {/* Card Component */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>{date ? format(date, "MMMM d, yyyy") : 'Select a date'}</CardTitle>
              <CardDescription>Events on this day</CardDescription>
            </CardHeader>
            <CardContent className="border-t-2">
              <p>Event Details.</p>
            </CardContent>
            <CardFooter className="text-end border-2">
              <p>Members:</p>
            </CardFooter>
          </Card>
        </div>
        {date && (
          <p className="text-center mt-4 text-lg">
            Selected Date: {format(date, "MMMM d, yyyy")}
          </p>
        )}
      </div>
    </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
        <div className="container px-4 md:px-6">
          <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold tracking-tighter">
                Sunday Service
              </h3>
              <p className="text-gray-600">
                Join us every Sunday at 10:30 AM for a time of worship, prayer,
                and biblical teaching. Our service is designed to be a
                welcoming, uplifting experience for all ages.
              </p>
              <Link
                className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50  "
                href="#"
              >
                Learn More
              </Link>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold tracking-tighter">
                Bible Study
              </h3>
              <p className="text-gray-600">
                Deepen your understanding of God&apos;s Word through our weekly
                Bible study. We offer groups for all ages and stages of life,
                led by knowledgeable and caring leaders.
              </p>
              <Link
                className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 "
                href="#"
              >
                Join a Group
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EventsPage;
