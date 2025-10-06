import LiveBitcoinPrice from '@/components/bitcoin/LiveBitcoinPrice';
import CoinTickerBar from '@/components/bitcoin/CoinTickerBar';
import BitcoinStats from '@/components/bitcoin/BitcoinStats';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Bar: Header + Ticker */}
      <div className="sticky top-0 z-10 border-b border-cyan-500/20">
        <div className="flex items-center gap-6 py-3 pl-20 pr-8">
          {/* Brand */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <h1 className="text-sm font-bold text-cyan-300 whitespace-nowrap">
              TheCrypto_B
            </h1>
          </div>

          {/* Ticker - Flex grow to take remaining space */}
          <div className="flex-1 overflow-hidden">
            <CoinTickerBar />
          </div>
        </div>
      </div>

      {/* Hero Section - Centered */}
      <div className="flex-1 flex flex-col justify-center items-center gap-32">
        <div className="w-full max-w-7xl mx-auto px-8 py-12">
          {/* Live Bitcoin Tracker */}
          <LiveBitcoinPrice />
        </div>

        {/* BTC Stats */}
        <div className="w-full flex justify-center">
          <div className="max-w-5xl px-8">
            <BitcoinStats />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8">
        <div className="container mx-auto px-4 text-center text-slate-500">
          <p>© 2025 TheCrypto_B. Built with ❤️ for the crypto community.</p>
          <p className="text-sm mt-2">100% Free. No Paywalls. Just Passion.</p>
        </div>
      </footer>
    </div>
  );
}
