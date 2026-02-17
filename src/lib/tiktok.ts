/**
 * TikTok Creative Center Scraper
 * Fetches trending sounds from the TikTok Creative Center public page.
 * 
 * Approach: Scrape the server-rendered __NEXT_DATA__ from the music trends page.
 * This gives us up to 3 songs per country without authentication.
 * We scrape multiple countries to get diversity and cache aggressively.
 */

import { db } from "./db";
import { sounds, soundSnapshots } from "./db/schema";
import { eq, desc, and, gte } from "drizzle-orm";

// Countries to scrape for trending sounds (top music markets)
const COUNTRIES = [
  "US", // United States
  "GB", // United Kingdom  
  "BR", // Brazil
  "MX", // Mexico
  "DE", // Germany
  "FR", // France
  "JP", // Japan
  "KR", // South Korea
  "ID", // Indonesia
  "PH", // Philippines
];

// Cache TTL in milliseconds (6 hours to stay well under 100 req/day)
const CACHE_TTL = 6 * 60 * 60 * 1000;

// TikTok Creative Center URL template
const CREATIVE_CENTER_URL = "https://ads.tiktok.com/business/creativecenter/inspiration/popular/music/pc/en";

interface TikTokSound {
  title: string;
  author: string;
  cover: string;
  link: string;
  clipId: string;
  rank: number;
  rankDiff: number | null;
  rankDiffType: number;
  trend: { time: number; value: number }[];
  duration: number;
  countryCode: string;
  relatedItems?: { itemId: string; coverUri: string }[];
}

interface ScrapedData {
  pagination: {
    page: number;
    size: number;
    total: number;
    hasMore: boolean;
  };
  soundList: TikTokSound[];
}

interface CacheEntry {
  countryCode: string;
  lastFetch: number;
}

// In-memory cache tracking for rate limiting
const fetchCache: Map<string, CacheEntry> = new Map();

/**
 * Fetches and parses trending sounds from TikTok Creative Center
 */
async function scrapeCreativeCenter(countryCode: string): Promise<TikTokSound[]> {
  const url = `${CREATIVE_CENTER_URL}?countryCode=${countryCode}`;
  
  console.log(`[TikTok] Scraping Creative Center for ${countryCode}...`);
  
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Cache-Control": "no-cache",
      },
    });
    
    if (!response.ok) {
      console.error(`[TikTok] HTTP error ${response.status} for ${countryCode}`);
      return [];
    }
    
    const html = await response.text();
    
    // Extract __NEXT_DATA__ JSON from the page
    const nextDataMatch = html.match(/<script id="__NEXT_DATA__" type="application\/json">(.+?)<\/script>/);
    
    if (!nextDataMatch) {
      console.error(`[TikTok] Could not find __NEXT_DATA__ in response for ${countryCode}`);
      return [];
    }
    
    const nextData = JSON.parse(nextDataMatch[1]);
    const pageProps = nextData?.props?.pageProps;
    
    if (!pageProps?.data?.soundList) {
      console.warn(`[TikTok] No sound data found for ${countryCode}`);
      return [];
    }
    
    const scrapedData: ScrapedData = pageProps.data;
    console.log(`[TikTok] Found ${scrapedData.soundList.length} sounds for ${countryCode}`);
    
    return scrapedData.soundList;
  } catch (error) {
    console.error(`[TikTok] Error scraping ${countryCode}:`, error);
    return [];
  }
}

/**
 * Stores scraped sounds in the database
 */
async function storeSounds(soundList: TikTokSound[]): Promise<void> {
  const now = new Date();
  
  for (const sound of soundList) {
    // Calculate velocity from trend data
    const trendValues = sound.trend.map(t => t.value);
    let velocity = 0;
    if (trendValues.length >= 2) {
      const oldValue = trendValues[0] || 0.01;
      const newValue = trendValues[trendValues.length - 1] || 0;
      velocity = oldValue > 0 ? Math.round(((newValue - oldValue) / oldValue) * 100) : 0;
    }
    
    // Estimate total uses from rank (rough approximation)
    // Top ranked songs typically have 10K-100K+ uses
    const estimatedUses = Math.round(100000 / (sound.rank || 1));
    
    try {
      // Upsert sound record
      const existingSound = await db.query.sounds.findFirst({
        where: eq(sounds.id, sound.clipId),
      });
      
      if (!existingSound) {
        await db.insert(sounds).values({
          id: sound.clipId,
          name: sound.title,
          artist: sound.author,
          coverUrl: sound.cover,
          tiktokUrl: sound.link,
          createdAt: now,
        });
      }
      
      // Add snapshot
      await db.insert(soundSnapshots).values({
        soundId: sound.clipId,
        uses: estimatedUses,
        velocity: velocity,
        capturedAt: now,
      });
    } catch (error) {
      console.error(`[TikTok] Error storing sound ${sound.clipId}:`, error);
    }
  }
}

