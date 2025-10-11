# 🚀 TheCrypto_B Hub - Deployment Guide

**Complete step-by-step guide to deploy your app to Google Cloud Run with Cloudflare**

---

## 📋 Quick Start

```bash
# 1. Update configuration
# Edit deploy.sh and set your PROJECT_ID

# 2. Set environment variables
source .env.local

# 3. Deploy
chmod +x deploy.sh
./deploy.sh

# 4. Configure Cloudflare (see CLOUDFLARE_SETUP.md)
```

---

## 🎯 Deployment Architecture

```
User Browser
    ↓
Cloudflare CDN (DNS + DDoS Protection + SSL)
    ↓
Google Cloud Run (Next.js App in Docker Container)
    ↓
External APIs (Binance WebSocket, CoinGecko)
```

**Benefits:**
- ✅ **Cloudflare**: Free CDN, DDoS protection, SSL, caching
- ✅ **Cloud Run**: Auto-scaling, pay-per-use, generous free tier
- ✅ **Docker**: Consistent builds, portable deployment
- ✅ **Next.js Standalone**: Optimized production builds

---

## 📁 New Files Created

Your project now has these deployment files:

```
thecryptob-hub/
├── Dockerfile                    # Docker container configuration
├── .dockerignore                 # Files to exclude from Docker build
├── deploy.sh                     # Automated deployment script
├── .env.production.example       # Production environment template
├── CLOUDFLARE_SETUP.md          # Cloudflare configuration guide
├── DEPLOYMENT_GUIDE.md          # This file
└── next.config.ts               # Updated with standalone output
```

---

## 🛠️ Prerequisites

### 1. Install Google Cloud SDK

**Windows:**
```powershell
# Download and run installer
https://cloud.google.com/sdk/docs/install#windows
```

**macOS:**
```bash
brew install google-cloud-sdk
```

**Linux:**
```bash
curl https://sdk.cloud.google.com | bash
exec -l $SHELL
```

**Verify Installation:**
```bash
gcloud --version
```

---

### 2. Install Docker

**Windows/Mac:**
- Download Docker Desktop: https://www.docker.com/products/docker-desktop

**Linux:**
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

**Verify Installation:**
```bash
docker --version
```

---

### 3. Set Up Google Cloud Project

1. **Create Project:**
   - Go to: https://console.cloud.google.com
   - Click "Select a Project" → "New Project"
   - Name: `thecryptob-hub-prod`
   - Click "Create"

2. **Enable Billing:**
   - Go to: https://console.cloud.google.com/billing
   - Link a billing account (free tier available)
   - **Note:** You get $300 free credits for 90 days

3. **Get Project ID:**
   ```bash
   gcloud projects list
   ```
   Save your PROJECT_ID (e.g., `thecryptob-hub-prod`)

---

### 4. Authenticate Google Cloud

```bash
# Login to Google Cloud
gcloud auth login

# Set default project
gcloud config set project YOUR_PROJECT_ID

# Enable required APIs
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com
```

---

## 🚀 Step-by-Step Deployment

### Step 1: Update Deployment Script

Open `deploy.sh` and update:

```bash
PROJECT_ID="your-gcp-project-id"  # Replace with your PROJECT_ID
SERVICE_NAME="thecryptob-hub"     # Keep as is (or customize)
REGION="us-central1"              # Choose closest region to your users
```

**Available Regions:**
- `us-central1` (Iowa) - Good for US/Americas
- `us-east1` (South Carolina)
- `europe-west1` (Belgium) - Good for Europe
- `asia-northeast1` (Tokyo) - Good for Asia

---

### Step 2: Prepare Environment Variables

Export your environment variables (from `.env.local`):

```bash
# Wallet Addresses
export NEXT_PUBLIC_BTC_WALLET="bc1qgswmplz72qqxpp6sffux07nfwh32v8hqhzrwwa"
export NEXT_PUBLIC_ETH_WALLET="0x4ef74D71FBF937BC49E678c2C3FAF124f4790296"
export NEXT_PUBLIC_BASE_WALLET="0x4ef74D71FBF937BC49E678c2C3FAF124f4790296"
export NEXT_PUBLIC_SOL_WALLET="FQDn463DWY1WZNFsR87Anqmh49ViE4mYbFfpxf9h7B7w"
export NEXT_PUBLIC_SUI_WALLET="0x15b94dc1970248cb17882364ad6c0e93c6aa79c0d8bb3279fbb28336e11029c3"
export NEXT_PUBLIC_METAMASK_WALLET="0xFE1C6127C6C8d1aCDA1e883e6A146CDd075F6491"

# Social Links
export NEXT_PUBLIC_TWITTER_URL="https://x.com/TheCrypto_B"
export NEXT_PUBLIC_YOUTUBE_URL="https://www.youtube.com/@Crypto_B"
export NEXT_PUBLIC_CMC_URL="https://coinmarketcap.com/community/profile/TheCrypto_B/"
export NEXT_PUBLIC_BMC_URL="https://buymeacoffee.com/thecryptob"
```

---

