<!-- # vue-vite-typescript

🚀 Vue 3, TypeScript, Tailwind CSS, Vite, Pinia ⚡️ Made with developer experience first: ESLint, Prettier, VSCode, PostCSS

- 🎁 Tailwind Css combine with Scss
- 🍍 State Management via Pinia
- 🗂 VSCode configuration: Debug, Settings, Tasks and extension for ESLint, Prettier, TypeScript
- 🚓 Friendly structure
- 📦 Components auto importing
- 📥 APIs auto importing - use Composition API and others directly
- 📏 Linter with ESLint for Vue, Typescript
- 💡 Axios interceptors
- ⚙️ Unit Testing with Vitest, E2E Testing with Playwright
- 🦔 Use lint-staged and commitlint for friendly commit

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## What is commitlint

commitlint checks if your commit messages meet the [conventional commit format](https://conventionalcommits.org).

In general the pattern mostly looks like this:

```sh
type(scope?): subject  #scope is optional; multiple scopes are supported (current delimiter options: "/", "\" and ",")
```

Real world examples can look like this:

```text
chore: run tests on travis ci
```

```text
fix(server): send cors headers
```

```text
feat(blog): add comment section
```

Common types according to [commitlint-config-conventional (based on the Angular convention)](https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional#type-enum) can be:

- build:  Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- chore: Other changes that don't modify src or test files
- ci: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
- docs: Documentation only changes
- feat:  A new feature
- fix: A bug fix
- perf: A code change that improves performance
- refactor: A code change that neither fixes a bug nor adds a feature
- revert: Reverts a previous commit
- style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- test: Adding missing tests or correcting existing tests

### Run Commitlint prompt

```sh
# Run commit prompt
npm run commit
```

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

````sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
npm run build

# Runs the end-to-end tests
npm run test:e2e
# Runs the tests only on Chromium
npm run test:e2e -- --project=chromium
# Runs the tests of a specific file
npm run test:e2e -- tests/example.spec.ts
# Runs the tests in debug mode
npm run test:e2e -- --debug
```
````

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
``` -->
