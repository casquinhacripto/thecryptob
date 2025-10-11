# 🌐 Cloudflare + Cloud Run Setup Guide

Complete guide to deploying **TheCrypto_B Hub** using **Google Cloud Run** with **Cloudflare** for DNS, CDN, and security.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Google Cloud Run Deployment](#google-cloud-run-deployment)
3. [Cloudflare Configuration](#cloudflare-configuration)
4. [SSL/TLS Setup](#ssltls-setup)
5. [Performance Optimization](#performance-optimization)
6. [Security Hardening](#security-hardening)
7. [Monitoring & Logs](#monitoring--logs)
8. [Troubleshooting](#troubleshooting)

---

## 📦 Prerequisites

### Required Tools:
- ✅ **Google Cloud SDK** (gcloud CLI) - [Install](https://cloud.google.com/sdk/docs/install)
- ✅ **Docker** - [Install](https://docs.docker.com/get-docker/)
- ✅ **Domain Name** (e.g., thecryptob.com) - Registered and managed by Cloudflare
- ✅ **Cloudflare Account** - [Sign Up](https://cloudflare.com)
- ✅ **Google Cloud Project** - [Create Project](https://console.cloud.google.com)

### Check Installation:
```bash
# Verify gcloud
gcloud --version

# Verify Docker
docker --version

# Login to Google Cloud
gcloud auth login
```

---

## 🚀 Google Cloud Run Deployment

### Step 1: Configure Your Project

Edit `deploy.sh` and update:
```bash
PROJECT_ID="your-gcp-project-id"  # e.g., thecryptob-hub-prod
REGION="us-central1"               # Choose closest to your users
SERVICE_NAME="thecryptob-hub"
```

### Step 2: Set Environment Variables

Load your wallet addresses and URLs:
```bash
# Export from your .env.local
export NEXT_PUBLIC_BTC_WALLET="bc1q..."
export NEXT_PUBLIC_ETH_WALLET="0x..."
export NEXT_PUBLIC_BASE_WALLET="0x..."
export NEXT_PUBLIC_SOL_WALLET="..."
export NEXT_PUBLIC_SUI_WALLET="0x..."
export NEXT_PUBLIC_METAMASK_WALLET="0x..."
export NEXT_PUBLIC_TWITTER_URL="https://x.com/TheCrypto_B"
export NEXT_PUBLIC_YOUTUBE_URL="https://www.youtube.com/@Crypto_B"
export NEXT_PUBLIC_CMC_URL="https://coinmarketcap.com/community/profile/TheCrypto_B/"
export NEXT_PUBLIC_BMC_URL="https://buymeacoffee.com/thecryptob"
```

### Step 3: Deploy to Cloud Run

Make the script executable and run:
```bash
chmod +x deploy.sh
./deploy.sh
```

The script will:
1. ✅ Enable required Google Cloud APIs
2. ✅ Build Docker image using Cloud Build
3. ✅ Deploy to Cloud Run
4. ✅ Configure auto-scaling (0-10 instances)
5. ✅ Set all environment variables

**Expected Output:**
```
✅ Deployment successful!
📍 Service URL: https://thecryptob-hub-xxxxx-uc.a.run.app
```

**Save this URL** - you'll need it for Cloudflare setup.

---

## 🌐 Cloudflare Configuration

### Step 1: Add Your Domain to Cloudflare

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Click **"Add a Site"**
3. Enter your domain: `thecryptob.com`
4. Select the **Free Plan**
5. Cloudflare will scan your DNS records
6. Update your domain's nameservers at your registrar (e.g., Namecheap, GoDaddy)

**Cloudflare Nameservers:**
```
ns1.cloudflare.com
ns2.cloudflare.com
```

**Wait 5-30 minutes** for DNS propagation.

---

### Step 2: Configure DNS Records

Go to **DNS** tab in Cloudflare and add these records:

#### A. Root Domain (@)
```
Type: CNAME
Name: @
Target: thecryptob-hub-xxxxx-uc.a.run.app (your Cloud Run URL without https://)
Proxy: ✅ Proxied (Orange Cloud)
TTL: Auto
```

#### B. WWW Subdomain
```
Type: CNAME
Name: www
Target: thecryptob-hub-xxxxx-uc.a.run.app
Proxy: ✅ Proxied (Orange Cloud)
TTL: Auto
```

#### C. (Optional) Widget Subdomain
```
Type: CNAME
Name: widget
Target: thecryptob-hub-xxxxx-uc.a.run.app
Proxy: ✅ Proxied (Orange Cloud)
TTL: Auto
```

**Important:**
- ✅ **Enable Proxied** (Orange Cloud) for CDN and DDoS protection
- ⚠️ Use the Cloud Run URL **without** `https://` prefix

---

### Step 3: Update Cloud Run Environment Variables

After DNS is configured, update the site URL:

```bash
# Update NEXT_PUBLIC_SITE_URL
gcloud run services update thecryptob-hub \
  --region us-central1 \
  --update-env-vars NEXT_PUBLIC_SITE_URL=https://thecryptob.com
```

Also update in Cloud Run Console:
1. Go to [Cloud Run Console](https://console.cloud.google.com/run)
2. Click your service
3. Click **"Edit & Deploy New Revision"**
4. Update `NEXT_PUBLIC_SITE_URL` to `https://thecryptob.com`
5. Deploy

---

## 🔒 SSL/TLS Setup

### Step 1: SSL/TLS Mode

1. Go to **SSL/TLS** tab in Cloudflare
2. Set encryption mode to: **Full (strict)**
3. This ensures end-to-end encryption

**Why Full (strict)?**
- ✅ Cloud Run provides free SSL certificates
- ✅ Cloudflare provides SSL to users
- ✅ Traffic encrypted between Cloudflare ↔ Cloud Run

### Step 2: Force HTTPS

1. Go to **SSL/TLS** → **Edge Certificates**
2. Enable **Always Use HTTPS** ✅
3. Enable **Automatic HTTPS Rewrites** ✅
4. Enable **Minimum TLS Version**: TLS 1.2

### Step 3: HSTS (HTTP Strict Transport Security)

1. Go to **SSL/TLS** → **Edge Certificates**
2. Enable **HSTS**
3. Settings:
   - Max Age: `6 months`
   - Include Subdomains: ✅
   - Preload: ✅

---

## ⚡ Performance Optimization

### 1. Enable Cloudflare Speed Features

Go to **Speed** → **Optimization**:

#### Auto Minify
- ✅ JavaScript
- ✅ CSS
- ✅ HTML

#### Brotli Compression
- ✅ Enable (better than gzip)

#### Early Hints
- ✅ Enable (preload resources faster)

#### Rocket Loader
- ⚠️ **Disable** (can break Next.js client-side JS)

---

### 2. Caching Rules

Go to **Caching** → **Configuration**:

#### Browser Cache TTL
```
Respect Existing Headers
```

#### Cache Level
```
Standard (recommended for Next.js)
```

#### Bypass Cache for:
```
/api/*
/widget/*
```

#### Page Rules (Optional - Requires Paid Plan)

**Cache Everything:**
```
URL: thecryptob.com/apps*
Cache Level: Cache Everything
Edge Cache TTL: 2 hours
Browser Cache TTL: 30 minutes
```

---

### 3. Image Optimization

Cloudflare Polish (Paid Plans):
- Converts images to WebP
- Lossless/Lossy compression
- Lazy loading

**Free Alternative:**
- Next.js built-in image optimization already enabled

---

## 🛡️ Security Hardening

### 1. WAF (Web Application Firewall)

Go to **Security** → **WAF**:

#### Managed Rules
- ✅ **Cloudflare Managed Ruleset** - Enable
- ✅ **OWASP Core Ruleset** - Enable

#### Rate Limiting (Free Tier: 1 rule)
```
Name: API Rate Limit
If: URL Path contains /api/
Then: Block
Requests: 100 per 10 seconds
```

---

### 2. DDoS Protection

Cloudflare provides automatic DDoS protection:
- ✅ Network-layer (L3/L4) - Always on
- ✅ Application-layer (L7) - Always on
- ✅ Automatically mitigates attacks

**Monitor Attacks:**
- Go to **Security** → **Events**
- View blocked threats in real-time

---

### 3. Bot Protection

Go to **Security** → **Bots**:

#### Bot Fight Mode
- ✅ Enable (Free Plan)
- Challenges suspicious bots
- Blocks known malicious bots

#### Super Bot Fight Mode (Paid Plans)
- Advanced ML-based detection
- Custom rules

---

### 4. Firewall Rules (Custom)

Create custom rules to protect your app:

#### Block Bad User Agents
```
Field: User Agent
Operator: contains
Value: curl|wget|python-requests
Action: Block
```

#### Allow Only Specific Countries (Optional)
```
Field: Country
Operator: not in
Value: US, CA, GB, EU countries
Action: Challenge
```

---

## 📊 Monitoring & Logs

### Cloudflare Analytics

1. Go to **Analytics & Logs** → **Web Analytics**
2. View:
   - Traffic patterns
   - Top pages
   - Geographic distribution
   - Security events

### Cloud Run Logs

View real-time logs:
```bash
# Tail logs
gcloud run services logs tail thecryptob-hub --region us-central1

# Read recent logs
gcloud run services logs read thecryptob-hub --region us-central1 --limit 100
```

### Set Up Alerts (Cloud Run)

1. Go to [Cloud Monitoring](https://console.cloud.google.com/monitoring)
2. Create alerts for:
   - ⚠️ High error rate (>5%)
   - ⚠️ High latency (>2s)
   - ⚠️ Instance count (max instances reached)

---

## 🔧 Troubleshooting

### Issue: DNS Not Resolving

**Check:**
```bash
# Verify DNS
nslookup thecryptob.com

# Should return Cloudflare IPs (104.x.x.x or 172.x.x.x)
```

**Fix:**
- Wait 5-30 minutes for DNS propagation
- Verify nameservers are updated at registrar
- Clear browser DNS cache: `chrome://net-internals/#dns`

---

### Issue: 502 Bad Gateway

**Causes:**
1. Cloud Run service not running
2. Invalid Cloud Run URL in Cloudflare DNS
3. SSL/TLS mismatch

**Fix:**
```bash
# Check Cloud Run status
gcloud run services list

# Redeploy if needed
./deploy.sh
```

---

### Issue: WebSocket Connection Failed

**Causes:**
- Cloudflare WebSocket not enabled
- Next.js hot-reload conflicts

**Fix:**
1. Go to **Network** in Cloudflare
2. Enable **WebSockets** ✅
3. Add Page Rule (if on paid plan):
   ```
   URL: thecryptob.com/*
   WebSockets: On
   ```

---

### Issue: Mixed Content Warnings

**Fix:**
1. Ensure all resources use `https://`
2. Enable **Automatic HTTPS Rewrites** in Cloudflare
3. Check console for insecure resources

---

### Issue: Images Not Loading

**Fix:**
1. Check `next.config.ts` has:
   ```typescript
   images: {
     remotePatterns: [{ protocol: 'https', hostname: '**' }]
   }
   ```
2. Verify image URLs in console
3. Check Cloudflare is not blocking image requests

---

## 🎯 Post-Deployment Checklist

After deployment, verify everything works:

### Functionality Tests:
- [ ] Homepage loads with live BTC price ✅
- [ ] WebSocket connection status shows "Live" ✅
- [ ] All navigation links work ✅
- [ ] Apps page displays all 5 projects ✅
- [ ] Support page shows all wallet QR codes ✅
- [ ] Copy-to-clipboard works ✅
- [ ] Mobile responsive (test on phone) ✅
- [ ] Widget page loads (/widget/btc) ✅

### Performance Tests:
- [ ] PageSpeed Insights: >90 score
- [ ] GTmetrix: Grade A
- [ ] Lighthouse: All green scores

### SEO Tests:
- [ ] Google Search Console verified
- [ ] Sitemap submitted (https://thecryptob.com/sitemap.xml)
- [ ] robots.txt accessible (https://thecryptob.com/robots.txt)
- [ ] OpenGraph preview works (test on X/Twitter)

### Security Tests:
- [ ] SSL certificate valid (green padlock)
- [ ] Security headers present (securityheaders.com)
- [ ] No mixed content warnings
- [ ] CSP headers configured

---

## 📝 Useful Commands

```bash
# View Cloud Run services
gcloud run services list

# View service details
gcloud run services describe thecryptob-hub --region us-central1

# Update environment variable
gcloud run services update thecryptob-hub \
  --region us-central1 \
  --update-env-vars KEY=VALUE

# Scale instances
gcloud run services update thecryptob-hub \
  --region us-central1 \
  --min-instances 0 \
  --max-instances 10

# View costs
gcloud billing accounts list
```

---

## 💰 Cost Estimation

### Google Cloud Run (Free Tier Generous)
- **Free Tier:**
  - 2 million requests/month
  - 360,000 GB-seconds compute time
  - 180,000 vCPU-seconds
  - 1 GB network egress

**Estimated Cost (Light Traffic):**
- < 10K visitors/month: **$0 (within free tier)**
- 50K visitors/month: **~$5-10/month**
- 100K visitors/month: **~$15-25/month**

### Cloudflare (Free Plan)
- Unlimited bandwidth ✅
- DDoS protection ✅
- SSL/TLS ✅
- CDN caching ✅
- **Cost: $0/month**

---

## 🚀 Next Steps

1. **Monitor Performance:**
   - Set up Cloud Monitoring alerts
   - Enable Cloudflare Web Analytics

2. **SEO Optimization:**
   - Submit sitemap to Google Search Console
   - Create rich snippets for better CTR

3. **Content Updates:**
   - Add blog/alpha feed
   - Update project statuses
   - Add more apps

4. **Marketing:**
   - Share on X/Twitter
   - Post on r/cryptocurrency
   - Create YouTube video about the hub

---

## 📚 Additional Resources

- [Cloud Run Documentation](https://cloud.google.com/run/docs)
- [Cloudflare Documentation](https://developers.cloudflare.com)
- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)

---

**Need Help?** Open an issue on GitHub or contact support.

**Built with 💙 by TheCrypto_B**
