// Supabase Client Configuration for B-Dashboard Analytics
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Only validate at runtime, not at build time
let supabaseClient: ReturnType<typeof createClient> | null = null;

export const supabase = new Proxy({} as ReturnType<typeof createClient>, {
  get(target, prop: string | symbol) {
    if (!supabaseClient) {
      if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Missing Supabase environment variables');
      }
      supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
    }
    return (supabaseClient as Record<string | symbol, unknown>)[prop];
  }
});

// Types for analytics data
export interface AnalyticsEvent {
  id: string;
  timestamp: number;
  event_type: 'pageview' | 'click' | 'widget_view' | 'widget_embed' | 'app_click';
  page?: string;
  session_id?: string;
  target?: string;
  app_name?: string;
  button_type?: string;
  widget_type?: string;
  widget_id?: string;
  embed_domain?: string;
  referrer?: string;
  user_agent?: string;
  screen_size?: string;
  device?: 'mobile' | 'tablet' | 'desktop';
  browser?: string;
  os?: string;
  country?: string;
  city?: string;
}

export interface AnalyticsSession {
  session_id: string;
  start_time: number;
  end_time?: number;
  duration?: number;
  page_views: number;
  events: number;
  country?: string;
  city?: string;
  device?: string;
  browser?: string;
  os?: string;
}
