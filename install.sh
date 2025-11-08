#!/bin/bash
# Idle Video GNOME Extension - Installation Script

set -e

EXTENSION_UUID="idle-video@orko"
EXTENSION_DIR="$HOME/.local/share/gnome-shell/extensions/$EXTENSION_UUID"
SOURCE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/$EXTENSION_UUID"

echo "🎬 Installing Idle Video GNOME Extension..."
echo ""

# Check if GNOME Shell is installed
if ! command -v gnome-shell &> /dev/null; then
    echo "❌ Error: GNOME Shell is not installed"
    exit 1
fi

# Check GNOME Shell version
GNOME_VERSION=$(gnome-shell --version | awk '{print $3}' | cut -d'.' -f1)
if [ "$GNOME_VERSION" -lt 46 ]; then
    echo "⚠️  Warning: This extension requires GNOME Shell 46 or higher"
    echo "   Your version: $(gnome-shell --version)"
    read -p "Continue anyway? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Check dependencies
echo "📦 Checking dependencies..."
MISSING_DEPS=()

if ! command -v xprintidle &> /dev/null; then
    MISSING_DEPS+=("xprintidle")
fi

if ! command -v mpv &> /dev/null; then
    MISSING_DEPS+=("mpv")
fi

if [ ${#MISSING_DEPS[@]} -gt 0 ]; then
    echo "⚠️  Missing dependencies: ${MISSING_DEPS[*]}"
    echo ""
    echo "Install with:"
    echo "  Ubuntu/Debian: sudo apt install ${MISSING_DEPS[*]}"
    echo "  Fedora:        sudo dnf install ${MISSING_DEPS[*]}"
    echo "  Arch:          sudo pacman -S ${MISSING_DEPS[*]}"
    echo ""
    read -p "Continue anyway? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Create extension directory
echo "📁 Creating extension directory..."
mkdir -p "$EXTENSION_DIR"

# Copy extension files
echo "📋 Copying extension files..."
if [ -d "$SOURCE_DIR" ]; then
    cp -r "$SOURCE_DIR"/* "$EXTENSION_DIR/"
else
    echo "❌ Error: Source directory not found: $SOURCE_DIR"
    exit 1
fi

# Compile schema
echo "🔧 Compiling GSettings schema..."
cd "$EXTENSION_DIR"
if [ -d "schemas" ]; then
    glib-compile-schemas schemas/
else
    echo "❌ Error: schemas directory not found"
    exit 1
fi

# Enable extension
echo "✅ Enabling extension..."
gnome-extensions enable "$EXTENSION_UUID" 2>/dev/null || true

echo ""
echo "✨ Installation complete!"
echo ""
echo "📝 Next steps:"
echo "   1. Restart GNOME Shell:"
echo "      - X11: Press Alt+F2, type 'r', press Enter"
echo "      - Wayland: Log out and log back in"
echo ""
echo "   2. Open preferences:"
echo "      gnome-extensions prefs $EXTENSION_UUID"
echo ""
echo "   3. Configure your video and enjoy!"
echo ""
echo "📚 Documentation: https://github.com/Kaval-Rathod/Idle-Video-gnome"
