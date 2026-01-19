---
phase: 09-auth0-templates
plan: 02
subsystem: auth
tags: [auth0, jose, jwt, jwks, middleware, lambda]

# Dependency graph
requires:
  - phase: 08-cognito-templates
    provides: Middleware pattern and interface design (AuthUser, verifyToken, requireAuth)
provides:
  - Auth0 JWT verification middleware using jose library
  - AuthUser interface for Auth0 tokens
  - verifyToken function with JWKS caching
  - requireAuth wrapper for handler protection
  - jose dependency in root package.json
affects: [09-03-generator-integration, future-auth-handlers]

# Tech tracking
tech-stack:
  added: [jose ^5.2.0]
  patterns: [Auth0 JWKS verification, permissions-based authorization]

key-files:
  created:
    - templates/apps/api/src/middleware/auth0-auth.ts
  modified:
    - templates/root/package.json

key-decisions:
  - "Used jose library directly instead of express-oauth2-jwt-bearer since Lambda handlers don't use Express"
  - "Auth0 uses permissions claim instead of cognito:groups for authorization"

patterns-established:
  - "Auth0 JWKS caching: createRemoteJWKSet outside handler for cross-invocation reuse"
  - "Permissions array: Auth0 returns permissions[] vs Cognito groups[]"

issues-created: []

# Metrics
duration: 1min
completed: 2026-01-19
---

# Phase 09 Plan 02: Lambda Auth0 Middleware Summary

**Auth0 JWT middleware with jose library for JWKS-based token verification, matching Cognito middleware interface**

## Performance

- **Duration:** 1 min
- **Started:** 2026-01-19T00:12:47Z
- **Completed:** 2026-01-19T00:13:55Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments

- Created Auth0 auth middleware with JWT verification using jose library
- Implemented JWKS caching via createRemoteJWKSet for Lambda efficiency
- Added requireAuth wrapper matching Cognito middleware interface
- Added jose dependency to root package.json template

## Task Commits

Each task was committed atomically:

1. **Task 1: Create Auth0 JWT verification middleware** - `b618932` (feat)
2. **Task 2: Add jose dependency to root package.json** - `4fcb99e` (chore)

## Files Created/Modified

- `packages/create-aws-starter-kit/templates/apps/api/src/middleware/auth0-auth.ts` - JWT verification middleware with AuthUser interface, verifyToken function, and requireAuth wrapper using jose
- `packages/create-aws-starter-kit/templates/root/package.json` - Added jose ^5.2.0 dependency

## Decisions Made

- Used jose library directly instead of express-oauth2-jwt-bearer - Lambda handlers don't use Express middleware pattern, and jose is the underlying library that express-oauth2-jwt-bearer uses
- Auth0 middleware uses `permissions` array from JWT (Auth0's RBAC model) instead of `groups` (Cognito's model)

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None

## Next Phase Readiness

- Auth0 middleware templates ready for use
- Ready for Phase 09 Plan 03: Generator integration for auth middleware
- Both Cognito and Auth0 middleware now share same interface pattern (AuthUser, verifyToken, requireAuth)

---
*Phase: 09-auth0-templates*
*Completed: 2026-01-19*
