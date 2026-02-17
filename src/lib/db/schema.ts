import { pgTable, text, integer, real, serial, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Sounds table - tracks TikTok sounds
export const sounds = pgTable("sounds", {
  id: text("id").primaryKey(), // TikTok sound ID
  name: text("name").notNull(),
  artist: text("artist"),
  coverUrl: text("cover_url"),
  tiktokUrl: text("tiktok_url"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Sound relations
export const soundsRelations = relations(sounds, ({ many }) => ({
  snapshots: many(soundSnapshots),
}));

// Sound snapshots - usage data over time
export const soundSnapshots = pgTable("sound_snapshots", {
  id: serial("id").primaryKey(),
  soundId: text("sound_id").notNull().references(() => sounds.id),
  uses: integer("uses").notNull(),
  velocity: real("velocity"), // % change from previous snapshot
  capturedAt: timestamp("captured_at").notNull().defaultNow(),
});

// Snapshot relations
export const soundSnapshotsRelations = relations(soundSnapshots, ({ one }) => ({
  sound: one(sounds, {
    fields: [soundSnapshots.soundId],
    references: [sounds.id],
  }),
}));

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  plan: text("plan").notNull().default("free"), // free | pro
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// User alert settings
export const alertSettings = pgTable("alert_settings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  emailFrequency: text("email_frequency").notNull().default("daily"), // realtime | daily | weekly
  velocityThreshold: integer("velocity_threshold").notNull().default(300), // minimum % growth to alert
  minUses: integer("min_uses").notNull().default(200),
  discordWebhook: text("discord_webhook"),
  telegramChatId: text("telegram_chat_id"),
});

// Alerts sent
export const alerts = pgTable("alerts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  soundId: text("sound_id").notNull().references(() => sounds.id),
  type: text("type").notNull(), // email | discord | telegram
  sentAt: timestamp("sent_at").notNull().defaultNow(),
});

// Sample videos for each sound
export const sampleVideos = pgTable("sample_videos", {
  id: serial("id").primaryKey(),
  soundId: text("sound_id").notNull().references(() => sounds.id),
  videoUrl: text("video_url").notNull(),
  thumbnailUrl: text("thumbnail_url"),
  likes: integer("likes"),
  creatorHandle: text("creator_handle"),
  capturedAt: timestamp("captured_at").notNull().defaultNow(),
});

// Type exports
export type Sound = typeof sounds.$inferSelect;
export type SoundSnapshot = typeof soundSnapshots.$inferSelect;
export type User = typeof users.$inferSelect;
export type AlertSettings = typeof alertSettings.$inferSelect;
export type Alert = typeof alerts.$inferSelect;
export type SampleVideo = typeof sampleVideos.$inferSelect;
