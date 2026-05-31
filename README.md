# Local Commerce Kit

A lightweight static e-commerce storefront template for small product catalogs, maker projects, and public demos.

Live demo: https://dadjfancrypto.github.io/local-commerce-kit/

Local Commerce Kit is built for GitHub Pages and does not require a backend, build step, or database. Products, filters, cart state, and checkout summary run in the browser, making the project useful for prototypes, documentation examples, and small teams that need a simple storefront before committing to a full commerce stack.

## Features

- Responsive product grid
- Category filters and search
- Client-side cart drawer
- Quantity controls and order summary
- Accessible buttons and focus states
- GitHub Pages friendly static files

## Why This Exists

Many small projects need a clean public catalog before they need accounts, payment processing, inventory systems, or a full application backend. This repository focuses on the first step: a readable, forkable storefront that can be deployed from static files and extended gradually.

The current version is intentionally small so maintainers can review changes quickly and beginners can understand the whole project without a framework-specific toolchain.

## Run Locally

Open `index.html` in a browser.

For a local server:

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`.

## Deploy

1. Push this repository to GitHub.
2. Open repository settings.
3. Enable GitHub Pages from the main branch.
4. Use the generated Pages URL as the live demo URL.

## Roadmap

- Add checkout provider integration examples
- Add product data loading from JSON
- Improve automated accessibility checks
- Add a Japanese README translation
- Add theme presets for different catalog types

## Maintainer Workflow

This project is maintained as a small open-source template. Useful contributions include accessibility improvements, browser compatibility fixes, documentation updates, and examples that keep the project static-site friendly.

## Scope

This is a front-end template. It does not process payments or store customer data. Production use requires a real checkout provider, backend order validation, inventory control, privacy policy, and security review.

## License

MIT
