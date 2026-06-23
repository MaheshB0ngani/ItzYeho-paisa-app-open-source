# Paisa Documentation

This is the VitePress-based documentation site for the Paisa Expense Tracker.

## Quick Start

```bash
cd docs
npm install
npm run docs:dev
```

Then open `http://localhost:5173` in your browser.

## Build for Production

```bash
npm run docs:build
# Output: docs/.vitepress/dist/
```

## Preview Production Build

```bash
npm run docs:preview
```

## Documentation Structure

```
docs/
├── guide/               # Getting started, features overview, tech stack
├── architecture/        # System design, clean architecture, state management
├── features/            # Per-feature documentation
├── user-flows/          # Step-by-step user journey diagrams
├── development/         # Dev setup, project structure, code standards
├── deployment/          # Platform-specific deployment guides
└── data/                # Data models and Hive schema reference
```
