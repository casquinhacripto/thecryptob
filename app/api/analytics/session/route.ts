import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { sessionId, duration } = await request.json();

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID required' }, { status: 400 });
    }

    // Update session with end time and duration
    const { error } = await supabase
      .from('analytics_sessions')
      .update({
        end_time: Date.now(),
        duration,
        updated_at: new Date().toISOString(),
      })
      .eq('session_id', sessionId);

    if (error) {
      console.error('Supabase session update error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Session API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