/**
 * Check if we should fetch fresh data for a country
 */
function shouldFetch(countryCode: string): boolean {
  const cached = fetchCache.get(countryCode);
  if (!cached) return true;
  
  const age = Date.now() - cached.lastFetch;
  return age > CACHE_TTL;
}

/**
 * Main function to fetch trending sounds with caching
 */
export async function fetchTrendingSounds(forceRefresh = false): Promise<{
  id: string;
  name: string;
  artist: string | null;
  coverUrl: string | null;
  tiktokUrl: string | null;
  latestUses: number;
  velocity: number;
  capturedAt: Date;
}[]> {
  // Get current timestamp
  const now = Date.now();
  const cacheThreshold = new Date(now - CACHE_TTL);
  
  // Check if we have recent data in the database
  const recentSnapshots = await db.query.soundSnapshots.findMany({
    where: gte(soundSnapshots.capturedAt, cacheThreshold),
    limit: 1,
  });
  
  const hasRecentData = recentSnapshots.length > 0;
  
  // Fetch fresh data if needed
  if (forceRefresh || !hasRecentData) {
    console.log("[TikTok] Fetching fresh data from Creative Center...");
    
    // Scrape a subset of countries to stay within rate limits
    // Rotate through countries over time
    const hourOfDay = new Date().getHours();
    const countryIndex = hourOfDay % COUNTRIES.length;
    const countriesToScrape = [
      COUNTRIES[countryIndex],
      COUNTRIES[(countryIndex + 1) % COUNTRIES.length],
      COUNTRIES[(countryIndex + 2) % COUNTRIES.length],
    ];
    
    for (const country of countriesToScrape) {
      if (forceRefresh || shouldFetch(country)) {
        const sounds = await scrapeCreativeCenter(country);
        if (sounds.length > 0) {
          await storeSounds(sounds);
          fetchCache.set(country, { countryCode: country, lastFetch: now });
        }
        
        // Small delay between requests to be polite
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }
  
  // Query aggregated sound data from database
  // Get the most recent snapshot for each sound
  const result = await db.query.sounds.findMany({
    with: {
      snapshots: {
        orderBy: desc(soundSnapshots.capturedAt),
        limit: 1,
      },
    },
  });
  
  // Transform and sort by velocity
  const trending = result
    .filter(s => s.snapshots.length > 0)
    .map(s => ({
      id: s.id,
      name: s.name,
      artist: s.artist,
      coverUrl: s.coverUrl,
      tiktokUrl: s.tiktokUrl,
      latestUses: s.snapshots[0].uses,
      velocity: s.snapshots[0].velocity || 0,
      capturedAt: s.snapshots[0].capturedAt,
    }))
    .sort((a, b) => b.velocity - a.velocity)
    .slice(0, 50); // Top 50 sounds
  
  return trending;
}

/**
 * Get a specific sound with its history
 */
export async function getSoundDetails(soundId: string) {
  const sound = await db.query.sounds.findFirst({
    where: eq(sounds.id, soundId),
    with: {
      snapshots: {
        orderBy: desc(soundSnapshots.capturedAt),
        limit: 10,
      },
    },
  });
  
  return sound;
}

/**
 * Trigger a manual refresh (for cron jobs)
 */
export async function refreshAllCountries(): Promise<number> {
  let totalSounds = 0;
  
  for (const country of COUNTRIES) {
    const sounds = await scrapeCreativeCenter(country);
    if (sounds.length > 0) {
      await storeSounds(sounds);
      totalSounds += sounds.length;
    }
    
    // Delay between requests
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  return totalSounds;
}
