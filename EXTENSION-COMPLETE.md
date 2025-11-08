# 🎉 GNOME Idle Video Extension - COMPLETE & SELF-CONTAINED

## ✅ What Changed

### Before (OLD):
- Extension launched external bash script (`~/bin/idle-video-player.sh`)
- Script used `xprintidle` and spawned `mpv`
- Environment variables passed through shell
- Script could run independently from extension

### Now (NEW):
- **100% self-contained** GNOME Shell extension
- **NO external scripts required**
- Extension directly monitors idle time using `xprintidle`
- Extension directly launches and controls `mpv`
- Everything happens inside GNOME Shell process

## 🚀 How It Works Now

### Architecture
```
GNOME Shell Extension
    ↓
[Check every 2 seconds]
    ↓
xprintidle → Get idle time in milliseconds
    ↓
If idle ≥ threshold → Launch mpv fullscreen
If active → Kill mpv
```

### Code Flow
1. **Extension Enable**: Start idle monitoring (GLib.timeout_add every 2s)
2. **Check Idle**: Call `xprintidle` command
3. **Compare**: Idle time vs threshold from settings
4. **Action**: 
   - Idle → Start mpv if not already running
   - Active → Stop mpv if running
5. **Extension Disable**: Stop monitoring, kill mpv

## 📋 Features

### ✅ Fully Implemented
- [x] Self-contained extension (no external scripts)
- [x] Real-time idle monitoring (2-second polling)
- [x] Direct mpv control (start/stop)
- [x] Settings validation in preferences
- [x] Video file preview
- [x] Apply button with confirmation
- [x] Auto-restart on settings change
- [x] Proper cleanup on disable
- [x] Status indicator in top bar
- [x] Preferences GUI with validation

### 🎯 User Experience
- **Top Bar Icon**: Shows extension is active
- **Preferences Window**: Browse, preview, apply video
- **Real-time Validation**: File size, MIME type, existence
- **Visual Feedback**: Green ✓ / Red ❌ status
- **Preview Button**: Test video before applying
- **Apply Button**: Manual save with confirmation

## 🔧 Technical Details

### Files Structure
```
~/.local/share/gnome-shell/extensions/idle-video@orko/
├── extension.js       ← Main logic (idle monitoring, mpv control)
├── prefs.js          ← Preferences GUI with validation
├── metadata.json     ← Extension metadata
└── schemas/
    └── org.gnome.shell.extensions.idlevideo.gschema.xml
```

### Extension.js Key Functions
- `_getIdleTime()`: Calls xprintidle synchronously
- `_startMpv()`: Spawns mpv with proper arguments
- `_stopMpv()`: Kills mpv using PID
- `_checkIdle()`: Timeout callback (every 2s)
- `_startMonitoring()`: Starts the timeout loop
- `_stopMonitoring()`: Stops timeout, kills mpv

### Dependencies
- **xprintidle**: X11 idle time detection
  ```bash
  sudo apt install xprintidle
  ```
- **mpv**: Video player
  ```bash
  sudo apt install mpv
  ```

### Settings Schema
```xml
<key name="video-path" type="s">
  <default>''</default>
  <summary>Video file path</summary>
</key>

<key name="idle-seconds" type="i">
  <default>30</default>
  <range min="5" max="3600"/>
  <summary>Idle duration in seconds</summary>
</key>

<key name="mute" type="b">
  <default>false</default>
  <summary>Mute audio</summary>
</key>
```

## 🎮 Usage

### 1. Open Preferences
```bash
gnome-extensions prefs idle-video@orko
```
OR click icon in top bar → "Preferences..."

### 2. Select Video
- Click **Browse** button
- Select video file (mp4, mkv, webm, avi, mov)
- Status shows: `✓ Valid video (245.3 MB, video/mp4)`

### 3. Preview (Optional)
- Click **▶ Preview** button
- Video opens in windowed mpv
- Close window after checking

### 4. Apply Settings
- Click **Apply** button
- Confirmation dialog appears
- Extension restarts monitoring automatically

