'use client';

import { useState, useEffect } from 'react';
import { X, Shield, Cookie } from 'lucide-react';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('b_cookie_consent');
    if (!consent) {
      // Show banner after 2 seconds
      setTimeout(() => setShowBanner(true), 2000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('b_cookie_consent', 'accepted');
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem('b_cookie_consent', 'declined');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-[slideInRight_0.5s_ease-out]">
      <div className="w-80 sm:w-96">
        <div className="relative bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl border border-cyan-500/20 rounded-xl shadow-2xl shadow-cyan-500/10 p-4">
          {/* Close button */}
          <button
            onClick={handleDecline}
            className="absolute top-3 right-3 text-white/50 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Content */}
          <div className="space-y-3 pr-6">
            <div className="flex items-center gap-2">
              <Cookie className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <h3 className="text-sm font-bold text-white">Privacy-Focused Analytics</h3>
            </div>

            <p className="text-white/70 text-xs leading-relaxed">
              We use cookies to improve your experience.
              <span className="text-cyan-400 font-semibold"> No personal data collected.</span>
            </p>

            {/* Buttons */}
            <div className="flex gap-2 pt-1">
              <button
                onClick={handleAccept}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-semibold rounded-lg shadow-lg shadow-cyan-500/20 transition-all duration-300"
              >
                Accept
              </button>
              <button
                onClick={handleDecline}
                className="px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-cyan-500/30 hover:border-cyan-400/50 text-cyan-300 text-xs font-semibold rounded-lg transition-all duration-300"
              >
                Decline
              </button>
            </div>
          </div>

          {/* Decorative glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-cyan-500/5 rounded-xl pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
}
