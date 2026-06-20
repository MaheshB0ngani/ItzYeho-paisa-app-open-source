# Coding Standards

## Lint Configuration

The project uses `flutter_lints` plus custom rules defined in `analysis_options.yaml`. Run `flutter analyze` to check for violations before committing.

## Key Lint Rules

```yaml
# analysis_options.yaml (key rules)
linter:
  rules:
    avoid_print: true               # Use proper logging, not print()
    prefer_single_quotes: true      # 'string' not "string"
    prefer_const_constructors: true # const where possible
    prefer_final_fields: true       # Prefer final over var where possible
    always_use_package_imports: true # Full package: imports only
```

## Code Metrics

The project enforces code complexity limits:

| Metric | Limit |
|--------|-------|
| Cyclomatic complexity | ≤ 20 |
| Max nesting level | ≤ 5 |
| Max method parameters | ≤ 4 |
| Max source lines per method | ≤ 50 |

## Import Organization

Imports must be grouped and sorted in this order (enforced by `import_sorter`):

```dart
// 1. Dart built-in imports
import 'dart:async';
import 'dart:io';

// 2. Flutter framework imports
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

// 3. Third-party package imports
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';

// 4. Project imports
import 'package:paisa/core/common.dart';
import 'package:paisa/features/transaction/domain/entities/transaction.dart';
```

Use only `package:` imports (no relative imports like `../../../`). This is enforced by `always_use_package_imports`.

## Naming Conventions

| Element | Convention | Example |
|---------|-----------|---------|
| Classes | PascalCase | `TransactionBloc` |
| Variables & methods | camelCase | `addTransaction()` |
| Constants | camelCase | `userNameSetKey` |
| Hive keys | camelCase string const | `'userNameSetKey'` |
| Files | snake_case | `transaction_bloc.dart` |
| Directories | snake_case | `data_sources/` |
| Enum values | camelCase | `TransactionType.expense` |

## Adding a New Feature

Follow this checklist when adding a new feature module:

```
lib/features/<new_feature>/
├── domain/
│   ├── entities/
│   │   └── <new_feature>.dart          # 1. Define entity (pure Dart)
│   ├── repository/
│   │   └── <new_feature>_repository.dart # 2. Define interface
│   └── use_case/
│       └── add_<new_feature>_use_case.dart # 3. Write use case(s)
├── data/
│   ├── model/
│   │   └── <new_feature>_model.dart    # 4. Create Hive model
│   ├── data_sources/
│   │   └── local_<new_feature>_data_source.dart # 5. Data access
│   └── repository/
│       └── <new_feature>_repository_impl.dart # 6. Implement interface
└── presentation/
    ├── bloc/
    │   ├── <new_feature>_bloc.dart     # 7. Create BLoC
    │   ├── <new_feature>_event.dart
    │   └── <new_feature>_state.dart
    ├── pages/
    │   └── <new_feature>_page.dart     # 8. Build UI
    └── widgets/
        └── <new_feature>_widget.dart
```

After creating the files:
1. Add `@HiveType` with a unique `typeId` to the model
2. Register the Hive box in `HiveModule`
3. Add `@Injectable(as: Repository)` to the implementation
4. Add `@injectable` to use cases and BLoC
5. Run `build_runner build`
6. Add a route in `lib/config/routes.dart`

## State Management Guidelines

- Use **BLoC** for complex features with multiple event types
- Use **Cubit** for simpler settings-style state
- States must be **immutable** — use `@freezed`
- Events must extend `Equatable` and implement `props`
- Never put network/IO calls in widgets — always go through BLoC/UseCase

## Error Handling

All Use Cases return `Either<AppError, T>`:

```dart
Future<Either<AppError, void>> addTransaction(Transaction t) async {
  try {
    final model = TransactionModel()..name = t.name;
    await box.add(model);
    return Right(unit);
  } catch (e) {
    return Left(AppError(message: e.toString()));
  }
}
```

In the BLoC, always handle both cases:

```dart
result.fold(
  (error) => emit(TransactionState.error(error.message)),
  (_) => emit(const TransactionState.added()),
);
```

## Localization

Never hardcode user-visible strings. Always use `context.loc.<key>`:

```dart
// ❌ Wrong
Text('Add Transaction')

// ✓ Correct
Text(context.loc.addTransaction)
```

Add the key to all `.arb` files in `lib/localization/`:

```json
// app_en.arb
{
  "addTransaction": "Add Transaction"
}
```

Then run `flutter gen-l10n`.
