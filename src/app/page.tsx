"use client";

import { useState } from "react";
import { TrendingUp, Zap, Music, ExternalLink, Settings, Home as HomeIcon, BarChart3 } from "lucide-react";

// Mock data for demo
const mockSounds = [
  {
    id: "1",
    name: "Cupid",
    artist: "FIFTY FIFTY",
    velocity: 450,
    oldUses: 1200,
    newUses: 6600,
    coverUrl: "/placeholder.png",
  },
  {
    id: "2",
    name: "Boy's a Liar Pt. 2",
    artist: "PinkPantheress & Ice Spice",
    velocity: 380,
    oldUses: 800,
    newUses: 3840,
    coverUrl: "/placeholder.png",
  },
  {
    id: "3",
    name: "die for you",
    artist: "The Weeknd & Ariana Grande",
    velocity: 320,
    oldUses: 2100,
    newUses: 8820,
    coverUrl: "/placeholder.png",
  },
  {
    id: "4",
    name: "Last Last",
    artist: "Burna Boy",
    velocity: 295,
    oldUses: 1500,
    newUses: 5925,
    coverUrl: "/placeholder.png",
  },
  {
    id: "5",
    name: "Escapism",
    artist: "RAYE ft. 070 Shake",
    velocity: 510,
    oldUses: 400,
    newUses: 2440,
    coverUrl: "/placeholder.png",
  },
];

function VelocityBadge({ velocity }: { velocity: number }) {
  let colorClass = "velocity-hot";
  if (velocity >= 500) {
    colorClass = "velocity-explosive";
  } else if (velocity >= 400) {
    colorClass = "velocity-very-hot";
  }

  return (
    <span className={`${colorClass} text-white text-lg font-bold px-3 py-1 rounded-full inline-flex items-center gap-1 font-mono`}>
      <Zap className="w-4 h-4" />
      +{velocity}%
    </span>
  );
}

function SoundCard({ sound, onClick }: { sound: typeof mockSounds[0]; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-card hover:bg-accent transition-all duration-200 hover:scale-[1.02] p-4 rounded-xl border border-border shadow-sm"
    >
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
          <Music className="w-6 h-6 text-muted-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg truncate">{sound.name}</h3>
          <p className="text-muted-foreground text-sm truncate">{sound.artist}</p>
          <div className="mt-2 flex items-center gap-3">
            <VelocityBadge velocity={sound.velocity} />
            <span className="text-sm text-muted-foreground">
              {sound.oldUses.toLocaleString()} → {sound.newUses.toLocaleString()} uses
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
              <span>We monitor 200+ micro-influencers (10K-100K followers)</span>
            </li>
            <li className="flex gap-3">
              <span className="bg-primary/10 text-primary font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">2</span>
              <span>Track velocity, not volume (400% growth &gt; 50K peaked)</span>
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
              <span className="font-medium">🎵 "Cupid" by FIFTY FIFTY</span>
              <VelocityBadge velocity={450} />
            </div>
            <div className="flex items-center justify-between p-3 bg-card rounded-lg border border-border">
              <span className="font-medium">🎵 "Boy's a Liar Pt.2"</span>
              <VelocityBadge velocity={380} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Dashboard({ onSoundClick, onSettingsClick }: { onSoundClick: (id: string) => void; onSettingsClick: () => void }) {
  // Sort by velocity descending
  const sortedSounds = [...mockSounds].sort((a, b) => b.velocity - a.velocity);

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
          <button 
            onClick={onSettingsClick}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            Trending Now 🔥
          </h1>
          <span className="text-sm text-muted-foreground">Sorted by velocity ↓</span>
        </div>

        <div className="space-y-3">
          {sortedSounds.map((sound) => (
            <SoundCard
              key={sound.id}
              sound={sound}
              onClick={() => onSoundClick(sound.id)}
            />
          ))}
        </div>

        <button className="w-full mt-6 py-3 text-muted-foreground hover:text-foreground transition-colors">
          Load more...
        </button>
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

function SoundDetail({ soundId, onBack }: { soundId: string; onBack: () => void }) {
  const sound = mockSounds.find(s => s.id === soundId) || mockSounds[0];
  
  // Mock chart data
  const chartData = [
    { time: "6h", uses: sound.oldUses },
    { time: "12h", uses: Math.round(sound.oldUses * 1.5) },
    { time: "18h", uses: Math.round(sound.oldUses * 2.5) },
    { time: "24h", uses: Math.round(sound.newUses * 0.8) },
    { time: "now", uses: sound.newUses },
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
          <div className="w-20 h-20 bg-muted rounded-xl flex items-center justify-center mx-auto">
            <Music className="w-10 h-10 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold">🎵 {sound.name}</h1>
          <p className="text-muted-foreground">{sound.artist}</p>
        </div>

        {/* Velocity */}
        <div className="bg-card p-6 rounded-xl border border-border text-center">
          <div className="text-sm text-muted-foreground mb-2">⚡ Velocity</div>
          <div className="text-4xl font-bold font-mono text-primary">+{sound.velocity}%</div>
          <div className="text-muted-foreground">in last 6 hours</div>
        </div>

        {/* Chart Placeholder */}
        <div className="bg-card p-6 rounded-xl border border-border">
          <h2 className="font-semibold mb-4">📈 Growth Chart</h2>
          <div className="h-48 flex items-end justify-between gap-2">
            {chartData.map((point, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div 
                  className="w-full bg-primary/80 rounded-t"
                  style={{ height: `${(point.uses / sound.newUses) * 150}px` }}
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
              <span className="text-muted-foreground">Current uses</span>
              <span className="font-mono">{sound.newUses.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">6h ago</span>
              <span className="font-mono">{sound.oldUses.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Growth</span>
              <span className="font-mono text-green-500">+{(sound.newUses - sound.oldUses).toLocaleString()} (+{sound.velocity}%)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Detection time</span>
              <span className="font-mono">2h ago</span>
            </div>
          </div>
        </div>

        {/* Sample Videos */}
        <div className="bg-card p-6 rounded-xl border border-border">
          <h2 className="font-semibold mb-4">🎬 Sample Videos</h2>
          <div className="grid grid-cols-3 gap-2">
            {[12000, 8000, 6000].map((likes, i) => (
              <div key={i} className="aspect-[9/16] bg-muted rounded-lg flex flex-col items-center justify-center">
                <span className="text-2xl">🎬</span>
                <span className="text-xs text-muted-foreground mt-1">{(likes/1000).toFixed(0)}K likes</span>
              </div>
            ))}
          </div>
        </div>

        {/* TikTok Link */}
        <a 
          href="#" 
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

  const handleLogin = () => {
    setView("dashboard");
  };

  const handleSoundClick = (id: string) => {
    setSelectedSoundId(id);
    setView("detail");
  };

  if (view === "landing") {
    return <LandingPage onSubmit={handleLogin} />;
  }

  if (view === "detail" && selectedSoundId) {
    return <SoundDetail soundId={selectedSoundId} onBack={() => setView("dashboard")} />;
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
