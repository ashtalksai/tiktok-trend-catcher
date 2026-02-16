import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sounds, soundSnapshots } from "@/lib/db/schema";
import { desc, eq, sql } from "drizzle-orm";

export async function GET() {
  try {
    // Get sounds with their latest velocity, ordered by velocity descending
    const trendingSounds = await db
      .select({
        id: sounds.id,
        name: sounds.name,
        artist: sounds.artist,
        coverUrl: sounds.coverUrl,
        tiktokUrl: sounds.tiktokUrl,
        latestUses: soundSnapshots.uses,
        velocity: soundSnapshots.velocity,
        capturedAt: soundSnapshots.capturedAt,
      })
      .from(sounds)
      .innerJoin(
        soundSnapshots,
        eq(sounds.id, soundSnapshots.soundId)
      )
      .orderBy(desc(soundSnapshots.velocity))
      .limit(20);

    // If no real data, return mock data for demo
    if (trendingSounds.length === 0) {
      return NextResponse.json([
        {
          id: "1",
          name: "Cupid",
          artist: "FIFTY FIFTY",
          velocity: 450,
          oldUses: 1200,
          newUses: 6600,
        },
        {
          id: "2",
          name: "Boy's a Liar Pt. 2",
          artist: "PinkPantheress & Ice Spice",
          velocity: 380,
          oldUses: 800,
          newUses: 3840,
        },
        {
          id: "3",
          name: "die for you",
          artist: "The Weeknd & Ariana Grande",
          velocity: 320,
          oldUses: 2100,
          newUses: 8820,
        },
        {
          id: "4",
          name: "Escapism",
          artist: "RAYE ft. 070 Shake",
          velocity: 510,
          oldUses: 400,
          newUses: 2440,
        },
      ]);
    }

    return NextResponse.json(trendingSounds);
  } catch (error) {
    console.error("Error fetching sounds:", error);
    return NextResponse.json(
      { error: "Failed to fetch sounds" },
      { status: 500 }
    );
  }
}

// Endpoint for scraper to add/update sounds
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { soundId, name, artist, uses, coverUrl, tiktokUrl } = body;

    if (!soundId || !name || uses === undefined) {
      return NextResponse.json(
        { error: "Missing required fields: soundId, name, uses" },
        { status: 400 }
      );
    }

    // Upsert sound
    await db
      .insert(sounds)
      .values({
        id: soundId,
        name,
        artist,
        coverUrl,
        tiktokUrl,
      })
      .onConflictDoUpdate({
        target: sounds.id,
        set: { name, artist, coverUrl, tiktokUrl },
      });

    // Get previous snapshot to calculate velocity
    const previousSnapshot = await db
      .select()
      .from(soundSnapshots)
      .where(eq(soundSnapshots.soundId, soundId))
      .orderBy(desc(soundSnapshots.capturedAt))
      .limit(1);

    let velocity = null;
    if (previousSnapshot.length > 0 && previousSnapshot[0].uses > 0) {
      velocity = ((uses - previousSnapshot[0].uses) / previousSnapshot[0].uses) * 100;
    }

    // Insert new snapshot
    await db.insert(soundSnapshots).values({
      soundId,
      uses,
      velocity,
    });

    return NextResponse.json({ success: true, velocity });
  } catch (error) {
    console.error("Error adding sound:", error);
    return NextResponse.json(
      { error: "Failed to add sound" },
      { status: 500 }
    );
  }
}
