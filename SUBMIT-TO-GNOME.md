# 📤 Submit to GNOME Extensions - Complete Guide

This guide explains how to publish your extension on **extensions.gnome.org** so anyone can install it with one click.

## 🎯 Prerequisites

Before submission, ensure:
- ✅ Extension works perfectly on GNOME Shell 46+
- ✅ All files follow GNOME guidelines
- ✅ No external scripts required (✅ already done!)
- ✅ Code is well-documented
- ✅ GPL-3.0 license included
- ✅ Tested on clean GNOME installation

## 📋 Step 1: Register on GNOME Extensions

### 1.1 Create Account
1. Go to https://extensions.gnome.org/
2. Click "Register" or "Log in"
3. Create account (may need to use GNOME GitLab account)

### 1.2 Get Developer Access
1. Log in to extensions.gnome.org
2. Go to your account settings
3. Request developer/publisher access if needed

## 📦 Step 2: Prepare Extension Package

### 2.1 Verify Extension Structure
```bash
cd /home/orko/kiz/code/G-nome/idle-video@orko
ls -la
```

Should contain:
```
idle-video@orko/
├── extension.js     ✅
├── prefs.js        ✅
├── metadata.json   ✅
└── schemas/
    └── org.gnome.shell.extensions.idlevideo.gschema.xml ✅
```

### 2.2 Update metadata.json
Your current metadata.json should have:
```json
{
  "name": "Idle Video",
  "description": "Plays a chosen video when screen is idle",
  "uuid": "idle-video@orko",
  "shell-version": ["46"],
  "version": 1,
  "url": "https://github.com/Kaval-Rathod/Idle-Video-gnome"
}
```

### 2.3 Create ZIP Package
```bash
cd /home/orko/kiz/code/G-nome
cd idle-video@orko

# Compile schema
glib-compile-schemas schemas/

# Create zip (must be named with UUID)
zip -r idle-video@orko.zip extension.js prefs.js metadata.json schemas/

# Move to parent directory
mv idle-video@orko.zip ..
```

## 📤 Step 3: Submit Extension

### 3.1 Upload to GNOME Extensions
1. Go to https://extensions.gnome.org/upload/
2. Click "Choose File" and select `idle-video@orko.zip`
3. Click "Upload"

### 3.2 Fill Extension Details

**Basic Information:**
- **Name**: Idle Video
- **Description**: 
  ```
  Plays a video when your system is idle. Perfect for ambient videos, 
  screensavers, or information displays. Features video validation, 
  preview, configurable idle time, and mute option.
  ```
- **Homepage**: https://github.com/Kaval-Rathod/Idle-Video-gnome
- **UUID**: idle-video@orko (auto-detected)

**Categories:** (Select appropriate ones)
- [ ] Appearance
- [ ] Audio
- [x] Desktop
- [ ] Extensions
- [x] Media
- [ ] Menus
- [ ] System
- [x] Tools
- [ ] Windows

**Tags:**
- idle
- video
- screensaver
- ambient
- media
- player

**Screenshots:**
Upload 2-4 screenshots (PNG, max 2MB each):
1. Preferences window
2. Video playing (screenshot of idle video)
3. Top bar icon
4. File validation feature

### 3.3 Version Information
- **Version**: 1
- **Shell Version**: 46
- **Change Log**:
  ```
  Initial release:
  - Video playback on idle detection
  - Configurable idle duration (5-3600 seconds)
  - Mute option
  - Video file validation
  - Preview functionality
  - Self-contained (no external scripts)
  - Modern Adwaita UI
  ```

## 🔍 Step 4: Review Process

### What GNOME Will Check:
1. **Code Quality**
   - No malicious code
   - Follows GNOME guidelines
   - Proper error handling

2. **Functionality**
   - Works as described
   - No crashes
   - Clean enable/disable

3. **Files**
   - All required files present
   - Schemas compiled
   - metadata.json valid

