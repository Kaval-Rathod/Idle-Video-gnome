# Idle Video GNOME Extension - Installation Guide

## 📦 Installation Methods

### Method 1: Quick Install (Recommended)

```bash
# 1. Clone the repository
git clone https://github.com/Kaval-Rathod/Idle-Video-gnome.git
cd Idle-Video-gnome

# 2. Run installation script
chmod +x install.sh
./install.sh

# 3. Restart GNOME Shell
# X11: Press Alt+F2, type 'r', press Enter
# Wayland: Log out and log back in
```

### Method 2: Manual Installation

```bash
# 1. Create extension directory
mkdir -p ~/.local/share/gnome-shell/extensions/idle-video@orko

# 2. Copy all files
cp -r idle-video@orko/* ~/.local/share/gnome-shell/extensions/idle-video@orko/

# 3. Compile schema
cd ~/.local/share/gnome-shell/extensions/idle-video@orko
glib-compile-schemas schemas/

# 4. Enable extension
gnome-extensions enable idle-video@orko

# 5. Restart GNOME Shell
```

## 🔧 Install Dependencies

### Ubuntu / Debian
```bash
sudo apt update
sudo apt install xprintidle mpv
```

### Fedora
```bash
sudo dnf install xprintidle mpv
```

### Arch Linux
```bash
sudo pacman -S xprintidle mpv
```

### openSUSE
```bash
sudo zypper install xprintidle mpv
```

## ✅ Verify Installation

```bash
# Check if extension is enabled
gnome-extensions list --enabled | grep idle-video

# Check dependencies
which xprintidle mpv

# Open preferences
gnome-extensions prefs idle-video@orko
```

## 🎬 First Time Setup

1. **Open Preferences**
   ```bash
   gnome-extensions prefs idle-video@orko
   ```

2. **Select Video File**
   - Click "Browse" button
   - Choose your video (mp4, mkv, webm, avi, mov)
   - Verify green ✓ appears with file size

3. **Test Video** (Optional)
   - Click ▶️ Preview button
   - Video should play in a window

4. **Apply Settings**
   - Click "Apply" button
   - Dialog confirms video is updated

5. **Configure Idle Time**
   - Set seconds (5-3600)
   - Default: 30 seconds

6. **Test Idle Detection**
   - Set to 5 seconds for testing
   - Don't touch mouse/keyboard for 5 seconds
   - Video should play fullscreen

## 🔄 Updating

```bash
# Pull latest changes
cd Idle-Video-gnome
git pull

# Reinstall
./install.sh

# Restart GNOME Shell
```

## ❌ Uninstalling

```bash
# Disable extension
gnome-extensions disable idle-video@orko

# Remove extension files
rm -rf ~/.local/share/gnome-shell/extensions/idle-video@orko

# Restart GNOME Shell
```

## 🐛 Common Issues

### Extension Not Appearing
- Restart GNOME Shell: Alt+F2 → 'r' → Enter (X11)
- Check logs: `journalctl /usr/bin/gnome-shell -n 50`

### Video Not Playing
- Install dependencies: `sudo apt install xprintidle mpv`
- Check video file is valid
- Verify video path in settings

### Permission Errors
- Ensure video file is readable: `chmod +r /path/to/video.mp4`
- Check extension directory permissions

## 📝 Configuration Files

```
~/.local/share/gnome-shell/extensions/idle-video@orko/
├── extension.js          # Main extension
├── prefs.js             # Preferences UI
├── metadata.json        # Extension info
└── schemas/             # Settings schema
    ├── gschemas.compiled
    └── org.gnome.shell.extensions.idlevideo.gschema.xml
```

## 💡 Tips

- **For Testing**: Set idle time to 5 seconds
- **For Production**: Use 30-60 seconds minimum
- **File Formats**: MP4 and MKV work best
- **File Size**: Keep videos under 2GB for best performance
- **Mute Option**: Enable for silent background videos

## 🆘 Getting Help

- **Issues**: [GitHub Issues](https://github.com/Kaval-Rathod/Idle-Video-gnome/issues)
- **Logs**: `journalctl /usr/bin/gnome-shell -f | grep idle-video`
- **Status**: `gnome-extensions info idle-video@orko`
