# iOS Deployment

## Prerequisites

- macOS only (Xcode is required)
- Xcode 14+ (for iOS 16+ SDK)
- Apple Developer account ($99/year for TestFlight & App Store)
- CocoaPods: `sudo gem install cocoapods`
- Flutter SDK

## Local Development Build

```bash
# Open iOS Simulator
open -a Simulator

# Run on simulator
flutter run -d "iPhone 15"

# Run on physical device (requires Apple Developer account)
flutter run -d <device-udid>
```

## Building for Distribution

### 1. Open in Xcode

```bash
open ios/Runner.xcworkspace
```

Always open the `.xcworkspace`, not `.xcodeproj`.

### 2. Configure Signing

In Xcode:
1. Select the `Runner` target
2. Go to **Signing & Capabilities**
3. Select your Team
4. Xcode manages signing certificates automatically (Automatically manage signing)

### 3. Build Archive

In Xcode:
- Menu → Product → Archive

Or via CLI:

```bash
flutter build ipa
```

Output: `build/ios/ipa/Paisa.ipa`

### 4. Upload to App Store Connect

- Use Xcode Organizer: Window → Organizer → Distribute App
- Or use `xcrun altool` / `xcrun notarytool`
- Or use `fastlane deliver`

## iOS App Identifiers

| Setting | Value |
|---------|-------|
| Bundle ID | `dev.hemanths.paisa` |
| App Name | Paisa - Expense Tracker |

## iOS Permissions (`Info.plist`)

| Key | Purpose |
|-----|---------|
| `NSFaceIDUsageDescription` | Face ID authentication |
| `NSCameraUsageDescription` | Profile photo capture |
| `NSPhotoLibraryUsageDescription` | Pick profile photo from gallery |

## CocoaPods

The iOS project uses CocoaPods for native plugin dependencies. If you encounter pod-related errors:

```bash
cd ios
pod install
pod update
```

## TestFlight

For beta distribution:
1. Archive and upload to App Store Connect (step 3-4 above)
2. In App Store Connect → TestFlight
3. Add internal/external testers
4. Submit for Beta App Review (external only)

## Common Issues

### `pod install` fails

```bash
cd ios
pod deintegrate
pod install
```

### Signing errors

Make sure your Apple ID is added in Xcode → Settings → Accounts, and you have a valid provisioning profile.

### Build fails after `flutter clean`

```bash
flutter clean
flutter pub get
cd ios && pod install && cd ..
flutter run
```
