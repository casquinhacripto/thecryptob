import { Code, TrendingUp, Heart, Target } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            About TheCrypto_B
          </h1>
          <p className="text-2xl text-slate-400">
            Builder. Trader. Creator.
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Who I Am */}
          <div className="bg-slate-900/60 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <span>👋</span> Who I Am
            </h2>
            <div className="text-slate-300 space-y-4 text-lg">
              <p>
                I'm <span className="text-cyan-300 font-semibold">TheCrypto_B</span>, a full-stack developer and crypto enthusiast building free tools for the community.
              </p>
              <p>
                I believe in transparency, accessibility, and the power of open tools. Every project I build is designed to solve real problems and help people navigate the crypto space.
              </p>
            </div>
          </div>

          {/* What I Believe */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/60 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6 hover:border-cyan-400/50 transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Free Tools for Everyone</h3>
              <p className="text-slate-400">
                No paywalls, no premium tiers. Just quality tools that everyone can use.
              </p>
            </div>

            <div className="bg-slate-900/60 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6 hover:border-cyan-400/50 transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center mb-4">
                <Code className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Transparency in Development</h3>
              <p className="text-slate-400">
                Share the journey, the wins, and the failures. Build in public.
              </p>
            </div>

            <div className="bg-slate-900/60 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6 hover:border-cyan-400/50 transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Mobile-First Experiences</h3>
              <p className="text-slate-400">
                The future is mobile. All new apps are designed for on-the-go use.
              </p>
            </div>

            <div className="bg-slate-900/60 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6 hover:border-cyan-400/50 transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Passion Over Profit</h3>
              <p className="text-slate-400">
                Building because I love it, not because I have to monetize everything.
              </p>
            </div>
          </div>

          {/* Find Me Online */}
          <div className="bg-slate-900/60 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <span>🌐</span> Find Me Online
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a
                href={process.env.NEXT_PUBLIC_TWITTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-4 bg-slate-800/50 hover:bg-slate-700/50 border border-cyan-500/30 hover:border-cyan-400/50 rounded-lg transition-all group"
              >
                <svg className="w-6 h-6 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <div>
                  <div className="text-white font-semibold group-hover:text-cyan-300 transition-colors">Twitter</div>
                  <div className="text-xs text-slate-400">@TheCrypto_B</div>
                </div>
              </a>

              <a
                href={process.env.NEXT_PUBLIC_YOUTUBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-4 bg-slate-800/50 hover:bg-slate-700/50 border border-cyan-500/30 hover:border-cyan-400/50 rounded-lg transition-all group"
              >
                <svg className="w-6 h-6 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                <div>
                  <div className="text-white font-semibold group-hover:text-cyan-300 transition-colors">YouTube</div>
                  <div className="text-xs text-slate-400">@Crypto_B</div>
                </div>
              </a>

              <a
                href={process.env.NEXT_PUBLIC_CMC_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-4 bg-slate-800/50 hover:bg-slate-700/50 border border-cyan-500/30 hover:border-cyan-400/50 rounded-lg transition-all group"
              >
                <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.12 11.95c-.23-1.14-1.08-1.88-2.23-1.88-.87 0-1.62.47-2.05 1.18l-.03-.09c-.24-.66-.89-1.09-1.62-1.09-.77 0-1.45.48-1.79 1.22v-.97h-1.39v6.36h1.45v-3.26c0-.88.54-1.47 1.31-1.47.74 0 1.14.51 1.14 1.43v3.3h1.45v-3.26c0-.88.54-1.47 1.31-1.47.74 0 1.14.51 1.14 1.43v3.3H20v-3.62c0-.43-.02-.85-.08-1.11zM7.71 15.68c-1.64 0-2.82-1.26-2.82-2.95s1.18-2.95 2.82-2.95c1.01 0 1.88.51 2.36 1.28l-1.11.74c-.28-.42-.76-.69-1.25-.69-.96 0-1.61.72-1.61 1.62s.65 1.62 1.61 1.62c.49 0 .97-.27 1.25-.69l1.11.74c-.48.77-1.35 1.28-2.36 1.28z" />
                </svg>
                <div>
                  <div className="text-white font-semibold group-hover:text-cyan-300 transition-colors">CoinMarketCap</div>
                  <div className="text-xs text-slate-400">TheCrypto_B</div>
                </div>
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">
              📊 Stats
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-cyan-400 mb-2">5</div>
                <div className="text-sm text-slate-400">Projects Built</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-cyan-400 mb-2">10K+</div>
                <div className="text-sm text-slate-400">Lines of Code</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-cyan-400 mb-2">100%</div>
                <div className="text-sm text-slate-400">Free Tools</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-cyan-400 mb-2">∞</div>
                <div className="text-sm text-slate-400">Passion</div>
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Want to Collaborate?</h3>
            <p className="text-slate-400 mb-6">
              Always open to interesting projects and partnerships
            </p>
            <a
              href={process.env.NEXT_PUBLIC_TWITTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold rounded-lg transition-all duration-300"
            >
              DM Me on Twitter
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
