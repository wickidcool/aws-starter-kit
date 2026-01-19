# AWS Starter Kit CLI

## What This Is

A CLI tool (`npx create-aws-starter-kit`) that scaffolds new full-stack AWS projects through an interactive wizard. Users answer questions about project name, platforms (web/mobile/api), AWS region, features, and styling preferences, then get a fully configured Nx monorepo ready to develop.

## Core Value

Run it, answer questions, have a working project immediately — no manual configuration or find-replace needed.

## Current State (v1.1)

- **CLI package:** `packages/create-aws-starter-kit` (1200+ LOC TypeScript)
- **Templates:** 130+ template files with `{{TOKEN}}` placeholders and `{{#if}}/{{/if}}` conditionals
- **Test coverage:** 45+ unit tests for validation, wizard, generator, and auth
- **npm ready:** Configured for publish with README, repository metadata
- **Auth providers:** AWS Cognito and Auth0 support with configurable features

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
- ✓ CLI package with interactive wizard (`npx create-aws-starter-kit`) — v1.0
- ✓ Project name prompt with validation — v1.0
- ✓ Platform selection (web, mobile, api — pick any combination) — v1.0
- ✓ AWS region configuration — v1.0
- ✓ Optional feature toggles (GitHub Actions, VS Code config) — v1.0
- ✓ Styling/theme preferences (brand color) — v1.0
- ✓ Template files with placeholder replacement — v1.0
- ✓ Post-generation setup instructions — v1.0
- ✓ Authentication provider selection (Cognito/Auth0/None) — v1.1
- ✓ Auth feature toggles (social login, MFA) — v1.1
- ✓ Cognito CDK infrastructure (User Pool, Identity Pool) — v1.1
- ✓ Cognito Lambda authorizer middleware — v1.1
- ✓ Cognito React auth hooks with Amplify — v1.1
- ✓ Auth0 React SDK integration — v1.1
- ✓ Auth0 API middleware with JWT validation — v1.1
- ✓ Conditional template generation based on auth selection — v1.1
- ✓ Protected API endpoint example (/users/me) — v1.1
- ✓ Auth UI components (login/logout buttons) — v1.1

### Active

(None — v1.1 complete)

### Out of Scope

- Plugin/extension system — keep v1 simple, reconsider for v2
- Automatic AWS deployment from CLI — user deploys manually via existing npm scripts
- GUI/web-based wizard — CLI only for v1
- Ongoing sync with template updates — generated projects are independent snapshots

## Context

This project is already a functional AWS starter kit used for new projects. The CLI extracts it into a reusable tool so others (and future-you) can quickly spin up new projects without manual cloning and renaming.

**Shipped v1.0 includes:**
- Interactive wizard with 5 prompts (name, platforms, features, region, theme)
- Template system with 112 files covering all apps/packages
- Generation engine with platform filtering and token replacement
- 35 unit tests for core functionality

**Shipped v1.1 includes:**
- Auth provider selection (Cognito/Auth0/None) with feature toggles
- Cognito: CDK infrastructure, Amplify integration, Lambda authorizers
- Auth0: React SDK, JWT middleware, configuration templates
- Conditional block processing ({{#if}}/{{/if}}) for template generation
- Protected /users/me endpoint example
- Auth UI components in App.tsx

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
| Interactive wizard over simple clone | Better UX, allows customization per project | ✓ Good |
| CLI in same repo as template | Single source of truth, easier to keep in sync | ✓ Good |
| npm publish for distribution | Standard Node.js distribution, familiar `npx` pattern | ✓ Good |
| Use NodeNext module resolution | Required for ESM hashbang compatibility | ✓ Good |
| Double-brace {{TOKEN}} syntax | Distinct from JS/EJS/Mustache, easy regex replacement | ✓ Good |
| Use .template extension for project.json | Prevents Nx workspace detection conflicts | ✓ Good |
| prompts library for CLI | Lightweight, good UX, simple API | ✓ Good |
| Comment-based conditionals | {{#if}} in comments keeps templates valid syntax | ✓ Good |
| Process conditionals before tokens | Allows tokens inside conditional blocks | ✓ Good |
| Auth0 redirect-based auth | Standard Universal Login flow | ✓ Good |
| Cognito groups vs Auth0 permissions | Match each provider's authorization model | ✓ Good |

---
*Last updated: 2026-01-19 after v1.1 milestone*
