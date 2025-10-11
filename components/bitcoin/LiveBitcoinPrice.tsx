'use client';

import { useBitcoinPrice } from '@/hooks/useBitcoinPrice';
import { useEffect, useState, useRef } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function LiveBitcoinPrice() {
  const { data, isConnected } = useBitcoinPrice();
  const [animatedCents, setAnimatedCents] = useState(0);
  const [priceFlash, setPriceFlash] = useState(false);
  const [displayPrice, setDisplayPrice] = useState(0);
  const previousPriceRef = useRef(0);
  const [priceDirection, setPriceDirection] = useState<'up' | 'down' | null>(null);

  // Animate cents for realistic "live" flickering effect
  useEffect(() => {
    if (!data) return;

    const baseCents = (data.price % 1) * 100;

    const interval = setInterval(() => {
      // Randomly flicker cents within ±1 cent for realism
      const flicker = (Math.random() - 0.5) * 2;
      setAnimatedCents(Math.max(0, Math.min(99, baseCents + flicker)));
    }, 300);

    return () => clearInterval(interval);
  }, [data?.price]);

  // Price flash animation when price changes
  useEffect(() => {
    if (!data) return;

    if (previousPriceRef.current !== 0 && previousPriceRef.current !== data.price) {
      setPriceFlash(true);
      // Determine direction
      if (data.price > previousPriceRef.current) {
        setPriceDirection('up');
      } else {
        setPriceDirection('down');
      }
      setTimeout(() => {
        setPriceFlash(false);
        setPriceDirection(null);
      }, 800);
    }

    previousPriceRef.current = data.price;
  }, [data?.price]);

  // Count-up animation for price
  useEffect(() => {
    if (!data) return;

    const targetPrice = Math.floor(data.price);
    const duration = 1000;
    const steps = 30;
    const increment = (targetPrice - displayPrice) / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep >= steps) {
        setDisplayPrice(targetPrice);
        clearInterval(interval);
      } else {
        setDisplayPrice(prev => prev + increment);
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, [data?.price]);

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-500 mx-auto mb-4"></div>
            <div className="absolute inset-0 rounded-full blur-xl bg-cyan-500/30 animate-pulse"></div>
          </div>
          <p className="text-slate-400 text-lg">Connecting to live Bitcoin data...</p>
        </div>
      </div>
    );
  }

  const whole = Math.floor(displayPrice || data.price).toLocaleString('en-US');
  const cents = Math.floor(animatedCents).toString().padStart(2, '0');
  const isPositive = data.priceChangePercent24h > 0;

  return (
    <div className="btc-tracker-hero">
      {/* Hero: Bitcoin Logo + Massive Price */}
      <div className="flex items-center justify-center gap-12 mb-12 flex-wrap">
        {/* Bitcoin Logo with Premium Soft-Edge Glow + Floating Animation */}
        <div className="relative group">
          {/* Enhanced Multi-layer Radial Glow - Bitcoin Orange/Gold Theme */}
          <div className="absolute inset-0 -m-20 bg-[radial-gradient(circle_at_center,rgba(255,165,0,0.5)_0%,rgba(255,200,0,0.3)_25%,rgba(255,127,48,0.2)_50%,transparent_70%)] rounded-full blur-[100px] opacity-70 animate-[pulse_6s_ease-in-out_infinite] group-hover:opacity-90 transition-opacity duration-700"></div>
          <div className="absolute inset-0 -m-16 bg-[radial-gradient(circle_at_center,rgba(255,200,0,0.4)_0%,rgba(255,165,0,0.25)_40%,transparent_65%)] rounded-full blur-[80px] opacity-60 animate-[pulse_4s_ease-in-out_infinite_1s]"></div>
          <div className="absolute inset-0 -m-12 bg-[radial-gradient(circle_at_center,rgba(255,165,0,0.35)_0%,rgba(255,127,48,0.2)_50%,transparent_70%)] rounded-full blur-[60px] opacity-70 animate-[pulse_5s_ease-in-out_infinite_2s]"></div>

          {/* Pulsing ring effect with ripple animation */}
          <div className="absolute inset-0 -m-14 rounded-full bg-gradient-to-r from-orange-400/30 via-yellow-400/30 to-orange-400/30 blur-[70px] opacity-50 animate-[pulse_3s_ease-in-out_infinite]"></div>

          {/* Glow ripple effect - expanding ring */}
          <div className="absolute inset-0 -m-20 rounded-full bg-gradient-to-r from-orange-400/20 via-yellow-400/20 to-orange-400/20 blur-[50px] opacity-40 animate-[ping_4s_ease-in-out_infinite]"></div>

          {/* Logo with floating animation */}
          <div className="relative w-36 h-36 md:w-48 md:h-48 bg-gradient-to-br from-orange-500 via-yellow-500 to-yellow-600 rounded-full flex items-center justify-center shadow-[0_0_60px_rgba(255,165,0,0.6),0_0_100px_rgba(255,165,0,0.3)] transform group-hover:scale-110 transition-all duration-500 animate-[float_3s_ease-in-out_infinite]">
            <span className="text-white text-7xl md:text-8xl font-bold drop-shadow-[0_0_20px_rgba(0,0,0,0.5)] group-hover:rotate-12 transition-transform duration-500">₿</span>
          </div>
        </div>

        {/* Enhanced Price Display with Premium Typography + Tooltip */}
        <div
          className={`font-mono text-white leading-none text-center md:text-left transition-all duration-300 ${priceFlash ? 'scale-105' : 'scale-100'} group/price relative cursor-help`}
          title="Live price data powered by Binance WebSocket"
        >
          {/* Tooltip on hover */}
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 opacity-0 group-hover/price:opacity-100 transition-all duration-300 pointer-events-none z-50">
            <div className="bg-slate-900/95 backdrop-blur-xl border border-cyan-500/40 rounded-lg px-4 py-2 shadow-[0_0_30px_rgba(6,182,212,0.3)] whitespace-nowrap">
              <p className="text-xs font-semibold text-cyan-300">Live price data powered by Binance</p>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-slate-900 border-r border-b border-cyan-500/40 rotate-45"></div>
            </div>
          </div>

          <div className="flex items-start">
            {/* Dollar Sign - Smaller and Elevated */}
            <span className={`text-5xl md:text-7xl font-bold opacity-80 mr-2 -translate-y-2 md:-translate-y-4 transition-colors duration-300 ${
              priceDirection === 'up' ? 'text-green-400' : priceDirection === 'down' ? 'text-red-400' : ''
            }`}>$</span>

            <div className={`transition-colors duration-300 ${
              priceDirection === 'up' ? 'text-green-400' : priceDirection === 'down' ? 'text-red-400' : ''
            }`}>
              {/* Whole Number - Bold with Enhanced Shadow/Glow */}
              <span className={`text-7xl md:text-[12rem] tracking-tight font-extrabold transition-all duration-300 ${
                priceDirection === 'up'
                  ? 'drop-shadow-[0_0_30px_rgba(34,197,94,0.5)]'
                  : priceDirection === 'down'
                  ? 'drop-shadow-[0_0_30px_rgba(239,68,68,0.5)]'
                  : 'drop-shadow-[0_0_20px_rgba(0,212,242,0.3)]'
              }`}>
                {whole}
              </span>
              {/* Decimals - Lighter Weight for Hierarchy */}
              <span className="text-5xl md:text-7xl opacity-70 animate-pulse ml-1 md:ml-2 font-bold">
                .{cents}
              </span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
