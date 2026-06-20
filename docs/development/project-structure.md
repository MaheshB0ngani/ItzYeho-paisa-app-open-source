# Project Structure

## Root Directory

```
itzyeho-paisa-app-open-source/
├── .github/
│   └── workflows/
│       └── deplay_android_build.yml   # CI/CD: build & deploy Android
├── .vscode/                            # VS Code editor settings
├── android/                            # Android native project
│   ├── app/
│   │   ├── build.gradle               # App-level build config (flavors, signing)
│   │   └── src/
│   │       ├── main/                  # Main AndroidManifest, kotlin sources
│   │       ├── dev/                   # dev flavor overrides
│   │       └── prod/                  # prod flavor overrides
│   └── build.gradle                   # Project-level build config
├── ios/                                # iOS native project (Xcode)
├── macos/                              # macOS native project
├── web/
│   ├── index.html                     # Web entry point
│   └── manifest.json                  # PWA manifest
├── windows/                            # Windows native project
├── assets/
│   └── images/
│       ├── icon.png                   # App icon
│       ├── icon_light.png             # Android 12 splash light
│       └── icon_dark.png              # Android 12 splash dark
├── lib/                               # All Flutter/Dart source code
├── test/                              # Unit and widget tests
├── docs/                              # This documentation site
├── pubspec.yaml                       # Package dependencies & Flutter config
├── pubspec.lock                       # Locked dependency versions
├── analysis_options.yaml              # Lint and code metric rules
├── l10n.yaml                          # Localization configuration
├── body.md                            # GitHub Release notes template
└── README.md                          # Repository readme
```

## `lib/` Directory (Flutter Source)

```
lib/
├── main.dart                          # App entry point (DI init, runApp)
├── app.dart                           # Root widget (MaterialApp, themes, BLoC providers)
│
├── config/
│   ├── routes.dart                    # GoRouter route definitions
│   └── routes.g.dart                  # Generated route code (don't edit)
│
├── core/                              # Shared code used across all features
│   ├── common.dart                    # Barrel export of common utilities
│   ├── common_enum.dart               # Barrel export of enums
│   ├── app_level_constants.dart       # Top-level constants
│   ├── constants/
│   │   └── constants.dart             # Hive key strings, URLs, app config
│   ├── enum/
│   │   ├── box_types.dart             # BoxType enum (Hive box names)
│   │   ├── card_type.dart             # CardType enum (bank/wallet/etc.)
│   │   ├── debt_type.dart             # DebtType enum (credit/debit)
│   │   ├── filter.dart                # FilterType enum (day/week/month/year)
│   │   ├── recurring_type.dart        # RecurringType enum (daily/weekly/monthly/yearly)
│   │   └── transaction_type.dart      # TransactionType enum (expense/income/transfer)
│   ├── error/
│   │   └── app_error.dart             # Unified error class
│   ├── extensions/
│   │   ├── account_extension.dart     # Extension methods on AccountModel
│   │   ├── build_context_extension.dart # context.loc, context.theme helpers
│   │   ├── color_extension.dart       # Color utilities
│   │   └── transaction_extensions.dart # Transaction list helpers
│   ├── theme/
│   │   ├── app_theme.dart             # Material 3 theme generation
│   │   └── paisa_theme.dart           # Custom theme tokens
│   ├── use_case/
│   │   └── use_case.dart              # Abstract UseCase<T, Params> base class
│   └── widgets/                       # Shared reusable UI widgets
│       ├── paisa_bottom_sheet.dart
│       ├── paisa_card.dart
│       ├── paisa_text_field.dart
│       └── ...
│
├── di/
│   ├── dependency_injection.dart      # GetIt setup, @InjectableInit
│   ├── dependency_injection.config.dart # Generated DI registrations (don't edit)
│   └── module/
│       ├── hive_module.dart           # Hive box providers for DI
│       └── service_module.dart        # External service providers
│
├── features/                          # Feature modules (12 total)
│   ├── account/
│   ├── category/
│   ├── debit/
│   ├── debit_transaction/
│   ├── home/
│   ├── intro/
│   ├── overview/
│   ├── profile/
│   ├── recurring/
│   ├── search/
│   ├── settings/
│   └── transaction/
│
└── localization/
    ├── app_en.arb                     # English (template)
    ├── app_de.arb                     # German
    ├── app_it.arb                     # Italian
    ├── app_pl.arb                     # Polish
    ├── app_uk.arb                     # Ukrainian
    └── app_vi.arb                     # Vietnamese
```

## Feature Module Structure

Each of the 12 feature modules follows the same 3-layer structure:

```
features/<name>/
├── domain/
│   ├── entities/
│   │   └── <name>.dart               # Pure Dart business entity
│   ├── repository/
│   │   └── <name>_repository.dart    # Abstract repository interface
│   └── use_case/
│       ├── add_<name>_use_case.dart
│       ├── delete_<name>_use_case.dart
│       ├── get_<name>_use_case.dart
│       └── update_<name>_use_case.dart
├── data/
│   ├── model/
│   │   ├── <name>_model.dart         # Hive-annotated model
│   │   └── <name>_model.g.dart       # Generated Hive adapter
│   ├── data_sources/
│   │   └── local_<name>_data_source.dart
│   └── repository/
│       └── <name>_repository_impl.dart
└── presentation/
    ├── bloc/                          # Or cubit/ for simpler state
    │   ├── <name>_bloc.dart
    │   ├── <name>_event.dart
    │   └── <name>_state.dart
    ├── pages/
    │   ├── add/
    │   │   └── add_<name>_page.dart
    │   └── <name>_list_page.dart
    └── widgets/
        └── <name>_item_widget.dart
```

## Generated Files Reference

| File Pattern | Tool | Regenerate When |
|-------------|------|-----------------|
| `*.g.dart` | `hive_generator`, `json_serializable`, `go_router_builder` | Model fields changed |
| `*.freezed.dart` | `freezed` | Freezed class changed |
| `dependency_injection.config.dart` | `injectable_generator` | DI annotations changed |
| `routes.g.dart` | `go_router_builder` | Route classes changed |

Run `flutter pub run build_runner build --delete-conflicting-outputs` to regenerate all.
