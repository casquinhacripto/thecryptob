'use client';

import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center relative">
      {/* Background Gradients */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_center,#0E0E10_40%,#060606_100%)]"></div>
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(0,212,242,0.1)_0%,transparent_70%)]"></div>
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,212,242,0.05)_0%,transparent_60%)]"></div>

      <div className="text-center px-6 max-w-2xl">
        {/* 404 Number with Glow */}
        <div className="mb-8 relative">
          <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 animate-pulse"></div>
          <h1 className="relative text-9xl md:text-[12rem] font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            404
          </h1>
        </div>

        {/* Message */}
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Page Not Found
        </h2>
        <p className="text-lg text-gray-400 mb-10 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved to another location.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold rounded-lg shadow-lg shadow-cyan-500/30 transition-all duration-300 hover:scale-105"
          >
            <Home className="w-5 h-5" />
            Go Home
          </Link>
          <button
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.history.back();
              }
            }}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-800/50 hover:bg-slate-700/50 border border-cyan-500/30 hover:border-cyan-400/50 text-cyan-300 font-semibold rounded-lg transition-all duration-300 hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t border-white/5">
          <p className="text-sm text-gray-500 mb-4">Quick Links:</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/apps" className="text-cyan-400 hover:text-cyan-300 transition-colors">
              Apps
            </Link>
            <Link href="/widgets" className="text-cyan-400 hover:text-cyan-300 transition-colors">
              Widgets
            </Link>
            <Link href="/support" className="text-cyan-400 hover:text-cyan-300 transition-colors">
              Support
            </Link>
            <Link href="/about" className="text-cyan-400 hover:text-cyan-300 transition-colors">
              About
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
