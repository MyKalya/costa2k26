# Video Setup Guide for Vercel Deployment

## Problem
Your video files (`hero.mp4` ~76MB and `stay.mp4` ~1GB) are too large for GitHub and are in `.gitignore`, so they don't get deployed to Vercel.

## Solution Options

### Option 1: Cloudinary (Recommended - Free Tier Available)
1. Sign up at [cloudinary.com](https://cloudinary.com) (free tier: 25GB storage, 25GB bandwidth/month)
2. Upload your videos:
   - Go to Media Library → Upload
   - Upload `hero.mp4` and `stay.mp4`
   - After upload, copy the **Delivery URL** for each video
3. Set environment variable in Vercel:
   - Go to your Vercel project → Settings → Environment Variables
   - Add: `NEXT_PUBLIC_VIDEO_CDN_BASE_URL` = `https://res.cloudinary.com/YOUR_CLOUD_NAME/video/upload`
   - Replace `YOUR_CLOUD_NAME` with your actual Cloudinary cloud name
4. The code will automatically use these URLs in production

### Option 2: Vercel Blob Storage
1. Install Vercel Blob:
   ```bash
   pnpm add @vercel/blob
   ```
2. Upload videos via Vercel dashboard or API
3. Update `lib/videoConfig.ts` to use Blob URLs

### Option 3: Cloudflare Stream (Best for Large Videos)
1. Sign up at [cloudflare.com/products/stream](https://www.cloudflare.com/products/stream/)
2. Upload videos via dashboard
3. Get stream URLs and update environment variable

### Option 4: YouTube/Vimeo (Unlisted)
1. Upload videos as unlisted to YouTube or Vimeo
2. Use embed URLs (requires iframe, not direct video tag)

## Current Setup
- **Local development**: Videos load from `/media/video/` (works locally)
- **Production**: Will use `NEXT_PUBLIC_VIDEO_CDN_BASE_URL` if set, otherwise falls back to local paths (won't work on Vercel)

## Quick Fix (Cloudinary)
1. Upload videos to Cloudinary
2. In Vercel dashboard → Environment Variables:
   - Key: `NEXT_PUBLIC_VIDEO_CDN_BASE_URL`
   - Value: `https://res.cloudinary.com/YOUR_CLOUD_NAME/video/upload`
3. Redeploy

The videos will automatically work once the environment variable is set!

