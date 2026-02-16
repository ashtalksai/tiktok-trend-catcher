# TrendCatch 🚀

**Catch TikTok Trends Before They Peak**

Get alerted when sounds surge among micro-influencers. Be first, ride the wave.

## Features

- **Velocity Detection**: Track growth rate, not just volume (400% growth > 50K peaked)
- **Micro-influencer Focus**: Monitor 200+ creators (10K-100K followers) where trends start
- **Real-time Alerts**: Email, Discord, or Telegram notifications
- **Dashboard**: See trending sounds sorted by velocity
- **Sound Details**: Growth charts, sample videos, TikTok links

## Tech Stack

- **Frontend**: Next.js 15 (App Router) + React 19
- **Styling**: Tailwind CSS + shadcn/ui patterns
- **Database**: SQLite + Drizzle ORM (can swap to PostgreSQL)
- **Charts**: Recharts
- **Email**: Resend
- **Hosting**: Coolify (trendcatch.ashketing.com)

## Quick Start

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Open http://localhost:3000
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_APP_URL` | Your app URL (for magic links) |
| `RESEND_API_KEY` | Resend API key for emails |
| `DISCORD_WEBHOOK_URL` | Optional Discord webhook |
| `TELEGRAM_BOT_TOKEN` | Optional Telegram bot token |

## API Endpoints

### GET /api/sounds
Returns trending sounds sorted by velocity.

### POST /api/sounds
Add/update sound data (used by scraper).

```json
{
  "soundId": "tiktok_sound_id",
  "name": "Cupid",
  "artist": "FIFTY FIFTY",
  "uses": 6600,
  "coverUrl": "https://...",
  "tiktokUrl": "https://..."
}
```

### POST /api/auth
Request magic link login.

```json
{
  "email": "user@example.com"
}
```

## Velocity Formula

```
velocity = (current_uses - uses_6h_ago) / uses_6h_ago * 100
```

Threshold: ≥300% growth + ≥200 total uses

## Deployment

### Coolify

1. Create new service from Git
2. Set build command: `pnpm build`
3. Set start command: `pnpm start`
4. Add environment variables
5. Deploy to `trendcatch.ashketing.com`

## Roadmap

- [ ] TikTok scraper (Playwright)
- [ ] Scheduled data collection (every 6h)
- [ ] Payment integration (Stripe)
- [ ] Discord/Telegram bot integration
- [ ] Mobile app (React Native)

## License

MIT
