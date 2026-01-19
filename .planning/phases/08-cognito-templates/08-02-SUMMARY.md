---
phase: 08-cognito-templates
plan: 02
subsystem: auth
tags: [cognito, jwt, aws-jwt-verify, middleware, lambda]

# Dependency graph
requires:
  - phase: 07-auth-wizard-types
    provides: ProjectConfig auth types and wizard prompts
provides:
  - Cognito JWT verification middleware
  - Auth context utilities for handlers
  - aws-jwt-verify dependency
affects: [08-03-auth0-templates, 08-04-cognito-cdk, future-auth-handlers]

# Tech tracking
tech-stack:
  added: [aws-jwt-verify ^4.0.0]
  patterns: [middleware wrapper pattern for auth, verifier singleton for JWKS caching]

key-files:
  created:
    - templates/apps/api/src/middleware/cognito-auth.ts
    - templates/apps/api/src/utils/auth-context.ts
  modified:
    - templates/root/package.json

key-decisions:
  - "Added aws-jwt-verify to root package.json instead of API-specific package.json to follow existing monorepo dependency pattern"

patterns-established:
  - "requireAuth wrapper: middleware pattern for protecting Lambda handlers"
  - "Verifier singleton: instantiate CognitoJwtVerifier outside handler for JWKS caching"

issues-created: []

# Metrics
duration: 2min
completed: 2026-01-17
---

# Phase 08 Plan 02: Lambda Auth Middleware Summary

**Cognito JWT middleware with verifyToken function, requireAuth wrapper, and auth context utilities using aws-jwt-verify library**

## Performance

- **Duration:** 2 min
- **Started:** 2026-01-17T21:36:02Z
- **Completed:** 2026-01-17T21:38:12Z
- **Tasks:** 3
- **Files modified:** 3

## Accomplishments
- Created Cognito auth middleware with JWT token verification using aws-jwt-verify
- Implemented requireAuth wrapper for easy handler protection
- Added auth context utilities for group membership and resource ownership checks
- Added aws-jwt-verify dependency to root package.json template

## Task Commits

Each task was committed atomically:

1. **Task 1: Create Cognito auth middleware template** - `b4cba73` (feat)
2. **Task 2: Create auth context utility** - `43278c4` (feat)
3. **Task 3: Update API package.json with aws-jwt-verify dependency** - `def0f84` (chore)

## Files Created/Modified

- `packages/create-aws-starter-kit/templates/apps/api/src/middleware/cognito-auth.ts` - JWT verification middleware with AuthUser interface, verifyToken function, and requireAuth wrapper
- `packages/create-aws-starter-kit/templates/apps/api/src/utils/auth-context.ts` - Helper utilities: getAuthUserFromContext, hasGroup, isOwner
- `packages/create-aws-starter-kit/templates/root/package.json` - Added aws-jwt-verify ^4.0.0 dependency

## Decisions Made

- Added aws-jwt-verify to root package.json (not API-specific package.json) following the existing monorepo pattern where Lambda dependencies are in root

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] API package.json did not exist**
- **Found during:** Task 3
- **Issue:** Plan specified updating `templates/apps/api/package.json` but this file didn't exist
- **Fix:** Added dependency to `templates/root/package.json` following existing monorepo pattern where Lambda dependencies (aws-lambda-powertools, dynamodb SDK) are stored
- **Rationale:** Monorepo pattern uses hoisted dependencies; all other Lambda deps are in root
- **Verification:** JSON validates, grep confirms dependency present

---

**Total deviations:** 1 auto-fixed (blocking)
**Impact on plan:** Minor adjustment to follow existing dependency patterns. No scope creep.

## Issues Encountered

None

## Next Phase Readiness

- Cognito middleware templates ready for use
- Ready for Phase 08 Plan 03: Auth0 JWT middleware templates
- Future CDK Cognito stack can reference these middleware patterns

---
*Phase: 08-cognito-templates*
*Completed: 2026-01-17*
