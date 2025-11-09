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
          author:members(full_name)
        `)
        .eq("is_published", true)
        .order("created_at", { ascending: false })
        .limit(5); // Show only 5 most recent

      if (error) {
        console.error("Error loading announcements:", error);
      } else {
        setAnnouncements(data || []);
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
    <div className="w-full bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 border-t border-b">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Latest Announcements
            </h2>
            <p className="text-gray-600 mt-1">Stay updated with what&apos;s happening at The Serving Church</p>
          </div>
          <Megaphone className="h-8 w-8 text-purple-600" />
        </div>

        <div className="space-y-4">
          {announcements.map((announcement) => (
            <Alert key={announcement.id} variant={getVariant(announcement.priority)} className="shadow-md border-2">
              <div className="flex items-start gap-3">
                {getIcon(announcement.category)}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertTitle className="mb-0">{announcement.title}</AlertTitle>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${getPriorityBadge(announcement.priority)}`}>
                      {announcement.priority.toUpperCase()}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(announcement.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <AlertDescription className="mt-2">
                    {announcement.content}
                  </AlertDescription>
                  {announcement.author && (
                    <p className="text-xs text-gray-500 mt-2">
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
                      className="mt-3 flex items-center gap-2"
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
            <a href="/member/dashboard" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              View all announcements →
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
