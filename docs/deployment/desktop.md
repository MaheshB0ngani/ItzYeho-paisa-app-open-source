# Desktop Deployment (Windows & macOS)

## Windows

### Prerequisites

- Windows 10 version 1903 or later
- Visual Studio 2022 with "Desktop development with C++" workload
- Flutter SDK with Windows support enabled

### Enable Windows Desktop

```bash
flutter config --enable-windows-desktop
```

### Build

```bash
# Debug run
flutter run -d windows

# Release build
flutter build windows --release
```

Output: `build/windows/x64/runner/Release/`

### MSIX Packaging

The project is configured for MSIX (Windows Store) packaging using the `msix` package:

**Configuration in `pubspec.yaml`:**

```yaml
msix_config:
  display_name: Paisa - Expense Tracker
  publisher_display_name: RetroMusic
  publisher: CN=22326927-E77C-435F-B91A-B9831883516E
  identity_name: 42423RetroMusic.Paisa-ExpenseTracker
  msix_version: "4.8.0.0"
  capabilities: internetClient
  store: true
```

**Build MSIX package:**

```bash
flutter pub run msix:create
```

This creates an `.msix` installer that can be submitted to the Microsoft Store or distributed directly.

### Windows Signing

For distribution outside the Store, you need a code-signing certificate:

```bash
flutter pub run msix:create \
  --certificate-path path/to/cert.pfx \
  --certificate-password your_password
```

---

## macOS

### Prerequisites

- macOS 10.14+ (Mojave)
- Xcode 14+
- macOS development entitlements in Apple Developer account

### Enable macOS Desktop

```bash
flutter config --enable-macos-desktop
```

### Build

```bash
# Debug run
flutter run -d macos

# Release build
flutter build macos --release
```

Output: `build/macos/Build/Products/Release/paisa.app`

### Distribution

**Ad-hoc (direct distribution):**

```bash
# Open in Xcode for signing
open macos/Runner.xcworkspace
```

Set your team in signing settings, then archive and export.

**Mac App Store:**

1. Open `macos/Runner.xcworkspace` in Xcode
2. Set deployment target and signing
3. Product → Archive
4. Distribute to App Store

### macOS Entitlements

The `macos/Runner/` directory contains entitlement files:

- `DebugProfile.entitlements` — Entitlements for debug/profile builds
- `Release.entitlements` — Entitlements for release builds

Required entitlements for Paisa:

```xml
<key>com.apple.security.files.user-selected.read-write</key>
<true/>
<!-- For file picker and export -->
```

---

## Platform Comparison

| Feature | Windows | macOS |
|---------|---------|-------|
| Biometric auth | Windows Hello (via local_auth) | Touch ID (via local_auth) |
| File picker | Native | Native |
| Quick Actions | Not supported | Not supported |
| MSIX packaging | Yes | No (use .app / .dmg) |
| Store distribution | Microsoft Store | Mac App Store |

---

## Responsive Layout on Desktop

Paisa uses `responsive_builder` to adapt the UI for larger screens. On desktop:

- Navigation uses a sidebar rail/drawer instead of a bottom nav bar
- Content areas use multi-column layouts
- Forms take up a centered portion of the screen (not full width)

The breakpoints are:
- Mobile: < 600px
- Tablet: 600px–1200px
- Desktop: > 1200px

The `LandingPage` checks `ResponsiveBuilder.isMobile(context)` to switch between layouts.
