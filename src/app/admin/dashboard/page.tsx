"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Church,
  Users,
  Megaphone,
  Heart,
  Calendar,
  LogOut,
  BarChart3,
  Plus,
  Settings
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [member, setMember] = useState<any>(null);
  const [stats, setStats] = useState({
    totalMembers: 0,
    totalAnnouncements: 0,
    totalPrayers: 0,
    recentSignups: 0,
  });
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const loadData = async () => {
      // Get user
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);

        // Get member profile
        const { data: memberData } = await supabase
          .from("members")
          .select("*")
          .eq("id", user.id)
          .single();
        setMember(memberData);

        // Check if user is actually a pastor/admin
        if (memberData?.role !== "pastor" && memberData?.role !== "admin") {
          router.push("/member/dashboard");
          return;
        }

        // Get stats
        const { count: membersCount } = await supabase
          .from("members")
          .select("*", { count: "exact", head: true });

        const { count: announcementsCount } = await supabase
          .from("announcements")
          .select("*", { count: "exact", head: true });

        const { count: prayersCount } = await supabase
          .from("prayers")
          .select("*", { count: "exact", head: true });

        // Get recent signups (last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const { count: recentSignupsCount } = await supabase
          .from("members")
          .select("*", { count: "exact", head: true })
          .gte("created_at", sevenDaysAgo.toISOString());

        setStats({
          totalMembers: membersCount || 0,
          totalAnnouncements: announcementsCount || 0,
          totalPrayers: prayersCount || 0,
          recentSignups: recentSignupsCount || 0,
        });
      }
      setLoading(false);
    };

    loadData();
  }, [supabase, router]);

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
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-lg">
              <Church className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">
                {member?.role === 'pastor' ? 'Pastor' : 'Admin'} Dashboard
              </h1>
              <p className="text-sm text-gray-600">The Serving Church</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">
            Welcome, {member?.role === 'pastor' ? 'Pastor' : ''} {member?.full_name || "Admin"}!
          </h2>
          <p className="text-gray-600">
            Here&apos;s an overview of your church community
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardDescription className="text-blue-100">Total Members</CardDescription>
                  <CardTitle className="text-4xl font-bold mt-2">{stats.totalMembers}</CardTitle>
                </div>
                <Users className="h-12 w-12 text-blue-200" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-blue-100">
                +{stats.recentSignups} new this week
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardDescription className="text-purple-100">Announcements</CardDescription>
                  <CardTitle className="text-4xl font-bold mt-2">{stats.totalAnnouncements}</CardTitle>
                </div>
                <Megaphone className="h-12 w-12 text-purple-200" />
              </div>
            </CardHeader>
            <CardContent>
              <Link href="/admin/announcements">
                <Button variant="secondary" size="sm" className="w-full bg-white/20 hover:bg-white/30 text-white border-0">
                  Manage
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-rose-500 to-rose-600 text-white border-0 shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardDescription className="text-rose-100">Prayer Requests</CardDescription>
                  <CardTitle className="text-4xl font-bold mt-2">{stats.totalPrayers}</CardTitle>
                </div>
                <Heart className="h-12 w-12 text-rose-200" />
              </div>
            </CardHeader>
            <CardContent>
              <Link href="/admin/prayers">
                <Button variant="secondary" size="sm" className="w-full bg-white/20 hover:bg-white/30 text-white border-0">
                  Manage
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardDescription className="text-green-100">Quick Actions</CardDescription>
                  <CardTitle className="text-lg font-bold mt-2">Manage Church</CardTitle>
                </div>
                <Settings className="h-12 w-12 text-green-200" />
              </div>
            </CardHeader>
            <CardContent>
              <Link href="/admin/members">
                <Button variant="secondary" size="sm" className="w-full bg-white/20 hover:bg-white/30 text-white border-0">
                  View Members
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="shadow-lg border-2 border-blue-100">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-3 rounded-lg">
                  <Megaphone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle>Create Announcement</CardTitle>
                  <CardDescription>Share news with your congregation</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Link href="/admin/announcements">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Plus className="h-4 w-4 mr-2" />
                  New Announcement
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-2 border-purple-100">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle>View Analytics</CardTitle>
                  <CardDescription>Track engagement and growth</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" disabled>
                <BarChart3 className="h-4 w-4 mr-2" />
                Coming Soon
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Management Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/admin/members">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-blue-300">
              <CardHeader className="pb-3">
                <Users className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle className="text-lg">Member Management</CardTitle>
                <CardDescription>View and manage church members</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/admin/announcements">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-purple-300">
              <CardHeader className="pb-3">
                <Megaphone className="h-8 w-8 text-purple-600 mb-2" />
                <CardTitle className="text-lg">Announcements</CardTitle>
                <CardDescription>Create and manage announcements</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/admin/prayers">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-rose-300">
              <CardHeader className="pb-3">
                <Heart className="h-8 w-8 text-rose-600 mb-2" />
                <CardTitle className="text-lg">Prayer Management</CardTitle>
                <CardDescription>Manage and moderate prayer requests</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/admin/events">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-green-300">
              <CardHeader className="pb-3">
                <Calendar className="h-8 w-8 text-green-600 mb-2" />
                <CardTitle className="text-lg">Events Management</CardTitle>
                <CardDescription>Create and manage church events</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </div>
    </main>
  );
}
