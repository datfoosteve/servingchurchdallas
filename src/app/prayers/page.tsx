"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Search, Heart, Clock, TrendingUp, Sparkles, Users } from "lucide-react";
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

      if (response.ok) {
        setPrayers((prev) =>
          prev.map((p) =>
            p.id === prayerId
              ? { ...p, prayer_count: data.prayerCount }
              : p
          )
        );

        setPrayingFor((prev) => new Set(prev).add(prayerId));

        setTimeout(() => {
          setPrayingFor((prev) => {
            const newSet = new Set(prev);
            newSet.delete(prayerId);
            return newSet;
          });
        }, 3000);
      } else {
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
    <main>
      <section className="bg-[#181818] py-16 md:py-24">
        <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex rounded-full border border-brand-gold/30 bg-[rgba(200,169,107,0.10)] p-4">
              <Heart className="h-12 w-12 text-brand-gold" />
            </div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.32em] text-brand-gold">Prayer</p>
            <h1 className="text-4xl font-semibold text-brand-ivory md:text-5xl lg:text-6xl">
              Community Prayer Wall
            </h1>
            <div className="mx-auto mt-6 h-px w-40 bg-gradient-to-r from-transparent via-[rgba(200,169,107,0.9)] to-transparent" />
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-brand-stone md:text-xl">
              Join our church family in prayer. Lift one another up, share burdens, and celebrate answered prayers together.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-6 md:gap-12">
              <div className="text-center">
                <div className="text-3xl font-semibold text-brand-ivory md:text-4xl">{stats.totalPrayers}</div>
                <div className="mt-2 text-sm uppercase tracking-[0.18em] text-brand-stone md:text-base">Prayer Requests</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-semibold text-brand-ivory md:text-4xl">{stats.totalPraying}</div>
                <div className="mt-2 text-sm uppercase tracking-[0.18em] text-brand-stone md:text-base">People Praying</div>
              </div>
            </div>

            <div className="mt-10 flex justify-center">
              <Button asChild size="lg" className="bg-brand-button-gold text-[#1f1f1f] hover:brightness-105">
                <Link href="/contact-us/prayer-request">
                  <Heart className="mr-2 h-5 w-5" />
                  Submit Your Prayer Request
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-brand-border bg-brand-section py-8">
        <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
            <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
              {filterButtons.map(({ key, label, icon: Icon, tooltip }) => (
                <Tooltip key={key}>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      onClick={() => setFilter(key)}
                      className={filter === key
                        ? "border-brand-gold/40 bg-brand-button text-brand-ivory hover:bg-brand-button hover:text-brand-ivory"
                        : "border-brand-border bg-white/80 text-[#1f1f1f] hover:bg-white hover:text-[#1f1f1f]"
                      }
                    >
                      <Icon className="mr-2 h-4 w-4" />
                      {label}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>

            <div className="relative w-full lg:w-80">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-[#7a746c]" />
              <Input
                type="text"
                placeholder="Search prayers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-brand-border bg-white/88 pl-10"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 md:py-16">
        <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          {loading && page === 1 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="animate-pulse rounded-[24px] border border-brand-border bg-white/88">
                  <CardHeader>
                    <div className="h-6 w-1/3 rounded bg-gray-200"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="h-4 rounded bg-gray-200"></div>
                      <div className="h-4 w-5/6 rounded bg-gray-200"></div>
                      <div className="h-4 w-4/6 rounded bg-gray-200"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : prayers.length === 0 ? (
            <div className="py-16 text-center">
              <div className="mb-4 inline-block rounded-full border border-brand-border bg-brand-section p-4">
                <Users className="h-12 w-12 text-[#7a746c]" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-[#1f1f1f]">No prayers found</h3>
              <p className="mb-6 text-[#625c53]">
                {searchQuery ? "Try a different search term" : "Be the first to submit a prayer request."}
              </p>
              <Button asChild className="bg-brand-button-gold text-[#1f1f1f] hover:brightness-105">
                <Link href="/contact-us/prayer-request">Submit Prayer Request</Link>
              </Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {prayers.map((prayer) => {
                  const isAnswered = prayer.status === "answered";

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
                      className={`rounded-[24px] border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                        isAnswered
                          ? "border-brand-gold/40 bg-[rgba(200,169,107,0.08)]"
                          : "border-brand-border bg-white/88"
                      }`}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between gap-3">
                          <CardTitle className="flex items-center gap-2 text-lg font-semibold text-[#1f1f1f]">
                            <div className="flex items-center gap-2 flex-wrap">
                              {displayName}
                              {isMember && prayer.show_name && (
                                <span className="inline-flex items-center rounded-full border border-brand-gold/30 bg-[rgba(200,169,107,0.10)] px-2 py-0.5 text-xs font-semibold text-[#6e5b33]">
                                  Member
                                </span>
                              )}
                            </div>
                            {isAnswered && <Sparkles className="h-5 w-5 text-brand-gold" />}
                          </CardTitle>
                          <span className="text-xs uppercase tracking-[0.14em] text-[#7a746c]">
                            {getTimeAgo(prayer.created_at)}
                          </span>
                        </div>
                        {isAnswered && (
                          <div className="mt-2 inline-flex items-center gap-1 rounded-full border border-brand-gold/30 bg-[rgba(200,169,107,0.10)] px-2 py-1 text-xs font-semibold text-[#6e5b33]">
                            <Sparkles className="h-3 w-3" />
                            Answered Prayer
                          </div>
                        )}
                      </CardHeader>
                      <CardContent>
                        <p className="mb-5 text-sm leading-7 text-[#625c53]">
                          {prayer.request}
                        </p>

                        <div className="flex items-center justify-between gap-3">
                          <Button
                            size="sm"
                            variant={prayingFor.has(prayer.id) ? "secondary" : "default"}
                            onClick={() => handlePray(prayer.id)}
                            disabled={prayingFor.has(prayer.id)}
                            className={prayingFor.has(prayer.id)
                              ? "bg-brand-gold text-[#1f1f1f]"
                              : "bg-brand-button text-brand-ivory hover:brightness-110"
                            }
                          >
                            🙏 {prayingFor.has(prayer.id) ? "Praying..." : "I'm Praying"}
                          </Button>
                          <span className="flex items-center gap-1 text-xs text-[#7a746c]">
                            <Heart className="h-3 w-3 text-brand-gold" />
                            {prayer.prayer_count} {prayer.prayer_count === 1 ? "person" : "people"}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {hasMore && (
                <div className="mt-12 text-center">
                  <Button
                    onClick={() => setPage((p) => p + 1)}
                    disabled={loading}
                    size="lg"
                    variant="outline"
                    className="border-brand-gold/40 bg-transparent text-[#1f1f1f] hover:bg-[rgba(200,169,107,0.10)] hover:text-[#1f1f1f]"
                  >
                    {loading ? "Loading..." : "Load More Prayers"}
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <section className="bg-[#181818] py-16">
        <div className="container mx-auto max-w-4xl px-4 text-center md:px-6 lg:px-8">
          <Heart className="mx-auto mb-4 h-12 w-12 text-brand-gold" />
          <h2 className="mb-4 text-3xl font-semibold text-brand-ivory md:text-4xl">
            Need Prayer?
          </h2>
          <p className="mb-8 text-lg leading-8 text-brand-stone">
            Our church family is here for you. Share your prayer request and let us lift you up together.
          </p>
          <Button asChild size="lg" className="bg-brand-button-gold text-[#1f1f1f] hover:brightness-105">
            <Link href="/contact-us/prayer-request">
              Submit Your Prayer Request
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
