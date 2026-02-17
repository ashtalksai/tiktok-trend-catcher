import { NextResponse } from "next/server";

// Force dynamic - don't prerender
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Mock data for demo - real implementation would use database
    const mockSounds = [
      {
        id: "1",
        name: "Cupid",
        artist: "FIFTY FIFTY",
        coverUrl: "/placeholder.png",
        tiktokUrl: "https://tiktok.com",
        latestUses: 6600,
        velocity: 450,
        capturedAt: new Date().toISOString(),
      },
      {
        id: "2",
        name: "Boy's a Liar Pt. 2",
        artist: "PinkPantheress & Ice Spice",
        coverUrl: "/placeholder.png",
        tiktokUrl: "https://tiktok.com",
        latestUses: 3840,
        velocity: 380,
        capturedAt: new Date().toISOString(),
      },
      {
        id: "3",
        name: "die for you",
        artist: "The Weeknd & Ariana Grande",
        coverUrl: "/placeholder.png",
        tiktokUrl: "https://tiktok.com",
        latestUses: 8820,
        velocity: 320,
        capturedAt: new Date().toISOString(),
      },
    ];

    return NextResponse.json(mockSounds);
  } catch (error) {
    console.error("Error fetching sounds:", error);
    return NextResponse.json(
      { error: "Failed to fetch sounds" },
      { status: 500 }
    );
  }
}
