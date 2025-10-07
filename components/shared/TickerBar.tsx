'use client';

import CoinTickerBar from '@/components/bitcoin/CoinTickerBar';

export default function TickerBar() {
  return (
    <div className="sticky top-0 z-10 border-b border-white/10 backdrop-blur-md bg-black/60">
      <div className="flex items-center gap-6 py-3 pl-20 pr-8">
        {/* Brand */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <h1 className="text-sm font-bold text-cyan-300 whitespace-nowrap">
            TheCrypto_B
          </h1>
          {/* Live Indicator */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="w-2 h-2 bg-[#00FFA5] rounded-full animate-pulse shadow-[0_0_6px_#00FFA5]"></div>
              <div className="absolute inset-0 w-2 h-2 bg-[#00FFA5] rounded-full blur-sm opacity-75"></div>
            </div>
            <span className="text-xs font-semibold text-[#00FFA5] tracking-wider animate-pulse drop-shadow-[0_0_6px_#00FFA5]">LIVE</span>
          </div>
        </div>

        {/* Ticker - Flex grow to take remaining space */}
        <div className="flex-1 overflow-hidden">
          <CoinTickerBar />
        </div>
      </div>
    </div>
  );
}
