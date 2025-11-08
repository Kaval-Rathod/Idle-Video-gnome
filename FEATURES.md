# 🎬 Idle Video Player Extension - Features & Usage

## ✨ New Features Implemented

### 1. **Video Validation** ✓
- **Real-time file checking**: As you type or browse, the extension validates:
  - File exists on disk
  - File is a valid video format (checks MIME type)
  - File is not empty
  - Shows file size in MB

### 2. **Visual Status Feedback** 📊
- **Green ✓**: Valid video file with size info
- **Red ❌**: Invalid file with specific error message
- **Yellow ⚠**: No file selected

### 3. **Video Preview** 🎥
- **Preview Button** (▶): Click to test your video before applying
- Opens video in windowed mode using mpv (800x600)
- Only enabled when video file is valid
- Perfect for catching errors early!

### 4. **Apply Button** 💾
- **Manual Apply**: Changes are validated before saving
- **Confirmation Dialog**: Shows success message with video details
- **Error Prevention**: Won't save invalid paths
- **Extension Auto-Restart**: Script restarts automatically with new video

### 5. **Smart Settings Change Detection** 🔄
- Extension monitors ALL setting changes
- **500ms delay** before restart (prevents rapid restarts)
- **Logs changes** to GNOME Shell journal
- **Graceful restart**: Stops old script → waits → starts new script

## 🎯 How to Use

### Setting Up Your Video

1. **Open Preferences**:
   ```bash
   gnome-extensions prefs idle-video@orko
   ```

2. **Browse for Video**:
   - Click "Browse" button
   - Select your video file (mp4, mkv, webm, avi, mov)
   - Supported formats: Any video/* MIME type

3. **Validate Video**:
   - Status appears automatically below the path
   - Look for **green ✓** with file size

4. **Preview Video** (Optional but Recommended):
   - Click the **▶ (Preview)** button
   - Video opens in mpv window
   - Close window when done checking

5. **Apply Changes**:
   - Click the **"Apply"** button
   - Confirmation dialog shows video info
   - Extension automatically restarts script

### Changing Video Path

**IMPORTANT**: When changing videos, follow this workflow:

1. Browse or paste new path
2. Wait for validation (green ✓)
3. Click **Preview** to test
4. Click **Apply** to save and restart

**The extension will:**
- Stop the old script
- Kill any running mpv instances
- Wait 500ms
- Start new script with new video

### Troubleshooting

#### Video Path Changed But Old Video Still Plays

**Cause**: Settings not applied yet
**Solution**: Click the **Apply** button!

#### Preview Button Disabled

**Cause**: Video file invalid
**Solution**: Check status message below path

#### Extension Not Working After Change

**Solution**: Check logs:
```bash
journalctl /usr/bin/gnome-shell -f | grep idle-video
```

Look for:
- `setting changed: video-path`
- `stopped script and mpv`
- `started script with video=...`

## 🔧 Technical Details

### Settings Schema
```xml
video-path     (string)  - Full path to video file
idle-seconds   (integer) - Seconds before video plays (5-3600)
mute          (boolean) - Mute audio (true/false)
```

### File Validation Process
1. Check path not empty
2. Check file exists (Gio.File.query_exists)
3. Check MIME type starts with "video/"
4. Check file size > 0
5. Return validation result

### Script Restart Flow
```
Settings Changed → Stop Script → Kill MPV → Wait 500ms → Start Script
```

### Preview Command
```bash
mpv --geometry=800x600 --no-osc "/path/to/video.mp4"
```

## 📋 Checklist for Perfect Setup

- [ ] Video file exists on disk
- [ ] File is valid video format
- [ ] Preview plays correctly
- [ ] Applied settings (clicked Apply button)
- [ ] Extension shows in top bar
- [ ] Extension state is ACTIVE
- [ ] Idle time configured (default 30 seconds)
- [ ] Mute setting configured (default off)

## 🎓 Pro Tips

1. **Test First**: Always preview before applying
2. **Use Apply**: Don't just browse - click Apply!
3. **Check Logs**: Monitor `journalctl` when testing
4. **Short Idle Time**: Use 5-10 seconds for testing
5. **Valid Paths**: Avoid special characters in video paths
6. **File Formats**: MP4 and MKV work best
7. **File Size**: Keep videos reasonable (< 2GB recommended)

## 🐛 Common Errors Fixed

### ✓ "Extension not restarting with new video"
**Fixed**: Added Apply button with manual validation

### ✓ "No feedback if video is valid"
**Fixed**: Added real-time validation status

### ✓ "Can't test video before using"
**Fixed**: Added Preview button

### ✓ "Settings change but script uses old video"
**Fixed**: Improved settings change detection with proper restart

## 📝 Example Workflow

```bash
# 1. Open preferences
gnome-extensions prefs idle-video@orko

# 2. In GUI:
#    - Click Browse
#    - Select: /home/user/Videos/my-video.mp4
#    - Status shows: ✓ Valid video (245.3 MB, video/mp4)
#    - Click Preview (video plays in window)
#    - Click Apply

# 3. Confirmation dialog appears
#    "Video Path Updated
#     Extension will restart with new video:
#     ✓ Valid video (245.3 MB, video/mp4)"

# 4. Check logs
journalctl /usr/bin/gnome-shell -f | grep idle-video

# Output:
# idle-video@orko: setting changed: video-path
# idle-video@orko: stopped script and mpv
# idle-video@orko: started script with video=/home/user/Videos/my-video.mp4 seconds=30 mute=false
```

## 🚀 What's Next?

Your extension is now **production-ready** with:
- ✅ Bullet-proof video validation
- ✅ Visual feedback on every action
- ✅ Preview functionality
- ✅ Proper settings management
- ✅ Graceful script restarts
- ✅ Error prevention
- ✅ User-friendly interface

**ENJOY YOUR IDLE VIDEO PLAYER!** 🎉
