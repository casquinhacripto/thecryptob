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
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            My Apps & Projects
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Building free tools for the crypto space. All apps are mobile-first and designed with passion.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => {
            const Icon = project.icon;
            const statusConfig = {
              live: { label: 'LIVE', color: 'emerald' },
              beta: { label: 'BETA', color: 'yellow' },
              'coming-soon': { label: 'COMING SOON', color: 'slate' },
              development: { label: 'IN DEV', color: 'blue' },
            }[project.status];

            return (
              <div
                key={project.name}
                className="group relative bg-slate-900/60 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6 hover:border-cyan-400/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/20"
              >
                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold
                    ${statusConfig.color === 'emerald' ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300' : ''}
                    ${statusConfig.color === 'yellow' ? 'bg-yellow-500/20 border border-yellow-500/40 text-yellow-300' : ''}
                    ${statusConfig.color === 'slate' ? 'bg-slate-500/20 border border-slate-500/40 text-slate-300' : ''}
                    ${statusConfig.color === 'blue' ? 'bg-blue-500/20 border border-blue-500/40 text-blue-300' : ''}
                  `}
                  >
                    {statusConfig.label}
                  </span>
                </div>

                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${project.gradient} p-0.5 mb-6`}>
                  <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-white mb-2">{project.name}</h3>
                <p className="text-cyan-300 text-sm font-medium mb-3">{project.tagline}</p>
                <p className="text-slate-400 text-sm mb-4 line-clamp-3">{project.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-slate-800/50 border border-cyan-500/20 rounded text-xs text-cyan-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex gap-2">
                  {project.links.demo && (
                    <button className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold rounded-lg transition-all duration-300">
                      Try Now
                    </button>
                  )}
                  {project.links.waitlist && (
                    <button className="flex-1 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-cyan-500/30 hover:border-cyan-400/50 text-cyan-300 font-semibold rounded-lg transition-all duration-300">
                      Join Waitlist
                    </button>
                  )}
                  {project.links.github && (
                    <button className="flex-1 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-cyan-500/30 hover:border-cyan-400/50 text-cyan-300 font-semibold rounded-lg transition-all duration-300">
                      View Code
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col items-center gap-4 px-8 py-6 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-2xl">
            <h3 className="text-2xl font-bold text-white">Want updates on new apps?</h3>
            <p className="text-slate-400">Follow me on Twitter for the latest releases and dev logs</p>
            <a
              href={process.env.NEXT_PUBLIC_TWITTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold rounded-lg transition-all duration-300"
            >
              Follow @TheCrypto_B
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 mt-20">
        <div className="container mx-auto px-4 text-center text-slate-500">
          <p>© 2025 TheCrypto_B. Built with ❤️ for the crypto community.</p>
          <p className="text-sm mt-2">100% Free. No Paywalls. Just Passion.</p>
        </div>
      </footer>
    </div>
  );
}