### 5. Test
- Set idle time to **5 seconds** for testing
- Wait 5 seconds without moving mouse/keyboard
- Video should play fullscreen
- Move mouse → video stops

## 🐛 Troubleshooting

### Video Not Playing
1. Check extension is ACTIVE:
   ```bash
   gnome-extensions info idle-video@orko | grep State
   ```

2. Check video path is set:
   ```bash
   gsettings --schemadir ~/.local/share/gnome-shell/extensions/idle-video@orko/schemas get org.gnome.shell.extensions.idlevideo video-path
   ```

3. Check logs:
   ```bash
   journalctl /usr/bin/gnome-shell -f | grep idle-video
   ```

### Extension Not Starting
```bash
# Restart GNOME Shell
pkill -HUP gnome-shell

# Or reload extension
gnome-extensions disable idle-video@orko
gnome-extensions enable idle-video@orko
```

### Settings Not Saving
- Make sure to click **Apply** button
- Check logs for errors
- Verify schema is compiled:
  ```bash
  ls ~/.local/share/gnome-shell/extensions/idle-video@orko/schemas/gschemas.compiled
  ```

## 📊 Comparison: Before vs After

| Feature | Before (Script-based) | After (Self-contained) |
|---------|----------------------|------------------------|
| External script needed | ✅ Yes (~70 lines bash) | ❌ No |
| Extension complexity | Low (just launcher) | High (full logic) |
| Environment variables | Required | Not used |
| Process management | Shell background jobs | GLib.spawn_async |
| PID tracking | None | GLib.child_watch_add |
| Error handling | Bash exit codes | Try-catch blocks |
| Idle detection | Script polls xprintidle | Extension polls xprintidle |
| MPV control | Script spawns/kills | Extension spawns/kills |
| Cleanup on disable | pkill commands | Direct PID kill |

## 🎓 What You Learned

### GNOME Shell Extension Development
- ES6 module syntax (import/export)
- GLib spawn functions (async vs sync)
- GLib.timeout_add for periodic tasks
- Child process management
- GSettings integration
- Panel button creation
- Preferences window with Adw widgets

### Linux System Programming
- Process spawning and monitoring
- PID tracking and cleanup
- Signal handling (SIGTERM)
- File validation with Gio
- MIME type detection
- Idle time detection with xprintidle

## 🚀 Next Steps (Optional Enhancements)

### Possible Improvements
1. **Wayland Support**: Use `org.gnome.Mutter.IdleMonitor` DBus instead of xprintidle
2. **Playlist**: Support multiple videos in rotation
3. **Schedule**: Only play during certain hours
4. **Shuffle**: Random video selection
5. **Fade**: Smooth fade in/out transitions
6. **Lock Integration**: Don't play when screen is locked
7. **Network Videos**: Support streaming URLs
8. **Performance**: Use async idle detection

### Advanced Features
- Video categories (morning, evening, work, break)
- Integration with system theme (dark mode detection)
- Statistics (how often, how long videos played)
- Notification when video starts
- Quick settings toggle (no preferences window)

## 🎉 Success!

Your extension is now:
- ✅ **Fully self-contained** (no external scripts)
- ✅ **Production ready** (error handling, validation)
- ✅ **User friendly** (GUI, preview, feedback)
- ✅ **Properly integrated** (GNOME Shell lifecycle)
- ✅ **Well documented** (code comments, README)

**ENJOY YOUR IDLE VIDEO PLAYER!** 🎬

---

## 📝 Quick Reference

### Start/Stop Extension
```bash
gnome-extensions enable idle-video@orko
gnome-extensions disable idle-video@orko
```

### View Logs
```bash
journalctl /usr/bin/gnome-shell -f | grep idle-video
```

### Check Settings
```bash
gsettings --schemadir ~/.local/share/gnome-shell/extensions/idle-video@orko/schemas list-recursively org.gnome.shell.extensions.idlevideo
```

### Test Manually
```bash
# Check idle time (milliseconds)
xprintidle

# Test mpv
mpv --fs --loop=no --no-osc /path/to/video.mp4
```
