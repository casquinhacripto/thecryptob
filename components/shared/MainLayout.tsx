'use client';

import Sidebar from '../sidebar/Sidebar';
import { SidebarProvider, useSidebar } from '../sidebar/SidebarContext';
import TickerBar from './TickerBar';
import Footer from './Footer';
import { ReactNode, useEffect, useState } from 'react';

function LayoutContent({ children }: { children: ReactNode }) {
  const { isCollapsed } = useSidebar();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const marginLeft = isMobile ? '0' : (isCollapsed ? '80px' : '256px');
  const paddingLeft = isMobile ? '0' : (isCollapsed ? '32px' : '0');

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Sidebar />
      <div
        style={{ marginLeft, paddingLeft }}
        className="transition-all duration-300 flex flex-col min-h-screen"
      >
        <TickerBar />
        <main className="flex-1 px-6 py-8">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <LayoutContent>{children}</LayoutContent>
    </SidebarProvider>
  );
}
