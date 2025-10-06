'use client';

import { useMultiCoinTicker } from '@/hooks/useMultiCoinTicker';
import { TrendingUp, TrendingDown } from 'lucide-react';
import Sparkline from './Sparkline';

export default function CoinTickerBar() {
  const { coins, isLoading, error } = useMultiCoinTicker();

  if (isLoading) {
    return (
      <div className="bg-slate-900/60 backdrop-blur-xl border border-cyan-500/20 rounded-xl py-3 px-4">
        <div className="flex items-center gap-6 overflow-x-auto scrollbar-hide">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-2 min-w-[150px] animate-pulse">
              <div className="w-12 h-4 bg-slate-700/50 rounded"></div>
              <div className="w-16 h-4 bg-slate-700/50 rounded"></div>
              <div className="w-14 h-4 bg-slate-700/50 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-slate-900/60 backdrop-blur-xl border border-red-500/20 rounded-xl py-4 px-6">
        <div className="flex items-center justify-center gap-3 text-red-400">
          <span className="text-2xl">⚠️</span>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/60 backdrop-blur-xl border border-cyan-500/20 rounded-xl py-3 px-4 overflow-hidden">
      <div className="flex items-center gap-8 animate-[scroll_120s_linear_infinite]">
        {/* Duplicate coins for seamless loop */}
        {[...coins, ...coins].map((coin, index) => {
          const isPositive = coin.change24h > 0;

          return (
            <div
              key={`${coin.id}-${index}`}
              className="flex items-center gap-3 min-w-fit whitespace-nowrap group cursor-pointer hover:opacity-80 transition-opacity"
            >
              {/* Coin Symbol */}
              <span className="text-cyan-300 font-bold text-sm">
                {coin.symbol}
              </span>

              {/* Sparkline Chart */}
              {coin.sparkline && coin.sparkline.length > 0 && (
                <div className="opacity-70 group-hover:opacity-100 transition-opacity">
                  <Sparkline
                    data={coin.sparkline}
                    width={60}
                    height={20}
                    isPositive={isPositive}
                  />
                </div>
              )}

              {/* Price */}
              <span className="text-white font-mono font-semibold text-sm">
                ${coin.price.toLocaleString('en-US', {
                  minimumFractionDigits: coin.price < 1 ? 4 : 2,
                  maximumFractionDigits: coin.price < 1 ? 4 : 2,
                })}
              </span>

              {/* Change with Icon */}
              <div
                className={`flex items-center gap-1 font-mono font-semibold text-sm ${
                  isPositive ? 'text-emerald-400' : 'text-red-400'
                }`}
              >
                {isPositive ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span>
                  {isPositive ? '+' : ''}
                  {coin.change24h.toFixed(2)}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
