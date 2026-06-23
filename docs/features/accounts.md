# Accounts Feature

## Overview

The Accounts feature lets users manage all their financial accounts (bank accounts, wallets, credit cards, cash) in one place.

**Files:** `lib/features/account/`

## Card Types

| Enum Value | Description |
|-----------|-------------|
| `CardType.bank` | Traditional bank account |
| `CardType.wallet` | Digital wallets (PayTM, Paytm, GPay balance) |
| `CardType.transit` | Travel/transit cards |
| `CardType.credit` | Credit cards |
| `CardType.cash` | Physical cash wallet |

## Data Model

```dart
class Account {
  final String name;             // Display name (e.g. "HDFC Savings")
  final String bankName;         // Institution (e.g. "HDFC Bank")
  final CardType cardType;       // Type of account
  final double amount;           // Current/initial balance
  final int color;               // Theme color (ARGB int)
  final bool isAccountExcluded;  // Exclude from net worth?
}
```

## BLoC

`AccountBloc` manages account state:

| Event | Description |
|-------|-------------|
| `AddAccountEvent` | Create a new account |
| `DeleteAccountEvent` | Remove account (and all linked transactions) |
| `UpdateAccountEvent` | Edit account details |
| `FetchAccountFromIdEvent` | Load account for editing |

| State | Description |
|-------|-------------|
| `AccountInitial` | Default state |
| `AccountLoading` | Processing |
| `AccountAdded` | Account created |
| `AccountDeleted` | Account removed |
| `UpdateAccountState` | Pre-populated for editing |
| `AccountErrorState` | Error |

## Balance Calculation

An account's current balance is:

```
Initial Balance (amount)
+ SUM of all income transactions linked to this account
- SUM of all expense transactions linked to this account
+ SUM of all incoming transfer amounts (superId = this account)
- SUM of all outgoing transfer amounts (accountId = this account, type = transfer)
```

This is computed in real-time from the Hive box rather than stored as a running total.

## Account Exclusion

When `isAccountExcluded = true`:
- The account does **not** contribute to the home dashboard net balance
- Individual account transactions are still tracked and visible
- Useful for: credit card debt (you don't want it inflating/deflating net worth), savings goals, hypothetical accounts

## Account Color

Each account has a custom color. This color is used:
- As the card background on the account list
- To color-code the account chip on transaction items
- In charts when grouping by account

## Related Features

- [Transactions](/features/transactions) — every transaction belongs to an account
- [Analytics](/features/analytics) — per-account spending breakdowns
