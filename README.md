# GitHub Shortcuts Helper

A Chrome extension that helps you learn GitHub keyboard shortcuts by showing helpful hints when you interact with the GitHub interface.

## Features

- 💡 Shows keyboard shortcut hints when you click on GitHub navigation elements
- 🎯 Smooth, non-intrusive toast notifications in the bottom right corner
- ⚡ Lightweight and fast - no dependencies needed at runtime
- 🎨 Styled to match GitHub's design language

## Supported Shortcuts

When you click on these GitHub navigation elements, you'll see a toast showing the keyboard shortcut:

- **Pull Requests**: `g then p`
- **Issues**: `g then i`
- **Code**: `g then c`
- **Actions**: `g then a`
- **Projects**: `g then b`
- **Wiki**: `g then w`
- **Notifications**: `g then n`

## Installation

### For Development

1. Clone this repository:
   ```bash
   git clone https://github.com/peckz/github-shortcuts.git
   cd github-shortcuts
   ```

2. Load the extension in Chrome:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" (toggle in the top right)
   - Click "Load unpacked"
   - Select the `github-shortcuts` folder

3. Visit any GitHub repository and start clicking around to see the shortcut hints!

### For Users

This extension will be available in the Chrome Web Store soon.

## How It Works

The extension uses a content script that:
1. Monitors clicks on GitHub navigation elements
2. Detects which element was clicked
3. Shows a toast notification with the corresponding keyboard shortcut
4. Auto-dismisses after 3 seconds

## Development

The extension is built with vanilla JavaScript and CSS - no build process required!

- `manifest.json` - Chrome extension configuration
- `content.js` - Main content script that runs on GitHub pages

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT