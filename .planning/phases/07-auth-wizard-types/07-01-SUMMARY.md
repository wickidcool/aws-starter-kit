---
phase: 07-auth-wizard-types
plan: 01
subsystem: auth
tags: [cli, wizard, prompts, typescript, cognito, auth0]

# Dependency graph
requires:
  - phase: 06-polish-publish
    provides: Working CLI with wizard, generation engine, and tests
provides:
  - AuthProvider, AuthFeature, AuthConfig types for auth configuration
  - Auth prompts (provider selection, feature toggles)
  - Extended ProjectConfig with auth field
affects: [08-cognito-templates, 09-auth0-templates, 10-auth-integration]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Conditional prompt types for dependent questions
    - Auth config structure with provider and features

key-files:
  created:
    - packages/create-aws-starter-kit/src/prompts/auth.ts
  modified:
    - packages/create-aws-starter-kit/src/types.ts
    - packages/create-aws-starter-kit/src/wizard.ts
    - packages/create-aws-starter-kit/src/__tests__/wizard.spec.ts

key-decisions:
  - "Auth provider defaults to 'none' - auth is optional scaffolding"
  - "Auth features prompt uses conditional type to skip when provider is 'none'"
  - "Basic email/password auth always included when provider selected (not a separate feature)"

patterns-established:
  - "Conditional prompts: use type function to conditionally show prompts based on previous answers"

issues-created: []

# Metrics
duration: 8min
completed: 2026-01-17
---

# Phase 7 Plan 01: Auth Wizard & Types Summary

**Extended CLI wizard with authentication configuration: provider selection (Cognito/Auth0/None) and feature toggles (social login, MFA)**

## Performance

- **Duration:** 8 min
- **Started:** 2026-01-17T19:44:00Z
- **Completed:** 2026-01-17T19:52:00Z
- **Tasks:** 3
- **Files modified:** 4

## Accomplishments
- Added AuthProvider, AuthFeature, and AuthConfig types to types.ts
- Created auth prompts with conditional features prompt
- Integrated auth prompts into wizard flow
- Added 3 new auth-specific test cases (Cognito with features, Auth0, no auth)

## Task Commits

Each task was committed atomically:

1. **Task 1: Extend ProjectConfig with auth types** - `ad90f05` (feat)
2. **Task 2: Create auth prompts** - `67604c9` (feat)
3. **Task 3: Update wizard with auth integration and tests** - `1d0e1fa` (feat)

## Files Created/Modified
- `packages/create-aws-starter-kit/src/types.ts` - Added AuthProvider, AuthFeature, AuthConfig types and auth field to ProjectConfig
- `packages/create-aws-starter-kit/src/prompts/auth.ts` - New auth prompts (provider selection, feature toggles)
- `packages/create-aws-starter-kit/src/wizard.ts` - Integrated auth prompts, construct auth config
- `packages/create-aws-starter-kit/src/__tests__/wizard.spec.ts` - Updated existing tests, added 3 auth-specific tests

## Decisions Made
- Auth provider defaults to 'none' since auth is optional scaffolding
- Auth features prompt conditionally shown only when a provider is selected
- Basic email/password auth is implied when any provider is selected (not a toggleable feature)

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## Next Phase Readiness
- Auth types and wizard prompts ready for template generation
- Ready for Phase 8 (Cognito Templates) and Phase 9 (Auth0 Templates)
- ProjectConfig.auth structure available for conditional generation logic

---
*Phase: 07-auth-wizard-types*
*Completed: 2026-01-17*