### Step 3: Test Build Locally (Optional but Recommended)

Before deploying to Cloud Run, test the Docker build locally:

```bash
# Build Docker image
docker build -t thecryptob-hub .

# Run locally
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_SITE_URL=http://localhost:3000 \
  -e NEXT_PUBLIC_BTC_WALLET=$NEXT_PUBLIC_BTC_WALLET \
  thecryptob-hub

# Test in browser: http://localhost:3000
# Stop with Ctrl+C
```

---

### Step 4: Deploy to Cloud Run

Make the deployment script executable and run it:

```bash
# Make executable (Unix/Mac/Linux)
chmod +x deploy.sh

# Run deployment
./deploy.sh
```

**Windows (Git Bash):**
```bash
bash deploy.sh
```

**Windows (PowerShell):**
```powershell
# Manually run commands from deploy.sh
```

---

### Step 5: Deployment Process

The script will:

1. ✅ **Enable Google Cloud APIs** (~30 seconds)
2. ✅ **Build Docker Image** (~3-5 minutes)
   - Upload source code to Cloud Build
   - Install dependencies
   - Build Next.js app
   - Create Docker image
3. ✅ **Deploy to Cloud Run** (~1-2 minutes)
   - Create/update Cloud Run service
   - Set environment variables
   - Configure auto-scaling
4. ✅ **Get Service URL**

**Total Time:** ~5-10 minutes

**Expected Output:**
```
🚀 Starting deployment to Cloud Run...
✓ gcloud CLI found
...
✅ Deployment successful!
📍 Service URL: https://thecryptob-hub-xxxxx-uc.a.run.app
```

**Save this URL** - you'll need it for Cloudflare!

---

### Step 6: Test Cloud Run Deployment

Open the Cloud Run URL in your browser:

```
https://thecryptob-hub-xxxxx-uc.a.run.app
```

**Verify:**
- [ ] Homepage loads ✅
- [ ] Live BTC price updates ✅
- [ ] All pages work (/apps, /support, /about) ✅
- [ ] Images load ✅

---

### Step 7: Configure Cloudflare

**See full guide:** [CLOUDFLARE_SETUP.md](./CLOUDFLARE_SETUP.md)

**Quick Steps:**

1. **Add Domain to Cloudflare**
   - Go to: https://dash.cloudflare.com
   - Add site: `thecryptob.com`
   - Update nameservers at your registrar

2. **Add DNS Records**
   ```
   Type: CNAME
   Name: @
   Target: thecryptob-hub-xxxxx-uc.a.run.app (without https://)
   Proxy: ✅ Enabled (Orange Cloud)
   ```

   ```
   Type: CNAME
   Name: www
   Target: thecryptob-hub-xxxxx-uc.a.run.app
   Proxy: ✅ Enabled
   ```

3. **SSL/TLS Settings**
   - Mode: **Full (strict)**
   - Always Use HTTPS: ✅
   - Automatic HTTPS Rewrites: ✅

4. **Enable Performance Features**
   - Auto Minify: ✅ JS, CSS, HTML
   - Brotli: ✅
   - Early Hints: ✅

---

### Step 8: Update Production URL

After Cloudflare DNS is configured, update the site URL in Cloud Run:

```bash
gcloud run services update thecryptob-hub \
  --region us-central1 \
  --update-env-vars NEXT_PUBLIC_SITE_URL=https://thecryptob.com
```

**OR** via Cloud Run Console:
1. Go to: https://console.cloud.google.com/run
2. Click your service → "Edit & Deploy New Revision"
3. Update `NEXT_PUBLIC_SITE_URL` → `https://thecryptob.com`
4. Deploy

---

### Step 9: Update robots.txt

Update sitemap URL in `public/robots.txt`:

```diff
- Sitemap: https://your-domain.com/sitemap.xml
+ Sitemap: https://thecryptob.com/sitemap.xml
```

Then redeploy:
```bash
./deploy.sh
```

---

## ✅ Post-Deployment Checklist

### Functionality:
- [ ] Homepage: https://thecryptob.com ✅
- [ ] Live BTC price updates via WebSocket ✅
- [ ] All navigation links work ✅
- [ ] Apps page loads (/apps) ✅
- [ ] Support page shows all wallets (/support) ✅
- [ ] About page loads (/about) ✅
- [ ] Widget embeds work (/widget/btc) ✅
- [ ] Copy-to-clipboard works ✅
- [ ] Mobile responsive ✅

### Performance:
- [ ] PageSpeed Insights: >90 score
- [ ] GTmetrix: Grade A
- [ ] First Contentful Paint: <1.5s

### SEO:
- [ ] Google Search Console verified
- [ ] Sitemap submitted: /sitemap.xml
- [ ] robots.txt accessible: /robots.txt
- [ ] OpenGraph preview works on X/Twitter

### Security:
- [ ] SSL certificate valid (green padlock)
- [ ] HTTPS redirect works
- [ ] No mixed content warnings
- [ ] Security headers present (check: securityheaders.com)

---

## 🔧 Managing Your Deployment

