"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";

interface PrayerStats {
  totalPrayers: number;
  totalPraying: number;
}

export function PrayerBadge() {
  const [stats, setStats] = useState<PrayerStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/prayers/stats");
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error("Error fetching prayer stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();

    // Refresh stats every 5 minutes
    const interval = setInterval(fetchStats, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  if (loading || !stats || stats.totalPrayers === 0) {
    return null;
  }

  return (
    <Badge variant="info" className="ml-1 text-[10px] px-1.5 py-0">
      {stats.totalPrayers}
    </Badge>
  );
}
