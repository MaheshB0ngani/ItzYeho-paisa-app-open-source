# Tech Stack

## Overview

Paisa is a **Flutter** application written in **Dart**. It targets Android, iOS, Web, Windows, and macOS from a single codebase. There is no backend service — all data lives on the device.

## Runtime & Language

| Technology | Version | Role |
|------------|---------|------|
| Dart SDK | ≥ 3.0.2 | Programming language |
| Flutter SDK | ≥ 3.10.4 | UI framework |

## Core Architecture Libraries

| Package | Version | Purpose |
|---------|---------|---------|
| `flutter_bloc` | ^8.1.3 | BLoC state management |
| `get_it` | ^7.2.0 | Service locator / DI container |
| `injectable` | ^2.1.0 | Code-generated DI registrations |
| `go_router` | ^13.2.0 | Declarative navigation |
| `go_router_builder` | ^2.4.1 | Type-safe route code generation |
| `dartz` | ^0.10.1 | Functional programming (Either, Option) |
| `freezed_annotation` | ^2.4.1 | Immutable data classes & union types |
| `equatable` | ^2.0.5 | Value equality for state classes |

## Data & Persistence

| Package | Version | Purpose |
|---------|---------|---------|
| `hive` | ^2.2.3 | Local NoSQL key-value store |
| `hive_flutter` | ^1.1.0 | Hive Flutter integration & reactive boxes |
| `json_annotation` | ^4.8.1 | JSON serialization annotations |
| `path_provider` | ^2.0.11 | Locate filesystem paths |
| `csv` | ^5.0.1 | CSV read/write for export |

## UI & Theming

| Package | Version | Purpose |
|---------|---------|---------|
| `flex_color_scheme` | ^7.3.1 | Rich Material 3 color scheme generation |
| `dynamic_color` | ^1.6.5 | Material You wallpaper color extraction |
| `glassmorphism` | ^3.0.0 | Frosted-glass UI effects |
| `google_fonts` | ^6.2.1 | Runtime font loading from Google Fonts |
| `material_design_icons_flutter` | ^7.0.7296 | Thousands of MDI icons |
| `material_color_utilities` | ^0.8.0 | HCT color space & palette generation |
| `animations` | ^2.0.7 | Pre-built Material transition animations |
| `flutter_slidable` | ^3.0.0 | Swipe-to-action list items |
| `responsive_builder` | ^0.7.0 | Breakpoint-aware responsive layouts |
| `flutter_screenutil` | ^5.9.0 | Adaptive sizing utilities |

## Charts & Data Visualization

| Package | Version | Purpose |
|---------|---------|---------|
| `fl_chart` | ^0.66.2 | Bar charts, pie charts, line charts |
| `chart_sparkline` | ^1.0.13 | Inline mini sparkline charts |
| `date_picker_timeline` | ^1.2.3 | Horizontal scrollable date timeline picker |

## Platform & Device Integration

| Package | Version | Purpose |
|---------|---------|---------|
| `local_auth` | ^2.1.3 | Fingerprint / Face ID biometric auth |
| `file_picker` | ^6.1.1 | Native file open/save dialogs |
| `image_picker` | ^1.0.0 | Camera / gallery photo picker |
| `share_plus` | ^7.0.2 | Share files via system share sheet |
| `permission_handler` | ^11.0.0 | Runtime permission requests |
| `quick_actions` | ^1.0.7 | App icon home-screen shortcuts |
| `device_info_plus` | ^9.1.2 | Device/OS metadata |
| `package_info_plus` | ^5.0.1 | App version & build info |
| `flutter_displaymode` | ^0.6.0 | High refresh rate (120Hz+) enablement |
| `url_launcher` | ^6.1.7 | Open URLs in the browser |
| `url_strategy` | ^0.2.0 | Web URL path strategy (no `#`) |

## Internationalization

| Package | Version | Purpose |
|---------|---------|---------|
| `flutter_localizations` | SDK | Flutter i18n foundation |
| `intl` | ^0.18.0 | Date/number/currency formatting |

**Supported Languages:** English, German, Italian, Polish, Ukrainian, Vietnamese

## Build & Code Generation (Dev Dependencies)

| Package | Version | Purpose |
|---------|---------|---------|
| `build_runner` | ^2.3.2 | Code generation orchestrator |
| `freezed` | ^2.4.6 | Immutable class & union type generator |
| `hive_generator` | ^2.0.0 | Hive type adapter generator |
| `injectable_generator` | ^2.1.4 | DI registration code generator |
| `json_serializable` | ^6.7.1 | fromJson/toJson code generator |
| `import_sorter` | ^4.6.0 | Auto-sort import statements |
| `flutter_lints` | ^3.0.1 | Dart lint rules |
| `msix` | ^3.7.0 | Windows MSIX packaging |

## Android Native Stack

| Technology | Version |
|------------|---------|
| Kotlin | 1.9.22 |
| Gradle | 8.1.1 |
| Android Gradle Plugin | 8.1.1 |
| Min SDK | 21 (Android 5.0) |
| Target SDK | 34 (Android 14) |
| Java | 17 |

## Technology Decision Rationale

### Why Hive instead of SQLite?
Hive provides a fast, type-safe NoSQL store with zero-config setup and reactive `ValueListenableBuilder` integration. For a personal finance app with no relational joins needed, it's simpler and faster than SQLite.

### Why BLoC instead of Provider or Riverpod?
BLoC enforces a strict unidirectional data flow with Events → BLoC → States. This makes the app predictable, testable, and easy to debug. The event-driven model maps naturally to user interactions.

### Why GetIt + Injectable instead of BLoC's built-in providers?
Injectable generates the DI boilerplate, making it easy to register and retrieve services without manually wiring everything. GetIt serves as a global service locator, decoupling feature modules from each other.

### Why GoRouter?
GoRouter supports declarative, URL-based navigation that works identically on mobile and web. The `go_router_builder` adds compile-time type safety to route parameters.

### Why Clean Architecture?
Each feature module is split into Domain, Data, and Presentation layers. This makes it possible to swap data sources, write unit tests for business logic in isolation, and keep the codebase maintainable as it grows.
