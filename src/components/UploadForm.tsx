"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Link, FileAudio, Loader2, Sparkles, AlertCircle } from "lucide-react"
import { ProcessingStatus, GeneratedContent } from "@/types/content"

interface UploadFormProps {
  onContentGenerated: (content: GeneratedContent, transcript: string) => void
}

export function UploadForm({ onContentGenerated }: UploadFormProps) {
  const [status, setStatus] = useState<ProcessingStatus>("idle")
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [youtubeUrl, setYoutubeUrl] = useState("")
  const [manualTranscript, setManualTranscript] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setError(null)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file) {
      setSelectedFile(file)
      setError(null)
    }
  }

  const processContent = async (mode: "file" | "url" | "transcript") => {
    setError(null)
    setStatus("uploading")
    setProgress(10)

    try {
      let transcript: string

      if (mode === "transcript") {
        if (!manualTranscript.trim()) {
          throw new Error("Please enter a transcript")
        }
        transcript = manualTranscript
        setProgress(50)
      } else {
        // Transcribe
        setStatus("transcribing")
        setProgress(20)

        const formData = new FormData()
        if (mode === "file" && selectedFile) {
          formData.append("file", selectedFile)
        } else if (mode === "url") {
          formData.append("youtubeUrl", youtubeUrl)
        }

        const transcribeResponse = await fetch("/api/transcribe", {
          method: "POST",
          body: formData,
        })

        if (!transcribeResponse.ok) {
          const errorData = await transcribeResponse.json()
          throw new Error(errorData.error || "Transcription failed")
        }

        const transcribeData = await transcribeResponse.json()
        transcript = transcribeData.transcript
        setProgress(50)
      }

      // Generate content
      setStatus("generating")
      setProgress(60)

      const generateResponse = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ transcript }),
      })

      if (!generateResponse.ok) {
        const errorData = await generateResponse.json()
        throw new Error(errorData.error || "Content generation failed")
      }

      setProgress(90)
      const content = await generateResponse.json()
      
      setProgress(100)
      setStatus("complete")
      
      onContentGenerated(content, transcript)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      setStatus("error")
    }
  }

  const getStatusMessage = () => {
    switch (status) {
      case "uploading":
        return "Uploading file..."
      case "transcribing":
        return "Transcribing audio with Whisper..."
      case "generating":
        return "Generating content with Claude..."
      case "complete":
        return "Complete!"
      default:
        return ""
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          Content Repurposing Tool
        </CardTitle>
        <CardDescription>
          Upload video/audio, paste a YouTube URL, or enter a transcript to generate multi-platform content
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upload">Upload File</TabsTrigger>
            <TabsTrigger value="youtube">YouTube URL</TabsTrigger>
            <TabsTrigger value="transcript">Paste Transcript</TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-4">
            <div
              className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept="audio/*,video/*"
                className="hidden"
              />
              {selectedFile ? (
                <div className="flex items-center justify-center gap-2">
                  <FileAudio className="h-8 w-8 text-primary" />
                  <div className="text-left">
                    <p className="font-medium">{selectedFile.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    Drag and drop or click to upload
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Supports MP3, MP4, WAV, M4A, and more
                  </p>
                </>
              )}
            </div>
            <Button
              onClick={() => processContent("file")}
              disabled={!selectedFile || status !== "idle"}
              className="w-full"
            >
              {status !== "idle" ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Sparkles className="h-4 w-4 mr-2" />
              )}
              Generate Content
            </Button>
          </TabsContent>

          <TabsContent value="youtube" className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Link className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Note: For YouTube videos, please download the audio first and use the upload option.
              </p>
            </div>
            <Button
              onClick={() => processContent("url")}
              disabled={!youtubeUrl || status !== "idle"}
              className="w-full"
            >
              {status !== "idle" ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Sparkles className="h-4 w-4 mr-2" />
              )}
              Generate Content
            </Button>
          </TabsContent>

          <TabsContent value="transcript" className="space-y-4">
            <Textarea
              placeholder="Paste your transcript here..."
              value={manualTranscript}
              onChange={(e) => setManualTranscript(e.target.value)}
              className="min-h-[200px]"
            />
            <p className="text-sm text-muted-foreground">
              {manualTranscript.length} characters
            </p>
            <Button
              onClick={() => processContent("transcript")}
              disabled={!manualTranscript.trim() || status !== "idle"}
              className="w-full"
            >
              {status !== "idle" ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Sparkles className="h-4 w-4 mr-2" />
              )}
              Generate Content
            </Button>
          </TabsContent>
        </Tabs>

        {status !== "idle" && status !== "error" && (
          <div className="mt-6 space-y-2">
            <div className="flex justify-between text-sm">
              <span>{getStatusMessage()}</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        {error && (
          <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-destructive">Error</p>
              <p className="text-sm text-destructive/80">{error}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
