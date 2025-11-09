// Supabase Edge Function: Report Prayer (Community Moderation)
// Allows community to flag inappropriate prayers
// Auto-hides prayer after 3 unique reports

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

const TURNSTILE_SECRET = Deno.env.get("TURNSTILE_SECRET_KEY")!;
const IP_HASH_SALT = Deno.env.get("IP_HASH_SALT")!;

// Hash IP with salt
async function hashIp(ip: string): Promise<string> {
  const data = new TextEncoder().encode(ip + IP_HASH_SALT);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buf))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

// Verify Cloudflare Turnstile
async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: TURNSTILE_SECRET,
          response: token,
          remoteip: ip,
        }),
      }
    );
    const data = await response.json();
    return !!data.success;
  } catch (error) {
    console.error("Turnstile verification error:", error);
    return false;
  }
}

serve(async (req) => {
  // CORS headers
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  try {
    const ip = req.headers.get("cf-connecting-ip") ||
               req.headers.get("x-forwarded-for") ||
               req.headers.get("x-real-ip") ||
               "0.0.0.0";

    const { prayer_id, turnstileToken } = await req.json();

    if (!prayer_id) {
      return new Response(
        JSON.stringify({ error: "Prayer ID is required" }),
        { status: 400 }
      );
    }

    // 1. Verify Turnstile CAPTCHA (prevent bot abuse)
    if (!await verifyTurnstile(turnstileToken, ip)) {
      return new Response(
        JSON.stringify({ error: "CAPTCHA verification failed" }),
        { status: 400 }
      );
    }

    // 2. Hash IP for anonymous reporting
    const ipHash = await hashIp(ip);

    // 3. Check if this IP has already reported this prayer
    const { data: existingReport } = await supabase
      .from("prayer_reports")
      .select("id")
      .eq("prayer_id", prayer_id)
      .eq("ip_hash", ipHash)
      .single();

    if (existingReport) {
      return new Response(
        JSON.stringify({ error: "You have already reported this prayer" }),
        { status: 400 }
      );
    }

    // 4. Rate limiting: max 5 reports per hour per IP
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { count } = await supabase
      .from("prayer_reports")
      .select("id", { count: "exact", head: true })
      .eq("ip_hash", ipHash)
      .gte("created_at", oneHourAgo);

    if ((count ?? 0) >= 5) {
      return new Response(
        JSON.stringify({ error: "Report limit exceeded. Please try again later." }),
        { status: 429 }
      );
    }

    // 5. Insert the report
    const { error: insertError } = await supabase
      .from("prayer_reports")
      .insert([{
        prayer_id,
        ip_hash: ipHash,
      }]);

    if (insertError) {
      console.error("Failed to insert report:", insertError);
      return new Response(
        JSON.stringify({ error: "Failed to submit report" }),
        { status: 500 }
      );
    }

    // 6. Increment report count on the prayer
    const { error: updateError } = await supabase.rpc("increment_prayer_reports", {
      prayer_id_param: prayer_id,
    });

    if (updateError) {
      // Fallback: Manual increment
      const { data: prayer } = await supabase
        .from("prayers")
        .select("reports")
        .eq("id", prayer_id)
        .single();

      if (prayer) {
        await supabase
          .from("prayers")
          .update({ reports: (prayer.reports || 0) + 1 })
          .eq("id", prayer_id);
      }
    }

    // 7. Check if prayer should be auto-hidden (≥3 reports)
    const { data: updatedPrayer } = await supabase
      .from("prayers")
      .select("reports, status")
      .eq("id", prayer_id)
      .single();

    if (updatedPrayer && updatedPrayer.reports >= 3 && updatedPrayer.status !== "hidden") {
      await supabase
        .from("prayers")
        .update({ status: "hidden" })
        .eq("id", prayer_id);
    }

    // 8. Return success response
    return new Response(
      JSON.stringify({
        success: true,
        message: "Prayer reported successfully. Thank you for helping keep the prayer wall safe.",
        reports: updatedPrayer?.reports || 0,
        hidden: (updatedPrayer?.reports || 0) >= 3,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );

  } catch (error) {
    console.error("Unexpected error:", error);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
});
