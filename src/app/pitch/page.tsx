'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, TrendingUp, Zap, Target, DollarSign, Users, Rocket } from 'lucide-react'

const slides = [
  {
    id: 1,
    bg: 'bg-gradient-to-br from-purple-600 via-pink-600 to-red-600',
    component: <TitleSlide />
  },
  {
    id: 2,
    bg: 'bg-muted/30',
    component: <ProblemSlide />
  },
  {
    id: 3,
    bg: 'bg-primary',
    component: <SolutionSlide />
  },
  {
    id: 4,
    bg: 'bg-muted/30',
    component: <MarketSlide />
  },
  {
    id: 5,
    bg: 'bg-gradient-to-br from-primary via-purple-600 to-pink-600',
    component: <ProductSlide />
  },
  {
    id: 6,
    bg: 'bg-muted/30',
    component: <BusinessModelSlide />
  },
  {
    id: 7,
    bg: 'bg-primary',
    component: <CompetitionSlide />
  },
  {
    id: 8,
    bg: 'bg-muted/30',
    component: <GTMSlide />
  },
  {
    id: 9,
    bg: 'bg-gradient-to-br from-purple-600 to-pink-600',
    component: <WhyNowSlide />
  },
  {
    id: 10,
    bg: 'bg-muted/30',
    component: <TeamSlide />
  },
  {
    id: 11,
    bg: 'bg-primary',
    component: <TractionSlide />
  },
  {
    id: 12,
    bg: 'bg-gradient-to-br from-pink-600 via-purple-600 to-primary',
    component: <VisionSlide />
  },
]

function TitleSlide() {
  return (
    <div className="h-full flex items-center justify-center p-8">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center border border-white/20">
              <TrendingUp className="w-10 h-10 text-pink-300" />
            </div>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold text-white mb-4"
          >
            TrendCatch
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-white/70 mb-6"
          >
            Catch TikTok Trends Before They Peak
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-lg md:text-xl text-pink-300 font-medium"
          >
            Monitor micro-influencer velocity → Alert before saturation → Ride the wave first
          </motion.p>
        </div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="hidden lg:flex flex-col justify-center"
        >
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <div className="text-pink-300 font-mono text-sm mb-4">SPEED WINS</div>
            <div className="space-y-6">
              <div>
                <div className="text-4xl font-bold text-white">+9,900%</div>
                <div className="text-white/60 text-sm">Sound velocity we track</div>
              </div>
              <div className="h-px bg-white/20"></div>
              <div>
                <div className="text-4xl font-bold text-pink-300">24-48h</div>
                <div className="text-white/60 text-sm">Before saturation</div>
              </div>
              <div className="h-px bg-white/20"></div>
              <div>
                <div className="text-4xl font-bold text-white">10x</div>
                <div className="text-white/60 text-sm">Higher engagement window</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <p className="absolute bottom-12 left-1/2 -translate-x-1/2 font-mono text-white/40">trendcatch.ashketing.com</p>
    </div>
  )
}

function ProblemSlide() {
  return (
    <div className="h-full flex items-center justify-center p-8">
      <div className="max-w-5xl w-full">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
            <span className="text-2xl">😰</span>
          </span>
          <span className="text-sm uppercase tracking-widest text-muted-foreground">The Problem</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-12">
          Creators Always Arrive 48 Hours Too Late
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="text-5xl font-bold text-destructive mb-2">2+ hrs</div>
            <p className="text-muted-foreground">Scrolling to find trends manually</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="text-5xl font-bold text-destructive mb-2">50K+</div>
            <p className="text-muted-foreground">Videos already using the sound when you find it</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="text-5xl font-bold text-destructive mb-2">0%</div>
            <p className="text-muted-foreground">Chance to go viral when you're late</p>
          </div>
        </div>
        <div className="mt-12 p-8 bg-destructive/5 border-l-4 border-destructive rounded-r-xl">
          <p className="text-lg italic text-foreground/80">
            "By the time I see a sound trending, brands have already made 10 videos. I'm always too late."
          </p>
          <p className="text-sm text-muted-foreground mt-2">— Mid-tier content creator, 500K followers</p>
        </div>
      </div>
    </div>
  )
}

