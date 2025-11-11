import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  phone: z.string().optional(),
  turnstileToken: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validationResult = contactSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.errors[0].message },
        { status: 400 }
      );
    }

    const { name, email, message, phone, turnstileToken } = validationResult.data;

    // Verify Turnstile token (server-side)
    if (!turnstileToken) {
      return NextResponse.json(
        { error: "Security verification is required" },
        { status: 403 }
      );
    }

    const secretKey = process.env.TURNSTILE_SECRET_KEY;
    const ip = request.headers.get("x-forwarded-for") || "unknown";

    // Verify with Cloudflare Turnstile
    const verifyResponse = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: secretKey || "",
          response: turnstileToken,
          remoteip: ip,
        }),
      }
    );

    const verifyData = await verifyResponse.json();
    if (!verifyData.success) {
      return NextResponse.json(
        { error: "Security verification failed" },
        { status: 403 }
      );
    }

    // Send email notification to church
    const emailData = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
      to: process.env.PRAYER_REQUEST_EMAIL || "theservingchurchdallas@gmail.com",
      subject: `New Contact Form Message from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
              .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
              .field { margin-bottom: 20px; }
              .label { font-weight: bold; color: #4b5563; margin-bottom: 5px; display: block; }
              .value { background: white; padding: 12px; border-radius: 6px; border-left: 4px solid #667eea; }
              .message-box { background: white; padding: 20px; border-radius: 6px; border: 1px solid #e5e7eb; margin-top: 10px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0;">📬 New Contact Message</h1>
              </div>
              <div class="content">
                <div class="field">
                  <span class="label">From:</span>
                  <div class="value">${name}</div>
                </div>
                <div class="field">
                  <span class="label">Email:</span>
                  <div class="value">${email}</div>
                </div>
                ${phone ? `
                <div class="field">
                  <span class="label">Phone:</span>
                  <div class="value">${phone}</div>
                </div>
                ` : ''}
                <div class="field">
                  <span class="label">Message:</span>
                  <div class="message-box">${message.replace(/\n/g, '<br>')}</div>
                </div>
                <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
                  This message was sent from the contact form on servingchurchdallas.com
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (!emailData.data) {
      console.error("Failed to send email:", emailData.error);
      return NextResponse.json(
        { error: "Failed to send message. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been sent successfully! We'll get back to you soon."
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error in contact form:", error);
    return NextResponse.json(
      { error: "An error occurred while sending your message. Please try again later." },
      { status: 500 }
    );
  }
}
