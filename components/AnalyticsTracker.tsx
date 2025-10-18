'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Generate session ID (persists in sessionStorage)
const getSessionId = () => {
  if (typeof window === 'undefined') return '';

  let sessionId = sessionStorage.getItem('analytics_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('analytics_session_id', sessionId);
  }
  return sessionId;
};

// Detect device type
const getDeviceType = (): 'mobile' | 'tablet' | 'desktop' => {
  if (typeof window === 'undefined') return 'desktop';
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
};

// Get browser name
const getBrowser = () => {
  if (typeof window === 'undefined') return 'unknown';
  const ua = navigator.userAgent;
  if (ua.includes('Chrome')) return 'Chrome';
  if (ua.includes('Firefox')) return 'Firefox';
  if (ua.includes('Safari')) return 'Safari';
  if (ua.includes('Edge')) return 'Edge';
  return 'Other';
};

// Get OS name
const getOS = () => {
  if (typeof window === 'undefined') return 'unknown';
  const ua = navigator.userAgent;
  if (ua.includes('Windows')) return 'Windows';
  if (ua.includes('Mac')) return 'macOS';
  if (ua.includes('Linux')) return 'Linux';
  if (ua.includes('Android')) return 'Android';
  if (ua.includes('iOS')) return 'iOS';
  return 'Other';
};

// Track event
const trackEvent = async (eventData: { event_type: string; page?: string; app_name?: string }) => {
  try {
    const sessionId = getSessionId();
    const timestamp = Date.now();

    const event = {
      id: `event_${timestamp}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp,
      session_id: sessionId,
      device: getDeviceType(),
      browser: getBrowser(),
      os: getOS(),
      screen_size: `${window.innerWidth}x${window.innerHeight}`,
      user_agent: navigator.userAgent,
      referrer: document.referrer || null,
      ...eventData,
    };

    await supabase.from('analytics_events').insert([event]);
  } catch (error) {
    console.error('Analytics tracking error:', error);
  }
};

// Create or update session
const trackSession = async () => {
  try {
    const sessionId = getSessionId();
    const timestamp = Date.now();

    // Check if session exists
    const { data: existingSession } = await supabase
      .from('analytics_sessions')
      .select('*')
      .eq('session_id', sessionId)
      .single();

    if (existingSession) {
      // Update existing session
      await supabase
        .from('analytics_sessions')
        .update({
          end_time: timestamp,
          duration: timestamp - existingSession.start_time,
          updated_at: new Date().toISOString(),
        })
        .eq('session_id', sessionId);
    } else {
      // Create new session
      await supabase.from('analytics_sessions').insert([
        {
          session_id: sessionId,
          start_time: timestamp,
          end_time: timestamp,
          duration: 0,
          page_views: 0,
          events: 0,
          device: getDeviceType(),
          browser: getBrowser(),
          os: getOS(),
        },
      ]);
    }
  } catch (error) {
    console.error('Session tracking error:', error);
  }
};

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Skip tracking for dashboard
    if (pathname?.includes('/bdashboard')) return;

    // Track pageview
    trackEvent({
      event_type: 'pageview',
      page: pathname,
    });

    // Track/update session
    trackSession();

    // Track clicks on app cards
    const handleAppClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const appCard = target.closest('[data-app-name]');

      if (appCard) {
        const appName = appCard.getAttribute('data-app-name');
        if (appName) {
          trackEvent({
            event_type: 'app_click',
            app_name: appName,
            page: pathname,
          });
        }
      }
    };

    document.addEventListener('click', handleAppClick);

    return () => {
      document.removeEventListener('click', handleAppClick);
    };
  }, [pathname]);

  return null; // This component doesn't render anything
}
