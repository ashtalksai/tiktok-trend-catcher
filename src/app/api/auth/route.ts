import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users, alertSettings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Magic link request
export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email required" },
        { status: 400 }
      );
    }

    // Create or get user
    let user = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (user.length === 0) {
      // Create new user
      const newUser = await db
        .insert(users)
        .values({ email })
        .returning();
      
      // Create default alert settings
      await db.insert(alertSettings).values({
        userId: newUser[0].id,
      });

      user = newUser;
    }

    // Generate magic link token (in production, use proper JWT or similar)
    const token = Buffer.from(`${email}:${Date.now()}`).toString("base64url");
    const magicLink = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/auth/verify?token=${token}`;

    // Send email
    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: "TrendCatch <alerts@trendcatch.app>",
        to: email,
        subject: "🔑 Your magic link to TrendCatch",
        html: `
          <div style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #8b5cf6;">🚀 Welcome to TrendCatch</h1>
            <p>Click the button below to log in:</p>
            <a href="${magicLink}" style="display: inline-block; background: #8b5cf6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">
              Log In to TrendCatch
            </a>
            <p style="color: #666; font-size: 14px; margin-top: 24px;">
              This link expires in 1 hour. If you didn't request this, you can safely ignore this email.
            </p>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}