### Timeline:
- **Initial Review**: 1-7 days
- **Feedback**: Via email or extensions.gnome.org messages
- **Approval**: After addressing any issues

## ✅ Step 5: After Approval

### Your Extension Will:
1. **Appear on Website**
   - Listed at https://extensions.gnome.org/extension/[ID]/idle-video/
   - Searchable by users
   - Downloadable with one click

2. **Be Installable via Browser**
   - Users can install directly from browser
   - GNOME Extension Manager integration

3. **Get Automatic Updates**
   - When you upload new versions
   - Users get update notifications

## 🔄 Step 6: Updating Extension

### For Future Updates:

1. **Update Code**
   ```bash
   cd /home/orko/kiz/code/G-nome/idle-video@orko
   # Make your changes...
   ```

2. **Update Version**
   - Edit `metadata.json`: increment `"version": 2`
   - Add new shell versions if needed: `"shell-version": ["46", "47"]`

3. **Repackage**
   ```bash
   glib-compile-schemas schemas/
   zip -r idle-video@orko.zip extension.js prefs.js metadata.json schemas/
   ```

4. **Upload New Version**
   - Go to your extension page on extensions.gnome.org
   - Click "Upload New Version"
   - Upload new zip
   - Add changelog

## 🚀 Alternative: GNOME Extension Manager

Users can also install via **Extension Manager** app:

```bash
# Users install with:
flatpak install flathub com.mattjakeman.ExtensionManager

# Then search for "Idle Video" in the app
```

## 📊 Tracking Your Extension

After publication, you can track:
- **Downloads**: Number of installs
- **Ratings**: User ratings and reviews
- **Reports**: Bug reports from users
- **Statistics**: Usage over time

## 🐛 If Submission is Rejected

### Common Rejection Reasons:
1. Missing files
2. Code quality issues
3. Security concerns
4. Doesn't work on specified GNOME versions

### How to Fix:
1. Read reviewer feedback carefully
2. Fix the issues
3. Update and resubmit
4. Respond to reviewer comments

## 📝 Best Practices

### For Approval:
- ✅ Test on clean GNOME installation
- ✅ Include detailed description
- ✅ Provide good screenshots
- ✅ Document dependencies (xprintidle, mpv)
- ✅ Respond quickly to reviewer feedback

### For Success:
- ✅ Maintain extension regularly
- ✅ Fix bugs quickly
- ✅ Listen to user feedback
- ✅ Update for new GNOME versions
- ✅ Keep GitHub repo active

## 🔗 Useful Links

- **Submit**: https://extensions.gnome.org/upload/
- **Guidelines**: https://gjs.guide/extensions/review-guidelines/intro.html
- **API Docs**: https://gjs-docs.gnome.org/
- **Your Repo**: https://github.com/Kaval-Rathod/Idle-Video-gnome

## 💡 Tips

1. **Screenshots Matter**: Take clear, attractive screenshots
2. **Description**: Be clear about what extension does
3. **Dependencies**: List all requirements (xprintidle, mpv)
4. **Changelog**: Keep detailed version history
5. **Respond Fast**: Answer reviewer questions quickly

## 📧 Support

If you need help:
- **GNOME Extensions Forum**: https://discourse.gnome.org/c/extensions/
- **IRC**: #extensions on irc.gnome.org
- **Matrix**: #extensions:gnome.org

---

## ✨ Quick Command Reference

```bash
# Package extension
cd /home/orko/kiz/code/G-nome/idle-video@orko
glib-compile-schemas schemas/
zip -r ../idle-video@orko.zip extension.js prefs.js metadata.json schemas/

# Upload the ZIP to https://extensions.gnome.org/upload/

# After approval, users install with:
# 1. Visit extensions.gnome.org
# 2. Search "Idle Video"
# 3. Click "Install"
```

**Your extension will be available to millions of GNOME users worldwide!** 🌍✨
