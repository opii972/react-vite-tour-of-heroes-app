# Getting Started

This project is a React adaptation of Angular's Tour of Heroes available here:
[live example](https://opii972.github.io/react-vite-tour-of-heroes-app/#/). \
To see the original version: [live example](https://angular.io/generated/live-examples/toh-pt6/stackblitz.html) /
[download example](https://angular.io/generated/zips/toh-pt6/toh-pt6.zip).

## Motivation

This project is not a comparison between these two technologies but
only a simple adaptation of the [Angular Tutorial](https://v17.angular.io/tutorial/tour-of-heroes#tour-of-heroes-application-and-tutorial) project
using with React + TypeScript + Vite. \
This project is intended for Front-End developers who are familiar with Angular and are curious
about developing Web Applications using React.

## React + TypeScript + Vite

This project provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

The generated base project also includes some changes such as:

1. `React Router` in [Data mode](https://reactrouter.com/start/modes#data) configuration using Route Objects

- Needed transform _eslint.config.js_ into [_eslint.config.ts_](https://eslint.org/docs/latest/use/configure/configuration-files#configuration-file) for autocompletion benefits.
- `TypeScript` was configured to allow a [CommonJS module into an ES6 module using a default import](https://sentry.io/answers/typescript-can-only-be-default-imported-using-the-esmoduleinterop-flag/).
- Deprecated `defineConfig()` has been rewritten into [flat config](https://eslint.org/docs/latest/use/configure/migration-guide#predefined-and-shareable-configs).

2. [`Prettier`](https://prettier.io/docs/install.html) by adding [`eslint-config-prettier`](https://github.com/prettier/eslint-plugin-prettier?tab=readme-ov-file#configuration-new-eslintconfigjs) and [`eslint-plugin-prettier`](https://typescript-eslint.io/users/what-about-formatting/#suggested-usage---prettier) configurations
3. `CSS Modules` for styles

## Trying Online

The Tour of Heroes application helps a staffing agency manage its stable of heroes. The application has many of the features that you'd expect to find in any data-driven application.

The final application offers the following features:

- Gets a list of heroes
- Displays the heroes in a list
- Edits a selected hero's details
- Navigates between different views of heroic data

# Installation

First, you need to install [Node.js](https://nodejs.org/en/download) using [nvm](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating).

Assuming the project is on GitHub and uses main as the default branch, you can create a local copy using:

```bash
$ git clone https://github.com/opii972/react-vite-tour-of-heroes-app.git#main my-project
```

Go to the project’s directory:

```bash
$ cd my-project
```

Install the Node.js version according to the _.nvmrc_ file:

```bash
$ nvm use
```

Install dependencies:

```bash
$ npm i
```

## Command Line Interface

Runs the app in the development mode:

```bash
$ npm run dev
```

Open http://localhost:5173/ in your browser.

Build for production:

```bash
$ npm run build
```

Locally preview production build:

```bash
$ npm run preview
```

Then open http://localhost:4173/ in your browser.

Execute ESLint according to the project rules:

```bash
$ npm run lint
```

Fix ESLint errors:

```bash
$ npm run lint:fix
```

Check if the files are well formatted:

```bash
$ npm run check-format
```

Apply prettier format:

```bash
$ npm run format
```

## Browser Support

According to the [Vite documentation](https://vite.dev/guide/build.html#building-for-production), the default browser support range is:

- Chrome >=107
- Edge >=107
- Firefox >=104
- Safari >=16

# Learn More

This project was bootstrapped with [Vite](https://vite.dev/guide/#getting-started).

To learn React, check out the [React documentation](https://react.dev/).
