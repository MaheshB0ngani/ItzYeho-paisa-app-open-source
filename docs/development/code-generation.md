# Code Generation

Paisa makes heavy use of `build_runner` code generation to eliminate boilerplate. Understanding what generates what is essential for development.

## When to Run Build Runner

Run code generation whenever you:

- Add a new `@HiveType` / `@HiveField` model
- Add a new `@freezed` class
- Add a new `@injectable` / `@singleton` service
- Add a new `@JsonSerializable` class
- Add a new `GoRouteData` route class

```bash
# One-time build
flutter pub run build_runner build --delete-conflicting-outputs

# Watch mode (auto-rebuilds on file save)
flutter pub run build_runner watch --delete-conflicting-outputs
```

## Code Generators in Use

### 1. Freezed — Immutable Classes & Union Types

**Package:** `freezed` + `freezed_annotation`

Used for BLoC states, Use Case params, and shared value objects.

**Source (you write):**

```dart
// transaction_state.dart
import 'package:freezed_annotation/freezed_annotation.dart';

part 'transaction_state.freezed.dart';

@freezed
class TransactionState with _$TransactionState {
  const factory TransactionState.initial() = TransactionInitial;
  const factory TransactionState.loading() = TransactionLoading;
  const factory TransactionState.added() = TransactionAdded;
  const factory TransactionState.error(String message) = TransactionError;
}
```

**Generated output (`transaction_state.freezed.dart`):**
- Constructor implementations for each variant
- `copyWith()` method
- `==` and `hashCode`
- `map()`, `maybeMap()`, `when()`, `maybeWhen()` pattern-matching methods
- `toString()`

### 2. Hive Generator — NoSQL Type Adapters

**Package:** `hive_generator`

Used for all Hive model classes.

**Source (you write):**

```dart
// transaction_model.dart
import 'package:hive/hive.dart';

part 'transaction_model.g.dart';

@HiveType(typeId: 3)
class TransactionModel extends HiveObject {
  @HiveField(0)
  late String name;

  @HiveField(1)
  late double currency;
}
```

**Generated output (`transaction_model.g.dart`):**
- `TransactionModelAdapter extends TypeAdapter<TransactionModel>` with `read()` and `write()` methods
- Hive can now serialize/deserialize `TransactionModel` objects

::: warning Type ID uniqueness
Each `@HiveType(typeId: X)` must have a unique integer `typeId` across the entire app. See the [Hive Schema](/data/hive-schema) for the full list.
:::

### 3. JSON Serializable — JSON Encode/Decode

**Package:** `json_serializable`

Used for the export/import feature where data must be serialized to/from JSON.

**Source:**

```dart
// account_model.dart
import 'package:json_annotation/json_annotation.dart';

part 'account_model.g.dart';

@JsonSerializable()
class AccountModel {
  final String name;
  final double amount;
  final int color;

  AccountModel({required this.name, required this.amount, required this.color});

  factory AccountModel.fromJson(Map<String, dynamic> json) =>
      _$AccountModelFromJson(json);

  Map<String, dynamic> toJson() => _$AccountModelToJson(this);
}
```

**Generated output:** `fromJson` factory and `toJson` method implementations.

### 4. Injectable Generator — Dependency Injection

**Package:** `injectable_generator`

Generates the DI container configuration based on annotations.

**Source (you write):**

```dart
// In any service/use case file
@injectable
class AddTransactionUseCase {
  final TransactionRepository transactionRepository;
  AddTransactionUseCase({required this.transactionRepository});
}

// For singletons
@singleton
class AuthService { ... }

// For interface binding
@Injectable(as: TransactionRepository)
class TransactionRepositoryImpl implements TransactionRepository { ... }
```

**Trigger file:**

```dart
// lib/di/dependency_injection.dart
@InjectableInit()
void configureDependencies() => getIt.init();
```

**Generated output (`dependency_injection.config.dart`):**

```dart
// Auto-generated - DO NOT EDIT
extension GetItInjectableX on _i1.GetIt {
  _i1.GetIt init({...}) {
    gh.factory<AddTransactionUseCase>(
      () => AddTransactionUseCase(
        transactionRepository: gh<TransactionRepository>(),
      ),
    );
    // ... all other registrations
    return getIt;
  }
}
```

### 5. GoRouter Builder — Type-Safe Routes

**Package:** `go_router_builder`

Generates typed navigation methods from `GoRouteData` subclasses.

**Source:**

```dart
// routes.dart
part 'routes.g.dart';

@TypedGoRoute<LandingPageData>(
  path: '/landing',
  routes: [
    TypedGoRoute<TransactionPageData>(path: 'transaction'),
  ],
)
class LandingPageData extends GoRouteData { ... }

class TransactionPageData extends GoRouteData {
  final int? transactionId;
  final TransactionType? transactionType;
  const TransactionPageData({this.transactionId, this.transactionType});
  // ...
}
```

**Generated output (`routes.g.dart`):**

```dart
// Enables: TransactionPageData(transactionId: 42).go(context)
extension TransactionPageDataExtension on TransactionPageData {
  static TransactionPageData $fromState(GoRouterState state) { ... }
  String get location => GoRouteData.$location('/landing/transaction', ...);
  void go(BuildContext context) => context.go(location);
}
```

## Build Runner Tips

### Delete only specific generated files

```bash
# Delete all .g.dart files and regenerate
find lib -name "*.g.dart" -delete
flutter pub run build_runner build
```

### Common conflicts

If you see `Already exists` errors:

```bash
flutter pub run build_runner build --delete-conflicting-outputs
```

### Watch mode for development

```bash
flutter pub run build_runner watch --delete-conflicting-outputs
```

Leave this running in a terminal during development. It automatically regenerates files as you save.
