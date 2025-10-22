import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable standalone output for Docker/Cloud Run deployment
  output: 'standalone',

  // Explicitly expose NEXT_PUBLIC_ environment variables for client-side access
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_BTC_WALLET: process.env.NEXT_PUBLIC_BTC_WALLET,
    NEXT_PUBLIC_ETH_WALLET: process.env.NEXT_PUBLIC_ETH_WALLET,
    NEXT_PUBLIC_BASE_WALLET: process.env.NEXT_PUBLIC_BASE_WALLET,
    NEXT_PUBLIC_SOL_WALLET: process.env.NEXT_PUBLIC_SOL_WALLET,
    NEXT_PUBLIC_SUI_WALLET: process.env.NEXT_PUBLIC_SUI_WALLET,
    NEXT_PUBLIC_METAMASK_WALLET: process.env.NEXT_PUBLIC_METAMASK_WALLET,
    NEXT_PUBLIC_BMC_URL: process.env.NEXT_PUBLIC_BMC_URL,
    NEXT_PUBLIC_TWITTER_URL: process.env.NEXT_PUBLIC_TWITTER_URL,
    NEXT_PUBLIC_YOUTUBE_URL: process.env.NEXT_PUBLIC_YOUTUBE_URL,
    NEXT_PUBLIC_CMC_URL: process.env.NEXT_PUBLIC_CMC_URL,
    NEXT_PUBLIC_BINANCE_WS_URL: process.env.NEXT_PUBLIC_BINANCE_WS_URL,
    NEXT_PUBLIC_COINGECKO_API_URL: process.env.NEXT_PUBLIC_COINGECKO_API_URL,
    NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },

  // Image optimization for production
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  // Security headers
  async headers() {
    return [
      {
        // Allow widget pages to be embedded anywhere (no X-Frame-Options)
        source: '/widget/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
        ],
      },
      {
        // Protect all other pages with SAMEORIGIN (excluding /widget)
        source: '/((?!widget).*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
        ],
      },
    ]
  },
};

export default nextConfig;
