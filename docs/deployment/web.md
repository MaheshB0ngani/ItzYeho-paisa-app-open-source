# Web Deployment

## Overview

Paisa runs on the web using Flutter Web. The web build produces a static site that can be hosted on any static hosting provider (GitHub Pages, Netlify, Vercel, Firebase Hosting, etc.).

## Building for Web

```bash
# Production web build
flutter build web --release

# Debug web build (for testing)
flutter build web
```

Output directory: `build/web/`

## Running Locally

```bash
# Serve locally (uses Flutter's built-in web server)
flutter run -d chrome

# Or serve the build output with any static server
cd build/web
python3 -m http.server 8080
# → Open http://localhost:8080
```

## URL Strategy

The app uses path-based URLs (no `#` hash) via `url_strategy`:

```dart
// lib/main.dart
import 'package:url_strategy/url_strategy.dart';
usePathUrlStrategy();
```

This means URLs look like `/landing/settings` instead of `/#/landing/settings`.

::: warning Server Configuration Required
Path-based routing requires the server to redirect all routes to `index.html`. Without this, direct URL access or page refresh will return a 404.
:::

## Hosting on GitHub Pages

### Using GitHub Actions

Add a workflow `.github/workflows/deploy-web.yml`:

```yaml
name: Deploy Web

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: subosito/flutter-action@v2
        with:
          channel: stable
      - run: flutter pub get
      - run: flutter pub run build_runner build --delete-conflicting-outputs
      - run: flutter build web --release --base-href /paisa/
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./build/web
```

### Manual Deploy

```bash
flutter build web --release --base-href /your-repo-name/
# Then push build/web/ to the gh-pages branch
```

## Hosting on Netlify

1. Build: `flutter build web --release`
2. Drag and drop `build/web/` to Netlify Drop

Or connect your GitHub repo and configure:
- **Build command:** `flutter pub get && flutter pub run build_runner build --delete-conflicting-outputs && flutter build web --release`
- **Publish directory:** `build/web`

**Redirect rule** (`build/web/_redirects`):
```
/* /index.html 200
```

## Hosting on Vercel

```json
// vercel.json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

Deploy:
```bash
npx vercel --prod
```

## Hosting on Firebase

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Initialize
firebase init hosting
# → Public directory: build/web
# → Single-page app: Yes

# Build and deploy
flutter build web --release
firebase deploy --only hosting
```

## Web PWA Support

The app includes a `web/manifest.json` making it installable as a PWA:

```json
{
  "name": "Paisa - Expense Tracker",
  "short_name": "Paisa",
  "start_url": ".",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#6750A4",
  "description": "Personal expense tracker"
}
```

Users on Chrome/Edge can install it to their desktop or home screen via the browser's install prompt.

## Web Limitations vs Native

| Feature | Web | Native |
|---------|-----|--------|
| Biometric auth | Not supported | Full support |
| Quick Actions (shortcuts) | Not supported | Full support |
| File picker | Supported (download/upload) | Supported (native dialog) |
| High refresh rate | Browser-controlled | App-controlled |
| Local storage (Hive) | IndexedDB | App file system |
| Share | Web Share API (limited) | Native share sheet |

## Performance Tips

- Use `--wasm` flag (Flutter WebAssembly) for better performance on modern browsers:
  ```bash
  flutter build web --release --wasm
  ```
- Enable `CanvasKit` renderer (default for release):
  ```bash
  flutter build web --release --web-renderer canvaskit
  ```
