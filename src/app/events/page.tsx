"use client"

import React, { useState, useMemo, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { format, isSameDay, isAfter, startOfToday } from "date-fns";
import { generateMonthEvents, Event } from "@/lib/eventHelpers";
import { createClient } from "@/lib/supabase/client";
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
  const [dbEvents, setDbEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const loadEvents = async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("is_published", true)
        .order("event_date", { ascending: true });

      if (!error && data) {
        setDbEvents(data);
      }
      setLoading(false);
    };

    loadEvents();
  }, [supabase]);

  const events = useMemo(() => {
    if (loading) return [];
    return generateMonthEvents(
      dbEvents,
      date ? date.getFullYear() : new Date().getFullYear(),
      date ? date.getMonth() : new Date().getMonth()
    );
  }, [dbEvents, date, loading]);

  const upcomingEvents = useMemo(() => {
    if (loading) return [];
    const today = startOfToday();
    const allEvents = [
      ...generateMonthEvents(dbEvents, today.getFullYear(), today.getMonth()),
      ...generateMonthEvents(dbEvents, today.getFullYear(), today.getMonth() + 1),
    ];

    return allEvents
      .filter(event => isAfter(event.date, today) || isSameDay(event.date, today))
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .slice(0, 3);
  }, [dbEvents, loading]);

  const filteredEvents = events.filter((event) =>
    isSameDay(event.date, date || new Date())
  );

  const modifiers = {
    hasEvents: events.map((event) => event.date),
  };

  const getEventIcon = (event: Event) => {
    const category = event.category || "";
    if (category === "service") return "⛪";
    if (category === "bible-study") return "📖";
    if (category === "prayer") return "🙏";
    if (category === "fellowship") return "🤝";
    if (category === "special-event") return "🎉";
    if (event.title.includes("Sunday")) return "⛪";
    if (event.title.includes("Bible Study")) return "📖";
    if (event.title.includes("Prayer")) return "🙏";
    return "📅";
  };

  return (
    <main>
      <section className="bg-[#181818] py-16 md:py-24">
        <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.32em] text-brand-gold">Events</p>
            <h1 className="text-4xl font-semibold tracking-tight text-brand-ivory sm:text-5xl md:text-6xl">
              Upcoming Events
            </h1>
            <div className="mx-auto mt-6 h-px w-40 bg-gradient-to-r from-transparent via-[rgba(200,169,107,0.9)] to-transparent" />
            <p className="mt-6 text-lg leading-8 text-brand-stone md:text-xl">
              Join us for worship, fellowship, and spiritual growth. All are welcome.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-brand-section py-12 md:py-16">
        <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <h2 className="mb-10 text-center text-3xl font-semibold text-[#1f1f1f]">
            Next Events
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {upcomingEvents.map((event, index) => (
              <Card key={event.id || index} className="rounded-[24px] border border-brand-border bg-white/88 shadow-sm transition-shadow duration-300 hover:shadow-xl">
                <CardHeader>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-4xl">{getEventIcon(event)}</span>
                    <span className="rounded-full bg-[rgba(200,169,107,0.10)] px-3 py-1 text-sm font-semibold text-[#6e5b33]">
                      {format(event.date, "MMM d")}
                    </span>
                  </div>
                  <CardTitle className="text-xl text-[#1f1f1f]">{event.title}</CardTitle>
                  <CardDescription className="space-y-1 text-[#625c53]">
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="h-4 w-4 text-brand-gold" />
                      {format(event.date, "EEEE, MMMM d")}
                    </div>
                    {event.time && (
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-brand-gold" />
                        {event.time}
                      </div>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-3 text-[#625c53]">{event.description}</p>
                  <div className="flex items-start gap-2 text-sm text-[#7a746c]">
                    <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-gold" />
                    <span>{event.location}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-12 md:py-16">
        <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <h2 className="mb-10 text-center text-3xl font-semibold text-[#1f1f1f]">
            Event Calendar
          </h2>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="flex justify-center">
              <div className="rounded-[24px] border border-brand-border bg-brand-section p-6 shadow-lg">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md"
                  modifiers={modifiers}
                  modifiersClassNames={{
                    hasEvents: "bg-[rgba(200,169,107,0.20)] text-[#6e5b33] font-bold hover:bg-[rgba(200,169,107,0.28)]",
                  }}
                />
                <p className="mt-4 text-center text-sm text-[#7a746c]">
                  <span className="mr-2 inline-block h-3 w-3 rounded-full bg-[rgba(200,169,107,0.35)]"></span>
                  Days with events are highlighted
                </p>
              </div>
            </div>

            <Card className="overflow-hidden rounded-[24px] border border-brand-border shadow-lg">
              <CardHeader className="bg-[linear-gradient(180deg,rgba(42,42,42,0.96)_0%,rgba(31,31,31,0.98)_100%)] text-brand-ivory">
                <CardTitle className="flex items-center gap-2 text-2xl font-semibold">
                  <CalendarIcon className="h-6 w-6 text-brand-gold" />
                  {date ? format(date, "MMMM d, yyyy") : "Select a date"}
                </CardTitle>
                <CardDescription className="text-brand-stone">
                  {filteredEvents.length > 0
                    ? `${filteredEvents.length} event${filteredEvents.length > 1 ? 's' : ''} scheduled`
                    : "No events scheduled"}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                {filteredEvents.length > 0 ? (
                  <div className="space-y-6">
                    {filteredEvents.map((event, index) => (
                      <div key={event.id || index} className="border-b border-brand-border pb-6 last:border-b-0 last:pb-0">
                        <div className="flex items-start gap-3">
                          <span className="text-3xl">{getEventIcon(event)}</span>
                          <div className="flex-1">
                            <h4 className="mb-2 text-xl font-semibold text-[#1f1f1f]">{event.title}</h4>
                            {event.time && (
                              <div className="mb-2 flex items-center gap-2 text-sm text-[#7a746c]">
                                <Clock className="h-4 w-4 text-brand-gold" />
                                <span>{event.time}</span>
                              </div>
                            )}
                            <p className="mb-3 text-[#625c53]">{event.description}</p>
                            <div className="flex items-start gap-2 text-sm text-[#7a746c]">
                              <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-gold" />
                              <span>{event.location}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center text-[#7a746c]">
                    <CalendarIcon className="mx-auto mb-4 h-16 w-16 text-brand-gold/60" />
                    <p className="text-lg">No events scheduled for this day</p>
                    <p className="mt-2 text-sm">Select another date to view events</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
};

export default EventsPage;
