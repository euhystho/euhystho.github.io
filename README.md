# Eugene's Personal Website

[![Build & Lint Astro](https://github.com/euhystho/euhystho.github.io/actions/workflows/build.yml/badge.svg)](https://github.com/euhystho/euhystho.github.io/actions/workflows/build.yml)
[![Playwright Tests](https://github.com/euhystho/euhystho.github.io/actions/workflows/playwright.yml/badge.svg)](https://github.com/euhystho/euhystho.github.io/actions/workflows/playwright.yml)
[![Created Badge](https://badges.pufler.dev/created/euhystho/euhystho.github.io)](https://badges.pufler.dev)

A personal website built with Astro and Svelte frameworks with Tailwind CSS to showcase technical projects, academic achievements, professional aspirations, and writing samples.

## 💻 Technology Stack

- **Super-Framework**: [Astro](https://astro.build/) - Site builder with excellent performance and framework flexibility
- **Components**: [Svelte](https://svelte.dev/) - Reactive component framework
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **Content**: [MDX](https://mdxjs.com) for rich content with embedded Svelte components
- **Deployment**: GitHub Pages, Cloudflare Pages, and GitHub Actions CI/CD for accessibility and performance metrics

## 🔄 Workflows

This project uses GitHub Actions for continuous integration and deployment:

1. **Build & Lint Astro** (`.github/workflows/build.yml`):
   - Triggered on every push and pull request
   - Lints the project to verify style and reduce errors
   - Builds the project to verify there are no errors
   - Ensures code quality and prevents broken deployments
2. **Playwright Tests** (`.github/workflows/playwright.yml`):

   - Triggered on every push and pull request
   - Installs Playwright browsers for testing
   - Runs Playwright tests to automate web interactions on multiple browsers and platforms

3. **GitHub Pages Deployment** (auto-configured by GitHub):

   - Automatically deploys the built website to GitHub Pages
   - Triggered when changes are pushed to the gh-pages branch
   - Creates the production build and publishes it

4. **Cloudflare Pages** (configured in Cloudflare dashboard):
   - Provides additional hosting with Cloudflare's CDN capabilities
   - Automatically detects changes in the GitHub repository
   - Offers preview deployments for pull requests

## 🏗️ Project Structure

```text
├── .github/workflows/     # CI/CD workflow configurations
├── public/                # Static assets (images, fonts, etc.)
├── src/
│   ├── components/        # Reusable UI components using Astro or Svelte
│   ├── content/           # Content collections (projects, writing samples, etc.)
│   ├── layouts/           # Page layout templates
│   ├── pages/             # Page components and routes
│   └── styles/
├── tests/                 # TypeScript Playwright tests
├── .prettierrc            # Prettier configuration
├── astro.config.mjs       # Astro configuration
├── eslint.config.js       # ESLint configuration
├── lighthouserc.json      # Lighthouse configuration
├── eslint.config.mjs      # ESLint configuration
├── playwright.config.ts   # Playwright configuration
├── svelte.config.ts       # Svelte configuration
└── tsconfig.json          # TypeScript configuration
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 🚀 Development Workflow

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Make changes to the codebase
5. Commit and push changes to GitHub
6. GitHub Actions will automatically build, test, and deploy your changes

## License

This project is licensed under the MIT License, see the [license](LICENSE) file for details.
