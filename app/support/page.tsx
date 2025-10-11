'use client';

import { useState } from 'react';
import { QRCodeSVG as QRCode } from 'qrcode.react';
import toast, { Toaster } from 'react-hot-toast';
import { Coffee } from 'lucide-react';

// Chain logo components
const ChainLogo = ({ chain }: { chain: string }) => {
  const logoStyle = { width: '32px', height: '32px' };

  switch (chain) {
    case 'ETH':
      return (
        <svg viewBox="0 0 256 417" style={logoStyle}>
          <path fill="#343434" d="m127.961 0-2.795 9.5v275.668l2.795 2.79 127.962-75.638z"/>
          <path fill="#8C8C8C" d="m127.962 0-127.962 212.32 127.962 75.639V154.158z"/>
          <path fill="#3C3C3B" d="m127.961 312.187-1.575 1.92v98.199l1.575 4.6L256 236.587z"/>
          <path fill="#8C8C8C" d="m127.962 416.905v-104.72L0 236.585z"/>
          <path fill="#141414" d="m127.961 287.958 127.96-75.637-127.96-58.162z"/>
          <path fill="#393939" d="m0 212.32 127.96 75.638v-133.8z"/>
        </svg>
      );
    case 'BASE':
      return (
        <svg viewBox="0 0 111 111" style={logoStyle}>
          <path fill="#0052FF" d="M54.921 110.034C85.359 110.034 110.034 85.402 110.034 55.017C110.034 24.6318 85.359 0 54.921 0C26.0432 0 2.35281 21.8968 0.239258 49.8979H83.4312V60.1161H0.239258C2.35281 88.1172 26.0432 110.034 54.921 110.034Z"/>
        </svg>
      );
    case 'SOL':
      return (
        <svg viewBox="0 0 397.7 311.7" style={logoStyle}>
          <linearGradient id="a" x1="360.879" y1="351.455" x2="141.213" y2="-69.294" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#00FFA3"/>
            <stop offset="1" stopColor="#DC1FFF"/>
          </linearGradient>
          <path fill="url(#a)" d="M64.6,237.9c2.4-2.4,5.7-3.8,9.2-3.8h317.4c5.8,0,8.7,7,4.6,11.1l-62.7,62.7c-2.4,2.4-5.7,3.8-9.2,3.8H6.5c-5.8,0-8.7-7-4.6-11.1L64.6,237.9z"/>
          <path fill="url(#a)" d="M64.6,3.8C67.1,1.4,70.4,0,73.8,0h317.4c5.8,0,8.7,7,4.6,11.1l-62.7,62.7c-2.4,2.4-5.7,3.8-9.2,3.8H6.5c-5.8,0-8.7-7-4.6-11.1L64.6,3.8z"/>
          <path fill="url(#a)" d="M333.1,120.1c-2.4-2.4-5.7-3.8-9.2-3.8H6.5c-5.8,0-8.7,7-4.6,11.1l62.7,62.7c2.4,2.4,5.7,3.8,9.2,3.8h317.4c5.8,0,8.7-7,4.6-11.1L333.1,120.1z"/>
        </svg>
      );
    case 'SUI':
      return <img src="/sui-logo.png" alt="SUI" style={logoStyle} />;
    case 'BTC':
      return (
        <svg viewBox="0 0 32 32" style={logoStyle}>
          <circle cx="16" cy="16" r="16" fill="#F7931A"/>
          <path fill="#FFFFFF" d="M23.189 14.02c.314-2.096-1.283-3.223-3.465-3.975l.708-2.84-1.728-.43-.69 2.765c-.456-.114-.924-.222-1.385-.326l.695-2.783L15.596 6l-.708 2.839c-.376-.086-.746-.17-1.103-.26l.002-.009-2.384-.595-.46 1.846s1.283.294 1.256.312c.7.175.826.638.805 1.006l-.806 3.235c.048.012.11.03.18.057l-.183-.045-1.13 4.532c-.086.212-.303.531-.793.41.018.025-1.256-.313-1.256-.313L8.93 19.24l2.252.561c.418.105.828.215 1.231.318l-.715 2.872 1.727.43.708-2.84c.472.127.93.245 1.378.357l-.706 2.828 1.728.43.715-2.866c2.948.558 5.164.333 6.097-2.333.752-2.146-.037-3.385-1.588-4.192 1.13-.26 1.98-1.003 2.207-2.538zm-3.95 5.538c-.533 2.147-4.148.986-5.32.695l.95-3.805c1.172.293 4.929.872 4.37 3.11zm.535-5.569c-.487 1.953-3.495.96-4.47.717l.86-3.45c.975.243 4.118.696 3.61 2.733z"/>
        </svg>
      );
    case 'METAMASK':
      return (
        <svg viewBox="0 0 35 33" style={logoStyle}>
          <g>
            <polygon fill="#E17726" stroke="#E17726" strokeWidth="0.25" points="32.96,1 21,10.88 23.28,5.25"/>
            <polygon fill="#E27625" stroke="#E27625" strokeWidth="0.25" points="2.66,1 14.53,11 12.31,5.25"/>
            <polygon fill="#E27625" stroke="#E27625" strokeWidth="0.25" points="28.22,24 25.18,28.5 32.28,30.5 34.3,24.13"/>
            <polygon fill="#E27625" stroke="#E27625" strokeWidth="0.25" points="1.29,24.13 3.3,30.5 10.4,28.5 7.36,24"/>
            <polygon fill="#E27625" stroke="#E27625" strokeWidth="0.25" points="9.99,14.25 8.01,17.25 15.04,17.6 14.82,10.13"/>
            <polygon fill="#E27625" stroke="#E27625" strokeWidth="0.25" points="25.6,14.25 20.96,9.88 20.76,17.6 27.78,17.25"/>
            <polygon fill="#E27625" stroke="#E27625" strokeWidth="0.25" points="10.4,28.5 14.39,26.25 10.9,24.15"/>
            <polygon fill="#E27625" stroke="#E27625" strokeWidth="0.25" points="21.2,26.25 25.18,28.5 24.69,24.15"/>
            <polygon fill="#D5BFB2" stroke="#D5BFB2" strokeWidth="0.25" points="25.18,28.5 21.2,26.25 21.51,28.88 21.48,30.38"/>
            <polygon fill="#D5BFB2" stroke="#D5BFB2" strokeWidth="0.25" points="10.4,28.5 14.11,30.38 14.09,28.88 14.39,26.25"/>
            <polygon fill="#233447" stroke="#233447" strokeWidth="0.25" points="14.18,21.5 10.79,20.5 13.17,19.38"/>
            <polygon fill="#233447" stroke="#233447" strokeWidth="0.25" points="21.41,21.5 23.79,19.38 26.19,20.5"/>
            <polygon fill="#CC6228" stroke="#CC6228" strokeWidth="0.25" points="10.4,28.5 10.93,24 7.36,24.13"/>
            <polygon fill="#CC6228" stroke="#CC6228" strokeWidth="0.25" points="24.66,24 25.18,28.5 28.22,24.13"/>
            <polygon fill="#CC6228" stroke="#CC6228" strokeWidth="0.25" points="27.78,17.25 20.76,17.6 21.42,21.5 23.8,19.38 26.2,20.5"/>
            <polygon fill="#CC6228" stroke="#CC6228" strokeWidth="0.25" points="10.79,20.5 13.17,19.38 14.18,21.5 15.04,17.6 8.01,17.25"/>
            <polygon fill="#E27525" stroke="#E27525" strokeWidth="0.25" points="8.01,17.25 10.9,24.15 10.79,20.5"/>
            <polygon fill="#E27525" stroke="#E27525" strokeWidth="0.25" points="26.2,20.5 24.69,24.15 27.78,17.25"/>
            <polygon fill="#E27525" stroke="#E27525" strokeWidth="0.25" points="15.04,17.6 14.18,21.5 15.14,26 15.37,20.13"/>
            <polygon fill="#E27525" stroke="#E27525" strokeWidth="0.25" points="20.76,17.6 20.23,20.13 20.45,26 21.42,21.5"/>
            <polygon fill="#F5841F" stroke="#F5841F" strokeWidth="0.25" points="21.42,21.5 20.45,26 21.2,26.25 24.69,24.15 26.2,20.5"/>
            <polygon fill="#F5841F" stroke="#F5841F" strokeWidth="0.25" points="10.79,20.5 10.9,24.15 14.39,26.25 15.14,26 14.18,21.5"/>
            <polygon fill="#C0AC9D" stroke="#C0AC9D" strokeWidth="0.25" points="21.48,30.38 21.51,28.88 21.22,28.63 14.37,28.63 14.09,28.88 14.11,30.38 10.4,28.5 11.62,29.5 14.33,31.38 21.26,31.38 23.98,29.5 25.18,28.5"/>
            <polygon fill="#161616" stroke="#161616" strokeWidth="0.25" points="21.2,26.25 20.45,26 15.14,26 14.39,26.25 14.09,28.88 14.37,28.63 21.22,28.63 21.51,28.88"/>
            <polygon fill="#763E1A" stroke="#763E1A" strokeWidth="0.25" points="33.53,11.38 34.8,5.63 32.96,1 21.2,10.5 25.6,14.25 32.06,16.13 33.61,14.38 32.96,13.88 34.17,12.75 33.37,12.13 34.58,11.25"/>
            <polygon fill="#763E1A" stroke="#763E1A" strokeWidth="0.25" points="0.79,5.63 2.06,11.38 1.23,11.25 2.44,12.13 1.64,12.75 2.85,13.88 2.2,14.38 3.75,16.13 10.21,14.25 14.61,10.5 2.85,1"/>
            <polygon fill="#F5841F" stroke="#F5841F" strokeWidth="0.25" points="32.06,16.13 25.6,14.25 27.78,17.25 24.69,24.15 28.22,24.13 34.3,24.13"/>
            <polygon fill="#F5841F" stroke="#F5841F" strokeWidth="0.25" points="10.21,14.25 3.75,16.13 1.29,24.13 7.36,24.13 10.9,24.15 8.01,17.25"/>
            <polygon fill="#F5841F" stroke="#F5841F" strokeWidth="0.25" points="20.76,17.6 21.2,10.5 23.31,5.25 12.31,5.25 14.61,10.5 15.04,17.6 15.13,20.15 15.14,26 20.45,26 20.46,20.15"/>
          </g>
        </svg>
      );
    default:
      return <div style={{...logoStyle, background: '#374151', borderRadius: '50%'}} />;
  }
};

