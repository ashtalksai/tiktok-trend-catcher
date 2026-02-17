"use client";

import { useState, useEffect } from "react";
import { TrendingUp, Zap, Music, ExternalLink, Settings, Home as HomeIcon, BarChart3, RefreshCw } from "lucide-react";

// Sound data type from API
interface Sound {
  id: string;
  name: string;
  artist: string;
  coverUrl: string;
  tiktokUrl: string;
  latestUses: number;
  velocity: number;
  capturedAt: string;
}

function VelocityBadge({ velocity }: { velocity: number }) {
  let colorClass = "velocity-hot";
  if (velocity >= 500) {
    colorClass = "velocity-explosive";
  } else if (velocity >= 400) {
    colorClass = "velocity-very-hot";
  }

  const sign = velocity >= 0 ? "+" : "";

  return (
    <span className={`${colorClass} text-white text-lg font-bold px-3 py-1 rounded-full inline-flex items-center gap-1 font-mono`}>
      <Zap className="w-4 h-4" />
      {sign}{velocity}%
    </span>
  );
}

function SoundCard({ sound, onClick }: { sound: Sound; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-card hover:bg-accent transition-all duration-200 hover:scale-[1.02] p-4 rounded-xl border border-border shadow-sm"
    >
      <div className="flex items-start gap-4">
        {sound.coverUrl && sound.coverUrl !== "/placeholder.png" ? (
          <img 
            src={sound.coverUrl} 
            alt={sound.name}
            className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
          />
        ) : (
          <div className="w-14 h-14 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
            <Music className="w-6 h-6 text-muted-foreground" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg truncate">{sound.name}</h3>
          <p className="text-muted-foreground text-sm truncate">{sound.artist}</p>
          <div className="mt-2 flex items-center gap-3 flex-wrap">
            <VelocityBadge velocity={sound.velocity} />
            <span className="text-sm text-muted-foreground">
              ~{sound.latestUses.toLocaleString()} uses
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}

function LandingPage({ onSubmit }: { onSubmit: (email: string) => void }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus("loading");
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setStatus("success");
    setTimeout(() => onSubmit(email), 500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-background to-muted">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold">TrendCatch</span>
        </div>

        {/* Hero */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">
            🚀 Catch TikTok Trends<br />
            <span className="text-primary">Before They Peak</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Get alerted when sounds surge among micro-influencers. Be first, ride the wave. 🌊
          </p>
        </div>

        {/* Email Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-input bg-background text-lg focus:outline-none focus:ring-2 focus:ring-primary"
            disabled={status === "loading" || status === "success"}
          />
          <button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {status === "loading" ? "Sending..." : status === "success" ? "Check your email! 📧" : "Get Early Access"}
          </button>
        </form>

        {/* Benefits */}
        <div className="text-left space-y-2 text-sm text-muted-foreground">
          <p>✓ Free: 1 alert/day</p>
          <p>✓ Paid: Unlimited alerts + Discord/Telegram</p>
        </div>

        {/* How It Works */}
        <div className="border-t border-border pt-8 text-left space-y-4">
          <h2 className="font-semibold text-lg">How It Works</h2>
          <ol className="space-y-3 text-muted-foreground">
            <li className="flex gap-3">
              <span className="bg-primary/10 text-primary font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">1</span>
              <span>We scan TikTok Creative Center trends globally</span>
            </li>
            <li className="flex gap-3">
              <span className="bg-primary/10 text-primary font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">2</span>
              <span>Track velocity, not volume (rising trends matter most)</span>
            </li>
            <li className="flex gap-3">
              <span className="bg-primary/10 text-primary font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">3</span>
              <span>Alert you the moment a sound crosses your threshold</span>
            </li>
          </ol>
        </div>

        {/* Sample Alerts */}
        <div className="border-t border-border pt-8 text-left space-y-4">
          <h2 className="font-semibold text-lg">Recent Alerts</h2>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-card rounded-lg border border-border">
              <span className="font-medium truncate flex-1">🎵 "霧化する言語" by yasuhiro soda</span>
              <VelocityBadge velocity={450} />
            </div>
            <div className="flex items-center justify-between p-3 bg-card rounded-lg border border-border">
              <span className="font-medium truncate flex-1">🎵 "Baby Boo Ice Cream"</span>
              <VelocityBadge velocity={380} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Dashboard({ onSoundClick, onSettingsClick }: { onSoundClick: (id: string) => void; onSettingsClick: () => void }) {
  const [sounds, setSounds] = useState<Sound[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSounds = async (refresh = false) => {
    try {
      if (refresh) setRefreshing(true);
      const url = refresh ? "/api/sounds?refresh=true" : "/api/sounds";
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch sounds");
      const data = await response.json();
      setSounds(data);
      setError(null);
    } catch (err) {
      setError("Failed to load trending sounds");
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchSounds();
    // Refresh every 5 minutes
    const interval = setInterval(() => fetchSounds(), 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Sort by velocity descending
  const sortedSounds = [...sounds].sort((a, b) => b.velocity - a.velocity);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 bg-background/80 backdrop-blur-lg border-b border-border z-10">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg">TrendCatch</span>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => fetchSounds(true)}
              disabled={refreshing}
              className="p-2 hover:bg-accent rounded-lg transition-colors disabled:opacity-50"
              title="Refresh trends"
            >
              <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
            </button>
            <button 
              onClick={onSettingsClick}
              className="p-2 hover:bg-accent rounded-lg transition-colors"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            Trending Now 🔥
          </h1>
          <span className="text-sm text-muted-foreground">
            {sounds.length} sounds • Sorted by velocity ↓
          </span>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse bg-card p-4 rounded-xl border border-border">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-muted rounded-lg" />
                  <div className="flex-1 space-y-2">
                    <div className="h-5 bg-muted rounded w-3/4" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                    <div className="h-8 bg-muted rounded w-1/3 mt-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">{error}</p>
            <button 
              onClick={() => fetchSounds(true)}
              className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg"
            >
              Retry
            </button>
          </div>
        ) : sortedSounds.length === 0 ? (
          <div className="text-center py-12">
            <Music className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No trending sounds yet.</p>
            <button 
              onClick={() => fetchSounds(true)}
              className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg"
            >
              Fetch Latest Trends
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {sortedSounds.map((sound) => (
              <SoundCard
                key={sound.id}
                sound={sound}
                onClick={() => onSoundClick(sound.id)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-lg border-t border-border">
        <div className="max-w-2xl mx-auto px-4 py-2 flex items-center justify-around">
          <button className="p-3 text-primary">
            <HomeIcon className="w-6 h-6" />
          </button>
          <button className="p-3 text-muted-foreground hover:text-foreground">
            <BarChart3 className="w-6 h-6" />
          </button>
          <button 
            onClick={onSettingsClick}
            className="p-3 text-muted-foreground hover:text-foreground"
          >
            <Settings className="w-6 h-6" />
          </button>
        </div>
      </nav>
    </div>
  );
}

function SoundDetail({ soundId, sounds, onBack }: { soundId: string; sounds: Sound[]; onBack: () => void }) {
  const sound = sounds.find(s => s.id === soundId) || sounds[0];
  
  if (!sound) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Sound not found</p>
      </div>
    );
  }
  
  // Mock chart data based on velocity
  const baseValue = Math.max(100, sound.latestUses - Math.abs(sound.velocity) * 10);
  const chartData = [
    { time: "6h ago", uses: baseValue },
    { time: "12h", uses: Math.round(baseValue * 1.2) },
    { time: "18h", uses: Math.round(baseValue * 1.6) },
    { time: "24h", uses: Math.round(sound.latestUses * 0.85) },
    { time: "now", uses: sound.latestUses },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 bg-background/80 backdrop-blur-lg border-b border-border z-10">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-accent rounded-lg transition-colors">
            ← Back
          </button>
          <span className="font-bold">TrendCatch</span>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Sound Info */}
        <div className="text-center space-y-2">
          {sound.coverUrl && sound.coverUrl !== "/placeholder.png" ? (
            <img 
              src={sound.coverUrl} 
              alt={sound.name}
              className="w-20 h-20 rounded-xl mx-auto object-cover"
            />
          ) : (
            <div className="w-20 h-20 bg-muted rounded-xl flex items-center justify-center mx-auto">
              <Music className="w-10 h-10 text-muted-foreground" />
            </div>
          )}
          <h1 className="text-2xl font-bold">🎵 {sound.name}</h1>
          <p className="text-muted-foreground">{sound.artist}</p>
        </div>

        {/* Velocity */}
        <div className="bg-card p-6 rounded-xl border border-border text-center">
          <div className="text-sm text-muted-foreground mb-2">⚡ Velocity</div>
          <div className="text-4xl font-bold font-mono text-primary">
            {sound.velocity >= 0 ? "+" : ""}{sound.velocity}%
          </div>
          <div className="text-muted-foreground">trend strength</div>
        </div>

        {/* Chart Placeholder */}
        <div className="bg-card p-6 rounded-xl border border-border">
          <h2 className="font-semibold mb-4">📈 Growth Chart</h2>
          <div className="h-48 flex items-end justify-between gap-2">
            {chartData.map((point, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div 
                  className="w-full bg-primary/80 rounded-t"
                  style={{ height: `${(point.uses / sound.latestUses) * 150}px` }}
                />
                <span className="text-xs text-muted-foreground">{point.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-card p-6 rounded-xl border border-border">
          <h2 className="font-semibold mb-4">📊 Stats</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Estimated uses</span>
              <span className="font-mono">~{sound.latestUses.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Velocity</span>
              <span className="font-mono text-green-500">
                {sound.velocity >= 0 ? "+" : ""}{sound.velocity}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Last updated</span>
              <span className="font-mono">{new Date(sound.capturedAt).toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* TikTok Link */}
        <a 
          href={sound.tiktokUrl || "https://tiktok.com"} 
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          Open on TikTok <ExternalLink className="w-4 h-4" />
        </a>
      </main>
    </div>
  );
}

function SettingsPage({ onBack }: { onBack: () => void }) {
  const [emailFrequency, setEmailFrequency] = useState("daily");
  const [velocityThreshold, setVelocityThreshold] = useState(300);
  const [minUses, setMinUses] = useState(200);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 bg-background/80 backdrop-blur-lg border-b border-border z-10">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-accent rounded-lg transition-colors">
            ← Back
          </button>
          <span className="font-bold">Settings</span>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Alert Preferences */}
        <div className="bg-card p-6 rounded-xl border border-border space-y-6">
          <h2 className="font-semibold text-lg flex items-center gap-2">🔔 Alert Preferences</h2>
          
          {/* Email Frequency */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Email Frequency</label>
            <div className="space-y-2">
              {[
                { value: "realtime", label: "Real-time (instant)" },
                { value: "daily", label: "Daily digest (7am)" },
                { value: "weekly", label: "Weekly digest" },
              ].map((option) => (
                <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="frequency"
                    value={option.value}
                    checked={emailFrequency === option.value}
                    onChange={(e) => setEmailFrequency(e.target.value)}
                    className="w-4 h-4 accent-primary"
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Velocity Threshold */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Velocity Threshold: {velocityThreshold}%</label>
            <input
              type="range"
              min={200}
              max={500}
              step={50}
              value={velocityThreshold}
              onChange={(e) => setVelocityThreshold(Number(e.target.value))}
              className="w-full accent-primary"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Min: 200%</span>
              <span>Max: 500%</span>
            </div>
          </div>

          {/* Minimum Uses */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Minimum Uses: {minUses}</label>
            <input
              type="range"
              min={100}
              max={1000}
              step={100}
              value={minUses}
              onChange={(e) => setMinUses(Number(e.target.value))}
              className="w-full accent-primary"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Min: 100</span>
              <span>Max: 1000</span>
            </div>
          </div>

          {/* Notification Channels */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Notification Channels</label>
            <div className="space-y-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked disabled className="w-4 h-4 accent-primary" />
                <span>Email</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer opacity-50">
                <input type="checkbox" disabled className="w-4 h-4" />
                <span>Discord webhook (Pro)</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer opacity-50">
                <input type="checkbox" disabled className="w-4 h-4" />
                <span>Telegram bot (Pro)</span>
              </label>
            </div>
          </div>
        </div>

        {/* Account */}
        <div className="bg-card p-6 rounded-xl border border-border space-y-4">
          <h2 className="font-semibold text-lg">Account</h2>
          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="text-sm text-muted-foreground">Current plan</div>
            <div className="font-semibold">Free: 1 alert/day</div>
          </div>
          <button className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity">
            Upgrade to Pro $29/mo
          </button>
        </div>

        {/* Data Source Info */}
        <div className="bg-card p-6 rounded-xl border border-border space-y-4">
          <h2 className="font-semibold text-lg">📊 Data Source</h2>
          <p className="text-sm text-muted-foreground">
            Trending sounds are sourced from TikTok Creative Center across multiple countries. 
            Data is refreshed every 6 hours to stay within rate limits.
          </p>
        </div>

        {/* Save */}
        <button className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity">
          Save Changes
        </button>
      </main>
    </div>
  );
}

export default function Home() {
  const [view, setView] = useState<"landing" | "dashboard" | "detail" | "settings">("landing");
  const [selectedSoundId, setSelectedSoundId] = useState<string | null>(null);
  const [sounds, setSounds] = useState<Sound[]>([]);

  const handleLogin = () => {
    setView("dashboard");
  };

  const handleSoundClick = (id: string) => {
    setSelectedSoundId(id);
    setView("detail");
  };

  // Fetch sounds for detail view
  useEffect(() => {
    if (view === "dashboard" || view === "detail") {
      fetch("/api/sounds")
        .then(res => res.json())
        .then(data => setSounds(data))
        .catch(console.error);
    }
  }, [view]);

  if (view === "landing") {
    return <LandingPage onSubmit={handleLogin} />;
  }

  if (view === "detail" && selectedSoundId) {
    return <SoundDetail soundId={selectedSoundId} sounds={sounds} onBack={() => setView("dashboard")} />;
  }

  if (view === "settings") {
    return <SettingsPage onBack={() => setView("dashboard")} />;
  }

  return (
    <Dashboard 
      onSoundClick={handleSoundClick} 
      onSettingsClick={() => setView("settings")} 
    />
  );
}
