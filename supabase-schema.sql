-- B-Dashboard Analytics Database Schema for Supabase
-- Run this in your Supabase SQL Editor

-- Analytics Events Table
CREATE TABLE IF NOT EXISTS analytics_events (
  id TEXT PRIMARY KEY,
  timestamp BIGINT NOT NULL,
  event_type TEXT NOT NULL CHECK (event_type IN ('pageview', 'click', 'widget_view', 'widget_embed', 'app_click')),
  page TEXT,
  session_id TEXT,

  -- Click data
  target TEXT,
  app_name TEXT,
  button_type TEXT,

  -- Widget data
  widget_type TEXT,
  widget_id TEXT,
  embed_domain TEXT,

  -- User/Device data
  referrer TEXT,
  user_agent TEXT,
  screen_size TEXT,
  device TEXT CHECK (device IN ('mobile', 'tablet', 'desktop')),
  browser TEXT,
  os TEXT,

  -- Geographic data
  country TEXT,
  city TEXT,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Analytics Sessions Table
CREATE TABLE IF NOT EXISTS analytics_sessions (
  session_id TEXT PRIMARY KEY,
  start_time BIGINT NOT NULL,
  end_time BIGINT,
  duration BIGINT,
  page_views INTEGER DEFAULT 0,
  events INTEGER DEFAULT 0,
  country TEXT,
  city TEXT,
  device TEXT,
  browser TEXT,
  os TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_events_timestamp ON analytics_events(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_events_type ON analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_events_session ON analytics_events(session_id);
CREATE INDEX IF NOT EXISTS idx_events_page ON analytics_events(page);
CREATE INDEX IF NOT EXISTS idx_events_country ON analytics_events(country);
CREATE INDEX IF NOT EXISTS idx_sessions_start ON analytics_sessions(start_time DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_sessions ENABLE ROW LEVEL SECURITY;

-- Create policies for public insert (for tracking)
CREATE POLICY "Allow public insert on analytics_events"
  ON analytics_events
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public insert on analytics_sessions"
  ON analytics_sessions
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public update on analytics_sessions"
  ON analytics_sessions
  FOR UPDATE
  TO anon
  USING (true);

-- Create policies for authenticated read (for dashboard)
CREATE POLICY "Allow authenticated read on analytics_events"
  ON analytics_events
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated read on analytics_sessions"
  ON analytics_sessions
  FOR SELECT
  TO authenticated
  USING (true);

-- Function to update session
CREATE OR REPLACE FUNCTION update_session_stats()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE analytics_sessions
  SET
    events = events + 1,
    page_views = CASE
      WHEN NEW.event_type = 'pageview' THEN page_views + 1
      ELSE page_views
    END,
    updated_at = NOW()
  WHERE session_id = NEW.session_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update session stats
CREATE TRIGGER update_session_on_event
  AFTER INSERT ON analytics_events
  FOR EACH ROW
  EXECUTE FUNCTION update_session_stats();

-- View for dashboard quick stats
CREATE OR REPLACE VIEW dashboard_stats AS
SELECT
  COUNT(DISTINCT session_id) as total_sessions,
  COUNT(*) FILTER (WHERE event_type = 'pageview') as total_pageviews,
  COUNT(*) FILTER (WHERE event_type = 'click') as total_clicks,
  COUNT(*) FILTER (WHERE event_type = 'app_click') as total_app_clicks,
  COUNT(*) FILTER (WHERE event_type = 'widget_view') as total_widget_views,
  COUNT(*) FILTER (WHERE event_type = 'widget_embed') as total_widget_embeds,
  COUNT(DISTINCT country) as countries_count,
  AVG(duration) FILTER (WHERE duration > 0) as avg_session_duration
FROM analytics_events
LEFT JOIN analytics_sessions USING (session_id)
WHERE timestamp > EXTRACT(EPOCH FROM (NOW() - INTERVAL '30 days')) * 1000;
