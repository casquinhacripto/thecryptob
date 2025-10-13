# Stage 1: Dependencies
FROM node:20-alpine AS deps
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Stage 2: Builder
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including devDependencies)
RUN npm ci

# Copy source code
COPY . .

# Accept build arguments for Next.js public environment variables
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_GA_MEASUREMENT_ID
ARG NEXT_PUBLIC_BTC_WALLET
ARG NEXT_PUBLIC_ETH_WALLET
ARG NEXT_PUBLIC_BASE_WALLET
ARG NEXT_PUBLIC_SOL_WALLET
ARG NEXT_PUBLIC_SUI_WALLET
ARG NEXT_PUBLIC_METAMASK_WALLET
ARG NEXT_PUBLIC_BMC_URL
ARG NEXT_PUBLIC_TWITTER_URL
ARG NEXT_PUBLIC_YOUTUBE_URL
ARG NEXT_PUBLIC_CMC_URL
ARG NEXT_PUBLIC_BINANCE_WS_URL
ARG NEXT_PUBLIC_COINGECKO_API_URL

# Set them as environment variables for the build
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_GA_MEASUREMENT_ID=$NEXT_PUBLIC_GA_MEASUREMENT_ID
ENV NEXT_PUBLIC_BTC_WALLET=$NEXT_PUBLIC_BTC_WALLET
ENV NEXT_PUBLIC_ETH_WALLET=$NEXT_PUBLIC_ETH_WALLET
ENV NEXT_PUBLIC_BASE_WALLET=$NEXT_PUBLIC_BASE_WALLET
ENV NEXT_PUBLIC_SOL_WALLET=$NEXT_PUBLIC_SOL_WALLET
ENV NEXT_PUBLIC_SUI_WALLET=$NEXT_PUBLIC_SUI_WALLET
ENV NEXT_PUBLIC_METAMASK_WALLET=$NEXT_PUBLIC_METAMASK_WALLET
ENV NEXT_PUBLIC_BMC_URL=$NEXT_PUBLIC_BMC_URL
ENV NEXT_PUBLIC_TWITTER_URL=$NEXT_PUBLIC_TWITTER_URL
ENV NEXT_PUBLIC_YOUTUBE_URL=$NEXT_PUBLIC_YOUTUBE_URL
ENV NEXT_PUBLIC_CMC_URL=$NEXT_PUBLIC_CMC_URL
ENV NEXT_PUBLIC_BINANCE_WS_URL=$NEXT_PUBLIC_BINANCE_WS_URL
ENV NEXT_PUBLIC_COINGECKO_API_URL=$NEXT_PUBLIC_COINGECKO_API_URL

# Build Next.js app with environment variables
RUN npm run build

# Stage 3: Runner
FROM node:20-alpine AS runner
WORKDIR /app

# Set environment to production
ENV NODE_ENV=production

# Add non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Change ownership to nextjs user
RUN chown -R nextjs:nodejs /app

# Switch to non-root user
USER nextjs

# Expose port (Cloud Run uses 8080)
EXPOSE 8080

# Set default port
ENV PORT=8080
ENV HOSTNAME="0.0.0.0"

# Start the application
CMD ["node", "server.js"]
