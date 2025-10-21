'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Eye, Users, Clock, MousePointer, Globe, Smartphone,
  TrendingUp, TrendingDown, BarChart3, Activity, Lock, LogOut, RefreshCw, Calendar, ArrowUp, ArrowDown,
  Sparkles, Zap, Target
} from 'lucide-react';
import {
  AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

interface DashboardStats {
  totalPageviews: number;
  uniqueVisitors: number;
  avgSessionDuration: number;
  totalClicks: number;
  appClicks: number;
  widgetViews: number;
  widgetEmbeds: number;
  countries: number;
}

interface AnalyticsEvent {
  id: string;
  timestamp: number;
  event_type: string;
  page?: string;
  session_id?: string;
  country?: string;
  device?: string;
  browser?: string;
  app_name?: string;
}

interface AnalyticsSession {
  session_id: string;
  start_time: number;
  end_time: number;
  duration: number;
  page_views: number;
  events: number;
  device?: string;
  browser?: string;
  os?: string;
}

export default function BDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dateRange, setDateRange] = useState<'realtime' | '1' | '7' | '30' | '90'>('30');

  const [stats, setStats] = useState<DashboardStats>({
    totalPageviews: 0,
    uniqueVisitors: 0,
    avgSessionDuration: 0,
    totalClicks: 0,
    appClicks: 0,
    widgetViews: 0,
    widgetEmbeds: 0,
    countries: 0,
  });

  const [previousStats, setPreviousStats] = useState<DashboardStats>({
    totalPageviews: 0,
    uniqueVisitors: 0,
    avgSessionDuration: 0,
    totalClicks: 0,
    appClicks: 0,
    widgetViews: 0,
    widgetEmbeds: 0,
    countries: 0,
  });

  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [, setSessions] = useState<AnalyticsSession[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    // Check if already authenticated in session
    const auth = sessionStorage.getItem('b_dashboard_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
      fetchAnalytics();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Refetch data when dateRange changes
  useEffect(() => {
    if (isAuthenticated) {
      fetchAnalytics();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRange]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Check password (will be validated server-side too)
    if (password) {
      sessionStorage.setItem('b_dashboard_auth', 'true');
      sessionStorage.setItem('b_dashboard_password', password);
      setIsAuthenticated(true);
      fetchAnalytics();
    } else {
      setError('Please enter password');
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('b_dashboard_auth');
    sessionStorage.removeItem('b_dashboard_password');
    setIsAuthenticated(false);
    setPassword('');
  };

  const fetchAnalytics = async () => {
    try {
      setRefreshing(true);
      const storedPassword = sessionStorage.getItem('b_dashboard_password');

      // Convert realtime to 0.04 days (1 hour)
      const daysParam = dateRange === 'realtime' ? '0.04' : dateRange;

      // Fetch current period
      const response = await fetch(`/api/analytics?days=${daysParam}`, {
        headers: {
          'x-admin-password': storedPassword || '',
        },
      });

      if (response.status === 401) {
        setError('Invalid password');
        handleLogout();
        return;
      }

      const data = await response.json();

      if (data.error) {
        setError(data.error);
        return;
      }

      const analyticsEvents: AnalyticsEvent[] = data.events || [];
      const analyticsSessions: AnalyticsSession[] = data.sessions || [];

      console.log('[Dashboard] Received data:', {
        events: analyticsEvents.length,
        sessions: analyticsSessions.length,
        sampleEvent: analyticsEvents[0],
        sampleSession: analyticsSessions[0]
      });

      setEvents(analyticsEvents);
      setSessions(analyticsSessions);

      // Calculate current stats
      const uniqueSessions = new Set(analyticsEvents.map((e) => e.session_id)).size;
      const totalPageviews = analyticsEvents.filter((e) => e.event_type === 'pageview').length;
      const totalClicks = analyticsEvents.filter((e) => e.event_type === 'click').length;
      const appClicks = analyticsEvents.filter((e) => e.event_type === 'app_click').length;
      const widgetViews = analyticsEvents.filter((e) => e.event_type === 'widget_view').length;
      const widgetEmbeds = analyticsEvents.filter((e) => e.event_type === 'widget_embed').length;
      const countries = new Set(analyticsEvents.map((e) => e.country).filter(Boolean)).size;

      const avgDuration = analyticsSessions.length > 0
        ? analyticsSessions.reduce((acc, s) => acc + (s.duration || 0), 0) / analyticsSessions.length
        : 0;

      const calculatedStats = {
        totalPageviews,
        uniqueVisitors: uniqueSessions,
        avgSessionDuration: avgDuration,
        totalClicks,
        appClicks,
        widgetViews,
        widgetEmbeds,
        countries,
      };

      console.log('[Dashboard] Calculated stats:', calculatedStats);
      console.log('[Dashboard] Event types breakdown:', {
        pageviews: analyticsEvents.filter(e => e.event_type === 'pageview').length,
        clicks: analyticsEvents.filter(e => e.event_type === 'click').length,
        app_clicks: analyticsEvents.filter(e => e.event_type === 'app_click').length,
        widget_views: analyticsEvents.filter(e => e.event_type === 'widget_view').length,
        widget_embeds: analyticsEvents.filter(e => e.event_type === 'widget_embed').length,
        other: analyticsEvents.filter(e => !['pageview', 'click', 'app_click', 'widget_view', 'widget_embed'].includes(e.event_type)).length,
      });

      setStats(calculatedStats);

      // Fetch previous period for comparison (skip for realtime)
      const prevDays = dateRange === 'realtime' ? '0.08' : String(parseInt(dateRange) * 2);
      const prevResponse = await fetch(`/api/analytics?days=${prevDays}`, {
        headers: {
          'x-admin-password': storedPassword || '',
        },
      });

      if (prevResponse.ok) {
        const prevData = await prevResponse.json();
        const now = Date.now();
        const daysValue = dateRange === 'realtime' ? 0.04 : parseInt(dateRange);
        const daysInMs = daysValue * 24 * 60 * 60 * 1000;
        const cutoffTime = now - daysInMs;

        // Filter events from previous period only
        const prevAnalyticsEvents: AnalyticsEvent[] = prevData.events || [];
        const prevAnalyticsSessions: AnalyticsSession[] = prevData.sessions || [];

        const prevEvents = prevAnalyticsEvents.filter((e) => e.timestamp < cutoffTime);
        const prevSessions = prevAnalyticsSessions.filter((s) => s.start_time < cutoffTime);

        const prevUniqueSessions = new Set(prevEvents.map((e) => e.session_id)).size;
        const prevPageviews = prevEvents.filter((e) => e.event_type === 'pageview').length;
        const prevClicks = prevEvents.filter((e) => e.event_type === 'click').length;
        const prevAppClicks = prevEvents.filter((e) => e.event_type === 'app_click').length;
        const prevWidgetViews = prevEvents.filter((e) => e.event_type === 'widget_view').length;
        const prevWidgetEmbeds = prevEvents.filter((e) => e.event_type === 'widget_embed').length;
        const prevCountries = new Set(prevEvents.map((e) => e.country).filter(Boolean)).size;
        const prevAvgDuration = prevSessions.length > 0
          ? prevSessions.reduce((acc, s) => acc + (s.duration || 0), 0) / prevSessions.length
          : 0;

        setPreviousStats({
          totalPageviews: prevPageviews,
          uniqueVisitors: prevUniqueSessions,
          avgSessionDuration: prevAvgDuration,
          totalClicks: prevClicks,
          appClicks: prevAppClicks,
          widgetViews: prevWidgetViews,
          widgetEmbeds: prevWidgetEmbeds,
          countries: prevCountries,
        });
      }
    } catch (err) {
      console.error('Failed to fetch analytics:', err);
      setError('Failed to load analytics data');
    } finally {
      setRefreshing(false);
    }
  };

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        {/* Background gradients */}
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_center,#0E0E10_40%,#060606_100%)]"></div>
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(0,212,242,0.1)_0%,transparent_70%)]"></div>

        <div className="w-full max-w-md">
          <div className="bg-gradient-to-b from-slate-900/95 to-slate-800/95 backdrop-blur-xl border border-cyan-500/20 rounded-2xl shadow-2xl shadow-cyan-500/10 p-8">
            {/* Lock icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 flex items-center justify-center">
                <Lock className="w-8 h-8 text-cyan-400" />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
              B-Dashboard
            </h1>
            <p className="text-white/60 text-sm text-center mb-8">
              Admin analytics dashboard for TheCrypto_B Hub
            </p>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-white/70 mb-2">
                  Admin Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-cyan-500/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  placeholder="Enter your password"
                  required
                />
              </div>

              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold rounded-lg shadow-lg shadow-cyan-500/30 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Verifying...' : 'Access Dashboard'}
              </button>
            </form>

            <p className="text-xs text-white/40 text-center mt-6">
              Unauthorized access is prohibited.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Prepare chart data
  const pagesByDay = events
    .filter(e => e.event_type === 'pageview')
    .reduce((acc: Record<string, number>, event) => {
      const date = new Date(event.timestamp).toLocaleDateString();
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

  const pageviewsChartData = Object.entries(pagesByDay).map(([date, count]) => ({
    date,
    pageviews: count as number,
  })).slice(-7); // Last 7 days

  const deviceData = events.reduce((acc: Record<string, number>, event) => {
    if (event.device) {
      acc[event.device] = (acc[event.device] || 0) + 1;
    }
    return acc;
  }, {});

  const deviceChartData = Object.entries(deviceData).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value: value as number,
  }));

  const topPages = events
    .filter(e => e.event_type === 'pageview' && e.page)
    .reduce((acc: Record<string, number>, event) => {
      acc[event.page!] = (acc[event.page!] || 0) + 1;
      return acc;
    }, {});

  const topPagesData = Object.entries(topPages)
    .map(([page, count]) => ({ page, count: count as number }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const countryData = events
    .filter(e => e.country)
    .reduce((acc: Record<string, number>, event) => {
      acc[event.country!] = (acc[event.country!] || 0) + 1;
      return acc;
    }, {});

  const topCountries = Object.entries(countryData)
    .map(([country, count]) => ({ country, count: count as number }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // App Clicks Breakdown
  const appClicksData = events
    .filter(e => e.event_type === 'app_click' && e.app_name)
    .reduce((acc: Record<string, number>, event) => {
      acc[event.app_name!] = (acc[event.app_name!] || 0) + 1;
      return acc;
    }, {});

  const topAppClicks = Object.entries(appClicksData)
    .map(([app, count]) => ({ app, count: count as number }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const COLORS = ['#06B6D4', '#3B82F6', '#8B5CF6', '#EC4899', '#F59E0B'];

  // Format duration
  const formatDuration = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
  };

  // Calculate percentage change
  const calculateChange = (current: number, previous: number): { percent: number; isPositive: boolean } => {
    if (previous === 0) return { percent: current > 0 ? 100 : 0, isPositive: current > 0 };
    const percent = ((current - previous) / previous) * 100;
    return { percent: Math.abs(percent), isPositive: percent >= 0 };
  };

  // Animated Counter Component
  const AnimatedCounter = ({ value, isTime = false }: { value: number; isTime?: boolean }) => {
    const [displayValue, setDisplayValue] = useState(0);
    const startTimeRef = useRef(Date.now());

    useEffect(() => {
      startTimeRef.current = Date.now();
      const duration = 1000; // 1 second animation
      const startValue = 0;
      const endValue = value;

      const animate = () => {
        const now = Date.now();
        const progress = Math.min((now - startTimeRef.current) / duration, 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = startValue + (endValue - startValue) * easeOutQuart;

        setDisplayValue(Math.floor(current));

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setDisplayValue(endValue);
        }
      };

      requestAnimationFrame(animate);
    }, [value]);

    if (isTime) {
      return <>{formatDuration(displayValue)}</>;
    }
    return <>{displayValue.toLocaleString()}</>;
  };

  // Generate Smart Insights
  const generateInsights = () => {
    const insights = [];

    // Engagement trend
    const pageviewChange = calculateChange(stats.totalPageviews, previousStats.totalPageviews);
    if (pageviewChange.isPositive && pageviewChange.percent > 10) {
      insights.push({
        icon: TrendingUp,
        color: 'text-emerald-400',
        bg: 'bg-emerald-500/10',
        border: 'border-emerald-500/30',
        text: `Engagement up ${pageviewChange.percent.toFixed(1)}% this period. Great momentum!`
      });
    } else if (!pageviewChange.isPositive && pageviewChange.percent > 10) {
      insights.push({
        icon: TrendingDown,
        color: 'text-orange-400',
        bg: 'bg-orange-500/10',
        border: 'border-orange-500/30',
        text: `Pageviews down ${pageviewChange.percent.toFixed(1)}%. Consider boosting content.`
      });
    }

    // Device insights
    const totalDevices = deviceChartData.reduce((sum, d) => sum + (d.value as number), 0);
    const mobileData = deviceChartData.find(d => d.name === 'Mobile');
    if (mobileData && totalDevices > 0) {
      const mobilePercent = ((mobileData.value as number) / totalDevices * 100).toFixed(0);
      insights.push({
        icon: Smartphone,
        color: 'text-cyan-400',
        bg: 'bg-cyan-500/10',
        border: 'border-cyan-500/30',
        text: `${mobilePercent}% of traffic from mobile devices. Mobile-first design working!`
      });
    }

    // Top page insight
    if (topPagesData.length > 0) {
      const topPage = topPagesData[0];
      insights.push({
        icon: Target,
        color: 'text-purple-400',
        bg: 'bg-purple-500/10',
        border: 'border-purple-500/30',
        text: `Top page: "${topPage.page}" with ${topPage.count} views. Focus here for optimization.`
      });
    }

    // Active users insight
    if (stats.uniqueVisitors > 0) {
      const avgPageviewsPerUser = (stats.totalPageviews / stats.uniqueVisitors).toFixed(1);
      insights.push({
        icon: Activity,
        color: 'text-blue-400',
        bg: 'bg-blue-500/10',
        border: 'border-blue-500/30',
        text: `Average ${avgPageviewsPerUser} pages per visitor. ${parseFloat(avgPageviewsPerUser) > 2 ? 'Excellent engagement!' : 'Room to improve content discovery.'}`
      });
    }

    return insights.slice(0, 3); // Show max 3 insights
  };

  const smartInsights = generateInsights();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0F1A] via-[#0E131F] to-[#0B0F1A] flex items-center justify-center p-8 relative">
      {/* Background gradients */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(6,182,212,0.08)_0%,transparent_50%)]"></div>
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_bottom_right,rgba(139,92,246,0.06)_0%,transparent_50%)]"></div>
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.04)_0%,transparent_60%)]"></div>
      {/* Central glow for depth */}
      <div className="absolute inset-0 bg-gradient-radial from-cyan-900/10 via-transparent to-transparent pointer-events-none -z-10"></div>

      <div className="w-full max-w-[1600px] mx-auto px-8">
        {/* Header */}
        <div className="mb-10 pb-8 border-b border-white/5 space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 flex items-center justify-center shadow-lg shadow-cyan-500/10">
                <BarChart3 className="w-7 h-7 text-cyan-400" />
              </div>
              <div>
                <h1 className="text-3xl font-extrabold tracking-wide text-white flex items-center gap-3">
                  B-Dashboard
                  <span className="relative text-xs px-3 py-1.5 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent rounded-lg font-bold tracking-wider animate-[pulse_2s_ease-in-out_infinite]">
                    <span className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-cyan-500/20 rounded-lg border border-green-400/40 shadow-lg shadow-green-500/30 animate-pulse"></span>
                    <span className="relative">LIVE</span>
                  </span>
                </h1>
                <p className="text-[13px] text-gray-400 uppercase tracking-widest mt-2">
                  TheCrypto_B Hub Analytics · {
                    dateRange === 'realtime' ? 'Real-Time (Last Hour)' :
                    dateRange === '1' ? 'Last 24 hours' :
                    `Last ${dateRange} days`
                  }
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={fetchAnalytics}
                disabled={refreshing}
                className="px-4 py-2 rounded-lg bg-white/5 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-400/60 text-cyan-400 text-xs font-semibold tracking-wide transition-all duration-300 flex items-center gap-2 disabled:opacity-50 hover:shadow-lg hover:shadow-cyan-500/20"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/60 text-red-400 text-xs font-semibold tracking-wide transition-all duration-300 flex items-center gap-2 hover:shadow-lg hover:shadow-red-500/20"
              >
                <LogOut className="w-3.5 h-3.5" />
                Logout
              </button>
            </div>
          </div>

          {/* Quick Stats Overview */}
          <div className="flex flex-wrap items-center justify-between text-[13px] text-gray-400 bg-white/5 rounded-xl p-4 gap-4 border border-white/5 overflow-x-auto scrollbar-none">
            <div className="flex items-center gap-2 group cursor-help" title="Total number of page views in the selected period">
              <Eye className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span className="text-gray-500">Total Views:</span>
              <span className="font-bold text-cyan-400 group-hover:text-cyan-300 transition-colors">{stats.totalPageviews.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2 group cursor-help" title="Unique visitors who accessed the site">
              <Users className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span className="text-gray-500">Users:</span>
              <span className="font-bold text-emerald-400 group-hover:text-emerald-300 transition-colors">{stats.uniqueVisitors.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2 group cursor-help" title="Average time users spent on pages in the selected period">
              <Clock className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
              <span className="text-gray-500">Avg Time:</span>
              <span className="font-bold text-purple-400 group-hover:text-purple-300 transition-colors">{formatDuration(stats.avgSessionDuration)}</span>
            </div>
            <div className="flex items-center gap-2 group cursor-help" title="Total click interactions across all elements">
              <MousePointer className="w-4 h-4 text-orange-400 group-hover:scale-110 transition-transform" />
              <span className="text-gray-500">Clicks:</span>
              <span className="font-bold text-orange-400 group-hover:text-orange-300 transition-colors">{stats.totalClicks.toLocaleString()}</span>
            </div>
          </div>

          {/* Date Range Filters */}
          <div className="flex items-center gap-4">
            <Calendar className="w-4 h-4 text-cyan-400" />
            <span className="text-xs text-gray-500 uppercase tracking-widest font-medium">Time Period:</span>
            <div className="flex items-center gap-2">
              {(['realtime', '1', '7', '30', '90'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => {
                    setDateRange(range);
                  }}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                    dateRange === range
                      ? range === 'realtime'
                        ? 'bg-gradient-to-r from-green-500/30 to-cyan-500/30 text-green-400 border border-green-400/50 shadow-lg shadow-green-500/20 animate-pulse'
                        : 'bg-cyan-500/30 text-cyan-400 border border-cyan-500/50 shadow-lg shadow-cyan-500/20'
                      : 'bg-white/5 text-gray-400 border border-white/5 hover:bg-white/10 hover:text-white hover:border-white/10'
                  }`}
                >
                  {range === 'realtime' ? '⚡ Real-Time' : range === '1' ? '24H' : `${range}D`}
                </button>
              ))}
            </div>
          </div>

          {/* Neon Divider */}
          <div className="h-[1px] bg-gradient-to-r from-cyan-400/20 via-purple-500/20 to-transparent" />
        </div>

        {/* Smart Insights Panel */}
        {smartInsights.length > 0 && (
          <div className="mb-10 bg-gradient-to-br from-[#0C1018]/90 via-[#0E131F]/90 to-[#0C1018]/90 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8 shadow-[0_0_30px_rgba(6,182,212,0.1)]">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-6 h-6 text-cyan-400 animate-pulse" />
              <h3 className="text-lg font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent tracking-wide uppercase">
                AI-Powered Insights
              </h3>
              <Zap className="w-5 h-5 text-yellow-400 animate-pulse" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {smartInsights.map((insight, index) => {
                const Icon = insight.icon;
                return (
                  <div
                    key={index}
                    className={`flex items-start gap-4 p-5 ${insight.bg} border ${insight.border} rounded-xl hover:scale-105 transition-all duration-300 shadow-lg`}
                  >
                    <div className={`w-10 h-10 rounded-lg ${insight.bg} border ${insight.border} flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-5 h-5 ${insight.color}`} />
                    </div>
                    <p className={`text-sm ${insight.color} leading-relaxed font-medium`}>{insight.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Top Stats - Main Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {[
            {
              label: 'Total Pageviews',
              current: stats.totalPageviews,
              previous: previousStats.totalPageviews,
              icon: Eye,
              gradient: 'from-cyan-500/20 to-blue-500/20',
              iconColor: 'text-cyan-400',
            },
            {
              label: 'Unique Visitors',
              current: stats.uniqueVisitors,
              previous: previousStats.uniqueVisitors,
              icon: Users,
              gradient: 'from-emerald-500/20 to-cyan-500/20',
              iconColor: 'text-emerald-400',
            },
            {
              label: 'Avg Session Time',
              current: stats.avgSessionDuration,
              previous: previousStats.avgSessionDuration,
              icon: Clock,
              gradient: 'from-purple-500/20 to-pink-500/20',
              iconColor: 'text-purple-400',
              isTime: true,
            },
            {
              label: 'Total Clicks',
              current: stats.totalClicks,
              previous: previousStats.totalClicks,
              icon: MousePointer,
              gradient: 'from-orange-500/20 to-red-500/20',
              iconColor: 'text-orange-400',
            },
          ].map((stat, index) => {
            const Icon = stat.icon;
            const change = calculateChange(stat.current, stat.previous);

            return (
              <div
                key={index}
                className="relative group bg-[#0B101A]/80 backdrop-blur-sm border border-white/5 hover:border-cyan-500/40 rounded-2xl p-8 transition-all duration-300 hover:shadow-[0_0_12px_rgba(0,255,255,0.08)] hover:scale-[1.01] cursor-pointer"
                title={`Previous period: ${stat.isTime ? formatDuration(stat.previous) : stat.previous.toLocaleString()}`}
              >
                <div className="flex items-start justify-between mb-5">
                  <div className={`p-2.5 rounded-full bg-gradient-to-tr ${stat.gradient} ${stat.iconColor} shadow-lg`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className={`flex items-center gap-1.5 text-xs font-bold tracking-wide px-2.5 py-1.5 rounded-lg ${
                    change.isPositive
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      : 'bg-red-500/10 text-red-400 border border-red-500/30'
                  }`}>
                    {change.isPositive ? (
                      <ArrowUp className="w-3.5 h-3.5" />
                    ) : (
                      <ArrowDown className="w-3.5 h-3.5" />
                    )}
                    {change.percent.toFixed(1)}%
                  </div>
                </div>
                <div className="text-4xl font-semibold tracking-tight text-white mb-2">
                  <AnimatedCounter value={stat.current} isTime={stat.isTime} />
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-widest font-medium">{stat.label}</div>

                {/* Subtle hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
              </div>
            );
          })}
        </div>

        {/* Secondary Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          {[
            { label: 'App Clicks', value: stats.appClicks.toLocaleString(), icon: TrendingUp, iconBg: 'bg-emerald-500/10', iconColor: 'text-emerald-400', borderColor: 'border-emerald-500/30' },
            { label: 'Widget Views', value: stats.widgetViews.toLocaleString(), icon: Activity, iconBg: 'bg-blue-500/10', iconColor: 'text-blue-400', borderColor: 'border-blue-500/30' },
            { label: 'Widget Embeds', value: stats.widgetEmbeds.toLocaleString(), icon: BarChart3, iconBg: 'bg-purple-500/10', iconColor: 'text-purple-400', borderColor: 'border-purple-500/30' },
            { label: 'Countries', value: stats.countries.toLocaleString(), icon: Globe, iconBg: 'bg-cyan-500/10', iconColor: 'text-cyan-400', borderColor: 'border-cyan-500/30' },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-[#0C1018]/60 backdrop-blur-sm border border-white/5 hover:border-white/10 rounded-xl p-5 transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-lg ${stat.iconBg} border ${stat.borderColor} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${stat.iconColor}`} />
                  </div>
                  <div className="text-[11px] text-gray-400 uppercase tracking-widest font-medium">{stat.label}</div>
                </div>
                <div className="text-3xl font-bold tracking-tight text-white ml-0">{stat.value}</div>
                <p className="text-[11px] text-gray-500 italic mt-1 ml-0">Last {dateRange === '1' ? '24h' : `${dateRange}d`}</p>
              </div>
            );
          })}
        </div>

        {/* Analytics Sections */}
        <div className="space-y-8">
          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Pageviews Over Time */}
            <div className="bg-[#0C1018]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-8 shadow-[0_0_20px_rgba(0,255,255,0.05)]">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm uppercase tracking-widest text-gray-300 font-bold">Pageviews Over Time</h3>
                <span className="text-[11px] text-gray-400 bg-slate-800/60 px-3 py-1.5 rounded-full border border-white/5">Last 7 days</span>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={pageviewsChartData}>
                  <defs>
                    <linearGradient id="colorPageviews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#06B6D4" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
                  <XAxis
                    dataKey="date"
                    stroke="#64748B"
                    fontSize={11}
                    tickLine={false}
                    axisLine={{ stroke: '#334155', strokeWidth: 1 }}
                  />
                  <YAxis
                    stroke="#64748B"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      background: 'rgba(11, 15, 26, 0.98)',
                      border: '1px solid rgba(6, 182, 212, 0.3)',
                      borderRadius: '12px',
                      boxShadow: '0 8px 16px -4px rgba(0, 0, 0, 0.4)',
                      padding: '12px'
                    }}
                    labelStyle={{ color: '#E2E8F0', fontWeight: 'bold', marginBottom: '4px' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="pageviews"
                    stroke="#06B6D4"
                    strokeWidth={3}
                    fill="url(#colorPageviews)"
                    dot={{ fill: '#06B6D4', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: '#06B6D4', strokeWidth: 0 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Device Breakdown */}
            <div className="bg-[#0C1018]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-8 shadow-[0_0_20px_rgba(0,255,255,0.05)]">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm uppercase tracking-widest text-gray-300 font-bold">Device Breakdown</h3>
                <Smartphone className="w-5 h-5 text-cyan-400" />
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={deviceChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(props) => {
                      const { name, value } = props as unknown as { name: string; value: number };
                      const total = deviceChartData.reduce((sum, entry) => sum + entry.value, 0);
                      const percent = ((value / total) * 100).toFixed(0);
                      return `${name} ${percent}%`;
                    }}
                    outerRadius={90}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {deviceChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: 'rgba(15, 23, 42, 0.95)',
                      border: '1px solid rgba(6, 182, 212, 0.3)',
                      borderRadius: '8px',
                      color: '#E2E8F0'
                    }}
                    itemStyle={{
                      color: '#E2E8F0'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Pages & Countries Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Top Pages */}
            <div className="bg-[#0C1018]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-8 shadow-[0_0_20px_rgba(0,255,255,0.05)]">
              <h3 className="text-sm uppercase tracking-widest text-gray-300 font-bold mb-6 flex items-center gap-2">
                <Eye className="w-5 h-5 text-cyan-400" />
                Top Pages
              </h3>
              <div className="space-y-3">
                {topPagesData.length > 0 ? topPagesData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-3 px-4 bg-slate-800/30 rounded-xl hover:bg-slate-800/50 border border-white/5 hover:border-cyan-500/30 transition-all duration-300 group">
                    <span className="text-sm text-gray-300 font-medium group-hover:text-white transition-colors">{item.page}</span>
                    <span className="text-sm font-bold text-cyan-400 bg-cyan-500/10 px-3 py-1.5 rounded-lg border border-cyan-500/20">{item.count}</span>
                  </div>
                )) : (
                  <div className="text-center py-12 text-gray-500">
                    <Eye className="w-10 h-10 mx-auto mb-3 opacity-20" />
                    <p className="text-sm font-medium">No activity yet</p>
                    <p className="text-xs text-gray-600 mt-1">Waiting for your first visitors 👀</p>
                  </div>
                )}
              </div>
            </div>

            {/* Top Countries */}
            <div className="bg-[#0C1018]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-8 shadow-[0_0_20px_rgba(0,255,255,0.05)]">
              <h3 className="text-sm uppercase tracking-widest text-gray-300 font-bold mb-6 flex items-center gap-2">
                <Globe className="w-5 h-5 text-emerald-400" />
                Top Countries
              </h3>
              <div className="space-y-3">
                {topCountries.length > 0 ? topCountries.map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-3 px-4 bg-slate-800/30 rounded-xl hover:bg-slate-800/50 border border-white/5 hover:border-emerald-500/30 transition-all duration-300 group">
                    <span className="text-sm text-gray-300 font-medium group-hover:text-white transition-colors">{item.country}</span>
                    <span className="text-sm font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">{item.count}</span>
                  </div>
                )) : (
                  <div className="text-center py-12 text-gray-500">
                    <Globe className="w-10 h-10 mx-auto mb-3 opacity-20" />
                    <p className="text-sm font-medium">No geographic data yet</p>
                    <p className="text-xs text-gray-600 mt-1">Start tracking with analytics API 🌍</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* App Clicks Breakdown */}
          {topAppClicks.length > 0 && (
            <div className="bg-[#0C1018]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-8 shadow-[0_0_20px_rgba(0,255,255,0.05)]">
              <h3 className="text-sm uppercase tracking-widest text-gray-300 font-bold mb-6 flex items-center gap-3">
                <MousePointer className="w-5 h-5 text-emerald-400" />
                Most Used Features
                <span className="text-xs px-3 py-1.5 bg-emerald-500/10 text-emerald-400 rounded-lg font-bold border border-emerald-500/20">
                  {stats.appClicks} total
                </span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {topAppClicks.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-3.5 px-5 bg-slate-800/30 rounded-xl hover:bg-slate-800/50 border border-white/5 hover:border-emerald-500/30 transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                        <span className="text-sm font-bold text-emerald-400">{index + 1}</span>
                      </div>
                      <span className="text-sm text-gray-300 font-semibold group-hover:text-white transition-colors">{item.app}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-base font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
                        {item.count}
                      </span>
                      <span className="text-xs text-gray-400 font-medium tracking-wide">
                        {((item.count / stats.appClicks) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Smart Summary Insight */}
        <div className="mt-10 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-transparent border border-cyan-500/20 rounded-xl p-6 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-cyan-400 mb-2 flex items-center gap-2">
                💡 Smart Insight
              </h4>
              {stats.totalPageviews > 0 ? (
                <p className="text-sm text-gray-300 leading-relaxed">
                  {stats.uniqueVisitors > 0 && (
                    <>
                      You have <span className="font-bold text-white">{stats.uniqueVisitors.toLocaleString()}</span> unique visitors
                      {stats.totalPageviews > stats.uniqueVisitors && (
                        <> viewing an average of <span className="font-bold text-cyan-400">{(stats.totalPageviews / stats.uniqueVisitors).toFixed(1)}</span> pages each</>
                      )}.
                      {deviceChartData.length > 0 && (() => {
                        const totalDevices = deviceChartData.reduce((sum, d) => sum + (d.value as number), 0);
                        const mobile = deviceChartData.find(d => d.name === 'Mobile');
                        if (mobile && totalDevices > 0) {
                          const mobilePercent = ((mobile.value as number) / totalDevices * 100).toFixed(0);
                          return <> Most traffic comes from {mobilePercent}% mobile devices.</>;
                        }
                      })()}
                    </>
                  )}
                </p>
              ) : (
                <p className="text-sm text-gray-400 italic">
                  No data yet — your analytics summary will appear here once tracking starts. Connect your analytics API to see real-time insights! 🚀
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-6 bg-[#0C1018]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-8 shadow-[0_0_20px_rgba(0,255,255,0.05)]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm uppercase tracking-widest text-gray-300 font-bold flex items-center gap-2">
              <Activity className="w-5 h-5 text-purple-400" />
              Activity Overview
            </h3>
            <span className="text-[11px] text-gray-400 bg-slate-800/60 px-3 py-1.5 rounded-full border border-white/5">Last 20 events</span>
          </div>
          <div className="space-y-2.5 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900">
            {events.length > 0 ? events.slice(0, 20).map((event) => (
              <div key={event.id} className="flex items-center justify-between py-3.5 px-5 bg-slate-800/25 hover:bg-slate-800/40 rounded-xl border border-white/5 hover:border-purple-500/30 transition-all duration-300 group">
                <div className="flex items-center gap-3.5 flex-1">
                  <span className={`px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-widest ${
                    event.event_type === 'pageview' ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30' :
                    event.event_type === 'click' ? 'bg-blue-500/15 text-blue-300 border border-blue-500/30' :
                    event.event_type === 'app_click' ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30' :
                    'bg-purple-500/15 text-purple-300 border border-purple-500/30'
                  }`}>
                    {event.event_type.replace('_', ' ')}
                  </span>
                  <span className="text-sm text-gray-300 font-semibold group-hover:text-white transition-colors">{event.page || event.app_name || 'Unknown'}</span>
                </div>
                <div className="flex items-center gap-5 text-[11px] text-gray-400">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Globe className="w-3.5 h-3.5" />
                    {event.country || 'Unknown'}
                  </span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <Smartphone className="w-3.5 h-3.5" />
                    {event.device || 'Unknown'}
                  </span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    {new Date(event.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            )) : (
              <div className="text-center py-16 text-gray-500">
                <Activity className="w-14 h-14 mx-auto mb-4 opacity-20" />
                <p className="text-sm font-medium">No activity yet. Start tracking events!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
