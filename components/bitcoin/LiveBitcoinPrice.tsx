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
      setTimeout(() => setPriceFlash(false), 500);
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
        {/* Bitcoin Logo with Enhanced Glow */}
        <div className="relative group">
          {/* Pulsing glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full blur-3xl opacity-40 animate-pulse group-hover:opacity-60 transition-opacity"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full blur-2xl opacity-30 animate-[pulse_2s_ease-in-out_infinite]"></div>

          {/* Logo */}
          <div className="relative w-36 h-36 md:w-48 md:h-48 bg-gradient-to-br from-orange-500 via-yellow-500 to-yellow-600 rounded-full flex items-center justify-center shadow-2xl shadow-orange-500/50 transform group-hover:scale-105 transition-transform duration-300">
            <span className="text-white text-7xl md:text-8xl font-bold drop-shadow-2xl">₿</span>
          </div>
        </div>

        {/* Massive Price Display with Flash Effect */}
        <div className={`font-mono text-white leading-none text-center md:text-left transition-all duration-300 ${priceFlash ? 'scale-105' : 'scale-100'}`}>
          <div className="flex items-start">
            <span className="text-6xl md:text-9xl font-extrabold mr-2">$</span>
            <div className={`${priceFlash ? 'text-cyan-400' : ''} transition-colors duration-300`}>
              <span className="text-7xl md:text-[12rem] tracking-tight font-extrabold">{whole}</span>
              <span className="text-5xl md:text-8xl opacity-90 animate-pulse ml-1 font-extrabold">.{cents}</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
