import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET /api/prayers/public - Fetch public prayer requests
export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();

    // Get query params for pagination
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "12");
    const offset = parseInt(searchParams.get("offset") || "0");

    // Fetch public prayers that aren't archived
    const { data: prayers, error, count } = await supabase
      .from("prayers")
      .select("id, name, request, prayer_count, created_at, status", { count: "exact" })
      .eq("is_public", true)
      .is("archived_at", null)
      .in("status", ["new", "praying", "ongoing"])
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error("Error fetching public prayers:", error);
      return NextResponse.json(
        { error: "Failed to fetch prayers" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        prayers: prayers || [],
        count: count || 0,
        limit,
        offset,
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
