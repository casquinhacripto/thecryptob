# TheCrypto_B Hub - Development Guide

## Project Overview
TheCrypto_B Hub is a premium cryptocurrency dashboard built with Next.js 14, featuring real-time Bitcoin tracking, multi-coin ticker, and a beautiful glassmorphic UI.

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Data Source**: Binance WebSocket API & REST API
- **Icons**: Lucide React
- **Animations**: CSS Transitions + Tailwind Animations

## Brand Colors
- **Primary Orange**: `#ff7f30`
- **Primary Cyan**: `#00d4f2`
- **Background**: Pure black (`#000000`)
- **Glassmorphic Sidebar**: Dark gradient with backdrop blur

## Project Structure

```
thecryptob-hub/
├── app/
│   ├── page.tsx              # Home page with Bitcoin price & stats
│   ├── about/                # About page
│   ├── alpha/                # Alpha Feed page
│   ├── apps/                 # Apps page
│   └── support/              # Support page
├── components/
│   ├── bitcoin/
│   │   ├── BitcoinStats.tsx        # 24h stats bar (Low/High, Volume, etc.)
│   │   ├── CoinTickerBar.tsx       # Top scrolling ticker with 50+ coins
│   │   ├── LiveBitcoinPrice.tsx    # Main BTC price display
│   │   └── Sparkline.tsx           # Mini price chart for ticker
│   ├── sidebar/
│   │   ├── Sidebar.tsx             # Premium sidebar navigation
│   │   └── SidebarContext.tsx      # Sidebar state management
│   └── shared/
│       └── MainLayout.tsx          # Main layout with sidebar
├── hooks/
│   ├── useBitcoinPrice.ts          # WebSocket hook for live BTC price
│   └── useMultiCoinTicker.ts       # Hook for 50+ coin ticker data
└── public/
    └── logo.png                     # Official TheCrypto_B logo
```

## Key Components

### 1. LiveBitcoinPrice.tsx
**Purpose**: Display the main Bitcoin price in large, centered format with animated Bitcoin logo.

**Features**:
- Real-time WebSocket connection to Binance
- Splits price into whole and decimal parts
- Animated orange Bitcoin logo with glow effect
- Responsive sizing (mobile: text-7xl, desktop: text-[12rem])

**Data Flow**:
```
Binance WebSocket → useBitcoinPrice hook → LiveBitcoinPrice component
```

**Key Design Elements**:
- Font: `font-mono` for price, `font-extrabold` for weight
- Colors: White text with animated decimal part
- Spacing: Centered with generous margins

### 2. BitcoinStats.tsx
**Purpose**: Display 24-hour Bitcoin statistics in a clean grid.

**Stats Displayed**:
- 24h Low/High (in K format)
- Trading Volume (in B format)
- Market Cap (static $2.5T)
- 24h Price Change (with trend icon)

**Layout**:
- Mobile: 2 columns
- Desktop: 4 columns
- Centered with `max-w-5xl`

**Data Source**: Shares same `useBitcoinPrice` hook with LiveBitcoinPrice

### 3. CoinTickerBar.tsx
**Purpose**: Scrolling ticker bar showing 50+ cryptocurrencies with live prices.

**Features**:
- Auto-scrolling animation (marquee effect)
- Sparkline mini-charts for each coin
- Color-coded price changes (green/red)
- Transparent background with bottom border

**Coins Tracked**: 50+ major cryptocurrencies (BTC, ETH, BNB, SOL, ADA, etc.)

**Refresh**: Updates every 10 seconds via Binance API

### 4. Sidebar.tsx
**Purpose**: Premium glassmorphic sidebar navigation.

**Design Features**:
- **Glass Effect**: `bg-gradient-to-b from-[#0B0F1F]/90 via-[#070B16]/85 to-[#03060C]/80`
- **Backdrop Blur**: `backdrop-blur-lg`
- **Border**: Subtle cyan border with shadow glow
- **Logo Section**:
  - Generous padding (`pt-16 pb-20 px-6 mb-10`)
  - Soft glow effect (opacity 25%, pulse 5s)
  - Hover animation (scale + rotate)
  - Clickable to home page
