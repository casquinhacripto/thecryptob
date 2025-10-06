import { Calendar, Check, Wrench, Rocket } from 'lucide-react';

const alphaUpdates = [
  {
    date: 'October 6, 2025',
    done: [
      'Launched TheCrypto_B Hub v1.0',
      'Real-time Bitcoin price tracker with WebSocket',
      'Collapsible sidebar navigation',
      'Top 5 coins ticker bar',
    ],
    building: [
      'Apps gallery with project showcases',
      'Crypto donation system',
    ],
    next: [
      'Embed widget generator',
      'Portfolio tracker',
      'Price alerts system',
    ],
    thoughts: 'Removed all paid APIs to keep the platform 100% free. Focusing on mobile-first development for all new apps. Excited to share more tools with the community!',
  },
  {
    date: 'October 1, 2025',
    done: [
      'Completed VisionNote canvas engine',
      'Fixed mobile responsiveness issues',
    ],
    building: [
      'Memify beta release',
      'Life Coin Tracker UI revamp',
    ],
    next: [
      'Smart Formula calculator improvements',
    ],
    thoughts: '12K+ users on Memify waitlist! Working hard to deliver the best AI meme creator experience.',
  },
];

export default function AlphaPage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Alpha Feed 🧠
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            What I'm building, learning, and shipping. Raw updates from the trenches.
          </p>
        </div>

        {/* Updates Timeline */}
        <div className="max-w-3xl mx-auto space-y-8">
          {alphaUpdates.map((update, index) => (
            <div
              key={index}
              className="bg-slate-900/60 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6 md:p-8 hover:border-cyan-400/50 transition-all"
            >
              {/* Date */}
              <div className="flex items-center gap-2 mb-6">
                <Calendar className="w-5 h-5 text-cyan-400" />
                <h2 className="text-xl font-bold text-white">{update.date}</h2>
              </div>

              {/* Done Section */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Check className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-lg font-semibold text-emerald-300">✅ Done</h3>
                </div>
                <ul className="space-y-2 ml-7">
                  {update.done.map((item, i) => (
                    <li key={i} className="text-slate-300 flex items-start gap-2">
                      <span className="text-emerald-400 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Building Section */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Wrench className="w-5 h-5 text-yellow-400" />
                  <h3 className="text-lg font-semibold text-yellow-300">🚧 Building</h3>
                </div>
                <ul className="space-y-2 ml-7">
                  {update.building.map((item, i) => (
                    <li key={i} className="text-slate-300 flex items-start gap-2">
                      <span className="text-yellow-400 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Next Section */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Rocket className="w-5 h-5 text-blue-400" />
                  <h3 className="text-lg font-semibold text-blue-300">🔧 Next</h3>
                </div>
                <ul className="space-y-2 ml-7">
                  {update.next.map((item, i) => (
                    <li key={i} className="text-slate-300 flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Thoughts */}
              <div className="border-t border-slate-700/50 pt-4 mt-4">
                <p className="text-slate-400 italic">{update.thoughts}</p>
              </div>

              {/* Reactions (Placeholder) */}
              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-slate-700/50">
                <button className="text-slate-400 hover:text-red-400 transition-colors flex items-center gap-1">
                  <span>❤️</span>
                  <span className="text-sm">12</span>
                </button>
                <button className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1">
                  <span>💬</span>
                  <span className="text-sm">3</span>
                </button>
                <button className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-1">
                  <span>🔗</span>
                  <span className="text-sm">Share</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Twitter Embed Section */}
        <div className="max-w-3xl mx-auto mt-12">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            🐦 Latest from Twitter
          </h2>
          <div className="bg-slate-900/60 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8 text-center">
            <p className="text-slate-400 mb-4">
              Follow me on Twitter for real-time updates and crypto insights
            </p>
            <a
              href={process.env.NEXT_PUBLIC_TWITTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold rounded-lg transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
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
