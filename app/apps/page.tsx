'use client';

import { Grid3x3, Sparkles, TrendingUp, Calculator, Eye } from 'lucide-react';
import Image from 'next/image';
import { trackAppClick } from '@/lib/analytics';
import { usePageTracking } from '@/hooks/usePageTracking';

const projects = [
  {
    name: 'Memify',
    emoji: '🎭',
    logo: '/memify-logo.png',
    tagline: 'AI Meme & Content Creator',
    description: 'Create viral memes with AI in seconds. Choose templates, add captions, generate GIFs, and share instantly.',
    icon: Sparkles,
    gradient: 'from-purple-500 to-pink-500',
    status: 'coming-soon',
    category: 'AI',
    tags: ['AI', 'Mobile', 'React Native'],
    links: {
      waitlist: '#',
    },
  },
  {
    name: 'Life Coin Tracker',
    emoji: '🪙',
    logo: '/lifecoin-logo.png',
    tagline: 'Track Your 86,400 Daily Coins',
    description: 'Every day you have 86,400 seconds. Track habits, goals, and productivity with gamified time tracking.',
    icon: TrendingUp,
    gradient: 'from-emerald-500 to-teal-500',
    status: 'coming-soon',
    category: 'Productivity',
    tags: ['Productivity', 'Mobile', 'Gamification'],
    links: {
      waitlist: '#',
    },
  },
  {
    name: 'FormulaFin',
    emoji: '📊',
    logo: '/formulafin-logo.png',
    tagline: 'Universal Formula Finder',
    description: 'Calculate anything: trading profits, APY, position sizing, risk/reward, DCA strategies. Your pocket financial calculator.',
    icon: Calculator,
    gradient: 'from-blue-500 to-cyan-500',
    status: 'coming-soon',
    category: 'Finance',
    tags: ['Finance', 'Tools', 'Mobile'],
    links: {
      demo: '#',
    },
  },
  {
    name: 'CryptoSmartApp',
    emoji: '🧠',
    logo: '/cryptosmartapp-logo.png',
    tagline: 'Next-Gen Crypto Intelligence',
    description: 'AI-powered trading signals, market screener, degen terminal, and portfolio tracking for serious crypto traders.',
    icon: TrendingUp,
    gradient: 'from-orange-500 to-red-500',
    status: 'live',
    category: 'Trading',
    tags: ['Crypto', 'Trading', 'AI'],
    links: {
      demo: 'https://cryptosmartapp.com/',
    },
  },
  {
    name: 'VisionNote',
    emoji: '👁️',
    logo: '/visionnote-logo.png',
    tagline: 'Visual Note-Taking',
    description: 'Sketch, draw, annotate, and organize ideas visually. Perfect for brainstorming, mind maps, and creative work.',
    icon: Eye,
    gradient: 'from-indigo-500 to-purple-500',
    status: 'live',
    category: 'Productivity',
    tags: ['Productivity', 'Design', 'Mobile'],
    links: {
      demo: 'https://www.visionnote.app/',
    },
  },
];

