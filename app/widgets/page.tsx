'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

type WidgetSize = 'small' | 'medium' | 'large';

export default function WidgetsPage() {
  const [copied, setCopied] = useState(false);
  const [widgetSize, setWidgetSize] = useState<WidgetSize>('large');

  const widgetSizes = {
    small: { width: 400, height: 300 },
    medium: { width: 600, height: 400 },
    large: { width: 800, height: 500 }
  };

  const embedCode = `<iframe
  src="${process.env.NEXT_PUBLIC_SITE_URL || 'https://thecryptob.com'}/widget/btc"
  width="${widgetSizes[widgetSize].width}"
  height="${widgetSizes[widgetSize].height}"
  frameborder="0"
  style="border-radius: 12px; overflow: hidden;"
  title="TheCrypto_B Live BTC Tracker"
></iframe>`;

  const copyEmbedCode = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen">
      {/* Background Gradients */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_center,#0E0E10_40%,#060606_100%)]"></div>
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(0,212,242,0.1)_0%,transparent_70%)]"></div>
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,212,242,0.05)_0%,transparent_60%)]"></div>

      {/* Main Content - Centered Container */}
      <main className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-16 md:pt-24 pb-32">
        {/* Page Header - Enhanced with Premium Styling (Matching Apps Page) */}
        <div className="mb-24 md:mb-32 animate-[fadeIn_0.6s_ease-out]">
          <div className="h-6"></div>
          <div className="inline-block mb-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent tracking-tight leading-none mb-4 hover:scale-105 transition-transform duration-300 cursor-default">
              Bitcoin Price Tracker
            </h1>
            <div className="h-1 bg-gradient-to-r from-cyan-400/60 via-blue-400/40 to-transparent rounded-full"></div>
          </div>
          <p className="text-white/70 text-base md:text-lg leading-relaxed font-light max-w-3xl ml-0 md:ml-1 mb-4">
            Embed live Bitcoin price tracker on your website — always free, always updated.
          </p>
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 text-sm md:text-base font-semibold tracking-wide ml-0 md:ml-1 mb-8">
            Powered by TheCrypto_B. Built for the crypto community. 100% free forever.
          </p>
          <div className="w-32 h-[2px] bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full ml-0 md:ml-1 shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div>
          <div className="h-6"></div>
        </div>

        <section className="space-y-10">

          {/* Two-Column Layout: Preview Left, Controls Right */}
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10 items-start">
            {/* Left Column - Live Preview */}
            <div className="w-full">
              <div className="bg-[#0a0a0a]/70 backdrop-blur-xl p-6 md:p-8 rounded-2xl border border-white/10 shadow-[0_0_50px_#00ffff15] overflow-hidden transition-all duration-300 hover:shadow-[0_0_60px_#00ffff20]">
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-gray-200 mb-1">Live Preview</h2>
                  <p className="text-sm text-gray-500">See how the widget looks in real-time</p>
                </div>

                <div className="bg-slate-950/80 rounded-xl p-6 flex justify-center items-center border border-white/5 group overflow-hidden">
                  <iframe
                    src={`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/widget/btc`}
                    width={widgetSizes[widgetSize].width}
                    height={widgetSizes[widgetSize].height}
                    className="rounded-xl shadow-[0_0_20px_rgba(0,212,242,0.1)] transition-transform duration-300 group-hover:scale-[1.02] max-w-full"
                    style={{ border: 'none' }}
                    title="TheCrypto_B Live BTC Tracker"
                  />
                </div>

                {/* Powered By Tag */}
                <div className="mt-4 text-right">
                  <p className="text-xs text-gray-600">
                    Powered by <span className="text-cyan-500 font-semibold">TheCrypto_B</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Controls */}
            <div className="w-full lg:w-auto space-y-6">
              {/* Widget Size Selection */}
              <div className="bg-[#0a0a0a]/70 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-[0_0_20px_#00ffff10] space-y-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-200 mb-1">Widget Size</h2>
                  <p className="text-sm text-gray-500">Choose the perfect size for your site</p>
                </div>

                <div className="grid gap-3">
                  <button
                    onClick={() => setWidgetSize('small')}
                    className={`group relative rounded-lg border p-3 text-left transition-all duration-300 ${
                      widgetSize === 'small'
                        ? 'border-cyan-400 bg-cyan-400/10 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                        : 'border-white/10 hover:border-cyan-400/50 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`font-semibold ${widgetSize === 'small' ? 'text-cyan-300' : 'text-gray-300'}`}>
                          Small
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {widgetSizes.small.width} × {widgetSizes.small.height}px
                        </p>
                      </div>
                      {widgetSize === 'small' && (
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                      )}
                    </div>
                  </button>

                  <button
                    onClick={() => setWidgetSize('medium')}
                    className={`group relative rounded-lg border p-3 text-left transition-all duration-300 ${
                      widgetSize === 'medium'
                        ? 'border-cyan-400 bg-cyan-400/10 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                        : 'border-white/10 hover:border-cyan-400/50 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`font-semibold ${widgetSize === 'medium' ? 'text-cyan-300' : 'text-gray-300'}`}>
                          Medium
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {widgetSizes.medium.width} × {widgetSizes.medium.height}px
                        </p>
                      </div>
                      {widgetSize === 'medium' && (
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                      )}
                    </div>
                  </button>

                  <button
                    onClick={() => setWidgetSize('large')}
                    className={`group relative rounded-lg border p-3 text-left transition-all duration-300 ${
                      widgetSize === 'large'
                        ? 'border-cyan-400 bg-cyan-400/10 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                        : 'border-white/10 hover:border-cyan-400/50 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`font-semibold ${widgetSize === 'large' ? 'text-cyan-300' : 'text-gray-300'}`}>
                          Large
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {widgetSizes.large.width} × {widgetSizes.large.height}px
                        </p>
                      </div>
                      {widgetSize === 'large' && (
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                      )}
                    </div>
                  </button>
                </div>
              </div>

              {/* Divider */}
              <hr className="border-white/10 my-4" />

              {/* Embed Code Section */}
              <div className="bg-[#0a0a0a]/70 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-[0_0_20px_#00ffff10] space-y-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-200 mb-1">Embed Code</h2>
                  <p className="text-sm text-gray-500">Copy and paste into your HTML</p>
                </div>

                <div className="relative bg-[#0a0a0a]/90 rounded-xl border border-white/10 p-4 font-mono text-xs text-gray-300 shadow-[inset_0_2px_8px_rgba(0,0,0,0.4)] overflow-x-auto">
                  <pre className="whitespace-pre-wrap break-all leading-relaxed">{embedCode}</pre>
                  <button
                    onClick={copyEmbedCode}
                    className="absolute bottom-3 right-3 p-2 bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 rounded-md hover:bg-cyan-500/20 transition-all duration-300 group"
                    title="Copy code"
                  >
                    {copied ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    )}
                  </button>
                </div>

                <button
                  onClick={copyEmbedCode}
                  className={`w-full inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 ${
                    copied
                      ? 'bg-green-500/20 border border-green-400/40 text-green-300'
                      : 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/40 text-cyan-300 hover:from-cyan-500/30 hover:to-blue-500/30 hover:border-cyan-400/60 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-5 h-5" />
                      Copied to Clipboard!
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5" />
                      Copy Embed Code
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
