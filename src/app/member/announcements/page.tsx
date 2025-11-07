"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Megaphone, ArrowLeft, Church, Calendar, Tag } from "lucide-react";
import Link from "next/link";

export default function MemberAnnouncementsPage() {
  const router = useRouter();
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const loadData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/auth/login");
        return;
      }

      // Load published announcements
      const { data, error } = await supabase
        .from("announcements")
        .select(`
          *,
          author:members(full_name, email)
        `)
        .eq("is_published", true)
        .order("created_at", { ascending: false });

      if (!error && data) {
        setAnnouncements(data);
      }
      setLoading(false);
    };

    loadData();
  }, [supabase, router]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent": return "text-red-600 bg-red-50 border-red-200";
      case "high": return "text-orange-600 bg-orange-50 border-orange-200";
      case "normal": return "text-blue-600 bg-blue-50 border-blue-200";
      case "low": return "text-gray-600 bg-gray-50 border-gray-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Church className="h-12 w-12 mx-auto mb-4 text-blue-600 animate-pulse" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Link href="/member/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-4">
            <Megaphone className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-2">Church Announcements</h1>
          <p className="text-gray-600 text-lg">
            Stay updated with the latest news from The Serving Church
          </p>
        </div>

        {/* Announcements List */}
        {announcements.length === 0 ? (
          <Card className="shadow-lg">
            <CardContent className="py-12 text-center">
              <Megaphone className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600 mb-4">No announcements yet</p>
              <p className="text-sm text-gray-500">Check back soon for updates from your church leadership!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {announcements.map((announcement) => (
              <Card key={announcement.id} className="shadow-lg hover:shadow-xl transition-shadow border-l-4 border-purple-500">
                <CardHeader>
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div className="flex flex-wrap gap-2">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${getPriorityColor(announcement.priority)}`}>
                        {announcement.priority.toUpperCase()}
                      </span>
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-600 border border-gray-200 flex items-center gap-1">
                        <Tag className="h-3 w-3" />
                        {announcement.category.toUpperCase().replace('-', ' ')}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="h-4 w-4" />
                      {new Date(announcement.created_at).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                  </div>
                  <CardTitle className="text-2xl mb-2">{announcement.title}</CardTitle>
                  <CardDescription className="text-base">
                    From: {announcement.author?.full_name || "Church Leadership"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {announcement.content}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
