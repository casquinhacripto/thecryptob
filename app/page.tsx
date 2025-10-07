import LiveBitcoinPrice from '@/components/bitcoin/LiveBitcoinPrice';
import BitcoinStats from '@/components/bitcoin/BitcoinStats';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center relative min-h-[calc(100vh-200px)] pt-24">
      {/* Dynamic Radial Background Gradient */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_center,#0E0E10_40%,#060606_100%)]"></div>
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(0,212,242,0.05)_0%,transparent_50%)]"></div>

      {/* Hero Section - Centered */}
      <div className="flex flex-col items-center gap-16 w-full max-w-7xl px-8">
        {/* Live Bitcoin Tracker */}
        <div className="w-full flex justify-center">
          <LiveBitcoinPrice />
        </div>

        {/* BTC Stats */}
        <div className="w-full flex justify-center">
          <BitcoinStats />
        </div>
      </div>
    </div>
  );
}
