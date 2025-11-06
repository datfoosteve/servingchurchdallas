"use client"

import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { format, isSameDay } from "date-fns";
import { generateRecurringEvents } from "@/components/eventHelper";
const Link = React.lazy(() =>
  import("next-view-transitions").then((module) => ({ default: module.Link }))
);

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const EventsPage: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Generate events dynamically for the year and month of the selected date
  const events = generateRecurringEvents(
    date ? date.getFullYear() : new Date().getFullYear(),
    date ? date.getMonth() : new Date().getMonth()
  );

  // Filter events for selected date
  const filteredEvents = events.filter((event) =>
    isSameDay(event.date, date || new Date())
  );

  // Create a modifiers object for event highlighting
  const modifiers = {
    hasEvents: events.map((event) => event.date),
  };

  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Upcoming Events
            </h1>
            <p className="mt-4 text-base md:text-lg text-gray-600">
              Join us for inspiring worship, fellowship, and growth.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calendar Component */}
          <div className="flex justify-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border p-4"
              modifiers={modifiers}
              modifiersClassNames={{
                hasEvents: "bg-blue-200 text-blue-900 rounded-full",
              }}
            />
          </div>

          {/* Events Card */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-center">
                {date ? format(date, "MMMM d, yyyy") : "Select a date"}
              </CardTitle>
              {/* <CardDescription className="text-gray-500">
                {filteredEvents.length > 0
                  ? "Events on this day"
                  : "No events scheduled"}
              </CardDescription> */}
            </CardHeader>
            <CardContent className="text-center">
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event, index) => (
                  <div key={index} className="mb-6">
                    <h4 className="text-lg font-bold text-gray-800">
                      {event.title}
                    </h4>
                    <p className="text-gray-600">{event.description}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Location: {event.location}
                    </p>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500">
                  <p>No events for this day.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tighter">
                Sunday Service
              </h2>
              <p className="text-base text-gray-600">
                Join us every Sunday at 10:30 AM for a time of worship, prayer,
                and biblical teaching. Our service is designed to be a
                welcoming, uplifting experience for all ages.
              </p>
              <Link
                className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                href="/about-us"
              >
                Learn More
              </Link>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tighter">
                Bible Study
              </h2>
              <p className="text-base text-gray-600">
                Deepen your understanding of God&apos;s Word through our weekly
                Bible study. We offer groups for all ages and stages of life,
                led by knowledgeable and caring leaders.
              </p>
              <Link
                className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                href="/contact-us/contact-church"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EventsPage;
