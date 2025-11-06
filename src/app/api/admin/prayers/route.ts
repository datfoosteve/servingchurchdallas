import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET /api/admin/prayers - Fetch all prayers (admin only)
export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();

    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get query params
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const isPublic = searchParams.get("isPublic");
    const search = searchParams.get("search");
    const limit = parseInt(searchParams.get("limit") || "50");
    const offset = parseInt(searchParams.get("offset") || "0");

    // Build query
    let query = supabase
      .from("prayers")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false });

    // Apply filters
    if (status && status !== "all") {
      query = query.eq("status", status);
    }
    if (isPublic === "true") {
      query = query.eq("is_public", true);
    } else if (isPublic === "false") {
      query = query.eq("is_public", false);
    }
    if (search) {
      query = query.or(`name.ilike.%${search}%,request.ilike.%${search}%`);
    }

    // Pagination
    query = query.range(offset, offset + limit - 1);

    const { data: prayers, error, count } = await query;

    if (error) {
      console.error("Error fetching prayers:", error);
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
    console.error("Error in admin prayers endpoint:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
