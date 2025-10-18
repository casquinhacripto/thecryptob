// Analytics Tracking System for B-Dashboard
// Tracks page views, events, widget usage, and user behavior

export interface AnalyticsEvent {
  id: string;
  timestamp: number;
  type: 'pageview' | 'click' | 'widget_view' | 'widget_embed' | 'app_click' | 'custom';
  page?: string;
  data?: {
    // Page View Data
    referrer?: string;
    userAgent?: string;
    screenSize?: string;

    // Click Data
    target?: string;
    appName?: string;
    buttonType?: string;

    // Widget Data
    widgetType?: string;
    embedDomain?: string;
    widgetId?: string;

    // User Data
    sessionId?: string;
    country?: string;
    city?: string;
    device?: 'mobile' | 'tablet' | 'desktop';
    browser?: string;
    os?: string;
  };
}

export interface AnalyticsSession {
  sessionId: string;
  startTime: number;
  endTime?: number;
  duration?: number;
  pageViews: number;
  events: number;
  country?: string;
  city?: string;
  device?: string;
  browser?: string;
  os?: string;
}

// Generate unique session ID
export function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Get or create session
export function getOrCreateSession(): string {
  if (typeof window === 'undefined') return '';

  let sessionId = sessionStorage.getItem('b_session_id');
  if (!sessionId) {
    sessionId = generateSessionId();
    sessionStorage.setItem('b_session_id', sessionId);
    sessionStorage.setItem('b_session_start', Date.now().toString());
  }
  return sessionId;
}

// Get device info
export function getDeviceInfo() {
  if (typeof window === 'undefined') return {};

  const ua = navigator.userAgent;
  const screenWidth = window.screen.width;

  let device: 'mobile' | 'tablet' | 'desktop' = 'desktop';
  if (screenWidth < 768) device = 'mobile';
  else if (screenWidth < 1024) device = 'tablet';

  let browser = 'Unknown';
  if (ua.includes('Chrome')) browser = 'Chrome';
  else if (ua.includes('Firefox')) browser = 'Firefox';
  else if (ua.includes('Safari')) browser = 'Safari';
  else if (ua.includes('Edge')) browser = 'Edge';

  let os = 'Unknown';
  if (ua.includes('Windows')) os = 'Windows';
  else if (ua.includes('Mac')) os = 'macOS';
  else if (ua.includes('Linux')) os = 'Linux';
  else if (ua.includes('Android')) os = 'Android';
  else if (ua.includes('iOS')) os = 'iOS';

  return {
    device,
    browser,
    os,
    screenSize: `${window.screen.width}x${window.screen.height}`,
    userAgent: ua,
  };
}

// Track page view
export async function trackPageView(page: string) {
  if (typeof window === 'undefined') return;

  const sessionId = getOrCreateSession();
  const deviceInfo = getDeviceInfo();

  const event: AnalyticsEvent = {
    id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: Date.now(),
    type: 'pageview',
    page,
    data: {
      referrer: document.referrer,
      sessionId,
      ...deviceInfo,
    },
  };

  await sendAnalyticsEvent(event);
}

// Track click event
export async function trackClick(target: string, appName?: string, buttonType?: string) {
  if (typeof window === 'undefined') return;

  const sessionId = getOrCreateSession();
  const deviceInfo = getDeviceInfo();

  const event: AnalyticsEvent = {
    id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: Date.now(),
    type: 'click',
    page: window.location.pathname,
    data: {
      target,
      appName,
      buttonType,
      sessionId,
      ...deviceInfo,
    },
  };

  await sendAnalyticsEvent(event);
}

// Track widget view
export async function trackWidgetView(widgetType: string, widgetId?: string) {
  if (typeof window === 'undefined') return;

  const sessionId = getOrCreateSession();
  const deviceInfo = getDeviceInfo();

  const event: AnalyticsEvent = {
    id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: Date.now(),
    type: 'widget_view',
    page: window.location.pathname,
    data: {
      widgetType,
      widgetId,
      embedDomain: window.location.hostname,
      sessionId,
      ...deviceInfo,
    },
  };

  await sendAnalyticsEvent(event);
}

// Track widget embed (when someone copies widget code)
export async function trackWidgetEmbed(widgetType: string) {
  if (typeof window === 'undefined') return;

  const sessionId = getOrCreateSession();
  const deviceInfo = getDeviceInfo();

  const event: AnalyticsEvent = {
    id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: Date.now(),
    type: 'widget_embed',
    page: window.location.pathname,
    data: {
      widgetType,
      sessionId,
      ...deviceInfo,
    },
  };

  await sendAnalyticsEvent(event);
}

// Track app click
export async function trackAppClick(appName: string, buttonType: 'demo' | 'waitlist' | 'github') {
  if (typeof window === 'undefined') return;

  const sessionId = getOrCreateSession();
  const deviceInfo = getDeviceInfo();

  const event: AnalyticsEvent = {
    id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: Date.now(),
    type: 'app_click',
    page: window.location.pathname,
    data: {
      appName,
      buttonType,
      sessionId,
      ...deviceInfo,
    },
  };

  await sendAnalyticsEvent(event);
}

// Send analytics event to Supabase
async function sendAnalyticsEvent(event: AnalyticsEvent) {
  try {
    // Check if user consented to cookies
    const cookieConsent = localStorage.getItem('b_cookie_consent');
    if (cookieConsent !== 'accepted') {
      return; // Don't track if user hasn't consented
    }

    // Try to get geolocation from API (free, no API key needed)
    const geoData = await fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .catch(() => ({}));

    if (geoData.country_name) {
      event.data = {
        ...event.data,
        country: geoData.country_name,
        city: geoData.city,
      };
    }

    // Send to analytics API
    await fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event),
    });
  } catch (error) {
    console.error('Analytics error:', error);
  }
}

// Track session duration on page unload
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    const sessionStart = sessionStorage.getItem('b_session_start');
    if (sessionStart) {
      const duration = Date.now() - parseInt(sessionStart);
      navigator.sendBeacon('/api/analytics/session', JSON.stringify({
        sessionId: getOrCreateSession(),
        duration,
      }));
    }
  });
}
