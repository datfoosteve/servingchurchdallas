import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET /api/prayers/stats - Get prayer statistics
export async function GET() {
  try {
    const supabase = createClient();

    const { data: statsData, error } = await supabase
      .from("prayers")
      .select("id, prayer_count")
      .eq("is_public", true)
      .is("archived_at", null);

    if (error) {
      console.error("Error fetching prayer stats:", error);
      return NextResponse.json(
        { error: "Failed to fetch stats" },
        { status: 500 }
      );
    }

    const totalPrayers = statsData?.length || 0;
    const totalPraying = statsData?.reduce((sum, p) => sum + (p.prayer_count || 0), 0) || 0;

    return NextResponse.json(
      {
        totalPrayers,
        totalPraying,
      },
      {
        status: 200,
        // Cache for 1 minute
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
        },
      }
    );
  } catch (error) {
    console.error("Error in prayer stats endpoint:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
