import { NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

// Use Gemini for free, high-quality content generation
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

export async function POST(request: NextRequest) {
  try {
    const { transcript } = await request.json()

    if (!transcript) {
      return NextResponse.json(
        { error: "Transcript is required" },
        { status: 400 }
      )
    }

    const prompt = `You are a content repurposing expert. Based on the following transcript, generate comprehensive content for multiple platforms. Be creative, engaging, and ensure each piece of content is tailored for its specific platform.

TRANSCRIPT:
${transcript}

Please generate the following content in JSON format:

1. **shortFormScripts**: Array of 5-10 short-form video scripts (30-60 seconds each) optimized for TikTok/Instagram Reels. Each should have:
   - hook (attention-grabbing first line)
   - body (main content)
   - callToAction (engaging CTA)
   - hashtags (5-7 relevant hashtags)

2. **socialPosts**: Object containing:
   - linkedin: Array of 10+ professional LinkedIn posts (with emojis, formatting)
   - twitter: Array of 10+ tweets (under 280 chars each, engaging, with hashtags)
   - instagram: Array of 10+ Instagram captions (with emojis, hashtags, engaging tone)

3. **blogArticle**: Object with:
   - title: SEO-optimized title
   - metaDescription: 155-160 char meta description
   - content: Full article in markdown (800-1200 words)
   - keywords: Array of 10+ SEO keywords

4. **quotes**: Array of 10 shareable quotes extracted or derived from the content. Each quote should be:
   - Standalone and impactful
   - Suitable for social media graphics
   - 1-3 sentences max

5. **contentCalendar**: A 2-week content calendar (14 days) with daily recommendations. Each day should have:
   - date: Day number (1-14)
   - platform: Primary platform for that day
   - contentType: Type of content (post, reel, story, etc.)
   - contentIndex: Reference to which piece of content to use
   - bestTime: Recommended posting time
   - notes: Any specific tips for that day

Return ONLY valid JSON with these exact keys. No markdown code blocks, just pure JSON.`

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })
    const result = await model.generateContent(prompt)
    const response = result.response
    const text = response.text()

    // Parse the JSON response
    let generatedContent
    try {
      // Try to extract JSON from the response
      let jsonString = text.trim()
      
      // Remove markdown code blocks if present
      if (jsonString.startsWith("```json")) {
        jsonString = jsonString.slice(7)
      } else if (jsonString.startsWith("```")) {
        jsonString = jsonString.slice(3)
      }
      if (jsonString.endsWith("```")) {
        jsonString = jsonString.slice(0, -3)
      }
      jsonString = jsonString.trim()
      
      generatedContent = JSON.parse(jsonString)
    } catch {
      console.error("Failed to parse JSON:", text)
      throw new Error("Failed to parse generated content as JSON")
    }

    return NextResponse.json(generatedContent)
  } catch (error) {
    console.error("Generation error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Content generation failed" },
      { status: 500 }
    )
  }
}
