# OBS Music Setup for Bitcoin Tracker Stream

## Option 1: VLC Playlist in OBS

### Step 1: Download Music
1. Go to YouTube Audio Library
2. Download 10-20 tracks (Genre: Electronic, Ambient, Lo-fi)
3. Save to folder: `C:\StreamMusic\`

### Step 2: Add VLC Source in OBS
1. In OBS, click **"+"** under Sources
2. Select **"VLC Video Source"**
3. Click **"+"** to add multiple music files
4. Browse to `C:\StreamMusic\` and select all tracks
5. Check **"Loop playlist"**
6. Check **"Shuffle playlist"**
7. Uncheck **"Restart playback when source becomes active"**

### Step 3: Adjust Audio Levels
1. In OBS Audio Mixer (bottom)
2. Find "VLC Video Source"
3. Drag slider to **-20dB to -15dB** (quiet background music)
4. Your widget audio (if any) should be louder

### Step 4: Add Now Playing Text (Optional)
1. Add **Text (GDI+)** source
2. Check **"Read from file"**
3. Point to VLC's current track info
4. Or manually update with current playlist

---

## Option 2: Browser Source with Web Player

### Use Pretzel Rocks (Easiest):
1. Download Pretzel desktop app: https://www.pretzel.rocks/
2. In OBS, add **Browser Source**
3. URL: `http://localhost:5678/player` (Pretzel provides this)
4. Width: 400, Height: 100
5. Position in corner of stream
6. Shows current song playing

---

## Option 3: Spotify (Requires Premium)

### Using Snip (Song Display):
1. Download Snip: https://github.com/dlrudie/Snip/releases
2. Configure for Spotify
3. Outputs current song to text file
4. In OBS, add **Text Source** reading that file

**WARNING**:
- Spotify music may get DMCA strikes on YouTube
- Use only with proper streaming license

---

## Recommended Setup for Bitcoin Tracker:

### Music Style:
- **Lo-fi beats** - Chill, non-distracting
- **Ambient electronic** - Professional feel
- **Synthwave** - Crypto/tech vibe
- **Downtempo** - Relaxing background

### Volume Levels:
- Music: **-20dB to -15dB** (quiet background)
- Your voice (if adding): **-6dB to -3dB**
- Widget sounds: **-10dB**

### Track Length:
- Use **3-5 minute tracks**
- Shuffle to keep it interesting
- Have 20+ tracks to avoid repetition

---

## Complete OBS Scene Setup:

```
Scene: "Bitcoin Tracker Live"
├── Browser Source: https://thecryptob.com/widget/btc (1920x1080)
├── Text: "🔴 LIVE Bitcoin Price Tracker 24/7"
├── Text: "@TheCrypto_B"
├── Image: Your logo (corner)
├── VLC Video Source: Music playlist (shuffle, loop)
└── Text: "Now Playing: [Song Name]"
```

---

## Copyright Safety Tips:

1. ✅ **Always use royalty-free or licensed music**
2. ✅ **YouTube Audio Library is safest**
3. ✅ **Keep music volume lower than main content**
4. ❌ **Avoid**: Spotify, Apple Music, copyrighted songs
5. ❌ **Avoid**: Popular music from radio
6. ✅ **Test with a private stream first**

---

## Recommended YouTube Audio Library Genres:

For Bitcoin/Crypto streams:
- **Electronic** → Gives modern, tech feel
- **Ambient** → Calm, professional
- **Hip Hop & Rap (Instrumentals)** → Energetic
- **World** → Unique vibe

Download 20-30 tracks, shuffle in VLC, and you're set!
