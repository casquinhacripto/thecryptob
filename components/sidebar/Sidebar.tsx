'use client';

import { useSidebar } from './SidebarContext';
import { Home, Grid3x3, Heart, BookOpen, Info, Menu, X, Pin, PinOff, Twitter, Youtube } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

// Custom icon components for social media
const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const CMCIcon = ({ className }: { className?: string }) => (
  <Image src="/cmc-logo.png" alt="CMC" width={20} height={20} className={className} unoptimized />
);

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

// Organized menu structure with sections
const menuSections = [
  {
    title: 'MAIN',
    items: [
      { icon: Home, label: 'Home', href: '/' },
      { icon: Grid3x3, label: 'Apps', href: '/apps' },
      { icon: Heart, label: 'Support', href: '/support' },
      { icon: BookOpen, label: 'Alpha Feed', href: '/alpha' },
      { icon: Info, label: 'About', href: '/about' },
    ]
  },
  {
    title: 'COMMUNITY',
    items: [
      { icon: TwitterIcon, label: 'X', href: process.env.NEXT_PUBLIC_TWITTER_URL || 'https://x.com', external: true },
      { icon: YoutubeIcon, label: 'Youtube', href: process.env.NEXT_PUBLIC_YOUTUBE_URL || 'https://youtube.com', external: true },
      { icon: CMCIcon, label: 'CMC', href: process.env.NEXT_PUBLIC_CMC_URL || 'https://coinmarketcap.com', external: true },
      { icon: TikTokIcon, label: 'TikTok', href: 'https://tiktok.com', external: true },
    ]
  }
];

