# Contributing to Idle Video GNOME Extension

Thank you for your interest in contributing! This extension is open source and welcomes contributions from the community.

## 📜 License & Ownership

- **Owner**: Kaval Rathod ([@Kaval-Rathod](https://github.com/Kaval-Rathod))
- **License**: GPL-3.0 (Free and Open Source)
- **Usage**: Free for everyone
- **Restrictions**: No commercial sale or profit without owner's permission
- **Contributions**: Welcome from anyone!

## 🤝 How to Contribute

### 1. Fork the Repository
```bash
# Click "Fork" on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/Idle-Video-gnome.git
cd Idle-Video-gnome
```

### 2. Create a Branch
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

### 3. Make Your Changes
- Follow the existing code style
- Test your changes thoroughly
- Update documentation if needed

### 4. Test Your Changes
```bash
# Install your modified extension
mkdir -p ~/.local/share/gnome-shell/extensions/idle-video@orko
cp -r idle-video@orko/* ~/.local/share/gnome-shell/extensions/idle-video@orko/
glib-compile-schemas ~/.local/share/gnome-shell/extensions/idle-video@orko/schemas/

# Enable and test
gnome-extensions enable idle-video@orko

# Check logs
journalctl /usr/bin/gnome-shell -f | grep idle-video
```

### 5. Commit Your Changes
```bash
git add .
git commit -m "Description of your changes"
```

### 6. Push and Create Pull Request
```bash
git push origin feature/your-feature-name
```

Then go to GitHub and create a Pull Request.

## 🎯 Areas for Contribution

### High Priority
- [ ] **Wayland Support** - Use org.gnome.Mutter.IdleMonitor instead of xprintidle
- [ ] **Video Playlist** - Support multiple videos with shuffle
- [ ] **Fade Transitions** - Smooth fade in/out effects
- [ ] **Better Error Handling** - More user-friendly error messages

### Medium Priority
- [ ] **Custom Video Position** - Window mode with position/size options
- [ ] **Video Effects** - Brightness, contrast, filters
- [ ] **Time-based Schedules** - Different videos for different times
- [ ] **Multi-monitor Support** - Choose which screen to play on

### Nice to Have
- [ ] **Video Thumbnails** - Show preview in preferences
- [ ] **Keyboard Shortcuts** - Quick enable/disable
- [ ] **System Integration** - Work with GNOME screensaver
- [ ] **Statistics** - Track playback time

## 📝 Code Style Guidelines

### JavaScript (ES6)
```javascript
// Use const/let, not var
const myConstant = 'value';
let myVariable = 0;

// Use arrow functions
const myFunction = () => {
    console.log('Use 4-space indentation');
};

// Use template literals
console.log(`Message: ${variable}`);
```

### Naming Conventions
- **Private variables/functions**: `_variableName` (underscore prefix)
- **Constants**: `UPPER_CASE`
- **Classes**: `PascalCase`
- **Functions**: `camelCase`

### Comments
```javascript
// Single-line comments for brief explanations

/**
 * Multi-line comments for function documentation
 * @param {string} path - Path to video file
 * @returns {boolean} Success status
 */
function myFunction(path) {
    // Implementation
}
```

## 🐛 Reporting Bugs

### Before Reporting
1. Check existing issues
2. Test with latest version
3. Check logs: `journalctl /usr/bin/gnome-shell -n 50 | grep idle-video`

### Bug Report Should Include
- GNOME Shell version: `gnome-shell --version`
- Extension version
- Steps to reproduce
- Expected behavior
- Actual behavior
- Error logs (if any)

## ✨ Feature Requests

Open an issue with:
- Clear description of the feature
- Use case / why it's needed
- Proposed implementation (optional)
- Any similar features in other extensions

## 🔍 Code Review Process

1. **Automatic Checks**
   - Code must be syntactically valid
   - No obvious security issues

2. **Manual Review**
   - Code quality and style
   - Functionality testing
   - Documentation completeness

3. **Owner Approval**
   - Final review by Kaval Rathod
   - Merge or feedback provided

## 📚 Resources

### GNOME Extension Development
- [GNOME Shell Extensions](https://gjs.guide/extensions/)
- [GJS Documentation](https://gjs-docs.gnome.org/)
- [GNOME Shell Source](https://gitlab.gnome.org/GNOME/gnome-shell)

### This Extension
- [README](README.md) - Full documentation
- [INSTALL](INSTALL.md) - Installation guide
- [QUICKSTART](QUICKSTART.md) - Quick setup

## 🙏 Recognition

All contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Credited in extension metadata (for major contributions)

## 📧 Questions?

- **Issues**: [GitHub Issues](https://github.com/Kaval-Rathod/Idle-Video-gnome/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Kaval-Rathod/Idle-Video-gnome/discussions)
- **Owner**: [@Kaval-Rathod](https://github.com/Kaval-Rathod)

## 🎉 Thank You!

Your contributions help make this extension better for everyone!

---

**Remember**: This is **free and open source**. No commercial use without permission. All contributions are under GPL-3.0 license.
