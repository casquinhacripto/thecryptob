import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thecryptob.com';

export const metadata: Metadata = {
  title: 'Live Bitcoin Price Tracker | TheCrypto_B',
  description: 'Real-time Bitcoin price tracking widget powered by Binance WebSocket. Watch BTC price updates live with 24h stats.',
  openGraph: {
    title: 'Live Bitcoin Price Tracker',
    description: 'Real-time Bitcoin price tracking - Always updated, always free',
    images: [`${siteUrl}/logo.png`],
    url: `${siteUrl}/widget/btc`,
  },
  twitter: {
    card: 'player',
    title: 'Live Bitcoin Price Tracker | TheCrypto_B',
    description: 'Real-time Bitcoin price tracking widget. Watch BTC price updates live!',
    images: [`${siteUrl}/logo.png`],
    site: '@TheCrypto_B',
    creator: '@TheCrypto_B',
  },
  other: {
    'twitter:player': `${siteUrl}/widget/btc`,
    'twitter:player:width': '800',
    'twitter:player:height': '500',
    'twitter:player:stream': `${siteUrl}/widget/btc`,
  },
};

export default function WidgetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