export default function AppsPage() {
  usePageTracking();

  return (
    <div className="min-h-screen">
      {/* Background Gradients */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_center,#0E0E10_40%,#060606_100%)]"></div>
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(0,212,242,0.1)_0%,transparent_70%)]"></div>
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,212,242,0.05)_0%,transparent_60%)]"></div>

      <main className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-16 md:pt-24 pb-32">
        {/* Page Header - Enhanced with Premium Styling */}
        <div className="mb-24 md:mb-32 animate-[fadeIn_0.6s_ease-out]">
          <div className="h-6"></div>
          <div className="inline-block mb-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent tracking-tight leading-none mb-4 hover:scale-105 transition-transform duration-300 cursor-default">
              My Apps
            </h1>
            <div className="h-1 bg-gradient-to-r from-cyan-400/60 via-blue-400/40 to-transparent rounded-full"></div>
          </div>
          <p className="text-white/70 text-base md:text-lg leading-relaxed font-light max-w-3xl ml-0 md:ml-1 mb-4">
            A collection of intelligent tools for creators, traders, and innovators — crafted with passion.
          </p>
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 text-sm md:text-base font-semibold tracking-wide ml-0 md:ml-1 mb-8">
            Built for traders. Powered by creativity. Designed for the future of Web3.
          </p>
          <div className="w-32 h-[2px] bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full ml-0 md:ml-1 shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div>
          <div className="h-6"></div>
        </div>

        {/* Projects Grid - Generous spacing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 md:gap-x-10 gap-y-10 md:gap-y-14">
          {projects.map((project, index) => {
            const Icon = project.icon;
            const statusConfig = {
              live: {
                label: 'LIVE',
                className: 'bg-gradient-to-r from-emerald-500/20 to-emerald-400/10 border border-emerald-400/40 text-emerald-300 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.4)]'
              },
              beta: {
                label: 'BETA',
                className: 'bg-gradient-to-r from-purple-500/20 to-purple-400/10 border border-purple-400/40 text-purple-300 shadow-[0_0_10px_rgba(168,85,247,0.3)]'
              },
              'coming-soon': {
                label: 'COMING SOON',
                className: 'bg-gradient-to-r from-amber-500/20 to-amber-400/10 border border-amber-400/40 text-amber-300 animate-[fadeIn_2s_ease-in-out_infinite]'
              },
              development: {
                label: 'IN DEV',
                className: 'bg-gradient-to-r from-cyan-500/20 to-blue-400/10 border border-cyan-400/40 text-cyan-300'
              },
            }[project.status];

            return (
              <div
                key={project.name}
                className={`group relative bg-gradient-to-b from-[#111213]/95 to-[#0a0b0c]/95 border rounded-2xl p-6 md:p-8 backdrop-blur-md hover:-translate-y-3 hover:scale-[1.03] transition-all duration-500 cursor-pointer ${
                  project.status === 'live'
                    ? 'border-emerald-400/20 shadow-[0_0_15px_rgba(16,185,129,0.08)] hover:border-emerald-400/30 hover:shadow-[0_0_20px_rgba(16,185,129,0.12)]'
                    : 'border-white/10 shadow-[0_0_15px_rgba(0,212,242,0.08)] hover:border-cyan-400/40 hover:shadow-[0_0_35px_rgba(0,212,242,0.25)]'
                }`}
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                }}
              >
                {/* Glow effect on hover */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br transition-all duration-500 pointer-events-none ${
                  project.status === 'live'
                    ? 'from-emerald-500/0 to-green-500/0 group-hover:from-emerald-500/3 group-hover:to-green-500/3'
                    : 'from-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/5 group-hover:to-purple-500/5'
                }`}></div>

                {/* Status Badge */}
                {statusConfig && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider ${statusConfig.className}`}>
                      {statusConfig.label}
                    </span>
                  </div>
                )}

                {/* Card Content with flex layout */}
                <div className="flex flex-col h-full relative z-10">
                  {/* Logo or Icon & Emoji */}
                  <div className="mb-6 flex items-center gap-3">
                    {project.logo ? (
                      <div className="relative w-20 h-20 rounded-xl overflow-visible group-hover:scale-110 transition-all duration-500">
                        {/* Glowing background behind logo */}
                        <div className={`absolute inset-0 rounded-xl bg-gradient-to-br blur-xl transition-all duration-500 ${
                          project.status === 'live'
                            ? 'from-emerald-500/15 via-green-500/15 to-emerald-500/15 group-hover:from-emerald-500/25 group-hover:via-green-500/25 group-hover:to-emerald-500/25'
                            : 'from-cyan-500/20 via-purple-500/20 to-pink-500/20 group-hover:from-cyan-500/40 group-hover:via-purple-500/40 group-hover:to-pink-500/40'
                        }`}></div>
                        <div className={`absolute inset-0 rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border transition-all duration-500 ${
                          project.status === 'live'
                            ? 'border-emerald-400/15 group-hover:border-emerald-400/25'
                            : 'border-white/10 group-hover:border-cyan-400/30'
                        }`}></div>

                        {/* Logo image */}
                        <div className="relative w-full h-full p-2">
                          <Image
                            src={project.logo}
                            alt={`${project.name} logo`}
                            fill
                            className="object-contain drop-shadow-[0_0_15px_rgba(0,212,242,0.3)]"
                            unoptimized
                          />
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${project.gradient} p-0.5 group-hover:shadow-[0_0_25px_rgba(0,212,242,0.4)] transition-all duration-500 group-hover:rotate-6`}>
                          <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                            <Icon className="w-7 h-7 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
                          </div>
                        </div>
                        <span className="text-4xl group-hover:scale-125 transition-transform duration-300">{project.emoji}</span>
                      </>
                    )}
                  </div>

                  {/* Text Content */}
                  <h3 className="text-xl font-bold text-white mb-2 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-300 group-hover:to-purple-300 transition-all duration-300 flex items-center gap-2">
                    {project.name}
                  </h3>
                  <p className="text-cyan-400/80 text-sm font-semibold mb-4 group-hover:text-cyan-300 transition-colors duration-300">{project.tagline}</p>
                  <p className="text-white/70 text-sm leading-relaxed mb-6 group-hover:text-white/85 transition-colors duration-300">{project.description}</p>

                  {/* Tags - Push to bottom */}
                  <div className="flex flex-wrap gap-2 mt-auto mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 bg-slate-800/50 border border-cyan-500/20 rounded text-[10px] text-cyan-400/70 uppercase tracking-[1.5px] font-semibold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex gap-3">
                    {project.links.demo && (
                      <a
                        href={project.status === 'live' ? project.links.demo : '#'}
                        target={project.status === 'live' ? '_blank' : '_self'}
                        rel={project.status === 'live' ? 'noopener noreferrer' : ''}
                        onClick={() => {
                          if (project.status === 'live') {
                            trackAppClick(project.name, 'demo');
                          }
                        }}
                        className={`relative flex-1 px-5 py-2.5 bg-gradient-to-r rounded-full font-semibold text-sm transition-all duration-300 overflow-hidden group/btn flex items-center justify-center ${
                          project.status === 'live'
                            ? 'from-emerald-500/20 to-green-500/10 border border-emerald-400/30 text-emerald-300 hover:from-emerald-500/30 hover:to-green-500/20 hover:border-emerald-400/50 hover:text-white hover:shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                            : 'from-purple-500/20 to-pink-500/10 border border-purple-400/30 text-purple-300 hover:from-purple-500/30 hover:to-pink-500/30 hover:border-purple-400/60 hover:text-white hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                        }`}
                      >
                        <span className="relative z-10">{project.status === 'live' ? 'Try Now' : 'Stay Tuned'}</span>
                        <div className={`absolute inset-0 bg-gradient-to-r translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 ${
                          project.status === 'live'
                            ? 'from-emerald-400/0 via-emerald-400/25 to-emerald-400/0'
                            : 'from-purple-400/0 via-purple-400/20 to-purple-400/0'
                        }`}></div>
                      </a>
                    )}
                    {project.links.waitlist && (
                      <button className="relative flex-1 px-5 py-2.5 bg-gradient-to-r from-purple-500/20 to-pink-500/10 border border-purple-400/30 rounded-full text-purple-300 hover:from-purple-500/30 hover:to-pink-500/30 hover:border-purple-400/60 hover:text-white hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] font-semibold text-sm transition-all duration-300 overflow-hidden group/btn">
                        <span className="relative z-10">Stay Tuned</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-400/0 via-purple-400/20 to-purple-400/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </main>
    </div>
  );
}
