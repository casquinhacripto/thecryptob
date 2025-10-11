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
    <div className="bg-slate-900/60 backdrop-blur-xl border border-cyan-500/20 rounded-xl py-3 px-4 overflow-hidden hover:border-cyan-500/40 transition-all duration-300 shadow-[0_4px_20px_rgba(6,182,212,0.1)] hover:shadow-[0_4px_30px_rgba(6,182,212,0.2)]">
      <div className="flex items-center gap-8 animate-[scroll_120s_linear_infinite] hover:[animation-play-state:paused]">
        {/* Duplicate coins for seamless loop */}
        {[...coins, ...coins].map((coin, index) => {
          const isPositive = coin.change24h > 0;

          return (
            <div
              key={`${coin.id}-${index}`}
              className="flex items-center gap-3 min-w-fit whitespace-nowrap group cursor-pointer hover:scale-110 transition-all duration-300 hover:bg-white/5 px-3 py-2 rounded-lg"
              title={`Click to view ${coin.symbol} details`}
            >
              {/* Coin Symbol with glow effect */}
              <span className="text-cyan-300 font-bold text-sm group-hover:text-cyan-200 transition-colors duration-300 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]">
                {coin.symbol}
              </span>

              {/* Sparkline Chart */}
              {coin.sparkline && coin.sparkline.length > 0 && (
                <div className="opacity-70 group-hover:opacity-100 transition-opacity duration-300 group-hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]">
                  <Sparkline
                    data={coin.sparkline}
                    width={60}
                    height={20}
                    isPositive={isPositive}
                  />
                </div>
              )}

              {/* Price */}
              <span className="text-white font-mono font-semibold text-sm group-hover:text-cyan-100 transition-colors duration-300">
                ${coin.price.toLocaleString('en-US', {
                  minimumFractionDigits: coin.price < 1 ? 4 : 2,
                  maximumFractionDigits: coin.price < 1 ? 4 : 2,
                })}
              </span>

              {/* Change with Icon - Enhanced with glow */}
              <div
                className={`flex items-center gap-1 font-mono font-semibold text-sm transition-all duration-300 ${
                  isPositive
                    ? 'text-emerald-400 group-hover:text-emerald-300 group-hover:drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]'
                    : 'text-red-400 group-hover:text-red-300 group-hover:drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]'
                }`}
              >
                {isPositive ? (
                  <TrendingUp className="w-4 h-4 group-hover:animate-pulse" />
                ) : (
                  <TrendingDown className="w-4 h-4 group-hover:animate-pulse" />
                )}
                <span>
                  {isPositive ? '+' : ''}
                  {coin.change24h.toFixed(2)}%
                </span>
              </div>

              {/* Subtle hover indicator */}
              <div className="hidden group-hover:block absolute -bottom-1 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
