"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Heart, Megaphone, User, LogOut, Church } from "lucide-react";
import Link from "next/link";

export default function MemberDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [member, setMember] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUser(user);
      const { data: memberData } = await supabase
        .from("members")
        .select("*")
        .eq("id", user.id)
        .single();
      setMember(memberData);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
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
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Church className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-xl font-bold">Member Portal</h1>
              <p className="text-sm text-gray-600">The Serving Church</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">
            Welcome back, {member?.full_name || user?.email}!
          </h2>
          <p className="text-gray-600">
            Here's what's happening in our community
          </p>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link href="/events">
              <CardHeader className="pb-3">
                <Calendar className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle className="text-lg">Events</CardTitle>
                <CardDescription>View upcoming events</CardDescription>
              </CardHeader>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link href="/prayers">
              <CardHeader className="pb-3">
                <Heart className="h-8 w-8 text-rose-600 mb-2" />
                <CardTitle className="text-lg">Prayer Wall</CardTitle>
                <CardDescription>Share & pray together</CardDescription>
              </CardHeader>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link href="/member/announcements">
              <CardHeader className="pb-3">
                <Megaphone className="h-8 w-8 text-purple-600 mb-2" />
                <CardTitle className="text-lg">Announcements</CardTitle>
                <CardDescription>Latest updates</CardDescription>
              </CardHeader>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link href="/member/profile">
              <CardHeader className="pb-3">
                <User className="h-8 w-8 text-green-600 mb-2" />
                <CardTitle className="text-lg">Profile</CardTitle>
                <CardDescription>Manage your account</CardDescription>
              </CardHeader>
            </Link>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your recent interactions</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 text-center py-8">
              No recent activity. Start by viewing events or the prayer wall!
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
