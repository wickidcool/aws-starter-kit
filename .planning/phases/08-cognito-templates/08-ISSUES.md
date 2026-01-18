# UAT Issues: Phase 8 Cognito Templates

**Tested:** 2026-01-18
**Source:** .planning/phases/08-cognito-templates/*-SUMMARY.md
**Tester:** User via /gsd:verify-work

## Open Issues

[None]

## Resolved Issues

### UAT-001: Templates not copied to dist during build

**Discovered:** 2026-01-18
**Resolved:** 2026-01-18 (08-FIX plan)
**Phase/Plan:** 08 (affects all plans)
**Severity:** Major
**Feature:** Generator E2E execution
**Description:** When running the generator from compiled dist, templates are not found because they aren't copied to the dist directory during build.
**Expected:** `nx build create-aws-starter-kit` should copy templates/ to dist/templates/
**Actual:** Only TypeScript is compiled to dist/src/, templates/ directory is missing

**Resolution:**
- Added assets configuration to project.json build target
- Added dist exclusion to Jest testPathIgnorePatterns
- Commits: b94feac, bf5faec

---

*Phase: 08-cognito-templates*
*Tested: 2026-01-18*
