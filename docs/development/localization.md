# Localization & Internationalization

## Supported Languages

| Language | Code | File |
|----------|------|------|
| English (default) | `en` | `app_en.arb` |
| German | `de` | `app_de.arb` |
| Italian | `it` | `app_it.arb` |
| Polish | `pl` | `app_pl.arb` |
| Ukrainian | `uk` | `app_uk.arb` |
| Vietnamese | `vi` | `app_vi.arb` |

## How Localization Works

Paisa uses Flutter's built-in `flutter_localizations` with ARB (Application Resource Bundle) files. The build system generates a type-safe `AppLocalizations` class from the ARB files.

### Configuration (`l10n.yaml`)

```yaml
arb-dir: lib/localization
template-arb-file: app_en.arb
output-localization-file: app_localizations.dart
output-class: AppLocalizations
```

### ARB File Format

```json
{
  "@@locale": "en",
  "appTitle": "Paisa",
  "@appTitle": {
    "description": "The name of the application"
  },
  "addTransaction": "Add Transaction",
  "@addTransaction": {
    "description": "Label for the add transaction button"
  },
  "transactionCount": "{count, plural, =1{1 transaction} other{{count} transactions}}",
  "@transactionCount": {
    "description": "Shows transaction count",
    "placeholders": {
      "count": { "type": "int" }
    }
  }
}
```

## Generating the Localization Code

After editing any `.arb` file:

```bash
flutter gen-l10n
```

This generates `AppLocalizations` in `.dart_tool/flutter_gen/gen_l10n/`.

Or it auto-generates when you run `flutter run` (because `generate: true` is set in `pubspec.yaml`).

## Using Localized Strings in Code

A `BuildContext` extension provides easy access:

```dart
// Via extension method
context.loc.appTitle         // → "Paisa"
context.loc.addTransaction   // → "Add Transaction"

// Direct access (without extension)
AppLocalizations.of(context)!.appTitle
```

The extension is defined in `lib/core/extensions/build_context_extension.dart`:

```dart
extension BuildContextExtension on BuildContext {
  AppLocalizations get loc => AppLocalizations.of(this)!;
}
```

## Changing Language at Runtime

The app supports runtime language switching without a restart:

1. User goes to **Settings → Language**
2. Selects a language from the list
3. `SettingCubit.updateLanguage(locale)` is called
4. The locale is saved to `appLanguageKey` in Hive
5. `app.dart` reads the locale from Hive and passes it to `MaterialApp.locale`
6. All `AppLocalizations.of(context)` calls immediately return the new language

```dart
// app.dart
MaterialApp.router(
  locale: Locale(settings.get(appLanguageKey, defaultValue: 'en')),
  localizationsDelegates: AppLocalizations.localizationsDelegates,
  supportedLocales: AppLocalizations.supportedLocales,
);
```

## Adding a New Language

1. Create `lib/localization/app_<code>.arb`
2. Copy all keys from `app_en.arb`
3. Translate all values (not the keys)
4. Add the locale code to `AppLocalizations.supportedLocales` if needed
5. Run `flutter gen-l10n`
6. Add the language to the language picker in Settings

## Currency & Number Formatting

Currency symbols come from the country selected during onboarding. The selected country's currency data is stored in `userCountryKey` and accessed throughout the app for formatting:

```dart
// Format a number as currency
final String formatted = NumberFormat.currency(
  locale: countryCurrencyLocale,
  symbol: currencySymbol,
).format(amount);
```

The `intl` package handles all locale-aware formatting.

## Untranslated Strings

The file `untranslated.json` at the repo root tracks strings that need translation in non-English locales. Check this file when adding new strings to ensure all languages are updated.
