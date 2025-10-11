'use client';

import { useBitcoinPrice } from '@/hooks/useBitcoinPrice';
import { TrendingUp, TrendingDown, BarChart3, DollarSign } from 'lucide-react';

export default function BitcoinStats() {
  const { data } = useBitcoinPrice();

  if (!data) return null;

  const isPositive = data.priceChangePercent24h > 0;

  return (
    <div className="backdrop-blur-md bg-[rgba(12,12,15,0.75)] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-white/5 p-6 md:p-8 hover:border-cyan-500/20 transition-all duration-500 group">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {/* 24h Low/High */}
        <div className="text-center relative group/card p-3 rounded-lg transition-all duration-300 hover:bg-blue-500/5 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]">
          <div className="text-xs md:text-sm text-gray-400 mb-2 font-normal flex items-center justify-center gap-1">
            <BarChart3 className="w-3 h-3 md:w-4 md:h-4 opacity-50" />
            24h Low/High
          </div>
          <div className="text-lg md:text-xl font-medium text-blue-300 font-mono transition-all duration-300 group-hover/card:text-blue-200 group-hover/card:scale-105">
            ${(data.low24h / 1000).toFixed(2)}K / ${(data.high24h / 1000).toFixed(2)}K
          </div>
          {/* Vertical Divider */}
          <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-12 w-[1px] bg-gradient-to-b from-transparent via-gray-700/50 to-transparent"></div>
        </div>

        {/* Volume (24h) */}
        <div className="text-center relative group/card p-3 rounded-lg transition-all duration-300 hover:bg-yellow-500/5 hover:shadow-[0_0_20px_rgba(234,179,8,0.15)]">
          <div className="text-xs md:text-sm text-gray-400 mb-2 font-normal flex items-center justify-center gap-1">
            <DollarSign className="w-3 h-3 md:w-4 md:h-4 opacity-50" />
            Volume (24h)
          </div>
          <div className="text-lg md:text-xl font-medium text-yellow-300 font-mono transition-all duration-300 group-hover/card:text-yellow-200 group-hover/card:scale-105">
            ${(data.volume24h / 1e9).toFixed(2)}B
          </div>
          {/* Vertical Divider */}
          <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-12 w-[1px] bg-gradient-to-b from-transparent via-gray-700/50 to-transparent"></div>
        </div>

        {/* Market Cap */}
        <div className="text-center relative group/card p-3 rounded-lg transition-all duration-300 hover:bg-purple-500/5 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]">
          <div className="text-xs md:text-sm text-gray-400 mb-2 font-normal">Mkt. Cap.</div>
          <div className="text-lg md:text-xl font-medium text-purple-300 font-mono transition-all duration-300 group-hover/card:text-purple-200 group-hover/card:scale-105">
            $2.5T
          </div>
          {/* Vertical Divider */}
          <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-12 w-[1px] bg-gradient-to-b from-transparent via-gray-700/50 to-transparent"></div>
        </div>

        {/* 24h Change */}
        <div className={`text-center group/card p-3 rounded-lg transition-all duration-300 ${isPositive ? 'hover:bg-green-500/5 hover:shadow-[0_0_20px_rgba(34,197,94,0.15)]' : 'hover:bg-red-500/5 hover:shadow-[0_0_20px_rgba(239,68,68,0.15)]'}`}>
          <div className="text-xs md:text-sm text-gray-400 mb-2 font-normal">24h Change</div>
          <div className={`text-lg md:text-xl font-medium font-mono flex items-center justify-center gap-1 transition-all duration-300 group-hover/card:scale-105 ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
            {isPositive ? <TrendingUp className="w-5 h-5 animate-bounce" /> : <TrendingDown className="w-5 h-5 animate-bounce" />}
            {isPositive ? '+' : ''}{Math.abs(data.priceChangePercent24h).toFixed(2)}%
          </div>
        </div>
      </div>
    </div>
  );
}
