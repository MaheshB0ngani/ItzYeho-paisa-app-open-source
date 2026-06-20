import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Paisa - Expense Tracker',
  description: 'Complete documentation for Paisa, the open-source cross-platform expense management app built with Flutter.',
  base: '/',

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#6750A4' }],
  ],

  themeConfig: {
    logo: '/logo.png',
    siteTitle: 'Paisa Docs',

    nav: [
      { text: 'Guide', link: '/guide/introduction' },
      { text: 'Architecture', link: '/architecture/overview' },
      { text: 'Features', link: '/features/transactions' },
      { text: 'User Flows', link: '/user-flows/onboarding' },
      { text: 'Development', link: '/development/local-setup' },
      { text: 'Deployment', link: '/deployment/android' },
    ],

    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Introduction', link: '/guide/introduction' },
          { text: 'Features Overview', link: '/guide/features' },
          { text: 'Tech Stack', link: '/guide/tech-stack' },
        ],
      },
      {
        text: 'Architecture',
        items: [
          { text: 'System Overview', link: '/architecture/overview' },
          { text: 'Clean Architecture', link: '/architecture/clean-architecture' },
          { text: 'State Management', link: '/architecture/state-management' },
          { text: 'Data Layer & Models', link: '/architecture/data-layer' },
          { text: 'Routing & Navigation', link: '/architecture/routing' },
        ],
      },
      {
        text: 'Features',
        items: [
          { text: 'Transactions', link: '/features/transactions' },
          { text: 'Accounts', link: '/features/accounts' },
          { text: 'Categories', link: '/features/categories' },
          { text: 'Debts & Loans', link: '/features/debts' },
          { text: 'Recurring Transactions', link: '/features/recurring' },
          { text: 'Analytics & Overview', link: '/features/analytics' },
          { text: 'Search', link: '/features/search' },
          { text: 'Settings', link: '/features/settings' },
        ],
      },
      {
        text: 'User Flows',
        items: [
          { text: 'Onboarding', link: '/user-flows/onboarding' },
          { text: 'Adding Transactions', link: '/user-flows/transactions' },
          { text: 'Managing Accounts', link: '/user-flows/accounts' },
          { text: 'Export & Import Data', link: '/user-flows/export-import' },
        ],
      },
      {
        text: 'Development',
        items: [
          { text: 'Local Setup', link: '/development/local-setup' },
          { text: 'Project Structure', link: '/development/project-structure' },
          { text: 'Code Generation', link: '/development/code-generation' },
          { text: 'Coding Standards', link: '/development/code-standards' },
          { text: 'Localization', link: '/development/localization' },
        ],
      },
      {
        text: 'Deployment',
        items: [
          { text: 'Android', link: '/deployment/android' },
          { text: 'iOS', link: '/deployment/ios' },
          { text: 'Web', link: '/deployment/web' },
          { text: 'Desktop (Windows/macOS)', link: '/deployment/desktop' },
          { text: 'CI/CD Pipeline', link: '/deployment/cicd' },
        ],
      },
      {
        text: 'Data Reference',
        items: [
          { text: 'Data Models', link: '/data/models' },
          { text: 'Hive Storage Schema', link: '/data/hive-schema' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/maheshb0ngani/itzyeho-paisa-app-open-source' },
    ],

    search: {
      provider: 'local',
    },

    footer: {
      message: 'Released under the GPLv3 License.',
      copyright: 'Paisa - Open Source Expense Tracker',
    },

    editLink: {
      pattern: 'https://github.com/maheshb0ngani/itzyeho-paisa-app-open-source/edit/mahesh/documentation/docs/:path',
      text: 'Edit this page on GitHub',
    },
  },

  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark',
    },
  },
})
