'use client';

import { useEffect } from 'react';

export default function LiveTrackerPage() {
  useEffect(() => {
    // Prevent accidental navigation away
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  return (
    <div className="fixed inset-0 bg-black flex flex-col">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-cyan-500/20 px-6 py-3 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]"></div>
          <h1 className="text-white font-bold text-lg">LIVE Bitcoin Tracker</h1>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-slate-400">Powered by</span>
          <a
            href="https://thecryptob.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-bold hover:from-cyan-300 hover:to-blue-300 transition-all"
          >
            TheCrypto_B
          </a>
        </div>
      </div>

      {/* Full-screen Widget */}
      <div className="flex-1 relative">
        <iframe
          src="https://thecryptob.com/widget/btc"
          className="absolute inset-0 w-full h-full border-0"
          title="Live Bitcoin Price Tracker"
          allow="autoplay"
        />
      </div>

      {/* Bottom Toolbar */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-t border-cyan-500/20 px-6 py-3 flex items-center justify-between text-xs z-10">
        <div className="flex items-center gap-4 text-slate-400">
          <span>📊 Real-time data via Binance WebSocket</span>
          <span>•</span>
          <span>🔄 Updates every second</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => window.location.reload()}
            className="px-3 py-1.5 bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 rounded border border-slate-600/50 hover:border-cyan-500/50 transition-all text-xs font-semibold"
          >
            🔄 Refresh
          </button>
          <a
            href="https://thecryptob.com"
            className="px-3 py-1.5 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 text-cyan-300 rounded border border-cyan-400/40 hover:border-cyan-400/60 transition-all text-xs font-semibold"
          >
            🏠 Home
          </a>
        </div>
      </div>
    </div>
  );
}
