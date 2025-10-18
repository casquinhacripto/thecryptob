'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackPageView } from '@/lib/analytics';

export function usePageTracking() {
  const pathname = usePathname();

  useEffect(() => {
    // Don't track the admin dashboard
    if (pathname?.includes('b-admin')) {
      return;
    }

    // Track page view
    if (pathname) {
      trackPageView(pathname);
    }
  }, [pathname]);
}
