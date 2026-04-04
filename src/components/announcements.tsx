"use client";

import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Calendar, Info, Heart, Sparkles, AlertCircle, Megaphone, CalendarPlus } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

interface Announcement {
  id: string;
  title: string;
  content: string;
  priority: "low" | "normal" | "high" | "urgent";
  category: "general" | "event" | "prayer" | "update" | "urgent";
  created_at: string;
  author?: {
    full_name: string;
  };
}

export function Announcements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const loadAnnouncements = async () => {
    try {
      const { data, error } = await supabase
        .from("announcements")
        .select(`
          id,
          title,
          content,
          priority,
          category,
          created_at,
          author:members!author_id(full_name)
        `)
        .eq("is_published", true)
        .order("created_at", { ascending: false })
        .limit(5); // Show only 5 most recent

      if (error) {
        console.error("Error loading announcements:", error);
      } else {
        // Transform data to handle author as array or single object
        const transformed = (data || []).map((announcement: any) => ({
          ...announcement,
          author: Array.isArray(announcement.author)
            ? announcement.author[0]
            : announcement.author
        }));
        setAnnouncements(transformed);
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const getVariant = (priority: string): "default" | "destructive" => {
    return priority === "urgent" || priority === "high" ? "destructive" : "default";
  };

  const getIcon = (category: string) => {
    switch (category) {
      case "event":
        return <Calendar className="h-4 w-4" />;
      case "prayer":
        return <Heart className="h-4 w-4" />;
      case "urgent":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Megaphone className="h-4 w-4" />;
    }
  };

  const getPriorityBadge = (priority: string) => {
    const colors = {
      urgent: "bg-red-100 text-red-800 border-red-200",
      high: "bg-orange-100 text-orange-800 border-orange-200",
      normal: "bg-blue-100 text-blue-800 border-blue-200",
      low: "bg-gray-100 text-gray-800 border-gray-200",
    };
    return colors[priority as keyof typeof colors] || colors.normal;
  };

  if (loading) {
    return (
      <div className="w-full bg-gray-50 py-8">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="animate-pulse space-y-4">
            <div className="h-20 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  if (announcements.length === 0) return null;

  return (
    <div className="w-full border-y border-brand-border bg-brand-section py-12">
      <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.28em] text-brand-gold">
              Announcements
            </p>
            <h2 className="text-3xl font-semibold text-[#1f1f1f]">
              Latest Announcements
            </h2>
            <p className="mt-2 text-[#625c53]">Stay updated with what&apos;s happening at The Serving Church</p>
          </div>
          <Megaphone className="h-8 w-8 text-brand-gold" />
        </div>

        <div className="space-y-4">
          {announcements.map((announcement) => (
            <Alert
              key={announcement.id}
              variant={getVariant(announcement.priority)}
              className="rounded-[24px] border border-brand-border bg-white/88 shadow-sm"
            >
              <div className="flex items-start gap-3">
                <div className="mt-1 text-brand-gold">{getIcon(announcement.category)}</div>
                <div className="flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <AlertTitle className="mb-0 text-[#1f1f1f]">{announcement.title}</AlertTitle>
                    <span className={`rounded-full border px-2 py-1 text-xs font-semibold ${getPriorityBadge(announcement.priority)}`}>
                      {announcement.priority.toUpperCase()}
                    </span>
                    <span className="text-xs uppercase tracking-[0.16em] text-[#7a746c]">
                      {new Date(announcement.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <AlertDescription className="mt-2 leading-7 text-[#5f584f]">
                    {announcement.content}
                  </AlertDescription>
                  {announcement.author && (
                    <p className="mt-3 text-xs uppercase tracking-[0.14em] text-[#7a746c]">
                      — {announcement.author.full_name}
                    </p>
                  )}
                  {announcement.category === 'event' && (
                    <Button
                      onClick={() => {
                        window.location.href = `/api/calendar/announcement/${announcement.id}`;
                      }}
                      variant="outline"
                      size="sm"
                      className="mt-4 flex items-center gap-2 border-brand-gold/40 bg-transparent text-[#1f1f1f] hover:bg-[rgba(200,169,107,0.10)] hover:text-[#1f1f1f]"
                    >
                      <CalendarPlus className="h-4 w-4" />
                      Add to Calendar
                    </Button>
                  )}
                </div>
              </div>
            </Alert>
          ))}
        </div>

        {announcements.length >= 5 && (
          <div className="mt-6 text-center">
            <a href="/member/dashboard" className="text-sm font-medium text-[#6e5b33] hover:text-[#5c4b29]">
              View all announcements →
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
