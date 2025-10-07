import { Grid3x3, Sparkles, TrendingUp, Calculator, Eye } from 'lucide-react';

const projects = [
  {
    name: 'Memify',
    tagline: 'AI Meme & Content Creator',
    description: 'Create viral memes with AI in seconds. Choose templates, add captions, generate GIFs, and share instantly.',
    icon: Sparkles,
    gradient: 'from-purple-500 to-pink-500',
    status: 'coming-soon',
    tags: ['AI', 'Mobile', 'React Native'],
    links: {
      waitlist: '#',
    },
  },
  {
    name: 'Life Coin Tracker',
    tagline: 'Track Your 86,400 Daily Coins',
    description: 'Every day you have 86,400 seconds. Track habits, goals, and productivity with gamified time tracking.',
    icon: TrendingUp,
    gradient: 'from-emerald-500 to-teal-500',
    status: 'development',
    tags: ['Productivity', 'Mobile', 'Gamification'],
    links: {
      waitlist: '#',
    },
  },
  {
    name: 'FormulaFin',
    tagline: 'Universal Formula Finder',
    description: 'Calculate anything: trading profits, APY, position sizing, risk/reward, DCA strategies. Your pocket financial calculator.',
    icon: Calculator,
    gradient: 'from-blue-500 to-cyan-500',
    status: 'beta',
    tags: ['Finance', 'Tools', 'Mobile'],
    links: {
      demo: '#',
    },
  },
  {
    name: 'CryptoSmartSignal',
    tagline: 'Next-Gen Crypto Signals',
    description: 'AI-powered trading signals, market screener, degen terminal, and portfolio tracking for serious crypto traders.',
    icon: TrendingUp,
    gradient: 'from-orange-500 to-red-500',
    status: 'development',
    tags: ['Crypto', 'Trading', 'Web'],
    links: {
      github: '#',
    },
  },
  {
    name: 'VisionNote',
    tagline: 'Visual Note-Taking',
    description: 'Sketch, draw, annotate, and organize ideas visually. Perfect for brainstorming, mind maps, and creative work.',
    icon: Eye,
    gradient: 'from-indigo-500 to-purple-500',
    status: 'live',
    tags: ['Productivity', 'Design', 'Mobile'],
    links: {
      demo: '#',
    },
  },
];

export default function AppsPage() {
  return (
    <div className="min-h-screen">
      {/* Background Gradients */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_center,#0E0E10_40%,#060606_100%)]"></div>
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(0,212,242,0.1)_0%,transparent_70%)]"></div>
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,212,242,0.05)_0%,transparent_60%)]"></div>

      <main className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-16 md:pt-24 pb-32">
        {/* Page Header - Left aligned with premium spacing */}
        <div className="space-y-6 md:space-y-8 mb-12 md:mb-16">
          <div className="inline-block">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent tracking-tight leading-none mb-3">
              My Apps
            </h1>
            <div className="h-1 bg-gradient-to-r from-cyan-400/60 via-blue-400/40 to-transparent rounded-full"></div>
          </div>
          <p className="text-white/60 text-sm md:text-base lg:text-lg leading-relaxed font-light max-w-3xl mb-16 md:mb-24 ml-0 md:ml-8">
            A collection of intelligent tools for creators, traders, and innovators, crafted with passion.
          </p>
        </div>

        {/* Projects Grid - Generous spacing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 md:gap-x-10 gap-y-10 md:gap-y-14">
          {projects.map((project) => {
            const Icon = project.icon;
            const statusConfig = {
              live: { label: 'LIVE', color: 'emerald', glow: 'emerald' },
              beta: { label: 'BETA', color: 'yellow', glow: 'yellow' },
              'coming-soon': { label: 'COMING SOON', color: 'slate', glow: 'slate' },
              development: { label: 'IN DEV', color: 'blue', glow: 'cyan' },
            }[project.status];

            return (
              <div
                key={project.name}
                className="group relative bg-gradient-to-b from-[#111213]/95 to-[#0a0b0c]/95 border border-white/10 rounded-2xl p-10 shadow-[0_0_15px_rgba(0,212,242,0.08)] backdrop-blur-md hover:border-cyan-400/30 hover:shadow-[0_0_30px_rgba(0,212,242,0.2)] hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300"
              >
                {/* Status Badge */}
                <div className="absolute top-6 right-6">
                  <span
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider
                    ${statusConfig.color === 'emerald' ? 'bg-gradient-to-r from-emerald-500/20 to-emerald-400/10 border border-emerald-400/40 text-emerald-300 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.3)]' : ''}
                    ${statusConfig.color === 'yellow' ? 'bg-gradient-to-r from-yellow-500/20 to-yellow-400/10 border border-yellow-400/40 text-yellow-300' : ''}
                    ${statusConfig.color === 'slate' ? 'bg-gradient-to-r from-slate-500/20 to-slate-400/10 border border-slate-400/40 text-slate-300' : ''}
                    ${statusConfig.color === 'blue' ? 'bg-gradient-to-r from-cyan-500/20 to-blue-400/10 border border-cyan-400/40 text-cyan-300' : ''}
                  `}
                  >
                    {statusConfig.label}
                  </span>
                </div>

                {/* Card Content with flex layout */}
                <div className="flex flex-col h-full">
                  {/* Icon */}
                  <div className="mb-8">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${project.gradient} p-0.5 group-hover:shadow-[0_0_20px_rgba(0,212,242,0.3)] transition-shadow duration-300`}>
                      <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                        <Icon className="w-7 h-7 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
                      </div>
                    </div>
                  </div>

                  {/* Text Content */}
                  <h3 className="text-xl font-semibold text-white mb-3 tracking-tight group-hover:text-cyan-300 transition-colors duration-300">{project.name}</h3>
                  <p className="text-cyan-400/80 text-sm font-semibold mb-5">{project.tagline}</p>
                  <p className="text-white/70 text-sm leading-relaxed mb-8">{project.description}</p>

                  {/* Tags - Push to bottom */}
                  <div className="flex flex-wrap gap-2 mt-auto mb-5">
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
                      <button className="flex-1 px-5 py-2.5 bg-gradient-to-r from-cyan-500/20 to-blue-500/10 border border-cyan-400/30 rounded-full text-cyan-300 hover:from-cyan-400/30 hover:to-blue-500/20 hover:border-cyan-400/60 hover:text-white hover:shadow-[0_0_15px_rgba(0,212,242,0.3)] font-semibold text-sm transition-all duration-300">
                        Try Now
                      </button>
                    )}
                    {project.links.waitlist && (
                      <button className="flex-1 px-5 py-2.5 bg-gradient-to-r from-cyan-500/20 to-blue-500/10 border border-cyan-400/30 rounded-full text-cyan-300 hover:from-cyan-400/30 hover:to-blue-500/20 hover:border-cyan-400/60 hover:text-white hover:shadow-[0_0_15px_rgba(0,212,242,0.3)] font-semibold text-sm transition-all duration-300">
                        Join Waitlist
                      </button>
                    )}
                    {project.links.github && (
                      <button className="flex-1 px-5 py-2.5 bg-gradient-to-r from-cyan-500/20 to-blue-500/10 border border-cyan-400/30 rounded-full text-cyan-300 hover:from-cyan-400/30 hover:to-blue-500/20 hover:border-cyan-400/60 hover:text-white hover:shadow-[0_0_15px_rgba(0,212,242,0.3)] font-semibold text-sm transition-all duration-300">
                        View Code
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
