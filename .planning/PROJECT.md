# AWS Starter Kit CLI

## What This Is

A CLI tool (`npx create-aws-starter-kit`) that scaffolds new full-stack AWS projects through an interactive wizard. Users answer questions about project name, platforms (web/mobile/api), AWS region, features, and styling preferences, then get a fully configured Nx monorepo ready to develop.

## Core Value

Run it, answer questions, have a working project immediately — no manual configuration or find-replace needed.

## Current State (v1.0)

- **CLI package:** `packages/create-aws-starter-kit` (978 LOC TypeScript)
- **Templates:** 112 template files with `{{TOKEN}}` placeholders
- **Test coverage:** 35 unit tests for validation, wizard, and generator
- **npm ready:** Configured for publish with README, repository metadata

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

### Active

(None — v1.0 complete)

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

---
*Last updated: 2026-01-16 after v1.0 milestone*
