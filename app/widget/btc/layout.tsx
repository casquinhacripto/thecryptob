import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Live Bitcoin Price Tracker | TheCrypto_B',
  description: 'Real-time Bitcoin price tracking widget powered by Binance WebSocket. Watch BTC price updates live with 24h stats.',
  openGraph: {
    title: 'Live Bitcoin Price Tracker',
    description: 'Real-time Bitcoin price tracking - Always updated, always free',
    images: ['/logo.png'],
  },
  twitter: {
    card: 'player',
    title: 'Live Bitcoin Price Tracker | TheCrypto_B',
    description: 'Real-time Bitcoin price tracking widget. Watch BTC price updates live!',
    images: ['/logo.png'],
    players: {
      playerUrl: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://thecryptob.com'}/widget/btc`,
      streamUrl: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://thecryptob.com'}/widget/btc`,
      width: 800,
      height: 500,
    },
  },
};

export default function WidgetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