- **Navigation Items**:
  - Animated neon left bar (cyan to orange gradient)
  - Icon spacing: `gap-6` (24px)
  - Vertical spacing: `space-y-6` (24px)
  - Active state: gradient background with shadow
  - Hover state: cyan text color and background tint
- **Footer**:
  - Social media links (Twitter, YouTube, CMC)
  - Version number display
  - Hover effects with brand colors

**Collapse Feature**:
- Desktop: Collapsible via chevron button
- Mobile: Drawer with overlay
- Width: 256px (expanded) / 80px (collapsed)

### 5. MainLayout.tsx
**Purpose**: Wrapper component providing sidebar and content area.

**Features**:
- Pure black background (`bg-black`)
- Dynamic margin-left based on sidebar state
- Smooth transitions
- Responsive sidebar handling

## Hooks

### useBitcoinPrice.ts
**Purpose**: WebSocket connection for real-time Bitcoin price updates.

**Returns**:
```typescript
{
  price: number;
  priceChangePercent24h: number;
  high24h: number;
  low24h: number;
  volume24h: number;
}
```

**Connection**: `wss://stream.binance.com:9443/ws/btcusdt@ticker`

**Error Handling**: Auto-reconnect on connection loss

### useMultiCoinTicker.ts
**Purpose**: Fetch ticker data for 50+ cryptocurrencies.

**API**: Binance REST API `/api/v3/ticker/24hr`

**Refresh**: Every 10 seconds

**Returns**: Array of coin objects with price, change %, and 24h price history

## Page Layouts

### Home Page (app/page.tsx)
**Structure**:
```
┌─────────────────────────────────────────┐
│ Header: Brand + Ticker Bar              │
├─────────────────────────────────────────┤
│                                          │
│           (Centered Content)             │
│                                          │
│         Bitcoin Logo + Price             │
│                                          │
│                                          │
│           (Large Gap: gap-32)            │
│                                          │
│                                          │
│           Bitcoin Stats Grid             │
│                                          │
├─────────────────────────────────────────┤
│ Footer: Copyright + Message              │
└─────────────────────────────────────────┘
```

**Key Layout Classes**:
- `flex-1 flex flex-col justify-center items-center gap-32` - Creates centered layout with spacing
- `sticky top-0 z-10` - Keeps ticker bar at top

## Styling Patterns

### Glassmorphism
```tsx
className="bg-gradient-to-b from-[#0B0F1F]/90 via-[#070B16]/85 to-[#03060C]/80 backdrop-blur-lg"
```

### Soft Glow Effect
```tsx
className="absolute inset-0 bg-gradient-to-r from-[#ff7f30]/10 via-[#00d4f2]/10 to-[#ff7f30]/10 rounded-full blur-3xl opacity-25 animate-[pulse_5s_ease-in-out_infinite]"
```

### Neon Accent Bar
```tsx
className="absolute left-0 w-1 h-full bg-gradient-to-b from-[#00d4f2] to-[#ff7f30] transition-transform duration-200 origin-top rounded-r"
```

### Hover Animations
```tsx
className="transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
```

## API Integration

### Binance WebSocket (Live BTC Price)
- **Endpoint**: `wss://stream.binance.com:9443/ws/btcusdt@ticker`
- **Update Frequency**: Real-time (every ~1s)
- **Data Format**: JSON with price, volume, high/low, and change %

### Binance REST API (Multi-Coin Ticker)
- **Endpoint**: `https://api.binance.com/api/v3/ticker/24hr`
- **Update Frequency**: 10 seconds
- **Symbols**: 50+ coins (BTCUSDT, ETHUSDT, BNBUSDT, etc.)

**Why Binance?** We switched from CoinGecko because browser extensions were blocking requests. Binance API is faster and more reliable.

## Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Desktop**: ≥ 768px (md: breakpoint)

### Mobile Sidebar
- Hidden by default (`-translate-x-full md:translate-x-0`)
- Opened via hamburger menu (top-left)
- Dark overlay when open (`bg-black/50`)

### Responsive Text
- Price: `text-7xl md:text-[12rem]`
- Stats: `text-lg md:text-xl`
- Logo: `w-28 h-28` (expanded) / `w-12 h-12` (collapsed)

## Common Issues & Solutions

