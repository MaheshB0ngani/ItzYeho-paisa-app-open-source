# Categories Feature

## Overview

Categories let users classify their transactions (Food, Transport, Salary, etc.). Each category has an icon, color, and optional budget limit.

**Files:** `lib/features/category/`

## Data Model

```dart
class Category {
  final String name;         // Category label
  final int icon;            // Material Design icon codepoint
  final int color;           // ARGB color int
  final bool isDefault;      // Was this seeded by the app?
  final double? budget;      // Monthly budget limit (optional)
  final bool? isBudget;      // Budget tracking enabled?
  final String? description; // Optional notes
}
```

## Default Categories

On first run, the app seeds a set of default categories to help users get started quickly:

| Category | Icon | Type |
|----------|------|------|
| Food | restaurant | Expense |
| Transport | directions_car | Expense |
| Shopping | shopping_bag | Expense |
| Entertainment | movie | Expense |
| Health | favorite | Expense |
| Education | school | Expense |
| Housing | home | Expense |
| Salary | work | Income |
| Freelance | laptop | Income |
| Investments | trending_up | Income |

Default categories have `isDefault = true`. They can be edited but not deleted (to preserve transaction integrity).

## Icon Picker

The category icon picker (`CategoryIconPickerPage`) provides:
- Browse thousands of icons from `material_design_icons_flutter`
- Search by keyword
- Paginated grid view for performance

**Route:** `/landing/category/icon-picker`

## Budget Tracking

When `isBudget = true` and `budget > 0`:
- The home page shows a budget progress bar for that category
- Visual indicator when spending approaches or exceeds the limit
- Budget period: **monthly** (resets at the start of each month)

```
Budget progress = (total_spent_this_month / budget) × 100
```

Color coding:
- Green: < 70% used
- Orange: 70–100% used
- Red: > 100% (over budget)

## BLoC

`CategoryBloc` manages category state:

| Event | Description |
|-------|-------------|
| `AddCategoryEvent` | Create a new category |
| `DeleteCategoryEvent` | Remove (if not default) |
| `UpdateCategoryEvent` | Edit category details |
| `FetchCategoryFromIdEvent` | Load for editing |

## Category Detail View

Tapping a category on the Overview screen navigates to `/landing/transactions/:categoryId`, showing all transactions in that category, ordered by date.

## Related Features

- [Transactions](/features/transactions) — every transaction belongs to a category
- [Analytics](/features/analytics) — category-breakdown charts