export default function SupportPage() {
  const [showThankYou, setShowThankYou] = useState(false);
  const [thankYouDetails, setThankYouDetails] = useState({ amount: 0, token: '', chain: '', address: '' });

  // Official wallet addresses with chain info - Secured via environment variables
  const chainInfo = {
    METAMASK: {
      address: process.env.NEXT_PUBLIC_METAMASK_WALLET || '',
      name: 'Any MetaMask Token',
      color: '#f6851b',
      explorer: 'https://etherscan.io/address/',
      hasQuickAmounts: true,
      tokens: ['ANY TOKEN', 'USDC', 'USDT', 'ETH']
    },
    ETH: {
      address: process.env.NEXT_PUBLIC_ETH_WALLET || '',
      name: 'Ethereum Mainnet',
      color: '#627eea',
      explorer: 'https://etherscan.io/address/',
      hasQuickAmounts: true,
      tokens: ['USDC', 'USDT', 'ETH']
    },
    BASE: {
      address: process.env.NEXT_PUBLIC_BASE_WALLET || '',
      name: 'Base Network',
      color: '#0052ff',
      explorer: 'https://basescan.org/address/',
      hasQuickAmounts: true,
      tokens: ['USDC', 'USDT', 'ETH']
    },
    SOL: {
      address: process.env.NEXT_PUBLIC_SOL_WALLET || '',
      name: 'Solana Network',
      color: '#00d18c',
      explorer: 'https://solscan.io/account/',
      hasQuickAmounts: true,
      tokens: ['SOL', 'USDC']
    },
    SUI: {
      address: process.env.NEXT_PUBLIC_SUI_WALLET || '',
      name: 'Sui Network',
      color: '#6fbcf0',
      explorer: 'https://suiexplorer.com/address/',
      hasQuickAmounts: true,
      tokens: ['USDC', 'SUI']
    },
    BTC: {
      address: process.env.NEXT_PUBLIC_BTC_WALLET || '',
      name: 'Bitcoin Network',
      color: '#f7931a',
      explorer: 'https://blockstream.info/address/',
      hasQuickAmounts: false,
      tokens: ['BTC']
    }
  };

  const copyAddress = (address: string, chain: string) => {
    navigator.clipboard.writeText(address);

    const shortAddress = `...${address.slice(-6)}`;
    toast.success(`Address copied! ${shortAddress} ✅`, {
      duration: 3000,
      style: {
        background: '#111827',
        color: '#10b981',
        border: '1px solid rgba(16, 185, 129, 0.3)'
      }
    });
  };

  const ChainTile = ({ chainKey, isPopular, index }: { chainKey: keyof typeof chainInfo; isPopular?: boolean; index?: number }) => {
    const chain = chainInfo[chainKey];
    const [selectedToken, setSelectedToken] = useState(chain.tokens[0]);
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
      copyAddress(chain.address, chainKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    return (
      <div
        className="group relative border rounded-2xl p-6 overflow-hidden w-full transition-all duration-500 hover:scale-[1.03] hover:-translate-y-2"
        style={{
          borderColor: `${chain.color}60`,
          background: 'rgba(15, 23, 42, 0.3)',
          boxShadow: `0 4px 20px rgba(0, 0, 0, 0.3)`,
          animation: `fadeInUp 0.6s ease-out ${(index || 0) * 0.1}s both`
        }}
      >
        {/* Network-specific glow on hover */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-xl -z-10"
          style={{
            background: `radial-gradient(circle at center, ${chain.color}30 0%, transparent 70%)`
          }}
        ></div>

        <div className="relative z-10 space-y-5">
          {/* Header with lift animation */}
          <div className="mb-2 transition-all duration-300 group-hover:-translate-y-1">
            <div className="flex items-center gap-3 mb-2">
              <div
                className="transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
                style={{ filter: `drop-shadow(0 0 8px ${chain.color}60)` }}
              >
                <ChainLogo chain={chainKey} />
              </div>
              <h4
                className="text-white text-lg font-bold tracking-wide transition-all duration-300"
                style={{
                  textShadow: 'none'
                }}
              >
                {chainKey}
              </h4>
            </div>
            <p className="text-sm text-slate-400 transition-colors duration-300" style={{ color: chain.color }}>{chain.name}</p>
          </div>

          {/* QR Code - centered with proper spacing */}
          <div className="flex justify-center py-4">
            <QRCode
              value={chain.address}
              size={128}
              bgColor="white"
              fgColor="#111827"
              level="M"
              className="rounded-xl shadow-lg mx-auto"
              style={{
                padding: '8px'
              }}
            />
          </div>

          {/* Token Selector */}
          {chain.tokens.length > 1 && (
            <div className="mt-6">
              <div className="flex gap-2 justify-center flex-wrap">
                {chain.tokens.map(token => (
                  <button
                    key={token}
                    onClick={() => setSelectedToken(token)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold uppercase transition-all hover:scale-105"
                    style={{
                      background: selectedToken === token ? `${chain.color}40` : 'rgba(75, 85, 99, 0.3)',
                      color: selectedToken === token ? chain.color : '#9ca3af',
                      border: selectedToken === token ? `1px solid ${chain.color}60` : '1px solid transparent'
                    }}
                  >
                    {token}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Address */}
          <div className="bg-slate-800/50 rounded-lg p-4 relative group/addr">
            <div className="text-slate-400 text-xs font-mono break-all leading-relaxed">
              {chain.address}
            </div>
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 bg-slate-900 text-white text-xs rounded-lg opacity-0 group-hover/addr:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg">
              Click Copy to copy address
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex justify-center gap-3">
            <button
              onClick={handleCopy}
              className={`relative flex-1 px-3 py-2.5 rounded-lg text-sm font-semibold uppercase transition-all hover:scale-105 ${copied ? 'animate-pulse' : ''}`}
              style={{
                background: copied ? '#10b98160' : `${chain.color}30`,
                color: copied ? '#10b981' : chain.color,
                border: copied ? '1px solid #10b98180' : `1px solid ${chain.color}60`,
                boxShadow: copied ? '0 0 20px rgba(16, 185, 129, 0.4)' : 'none'
              }}
            >
              {copied ? '✓ Copied!' : '📋 Copy'}
              {copied && (
                <span className="absolute inset-0 rounded-lg bg-green-400/20 animate-ping"></span>
              )}
            </button>
            <button
              onClick={() => window.open(`${chain.explorer}${chain.address}`, '_blank')}
              className="flex-1 px-3 py-2.5 bg-slate-700/30 text-slate-400 rounded-lg text-sm font-semibold uppercase hover:bg-slate-700/50 transition-all hover:scale-105"
              title="View on blockchain explorer"
            >
              🔍 Explorer
            </button>
          </div>

          {/* Quick amounts */}
          {chain.hasQuickAmounts && (
            <div>
              <div className="text-slate-400 text-xs font-semibold mb-3 text-center">Quick amounts ({selectedToken}):</div>
              <div className="flex justify-center gap-2.5">
                {[10, 25, 50].map(amount => (
                  <button
                    key={amount}
                    onClick={(e) => {
                      e.preventDefault();
                      navigator.clipboard.writeText(chain.address).then(() => {
                        setThankYouDetails({
                          amount,
                          token: selectedToken,
                          chain: chain.name,
                          address: chain.address
                        });
                        setShowThankYou(true);
                      });
                    }}
                    className="flex-1 px-2 py-2 bg-green-500/20 text-green-400 border border-green-500/30 rounded-lg text-xs font-bold hover:bg-green-500/40 transition-all hover:scale-105"
                  >
                    ${amount}
                  </button>
                ))}
                <button
                  onClick={() => {
                    toast.success('Use any amount with this address!', {
                      duration: 3000,
                      style: {
                        background: '#111827',
                        color: '#f59e0b',
                        border: '1px solid rgba(245, 158, 11, 0.3)'
                      }
                    });
                  }}
                  className="px-2 py-2 bg-orange-500/20 text-orange-400 rounded-lg text-xs font-bold hover:bg-orange-500/40 transition-all hover:scale-105"
                >
                  Custom
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen relative">
      {/* Background Gradients */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_center,#0E0E10_40%,#060606_100%)]"></div>
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(0,212,242,0.1)_0%,transparent_70%)]"></div>
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,212,242,0.05)_0%,transparent_60%)]"></div>

      {/* Subtle right-side gradient fade for visual balance */}
      <div className="fixed right-0 top-0 w-[40%] h-full bg-gradient-to-l from-[#0a0a0a] to-transparent pointer-events-none -z-10"></div>

      {/* Two-column grid layout */}
      <div className="max-w-7xl mx-auto px-6 pt-16 md:pt-24 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12 items-start">
          {/* Main Content Column */}
          <main>
        {/* Enhanced Hero Section */}
        <section className="text-center mb-16 animate-[fadeIn_0.6s_ease-out]">
          {/* Main Title with Glow */}
          <div className="inline-block mb-6 relative">
            {/* Glow effect behind title */}
            <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 animate-pulse"></div>

            <h1 className="relative text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent tracking-tight leading-tight hover:scale-105 transition-transform duration-300 cursor-default">
              Support TheCrypto_B 💜
            </h1>
          </div>

          {/* Mission Statement */}
          <p className="text-xl font-semibold text-gray-200 mb-6 animate-[fadeIn_0.8s_ease-out_0.2s_both]">
            Building free tools for Web3 — powered by community, not paywalls.
          </p>


          <p className="text-base text-gray-400 leading-relaxed max-w-3xl mx-auto mb-8 animate-[fadeIn_1s_ease-out_0.4s_both]">
            Every coffee fuels more innovation. Your support keeps powerful crypto tools free for everyone.
          </p>

          {/* Glowing divider */}
          <div className="w-40 h-[2px] mx-auto bg-gradient-to-r from-transparent via-cyan-500 to-transparent rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)] animate-[fadeIn_1.2s_ease-out_0.6s_both]"></div>
        </section>

        {/* Buy Me a Coffee */}
        <section className="mb-16">
          <div className="max-w-xl mx-auto">
            <div className="bg-slate-900/60 backdrop-blur-xl border border-yellow-500/20 rounded-2xl p-8 text-center hover:border-yellow-400/50 hover:shadow-2xl hover:shadow-yellow-500/20 hover:scale-[1.02] transition-all duration-300">
              <Coffee className="w-16 h-16 text-yellow-500 mx-auto mb-6 animate-pulse" />
              <h3 className="text-2xl font-bold text-white mb-3">Buy Me a Coffee</h3>
              <p className="text-gray-400 text-base mb-8 leading-relaxed">Quick & easy way to show support</p>
              <a
                href={process.env.NEXT_PUBLIC_BMC_URL || 'https://buymeacoffee.com/thecryptob'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 hover:scale-105 text-white font-semibold text-sm rounded-lg shadow-lg transition-all duration-300"
              >
                <Coffee className="w-5 h-5" />
                Support on BMC
              </a>
            </div>
          </div>
        </section>

        {/* Support Tier Buttons */}
        <section className="mb-16">
          <h2 className="text-xl font-semibold text-center text-gray-200 mb-2">Choose Your Contribution</h2>
          <p className="text-center text-gray-400 mb-8 text-sm">Every tier fuels the mission — pick what feels right for you <span className="text-lg">💙</span></p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 justify-items-center">
            {/* Tier 1: Coffee */}
            <button
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                  toast.success('Scroll down to choose your preferred network!', {
                    duration: 3000,
                    style: {
                      background: '#111827',
                      color: '#06b6d4',
                      border: '1px solid rgba(6, 182, 212, 0.3)'
                    }
                  });
                }
              }}
              className="group relative bg-gradient-to-br from-amber-500/20 to-yellow-500/10 border border-amber-500/30 rounded-xl p-5 text-center hover:border-amber-400/60 hover:shadow-[0_0_25px_rgba(245,158,11,0.25)] hover:scale-105 transition-all duration-300 w-full flex flex-col items-center justify-center h-40"
            >
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">☕</div>
              <h3 className="text-lg font-bold text-amber-300 mb-2">Coffee</h3>
              <p className="text-2xl font-extrabold text-white mb-2">$5</p>
              <p className="text-xs text-gray-400 leading-relaxed">Quick thanks</p>
            </button>

            {/* Tier 2: Fuel */}
            <button
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                  toast.success('Scroll down to choose your preferred network!', {
                    duration: 3000,
                    style: {
                      background: '#111827',
                      color: '#06b6d4',
                      border: '1px solid rgba(6, 182, 212, 0.3)'
                    }
                  });
                }
              }}
              className="group relative bg-gradient-to-br from-cyan-500/20 to-blue-500/10 border border-cyan-500/30 rounded-xl p-5 text-center hover:border-cyan-400/60 hover:shadow-[0_0_25px_rgba(6,182,212,0.25)] hover:scale-105 transition-all duration-300 w-full flex flex-col items-center justify-center h-40"
            >
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">🚀</div>
              <h3 className="text-lg font-bold text-cyan-300 mb-2">Fuel</h3>
              <p className="text-2xl font-extrabold text-white mb-2">$25</p>
              <p className="text-xs text-gray-400 leading-relaxed">Build faster</p>
            </button>

            {/* Tier 3: Builder */}
            <button
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                  toast.success('Scroll down to choose your preferred network!', {
                    duration: 3000,
                    style: {
                      background: '#111827',
                      color: '#06b6d4',
                      border: '1px solid rgba(6, 182, 212, 0.3)'
                    }
                  });
                }
              }}
              className="group relative bg-gradient-to-br from-purple-500/20 to-pink-500/10 border border-purple-500/30 rounded-xl p-5 text-center hover:border-purple-400/60 hover:shadow-[0_0_25px_rgba(168,85,247,0.25)] hover:scale-105 transition-all duration-300 w-full flex flex-col items-center justify-center h-40"
            >
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">🧠</div>
              <h3 className="text-lg font-bold text-purple-300 mb-2">Builder</h3>
              <p className="text-2xl font-extrabold text-white mb-2">$50</p>
              <p className="text-xs text-gray-400 leading-relaxed">Serious support</p>
            </button>

            {/* Tier 4: OG Supporter */}
            <button
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                  toast.success('Scroll down to choose your preferred network!', {
                    duration: 3000,
                    style: {
                      background: '#111827',
                      color: '#06b6d4',
                      border: '1px solid rgba(6, 182, 212, 0.3)'
                    }
                  });
                }
              }}
              className="group relative bg-gradient-to-br from-emerald-500/20 to-green-500/10 border border-emerald-500/30 rounded-xl p-5 text-center hover:border-emerald-400/60 hover:shadow-[0_0_25px_rgba(16,185,129,0.25)] hover:scale-105 transition-all duration-300 w-full flex flex-col items-center justify-center h-40"
            >
              <div className="absolute top-2 right-2 text-[10px] bg-yellow-500/20 border border-yellow-400/40 text-yellow-300 px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider">VIP</div>
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">💎</div>
              <h3 className="text-lg font-bold text-emerald-300 mb-2">OG</h3>
              <p className="text-2xl font-extrabold text-white mb-2">$100+</p>
              <p className="text-xs text-gray-400 leading-relaxed">Legend status</p>
            </button>
          </div>
        </section>

        {/* Crypto Wallets Grid */}
        <section className="mb-16">
          <h2 className="text-xl font-semibold text-center text-gray-200 mb-2">Choose Your Network</h2>
          <p className="text-center text-gray-400 mb-10 text-sm">
            Select your preferred blockchain to send support directly
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 justify-items-center">
            <ChainTile chainKey="METAMASK" isPopular={true} index={0} />
            <ChainTile chainKey="ETH" index={1} />
            <ChainTile chainKey="BASE" index={2} />
            <ChainTile chainKey="SOL" index={3} />
            <ChainTile chainKey="SUI" index={4} />
            <ChainTile chainKey="BTC" index={5} />
          </div>
        </section>
          </main>

          {/* Right Sidebar - Thank You Box */}
          <aside className="lg:sticky lg:top-24">
            <div className="relative bg-[#0a0a0a]/90 border border-white/10 rounded-xl pt-14 px-8 pb-8 max-w-sm mx-auto overflow-hidden shadow-[0_0_25px_#00ffff15] backdrop-blur-xl">
              {/* Decorative glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.08)_0%,transparent_70%)] pointer-events-none"></div>

              <div className="relative z-10">
                <div className="text-4xl mb-5 mt-4 text-center">🙏</div>

                <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent mb-5 leading-tight text-center">
                  Thank You for Being Here
                </h3>

                <div className="space-y-4 text-sm text-gray-400 leading-relaxed">
                  <p>
                    Building <span className="text-cyan-400 font-semibold">TheCrypto_B Hub</span> and all these tools is my passion project. Every line of code, every feature, every late night, it's all fueled by the belief that powerful, useful tools should be <span className="text-purple-400 font-semibold">free, accessible, and built with purpose</span>.
                  </p>

                  <p>
                    Your support, whether it's <span className="text-yellow-400 font-semibold">$5 or $500</span>, means the world to me. It's not just financial help; it's <span className="text-emerald-400 font-semibold">validation that what I'm building truly matters</span>.
                  </p>

                  <p className="text-sm font-semibold text-gray-200">
                    You're not just supporting a developer, you're supporting a vision of open innovation, where technology and creativity empower everyone. 💙
                  </p>
                </div>

                {/* Signature */}
                <div className="mt-6 pt-6 border-t border-cyan-500/20 text-center">
                  <p className="text-gray-400 text-sm mb-1">With gratitude,</p>
                  <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-400">
                    TheCrypto_B
                  </p>
                  <p className="text-gray-500 text-xs mt-1">Builder • Creator • Innovator</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Thank You Popup */}
      {showThankYou && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-5">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-2xl p-8 max-w-lg w-full text-center relative">
            <button
              onClick={() => setShowThankYou(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-white text-2xl"
            >
              ×
            </button>

            <div className="text-5xl mb-4">🙏</div>
            <h2 className="text-white text-3xl font-bold mb-2">
              Thank You for Your Support!
            </h2>
            <p className="text-slate-400 text-base mb-6">
              Your contribution helps us maintain and improve TheCrypto_B Hub
            </p>

            <div className="bg-slate-950 border border-slate-700 rounded-xl p-5 mb-6 text-left">
              <h3 className="text-white text-lg font-bold mb-3">📋 Instructions:</h3>
              <div className="text-slate-300 text-sm space-y-2">
                <p><strong>1.</strong> The wallet address has been copied to your clipboard</p>
                <p><strong>2.</strong> Open your crypto wallet (MetaMask, Trust Wallet, etc.)</p>
                <p><strong>3.</strong> Paste the address in the recipient field</p>
                <p><strong>4.</strong> Send <span className="text-green-400 font-bold">${thankYouDetails.amount} {thankYouDetails.token}</span> on {thankYouDetails.chain}</p>
                <p className="text-slate-500 text-xs italic">
                  Address: {thankYouDetails.address.slice(0, 10)}...{thankYouDetails.address.slice(-8)}
                </p>
              </div>
            </div>

            <div className="flex gap-3 justify-center">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(thankYouDetails.address);
                  toast.success('Address copied again!', { duration: 2000 });
                }}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-bold text-sm transition-all"
              >
                📋 Copy Address
              </button>
              <button
                onClick={() => setShowThankYou(false)}
                className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg font-bold text-sm transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <Toaster position="top-right" />
    </div>
  );
}
