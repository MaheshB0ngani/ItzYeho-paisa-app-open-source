# Android Deployment

## Build Flavors

The app has two Android flavors:

| Flavor | Package ID Suffix | Use Case |
|--------|------------------|----------|
| `dev` | `.dev` | Local development, testing |
| `prod` | (none) | Production releases |

**Production package name:** `dev.hemanths.paisa`

## Prerequisites

- Java 17 (JDK)
- Android SDK (API 21–34)
- Android keystore file (for signed builds)
- Flutter SDK

## Local Debug Build (No Signing)

```bash
# Debug APK (dev flavor)
flutter build apk --flavor dev --debug

# Run on connected device
flutter run --flavor dev
```

## Production Build

### 1. Create a Keystore (First Time Only)

```bash
keytool -genkey -v \
  -keystore ~/paisa-release.jks \
  -alias paisa \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000
```

### 2. Create `android/key.properties`

Create this file (it's in `.gitignore` — never commit it):

```properties
storeFile=/path/to/paisa-release.jks
storePassword=your_store_password
keyPassword=your_key_password
keyAlias=paisa
```

### 3. Build Signed APK

```bash
flutter build apk --flavor prod --release --no-tree-shake-icons
```

Output: `build/app/outputs/flutter-apk/app-prod-release.apk`

### 4. Build App Bundle (AAB) for Google Play

```bash
flutter build appbundle --flavor prod --release --no-tree-shake-icons
```

Output: `build/app/outputs/bundle/prodRelease/app-prod-release.aab`

## Android Build Config

Key settings in `android/app/build.gradle`:

```groovy
android {
    namespace "dev.hemanths.paisa"
    compileSdkVersion 34

    defaultConfig {
        applicationId "dev.hemanths.paisa"
        minSdkVersion 21        // Android 5.0+
        targetSdkVersion 34     // Android 14
        versionCode 608
        versionName "6.0.8"
        multiDexEnabled true
    }

    flavorDimensions "default"
    productFlavors {
        dev {
            dimension "default"
            applicationIdSuffix ".dev"
            versionNameSuffix "-dev"
        }
        prod {
            dimension "default"
        }
    }

    buildTypes {
        release {
            minifyEnabled true
            shrinkResources true
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
            signingConfig signingConfigs.release
        }
    }
}
```

## Google Play Deployment

### Manual Upload

1. Build the AAB (step 4 above)
2. Go to [Google Play Console](https://play.google.com/console)
3. Select your app → Release → Internal testing
4. Upload the `.aab` file

### Automated via CI/CD

See [CI/CD Pipeline](/deployment/cicd) — the GitHub Actions workflow handles Play Store upload automatically on every tagged release.

## APK Installation (Sideloading)

For direct installation without Play Store:

```bash
# Install on connected device
adb install build/app/outputs/flutter-apk/app-prod-release.apk
```

Or share the APK file directly. The user must enable "Install from unknown sources" on their device.

## Android Permissions

The app requests these permissions (defined in `AndroidManifest.xml`):

| Permission | Purpose |
|-----------|---------|
| `USE_BIOMETRIC` | Fingerprint/face authentication |
| `USE_FINGERPRINT` | Legacy fingerprint support |
| `READ_EXTERNAL_STORAGE` | Import backup files (Android ≤ 12) |
| `WRITE_EXTERNAL_STORAGE` | Export backup files (Android ≤ 9) |
| `CAMERA` | Profile photo capture |

## ProGuard / R8 Minification

Release builds use R8 code shrinking. The `proguard-rules.pro` file contains keep rules for:
- Hive model classes (they use reflection)
- Flutter plugins

If you encounter `ClassNotFoundException` in release builds, add a keep rule:

```pro
-keep class dev.hemanths.paisa.** { *; }
-keep class com.hive.** { *; }
```

## Minimum SDK Considerations

| SDK Level | Android Version | Affected Features |
|-----------|----------------|-------------------|
| 21 | 5.0 Lollipop | Minimum supported |
| 28 | 9.0 Pie | `WRITE_EXTERNAL_STORAGE` not needed |
| 30 | 11 | Scoped storage enforced |
| 31 | 12 | Material You dynamic colors |
| 33 | 13 | `READ_MEDIA_*` permissions |
