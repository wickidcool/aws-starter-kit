---
phase: 10-auth-integration
plan: 02
subsystem: generator
tags: [typescript, react, template-processing, auth-provider, conditional-blocks]

# Dependency graph
requires:
  - phase: 10-auth-integration
    provides: processConditionalBlocks function for {{#if TOKEN}}...{{/if TOKEN}} blocks
provides:
  - Conditional AuthProvider integration in main.tsx template
  - Conditional exports in auth/index.ts based on provider selection
  - Conditional imports in use-auth.ts based on provider selection
affects: [10-03, 10-04]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - JSX comment-wrapped conditionals ({/* {{#if TOKEN}} */}) for React components
    - Import-level conditionals (// {{#if TOKEN}}) for module imports/exports

key-files:
  created: []
  modified:
    - packages/create-aws-starter-kit/templates/apps/web/src/main.tsx
    - packages/create-aws-starter-kit/templates/apps/web/src/auth/index.ts
    - packages/create-aws-starter-kit/templates/apps/web/src/auth/use-auth.ts

key-decisions:
  - "JSX conditionals use comment syntax ({/* {{#if TOKEN}} */}) for valid JSX"
  - "Double AuthProvider tags in JSX intentional - only one kept based on provider"
  - "Amplify.configure only when AUTH_COGNITO is true"

patterns-established:
  - "JSX conditional wrapping: {/* {{#if TOKEN}} */}<Component>{/* {{/if TOKEN}} */}"
  - "Import conditionals: // {{#if TOKEN}} ... // {{/if TOKEN}}"

issues-created: []

# Metrics
duration: 1min
completed: 2026-01-19
---

# Phase 10 Plan 02: Auth Provider Integration Summary

**Wired conditional AuthProvider into web app main.tsx and fixed auth module exports for provider-specific imports**

## Performance

- **Duration:** 1 min
- **Started:** 2026-01-19T21:40:21Z
- **Completed:** 2026-01-19T21:41:10Z
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments

- Updated main.tsx with conditional AuthProvider wrapping using JSX comment conditionals
- Added Amplify import and configuration (only when AUTH_COGNITO is true)
- Updated auth/index.ts to conditionally export from cognito-provider or auth0-provider
- Updated use-auth.ts to conditionally import AuthContext from correct provider

## Task Commits

Each task was committed atomically:

1. **Task 1: Update main.tsx with conditional AuthProvider** - `0a45bce` (feat)
2. **Task 2: Update auth/index.ts and use-auth.ts with conditional exports/imports** - `8b771df` (feat)

## Files Created/Modified

- `packages/create-aws-starter-kit/templates/apps/web/src/main.tsx` - Added conditional imports, Amplify configuration, and AuthProvider wrapper
- `packages/create-aws-starter-kit/templates/apps/web/src/auth/index.ts` - Conditional exports from cognito-provider or auth0-provider
- `packages/create-aws-starter-kit/templates/apps/web/src/auth/use-auth.ts` - Conditional imports of AuthContext from correct provider

## Decisions Made

- Used JSX comment syntax `{/* {{#if TOKEN}} */}` for conditionals inside JSX render to maintain valid JSX
- The double AuthProvider opening/closing tags in JSX are intentional - only one set will be kept based on which auth provider is selected
- Amplify.configure() is only called when AUTH_COGNITO is true, since Auth0 doesn't need it

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None

## Next Phase Readiness

- main.tsx template now conditionally wraps App with AuthProvider based on auth provider selection
- auth/index.ts exports from correct provider based on AUTH_COGNITO or AUTH_AUTH0
- use-auth.ts imports AuthContext from correct provider
- All 71 tests pass in create-aws-starter-kit
- Ready for next plan in phase 10

---
*Phase: 10-auth-integration*
*Completed: 2026-01-19*
