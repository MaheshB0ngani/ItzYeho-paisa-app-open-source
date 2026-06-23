# Analytics & Overview Feature

## Overview

The Overview feature provides visual summaries of your spending and income using charts and statistics.

**Files:** `lib/features/overview/`

## Home Dashboard

The main landing page shows a quick financial summary:

```
┌─────────────────────────────────────┐
│  Total Balance: ₹45,230             │
│  Income: ₹60,000  Expense: ₹14,770 │
├─────────────────────────────────────┤
│  [Date Timeline — scroll to filter] │
├─────────────────────────────────────┤
│  Transaction List (by selected day) │
│  • Lunch          -₹350  Food       │
│  • Amazon         -₹1,299 Shopping  │
│  • Salary         +₹60,000 Income   │
└─────────────────────────────────────┘
```

## Charts

Paisa uses `fl_chart` for rich, animated charts.

### Bar Chart — Spending Over Time

- **X-axis**: Dates (days of the selected month)
- **Y-axis**: Total expense amount per day
- **Color**: Primary theme color
- **Interaction**: Tap a bar to see the day's transactions

### Category Pie/Donut Chart

- Each slice = one category
- Slice size = proportion of total spending
- Color = category color
- **Interaction**: Tap a slice → navigate to category transaction list

### Sparklines

- Inline mini charts on account cards
- Show spending trend over the last 7/30 days

## Filter Controls

| Filter | Options |
|--------|---------|
| Time period | Day / Week / Month / Year |
| Date navigator | Previous/Next period |
| Account | All accounts or specific account |
| Transaction type | All / Expense only / Income only |

## Transactions By Category (`/landing/transactions/:categoryId`)

Drill-down view for a specific category:
- Shows all transactions in that category
- Filtered by the current time period
- Total amount for the period
- Sub-chart showing trend over time

## Summary Controller

The `SummaryController` (a `ChangeNotifier` shared via `Provider`) holds the aggregated analytics state for the home page:

```dart
class SummaryController extends ChangeNotifier {
  List<Transaction> get filteredTransactions;
  double get totalExpense;
  double get totalIncome;
  double get balance;
  FilterType currentFilter;
  DateTime selectedDate;

  void updateFilter(FilterType filter) { ... notifyListeners(); }
  void updateDate(DateTime date) { ... notifyListeners(); }
}
```

## Budget Progress (Category-Level)

On the overview/home screen, categories with budgets enabled show a progress indicator:

```
Food          [████████░░] 80% of ₹5,000
Transport     [████░░░░░░] 40% of ₹3,000
Shopping      [██████████] 105% ⚠️ Over budget!
```

## Net Worth Calculation

```
Net Worth = SUM(account.balance for all accounts WHERE isAccountExcluded = false)
```

Where `account.balance = initialAmount + income transactions - expense transactions`.
