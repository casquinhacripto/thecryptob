export default function Footer() {
  return (
    <footer className="relative mt-16 pt-8 pb-8 text-center">
      {/* Top gradient border */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>

      {/* Subtle glow behind footer */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-full bg-gradient-to-b from-cyan-500/5 to-transparent pointer-events-none"></div>

      <div className="relative z-10">
        <p className="text-sm mb-2">
          © 2025 <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-yellow-500 to-orange-400 font-bold">TheCrypto_B</span>
          {' • '}Built with <span className="inline-block text-red-500 animate-pulse px-1 drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]">❤️</span> for the crypto community.
        </p>

        <p className="text-xs mt-3 mb-1">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 font-semibold tracking-wide">
            Real-time Bitcoin Intelligence. Built for Traders, by a Builder.
          </span>
        </p>

        <p className="text-white/40 text-xs font-medium tracking-wider mt-2">
          100% Free • No Paywalls • Just Passion for Web3
        </p>
      </div>
    </footer>
  );
}
