import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { error: "Turnstile token is required" },
        { status: 400 }
      );
    }

    const secretKey = process.env.TURNSTILE_SECRET_KEY;

    if (!secretKey) {
      console.error("TURNSTILE_SECRET_KEY is not configured");
      return NextResponse.json(
        { error: "Turnstile verification not configured" },
        { status: 500 }
      );
    }

    // Get client IP for verification
    const ip = request.headers.get("x-forwarded-for") ||
               request.headers.get("x-real-ip") ||
               "unknown";

    // Verify with Cloudflare Turnstile API
    const verifyResponse = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          secret: secretKey,
          response: token,
          remoteip: ip,
        }),
      }
    );

    const verifyData = await verifyResponse.json();

    if (!verifyData.success) {
      console.error("Turnstile verification failed:", verifyData);
      return NextResponse.json(
        { error: "Verification failed", details: verifyData["error-codes"] },
        { status: 403 }
      );
    }

    // Verification successful
    return NextResponse.json(
      { success: true, message: "Verification successful" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Turnstile verification error:", error);
    return NextResponse.json(
      { error: "Verification failed due to server error" },
      { status: 500 }
    );
  }
}
