import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";
import path from "path";
import fs from "fs";

// Ensure data directory exists
const dataDir = path.join(process.cwd(), "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const sqlite = new Database(path.join(dataDir, "trendcatch.db"));
export const db = drizzle(sqlite, { schema });

// Initialize database schema
export function initDb() {
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS sounds (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      artist TEXT,
      cover_url TEXT,
      tiktok_url TEXT,
      created_at INTEGER NOT NULL DEFAULT (unixepoch())
    );

    CREATE TABLE IF NOT EXISTS sound_snapshots (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sound_id TEXT NOT NULL REFERENCES sounds(id),
      uses INTEGER NOT NULL,
      velocity REAL,
      captured_at INTEGER NOT NULL DEFAULT (unixepoch())
    );

    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      plan TEXT NOT NULL DEFAULT 'free',
      created_at INTEGER NOT NULL DEFAULT (unixepoch())
    );

    CREATE TABLE IF NOT EXISTS alert_settings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL REFERENCES users(id),
      email_frequency TEXT NOT NULL DEFAULT 'daily',
      velocity_threshold INTEGER NOT NULL DEFAULT 300,
      min_uses INTEGER NOT NULL DEFAULT 200,
      discord_webhook TEXT,
      telegram_chat_id TEXT
    );

    CREATE TABLE IF NOT EXISTS alerts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL REFERENCES users(id),
      sound_id TEXT NOT NULL REFERENCES sounds(id),
      type TEXT NOT NULL,
      sent_at INTEGER NOT NULL DEFAULT (unixepoch())
    );

    CREATE TABLE IF NOT EXISTS sample_videos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sound_id TEXT NOT NULL REFERENCES sounds(id),
      video_url TEXT NOT NULL,
      thumbnail_url TEXT,
      likes INTEGER,
      creator_handle TEXT,
      captured_at INTEGER NOT NULL DEFAULT (unixepoch())
    );

    CREATE INDEX IF NOT EXISTS idx_snapshots_sound ON sound_snapshots(sound_id);
    CREATE INDEX IF NOT EXISTS idx_snapshots_time ON sound_snapshots(captured_at);
    CREATE INDEX IF NOT EXISTS idx_alerts_user ON alerts(user_id);
  `);
}

// Initialize on first import
initDb();
