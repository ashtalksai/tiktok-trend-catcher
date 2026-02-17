import { NextResponse } from "next/server";
import { refreshAllCountries } from "@/lib/tiktok";

// Force dynamic - don't prerender
export const dynamic = 'force-dynamic';

/**
 * POST /api/sounds/refresh
 * Triggers a full refresh of trending sounds from all countries.
 * Should be called by a cron job (e.g., every 6 hours)
 */
export async function POST(request: Request) {
  try {
    // Optional: Add a secret key check for security
    const authHeader = request.headers.get("authorization");
    const expectedSecret = process.env.CRON_SECRET;
    
    if (expectedSecret && authHeader !== `Bearer ${expectedSecret}`) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    
    console.log("[Refresh] Starting full country refresh...");
    const startTime = Date.now();
    
    const totalSounds = await refreshAllCountries();
    
    const duration = Date.now() - startTime;
    console.log(`[Refresh] Completed in ${duration}ms, found ${totalSounds} sounds`);
    
    return NextResponse.json({
      success: true,
      soundsFound: totalSounds,
      durationMs: duration,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[Refresh] Error:", error);
    return NextResponse.json(
      { error: "Refresh failed", details: String(error) },
      { status: 500 }
    );
  }
}

// Also allow GET for easy testing
export async function GET() {
  return NextResponse.json({
    endpoint: "/api/sounds/refresh",
    method: "POST",
    description: "Triggers a full refresh of trending sounds",
    note: "Set CRON_SECRET env var to require authorization",
  });
}
