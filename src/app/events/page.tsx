"use client"

import React, { useState, useMemo } from "react";
import { Calendar } from "@/components/ui/calendar";
import { format, isSameDay, isAfter, startOfToday } from "date-fns";
import { generateRecurringEvents } from "@/components/eventHelper";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, MapPin, Clock } from "lucide-react";
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

  // Get upcoming events (next 3 events from today)
  const upcomingEvents = useMemo(() => {
    const today = startOfToday();
    const allEvents = [
      ...generateRecurringEvents(today.getFullYear(), today.getMonth()),
      ...generateRecurringEvents(today.getFullYear(), today.getMonth() + 1),
    ];

    return allEvents
      .filter(event => isAfter(event.date, today) || isSameDay(event.date, today))
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .slice(0, 3);
  }, []);

  // Filter events for selected date
  const filteredEvents = events.filter((event) =>
    isSameDay(event.date, date || new Date())
  );

  // Create a modifiers object for event highlighting
  const modifiers = {
    hasEvents: events.map((event) => event.date),
  };

  const getEventIcon = (title: string) => {
    if (title.includes("Sunday")) return "⛪";
    if (title.includes("Bible Study")) return "📖";
    if (title.includes("Prayer")) return "🙏";
    return "📅";
  };

  return (
    <>
      {/* Hero Section */}
      <section className="w-full py-12 md:py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-gray-900 mb-4">
              Upcoming Events
            </h1>
            <p className="mt-4 text-lg md:text-xl text-gray-600">
              Join us for inspiring worship, fellowship, and spiritual growth.
              All are welcome!
            </p>
          </div>
        </div>
      </section>

      {/* Upcoming Events Highlight Section */}
      <section className="w-full py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
            Next Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow duration-300 border-t-4 border-blue-600">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-4xl">{getEventIcon(event.title)}</span>
                    <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                      {format(event.date, "MMM d")}
                    </span>
                  </div>
                  <CardTitle className="text-xl">{event.title}</CardTitle>
                  <CardDescription className="flex items-center gap-1 text-gray-600">
                    <Clock className="w-4 h-4" />
                    {format(event.date, "EEEE, MMMM d")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-3">{event.description}</p>
                  <div className="flex items-start gap-2 text-sm text-gray-500">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{event.location}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Calendar Section */}
      <section className="w-full py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
            Event Calendar
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Calendar Component */}
            <div className="flex justify-center">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md"
                  modifiers={modifiers}
                  modifiersClassNames={{
                    hasEvents: "bg-blue-100 text-blue-900 font-bold hover:bg-blue-200",
                  }}
                />
                <p className="text-sm text-gray-500 text-center mt-4">
                  <span className="inline-block w-3 h-3 bg-blue-100 rounded-full mr-2"></span>
                  Days with events are highlighted
                </p>
              </div>
            </div>

            {/* Events Details Card */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                  <CalendarIcon className="w-6 h-6" />
                  {date ? format(date, "MMMM d, yyyy") : "Select a date"}
                </CardTitle>
                <CardDescription className="text-blue-50">
                  {filteredEvents.length > 0
                    ? `${filteredEvents.length} event${filteredEvents.length > 1 ? 's' : ''} scheduled`
                    : "No events scheduled"}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                {filteredEvents.length > 0 ? (
                  <div className="space-y-6">
                    {filteredEvents.map((event, index) => (
                      <div key={index} className="pb-6 border-b last:border-b-0 last:pb-0">
                        <div className="flex items-start gap-3">
                          <span className="text-3xl">{getEventIcon(event.title)}</span>
                          <div className="flex-1">
                            <h4 className="text-xl font-bold text-gray-900 mb-2">
                              {event.title}
                            </h4>
                            <p className="text-gray-600 mb-3">{event.description}</p>
                            <div className="flex items-start gap-2 text-sm text-gray-500">
                              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                              <span>{event.location}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <CalendarIcon className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg">No events scheduled for this day</p>
                    <p className="text-sm mt-2">Select another date to view events</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Regular Events Info Section */}
      <section className="w-full py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
            Weekly Schedule
          </h2>
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Sunday Service */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">⛪</span>
                </div>
                <CardTitle className="text-2xl">Sunday Service</CardTitle>
                <CardDescription className="text-base">Every Sunday at 10:30 AM</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Join us every Sunday for a time of worship, prayer,
                  and biblical teaching. Our service is designed to be a
                  welcoming, uplifting experience for all ages.
                </p>
                <div className="flex items-start gap-2 text-sm text-gray-500 mb-4">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Sunnyvale High School - Choir Room</span>
                </div>
                <Button asChild className="w-full">
                  <Link href="/about-us">Learn More</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Bible Study */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">📖</span>
                </div>
                <CardTitle className="text-2xl">Bible Study</CardTitle>
                <CardDescription className="text-base">Every Thursday at 5:00 PM</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Deepen your understanding of God&apos;s Word through our weekly
                  Bible study. We offer groups for all ages and stages of life,
                  led by knowledgeable and caring leaders.
                </p>
                <div className="flex items-start gap-2 text-sm text-gray-500 mb-4">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Sam&apos;s House - Call for details</span>
                </div>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/contact-us/contact-church">Contact Us</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Fasting Prayer */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">🙏</span>
                </div>
                <CardTitle className="text-2xl">Fasting Prayer</CardTitle>
                <CardDescription className="text-base">First Friday of the Month</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Join us for a special time of fasting and prayer.
                  This is a powerful time to seek God together as a community
                  and intercede for our church and community.
                </p>
                <div className="flex items-start gap-2 text-sm text-gray-500 mb-4">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Sam&apos;s House - Call for details</span>
                </div>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/contact-us/contact-church">Get Details</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export default EventsPage;
