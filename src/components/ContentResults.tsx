"use client"

import { GeneratedContent } from "@/types/content"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Download, Copy, Check } from "lucide-react"
import { useState } from "react"
import JSZip from "jszip"

interface ContentResultsProps {
  content: GeneratedContent
  transcript: string
}

export function ContentResults({ content, transcript }: ContentResultsProps) {
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null)

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedIndex(id)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const downloadAsZip = async () => {
    const zip = new JSZip()

    // Add transcript
    zip.file("transcript.txt", transcript)

    // Add short form scripts
    const scriptsContent = content.shortFormScripts
      .map((script, i) => 
        `=== Script ${i + 1} ===\n\nHook: ${script.hook}\n\nBody: ${script.body}\n\nCTA: ${script.callToAction}\n\nHashtags: ${script.hashtags.join(" ")}\n\n`
      )
      .join("\n---\n\n")
    zip.file("short-form-scripts.txt", scriptsContent)

    // Add social posts
    const socialFolder = zip.folder("social-posts")
    socialFolder?.file("linkedin.txt", content.socialPosts.linkedin.join("\n\n---\n\n"))
    socialFolder?.file("twitter.txt", content.socialPosts.twitter.join("\n\n---\n\n"))
    socialFolder?.file("instagram.txt", content.socialPosts.instagram.join("\n\n---\n\n"))

    // Add blog article
    zip.file("blog-article.md", `# ${content.blogArticle.title}\n\n**Meta Description:** ${content.blogArticle.metaDescription}\n\n**Keywords:** ${content.blogArticle.keywords.join(", ")}\n\n---\n\n${content.blogArticle.content}`)

    // Add quotes
    zip.file("quotes.txt", content.quotes.join("\n\n---\n\n"))

    // Add content calendar
    const calendarContent = content.contentCalendar
      .map(day => 
        `Day ${day.date}: ${day.platform} - ${day.contentType}\nBest Time: ${day.bestTime}\nContent Index: ${day.contentIndex}\nNotes: ${day.notes}`
      )
      .join("\n\n---\n\n")
    zip.file("content-calendar.txt", calendarContent)

    // Generate and download
    const blob = await zip.generateAsync({ type: "blob" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "repurposed-content.zip"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Generated Content</h2>
        <Button onClick={downloadAsZip} className="gap-2">
          <Download className="h-4 w-4" />
          Download All as ZIP
        </Button>
      </div>

      <Tabs defaultValue="scripts" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="scripts">Scripts</TabsTrigger>
          <TabsTrigger value="social">Social</TabsTrigger>
          <TabsTrigger value="blog">Blog</TabsTrigger>
          <TabsTrigger value="quotes">Quotes</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
        </TabsList>

        <TabsContent value="scripts" className="space-y-4">
          <h3 className="text-lg font-semibold">Short-Form Video Scripts ({content.shortFormScripts.length})</h3>
          <div className="grid gap-4">
            {content.shortFormScripts.map((script, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Script {index + 1}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => copyToClipboard(
                      `${script.hook}\n\n${script.body}\n\n${script.callToAction}\n\n${script.hashtags.join(" ")}`,
                      `script-${index}`
                    )}
                  >
                    {copiedIndex === `script-${index}` ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Hook</p>
                    <p className="font-medium text-primary">{script.hook}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Body</p>
                    <p>{script.body}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Call to Action</p>
                    <p className="font-medium">{script.callToAction}</p>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {script.hashtags.map((tag, i) => (
                      <span key={i} className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="social" className="space-y-6">
          <Tabs defaultValue="linkedin">
            <TabsList>
              <TabsTrigger value="linkedin">LinkedIn ({content.socialPosts.linkedin.length})</TabsTrigger>
              <TabsTrigger value="twitter">Twitter ({content.socialPosts.twitter.length})</TabsTrigger>
              <TabsTrigger value="instagram">Instagram ({content.socialPosts.instagram.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="linkedin" className="space-y-4 mt-4">
              {content.socialPosts.linkedin.map((post, index) => (
                <Card key={index}>
                  <CardContent className="pt-4">
                    <div className="flex justify-between items-start gap-4">
                      <p className="whitespace-pre-wrap">{post}</p>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="shrink-0"
                        onClick={() => copyToClipboard(post, `linkedin-${index}`)}
                      >
                        {copiedIndex === `linkedin-${index}` ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="twitter" className="space-y-4 mt-4">
              {content.socialPosts.twitter.map((tweet, index) => (
                <Card key={index}>
                  <CardContent className="pt-4">
                    <div className="flex justify-between items-start gap-4">
                      <p>{tweet}</p>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="shrink-0"
                        onClick={() => copyToClipboard(tweet, `twitter-${index}`)}
                      >
                        {copiedIndex === `twitter-${index}` ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      {tweet.length}/280 characters
                    </p>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="instagram" className="space-y-4 mt-4">
              {content.socialPosts.instagram.map((caption, index) => (
                <Card key={index}>
                  <CardContent className="pt-4">
                    <div className="flex justify-between items-start gap-4">
                      <p className="whitespace-pre-wrap">{caption}</p>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="shrink-0"
                        onClick={() => copyToClipboard(caption, `instagram-${index}`)}
                      >
                        {copiedIndex === `instagram-${index}` ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </TabsContent>

        <TabsContent value="blog" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{content.blogArticle.title}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-2">{content.blogArticle.metaDescription}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => copyToClipboard(
                    `# ${content.blogArticle.title}\n\n${content.blogArticle.content}`,
                    "blog"
                  )}
                >
                  {copiedIndex === "blog" ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-6">
                {content.blogArticle.keywords.map((keyword, i) => (
                  <span key={i} className="bg-secondary px-2 py-1 rounded text-xs">
                    {keyword}
                  </span>
                ))}
              </div>
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ __html: content.blogArticle.content.replace(/\n/g, "<br/>") }} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quotes" className="space-y-4">
          <h3 className="text-lg font-semibold">Shareable Quotes ({content.quotes.length})</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {content.quotes.map((quote, index) => (
              <Card key={index} className="bg-gradient-to-br from-primary/5 to-primary/10">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start gap-4">
                    <p className="text-lg italic">&ldquo;{quote}&rdquo;</p>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="shrink-0"
                      onClick={() => copyToClipboard(quote, `quote-${index}`)}
                    >
                      {copiedIndex === `quote-${index}` ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4">
          <h3 className="text-lg font-semibold">2-Week Content Calendar</h3>
          <div className="grid gap-3">
            {content.contentCalendar.map((day) => (
              <Card key={day.date} className="hover:shadow-md transition-shadow">
                <CardContent className="py-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary text-primary-foreground w-12 h-12 rounded-lg flex items-center justify-center font-bold text-lg">
                      {day.date}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{day.platform}</span>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">{day.contentType}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{day.notes}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{day.bestTime}</p>
                      <p className="text-xs text-muted-foreground">Best time to post</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
