"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Prayer } from "@/lib/supabase/types";

export function PrayerWall() {
  const [prayers, setPrayers] = useState<Prayer[]>([]);
  const [loading, setLoading] = useState(true);
  const [prayingFor, setPrayingFor] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchPrayers();
  }, []);

  const fetchPrayers = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/prayers/public?limit=6");
      const data = await response.json();
      if (response.ok) {
        setPrayers(data.prayers);
      }
    } catch (error) {
      console.error("Error fetching prayers:", error);
    } finally {
      setLoading(false);
    }
  };

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
            p.id === prayerId ? { ...p, prayer_count: data.prayerCount } : p
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

        if (!data.success && data.message) {
          console.info(data.message);
        }
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

  if (loading) {
    return (
      <section className="bg-[#181818] py-16 md:py-24">
        <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-semibold text-brand-ivory md:text-4xl">
              Prayer Wall
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card
                key={i}
                className="animate-pulse rounded-[24px] border border-brand-border bg-[linear-gradient(180deg,rgba(42,42,42,0.96)_0%,rgba(31,31,31,0.98)_100%)]"
              >
                <CardHeader>
                  <div className="h-6 w-1/3 rounded bg-white/10"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-4 rounded bg-white/10"></div>
                    <div className="h-4 w-5/6 rounded bg-white/10"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (prayers.length === 0) {
    return null;
  }

  return (
    <section className="bg-[#181818] py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.32em] text-brand-gold">
            Prayer
          </p>
          <h2 className="text-3xl font-semibold text-brand-ivory md:text-4xl">
            Stand with our church family in prayer
          </h2>
          <div className="mx-auto mt-6 h-px w-40 bg-gradient-to-r from-transparent via-[rgba(200,169,107,0.9)] to-transparent" />
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-brand-stone md:text-lg">
            Join us in lifting up our church family. Let others know you are praying, and share your own prayer request when you need support.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {prayers.map((prayer) => (
            <Card
              key={prayer.id}
              className="rounded-[24px] border border-brand-border bg-[linear-gradient(180deg,rgba(42,42,42,0.96)_0%,rgba(31,31,31,0.98)_100%)] text-brand-ivory shadow-[0_16px_36px_rgba(0,0,0,0.25)] transition duration-300 hover:-translate-y-1 hover:border-[rgba(200,169,107,0.45)]"
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <CardTitle className="text-xl font-semibold text-brand-ivory">
                    {prayer.name}
                  </CardTitle>
                  <span className="text-xs uppercase tracking-[0.18em] text-brand-stone">
                    {getTimeAgo(prayer.created_at)}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-5 h-px w-full bg-gradient-to-r from-transparent via-[rgba(200,169,107,0.45)] to-transparent" />
                <p className="mb-5 line-clamp-4 text-sm leading-7 text-brand-stone">
                  {prayer.request}
                </p>

                <div className="flex items-center justify-between gap-3">
                  <Button
                    size="sm"
                    variant={prayingFor.has(prayer.id) ? "secondary" : "default"}
                    onClick={() => handlePray(prayer.id)}
                    disabled={prayingFor.has(prayer.id)}
                    className={
                      prayingFor.has(prayer.id)
                        ? "bg-brand-gold text-[#1f1f1f]"
                        : "bg-brand-button-gold text-[#1f1f1f] hover:brightness-105"
                    }
                  >
                    🙏 {prayingFor.has(prayer.id) ? "Praying..." : "I'm Praying"}
                  </Button>
                  <span className="text-xs text-brand-stone">
                    {prayer.prayer_count} {prayer.prayer_count === 1 ? "person" : "people"} praying
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-brand-gold/40 bg-transparent text-brand-ivory hover:bg-white/5 hover:text-brand-ivory"
          >
            <a href="/prayers">View All Prayers</a>
          </Button>
          <Button
            asChild
            size="lg"
            className="bg-brand-button-gold text-[#1f1f1f] shadow-lg hover:brightness-105"
          >
            <a href="/contact-us/prayer-request">Submit Your Prayer Request</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
