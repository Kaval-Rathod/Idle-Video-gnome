# 🚀 Quick Start Guide - Idle Video Extension

## ⚡ 5-Minute Setup

### 1. Install (Choose One Method)

#### Option A: Automated Install
```bash
git clone https://github.com/Kaval-Rathod/Idle-Video-gnome.git
cd Idle-Video-gnome
./install.sh
```

#### Option B: Manual Install
```bash
git clone https://github.com/Kaval-Rathod/Idle-Video-gnome.git
mkdir -p ~/.local/share/gnome-shell/extensions/idle-video@orko
cp -r Idle-Video-gnome/idle-video@orko/* ~/.local/share/gnome-shell/extensions/idle-video@orko/
glib-compile-schemas ~/.local/share/gnome-shell/extensions/idle-video@orko/schemas/
gnome-extensions enable idle-video@orko
```

### 2. Install Dependencies
```bash
sudo apt install xprintidle mpv  # Ubuntu/Debian
```

### 3. Restart GNOME Shell
- **X11**: Press `Alt+F2`, type `r`, press `Enter`
- **Wayland**: Log out and log back in

### 4. Configure
```bash
gnome-extensions prefs idle-video@orko
```

1. Click **Browse** → Select your video
2. Verify **✓ Valid video** appears
3. Click **Preview** to test (optional)
4. Click **Apply** to save
5. Set idle time (try 5 seconds for testing)
6. Toggle mute if needed

### 5. Test
- Don't touch mouse/keyboard for your set idle time
- Video should play fullscreen
- Move mouse to stop

## 🎯 That's It!

Your extension is now active and will play your video whenever you're idle.

## 📚 More Info

- **Full docs**: [README.md](README.md)
- **Installation**: [INSTALL.md](INSTALL.md)
- **Features**: [FEATURES.md](FEATURES.md)

## 🐛 Problems?

```bash
# Check logs
journalctl /usr/bin/gnome-shell -f | grep idle-video

# Check status
gnome-extensions info idle-video@orko

# Reinstall
gnome-extensions disable idle-video@orko
gnome-extensions enable idle-video@orko
```

## 💡 Tips

- Use **5-10 seconds** for testing
- Use **30-60 seconds** for daily use
- **MP4 files** work best
- Keep videos **under 2GB**
- Click **Preview** before applying

---

**Enjoy your idle videos!** 🎬
