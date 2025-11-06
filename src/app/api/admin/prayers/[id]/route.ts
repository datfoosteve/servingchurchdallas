import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// PATCH /api/admin/prayers/[id] - Update prayer status (admin only)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const body = await request.json();
    const { status, archived_at } = body;

    // Validate status
    const validStatuses = ["new", "praying", "answered", "ongoing", "archived"];
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid status" },
        { status: 400 }
      );
    }

    // Update prayer
    const { data: updatedPrayer, error } = await supabase
      .from("prayers")
      .update({
        ...(status && { status }),
        ...(archived_at !== undefined && { archived_at }),
      })
      .eq("id", params.id)
      .select()
      .single();

    if (error) {
      console.error("Error updating prayer:", error);
      return NextResponse.json(
        { error: "Failed to update prayer" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        prayer: updatedPrayer,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in update prayer endpoint:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/prayers/[id] - Delete prayer (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const { error } = await supabase
      .from("prayers")
      .delete()
      .eq("id", params.id);

    if (error) {
      console.error("Error deleting prayer:", error);
      return NextResponse.json(
        { error: "Failed to delete prayer" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Prayer deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in delete prayer endpoint:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
