// Supabase Edge Function: Submit Prayer with Spam Protection
// Handles: Turnstile verification, honeypot, rate limiting, risk scoring, trust calculation

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

const TURNSTILE_SECRET = Deno.env.get("TURNSTILE_SECRET_KEY")!;
const IP_HASH_SALT = Deno.env.get("IP_HASH_SALT")!;
const PASTOR_EMAIL = Deno.env.get("PASTOR_EMAIL") || "theservingchurchdallas@gmail.com";
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;

// Utility: Clean HTML/XSS
const clean = (s = "") => s.replace(/<[^>]*>/g, "").trim();

// Heuristic: Detect keyboard mashing
const hasMash = (s: string) =>
  /[A-Za-z]{10,}/.test(s) && /[bcdfghjklmnpqrstvwxyz]{6,}/i.test(s);

// Heuristic: Too many links or HTML
const tooManyLinks = (s: string) =>
  (s.match(/https?:\/\//g) || []).length > 1 || /<a\s/i.test(s);

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

// Send email notification to pastor
async function sendPrayerNotification(
  prayerData: any,
  status: string
): Promise<void> {
  try {
    const statusBadge = status === "quarantine"
      ? '<span style="background: #fef3c7; color: #92400e; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600;">⚠️ AUTO-QUARANTINED</span>'
      : '<span style="background: #d1fae5; color: #065f46; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600;">✅ APPROVED</span>';

    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "The Serving Church <noreply@servingchurchdallas.com>",
        to: [PASTOR_EMAIL],
        subject: `New Prayer Request${status === "quarantine" ? " (Auto-Quarantined)" : ""}`,
        html: `
          <!DOCTYPE html>
          <html>
            <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #1e40af;">🙏 New Prayer Request</h2>
              <div style="margin: 20px 0;">
                ${statusBadge}
              </div>
              <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>From:</strong> ${prayerData.name || "Anonymous"}</p>
                ${prayerData.email ? `<p><strong>Email:</strong> ${prayerData.email}</p>` : ""}
                <p><strong>Visibility:</strong> ${prayerData.is_public ? "Public" : "Private (Pastor Only)"}</p>
                <p><strong>Risk Score:</strong> ${prayerData.risk_score}/100</p>
                <p><strong>Trust Level:</strong> ${prayerData.trust_level}/100</p>
                <hr style="border: none; border-top: 1px solid #d1d5db; margin: 15px 0;">
                <p><strong>Prayer Request:</strong></p>
                <p style="white-space: pre-wrap;">${prayerData.prayer_request}</p>
              </div>
              ${status === "quarantine" ? `
                <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; border-radius: 4px; margin: 20px 0;">
                  <p style="margin: 0; color: #92400e;"><strong>⚠️ This prayer was auto-quarantined</strong></p>
                  <p style="margin: 10px 0 0 0; color: #92400e; font-size: 14px;">
                    It's still visible on the prayer wall but marked for review.
                    If it receives 3 community reports, it will be automatically hidden.
                  </p>
                </div>
              ` : ""}
              <p style="text-align: center; margin-top: 30px;">
                <a href="https://servingchurchdallas.com/admin/prayers"
                   style="background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
                          color: white;
                          padding: 12px 24px;
                          text-decoration: none;
                          border-radius: 8px;
                          display: inline-block;">
                  View in Admin Panel
                </a>
              </p>
            </body>
          </html>
        `,
      }),
    });
  } catch (error) {
    console.error("Failed to send email notification:", error);
    // Don't fail the whole request if email fails
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
    const ua = req.headers.get("user-agent") ?? "";

    const {
      name,
      email,
      prayer_request,
      is_public,
      show_name,
      member_id,
      turnstileToken,
      honeypot,
      startedAt,
    } = await req.json();

    // 1. Honeypot check (bots fill hidden fields)
    if (honeypot) {
      return new Response(
        JSON.stringify({ error: "Invalid submission" }),
        { status: 400 }
      );
    }

    // 2. Verify Turnstile CAPTCHA
    if (!await verifyTurnstile(turnstileToken, ip)) {
      return new Response(
        JSON.stringify({ error: "CAPTCHA verification failed" }),
        { status: 400 }
      );
    }

    // 3. Minimum fill time check (humans take at least 1.5s)
    const msElapsed = Date.now() - (Number(startedAt) || 0);
    if (msElapsed && msElapsed < 1500) {
      return new Response(
        JSON.stringify({ error: "Submission too fast" }),
        { status: 400 }
      );
    }

    // Clean and validate inputs
    const body = clean(prayer_request).slice(0, 2000);
    const cleanName = clean(name).slice(0, 80);
    const cleanEmail = clean(email).slice(0, 120);

    if (!body || body.length < 5) {
      return new Response(
        JSON.stringify({ error: "Prayer request is too short" }),
        { status: 400 }
      );
    }

    // 4. Rate limiting (3 per 10 minutes per IP)
    const ipHash = await hashIp(ip);
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000).toISOString();

    const { count } = await supabase
      .from("prayers")
      .select("id", { count: "exact", head: true })
      .eq("ip_hash", ipHash)
      .gte("created_at", tenMinutesAgo);

    if ((count ?? 0) >= 3) {
      return new Response(
        JSON.stringify({ error: "Rate limit exceeded. Please wait a few minutes." }),
        { status: 429 }
      );
    }

    // 5. Calculate risk score (0-100)
    let risk = 0;

    // Keyboard mashing detection
    if (hasMash(body)) risk += 25;

    // Multiple links or HTML injection
    if (tooManyLinks(body)) risk += 25;

    // Very short content
    if (body.length < 20) risk += 10;

    // Excessive special characters or emojis
    if (/[^ \w.,'!\n-]/u.test(body)) risk += 10;

    // Check for repeated content from same IP in last 24h
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const { data: recentFromIP } = await supabase
      .from("prayers")
      .select("prayer_request")
      .eq("ip_hash", ipHash)
      .gte("created_at", oneDayAgo);

    if (recentFromIP && recentFromIP.some((p: any) =>
      p.prayer_request && body.includes(p.prayer_request.slice(0, 50))
    )) {
      risk += 20;
    }

    // 6. Calculate trust level (0-100)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const { data: recentPrayers } = await supabase
      .from("prayers")
      .select("id, reports, status")
      .eq("ip_hash", ipHash)
      .gte("created_at", thirtyDaysAgo);

    const cleanPosts = (recentPrayers || []).filter(
      (p: any) => p.reports === 0 && p.status === "public"
    ).length;

    const trust = Math.min(30, cleanPosts * 15);

    // 7. Determine status based on risk-trust balance
    const status = (risk - trust >= 40) ? "quarantine" : "public";

    // 8. Insert prayer into database
    const { data: insertedPrayer, error: insertError } = await supabase
      .from("prayers")
      .insert([{
        name: cleanName || null,
        email: cleanEmail || null,
        prayer_request: body,
        is_public: is_public ?? true,
        show_name: !!show_name,
        member_id: member_id || null,
        status,
        ip_hash: ipHash,
        user_agent: ua,
        risk_score: risk,
        trust_level: trust,
        reports: 0,
      }])
      .select()
      .single();

    if (insertError) {
      console.error("Database error:", insertError);
      return new Response(
        JSON.stringify({ error: "Failed to submit prayer request" }),
        { status: 500 }
      );
    }

    // 9. Send email notification to pastor
    await sendPrayerNotification({
      name: cleanName,
      email: cleanEmail,
      prayer_request: body,
      is_public: is_public ?? true,
      risk_score: risk,
      trust_level: trust,
    }, status);

    // 10. Return success response
    return new Response(
      JSON.stringify({
        success: true,
        status,
        message: status === "quarantine"
          ? "Prayer submitted and under automatic review"
          : "Prayer submitted successfully",
        prayer: insertedPrayer,
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
