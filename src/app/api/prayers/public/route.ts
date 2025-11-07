import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET /api/prayers/public - Fetch public prayer requests
export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();

    // Get query params
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "12");
    const page = parseInt(searchParams.get("page") || "1");
    const filter = searchParams.get("filter") || "recent";
    const search = searchParams.get("search") || "";
    const offset = (page - 1) * limit;

    // Build base query
    let query = supabase
      .from("prayers")
      .select("id, name, request, prayer_count, created_at, status", { count: "exact" })
      .eq("is_public", true)
      .is("archived_at", null);

    // Apply filter
    if (filter === "answered") {
      query = query.eq("status", "answered");
    } else {
      query = query.in("status", ["new", "praying", "ongoing", "answered"]);
    }

    // Apply search
    if (search) {
      query = query.or(`name.ilike.%${search}%,request.ilike.%${search}%`);
    }

    // Apply sorting based on filter
    if (filter === "most-prayed") {
      query = query.order("prayer_count", { ascending: false });
    } else {
      query = query.order("created_at", { ascending: false });
    }

    // Apply pagination
    query = query.range(offset, offset + limit - 1);

    const { data: prayers, error, count } = await query;

    if (error) {
      console.error("Error fetching public prayers:", error);
      return NextResponse.json(
        { error: "Failed to fetch prayers" },
        { status: 500 }
      );
    }

    // Get stats (only on first page)
    let stats = null;
    if (page === 1) {
      const { data: statsData } = await supabase
        .from("prayers")
        .select("id, prayer_count")
        .eq("is_public", true)
        .is("archived_at", null);

      const totalPrayers = statsData?.length || 0;
      const totalPraying = statsData?.reduce((sum, p) => sum + (p.prayer_count || 0), 0) || 0;

      stats = { totalPrayers, totalPraying };
    }

    return NextResponse.json(
      {
        prayers: prayers || [],
        count: count || 0,
        limit,
        page,
        hasMore: (count || 0) > offset + limit,
        stats,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in public prayers endpoint:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
