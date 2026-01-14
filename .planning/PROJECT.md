# AWS Starter Kit CLI

## What This Is

A CLI tool (`npx aws-starter-kit`) that scaffolds new full-stack AWS projects through an interactive wizard. Users answer questions about project name, platforms (web/mobile/api), AWS region, features, and styling preferences, then get a fully configured Nx monorepo ready to develop.

## Core Value

Run it, answer questions, have a working project immediately — no manual configuration or find-replace needed.

## Requirements

### Validated

- ✓ Nx monorepo structure with apps/packages organization — existing
- ✓ React 19 web app with Vite, Chakra UI, Zustand — existing
- ✓ React Native mobile app with Expo — existing
- ✓ AWS Lambda API with TypeScript handlers — existing
- ✓ AWS CDK infrastructure (S3, CloudFront, API Gateway, DynamoDB) — existing
- ✓ Shared packages (common-types, api-client) — existing
- ✓ Jest testing setup across all apps — existing
- ✓ ESLint configuration with Nx enforcement — existing

### Active

- [ ] CLI package with interactive wizard (`npx aws-starter-kit`)
- [ ] Project name prompt with validation
- [ ] Platform selection (web, mobile, api — pick any combination)
- [ ] AWS region configuration
- [ ] Optional feature toggles (auth, etc.)
- [ ] Styling/theme preferences
- [ ] Template files with placeholder replacement
- [ ] Post-generation setup instructions

### Out of Scope

- Plugin/extension system — keep v1 simple, reconsider for v2
- Automatic AWS deployment from CLI — user deploys manually via existing npm scripts
- GUI/web-based wizard — CLI only for v1
- Ongoing sync with template updates — generated projects are independent snapshots

## Context

This project is already a functional AWS starter kit used for new projects. The goal is to extract it into a reusable CLI so others (and future-you) can quickly spin up new projects without manual cloning and renaming.

**Existing codebase provides:**
- Complete working example of web + mobile + API + infrastructure
- Established patterns for handlers, services, models, state management
- Test infrastructure and conventions
- CI/CD patterns (GitHub Actions deployment user)

**Technical environment:**
- Nx monorepo (nx.json, project.json files)
- Node.js 22.16.0+ required
- npm with legacy-peer-deps for React 19
- AWS CDK for infrastructure

## Constraints

- **Tech stack**: Must work as `npx` command (Node.js, published to npm)
- **Compatibility**: Generated projects must work with Node 22.16.0+ (same as current kit)
- **Monorepo**: CLI package lives in this repo alongside the template source

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Interactive wizard over simple clone | Better UX, allows customization per project | — Pending |
| CLI in same repo as template | Single source of truth, easier to keep in sync | — Pending |
| npm publish for distribution | Standard Node.js distribution, familiar `npx` pattern | — Pending |

---
*Last updated: 2026-01-13 after initialization*
