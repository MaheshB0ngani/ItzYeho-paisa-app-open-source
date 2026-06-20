# Adding & Managing Transactions

## Adding a New Transaction

### Entry Points

There are three ways to open the transaction form:

1. **FAB on Home Screen** — Floating action button on the landing page
2. **Quick Action shortcut** — Home screen long-press shortcut (Android/iOS) for Expense, Income, or Transfer
3. **Deep link** — `/landing/transaction?type=0` (0=expense, 1=income, 2=transfer)

### Add Expense Flow

```mermaid
flowchart TD
    START([User taps + FAB]) --> SELECT_TYPE[Select transaction type\nExpense / Income / Transfer]
    SELECT_TYPE --> FORM[Transaction Form]
    FORM --> FILL_NAME[Enter name / label]
    FILL_NAME --> FILL_AMOUNT[Enter amount]
    FILL_AMOUNT --> SELECT_ACCOUNT[Select account]
    SELECT_ACCOUNT --> SELECT_CATEGORY[Select category]
    SELECT_CATEGORY --> SELECT_DATE[Pick date & time\ndefaults to now]
    SELECT_DATE --> OPT_DESC[Optional: add description]
    OPT_DESC --> SAVE[Tap Save]
    SAVE --> VALIDATE{Validation\npassed?}
    VALIDATE -- No --> SHOW_ERROR[Show field errors]
    VALIDATE -- Yes --> BLOC[Dispatch AddOrUpdateTransactionEvent]
    BLOC --> USE_CASE[AddTransactionUseCase.call]
    USE_CASE --> HIVE[Write to Hive box\nBoxType.expense]
    HIVE --> SUCCESS[Emit TransactionAdded state]
    SUCCESS --> NAV_BACK[Navigate back to home]
    NAV_BACK --> HOME_REFRESH[Home refreshes via\nHive ValueListenable]
```

### Add Transfer Flow

Transfers move money between two accounts. They create a pair of linked transactions:

```mermaid
flowchart TD
    SELECT_TRANSFER[Select Transfer type] --> FROM[Select source account]
    FROM --> TO[Select destination account]
    TO --> AMOUNT[Enter transfer amount]
    AMOUNT --> DATE[Pick date]
    DATE --> SAVE[Save]
    SAVE --> CREATE_OUT[Create Expense transaction\non source account]
    CREATE_OUT --> CREATE_IN[Create Income transaction\non destination account\nLinked via superId]
    CREATE_IN --> DONE[Both accounts updated]
```

## Editing a Transaction

1. In the transaction list, **swipe left** to reveal Edit action (via `flutter_slidable`)
2. Or **tap** a transaction to open detail view, then tap the edit icon
3. Pre-populates the form with existing values
4. Save dispatches `AddOrUpdateTransactionEvent` with `transactionId` set (triggers update path)

## Deleting a Transaction

- **Swipe left** on any transaction list item to reveal the Delete action
- Dispatches `DeleteTransactionEvent` with the transaction's Hive key
- Hive entry is removed; home page automatically refreshes

## Filtering Transactions

On the Home page, transactions can be filtered by:

- **Date range**: Day / Week / Month / Year / Custom
- **Account**: Show only transactions for a specific account
- **Category**: Drill-down from the Overview chart
- **Transaction type**: Expense / Income / All

## Transaction List on Home

```mermaid
flowchart LR
    HOME[Home Page] --> SUMMARY[Summary Header\nTotal Income - Total Expense = Balance]
    HOME --> FILTER[Date Filter Bar\nhorizontal scroll timeline]
    HOME --> LIST[Transaction List\ngrouped by date]
    LIST --> ITEM[Transaction Item]
    ITEM --> SWIPE_LEFT[Swipe left → Edit / Delete]
    ITEM --> TAP[Tap → Transaction Detail]
```

## Transaction Form Validation Rules

| Field | Validation |
|-------|-----------|
| Name | Required, non-empty |
| Amount | Required, must be > 0 |
| Account | Required, must select an account |
| Category | Required (not needed for transfers) |
| Date | Required, defaults to current time |
| Source + Target Account | For transfers: must be different accounts |