function SolutionSlide() {
  return (
    <div className="h-full flex items-center justify-center p-8">
      <div className="max-w-6xl w-full">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-10 h-10 rounded-full bg-pink-300/20 flex items-center justify-center">
            <Zap className="w-5 h-5 text-pink-300" />
          </span>
          <span className="text-sm uppercase tracking-widest text-pink-300/70">The Solution</span>
        </div>
        <h2 className="text-4xl font-bold text-white mb-8">
          Track Velocity, Not Volume
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/10 backdrop-blur rounded-xl p-8 border border-white/20">
            <div className="text-6xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold text-white mb-3">Micro-Influencer Layer</h3>
            <p className="text-white/70">
              Monitor accounts with 10K-100K followers where trends START, not where they saturate.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-8 border border-white/20">
            <div className="text-6xl mb-4">📈</div>
            <h3 className="text-2xl font-bold text-white mb-3">Growth Rate Alerts</h3>
            <p className="text-white/70">
              500 uses at +400% velocity beats 50K uses peaked yesterday. Speed > size.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-8 border border-white/20">
            <div className="text-6xl mb-4">⚡</div>
            <h3 className="text-2xl font-bold text-white mb-3">Real-Time Monitoring</h3>
            <p className="text-white/70">
              TikTok Creative Center API checked hourly. Alert when sound crosses velocity threshold.
            </p>
          </div>
          <div className="bg-pink-300 text-purple-900 rounded-xl p-8 border-4 border-pink-200">
            <div className="text-6xl mb-4">🚀</div>
            <h3 className="text-2xl font-bold mb-3">24-48h Head Start</h3>
            <p className="opacity-90 font-medium">
              Jump on trends while engagement is 10x higher. Create before saturation.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function MarketSlide() {
  return (
    <div className="h-full flex items-center justify-center p-8">
      <div className="max-w-5xl w-full">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Target className="w-5 h-5 text-primary" />
          </span>
          <span className="text-sm uppercase tracking-widest text-muted-foreground">Market Size</span>
        </div>
        <h2 className="text-4xl font-bold text-foreground mb-12">
          $15B Creator Economy, 200M+ Creators Globally
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="text-center">
            <div className="text-4xl font-mono font-bold text-primary mb-2">50M</div>
            <div className="text-sm text-muted-foreground">US content creators</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-mono font-bold text-primary mb-2">2M</div>
            <div className="text-sm text-muted-foreground">Full-time professionals</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-mono font-bold text-primary mb-2">25K</div>
            <div className="text-sm text-muted-foreground">Social media agencies</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-mono font-bold text-primary mb-2">67%</div>
            <div className="text-sm text-muted-foreground">Use TikTok (primary platform)</div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-primary text-primary-foreground rounded-xl p-6">
            <div className="text-sm uppercase tracking-wide opacity-80 mb-2">TAM</div>
            <div className="text-3xl font-bold mb-1">$500M</div>
            <div className="text-sm opacity-80">All content creators with monetization intent</div>
          </div>
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="text-sm uppercase tracking-wide text-muted-foreground mb-2">SAM</div>
            <div className="text-3xl font-bold mb-1">$50M</div>
            <div className="text-sm text-muted-foreground">TikTok-focused creators (100K-1M followers)</div>
          </div>
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="text-sm uppercase tracking-wide text-muted-foreground mb-2">SOM (Y1)</div>
            <div className="text-3xl font-bold mb-1">$720K</div>
            <div className="text-sm text-muted-foreground">2,000 paying creators @ $30/mo avg</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProductSlide() {
  return (
    <div className="h-full flex items-center justify-center p-8">
      <div className="max-w-6xl w-full">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-10 h-10 rounded-full bg-pink-300/20 flex items-center justify-center">
            <Zap className="w-5 h-5 text-pink-300" />
          </span>
          <span className="text-sm uppercase tracking-widest text-pink-300/70">The Product</span>
        </div>
        <h2 className="text-4xl font-bold text-white mb-12">
          Real TikTok Data → Velocity Alerts → Early Advantage
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-6">Core Features</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-pink-300 text-xl">•</span>
                <div>
                  <div className="font-semibold text-white">Hourly Sound Monitoring</div>
                  <div className="text-sm text-white/60">TikTok Creative Center API checks every hour</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-pink-300 text-xl">•</span>
                <div>
                  <div className="font-semibold text-white">Velocity Calculation</div>
                  <div className="text-sm text-white/60">% growth rate, not just total uses</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-pink-300 text-xl">•</span>
                <div>
                  <div className="font-semibold text-white">Email + SMS Alerts</div>
                  <div className="text-sm text-white/60">Instant notification when threshold crossed</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-pink-300 text-xl">•</span>
                <div>
                  <div className="font-semibold text-white">Saved Sounds Library</div>
                  <div className="text-sm text-white/60">Archive your discovered trends</div>
                </div>
              </li>
            </ul>
          </div>
          <div className="bg-pink-300 text-purple-900 rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-6">Example Alert</h3>
            <div className="bg-purple-900 text-white rounded-lg p-6 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-5 h-5 text-pink-300" />
                <span className="font-bold text-pink-300">VELOCITY ALERT</span>
              </div>
              <div className="font-mono text-2xl mb-2">+9,900%</div>
              <div className="mb-4">
                <div className="font-semibold">Baby Boo Ice Cream</div>
                <div className="text-sm opacity-80">by Seravane</div>
              </div>
              <div className="text-sm space-y-1 opacity-90">
                <div>Uses: 100K (+95K in 24h)</div>
                <div>Window: 24-48h before saturation</div>
              </div>
            </div>
            <p className="text-sm font-medium">
              Act NOW for maximum engagement opportunity →
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function BusinessModelSlide() {
  return (
    <div className="h-full flex items-center justify-center p-8">
      <div className="max-w-5xl w-full">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-primary" />
          </span>
          <span className="text-sm uppercase tracking-widest text-muted-foreground">Business Model</span>
        </div>
        <h2 className="text-4xl font-bold text-foreground mb-12">
          SaaS with Clear Path to $1M+ ARR
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="font-semibold mb-1">Free</h3>
            <div className="text-3xl font-bold mb-4">$0<span className="text-base font-normal text-muted-foreground">/mo</span></div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><span className="text-primary">•</span> 1 alert/day</li>
              <li className="flex items-center gap-2"><span className="text-primary">•</span> Email only</li>
              <li className="flex items-center gap-2"><span className="text-primary">•</span> 5 saved sounds</li>
            </ul>
          </div>
          <div className="bg-primary text-primary-foreground rounded-xl p-6 relative scale-105">
            <span className="absolute -top-3 left-6 bg-amber-500 text-amber-950 text-xs font-bold px-3 py-1 rounded-full">
              MOST POPULAR
            </span>
            <h3 className="font-semibold mb-1">Creator</h3>
            <div className="text-3xl font-bold mb-4">$29<span className="text-base font-normal opacity-70">/mo</span></div>
            <ul className="space-y-2 text-sm opacity-90">
              <li className="flex items-center gap-2"><span className="text-amber-300">•</span> Unlimited alerts</li>
              <li className="flex items-center gap-2"><span className="text-amber-300">•</span> Email + SMS</li>
              <li className="flex items-center gap-2"><span className="text-amber-300">•</span> Unlimited saves</li>
              <li className="flex items-center gap-2"><span className="text-amber-300">•</span> Analytics dashboard</li>
            </ul>
          </div>
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="font-semibold mb-1">Agency</h3>
            <div className="text-3xl font-bold mb-4">$199<span className="text-base font-normal text-muted-foreground">/mo</span></div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><span className="text-primary">•</span> 5 client accounts</li>
              <li className="flex items-center gap-2"><span className="text-primary">•</span> White-label alerts</li>
              <li className="flex items-center gap-2"><span className="text-primary">•</span> Priority support</li>
            </ul>
          </div>
        </div>
        <div className="flex justify-center gap-12">
          <div className="text-center">
            <div className="text-3xl font-mono font-bold text-primary">90:1</div>
            <div className="text-sm text-muted-foreground">LTV:CAC ratio</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-mono font-bold text-primary">&lt;1 mo</div>
            <div className="text-sm text-muted-foreground">Payback period</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-mono font-bold text-primary">$720K</div>
            <div className="text-sm text-muted-foreground">Year 1 ARR target</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function CompetitionSlide() {
  return (
    <div className="h-full flex items-center justify-center p-8">
      <div className="max-w-5xl w-full">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-10 h-10 rounded-full bg-pink-300/20 flex items-center justify-center">
            <Target className="w-5 h-5 text-pink-300" />
          </span>
          <span className="text-sm uppercase tracking-widest text-pink-300/70">Competition</span>
        </div>
        <h2 className="text-4xl font-bold text-white mb-12">
          Unique Velocity Angle — No Direct Competitors
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/20">
                <th className="text-left p-4 text-white/60 font-medium">Feature</th>
                <th className="text-center p-4 text-white/60 font-medium">Manual Scrolling</th>
                <th className="text-center p-4 text-white/60 font-medium">TikTok Trends Tab</th>
                <th className="text-center p-4 text-white/60 font-medium">Generic Analytics</th>
                <th className="text-center p-4 text-pink-300 font-bold">TrendCatch</th>
              </tr>
            </thead>
            <tbody className="text-white">
              <tr className="border-b border-white/10">
                <td className="p-4">Velocity tracking</td>
                <td className="text-center p-4">❌</td>
                <td className="text-center p-4">❌</td>
                <td className="text-center p-4">⚠️</td>
                <td className="text-center p-4 text-pink-300 font-bold">✅</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="p-4">Real-time alerts</td>
                <td className="text-center p-4">❌</td>
                <td className="text-center p-4">❌</td>
                <td className="text-center p-4">❌</td>
                <td className="text-center p-4 text-pink-300 font-bold">✅</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="p-4">Micro-influencer focus</td>
                <td className="text-center p-4">❌</td>
                <td className="text-center p-4">❌</td>
                <td className="text-center p-4">❌</td>
                <td className="text-center p-4 text-pink-300 font-bold">✅</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="p-4">Early warning (24-48h)</td>
                <td className="text-center p-4">❌</td>
                <td className="text-center p-4">❌</td>
                <td className="text-center p-4">❌</td>
                <td className="text-center p-4 text-pink-300 font-bold">✅</td>
              </tr>
              <tr>
                <td className="p-4 font-bold">Time investment</td>
                <td className="text-center p-4">2+ hrs/day</td>
                <td className="text-center p-4">30 min/day</td>
                <td className="text-center p-4">1 hr/day</td>
                <td className="text-center p-4 text-pink-300 font-bold">5 min/week</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function GTMSlide() {
  return (
    <div className="h-full flex items-center justify-center p-8">
      <div className="max-w-5xl w-full">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Rocket className="w-5 h-5 text-primary" />
          </span>
          <span className="text-sm uppercase tracking-widest text-muted-foreground">Go-to-Market</span>
        </div>
        <h2 className="text-4xl font-bold text-foreground mb-12">
          Launch in Creator Communities → Virality via Dogfooding
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-primary text-primary-foreground rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4">Phase 1: Beta (Weeks 1-2)</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-pink-300">→</span>
                <span>100 creators free beta via Discord/Reddit</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-300">→</span>
                <span>Weekly trend alerts + testimonials</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-300">→</span>
                <span>Track viral videos created using alerts</span>
              </li>
            </ul>
          </div>
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4">Phase 2: Launch (Months 1-2)</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary">→</span>
                <span>Product Hunt launch with creator testimonials</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">→</span>
                <span>Reddit (r/TikTokCreators, r/NewTubers)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">→</span>
                <span>YouTube creator education channels</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="bg-muted/50 rounded-xl p-8">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <span className="text-2xl">🎯</span>
            Dogfooding Strategy
          </h3>
          <p className="text-muted-foreground">
            Use TrendCatch to promote TrendCatch. Create TikToks using the trending sounds we alert on. 
            Show real velocity data. Demonstrate the product working in real-time. The app IS the marketing.
          </p>
        </div>
      </div>
    </div>
  )
}

function WhyNowSlide() {
  return (
    <div className="h-full flex items-center justify-center p-8">
      <div className="max-w-5xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-12">
            Why Now?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur rounded-xl p-8 border border-white/20">
              <div className="text-5xl mb-4">📱</div>
              <h3 className="text-2xl font-bold text-white mb-3">TikTok Dominance</h3>
              <p className="text-white/70">
                1.7B users. 67% of creators say it's their primary platform. Trends die faster than ever.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-8 border border-white/20">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-2xl font-bold text-white mb-3">Speed Premium</h3>
              <p className="text-white/70">
                Trend lifecycle: 48-72h. Being first = 10x engagement. No tools track velocity yet.
              </p>
            </div>
            <div className="bg-pink-300 text-purple-900 rounded-xl p-8 border-4 border-pink-200">
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="text-2xl font-bold mb-3">Creator Economy Boom</h3>
              <p className="font-medium">
                $15B market. 2M full-time creators. All need edge. This is it.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function TeamSlide() {
  return (
    <div className="h-full flex items-center justify-center p-8">
      <div className="max-w-5xl w-full">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Users className="w-5 h-5 text-primary" />
          </span>
          <span className="text-sm uppercase tracking-widest text-muted-foreground">Team & Ask</span>
        </div>
        <h2 className="text-4xl font-bold text-foreground mb-12">
          Built by Former Creator Who Knows the Pain
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-card border border-border rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-4">Founder</h3>
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
                👨‍💻
              </div>
              <div>
                <div className="font-bold text-lg">Ash Hatef</div>
                <div className="text-sm text-muted-foreground">Former content creator, video background</div>
              </div>
            </div>
            <p className="text-muted-foreground">
              Spent 2+ hours daily scrolling for trends. Always late. Built TrendCatch to solve own pain. 
              Technical background: 10+ MVPs shipped in 6 weeks via AI-agent team.
            </p>
          </div>
          <div className="bg-primary text-primary-foreground rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-6">The Ask</h3>
            <div className="space-y-4">
              <div>
                <div className="text-sm uppercase tracking-wide opacity-80">Seeking</div>
                <div className="text-3xl font-bold">$250K</div>
              </div>
              <div className="h-px bg-white/20"></div>
              <div className="text-sm space-y-2 opacity-90">
                <div className="flex justify-between">
                  <span>Engineering (API optimization)</span>
                  <span>40%</span>
                </div>
                <div className="flex justify-between">
                  <span>Marketing (creator partnerships)</span>
                  <span>35%</span>
                </div>
                <div className="flex justify-between">
                  <span>Operations (scaling infra)</span>
                  <span>15%</span>
                </div>
                <div className="flex justify-between">
                  <span>Runway (12 months)</span>
                  <span>10%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function TractionSlide() {
  return (
    <div className="h-full flex items-center justify-center p-8">
      <div className="max-w-5xl w-full">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-10 h-10 rounded-full bg-pink-300/20 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-pink-300" />
          </span>
          <span className="text-sm uppercase tracking-widest text-pink-300/70">Traction</span>
        </div>
        <h2 className="text-4xl font-bold text-white mb-12">
          Live Product + Real TikTok API Integration
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20">
            <div className="text-4xl font-bold text-pink-300 mb-2">✅</div>
            <h3 className="font-semibold text-white mb-2">Product Live</h3>
            <p className="text-sm text-white/70">trendcatch.ashketing.com deployed with working TikTok Creative Center API</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20">
            <div className="text-4xl font-bold text-pink-300 mb-2">⚡</div>
            <h3 className="font-semibold text-white mb-2">Real Data</h3>
            <p className="text-sm text-white/70">Hourly sound monitoring showing actual velocity (9,900% growth tracked)</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20">
            <div className="text-4xl font-bold text-pink-300 mb-2">🎯</div>
            <h3 className="font-semibold text-white mb-2">Ready to Scale</h3>
            <p className="text-sm text-white/70">Alert system functional. Awaiting beta launch approval.</p>
          </div>
        </div>
        <div className="bg-pink-300 text-purple-900 rounded-xl p-8">
          <h3 className="text-xl font-bold mb-4">Next 90 Days</h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-purple-900 text-pink-300 flex items-center justify-center font-bold text-sm">1</span>
              <span className="font-medium">Launch beta with 100 creators via Discord/Reddit</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-purple-900 text-pink-300 flex items-center justify-center font-bold text-sm">2</span>
              <span className="font-medium">Collect testimonials + track viral videos created using alerts</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-purple-900 text-pink-300 flex items-center justify-center font-bold text-sm">3</span>
              <span className="font-medium">Product Hunt launch → 200 paying creators target</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

function VisionSlide() {
  return (
    <div className="h-full flex items-center justify-center p-8">
      <div className="max-w-5xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-6xl md:text-7xl font-bold text-white mb-8">
            The Vision
          </h2>
          <p className="text-2xl md:text-3xl text-white/80 mb-12 max-w-3xl mx-auto">
            Be the Bloomberg Terminal of Creator Trend Intelligence
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 text-left">
              <h3 className="text-2xl font-bold text-white mb-4">Year 1-2</h3>
              <ul className="space-y-3 text-white/80">
                <li>→ TikTok velocity tracking perfected</li>
                <li>→ 2,000+ paying creators</li>
                <li>→ Agency tier with white-label</li>
                <li>→ $720K ARR</li>
              </ul>
            </div>
            <div className="bg-pink-300 text-purple-900 rounded-2xl p-8 border-4 border-pink-200 text-left">
              <h3 className="text-2xl font-bold mb-4">Year 3-5</h3>
              <ul className="space-y-3 font-medium">
                <li>→ Multi-platform (Instagram, YouTube Shorts)</li>
                <li>→ AI content suggestions per trend</li>
                <li>→ 50K+ creators, 1K+ agencies</li>
                <li>→ $10M+ ARR → Acquisition target</li>
              </ul>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-white/60 font-mono"
          >
            trendcatch.ashketing.com
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default function PitchDeck() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setCurrent(c => Math.min(c + 1, slides.length - 1))
      if (e.key === 'ArrowLeft') setCurrent(c => Math.max(c - 1, 0))
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  return (
    <div className="h-screen w-screen bg-background overflow-hidden relative">
      {/* Navigation Arrows */}
      <button
        onClick={() => setCurrent(c => Math.max(c - 1, 0))}
        disabled={current === 0}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-card/80 backdrop-blur border border-border shadow-lg hover:bg-card disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        <ChevronLeft className="w-6 h-6 text-primary" />
      </button>
      <button
        onClick={() => setCurrent(c => Math.min(c + 1, slides.length - 1))}
        disabled={current === slides.length - 1}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-card/80 backdrop-blur border border-border shadow-lg hover:bg-card disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        <ChevronRight className="w-6 h-6 text-primary" />
      </button>

      {/* Progress Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all ${
              i === current ? 'w-8 bg-accent' : 'w-2 bg-muted hover:bg-muted-foreground/30'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute top-6 right-8 z-50 font-mono text-sm text-muted-foreground">
        {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
      </div>

      {/* Slide Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="h-full w-full"
        >
          <div className={`h-full w-full ${slides[current].bg}`}>
            {slides[current].component}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
