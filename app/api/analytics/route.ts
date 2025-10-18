import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const event = await request.json();

    // Flatten the event data structure for Supabase
    const analyticsEvent = {
      id: event.id,
      timestamp: event.timestamp,
      event_type: event.type,
      page: event.page,
      session_id: event.data?.sessionId,

      // Click data
      target: event.data?.target,
      app_name: event.data?.appName,
      button_type: event.data?.buttonType,

      // Widget data
      widget_type: event.data?.widgetType,
      widget_id: event.data?.widgetId,
      embed_domain: event.data?.embedDomain,

      // User/Device data
      referrer: event.data?.referrer,
      user_agent: event.data?.userAgent,
      screen_size: event.data?.screenSize,
      device: event.data?.device,
      browser: event.data?.browser,
      os: event.data?.os,

      // Geographic data
      country: event.data?.country,
      city: event.data?.city,
    };

    // Insert event into Supabase
    const { error: eventError } = await supabase
      .from('analytics_events')
      .insert([analyticsEvent]);

    if (eventError) {
      console.error('Supabase event insert error:', eventError);
      return NextResponse.json({ error: eventError.message }, { status: 500 });
    }

    // Create or update session if it doesn't exist
    if (event.data?.sessionId) {
      const { data: existingSession } = await supabase
        .from('analytics_sessions')
        .select('*')
        .eq('session_id', event.data.sessionId)
        .single();

      if (!existingSession) {
        const { error: sessionError } = await supabase
          .from('analytics_sessions')
          .insert([{
            session_id: event.data.sessionId,
            start_time: event.timestamp,
            page_views: event.type === 'pageview' ? 1 : 0,
            events: 1,
            country: event.data?.country,
            city: event.data?.city,
            device: event.data?.device,
            browser: event.data?.browser,
            os: event.data?.os,
          }]);

        if (sessionError) {
          console.error('Supabase session insert error:', sessionError);
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Analytics API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    // Check admin password
    const password = request.headers.get('x-admin-password');
    if (password !== process.env.B_DASHBOARD_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '30');
    const startTimestamp = Date.now() - (days * 24 * 60 * 60 * 1000);

    // Fetch events
    const { data: events, error: eventsError } = await supabase
      .from('analytics_events')
      .select('*')
      .gte('timestamp', startTimestamp)
      .order('timestamp', { ascending: false });

    if (eventsError) {
      console.error('Supabase events fetch error:', eventsError);
      return NextResponse.json({ error: eventsError.message }, { status: 500 });
    }

    // Fetch sessions
    const { data: sessions, error: sessionsError } = await supabase
      .from('analytics_sessions')
      .select('*')
      .gte('start_time', startTimestamp)
      .order('start_time', { ascending: false });

    if (sessionsError) {
      console.error('Supabase sessions fetch error:', sessionsError);
      return NextResponse.json({ error: sessionsError.message }, { status: 500 });
    }

    return NextResponse.json({ events, sessions });
  } catch (error) {
    console.error('Analytics GET API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