export default function Sidebar() {
  const { isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen, isPinned, setIsPinned } = useSidebar();
  const pathname = usePathname();

  // Hover handlers for auto-expand/collapse
  const handleMouseEnter = () => {
    if (!isPinned) {
      setIsCollapsed(false);
    }
  };

  const handleMouseLeave = () => {
    if (!isPinned) {
      setIsCollapsed(true);
    }
  };

  const togglePin = () => {
    setIsPinned(!isPinned);
    if (!isPinned) {
      setIsCollapsed(false);
    }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 bg-slate-900/90 backdrop-blur-xl border border-cyan-500/20 rounded-lg text-cyan-300 hover:bg-slate-800/90 transition-all"
      >
        {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar with Enhanced Depth */}
      <aside
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`
          fixed top-0 left-0 h-full z-40
          bg-gradient-to-b from-[#0E0F11] to-[#090A0B]
          backdrop-blur-lg
          border-r border-[#00d4f2]/10
          shadow-[2px_0_10px_rgba(0,0,0,0.5),0_0_25px_-5px_rgba(0,212,242,0.15)]
          shadow-inner shadow-black/40
          transition-all duration-300 ease-in-out
          ${isCollapsed ? 'w-20' : 'w-56'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* Inner wrapper - controls all content padding */}
        <div className="flex flex-col h-full w-full">
          <div className={`w-full flex flex-col h-full ${isCollapsed ? 'px-0' : 'px-6'}`}>
            {/* Header - Logo Section with CryptoSmart-Inspired Spacing */}
            <div
              className={`mb-0 relative border-b border-white/[0.06] ${isCollapsed ? 'px-2' : ''}`}
              style={{ paddingTop: '44px', paddingBottom: '36px' }}
            >
          {/* Enhanced Radial Glow Behind Logo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[radial-gradient(circle_at_center,rgba(255,165,0,0.15)_0%,transparent_70%)] blur-3xl pointer-events-none animate-[pulse_4s_ease-in-out_infinite]"></div>

          {/* Subtle Bottom Divider */}
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent"></div>

          <div className="flex items-center justify-center relative">
            <Link href="/" className="flex items-center justify-center relative group cursor-pointer">
              {/* Premium Multi-Layer Radial Glow - Orange/Cyan Theme */}
              <div className="absolute inset-0 -m-16 bg-[radial-gradient(circle_at_center,rgba(255,165,0,0.4)_0%,rgba(255,127,48,0.2)_25%,rgba(0,212,242,0.15)_50%,transparent_70%)] rounded-full blur-[80px] opacity-60 animate-[pulse_6s_ease-in-out_infinite] group-hover:opacity-80 transition-opacity duration-700"></div>
              <div className="absolute inset-0 -m-12 bg-[radial-gradient(circle_at_center,rgba(255,127,48,0.3)_0%,rgba(0,212,242,0.2)_40%,transparent_65%)] rounded-full blur-[60px] opacity-50 animate-[pulse_4s_ease-in-out_infinite_1s]"></div>
              <div className="absolute inset-0 -m-8 bg-[radial-gradient(circle_at_center,rgba(255,165,0,0.25)_0%,transparent_60%)] rounded-full blur-[40px] opacity-70"></div>

              {/* Subtle rotating glow ring */}
              <div className="absolute inset-0 -m-10 bg-gradient-to-r from-[#FFA500]/20 via-[#00d4f2]/20 to-[#FFA500]/20 rounded-full blur-[50px] opacity-40 animate-spin-slow"></div>

              {/* Logo - Bigger Size (100px) */}
              <Image
                src="/logo.png"
                alt="TheCrypto_B Logo"
                width={isCollapsed ? 56 : 200}
                height={isCollapsed ? 56 : 200}
                className={`object-contain relative z-10 transition-all duration-300 group-hover:scale-110 drop-shadow-[0_0_30px_rgba(255,165,0,0.4)] ${isCollapsed ? 'w-14 h-14' : 'w-[100px] h-[100px]'}`}
                style={{ background: 'transparent' }}
                unoptimized
              />
            </Link>

            {/* Pin/Unpin Button (Desktop Only) */}
            {!isCollapsed && (
              <button
                onClick={togglePin}
                className="hidden md:flex items-center justify-center w-8 h-8 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 border border-[#00d4f2]/30 hover:border-[#00d4f2]/50 text-[#00d4f2] transition-all absolute top-2 right-2"
                title={isPinned ? 'Unpin sidebar' : 'Pin sidebar'}
              >
                {isPinned ? <Pin className="w-4 h-4" /> : <PinOff className="w-4 h-4" />}
              </button>
            )}
          </div>
        </div>

            {/* Navigation with Professional Zoned Structure */}
            <nav className="flex-1 overflow-y-auto" style={{ marginTop: '20px' }}>
              {menuSections.map((section, sectionIndex) => (
              <div key={section.title}>
                {/* Subtle divider between sections */}
                {sectionIndex > 0 && !isCollapsed && (
                  <div className="border-t border-white/5 my-8"></div>
                )}

                <div className={sectionIndex > 0 && isCollapsed ? 'mt-10' : ''}>
                  {/* Section Header - CryptoSmart Style */}
                  {!isCollapsed && (
                    <div className="mb-2">
                      <h3 className="text-[11px] font-bold tracking-[1.5px] text-[#7A7F88] uppercase">
                        {section.title}
                      </h3>
                    </div>
                  )}

                {/* Section Items with proper spacing */}
                <div className="space-y-5">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  const isExternal = 'external' in item && item.external;

                  const linkProps = isExternal ? {
                    target: "_blank",
                    rel: "noopener noreferrer"
                  } : {};

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      {...linkProps}
                      onClick={() => setIsMobileOpen(false)}
                      className={`
                        relative flex items-center rounded-xl h-10
                        transition-all duration-200 ease-in-out group overflow-hidden
                        ${isCollapsed ? 'justify-center px-4' : 'gap-4 pl-4 pr-4'}
                        ${
                          isActive
                            ? 'bg-gradient-to-r from-[rgba(255,165,0,0.2)] to-[rgba(255,165,0,0.05)] text-white shadow-[0_0_10px_rgba(255,165,0,0.2)]'
                            : 'text-gray-400 hover:text-[#00d4f2] hover:bg-gradient-to-r hover:from-white/10 hover:to-transparent'
                        }
                      `}
                    >
                      {/* Premium Left Border - 3px */}
                      <div className={`absolute left-0 w-[3px] h-full bg-[#FFA500] transition-all duration-300 ease-in-out origin-top rounded-r ${
                        isActive ? 'scale-y-100 shadow-[0_0_10px_rgba(255,165,0,0.6)]' : 'scale-y-0 group-hover:scale-y-50'
                      }`}></div>

                      {/* Icon with Hover Scale + Glow */}
                      <div className="relative flex items-center justify-center">
                        {isActive && (
                          <div className="absolute inset-0 bg-[#ff7f30] rounded-lg blur-md opacity-40 animate-pulse"></div>
                        )}
                        <Icon className={`w-5 h-5 flex-shrink-0 relative z-10 transition-all duration-300 ease-in-out group-hover:scale-105 ${
                          isActive
                            ? 'text-[#FFA500] drop-shadow-[0_0_8px_rgba(255,165,0,0.8)]'
                            : 'text-gray-500 group-hover:text-[#00d4f2] group-hover:drop-shadow-[0_0_6px_rgba(0,212,242,0.4)]'
                        }`} />
                      </div>

                      {/* Label with Fade Animation */}
                      {!isCollapsed && (
                        <span className={`font-semibold text-sm tracking-wide transition-all duration-300 ${
                          isActive ? 'opacity-100' : 'opacity-90 group-hover:opacity-100'
                        }`}>
                          {item.label}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
              </div>
              </div>
            ))}
            </nav>

            {/* Footer - Version */}
            <div className="mt-auto p-6 border-t border-white/5">
          {!isCollapsed ? (
            <div className="text-xs text-center text-[#7A7F88] font-medium tracking-wider">
              v1.0.0
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#00d4f2] to-[#ff7f30] animate-pulse"></div>
            </div>
          )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
