#!/bin/bash

# ==========================================
# TheCrypto_B Hub - Cloud Run Deployment Script
# ==========================================

set -e  # Exit on error

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
PROJECT_ID="your-gcp-project-id"  # CHANGE THIS
SERVICE_NAME="thecryptob-hub"
REGION="us-central1"  # Change to your preferred region
IMAGE_NAME="gcr.io/${PROJECT_ID}/${SERVICE_NAME}"

echo -e "${BLUE}🚀 Starting deployment to Cloud Run...${NC}\n"

# Step 1: Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    echo -e "${RED}❌ Error: gcloud CLI is not installed${NC}"
    echo "Install it from: https://cloud.google.com/sdk/docs/install"
    exit 1
fi

echo -e "${GREEN}✓ gcloud CLI found${NC}"

# Step 2: Verify project configuration
echo -e "\n${BLUE}📋 Project Configuration:${NC}"
echo "  Project ID: ${PROJECT_ID}"
echo "  Service Name: ${SERVICE_NAME}"
echo "  Region: ${REGION}"
echo "  Image: ${IMAGE_NAME}"
read -p "Is this correct? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${RED}Deployment cancelled. Update PROJECT_ID in deploy.sh${NC}"
    exit 1
fi

# Step 3: Set active project
echo -e "\n${BLUE}🔧 Setting active GCP project...${NC}"
gcloud config set project ${PROJECT_ID}

# Step 4: Enable required APIs
echo -e "\n${BLUE}🔌 Enabling required Google Cloud APIs...${NC}"
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com

# Step 5: Build Docker image
echo -e "\n${BLUE}🐳 Building Docker image...${NC}"
gcloud builds submit --tag ${IMAGE_NAME} .

# Step 6: Deploy to Cloud Run
echo -e "\n${BLUE}☁️  Deploying to Cloud Run...${NC}"
gcloud run deploy ${SERVICE_NAME} \
  --image ${IMAGE_NAME} \
  --platform managed \
  --region ${REGION} \
  --allow-unauthenticated \
  --port 3000 \
  --memory 512Mi \
  --cpu 1 \
  --min-instances 0 \
  --max-instances 10 \
  --timeout 300 \
  --set-env-vars "NODE_ENV=production" \
  --set-env-vars "NEXT_PUBLIC_SITE_URL=https://your-domain.com" \
  --set-env-vars "NEXT_PUBLIC_SITE_NAME=TheCrypto_B Hub" \
  --set-env-vars "NEXT_PUBLIC_BINANCE_WS_URL=wss://stream.binance.com:9443/ws" \
  --set-env-vars "NEXT_PUBLIC_COINGECKO_API_URL=https://api.coingecko.com/api/v3" \
  --set-env-vars "NEXT_PUBLIC_BTC_WALLET=${NEXT_PUBLIC_BTC_WALLET}" \
  --set-env-vars "NEXT_PUBLIC_ETH_WALLET=${NEXT_PUBLIC_ETH_WALLET}" \
  --set-env-vars "NEXT_PUBLIC_BASE_WALLET=${NEXT_PUBLIC_BASE_WALLET}" \
  --set-env-vars "NEXT_PUBLIC_SOL_WALLET=${NEXT_PUBLIC_SOL_WALLET}" \
  --set-env-vars "NEXT_PUBLIC_SUI_WALLET=${NEXT_PUBLIC_SUI_WALLET}" \
  --set-env-vars "NEXT_PUBLIC_METAMASK_WALLET=${NEXT_PUBLIC_METAMASK_WALLET}" \
  --set-env-vars "NEXT_PUBLIC_TWITTER_URL=${NEXT_PUBLIC_TWITTER_URL}" \
  --set-env-vars "NEXT_PUBLIC_YOUTUBE_URL=${NEXT_PUBLIC_YOUTUBE_URL}" \
  --set-env-vars "NEXT_PUBLIC_CMC_URL=${NEXT_PUBLIC_CMC_URL}" \
  --set-env-vars "NEXT_PUBLIC_BMC_URL=${NEXT_PUBLIC_BMC_URL}"

# Step 7: Get deployment URL
echo -e "\n${BLUE}🔍 Getting service URL...${NC}"
SERVICE_URL=$(gcloud run services describe ${SERVICE_NAME} --platform managed --region ${REGION} --format 'value(status.url)')

# Step 8: Success message
echo -e "\n${GREEN}================================================${NC}"
echo -e "${GREEN}✅ Deployment successful!${NC}"
echo -e "${GREEN}================================================${NC}"
echo -e "\n${BLUE}📍 Service URL:${NC} ${SERVICE_URL}"
echo -e "\n${YELLOW}⚠️  Next steps:${NC}"
echo "  1. Point your domain to Cloud Run using Cloudflare"
echo "  2. Update NEXT_PUBLIC_SITE_URL in Cloud Run env vars"
echo "  3. Test the deployment: ${SERVICE_URL}"
echo "  4. Set up Cloudflare DNS and proxy"
echo -e "\n${BLUE}📚 View logs:${NC}"
echo "  gcloud run services logs read ${SERVICE_NAME} --region ${REGION}"
echo -e "\n"
