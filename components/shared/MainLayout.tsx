'use client';

import Sidebar from '../sidebar/Sidebar';
import { SidebarProvider, useSidebar } from '../sidebar/SidebarContext';
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

  return (
    <div className="min-h-screen bg-black">
      <Sidebar />
      <main
        style={{ marginLeft }}
        className="transition-all duration-300 min-h-screen px-6 py-8"
      >
        {children}
      </main>
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
