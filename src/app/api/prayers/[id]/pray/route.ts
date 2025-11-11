import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// POST /api/prayers/[id]/pray - "I'm praying" button
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createClient();
    const prayerId = params.id;

    // Get client IP address (for spam prevention)
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0] : "unknown";

    // 1. Try to insert prayer response (will fail if already prayed today)
    const { error: responseError } = await supabase
      .from("prayer_responses")
      .insert({
        prayer_id: prayerId,
        ip_address: ip,
      });

    // If duplicate (already prayed today), return current count
    if (responseError && responseError.code === "23505") {
      const { data: prayer } = await supabase
        .from("prayers")
        .select("prayer_count")
        .eq("id", prayerId)
        .single();

      return NextResponse.json(
        {
          success: false,
          message: "You've already prayed for this request today",
          prayerCount: prayer?.prayer_count || 0,
        },
        { status: 200 }
      );
    }

    if (responseError) {
      console.error("Error inserting prayer response:", responseError);
      return NextResponse.json(
        { error: "Failed to record prayer" },
        { status: 500 }
      );
    }

    // 2. Increment the prayer count
    const { data: updatedPrayer, error: updateError } = await supabase
      .rpc("increment_prayer_count", { prayer_uuid: prayerId });

    if (updateError) {
      console.error("Error incrementing prayer count:", updateError);
      return NextResponse.json(
        { error: "Failed to update prayer count" },
        { status: 500 }
      );
    }

    // RPC function returns an array of rows since it returns TABLE
    const prayerCount = Array.isArray(updatedPrayer) && updatedPrayer.length > 0
      ? updatedPrayer[0].prayer_count
      : 0;

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for praying!",
        prayerCount,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in pray endpoint:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
