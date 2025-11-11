"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Search, Filter, Heart, Clock, TrendingUp, Sparkles, Users } from "lucide-react";
import type { Prayer } from "@/lib/supabase/types";

const Link = React.lazy(() => import('next-view-transitions').then(module => ({ default: module.Link })));

type FilterType = "recent" | "most-prayed" | "answered";

export default function PrayersPage() {
  const [prayers, setPrayers] = useState<Prayer[]>([]);
  const [loading, setLoading] = useState(true);
  const [prayingFor, setPrayingFor] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<FilterType>("recent");
  const [searchQuery, setSearchQuery] = useState("");
  const [stats, setStats] = useState({ totalPrayers: 0, totalPraying: 0 });
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchPrayers = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        filter,
        search: searchQuery,
        page: page.toString(),
        limit: "12",
      });

      const response = await fetch(`/api/prayers/public?${params}`);
      const data = await response.json();

      if (response.ok) {
        if (page === 1) {
          setPrayers(data.prayers);
        } else {
          setPrayers((prev) => [...prev, ...data.prayers]);
        }
        setHasMore(data.hasMore || false);
        if (data.stats) {
          setStats(data.stats);
        }
      }
    } catch (error) {
      console.error("Error fetching prayers:", error);
    } finally {
      setLoading(false);
    }
  }, [filter, searchQuery, page]);

  useEffect(() => {
    fetchPrayers();
  }, [fetchPrayers]);

  useEffect(() => {
    setPage(1);
    setPrayers([]);
  }, [filter, searchQuery]);

  const handlePray = async (prayerId: string) => {
    if (prayingFor.has(prayerId)) return;

    try {
      const response = await fetch(`/api/prayers/${prayerId}/pray`, {
        method: "POST",
      });

      const data = await response.json();
      console.log("Prayer response:", data); // Debug log

      if (response.ok) {
        // Update local state with the prayer count
        setPrayers((prev) =>
          prev.map((p) =>
            p.id === prayerId
              ? { ...p, prayer_count: data.prayerCount }
              : p
          )
        );

        // Mark as praying temporarily for visual feedback
        setPrayingFor((prev) => new Set(prev).add(prayerId));

        setTimeout(() => {
          setPrayingFor((prev) => {
            const newSet = new Set(prev);
            newSet.delete(prayerId);
            return newSet;
          });
        }, 3000);

        // Show message if already prayed
        if (!data.success && data.message) {
          // Use a subtle notification instead of alert
          console.info(data.message);
        }
      } else {
        // Log error details
        console.error("Prayer failed:", data);
        alert(data.message || data.error || "Failed to record prayer");
      }
    } catch (error) {
      console.error("Error praying:", error);
      alert("Network error. Please try again.");
    }
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return "just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return date.toLocaleDateString();
  };

  const filterButtons = [
    { key: "recent" as FilterType, label: "Recent", icon: Clock, tooltip: "Show the most recently submitted prayer requests" },
    { key: "most-prayed" as FilterType, label: "Most Prayed", icon: TrendingUp, tooltip: "Show prayers that have received the most support from our community" },
    { key: "answered" as FilterType, label: "Answered", icon: Sparkles, tooltip: "Celebrate answered prayers and God's faithfulness" },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 text-white py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="text-center">
            <div className="inline-block mb-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                <Heart className="w-12 h-12" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Community Prayer Wall
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
              Join our church family in prayer. Lift each other up, share burdens, and celebrate answered prayers together.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-12 mb-8">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold">{stats.totalPrayers}</div>
                <div className="text-blue-200 text-sm md:text-base">Prayer Requests</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold">{stats.totalPraying}</div>
                <div className="text-blue-200 text-sm md:text-base">People Praying</div>
              </div>
            </div>

            <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-blue-50">
              <Link href="/contact-us/prayer-request">
                <Heart className="w-5 h-5 mr-2" />
                Submit Your Prayer Request
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {filterButtons.map(({ key, label, icon: Icon, tooltip }) => (
                <Tooltip key={key}>
                  <TooltipTrigger asChild>
                    <Button
                      variant={filter === key ? "default" : "outline"}
                      onClick={() => setFilter(key)}
                      className="flex items-center gap-2"
                    >
                      <Icon className="w-4 h-4" />
                      {label}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search prayers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Prayer Cards */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          {loading && page === 1 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                      <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : prayers.length === 0 ? (
            <div className="text-center py-16">
              <Users className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">No prayers found</h3>
              <p className="text-gray-500 mb-6">
                {searchQuery
                  ? "Try a different search term"
                  : "Be the first to submit a prayer request!"}
              </p>
              <Button asChild>
                <Link href="/contact-us/prayer-request">Submit Prayer Request</Link>
              </Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {prayers.map((prayer) => {
                  const isAnswered = prayer.status === "answered";

                  // Determine display name based on member account and show_name preference
                  const getDisplayName = () => {
                    if (prayer.member_id && prayer.show_name === false) {
                      return "Anonymous";
                    }
                    if (prayer.member_id && prayer.show_name && prayer.member?.full_name) {
                      return prayer.member.full_name;
                    }
                    return prayer.name;
                  };

                  const displayName = getDisplayName();
                  const isMember = !!prayer.member_id;

                  return (
                    <Card
                      key={prayer.id}
                      className={`hover:shadow-xl transition-all duration-300 ${
                        isAnswered
                          ? "bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 border-2"
                          : "hover:-translate-y-1"
                      }`}
                    >
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg font-semibold flex items-center gap-2">
                            <div className="flex items-center gap-2">
                              {displayName}
                              {isMember && prayer.show_name && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 border border-blue-200">
                                  Member
                                </span>
                              )}
                            </div>
                            {isAnswered && (
                              <Sparkles className="w-5 h-5 text-green-600" />
                            )}
                          </CardTitle>
                          <span className="text-xs text-gray-500">
                            {getTimeAgo(prayer.created_at)}
                          </span>
                        </div>
                        {isAnswered && (
                          <div className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full mt-2">
                            <Sparkles className="w-3 h-3" />
                            Answered Prayer!
                          </div>
                        )}
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                          {prayer.request}
                        </p>

                        <div className="flex items-center justify-between">
                          <Button
                            size="sm"
                            variant={prayingFor.has(prayer.id) ? "secondary" : "default"}
                            onClick={() => handlePray(prayer.id)}
                            disabled={prayingFor.has(prayer.id)}
                            className="flex items-center gap-1"
                          >
                            🙏 {prayingFor.has(prayer.id) ? "Praying..." : "I'm Praying"}
                          </Button>
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            {prayer.prayer_count} {prayer.prayer_count === 1 ? "person" : "people"}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Load More */}
              {hasMore && (
                <div className="text-center mt-12">
                  <Button
                    onClick={() => setPage((p) => p + 1)}
                    disabled={loading}
                    size="lg"
                    variant="outline"
                  >
                    {loading ? "Loading..." : "Load More Prayers"}
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-purple-100 to-blue-100">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl text-center">
          <Heart className="w-12 h-12 mx-auto text-purple-600 mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Need Prayer?
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Our church family is here for you. Share your prayer request and let us lift you up together.
          </p>
          <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700">
            <Link href="/contact-us/prayer-request">
              Submit Your Prayer Request
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
