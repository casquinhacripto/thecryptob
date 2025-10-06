'use client';

import { useSidebar } from './SidebarContext';
import { Home, Grid3x3, Heart, BookOpen, Info, Menu, X, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const menuItems = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: Grid3x3, label: 'Apps', href: '/apps' },
  { icon: Heart, label: 'Support', href: '/support' },
  { icon: BookOpen, label: 'Alpha Feed', href: '/alpha' },
  { icon: Info, label: 'About', href: '/about' },
];

export default function Sidebar() {
  const { isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen } = useSidebar();
  const pathname = usePathname();

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

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full z-40
          bg-gradient-to-b from-[#0B0F1F]/90 via-[#070B16]/85 to-[#03060C]/80 backdrop-blur-lg
          border-r border-[#00d4f2]/10 shadow-[0_0_25px_-5px_rgba(0,212,242,0.2)]
          transition-all duration-300 ease-in-out
          ${isCollapsed ? 'w-20' : 'w-64'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* Header - Logo Section */}
        <div className="pt-16 pb-20 px-6 mb-10 border-b border-[#00d4f2]/5">
          <div className="flex items-center justify-center py-10 relative">
            <Link href="/" className="flex items-center justify-center relative group cursor-pointer">
              {/* Very Soft Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#ff7f30]/10 via-[#00d4f2]/10 to-[#ff7f30]/10 rounded-full blur-3xl opacity-25 animate-[pulse_5s_ease-in-out_infinite] group-hover:opacity-40 transition-opacity duration-700"></div>

              {/* Logo with Hover Animation */}
              <Image
                src="/logo.png"
                alt="TheCrypto_B Logo"
                width={isCollapsed ? 48 : 120}
                height={isCollapsed ? 48 : 120}
                className={`object-contain relative z-10 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 ${isCollapsed ? 'w-12 h-12' : 'w-28 h-28'}`}
                unoptimized
              />
            </Link>

            {/* Collapse Button (Desktop Only) */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden md:flex items-center justify-center w-8 h-8 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 border border-[#00d4f2]/30 hover:border-[#00d4f2]/50 text-[#00d4f2] transition-all absolute top-2 right-2"
            >
              {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-4 space-y-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                className={`
                  relative flex items-center gap-6 px-4 py-3.5 rounded-xl
                  transition-all duration-200 group overflow-hidden
                  ${
                    isActive
                      ? 'bg-gradient-to-r from-[#00d4f2]/15 to-[#ff7f30]/10 text-[#00d4f2] shadow-lg shadow-[#00d4f2]/10'
                      : 'text-gray-400 hover:text-[#00d4f2] hover:bg-[#00d4f2]/5'
                  }
                  ${isCollapsed ? 'justify-center' : ''}
                `}
              >
                {/* Neon Left Bar */}
                <div className={`absolute left-0 w-1 h-full bg-gradient-to-b from-[#00d4f2] to-[#ff7f30] transition-transform duration-200 origin-top rounded-r ${
                  isActive ? 'scale-y-100' : 'scale-y-0 group-hover:scale-y-100'
                }`}></div>

                <Icon className={`w-5 h-5 flex-shrink-0 transition-all duration-200 ${isActive ? 'text-[#ff7f30]' : 'text-gray-500 group-hover:text-[#ff7f30]'}`} />
                {!isCollapsed && <span className="font-medium text-sm tracking-wide">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#00d4f2]/10">
          {!isCollapsed ? (
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-4">
                <a
                  href={process.env.NEXT_PUBLIC_TWITTER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#00d4f2] transition-colors p-2 hover:bg-[#00d4f2]/5 rounded-lg"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href={process.env.NEXT_PUBLIC_YOUTUBE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#ff7f30] transition-colors p-2 hover:bg-[#ff7f30]/5 rounded-lg"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
                <a
                  href={process.env.NEXT_PUBLIC_CMC_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#00d4f2] transition-colors p-2 hover:bg-[#00d4f2]/5 rounded-lg"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.12 11.95c-.23-1.14-1.08-1.88-2.23-1.88-.87 0-1.62.47-2.05 1.18l-.03-.09c-.24-.66-.89-1.09-1.62-1.09-.77 0-1.45.48-1.79 1.22v-.97h-1.39v6.36h1.45v-3.26c0-.88.54-1.47 1.31-1.47.74 0 1.14.51 1.14 1.43v3.3h1.45v-3.26c0-.88.54-1.47 1.31-1.47.74 0 1.14.51 1.14 1.43v3.3H20v-3.62c0-.43-.02-.85-.08-1.11zM7.71 15.68c-1.64 0-2.82-1.26-2.82-2.95s1.18-2.95 2.82-2.95c1.01 0 1.88.51 2.36 1.28l-1.11.74c-.28-.42-.76-.69-1.25-.69-.96 0-1.61.72-1.61 1.62s.65 1.62 1.61 1.62c.49 0 .97-.27 1.25-.69l1.11.74c-.48.77-1.35 1.28-2.36 1.28z" />
                  </svg>
                </a>
              </div>
              <div className="text-xs text-center text-gray-500">
                v1.0.0
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#00d4f2] to-[#ff7f30] animate-pulse"></div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
