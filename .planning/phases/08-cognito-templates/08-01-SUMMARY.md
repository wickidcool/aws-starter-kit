---
phase: 08-cognito-templates
plan: 01
subsystem: auth
tags: [cdk, cognito, aws, infrastructure, templates]

# Dependency graph
requires:
  - phase: 07-auth-wizard-types
    provides: AuthProvider, AuthConfig types, auth prompts in wizard
provides:
  - CognitoStack CDK template for User Pool and Client
  - byAuthProvider manifest entry for auth-based file selection
  - AUTH_COGNITO, AUTH_AUTH0, AUTH_SOCIAL_LOGIN, AUTH_MFA tokens
affects: [09-auth0-templates, 10-auth-integration]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Comment-based conditionals for CDK template sections ({{#if AUTH_COGNITO}})
    - byAuthProvider manifest pattern for auth-specific templates

key-files:
  created:
    - packages/create-aws-starter-kit/templates/apps/api/cdk/auth/cognito-stack.ts
  modified:
    - packages/create-aws-starter-kit/templates/apps/api/cdk/app.ts
    - packages/create-aws-starter-kit/src/templates/manifest.ts
    - packages/create-aws-starter-kit/src/templates/types.ts
    - packages/create-aws-starter-kit/src/__tests__/generator/replace-tokens.spec.ts

key-decisions:
  - "Use comment-based conditionals ({{#if}}/{{/if}}) for CDK template sections"
  - "Cognito stack uses 'stage' prop instead of 'environmentName' for cleaner naming"
  - "Identity Pool only created when social-login feature enabled"

patterns-established:
  - "byAuthProvider: Auth provider-specific templates follow byPlatform/byFeature pattern"
  - "Auth tokens: Boolean string tokens ('true'/'false') for conditional generation"

issues-created: []

# Metrics
duration: 4min
completed: 2026-01-17
---

# Phase 8 Plan 01: Cognito CDK Templates Summary

**Created AWS Cognito CDK infrastructure template with User Pool, Client, conditional Identity Pool, and extended generator manifest with auth provider-based file selection**

## Performance

- **Duration:** 4 min
- **Started:** 2026-01-17T21:35:55Z
- **Completed:** 2026-01-17T21:39:34Z
- **Tasks:** 3
- **Files modified:** 5

## Accomplishments
- Created CognitoStack CDK template with User Pool (email sign-in, self-registration, password policy)
- Added User Pool Client for SPA/mobile with SRP auth flows
- Conditional MFA configuration via {{AUTH_MFA}} token
- Conditional Identity Pool with IAM roles via {{AUTH_SOCIAL_LOGIN}} token
- Extended template manifest with byAuthProvider for auth-specific file copying
- Added 4 new auth-related tokens (AUTH_COGNITO, AUTH_AUTH0, AUTH_SOCIAL_LOGIN, AUTH_MFA)

## Task Commits

Each task was committed atomically:

1. **Task 1: Create Cognito CDK stack template** - `ee290eb` (feat)
2. **Task 2: Update CDK app template to include Cognito stack** - `f7b5901` (feat)
3. **Task 3: Extend generator manifest with auth provider support** - `2c4c4d6` (feat)

## Files Created/Modified
- `packages/create-aws-starter-kit/templates/apps/api/cdk/auth/cognito-stack.ts` - CognitoStack CDK construct with User Pool, Client, and optional Identity Pool
- `packages/create-aws-starter-kit/templates/apps/api/cdk/app.ts` - Added conditional CognitoStack import and instantiation
- `packages/create-aws-starter-kit/src/templates/types.ts` - Extended TokenValues with auth tokens, added byAuthProvider to TemplateManifest
- `packages/create-aws-starter-kit/src/templates/manifest.ts` - Added byAuthProvider entries, auth token derivation
- `packages/create-aws-starter-kit/src/__tests__/generator/replace-tokens.spec.ts` - Updated mockTokens with new auth tokens

## Decisions Made
- Comment-based conditionals ({{#if AUTH_X}}/{{/if AUTH_X}}) used for CDK template sections - generator will strip these
- CognitoStack uses 'stage' prop for cleaner naming (e.g., dev-user-pool vs environmentName pattern)
- Identity Pool only created when social-login feature is enabled (reduces complexity for basic auth)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Updated test fixtures with new auth tokens**
- **Found during:** Task 3 (Extending generator manifest)
- **Issue:** TypeScript compilation failed - test mockTokens missing new auth token properties
- **Fix:** Added AUTH_COGNITO, AUTH_AUTH0, AUTH_SOCIAL_LOGIN, AUTH_MFA to test fixtures
- **Files modified:** src/__tests__/generator/replace-tokens.spec.ts
- **Verification:** tsc --noEmit passes
- **Committed in:** 2c4c4d6 (Task 3 commit)

---

**Total deviations:** 1 auto-fixed (blocking)
**Impact on plan:** Necessary for TypeScript compilation. No scope creep.

## Issues Encountered
None

## Next Phase Readiness
- CognitoStack template ready for generator integration
- byAuthProvider pattern established for Phase 9 (Auth0 templates)
- Generator needs to process {{#if}}/{{/if}} blocks and byAuthProvider entries (Phase 10)

---
*Phase: 08-cognito-templates*
*Completed: 2026-01-17*
