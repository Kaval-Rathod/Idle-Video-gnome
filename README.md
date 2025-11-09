# 🎬 Idle Video - GNOME Shell Extension

A polished GNOME Shell extension that plays a video when your system is idle. Perfect for displaying ambient videos, screensavers, or information displays.

![GNOME Shell 46+](https://img.shields.io/badge/GNOME%20Shell-46%2B-blue)
![License](https://img.shields.io/badge/license-GPL--3.0-green)

## ✨ Features

- 🎥 **Automatic Video Playback** - Plays your chosen video when system is idle
- 🎵 **Smart Audio Detection** - Won't interrupt audio playback (e.g., YouTube, music, podcasts)
- ⏱️ **Configurable Idle Time** - Set idle duration from 5 seconds to 1 hour
- 🔇 **Mute Option** - Choose to play video with or without sound
- 👁️ **Video Preview** - Test your video before applying
- ✅ **File Validation** - Real-time validation of video files
- 🎯 **Self-Contained** - No external scripts needed
- 🖥️ **Top Bar Integration** - Quick access to preferences
- 🔄 **Hot Reload** - Changes apply immediately without restarting
- 🖱️ **Instant Stop** - Video stops when you move mouse or press any key

## 📸 Screenshots

### Preferences Window
![Preferences](screenshots/preferences.png)
*Easy-to-use preferences with video validation and preview*

### Video Playing on Idle
![Video Playing](screenshots/video-playing.png)
*Fullscreen video playback when idle*

## 🚀 Installation

### Method 1: From GitHub (Recommended)

```bash
# Clone the repository
git clone https://github.com/Kaval-Rathod/Idle-Video-gnome.git

# Create extension directory
mkdir -p ~/.local/share/gnome-shell/extensions/idle-video@orko

# Copy extension files
cp -r Idle-Video-gnome/idle-video@orko/* ~/.local/share/gnome-shell/extensions/idle-video@orko/

# Enable the extension
gnome-extensions enable idle-video@orko

# Restart GNOME Shell
# X11: Press Alt+F2, type 'r', press Enter
# Wayland: Log out and log back in
```

### Method 2: Manual Installation

1. Download the latest release from [Releases](https://github.com/Kaval-Rathod/Idle-Video-gnome/releases)
2. Extract to `~/.local/share/gnome-shell/extensions/idle-video@orko/`
3. Enable: `gnome-extensions enable idle-video@orko`
4. Restart GNOME Shell (see method above)

### Uninstalling

```bash
# Disable and remove extension
gnome-extensions disable idle-video@orko
rm -rf ~/.local/share/gnome-shell/extensions/idle-video@orko
```

## 📋 Requirements

- **GNOME Shell**: Version 46 or higher
- **Display Server**: X11 (Wayland support coming soon)
- **Dependencies**:
  - `xprintidle` - For idle detection on X11
  - `mpv` - Video player
  - `pulseaudio-utils` or `pipewire-pulse` - For audio detection

### Install Dependencies

```bash
# Ubuntu/Debian
sudo apt install xprintidle mpv pulseaudio-utils

# Fedora
sudo dnf install xprintidle mpv pulseaudio-utils

# Arch Linux
sudo pacman -S xprintidle mpv libpulse
```

## 🎯 Usage

### Quick Start

1. **Open Preferences**
   - Click the video icon in the top bar
   - Select "Preferences..."

2. **Select Video**
   - Click "Browse" button
   - Choose your video file
   - Supported formats: `.mp4`, `.mkv`, `.webm`, `.avi`, `.mov`
   - Status shows validation (file size and format)

3. **Preview Video** (Optional)
   - Click the ▶️ button to test playback
   - Ensures your video works before applying

4. **Apply Settings**
   - Click "Apply" button
   - Extension restarts automatically with new settings

5. **Configure Options**
   - Set idle time (5-3600 seconds)
   - Toggle mute on/off

### How It Works

- **Video starts** when system is idle for the configured duration AND no audio is playing
- **Video stops** immediately when you:
  - Move your mouse
  - Press any key
  - Click anywhere
  - Resume audio playback
- **Video won't start** if audio is already playing (music, videos, calls, etc.)

### Settings

| Setting | Description | Default | Range |
|---------|-------------|---------|-------|
| **Video Path** | Full path to video file | None | Any valid video file |
| **Idle Time** | Seconds before video plays | 30 | 5 - 3600 seconds |
| **Mute** | Play without sound | Off | On / Off |

## 🔧 Configuration

Settings are stored using GSettings. You can also configure via command line:

```bash
# View all settings
gsettings --schemadir ~/.local/share/gnome-shell/extensions/idle-video@orko/schemas \
  list-recursively org.gnome.shell.extensions.idlevideo

# Set video path
gsettings --schemadir ~/.local/share/gnome-shell/extensions/idle-video@orko/schemas \
  set org.gnome.shell.extensions.idlevideo video-path '/path/to/video.mp4'

# Set idle time (in seconds)
gsettings --schemadir ~/.local/share/gnome-shell/extensions/idle-video@orko/schemas \
  set org.gnome.shell.extensions.idlevideo idle-seconds 30

# Toggle mute
gsettings --schemadir ~/.local/share/gnome-shell/extensions/idle-video@orko/schemas \
  set org.gnome.shell.extensions.idlevideo mute true
```

## 🐛 Troubleshooting

### Video Not Playing

**1. Check Dependencies**
```bash
which xprintidle mpv
# Both should return paths. If not, install missing dependencies.
```

**2. Verify Video Path**
- Open preferences
- Ensure status message shows "✓ Valid video"
- Try a different video file

**3. Check if Audio is Playing**
- Extension won't play video if audio is active
- Pause any music/videos and try again

**4. Check Logs**
```bash
journalctl /usr/bin/gnome-shell -f | grep idle-video
```

### Extension Not Loading

**1. Check Extension Status**
```bash
gnome-extensions list --enabled | grep idle-video
```

**2. Reinstall Extension**
```bash
gnome-extensions disable idle-video@orko
gnome-extensions enable idle-video@orko
# Restart GNOME Shell
```

**3. Check for Errors**
```bash
journalctl /usr/bin/gnome-shell -n 50 | grep error
```

### Video Preview Not Working

- Ensure mpv is installed: `sudo apt install mpv`
- Check that video file is valid and not corrupted
- Try a different video format

### Video Stuttering or Performance Issues

- Use lower resolution videos
- Ensure your system meets hardware requirements
- Try enabling mute option to reduce resource usage

## 🏗️ Development

### Project Structure

```
idle-video@orko/
├── extension.js          # Main extension logic
├── prefs.js             # Preferences UI
├── metadata.json        # Extension metadata
└── schemas/
    └── org.gnome.shell.extensions.idlevideo.gschema.xml
```

### Building from Source

```bash
# Clone repository
git clone https://github.com/Kaval-Rathod/Idle-Video-gnome.git
cd Idle-Video-gnome/idle-video@orko

# Compile schema
glib-compile-schemas schemas/

# Install to local extensions
mkdir -p ~/.local/share/gnome-shell/extensions/idle-video@orko
cp -r * ~/.local/share/gnome-shell/extensions/idle-video@orko/

# Enable extension
gnome-extensions enable idle-video@orko
```

### Testing

```bash
# Watch logs in real-time
journalctl /usr/bin/gnome-shell -f | grep idle-video

# Test with short idle time (5 seconds)
gsettings --schemadir ~/.local/share/gnome-shell/extensions/idle-video@orko/schemas \
  set org.gnome.shell.extensions.idlevideo idle-seconds 5
```

## 🤝 Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

### Quick Start for Contributors

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

All contributors will be credited in [CONTRIBUTORS.md](CONTRIBUTORS.md).

## 📝 License

**Owner**: Kaval Rathod ([@Kaval-Rathod](https://github.com/Kaval-Rathod))

This project is licensed under the **GPL-3.0 License** - see the [LICENSE](LICENSE) file for details.

### Usage Rights

- ✅ Free to use, modify, and distribute
- ✅ Open for contributions from anyone
- ✅ Must remain open source (GPL-3.0 requirement)
- ❌ No commercial sale without owner's permission

## 🙏 Acknowledgments

- GNOME Shell Extension developers community
- mpv media player team
- xprintidle project contributors

## 📧 Contact

**Kaval Rathod** - [@Kaval-Rathod](https://github.com/Kaval-Rathod)

**Project Link**: [https://github.com/Kaval-Rathod/Idle-Video-gnome](https://github.com/Kaval-Rathod/Idle-Video-gnome)

---

⭐ **If you find this extension useful, please star the repository!**

## 🗺️ Roadmap

- [ ] Wayland support (using org.gnome.Mutter.IdleMonitor)
- [ ] Multiple video playlist support
- [ ] Fade in/out transitions
- [ ] Custom video position/size options
- [ ] Schedule different videos for different times
- [ ] Integration with GNOME screensaver
- [ ] Video effects and filters
- [ ] Picture-in-picture mode option

## 📊 Changelog

### Version 1.0.0 (Initial Release)
- ✨ Video playback on idle
- ⚙️ Configurable idle duration (5-3600 seconds)
- 🔇 Mute option
- 👁️ Video preview feature
- ✅ Real-time file validation
- 🎨 Modern Adwaita UI
- 🎵 Smart audio detection
- 🖱️ Instant stop on user activity
