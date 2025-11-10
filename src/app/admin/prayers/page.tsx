"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Prayer, PrayerStatus } from "@/lib/supabase/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trash2 } from "lucide-react";

export default function AdminPrayersPage() {
  const [prayers, setPrayers] = useState<Prayer[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const router = useRouter();
  const supabase = createClient();

  // Check authentication
  const checkAuth = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push("/admin/login");
    }
  }, [supabase, router]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Fetch prayers
  const fetchPrayers = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filter !== "all") params.append("status", filter);
      if (search) params.append("search", search);

      const response = await fetch(`/api/admin/prayers?${params.toString()}`);
      const data = await response.json();

      if (response.ok) {
        setPrayers(data.prayers);
      }
    } catch (error) {
      console.error("Error fetching prayers:", error);
    } finally {
      setLoading(false);
    }
  }, [filter, search]);

  useEffect(() => {
    fetchPrayers();
  }, [fetchPrayers]);

  const updateStatus = async (id: string, status: PrayerStatus) => {
    try {
      const response = await fetch(`/api/admin/prayers/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        fetchPrayers(); // Refresh list
      }
    } catch (error) {
      console.error("Error updating prayer:", error);
    }
  };

  const archivePrayer = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/prayers/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: "archived",
          archived_at: new Date().toISOString()
        }),
      });

      if (response.ok) {
        fetchPrayers();
      }
    } catch (error) {
      console.error("Error archiving prayer:", error);
    }
  };

  const deletePrayer = async (id: string, prayerText: string) => {
    // Confirm deletion with preview of prayer text
    const confirmed = confirm(
      `Are you sure you want to permanently delete this prayer?\n\n"${prayerText.slice(0, 100)}${prayerText.length > 100 ? '...' : ''}"\n\nThis action cannot be undone.`
    );

    if (!confirmed) return;

    try {
      const response = await fetch(`/api/admin/prayers/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchPrayers(); // Refresh list
      } else {
        const data = await response.json();
        alert(`Failed to delete prayer: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Error deleting prayer:", error);
      alert("An error occurred while deleting the prayer. Please try again.");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  const getStatusColor = (status: PrayerStatus) => {
    const colors = {
      new: "bg-blue-100 text-blue-800",
      praying: "bg-purple-100 text-purple-800",
      answered: "bg-green-100 text-green-800",
      ongoing: "bg-yellow-100 text-yellow-800",
      archived: "bg-gray-100 text-gray-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Prayer Request Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage and pray for your congregation</p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <Input
                placeholder="Search prayers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="md:max-w-md"
              />
              <div className="overflow-x-auto">
                <Tabs value={filter} onValueChange={setFilter} className="w-full md:w-auto">
                  <TabsList className="w-full md:w-auto">
                    <TabsTrigger value="all" className="flex-1 md:flex-none">All</TabsTrigger>
                    <TabsTrigger value="new" className="flex-1 md:flex-none">New</TabsTrigger>
                    <TabsTrigger value="praying" className="flex-1 md:flex-none">Praying</TabsTrigger>
                    <TabsTrigger value="answered" className="flex-1 md:flex-none">Answered</TabsTrigger>
                    <TabsTrigger value="ongoing" className="flex-1 md:flex-none">Ongoing</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Prayer List */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading prayers...</p>
          </div>
        ) : prayers.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-gray-500">No prayer requests found</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {prayers.map((prayer) => (
              <Card key={prayer.id} className="hover:shadow-md transition">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{prayer.name}</CardTitle>
                      <p className="text-sm text-gray-500 mt-1">
                        {new Date(prayer.created_at).toLocaleDateString()} at{" "}
                        {new Date(prayer.created_at).toLocaleTimeString()}
                      </p>
                      {prayer.email && (
                        <p className="text-sm text-gray-600 mt-1">
                          <a href={`mailto:${prayer.email}`} className="hover:underline">
                            {prayer.email}
                          </a>
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(prayer.status)}`}>
                        {prayer.status.toUpperCase()}
                      </span>
                      {prayer.is_public && (
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                          PUBLIC
                        </span>
                      )}
                      {prayer.prayer_count > 0 && (
                        <span className="text-xs text-gray-500">
                          🙏 {prayer.prayer_count} praying
                        </span>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4 whitespace-pre-wrap">{prayer.request}</p>

                  <div className="flex flex-wrap gap-2">
                    {prayer.status !== "praying" && (
                      <Button
                        size="sm"
                        variant="default"
                        onClick={() => updateStatus(prayer.id, "praying")}
                      >
                        Mark as Praying
                      </Button>
                    )}
                    {prayer.status !== "answered" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateStatus(prayer.id, "answered")}
                      >
                        Mark as Answered
                      </Button>
                    )}
                    {prayer.status !== "ongoing" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateStatus(prayer.id, "ongoing")}
                      >
                        Mark as Ongoing
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => archivePrayer(prayer.id)}
                      className="text-gray-600"
                    >
                      Archive
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => deletePrayer(prayer.id, prayer.request)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
