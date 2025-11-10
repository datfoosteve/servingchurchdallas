import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createServiceRoleClient } from "@/lib/supabase/server";

// Ensure Node runtime (Resend SDK expects Node) and no prerendering
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Type for the prayer request data
interface PrayerRequestData {
  name: string;
  email?: string;
  request: string;
  isPublic: boolean;
  member_id?: string;
  show_name?: boolean;
}

export async function POST(request: NextRequest) {
  try {
    const body: PrayerRequestData & { turnstileToken?: string } = await request.json();
    const { name, email, request: prayerRequest, isPublic, member_id, show_name, turnstileToken } = body;

    // Validation
    if (!name || !prayerRequest) {
      return NextResponse.json(
        { error: "Name and prayer request are required" },
        { status: 400 }
      );
    }
    if (prayerRequest.length < 10) {
      return NextResponse.json(
        { error: "Prayer request must be at least 10 characters" },
        { status: 400 }
      );
    }

    // Verify Turnstile token (server-side)
    if (!turnstileToken) {
      return NextResponse.json(
        { error: "Security verification is required" },
        { status: 403 }
      );
    }

    const secretKey = process.env.TURNSTILE_SECRET_KEY;
    if (!secretKey) {
      console.error("TURNSTILE_SECRET_KEY is not configured");
      return NextResponse.json(
        { error: "Security verification not configured" },
        { status: 500 }
      );
    }

    // Get client IP
    const ip = request.headers.get("x-forwarded-for") ||
               request.headers.get("x-real-ip") ||
               "unknown";

    // Verify with Cloudflare Turnstile
    const verifyResponse = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: secretKey,
          response: turnstileToken,
          remoteip: ip,
        }),
      }
    );

    const verifyData = await verifyResponse.json();
    if (!verifyData.success) {
      console.error("Turnstile verification failed:", verifyData);
      return NextResponse.json(
        { error: "Security verification failed" },
        { status: 403 }
      );
    }

    // 1️⃣ Save to Supabase database
    // Use service role client to bypass RLS policies
    const supabase = createServiceRoleClient();
    const insertData: any = {
      name,
      email: email || null,
      request: prayerRequest,
      is_public: isPublic,
      status: isPublic ? "public" : "new",
      prayer_count: 0,
    };

    // Add member-specific fields if provided
    if (member_id) {
      insertData.member_id = member_id;
      insertData.show_name = show_name !== undefined ? show_name : true;
    }

    const { data: prayerData, error: dbError } = await supabase
      .from("prayers")
      .insert(insertData)
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      return NextResponse.json(
        { error: "Failed to save prayer request to database", details: dbError.message },
        { status: 500 }
      );
    }

    // 2️⃣ Send email notification (existing functionality)
    const apiKey = process.env.RESEND_API_KEY;
    const toEmail =
      process.env.PRAYER_REQUEST_EMAIL || "theservingchurchdallas@gmail.com";
    const fromEmail =
      process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

    if (!apiKey) {
      console.error("Missing RESEND_API_KEY");
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const requestType = isPublic ? "Public" : "Private";
    const subject = `${requestType} Prayer Request from ${name}`;

    const submittedAt = new Date().toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    });

    const htmlContent = `
      <!doctype html>
      <html><head><meta charset="utf-8">
        <style>
          body{font-family:Arial,system-ui;line-height:1.6;color:#333;max-width:600px;margin:0 auto;padding:20px}
          .header{background:${isPublic ? "#3b82f6" : "#9333ea"};color:#fff;padding:20px;border-radius:8px 8px 0 0;margin-bottom:20px}
          .badge{display:inline-block;background:${isPublic ? "#1d4ed8" : "#6b21a8"};color:#fff;padding:4px 12px;border-radius:12px;font:bold 12px/1 Arial;margin-top:8px}
          .content{background:#f9fafb;padding:20px;border-radius:0 0 8px 8px}
          .field{margin-bottom:16px}
          .label{font-weight:bold;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px}
          .value{color:#111827;font-size:16px}
          .request-text{background:#fff;padding:16px;border-radius:6px;border-left:4px solid ${isPublic ? "#3b82f6" : "#9333ea"};white-space:pre-wrap;word-wrap:break-word}
          .footer{margin-top:20px;padding-top:20px;border-top:1px solid #e5e7eb;font-size:12px;color:#6b7280;text-align:center}
          .dashboard-link{display:inline-block;margin-top:16px;padding:12px 24px;background:#3b82f6;color:#fff;text-decoration:none;border-radius:6px;font-weight:bold}
        </style>
      </head>
      <body>
        <div class="header">
          <h1>New Prayer Request</h1>
          <span class="badge">${requestType.toUpperCase()}</span>
        </div>
        <div class="content">
          <div class="field"><div class="label">Submitted By</div><div class="value">${name}${member_id ? ' <span style="background:#10b981;color:#fff;padding:2px 8px;border-radius:4px;font-size:11px;font-weight:bold;">MEMBER</span>' : ''}</div></div>
          ${email ? `<div class="field"><div class="label">Email</div><div class="value"><a href="mailto:${email}">${email}</a></div></div>` : ""}
          ${member_id ? `<div class="field"><div class="label">Member Account</div><div class="value">Linked to member ID: ${member_id.substring(0, 8)}...</div></div>` : ""}
          ${member_id && show_name !== undefined ? `<div class="field"><div class="label">Display Preference</div><div class="value">${show_name ? 'Show name on prayer wall' : 'Post anonymously'}</div></div>` : ""}
          <div class="field"><div class="label">Prayer Request</div><div class="request-text">${prayerRequest}</div></div>
          <div class="field"><div class="label">Request Type</div><div class="value">${isPublic ? "Public - May be shared with the congregation and prayer team" : "Private - Only for pastoral staff and prayer team leaders"}</div></div>
          <div class="field"><div class="label">Submitted</div><div class="value">${submittedAt}</div></div>
          ${prayerData ? `<div class="field"><div class="label">Database ID</div><div class="value">${prayerData.id}</div></div>` : ""}
        </div>
        <div class="footer">
          <p>This prayer request was submitted through The Serving Church website.</p>
          ${email ? `<p>You can reply directly to ${email} to follow up.</p>` : "<p>No email address was provided for follow-up.</p>"}
          <p><a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://servingchurchdallas.com"}/admin/prayers" class="dashboard-link">View in Admin Dashboard</a></p>
        </div>
      </body></html>
    `;

    const textContent = [
      `New ${requestType} Prayer Request`,
      `Submitted By: ${name}`,
      email ? `Email: ${email}` : "No email provided",
      "Prayer Request:",
      prayerRequest,
      `Request Type: ${isPublic ? "Public - May be shared with the congregation and prayer team" : "Private - Only for pastoral staff and prayer team leaders"}`,
      `Submitted: ${submittedAt}`,
      prayerData ? `Database ID: ${prayerData.id}` : "",
      "---",
      "This prayer request was submitted through The Serving Church website.",
      email ? `You can reply directly to ${email} to follow up.` : "",
      `View in Admin Dashboard: ${process.env.NEXT_PUBLIC_SITE_URL || "https://servingchurchdallas.com"}/admin/prayers`,
    ].join("\n");

    const emailData = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject,
      html: htmlContent,
      text: textContent,
      replyTo: email || undefined,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Prayer request submitted successfully",
        prayerId: prayerData?.id,
        emailId: (emailData as any)?.data?.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing prayer request:", error);
    return NextResponse.json(
      {
        error: "Failed to submit prayer request",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