### View Service Details

```bash
# List all Cloud Run services
gcloud run services list

# Get service details
gcloud run services describe thecryptob-hub --region us-central1

# View URL
gcloud run services describe thecryptob-hub \
  --region us-central1 \
  --format 'value(status.url)'
```

---

### Update Environment Variables

```bash
# Update single variable
gcloud run services update thecryptob-hub \
  --region us-central1 \
  --update-env-vars KEY=VALUE

# Update multiple variables
gcloud run services update thecryptob-hub \
  --region us-central1 \
  --update-env-vars KEY1=VALUE1,KEY2=VALUE2
```

---

### View Logs

```bash
# Tail logs (real-time)
gcloud run services logs tail thecryptob-hub --region us-central1

# Read recent logs
gcloud run services logs read thecryptob-hub --region us-central1 --limit 50

# Filter errors only
gcloud run services logs read thecryptob-hub \
  --region us-central1 \
  --log-filter="severity>=ERROR"
```

---

### Scale Your Service

```bash
# Update instance limits
gcloud run services update thecryptob-hub \
  --region us-central1 \
  --min-instances 0 \
  --max-instances 20

# Set memory and CPU
gcloud run services update thecryptob-hub \
  --region us-central1 \
  --memory 1Gi \
  --cpu 2
```

---

### Rollback to Previous Version

```bash
# List revisions
gcloud run revisions list --service thecryptob-hub --region us-central1

# Rollback to specific revision
gcloud run services update-traffic thecryptob-hub \
  --region us-central1 \
  --to-revisions REVISION_NAME=100
```

---

### Delete Service (if needed)

```bash
gcloud run services delete thecryptob-hub --region us-central1
```

---

## 💰 Cost Optimization Tips

### Free Tier Limits (Cloud Run):
- 2 million requests/month
- 360,000 GB-seconds
- 180,000 vCPU-seconds

### Optimization Strategies:

1. **Use Min Instances = 0**
   - Scale to zero when idle
   - Save costs during low traffic

2. **Set Appropriate Max Instances**
   - Start with 10
   - Increase only if needed

3. **Enable Cloudflare Caching**
   - Cache static assets
   - Reduce Cloud Run requests

4. **Use Smaller Memory**
   - Start with 512Mi
   - Increase if needed

---

## 🐛 Troubleshooting

### Build Fails

**Error:** `ERROR: failed to build: error building image`

**Fix:**
```bash
# Check Docker is running
docker ps

# Clear Docker cache
docker system prune -a

# Try building locally first
docker build -t test .
```

---

### Deployment Timeout

**Error:** `Deployment failed: timeout`

**Fix:**
```bash
# Increase timeout
gcloud run services update thecryptob-hub \
  --region us-central1 \
  --timeout 600
```

---

### WebSocket Not Working

**Fix:**
1. Enable WebSockets in Cloudflare:
   - Network tab → WebSockets: ✅ On
2. Check CORS headers in `next.config.ts`

---

### 502 Bad Gateway

**Causes:**
- Service crashed
- Container not responding on port 3000

**Fix:**
```bash
# Check logs
gcloud run services logs read thecryptob-hub --region us-central1

# Redeploy
./deploy.sh
```

---

## 📊 Monitoring & Alerts

### Set Up Monitoring

1. Go to: https://console.cloud.google.com/monitoring
2. Create Dashboard
3. Add widgets:
   - Request count
   - Error rate
   - Latency (p50, p95, p99)
   - Instance count

### Create Alerts

```bash
# Install gcloud alpha components
gcloud components install alpha

# Create alert policy
gcloud alpha monitoring policies create \
  --notification-channels=CHANNEL_ID \
  --display-name="High Error Rate" \
  --condition-display-name="Error rate > 5%" \
  --condition-expression="..."
```

---

## 🎯 Next Steps

1. **Set Up CI/CD** (Optional)
   - GitHub Actions for automatic deployments
   - Deploy on every push to `main`

2. **Add Monitoring**
   - Google Cloud Monitoring
   - Error tracking (Sentry)
   - Analytics (GA4, Plausible)

3. **Performance Optimization**
   - Enable Cloudflare Argo (paid)
   - Add CDN rules
   - Optimize images further

4. **SEO**
   - Submit sitemap to Google Search Console
   - Create OpenGraph images
   - Add structured data

---

## 📚 Additional Resources

- **Cloud Run Docs:** https://cloud.google.com/run/docs
- **Cloudflare Setup:** [CLOUDFLARE_SETUP.md](./CLOUDFLARE_SETUP.md)
- **Next.js Deployment:** https://nextjs.org/docs/deployment
- **Docker Best Practices:** https://docs.docker.com/develop/dev-best-practices/

---

## 🆘 Need Help?

- **Cloud Run Issues:** https://cloud.google.com/run/docs/troubleshooting
- **Cloudflare Community:** https://community.cloudflare.com
- **Next.js Discord:** https://nextjs.org/discord

---

**🎉 Congratulations! Your app is now live on the internet!**

**Built with 💙 by TheCrypto_B**
