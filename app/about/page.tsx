import { Code, TrendingUp, Heart, Target } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Background Gradients */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_center,#0E0E10_40%,#060606_100%)]"></div>
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(0,212,242,0.1)_0%,transparent_70%)]"></div>
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,212,242,0.05)_0%,transparent_60%)]"></div>

      <main className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-16 md:pt-24 pb-32">
        {/* Page Header - Enhanced with Premium Styling (Matching Apps/Widgets Pages) */}
        <div className="mb-24 md:mb-32 animate-[fadeIn_0.6s_ease-out]">
          <div className="h-6"></div>
          <div className="inline-block mb-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent tracking-tight leading-none mb-4 hover:scale-105 transition-transform duration-300 cursor-default">
              About <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">TheCrypto_B</span>
            </h1>
            <div className="h-1 bg-gradient-to-r from-cyan-400/60 via-blue-400/40 to-transparent rounded-full animate-[shimmer_3s_ease-in-out_infinite]"></div>
          </div>
          <p className="text-white/70 text-lg md:text-xl leading-relaxed font-light max-w-3xl ml-0 md:ml-1 mb-4">
            Builder. Trader. Creator. ⚡
          </p>
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 text-sm md:text-base font-semibold tracking-wide ml-0 md:ml-1 mb-8">
            Building free tools for the crypto community, no paywalls, just passion.
          </p>
          <div className="w-32 h-[2px] bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full ml-0 md:ml-1 shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div>
          <div className="h-6"></div>
        </div>

        {/* Main Content */}
        <div className="space-y-16 md:space-y-20">
          {/* Who I Am - Two Column Layout */}
          <section className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 items-start">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-semibold text-white flex items-center gap-3 mb-3">
                  <span>👋</span> Who I Am
                </h2>
                <div className="h-[1px] w-24 bg-gradient-to-r from-cyan-400/60 to-transparent"></div>
              </div>

              <div className="text-white/70 space-y-5 text-base md:text-lg leading-relaxed max-w-[850px]">
                <div className="h-8"></div>
                <p>
                  I've been in crypto since mid-2021, and like any newbie, I went through everything you can imagine from getting my wallets drained to losing all my money and believing I'd become a millionaire on my first meme trade.
                </p>

                <p>
                  But through all those ups and downs, I fell in love with crypto. Instead of giving up, I decided to study, learn, and truly understand the space. Since then, I've been in the crypto trenches 24/7, learning, building, and growing with the community.
                </p>

                <p>
                  I started a <span className="text-red-400 font-semibold">YouTube channel</span> and became active on <span className="text-cyan-400 font-semibold">X</span> and <span className="text-blue-400 font-semibold">CoinMarketCap</span> to share what I've learned and help others onboard into crypto, hopefully helping them avoid the same hard lessons I faced when I started.
                </p>

                <p>
                  With this passion, I discovered a love for building and creating new tools. And now, with the help of AI, many of my ideas are finally coming to life. My goal is simple: to keep building tools, sharing knowledge, and helping as many people as possible along the way. 💙
                </p>

                <div className="h-8"></div>

                <p className="text-cyan-300/80 italic text-base border-l-2 border-cyan-400/40 pl-4 mt-8 pt-2 mb-8">
                  "The more I build, the more I realize, crypto isn't just about charts, it's about people."
                </p>

                <div className="h-8"></div>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 hover:border-cyan-400/40 text-center shadow-[0_0_20px_#00ffff10] transition-all duration-300">
              <p className="text-gray-500 text-sm mb-2">Current Focus</p>
              <p className="text-xl md:text-2xl font-semibold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
                Web3 Tools & AI Integration
              </p>
            </div>
          </section>

          {/* What I Believe - Feature Cards */}
          <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
            <div className="p-6 md:p-8 rounded-xl bg-[#0a0a0a]/70 backdrop-blur-xl border border-white/10 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">🧰 Free Tools for Everyone</h3>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                No paywalls, no premium tiers — just quality tools for all.
              </p>
            </div>

            <div className="p-6 md:p-8 rounded-xl bg-[#0a0a0a]/70 backdrop-blur-xl border border-white/10 hover:border-emerald-400/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Code className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">🌍 Transparency in Development</h3>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                Sharing both the wins and the failures. Building in public.
              </p>
            </div>

            <div className="p-6 md:p-8 rounded-xl bg-[#0a0a0a]/70 backdrop-blur-xl border border-white/10 hover:border-purple-400/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">📱 Mobile-First Experiences</h3>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                The future is mobile. All new apps are designed for on-the-go use.
              </p>
            </div>

            <div className="p-6 md:p-8 rounded-xl bg-[#0a0a0a]/70 backdrop-blur-xl border border-white/10 hover:border-orange-400/50 hover:shadow-[0_0_30px_rgba(249,115,22,0.15)] transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">❤️ Passion Over Profit</h3>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                Building because I love it, not because I have to monetize everything.
              </p>
            </div>
          </div>

          <div className="h-8"></div>
          <div className="h-8"></div>

          {/* Stats Section */}
          <section className="mt-16 mb-24">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
              <div className="group">
                <p className="text-4xl md:text-5xl font-bold text-cyan-400 group-hover:scale-110 transition-transform">5</p>
                <p className="text-gray-400 text-sm mt-2">Projects Built</p>
              </div>
              <div className="group">
                <p className="text-4xl md:text-5xl font-bold text-cyan-400 group-hover:scale-110 transition-transform">10K+</p>
                <p className="text-gray-400 text-sm mt-2">Lines of Code</p>
              </div>
              <div className="group">
                <p className="text-4xl md:text-5xl font-bold text-cyan-400 group-hover:scale-110 transition-transform">100%</p>
                <p className="text-gray-400 text-sm mt-2">Free Tools</p>
              </div>
              <div className="group">
                <p className="text-4xl md:text-5xl font-bold text-cyan-400 group-hover:scale-110 transition-transform">∞</p>
                <p className="text-gray-400 text-sm mt-2">Passion</p>
              </div>
            </div>
          </section>

          <div className="h-8"></div>

          {/* Divider */}
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent mb-20"></div>

          {/* Collaboration Section - Page Outro */}
          <section className="relative text-center mb-24">
            {/* Ambient Glow Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/5 to-transparent blur-3xl pointer-events-none"></div>

            {/* Content */}
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-semibold text-white mb-4">🤝 Want to Collaborate?</h3>
              <p className="text-gray-400 text-sm md:text-base max-w-[600px] mx-auto leading-relaxed mb-8 text-center">
                Always open to interesting projects, creative partnerships, and new opportunities in Web3 and AI innovation.
              </p>
              <a
                href={process.env.NEXT_PUBLIC_TWITTER_URL || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-2.5 rounded-lg border border-cyan-400/50 text-cyan-300 font-medium hover:bg-cyan-400/10 hover:border-cyan-400 transition-all duration-300 shadow-[0_0_20px_#00ffff10] hover:shadow-[0_0_30px_#00ffff20]"
              >
                DM Me on X
              </a>
            </div>
          </section>

          {/* Footer Signature */}
          <p className="text-gray-500 text-xs text-center mt-16">
            © 2025 <span className="text-cyan-400 font-semibold">TheCrypto_B</span>. Built with 💙 for builders, dreamers, and innovators.
          </p>
        </div>
      </main>
    </div>
  );
}
