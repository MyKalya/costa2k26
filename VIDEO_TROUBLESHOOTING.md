# Video Not Playing on Vercel - Troubleshooting

## Current Setup
- Video URL: `https://res.cloudinary.com/drbh1hki1/video/upload/v1764258826/hero.mp4`
- Video is accessible (HTTP 200, ~76MB MP4 file)
- Configured in `lib/videoConfig.ts`
- Used in `app/page.tsx` Hero component

## Common Issues & Solutions

### 1. Browser Autoplay Policies
**Problem**: Modern browsers block autoplay of videos with sound, even if muted.

**Solution**: The code already handles this with:
- `muted` attribute
- `playsInline` for mobile
- Error handling that falls back to background image

**To Test**: Open browser console and look for "Video autoplay prevented" warnings.

### 2. Video Not Loading
**Check in Browser DevTools:**
1. Open Network tab
2. Filter by "Media"
3. Look for `hero.mp4` request
4. Check if it returns 200 or fails with 4xx/5xx

### 3. CORS Issues
**Problem**: Cloudinary might block cross-origin requests.

**Current Fix**: Added `crossOrigin="anonymous"` attribute.

**If still failing**: Check Cloudinary settings to ensure CORS is enabled for your domain.

### 4. Video Element Not Visible
**Problem**: Video might be playing but hidden behind overlay.

**Current Setup**: 
- Video has `z-0` class
- Gradient overlay is `z-20`
- Content is `z-20`

**Solution**: Video should be visible. If not, check if overlay opacity is too high.

### 5. Network/CDN Issues
**Check**: 
- Is Cloudinary URL accessible from Vercel's servers?
- Is the video URL correct?
- Try accessing the URL directly in browser

### 6. Video Format Issues
**Problem**: Browser might not support the codec.

**Check**: Cloudinary video uses `codecs=avc1` (H.264), which is widely supported.

## Debugging Steps

1. **Check Browser Console**:
   ```javascript
   // Run in browser console
   const video = document.querySelector('video');
   console.log('Video src:', video?.src);
   console.log('Video error:', video?.error);
   console.log('Video readyState:', video?.readyState);
   ```

2. **Check Network Tab**:
   - Look for `hero.mp4` request
   - Check status code (should be 200)
   - Check if request completes

3. **Check Video Element**:
   ```javascript
   const video = document.querySelector('video');
   console.log('Video element:', video);
   console.log('Can play:', video?.canPlayType('video/mp4'));
   ```

4. **Force Play**:
   ```javascript
   // In browser console
   const video = document.querySelector('video');
   video?.play().then(() => console.log('Playing!')).catch(e => console.error('Error:', e));
   ```

## Quick Fixes to Try

1. **Verify URL is correct in deployed build**:
   - Open Vercel deployment
   - View page source
   - Search for `hero.mp4`
   - Verify URL matches Cloudinary URL

2. **Check if video loads when accessed directly**:
   - Open: https://res.cloudinary.com/drbh1hki1/video/upload/v1764258826/hero.mp4
   - Should download/play in browser

3. **Check browser console for errors**:
   - Look for CORS errors
   - Look for network errors
   - Look for autoplay warnings

## Next Steps

If video still doesn't work after checking all above:
1. Share browser console errors
2. Share Network tab screenshot
3. Check if video plays when accessed directly
4. Verify Cloudinary account settings allow public access

