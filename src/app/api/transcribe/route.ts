import { NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"
import { spawn } from "child_process"
import { randomUUID } from "crypto"
import { readFile, unlink, mkdir } from "fs/promises"
import { join } from "path"
import { tmpdir } from "os"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export const maxDuration = 120 // Allow up to 120 seconds for YouTube downloads

// Validate YouTube URL
function isValidYouTubeUrl(url: string): boolean {
  const patterns = [
    /^https?:\/\/(www\.)?youtube\.com\/watch\?v=[\w-]+/,
    /^https?:\/\/youtu\.be\/[\w-]+/,
    /^https?:\/\/(www\.)?youtube\.com\/shorts\/[\w-]+/,
  ]
  return patterns.some(pattern => pattern.test(url))
}

// Download YouTube audio using yt-dlp
async function downloadYouTubeAudio(url: string): Promise<{ buffer: Buffer; title: string }> {
  const tempDir = join(tmpdir(), 'yt-downloads')
  await mkdir(tempDir, { recursive: true })
  
  const outputId = randomUUID()
  const outputPath = join(tempDir, `${outputId}.mp3`)
  
  return new Promise((resolve, reject) => {
    // Build yt-dlp args
    const ytdlpArgs = [
      '-x',                           // Extract audio
      '--audio-format', 'mp3',        // Convert to mp3
      '--audio-quality', '5',         // Medium quality (0=best, 10=worst)
      '-o', outputPath,               // Output path
      '--no-playlist',                // Single video only
      '--max-filesize', '50M',        // Limit file size
      '--socket-timeout', '30',       // Timeout for network operations
      '--print', 'title',             // Print title to stdout
    ]
    
    // Use WARP proxy if configured (bypasses YouTube bot detection)
    if (process.env.WARP_PROXY) {
      ytdlpArgs.push('--proxy', process.env.WARP_PROXY)
    }
    
    ytdlpArgs.push(url)
    
    const ytdlp = spawn('yt-dlp', ytdlpArgs)
    
    let title = ''
    let stderr = ''
    
    ytdlp.stdout.on('data', (data) => {
      title = data.toString().trim()
    })
    
    ytdlp.stderr.on('data', (data) => {
      stderr += data.toString()
    })
    
    ytdlp.on('close', async (code) => {
      if (code !== 0) {
        console.error('yt-dlp error:', stderr)
        reject(new Error(`yt-dlp failed with code ${code}: ${stderr.slice(0, 200)}`))
        return
      }
      
      try {
        const buffer = await readFile(outputPath)
        // Cleanup temp file
        await unlink(outputPath).catch(() => {})
        resolve({ buffer, title: title || 'youtube_audio' })
      } catch (err) {
        reject(new Error('Failed to read downloaded audio file'))
      }
    })
    
    ytdlp.on('error', (err) => {
      reject(new Error(`Failed to start yt-dlp: ${err.message}`))
    })
    
    // Timeout after 90 seconds
    setTimeout(() => {
      ytdlp.kill()
      reject(new Error('YouTube download timed out'))
    }, 90000)
  })
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File | null
    const youtubeUrl = formData.get("youtubeUrl") as string | null

    if (!file && !youtubeUrl) {
      return NextResponse.json(
        { error: "Please provide a file or YouTube URL" },
        { status: 400 }
      )
    }

    let audioBuffer: Buffer
    let fileName: string

    if (youtubeUrl) {
      // Validate YouTube URL
      if (!isValidYouTubeUrl(youtubeUrl)) {
        return NextResponse.json(
          { error: "Invalid YouTube URL. Supported formats: youtube.com/watch, youtu.be, youtube.com/shorts" },
          { status: 400 }
        )
      }

      try {
        console.log(`Downloading YouTube audio: ${youtubeUrl}`)
        const { buffer, title } = await downloadYouTubeAudio(youtubeUrl)
        audioBuffer = buffer
        fileName = `${title.replace(/[^a-zA-Z0-9]/g, '_').slice(0, 50)}.mp3`
        console.log(`Downloaded YouTube audio: ${fileName} (${audioBuffer.length} bytes)`)
      } catch (ytError) {
        console.error("YouTube download error:", ytError)
        const errorMessage = ytError instanceof Error ? ytError.message : 'Unknown error'
        
        // Check if it's a bot detection error
        const isBotDetection = errorMessage.includes('bot') || errorMessage.includes('Sign in')
        const helpText = isBotDetection 
          ? 'YouTube blocked this request. Download the audio using cobalt.tools or y2mate.com, then upload it here.'
          : 'Try downloading the audio manually and uploading it here.'
        
        return NextResponse.json(
          { error: `YouTube download failed. ${helpText}` },
          { status: 400 }
        )
      }
    } else if (file) {
      const arrayBuffer = await file.arrayBuffer()
      audioBuffer = Buffer.from(arrayBuffer)
      fileName = file.name
    } else {
      return NextResponse.json(
        { error: "No valid input provided" },
        { status: 400 }
      )
    }

    // Check file size (Whisper limit is 25MB)
    if (audioBuffer.length > 25 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Audio file too large. Maximum size is 25MB." },
        { status: 400 }
      )
    }

    // Create a File-like object for OpenAI
    const uint8Array = new Uint8Array(audioBuffer)
    const audioBlob = new Blob([uint8Array], { type: 'audio/mpeg' })
    const openAIFile = new File([audioBlob], fileName, { type: 'audio/mpeg' })

    const transcription = await openai.audio.transcriptions.create({
      file: openAIFile,
      model: "whisper-1",
      response_format: "text",
    })

    return NextResponse.json({ transcript: transcription })
  } catch (error) {
    console.error("Transcription error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Transcription failed" },
      { status: 500 }
    )
  }
}
