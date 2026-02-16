import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter"
});

const jetbrains = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: "--font-mono"
});

export const metadata: Metadata = {
  title: "TrendCatch - Catch TikTok Trends Before They Peak",
  description: "Get alerted when sounds surge among micro-influencers. Be first, ride the wave.",
  keywords: ["TikTok", "trends", "viral sounds", "content creator", "social media"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrains.variable} font-sans antialiased min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
