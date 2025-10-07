'use client';

import { useBitcoinPrice } from '@/hooks/useBitcoinPrice';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function BitcoinStats() {
  const { data } = useBitcoinPrice();

  if (!data) return null;

  const isPositive = data.priceChangePercent24h > 0;

  return (
    <div className="backdrop-blur-md bg-[rgba(12,12,15,0.75)] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-white/5 p-6 md:p-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {/* 24h Low/High */}
        <div className="text-center relative">
          <div className="text-xs md:text-sm text-gray-400 mb-2 font-normal">24h Low/High</div>
          <div className="text-lg md:text-xl font-medium text-white font-mono">
            ${(data.low24h / 1000).toFixed(2)}K / ${(data.high24h / 1000).toFixed(2)}K
          </div>
          {/* Vertical Divider */}
          <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-12 w-[1px] bg-gradient-to-b from-transparent via-gray-700/50 to-transparent"></div>
        </div>

        {/* Volume (24h) */}
        <div className="text-center relative">
          <div className="text-xs md:text-sm text-gray-400 mb-2 font-normal">Volume (24h)</div>
          <div className="text-lg md:text-xl font-medium text-white font-mono">
            ${(data.volume24h / 1e9).toFixed(2)}B
          </div>
          {/* Vertical Divider */}
          <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-12 w-[1px] bg-gradient-to-b from-transparent via-gray-700/50 to-transparent"></div>
        </div>

        {/* Market Cap */}
        <div className="text-center relative">
          <div className="text-xs md:text-sm text-gray-400 mb-2 font-normal">Mkt. Cap.</div>
          <div className="text-lg md:text-xl font-medium text-white font-mono">
            $2.5T
          </div>
          {/* Vertical Divider */}
          <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-12 w-[1px] bg-gradient-to-b from-transparent via-gray-700/50 to-transparent"></div>
        </div>

        {/* 24h Change */}
        <div className="text-center">
          <div className="text-xs md:text-sm text-gray-400 mb-2 font-normal">24h Change</div>
          <div className={`text-lg md:text-xl font-medium font-mono flex items-center justify-center gap-1 ${isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
            {isPositive ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
            {isPositive ? '+' : ''}{Math.abs(data.priceChangePercent24h).toFixed(2)}%
          </div>
        </div>
      </div>
    </div>
  );
}