### Issue 1: Layout Shifting with Stats
**Problem**: Stats bar was interfering with centered Bitcoin price.

**Solution**:
- Separated BitcoinStats into its own component
- Used `gap-32` in flex column layout instead of margins
- Positioned stats with `flex justify-center` in its own section

### Issue 2: Logo Glow Too Strong
**Problem**: Initial glow effect was too bright and distracting.

**Solution**:
- Reduced opacity to `/10`
- Slowed pulse to 5s
- Added `group-hover:opacity-40` for subtle interaction
- Single layer instead of multiple

### Issue 3: Sidebar Spacing Too Tight
**Problem**: Menu items and logo section felt cramped.

**Solution**:
- Increased logo section padding (`pt-16 pb-20`)
- Changed nav spacing to `space-y-6`
- Increased icon-text gap to `gap-6`

### Issue 4: WebSocket Connection Drops
**Problem**: Bitcoin price would stop updating after tab was idle.

**Solution**:
- Added reconnection logic in `useBitcoinPrice`
- Cleanup on component unmount
- Error handling for connection failures

## Development Workflow

### Running the Project
```bash
npm run dev
# Opens on http://localhost:3000
```

### Building for Production
```bash
npm run build
npm start
```

### Adding a New Coin to Ticker
1. Edit `hooks/useMultiCoinTicker.ts`
2. Add symbol to `symbols` array (e.g., `'DOGEUSDT'`)
3. Binance API will automatically return data

### Changing Brand Colors
Update these values throughout:
- `#ff7f30` - Orange accent
- `#00d4f2` - Cyan primary
- Search codebase for these hex values to update

## Performance Considerations

### WebSocket Management
- Single WebSocket connection per hook
- Cleanup on unmount prevents memory leaks
- Reconnection logic for reliability

### Ticker Animation
- Uses CSS transform for smooth scrolling
- No JavaScript animation loop (better performance)
- Pauses on hover for UX

### Image Optimization
- Logo uses Next.js Image component
- `unoptimized` flag for local files
- Responsive sizing with width/height props

## Future Enhancements (Not Yet Implemented)

### Potential Features
1. **Dark Mode Toggle** - Add theme switcher (currently pure black only)
2. **User Portfolios** - Track personal crypto holdings
3. **Price Alerts** - Notifications when price hits target
4. **Historical Charts** - Interactive price history graphs
5. **News Feed** - Integrate crypto news API
6. **Watchlist** - Custom coin watchlist per user

### Technical Improvements
1. **Caching** - Add Redis/local caching for API responses
2. **Error Boundaries** - Better error handling UI
3. **Loading States** - Skeleton screens for better UX
4. **PWA** - Make installable as Progressive Web App
5. **Analytics** - Add Google Analytics or similar

## Deployment

### Environment Variables
Create `.env.local`:
```env
NEXT_PUBLIC_TWITTER_URL=https://twitter.com/your-handle
NEXT_PUBLIC_YOUTUBE_URL=https://youtube.com/@your-channel
NEXT_PUBLIC_CMC_URL=https://coinmarketcap.com/currencies/your-coin/
```

### Recommended Platforms
- **Vercel** (recommended for Next.js)
- **Netlify**
- **Railway**
- **AWS Amplify**

### Build Command
```bash
npm run build
```

### Deploy to Vercel
```bash
vercel --prod
```

## Git Workflow

### Commit Message Format
```
feat: Add comprehensive UI improvements and monetization support

• UI/UX Enhancements:
  - Fixed Text tool highlighting issue
  - Enhanced glassmorphism design

• Feature Additions:
  - Added SupportModal component
  - Integrated Buy Me a Coffee

• Technical Improvements:
  - Enhanced Fabric.js event handling
  - Improved React state management

🤖 Generated with [Claude Code](https://claude.com/claude-code)
Co-Authored-By: Claude <noreply@anthropic.com>
```

### Branches
- `master` - Production-ready code
- `dev` - Development branch
- Feature branches: `feature/new-feature-name`

## Contact & Support

**Project**: TheCrypto_B Hub
**Repository**: https://github.com/casquinhacripto/thecryptob.git
**Version**: 1.0.0

---

*Built with ❤️ for the crypto community. 100% Free. No Paywalls. Just Passion.*
