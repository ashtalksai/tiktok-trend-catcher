import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

// Sounds table - tracks TikTok sounds
export const sounds = sqliteTable("sounds", {
  id: text("id").primaryKey(), // TikTok sound ID
  name: text("name").notNull(),
  artist: text("artist"),
  coverUrl: text("cover_url"),
  tiktokUrl: text("tiktok_url"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

// Sound relations
export const soundsRelations = relations(sounds, ({ many }) => ({
  snapshots: many(soundSnapshots),
}));

// Sound snapshots - usage data over time
export const soundSnapshots = sqliteTable("sound_snapshots", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  soundId: text("sound_id").notNull().references(() => sounds.id),
  uses: integer("uses").notNull(),
  velocity: real("velocity"), // % change from previous snapshot
  capturedAt: integer("captured_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

// Snapshot relations
export const soundSnapshotsRelations = relations(soundSnapshots, ({ one }) => ({
  sound: one(sounds, {
    fields: [soundSnapshots.soundId],
    references: [sounds.id],
  }),
}));

// Users table
export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  plan: text("plan").notNull().default("free"), // free | pro
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

// User alert settings
export const alertSettings = sqliteTable("alert_settings", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").notNull().references(() => users.id),
  emailFrequency: text("email_frequency").notNull().default("daily"), // realtime | daily | weekly
  velocityThreshold: integer("velocity_threshold").notNull().default(300), // minimum % growth to alert
  minUses: integer("min_uses").notNull().default(200),
  discordWebhook: text("discord_webhook"),
  telegramChatId: text("telegram_chat_id"),
});

// Alerts sent
export const alerts = sqliteTable("alerts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").notNull().references(() => users.id),
  soundId: text("sound_id").notNull().references(() => sounds.id),
  type: text("type").notNull(), // email | discord | telegram
  sentAt: integer("sent_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

// Sample videos for each sound
export const sampleVideos = sqliteTable("sample_videos", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  soundId: text("sound_id").notNull().references(() => sounds.id),
  videoUrl: text("video_url").notNull(),
  thumbnailUrl: text("thumbnail_url"),
  likes: integer("likes"),
  creatorHandle: text("creator_handle"),
  capturedAt: integer("captured_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

// Type exports
export type Sound = typeof sounds.$inferSelect;
export type SoundSnapshot = typeof soundSnapshots.$inferSelect;
export type User = typeof users.$inferSelect;
export type AlertSettings = typeof alertSettings.$inferSelect;
export type Alert = typeof alerts.$inferSelect;
export type SampleVideo = typeof sampleVideos.$inferSelect;
