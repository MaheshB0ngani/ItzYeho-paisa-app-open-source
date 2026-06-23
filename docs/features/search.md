# Search Feature

## Overview

The Search feature provides global full-text search across all transactions in the app.

**Files:** `lib/features/search/`

## SearchCubit

`SearchCubit` manages search state:

```dart
@injectable
class SearchCubit extends Cubit<SearchState> {
  final GetAllTransactionsUseCase getAllTransactionsUseCase;

  void searchWithQuery(String query) {
    // Filters transactions where:
    // - name contains query (case-insensitive)
    // - description contains query (case-insensitive)
    // - amount as string matches query
  }
}
```

## Search States

| State | Description |
|-------|-------------|
| `SearchInitial` | Empty state, no query |
| `SearchLoading` | Searching in progress |
| `SearchResult(List<Transaction>)` | Matching transactions |
| `SearchEmpty` | Query returned no results |

## Search Page UI

**Route:** `/landing/search`

- Top search bar (auto-focused on page open)
- Results appear as the user types (real-time filtering)
- Each result shows: name, amount, category, account, date
- Tap a result → opens the edit transaction form

## Search Behavior

- **Case-insensitive**: "lunch" matches "Lunch", "LUNCH"
- **Substring match**: "am" matches "Amazon", "Swiggy"
- **No server required**: All search is done in-memory against the Hive box data
- **Instant results**: No debounce needed (local data is fast)

## Accessing Search

- Top search icon on the home page app bar
- **Route**: `/landing/search`
