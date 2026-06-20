# Features Overview

Paisa is packed with features that cover the full personal-finance lifecycle. Below is a comprehensive breakdown.

## Core Features

### 1. Transaction Management

Add, edit, and delete financial transactions with rich metadata:

- **Types**: Expense, Income, Transfer (between accounts)
- **Fields**: Name, amount, account, category, date & time, description
- **Filtering**: By date range, account, category, or transaction type
- **Quick Actions**: App shortcuts on the home screen to jump straight to adding an expense, income, or transfer

### 2. Account Management

Track all your financial accounts in one place:

- Multiple accounts: bank accounts, wallets, credit cards, cash
- Customizable name, bank name, card type, and color
- Per-account transaction history
- Account balance tracking (initial balance + transactions)
- Option to exclude accounts from total balance calculations
- Transfer transactions between any two accounts

### 3. Category Management

Organize transactions into meaningful categories:

- Create, edit, and delete categories
- Icon picker with hundreds of Material Design icons
- Color-coded categories
- Default categories pre-loaded on first run
- **Budget tracking** per category with optional budget limits
- Drill-down view: tap a category to see all its transactions

### 4. Debt & Loan Tracking

Never lose track of borrowed or lent money:

- **Debt types**: Money you owe (Debit) vs. money owed to you (Credit)
- Expiry/due date for repayment deadlines
- Add partial payment transactions against a debt
- Full payment history per debt entry
- Description field for context

### 5. Recurring Transactions

Automate repetitive entries:

- Schedule at any **frequency**: Daily, Weekly, Monthly, Yearly
- Linked to an account and category
- Automatically generates transactions on the scheduled date
- Useful for salaries, subscriptions, rent, utility bills

### 6. Analytics & Overview

Visualize your financial health:

- **Home dashboard**: Net balance, recent transactions, income vs. expense summary
- **Bar charts**: Spending over time (powered by fl_chart)
- **Sparklines**: Mini-charts for quick trend view
- **Category breakdown**: See which categories consume the most
- **Filter by period**: Weekly, monthly, yearly views
- **Drill-down**: Tap any category in charts to see individual transactions

### 7. Search

Global full-text search across all transactions:

- Search by transaction name, amount, or description
- Results grouped and sortable
- Accessible via the top search bar on the home screen

### 8. Export & Import

Portable data management:

- **JSON Export**: Full backup including all transactions, accounts, categories, debts, recurring entries, and metadata
- **CSV Export**: Spreadsheet-compatible tabular format
- **JSON Import**: Restore from a backup file
- Share exports via any app (email, drive, etc.)

## UI & Personalization Features

### Material Design 3

Paisa uses Flutter's Material 3 design system end-to-end:

- Rounded corners, elevated surfaces
- Color roles (primary, secondary, tertiary, error)
- Motion animations via the `animations` package

### Dynamic Theming (Material You)

On Android 12+ devices, Paisa can extract the user's wallpaper colors and apply them as the app theme — just like Google's own apps.

### Theme Customization

- **Light / Dark / System** theme modes
- **Black mode**: True black background for OLED displays
- **Custom color picker**: Choose any primary seed color
- **Font picker**: Select from multiple Google Fonts
- **Language picker**: Switch the app language at runtime

### Responsive Layout

- **Mobile**: Bottom navigation bar, compact cards
- **Tablet**: Split-pane layout using `responsive_builder`
- **Desktop**: Wide sidebar navigation, multi-column content
- **Foldable devices**: Special layouts that use the inner/outer display area

## Security Features

### Biometric Authentication

Optionally lock the app behind the device's biometric screen:

- Fingerprint (Touch ID / in-display)
- Face recognition (Face ID / Android face unlock)
- Powered by Flutter's `local_auth` package
- Triggered on every app launch if enabled

## Platform Support

| Platform | Status |
|----------|--------|
| Android | Full support (API 21+) |
| iOS | Full support |
| Web | Supported (path-based URL strategy) |
| Windows | Supported (MSIX packaging) |
| macOS | Supported |

## Accessibility

- Semantic labels on all interactive elements
- High-contrast support via theme color roles
- Locale-aware number and currency formatting via `intl`
