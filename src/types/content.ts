export interface ShortFormScript {
  hook: string
  body: string
  callToAction: string
  hashtags: string[]
}

export interface SocialPosts {
  linkedin: string[]
  twitter: string[]
  instagram: string[]
}

export interface BlogArticle {
  title: string
  metaDescription: string
  content: string
  keywords: string[]
}

export interface ContentCalendarDay {
  date: number
  platform: string
  contentType: string
  contentIndex: number
  bestTime: string
  notes: string
}

export interface GeneratedContent {
  shortFormScripts: ShortFormScript[]
  socialPosts: SocialPosts
  blogArticle: BlogArticle
  quotes: string[]
  contentCalendar: ContentCalendarDay[]
}

export type ProcessingStatus = 
  | "idle"
  | "uploading"
  | "transcribing"
  | "generating"
  | "complete"
  | "error"
