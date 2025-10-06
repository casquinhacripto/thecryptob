'use client';

import { useState } from 'react';
import { Coffee, Copy, Check } from 'lucide-react';

const wallets = [
  {
    coin: 'Bitcoin',
    symbol: 'BTC',
    address: process.env.NEXT_PUBLIC_BTC_WALLET || 'bc1q_your_btc_wallet_address',
    gradient: 'from-orange-500 to-yellow-500',
    icon: '₿',
  },
  {
    coin: 'Ethereum',
    symbol: 'ETH',
    address: process.env.NEXT_PUBLIC_ETH_WALLET || '0x_your_eth_wallet_address',
    gradient: 'from-blue-500 to-indigo-500',
    icon: 'Ξ',
  },
  {
    coin: 'Solana',
    symbol: 'SOL',
    address: process.env.NEXT_PUBLIC_SOL_WALLET || 'your_sol_wallet_address',
    gradient: 'from-purple-500 to-pink-500',
    icon: '◎',
  },
  {
    coin: 'Sui',
    symbol: 'SUI',
    address: process.env.NEXT_PUBLIC_SUI_WALLET || '0x_your_sui_wallet_address',
    gradient: 'from-cyan-500 to-blue-500',
    icon: '~',
  },
];

export default function SupportPage() {
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);

  const copyToClipboard = (address: string, symbol: string) => {
    navigator.clipboard.writeText(address);
    setCopiedAddress(symbol);
    setTimeout(() => setCopiedAddress(null), 2000);
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Support TheCrypto_B ❤️
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Building free tools takes time, coffee, and crypto. Your support helps keep everything free!
          </p>
        </div>

        {/* Buy Me a Coffee */}
        <div className="max-w-md mx-auto mb-12">
          <div className="bg-slate-900/60 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8 text-center hover:border-cyan-400/50 transition-all">
            <Coffee className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Buy Me a Coffee</h3>
            <p className="text-slate-400 mb-6">Quick & easy way to show support</p>
            <a
              href={process.env.NEXT_PUBLIC_BMC_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-white font-semibold rounded-lg transition-all duration-300"
            >
              <Coffee className="w-5 h-5" />
              Support on BMC
            </a>
          </div>
        </div>

        {/* Crypto Wallets */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Crypto Donations
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {wallets.map((wallet) => (
              <div
                key={wallet.symbol}
                className="bg-slate-900/60 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6 hover:border-cyan-400/50 transition-all group"
              >
                {/* Header */}
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${wallet.gradient} flex items-center justify-center text-2xl font-bold text-white shadow-lg`}>
                    {wallet.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{wallet.coin}</h3>
                    <p className="text-sm text-slate-400">{wallet.symbol}</p>
                  </div>
                </div>

                {/* Address */}
                <div className="bg-slate-800/50 border border-cyan-500/20 rounded-lg p-3 mb-3">
                  <p className="text-xs text-slate-500 mb-1">Wallet Address</p>
                  <p className="text-sm text-cyan-300 font-mono break-all">{wallet.address}</p>
                </div>

                {/* Copy Button */}
                <button
                  onClick={() => copyToClipboard(wallet.address, wallet.symbol)}
                  className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all duration-300
                    ${
                      copiedAddress === wallet.symbol
                        ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300'
                        : 'bg-slate-800/50 hover:bg-slate-700/50 border border-cyan-500/30 hover:border-cyan-400/50 text-cyan-300'
                    }
                  `}
                >
                  {copiedAddress === wallet.symbol ? (
                    <>
                      <Check className="w-5 h-5" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5" />
                      Copy Address
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="max-w-2xl mx-auto mt-16">
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              💡 Supporter Benefits
            </h3>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-start gap-3">
                <span className="text-cyan-400">✓</span>
                <span>Shoutout in Alpha Feed updates</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan-400">✓</span>
                <span>Early access to new app releases</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan-400">✓</span>
                <span>Direct feedback channel for feature requests</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan-400">✓</span>
                <span>Eternal gratitude from a solo builder 🙏</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Thank You Note */}
        <div className="text-center mt-12">
          <p className="text-slate-400 text-lg">
            Every donation, no matter how small, means the world to me.
          </p>
          <p className="text-cyan-300 font-semibold text-xl mt-2">
            Thank you for supporting free, open tools! 🚀
          </p>
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
