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

        // Show success feedback
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

  if (loading) {
    return (
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Prayer Wall
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
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
    return null; // Don't show section if no prayers
  }

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Prayer Wall
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Join us in praying for our church family. Click &ldquo;I&rsquo;m Praying&rdquo; to let them know you&rsquo;re lifting them up.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {prayers.map((prayer) => (
            <Card key={prayer.id} className="hover:shadow-lg transition duration-300">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg font-semibold">
                    {prayer.name}
                  </CardTitle>
                  <span className="text-xs text-gray-500">
                    {getTimeAgo(prayer.created_at)}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-sm mb-4 line-clamp-3">
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
                  <span className="text-xs text-gray-500">
                    {prayer.prayer_count} {prayer.prayer_count === 1 ? "person" : "people"} praying
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
          <Button asChild variant="outline" size="lg">
            <a href="/prayers">
              View All Prayers
            </a>
          </Button>
          <Button asChild size="lg">
            <a href="/contact-us/prayer-request">
              Submit Your Prayer Request
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
