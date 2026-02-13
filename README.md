# 🚀 Serensia Technical Test

![CI Status](https://github.com/khaledbouguerra/serensia-test/actions/workflows/ci-pages.yml/badge.svg)

### Angular 21 • Signals • Modern Control Flow • Jest • CI/CD

A clean and modern Angular implementation of:

- 🔎 **Term Suggest Engine**
- 🌐 **Email Crawler (BFS-based)**

Built using the latest Angular standards and best practices.

---

## 🌍 Live Demo

👉 https://khaledbouguerra.github.io/serensia-test/

---

---

# 🔄 CI / CD Pipeline

This project includes a fully automated GitHub Actions pipeline.

Every push to `main` triggers a complete validation + deployment flow.

---

## 🟢 Pipeline Status

![Lint](https://github.com/khaledbouguerra/serensia-test/actions/workflows/lint.yml/badge.svg)
![Typecheck](https://github.com/khaledbouguerra/serensia-test/actions/workflows/typecheck.yml/badge.svg)
![Tests](https://github.com/khaledbouguerra/serensia-test/actions/workflows/test.yml/badge.svg)
![Deploy](https://github.com/khaledbouguerra/serensia-test/actions/workflows/deploy.yml/badge.svg)
![CI Status](https://github.com/khaledbouguerra/serensia-test/actions/workflows/ci-pages.yml/badge.svg)

➡ View workflow runs:  
https://github.com/khaledbouguerra/serensia-test/actions/workflows/ci-pages.yml

---

## ⚙️ Pipeline Jobs

The workflow consists of the following jobs:

| Job Name      | Purpose                           | Blocking                  |
| ------------- | --------------------------------- | ------------------------- |
| **lint**      | Runs ESLint (angular-eslint)      | ✅ Yes                    |
| **typecheck** | TypeScript strict type validation | ✅ Yes                    |
| **test**      | Jest unit tests + coverage        | ✅ Yes                    |
| **build**     | Production Angular build          | ✅ Yes                    |
| **deploy**    | Deploy to GitHub Pages            | 🚀 Only if all above pass |

---

## 🔁 Execution Flow

Push
↓
Lint
↓
Typecheck
↓
Tests
↓
Build
↓
Deploy

# 🧠 Tech Stack

- Angular 21
- Standalone Components
- Angular Signals
- New Control Flow Syntax (`@if`, `@for`)
- `inject()` Dependency Injection API
- Jest (Unit + Integration Tests)
- ESLint (angular-eslint)
- GitHub Actions CI
- GitHub Pages Deployment

---

# ✨ Features

## 🔎 Term Suggest

---

## 🌐 Email Crawler

---

# 🧪 Test HTML Fixtures (Crawler)

To validate the Email Crawler feature, a small set of static HTML pages is included in the repository.

They are located in:

## 📄 Files

- [`index.html`](./public/TestHtml/index.html)
- [`child1.html`](./public/TestHtml/child1.html)
- [`child2.html`](./public/TestHtml/child2.html)

---

## 🌍 Live URLs (GitHub Pages)

When deployed, these files are accessible at:

- https://khaledbouguerra.github.io/serensia-test/TestHtml/index.html
- https://khaledbouguerra.github.io/serensia-test/TestHtml/child1.html
- https://khaledbouguerra.github.io/serensia-test/TestHtml/child2.html

These pages are used as deterministic crawling targets to verify:

- Depth handling
- Email extraction logic
- Deduplication
- Loop prevention

---

## 🎯 Why Static Fixtures?

Using controlled HTML fixtures ensures:

- Deterministic testing
- No dependency on external websites
- Stable CI execution
- Reproducible results

This approach guarantees consistent crawler behavior across local development, CI pipeline, and deployed environment.

---

# 🏗 Architecture

```text
src/
├── core/
│   ├── http/
│   ├── utils/
│   │   ├── url.ts
│   │   └── dom.ts
│   └── testing/
└── features/
    ├── term-suggest/
    └── email-crawler/


```

### Architectural Principles

- Feature-based structure
- Separation of concerns (DOM / URL utilities isolated)
- InjectionToken abstraction for HTML fetcher
- Pure functions for business logic
- Test-driven service design
- Standalone Angular architecture

---

# 🧪 Testing

- Jest
- High coverage (crawler logic fully covered)
- Mock HTML fetcher for deterministic testing

Run locally:

```bash
npm install
npm start
npm test
npm run test:cov
npm run build

```
