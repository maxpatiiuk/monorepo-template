# monorepo-template

A scalable template for a pnpm monorepo, using Turbo, Vite, and TypeScript.

This was presented at Esri's Dev & Tech Summit 2026 in the
[ArcGIS Maps SDK for JavaScript: A Look Under the Hood](https://github.com/maxpatiiuk/esri-dev-summit-presentations/tree/main/2026/a-look-under-the-hood)
session.

## Disclaimer

This template shows a common monorepo tooling stack. Every team has their unique
needs, baggage, and preferences​. No tooling works universally​.

Do your own research to find what is right for your team.

In addition, this template was authored at a given point in time. JavaScript
tooling ecosystem changes rapidly and packages age quickly.

## What this template includes

- [PNPM as a fast and secure package manager](./pnpm-workspace.yaml)
- [TypeScript configuration](./packages/support-packages/typescript-config/)
- [Prettier configuration](./packages/support-packages/prettier-config/)
- [Runtime utils package](./packages/support-packages/runtime-utils/)
- [Monorepo CLI toolkit](./packages/support-packages/monorepo-cli/). This can be
  extended for automating common CI, deployment, and verification tasks
- [VitePress monorepo docs template](./packages/docs-packages/project/)
- [Starter package for a Vite app](./packages/starter-packages/app-starter/)
- [Husky](./.husky/) to configure Git Hooks
  - [lint-staged.config.js](./lint-staged.config.js) to lint and autofix files
    before commit.
  - [commitlint.config.js](./commitlint.config.js) for enforcing consistent
    commit message convention.
    [Conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)
    standard is used as it is visually scannable by humans and machine-readable
    for automation.

## What you can add after forking the template

### Project docs

Document the following about your project (as needed depending on team size):

- governance structure
- API references
- conventions, guidelines, best practices, tips
- areas of responsibilities, contacts, internal communication channels
- onboarding resources, contributing guidelines
- policies (third-party dependencies, licenses, versioning, marketing)
- internal learning resources
- devops workflows
- release management
- links to preview deployments

### Git LFS

- Configure [Git LFS](https://git-lfs.com/) to keep monorepo size in check

### GitHub Workflows

Write GitHub workflows for:

- On push to PR and main branch: build, lint, test, deploy, cache
- Increment version, branch for release, cut a release
- Issue management automation (assigning labels, milestones, authors)

## GitHub metadata

- Setup
  [ISSUE templates](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/configuring-issue-templates-for-your-repository)
  and
  [Pull Request template](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/creating-a-pull-request-template-for-your-repository)
  for consistent daily
- workflows
- Setup
  [CODEOWNERS](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners)
- Add [instructions files](https://agents.md/) for AGENTS

## ESLint

ESLint is essential on a multi-person team for ensuring consistent code style,
detecting bugs, and autofixing common issues.

- Create [ESLint config](https://eslint.org/docs/latest/use/configure/)
- Create an `@monorepo/eslint-config` package
- Consume the `@monorepo/eslint-config` package in the monorepo-root
  `eslint.config.js`
- Bonus: read `.gitignore` and `.prettierignore` ignore lists in ESLint config
  to have ESLint respect these ignore lists
- Run ESLint on changed files in `lint-staged.config.js` to keep files always
  lint-free

## Custom monorepo CLIs

- Write a CLI that will be called by `lint-staged.config.js` on any modified
  file to error if accidentally trying to commit an overly large file and
  suggest using Git LFS or image compression
- For each changed TypeScript file, make `lint-staged.config.js` run
  `vitest related ...listOfChangedFiles` to re-run just the tests affected by
  the changed files
- On package.json changes, validate that dependencies are declared correctly and
  are using PNPM catalogs

## Monorepo docs (VitePress)

- Auto-generate sidebar using
  [vitepress-sidebar](https://www.npmjs.com/package/vitepress-sidebar)
- Read the monorepo's CODEOWNERs file to display authorship information at the
  bottom of each doc page
- Read Git to display `last modified` date at the bottom of each doc page
- Allow embedding monorepo files in docs with a link to the original full file
- Add RSS feed. Notify team's communication channel when project docs are updated

## Build utils

Create Node.js utils for build-time concerns:

- Vite preset for apps, Node.js libraries, browser libraries
- Higher-level wrappers over node:fs, node:path, node:child_process for making
  common actions easier, especially in monorepo CLIs
- Utils for working with package.json files

## Misc

- Enable
  [Turbo remote cache](https://turborepo.dev/docs/core-concepts/remote-caching)
  to improve performance by sharing build cache with CI and other devs
- Enable [PNPM Catalogs](https://pnpm.io/catalogs) to manage all dependency
  versions in a single place, ensuring monorepo packages use consistent dependency versions
