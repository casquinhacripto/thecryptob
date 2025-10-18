import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import MainLayout from "@/components/shared/MainLayout";
import GoogleAnalytics from "@/components/shared/GoogleAnalytics";
import CookieConsent from "@/components/shared/CookieConsent";
import AnalyticsTracker from "@/components/AnalyticsTracker";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TheCrypto_B Hub | Live Bitcoin Tracker & Crypto Tools",
  description: "Your personal crypto hub featuring real-time Bitcoin price tracking, project showcase, and community updates. Built by TheCrypto_B.",
  keywords: ["Bitcoin", "Crypto", "Cryptocurrency", "BTC Price", "Real-time tracker", "Web3", "Blockchain", "TheCrypto_B"],
  authors: [{ name: "TheCrypto_B" }],
  creator: "TheCrypto_B",
  publisher: "TheCrypto_B",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png' },
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' }
    ],
    shortcut: '/favicon.ico',
    apple: '/logo.png',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    title: "TheCrypto_B Hub | Live Bitcoin Tracker & Crypto Tools",
    description: "Your personal crypto hub featuring real-time Bitcoin price tracking, project showcase, and community updates. Built by TheCrypto_B.",
    siteName: "TheCrypto_B Hub",
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'TheCrypto_B Hub Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "TheCrypto_B Hub | Live Bitcoin Tracker & Crypto Tools",
    description: "Your personal crypto hub featuring real-time Bitcoin price tracking, project showcase, and community updates.",
    creator: '@TheCrypto_B',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code-here', // Add your Google Search Console verification code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
        <AnalyticsTracker />
        <MainLayout>{children}</MainLayout>
        <CookieConsent />
      </body>
    </html>
  );
}
