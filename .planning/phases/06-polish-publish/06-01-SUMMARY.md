---
phase: 06-polish-publish
plan: 01
subsystem: testing
tags: [jest, ts-jest, esm, unit-testing, cli]

# Dependency graph
requires:
  - phase: 04-generation-engine
    provides: generator modules (replace-tokens, copy-file)
  - phase: 02-interactive-wizard
    provides: wizard module and prompts
provides:
  - Jest test configuration for CLI package
  - Unit tests for validation, token replacement, and wizard
affects: [npm-publish, ci-cd]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - ESM Jest configuration with ts-jest
    - Mock patterns for prompts library
    - Template directory exclusion from test discovery

key-files:
  created:
    - packages/create-aws-starter-kit/jest.config.ts
    - packages/create-aws-starter-kit/tsconfig.spec.json
    - packages/create-aws-starter-kit/src/__tests__/validation/project-name.spec.ts
    - packages/create-aws-starter-kit/src/__tests__/generator/replace-tokens.spec.ts
    - packages/create-aws-starter-kit/src/__tests__/wizard.spec.ts
  modified: []

key-decisions:
  - "Exclude templates/ from test discovery since template files contain unprocessed tokens"
  - "Suppress ts-jest warning 151002 for hybrid module mode instead of setting isolatedModules"
  - "Mock prompts and picocolors to isolate wizard logic from interactive dependencies"

patterns-established:
  - "ESM imports with .js extension in test files"
  - "Jest mocking pattern for prompts library"

issues-created: []

# Metrics
duration: 8min
completed: 2026-01-16
---

# Phase 6 Plan 01: CLI Tests Summary

**Jest test suite with 35 tests covering validation, token replacement, and wizard orchestration using ESM configuration**

## Performance

- **Duration:** 8 min
- **Started:** 2026-01-16T03:26:00Z
- **Completed:** 2026-01-16T03:34:05Z
- **Tasks:** 3
- **Files created:** 5

## Accomplishments

- Configured Jest for CLI package with full ESM support (useESM, moduleNameMapper for .js imports)
- Created comprehensive test coverage for validateProjectName function (valid/invalid npm names)
- Created comprehensive test coverage for replaceTokens function (single/multiple/unknown tokens)
- Created wizard integration tests mocking prompts library for full control over user input

## Task Commits

Each task was committed atomically:

1. **Task 1: Configure Jest for CLI package** - `68f05a9` (chore)
2. **Task 2: Write validation and token tests** - `32e610b` (test)
3. **Task 3: Write wizard integration test** - `2bb1de6` (test)

## Files Created/Modified

- `packages/create-aws-starter-kit/jest.config.ts` - Jest configuration with ESM support
- `packages/create-aws-starter-kit/tsconfig.spec.json` - TypeScript config for test compilation
- `packages/create-aws-starter-kit/src/__tests__/validation/project-name.spec.ts` - Project name validation tests
- `packages/create-aws-starter-kit/src/__tests__/generator/replace-tokens.spec.ts` - Token replacement tests
- `packages/create-aws-starter-kit/src/__tests__/wizard.spec.ts` - Wizard orchestration tests

## Decisions Made

| Decision | Rationale |
|----------|-----------|
| Exclude templates/ from test discovery | Template files contain `{{TOKEN}}` placeholders that cause TypeScript errors when parsed as test files |
| Suppress ts-jest warning via diagnostics.ignoreCodes | Adding isolatedModules broke ESM import handling; warning suppression maintains working configuration |
| Mock both prompts and picocolors | Required to isolate wizard logic and control prompt responses for deterministic testing |

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

- **Template files in test discovery:** Initially Jest tried to parse template files containing tokens as tests, causing TypeScript errors. Resolved by adding `/templates/` to testPathIgnorePatterns.
- **ts-jest hybrid module warning:** NodeNext module resolution triggered repeated warnings. Resolved by suppressing warning code 151002 instead of changing tsconfig.
- **prompts mock type mismatch:** Initial mock implementation had TypeScript errors due to prompts library's complex type signature. Resolved by casting the mock implementation.

## Next Phase Readiness

- All 35 tests passing via `nx test create-aws-starter-kit`
- No TypeScript errors in test files
- Test infrastructure ready for additional coverage as CLI evolves

---
*Phase: 06-polish-publish*
*Completed: 2026-01-16*
