# Codebase Concerns

**Analysis Date:** 2026-01-13

## Tech Debt

**Missing Test Coverage for Handlers:**
- Issue: Only 3 of 5 user handlers have test files
- Files missing tests:
  - `apps/api/src/handlers/users/update-user.ts` - No spec file
  - `apps/api/src/handlers/users/delete-user.ts` - No spec file
- Why: Incremental development without full test coverage
- Impact: Update and delete operations not verified at handler level
- Fix approach: Add `apps/api/src/__tests__/handlers/users/update-user.spec.ts` and `delete-user.spec.ts`

**Duplicate Zustand Store Implementations:**
- Issue: Nearly identical store code in web and mobile apps
- Files:
  - `apps/web/src/store/user-store.ts`
  - `apps/mobile/src/store/user-store.ts`
- Why: Copy-paste for quick implementation
- Impact: Changes need to be made in two places
- Fix approach: Create `packages/user-store` to share state logic

**Console Logging in Lambda Handler:**
- Issue: Raw console.log instead of structured logging
- File: `apps/api/src/utils/lambda-handler.ts` (lines 105, 110, 121)
- Why: Quick implementation, AWS Lambda Powertools Logger available but not used
- Impact: Unstructured logs in CloudWatch, harder to filter
- Fix approach: Replace with Logger instance from `@aws-lambda-powertools/logger`

## Known Bugs

**None identified during analysis**

## Security Considerations

**CORS Wildcard Configuration:**
- Risk: `Access-Control-Allow-Origin: '*'` allows requests from any origin
- File: `apps/api/src/utils/response.ts` (lines 9-11)
- Current mitigation: None - all origins allowed
- Recommendations: Restrict to specific domains via environment variable:
  ```typescript
  'Access-Control-Allow-Origin': process.env['ALLOWED_ORIGINS'] || 'https://yourdomain.com'
  ```

**No Authentication Layer:**
- Risk: All API endpoints are publicly accessible
- Current mitigation: None - starter kit design
- Recommendations: Add authentication (Cognito, Auth0, or custom JWT)

## Performance Bottlenecks

**DynamoDB Table Scans:**
- Problem: Full table scans for user operations
- Files:
  - `apps/api/src/services/user-service.ts` (line 19): `getAllUsers()` uses `scanAll()`
  - `apps/api/src/services/user-service.ts` (line 94): `getUserCount()` scans all users to count
- Measurement: Linear time complexity with table size
- Cause: No pagination, loads entire table into memory
- Improvement path:
  - Add pagination parameters to `scanAll()` and `getAllUsers()`
  - Replace `getUserCount()` with DynamoDB item count or separate counter

**No Pagination Support:**
- Problem: API endpoints return all records
- File: `apps/api/src/handlers/users/get-users.ts` - No limit/offset parameters
- Measurement: Response time and memory increase linearly with data
- Cause: Pagination not implemented
- Improvement path: Add `limit`, `cursor`, or `offset` query parameters

## Fragile Areas

**DynamoDB Abstraction Layer:**
- File: `apps/api/src/lib/dynamo/dynamo-model.ts` (504 lines)
- Why fragile: Complex generic base class with many responsibilities
- Common failures: GSI key configuration errors, marshalling issues
- Safe modification: Add tests before changing, document GSI patterns
- Test coverage: Base class excluded from coverage (integration test responsibility)

## Scaling Limits

**DynamoDB Scan Operations:**
- Current capacity: Works for small datasets (<1000 items)
- Limit: DynamoDB Scan returns max 1MB per call, memory exhaustion on large tables
- Symptoms at limit: Timeouts, Lambda memory errors
- Scaling path: Implement pagination, use Query instead of Scan where possible

**Lambda Memory:**
- Current setting: 256MB per function (`apps/api/lambdas.yml`)
- Limit: May exhaust memory with large response payloads
- Scaling path: Increase memory or implement streaming responses

## Dependencies at Risk

**Node.js Version Constraints:**
- Risk: Node 25+ has Jest compatibility issues (per CLAUDE.md)
- File: `package.json` engines field specifies `>=22.0.0`
- Impact: Test suite may fail on newer Node versions
- Migration plan: Update engines to `>=22.0.0 <25.0.0` or wait for Jest fix

**React 19 Compatibility:**
- Risk: Some npm packages not yet compatible with React 19
- File: `.npmrc` has `legacy-peer-deps=true` to work around conflicts
- Impact: Dependency conflicts when adding new packages
- Migration plan: Monitor package updates, remove flag when ecosystem catches up

## Missing Critical Features

**Authentication/Authorization:**
- Problem: No auth layer for API
- Current workaround: None - all endpoints public
- Blocks: Cannot secure user data, no multi-user support
- Implementation complexity: Medium (Cognito integration or custom JWT)

**Pagination:**
- Problem: No pagination for list endpoints
- Current workaround: None
- Blocks: Cannot handle large datasets efficiently
- Implementation complexity: Low (add query params and DynamoDB pagination)

**Environment Variable Documentation:**
- Problem: No `.env.example` files
- Files affected:
  - `apps/web/.env` exists but no example template
  - `apps/mobile/.env` exists but no example template
  - `apps/api/` relies on CDK-injected env vars
- Current workaround: Check `packages/api-client/DOTENV_CONFIGURATION.md`
- Blocks: Difficult onboarding for new developers
- Implementation complexity: Low (copy .env files, remove secrets)

## Test Coverage Gaps

**Handler Tests:**
- What's not tested: Update and delete user handlers
- Files:
  - `apps/api/src/handlers/users/update-user.ts` - No test
  - `apps/api/src/handlers/users/delete-user.ts` - No test
- Risk: Mutations may break without detection
- Priority: High
- Difficulty to test: Low - follow existing handler test patterns

**DynamoDB Base Class:**
- What's not tested: `apps/api/src/lib/dynamo/dynamo-model.ts`
- Risk: Core data operations could break
- Priority: Medium
- Difficulty to test: Medium - requires DynamoDB mocking or LocalStack

## Type Safety Issues

**Any Types in Non-Test Code:**
- File: `apps/api/src/tools/db-export/index.ts` (lines 298, 477)
- Usage: `catch (error: any)` and `extractEntityType(item: any)`
- Impact: Bypasses TypeScript type safety
- Fix: Change to `unknown` with proper type guards

---

## Priority Summary

| Priority | Issue | Effort |
|----------|-------|--------|
| HIGH | Add delete/update handler tests | Low |
| HIGH | Fix CORS wildcard | Low |
| MEDIUM | Add pagination | Medium |
| MEDIUM | Create shared user-store package | Low |
| MEDIUM | Add .env.example files | Low |
| LOW | Replace console.log with logger | Low |
| LOW | Fix any types in db-export | Low |

---

*Concerns audit: 2026-01-13*
*Update as issues are fixed or new ones discovered*
