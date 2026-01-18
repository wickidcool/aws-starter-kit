# Roadmap: AWS Starter Kit CLI

## Overview

Transform the existing AWS Starter Kit into an interactive CLI tool that scaffolds new projects. Starting from CLI foundation, we build the wizard interface, template system, and generation engine, then add feature customization and polish for npm publishing.

## Domain Expertise

None

## Milestones

- ✅ **v1.0 MVP** — Phases 1-6 (shipped 2026-01-16) — [Full details](milestones/v1.0-ROADMAP.md)
- 🚧 **v1.1 Authentication** — Phases 7-10 (in progress)

## Completed Milestones

<details>
<summary>✅ v1.0 MVP (Phases 1-6) — SHIPPED 2026-01-16</summary>

- [x] **Phase 1: CLI Foundation** - Set up CLI package with command parsing (2/2 plans)
- [x] **Phase 1.1: Address Codebase Concerns** - Fix tech debt before templating (2/2 plans) (INSERTED)
- [x] **Phase 2: Interactive Wizard** - Implement prompts for configuration (2/2 plans)
- [x] **Phase 3: Template System** - Create template files with placeholders (3/3 plans)
- [x] **Phase 4: Generation Engine** - Build file copying and replacement logic (3/3 plans)
- [x] **Phase 5: Feature Toggles** - Add optional feature selection (3/3 plans)
- [x] **Phase 6: Polish & Publish** - Documentation, testing, npm publishing (3/3 plans)

**Total:** 7 phases, 18 plans

</details>

### 🚧 v1.1 Authentication (In Progress)

**Milestone Goal:** Add authentication scaffolding with choice between AWS Cognito and Auth0, with configurable features (basic auth, social logins, MFA)

#### Phase 7: Auth Wizard & Types

**Goal**: Add auth provider prompt, feature selection prompts, extend ProjectConfig with auth types
**Depends on**: v1.0 complete
**Research**: Unlikely (internal patterns - existing wizard code)
**Plans**: 1

Plans:
- [x] 07-01: Auth types, prompts, wizard integration (completed 2026-01-17)

#### Phase 8: Cognito Templates

**Goal**: CDK User Pool/Identity Pool infrastructure, Lambda authorizers, React auth hooks and components
**Depends on**: Phase 7
**Research**: Complete (AWS Cognito CDK patterns, aws-jwt-verify, Amplify v6)
**Plans**: 4

Plans:
- [x] 08-01: CDK Cognito infrastructure + generator manifest (completed 2026-01-17)
- [x] 08-02: Lambda authorizer middleware with aws-jwt-verify (completed 2026-01-17)
- [x] 08-03: React auth hooks & provider with Amplify (completed 2026-01-17)
- [x] 08-04: Generator integration + Amplify config + tests (completed 2026-01-18)

#### Phase 9: Auth0 Templates

**Goal**: Auth0 configuration files, React SDK integration, API middleware for token validation
**Depends on**: Phase 7
**Research**: Likely (Auth0 SDK integration, current docs)
**Research topics**: Auth0 React SDK, API middleware patterns, Auth0 configuration management
**Plans**: TBD

Plans:
- [ ] 09-01: TBD

#### Phase 10: Auth Integration

**Goal**: Wire auth into existing web/mobile/api templates, conditional generation logic based on auth selection
**Depends on**: Phase 8, Phase 9
**Research**: Unlikely (internal patterns - existing generation engine)
**Plans**: TBD

Plans:
- [ ] 10-01: TBD

## Progress

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|----------------|--------|-----------|
| 1. CLI Foundation | v1.0 | 2/2 | Complete | 2026-01-14 |
| 1.1 Codebase Concerns | v1.0 | 2/2 | Complete | 2026-01-13 |
| 2. Interactive Wizard | v1.0 | 2/2 | Complete | 2026-01-14 |
| 3. Template System | v1.0 | 3/3 | Complete | 2026-01-15 |
| 4. Generation Engine | v1.0 | 3/3 | Complete | 2026-01-15 |
| 5. Feature Toggles | v1.0 | 3/3 | Complete | 2026-01-15 |
| 6. Polish & Publish | v1.0 | 3/3 | Complete | 2026-01-16 |
| 7. Auth Wizard & Types | v1.1 | 1/1 | Complete | 2026-01-17 |
| 8. Cognito Templates | v1.1 | 4/4 | Complete | 2026-01-18 |
| 9. Auth0 Templates | v1.1 | 0/? | Not started | - |
| 10. Auth Integration | v1.1 | 0/? | Not started | - |
