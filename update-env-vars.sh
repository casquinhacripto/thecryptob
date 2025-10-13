#!/bin/bash

# Update Cloud Run environment variables for thecryptob service
# Run this script to set all wallet addresses and configuration

gcloud run services update thecryptob \
  --region=europe-west1 \
  --update-env-vars "\
NEXT_PUBLIC_BTC_WALLET=bc1qgswmplz72qqxpp6sffux07nfwh32v8hqhzrwwa,\
NEXT_PUBLIC_ETH_WALLET=0x4ef74D71FBF937BC49E678c2C3FAF124f4790296,\
NEXT_PUBLIC_BASE_WALLET=0x4ef74D71FBF937BC49E678c2C3FAF124f4790296,\
NEXT_PUBLIC_SOL_WALLET=FQDn463DWY1WZNFsR87Anqmh49ViE4mYbFfpxf9h7B7w,\
NEXT_PUBLIC_SUI_WALLET=0x15b94dc1970248cb17882364ad6c0e93c6aa79c0d8bb3279fbb28336e11029c3,\
NEXT_PUBLIC_METAMASK_WALLET=0xFE1C6127C6C8d1aCDA1e883e6A146CDd075F6491,\
NEXT_PUBLIC_BMC_URL=https://buymeacoffee.com/thecryptob,\
NEXT_PUBLIC_TWITTER_URL=https://x.com/TheCrypto_B,\
NEXT_PUBLIC_YOUTUBE_URL=https://www.youtube.com/@Crypto_B,\
NEXT_PUBLIC_CMC_URL=https://coinmarketcap.com/community/profile/TheCrypto_B/,\
NEXT_PUBLIC_SITE_URL=https://thecryptob.com,\
NEXT_PUBLIC_BINANCE_WS_URL=wss://stream.binance.com:9443/ws,\
NEXT_PUBLIC_COINGECKO_API_URL=https://api.coingecko.com/api/v3"

echo "✅ Environment variables updated successfully!"
echo "⏳ Cloud Run is deploying a new revision with updated env vars..."
echo "🌐 Check status at: https://console.cloud.google.com/run/detail/europe-west1/thecryptob"
