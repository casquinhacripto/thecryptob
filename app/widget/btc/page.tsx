'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

interface BitcoinData {
  symbol: string;
  price: number;
  change24h: number;
  high24h: number;
  low24h: number;
}

function BTCWidgetContent() {
  const searchParams = useSearchParams();
  const size = searchParams.get('size') || 'large';
  const [data, setData] = useState<BitcoinData | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [animatedCents, setAnimatedCents] = useState(0);

  useEffect(() => {
    const ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@ticker');
    ws.onopen = () => setIsConnected(true);
    ws.onmessage = (event) => {
      const ticker = JSON.parse(event.data);
      setData({
        symbol: 'BTC/USDT',
        price: parseFloat(ticker.c),
        change24h: parseFloat(ticker.P),
        high24h: parseFloat(ticker.h),
        low24h: parseFloat(ticker.l),
      });
    };
    ws.onerror = () => setIsConnected(false);
    ws.onclose = () => setIsConnected(false);
    return () => ws.close();
  }, []);

  useEffect(() => {
    if (!data) return;
    const baseCents = (data.price % 1) * 100;
    const interval = setInterval(() => {
      const flicker = (Math.random() - 0.5) * 2;
      setAnimatedCents(Math.max(0, Math.min(99, baseCents + flicker)));
    }, 300);
    return () => clearInterval(interval);
  }, [data?.price]);

  if (!data) {
    return (
      <div className="w-full h-screen bg-[radial-gradient(circle_at_center,#0E0E10_40%,#060606_100%)] flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-3"></div>
            <div className="absolute inset-0 rounded-full blur-xl bg-cyan-500/30 animate-pulse"></div>
          </div>
          <p className="text-slate-400 text-sm">Connecting...</p>
        </div>
      </div>
    );
  }

  const whole = Math.floor(data.price).toLocaleString('en-US');
  const cents = Math.floor(animatedCents).toString().padStart(2, '0');
  const isPositive = data.change24h >= 0;

  const sizeConfig = {
    small: { container: 'p-4', logoSize: 'w-12 h-12', logoText: 'text-2xl', dollarSign: 'text-lg', wholeNumber: 'text-3xl', decimals: 'text-xl', statsGap: 'gap-3', statsText: 'text-[10px]', statsValue: 'text-xs', liveIndicator: 'w-1.5 h-1.5', liveText: 'text-[10px]', watermarkPowered: 'text-[8px]', watermarkBrand: 'text-[10px]', layout: 'flex-col gap-3' },
    medium: { container: 'p-6', logoSize: 'w-16 h-16', logoText: 'text-4xl', dollarSign: 'text-2xl', wholeNumber: 'text-5xl', decimals: 'text-3xl', statsGap: 'gap-4', statsText: 'text-xs', statsValue: 'text-sm', liveIndicator: 'w-2 h-2', liveText: 'text-xs', watermarkPowered: 'text-[9px]', watermarkBrand: 'text-xs', layout: 'flex-col gap-4' },
    large: { container: 'p-8', logoSize: 'w-24 h-24', logoText: 'text-6xl', dollarSign: 'text-3xl', wholeNumber: 'text-7xl', decimals: 'text-4xl', statsGap: 'gap-6', statsText: 'text-sm', statsValue: 'text-base', liveIndicator: 'w-2.5 h-2.5', liveText: 'text-sm', watermarkPowered: 'text-[10px]', watermarkBrand: 'text-sm', layout: 'flex-col gap-6' },
  };

  const config = sizeConfig[size as keyof typeof sizeConfig] || sizeConfig.large;

  return (
    <div className="w-full h-screen bg-[radial-gradient(circle_at_center,#0E0E10_40%,#060606_100%)] flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,212,242,0.08)_0%,transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(255,165,0,0.04)_0%,transparent_60%)]"></div>
      
      <div className={`relative z-10 flex ${config.layout} items-center justify-center ${config.container}`}>
        <div className="flex items-center justify-center gap-4">
          <div className="relative group flex-shrink-0">
            <div className="absolute inset-0 -m-14 bg-[radial-gradient(circle_at_center,rgba(255,165,0,0.5)_0%,rgba(255,200,0,0.3)_25%,transparent_70%)] rounded-full blur-[80px] opacity-70 animate-[pulse_6s_ease-in-out_infinite]"></div>
            <div className="absolute inset-0 -m-10 bg-[radial-gradient(circle_at_center,rgba(255,200,0,0.4)_0%,rgba(255,165,0,0.25)_40%,transparent_65%)] rounded-full blur-[50px] opacity-60 animate-[pulse_4s_ease-in-out_infinite_1s]"></div>
            <div className={`relative ${config.logoSize} bg-gradient-to-br from-orange-500 via-yellow-500 to-yellow-600 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(255,165,0,0.6)] animate-[float_3s_ease-in-out_infinite]`}>
              <span className={`text-white ${config.logoText} font-bold drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]`}>₿</span>
            </div>
          </div>
          <div className="font-mono text-white leading-none">
            <div className="flex items-start">
              <span className={`${config.dollarSign} font-bold opacity-80 mr-1 -translate-y-1`}>$</span>
              <div>
                <span className={`${config.wholeNumber} tracking-tight font-extrabold drop-shadow-[0_0_15px_rgba(0,212,242,0.3)]`}>{whole}</span>
                <span className={`${config.decimals} opacity-70 animate-pulse ml-1 font-bold`}>.{cents}</span>
              </div>
            </div>
          </div>
        </div>
        <div className={`flex items-center ${config.statsGap} ${config.statsText}`}>
          <div className="text-center">
            <div className="text-slate-500 mb-1">24h Change</div>
            <div className={`font-bold ${isPositive ? 'text-green-400' : 'text-red-400'} ${config.statsValue}`}>
              {isPositive ? '▲' : '▼'} {Math.abs(data.change24h).toFixed(2)}%
            </div>
          </div>
          <div className="h-8 w-px bg-slate-700/50"></div>
          <div className="text-center">
            <div className="text-slate-500 mb-1">Low / High</div>
            <div className={`text-slate-300 font-semibold ${config.statsValue}`}>
              ${(data.low24h / 1000).toFixed(1)}K / ${(data.high24h / 1000).toFixed(1)}K
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 justify-center">
          <div className={`${config.liveIndicator} rounded-full ${isConnected ? 'bg-green-400 animate-pulse shadow-[0_0_10px_rgba(74,222,128,0.6)]' : 'bg-red-400'}`}></div>
          <span className={`${config.liveText} text-slate-400 font-semibold uppercase tracking-wider`}>{isConnected ? 'LIVE' : 'OFFLINE'}</span>
        </div>
      </div>
      
      <a href="https://thecryptob.com" target="_blank" rel="noopener noreferrer" className="absolute bottom-4 right-5 text-right hover:scale-105 transition-transform duration-300 group/link cursor-pointer">
        <div className={`${config.watermarkPowered} text-slate-600 font-medium`}>Powered by</div>
        <div className={`${config.watermarkBrand} text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-bold tracking-wide group-hover/link:from-cyan-300 group-hover/link:to-blue-300 transition-all duration-300`}>TheCrypto_B</div>
      </a>
    </div>
  );
}

export default function BTCWidget() {
  return (
    <Suspense fallback={
      <div className="w-full h-screen bg-[radial-gradient(circle_at_center,#0E0E10_40%,#060606_100%)] flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-3"></div>
            <div className="absolute inset-0 rounded-full blur-xl bg-cyan-500/30 animate-pulse"></div>
          </div>
          <p className="text-slate-400 text-sm">Loading widget...</p>
        </div>
      </div>
    }>
      <BTCWidgetContent />
    </Suspense>
  );
}
