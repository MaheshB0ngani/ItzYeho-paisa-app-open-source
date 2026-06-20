# Hive Storage Schema

## Overview

Paisa stores all data locally using **Hive** — a lightweight, pure-Dart key-value NoSQL database. Each model type has its own "box" (analogous to a table), and records are keyed by auto-incrementing integers.

## Box Summary

| Box Name | Model Class | TypeId | Purpose |
|----------|------------|--------|---------|
| `expense` | `TransactionModel` | 3 | All financial transactions |
| `accounts` | `AccountModel` | 0 | User's bank accounts & wallets |
| `category` | `CategoryModel` | 1 | Transaction categories |
| `debts` | `DebitModel` | 5 | Debt/loan entries |
| `transactions` | `DebitTransactionsModel` | 6 | Payments against debts |
| `recurring` | `RecurringModel` | 8 | Recurring transaction schedules |
| `settings` | `dynamic` | — | App configuration key-value store |

## Opening Boxes

Boxes are opened during app startup and registered as singletons in the DI container via `HiveModule`:

```dart
// lib/di/module/hive_module.dart
@module
abstract class HiveModule {
  @singleton
  Box<TransactionModel> get expenseBox =>
      Hive.box<TransactionModel>(BoxType.expense.name);

  @singleton
  Box<AccountModel> get accountBox =>
      Hive.box<AccountModel>(BoxType.accounts.name);

  @singleton
  Box<CategoryModel> get categoryBox =>
      Hive.box<CategoryModel>(BoxType.category.name);

  @singleton
  Box<DebitModel> get debitBox =>
      Hive.box<DebitModel>(BoxType.debts.name);

  @singleton
  Box<DebitTransactionsModel> get debitTransactionBox =>
      Hive.box<DebitTransactionsModel>(BoxType.transactions.name);

  @singleton
  Box<RecurringModel> get recurringBox =>
      Hive.box<RecurringModel>(BoxType.recurring.name);

  @singleton
  Box<dynamic> get settingsBox =>
      Hive.box<dynamic>(BoxType.settings.name);
}
```

## Settings Box Keys

The `settings` box stores all app configuration as named key-value pairs:

```dart
// lib/core/constants/constants.dart

// Onboarding state
const userIntroFinishedKey = 'userIntroFinishedKey';  // bool
const userNameSetKey = 'userNameSetKey';               // String
const userImageKey = 'userImageKey';                   // String (path)
const userCategorySelectorKey = 'userCategorySelectorKey'; // bool
const userAccountSelectorKey = 'userAccountSelectorKey';   // bool
const userCountryKey = 'userCountryKey';               // Map<dynamic, dynamic> (JSON)

// Security
const userAuthKey = 'userAuthKey';                     // bool

// Theme
const appColorKey = 'appColorKey';                     // int (ARGB color)
const themeModeKey = 'themeModeKey';                   // int (0=system, 1=light, 2=dark)
const dynamicThemeKey = 'dynamicThemeKey';             // bool
const blackThemeKey = 'blackThemeKey';                 // bool

// Personalization
const appFontChangerKey = 'appFontChangerKey';         // String (font name)
const appLanguageKey = 'appLanguageKey';               // String (locale code)
```

## Data Storage Location

Hive stores `.hive` binary files on disk:

| Platform | Location |
|----------|----------|
| Android | `app_data_dir/hive/` |
| iOS | `Library/Application Support/hive/` |
| Web | IndexedDB (browser storage) |
| Windows | `%AppData%/Roaming/paisa/hive/` |
| macOS | `~/Library/Application Support/paisa/hive/` |

## Reactive Updates

Hive boxes support reactive listening, which Paisa uses for two purposes:

### 1. Widget Rebuilds

Use `ValueListenableBuilder` or `HiveListMixin` to automatically rebuild widgets when box data changes:

```dart
ValueListenableBuilder<Box<TransactionModel>>(
  valueListenable: Hive.box<TransactionModel>('expense').listenable(),
  builder: (context, box, _) {
    final transactions = box.values.toList();
    return TransactionList(transactions: transactions);
  },
);
```

### 2. Router Refresh

GoRouter is wired to the settings box to automatically redirect when onboarding state changes:

```dart
GoRouter(
  refreshListenable: settings.listenable(keys: [userIntroFinishedKey, ...]),
  redirect: (context, state) { /* check settings and redirect */ },
);
```

## Binary Format

Hive uses a binary format for storage. Each record is:
1. TypeId (from `@HiveType(typeId: X)`)
2. Number of fields
3. Field index + encoded value for each `@HiveField`

This means the TypeId and HiveField index values are **part of the stored data** and must never be changed after the app has been released with data written.

## Migration Notes

Hive does not have a built-in migration system. If you need to add fields:

- **Adding a new `@HiveField`**: Safe — old data will just have `null` for the new field
- **Removing a `@HiveField`**: Safe for storage, but remove the field from the adapter
- **Changing a TypeId**: **Breaking** — all existing data becomes unreadable
- **Changing a field's index**: **Breaking** — data stored at the old index maps to the wrong field

For complex migrations, the export/import (JSON backup/restore) mechanism is the recommended path.
