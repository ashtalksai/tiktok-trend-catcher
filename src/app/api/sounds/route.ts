import { NextResponse } from "next/server";
import { fetchTrendingSounds } from "@/lib/tiktok";

// Force dynamic - don't prerender
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    // Check for refresh parameter
    const { searchParams } = new URL(request.url);
    const forceRefresh = searchParams.get('refresh') === 'true';
    
    // Fetch trending sounds (from cache or fresh)
    const sounds = await fetchTrendingSounds(forceRefresh);
    
    // Transform to API response format
    const response = sounds.map(sound => ({
      id: sound.id,
      name: sound.name,
      artist: sound.artist || "Unknown Artist",
      coverUrl: sound.coverUrl || "/placeholder.png",
      tiktokUrl: sound.tiktokUrl || "https://tiktok.com",
      latestUses: sound.latestUses,
      velocity: Math.round(sound.velocity),
      capturedAt: sound.capturedAt.toISOString(),
    }));

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching sounds:", error);
    
    // Return fallback mock data if scraping fails
    const fallbackSounds = [
      {
        id: "fallback-1",
        name: "Loading trending sounds...",
        artist: "Please wait",
        coverUrl: "/placeholder.png",
        tiktokUrl: "https://tiktok.com",
        latestUses: 0,
        velocity: 0,
        capturedAt: new Date().toISOString(),
      },
    ];
    
    return NextResponse.json(fallbackSounds);
  }
}
