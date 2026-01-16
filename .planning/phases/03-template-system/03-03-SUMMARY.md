---
phase: 03-template-system
plan: 03
subsystem: templates
tags: [template-files, app-templates, web, mobile, api, cdk, manifest]

# Dependency graph
requires:
  - phase: 03-02
    provides: Root configuration templates, shared package templates, .template extension pattern
provides:
  - Web app templates (apps/web) with {{PACKAGE_SCOPE}} tokens
  - Mobile app templates (apps/mobile) with {{PROJECT_NAME}}, {{PACKAGE_SCOPE}} tokens
  - API/CDK templates (apps/api) with {{PROJECT_NAME}}, {{PROJECT_NAME_PASCAL}}, {{PACKAGE_SCOPE}} tokens
  - Template manifest defining shared/platform file mappings
affects: [04-generation-engine]

# Tech tracking
tech-stack:
  added: []
  patterns: [platform-specific templates, template manifest for conditional generation]

key-files:
  created:
    - packages/create-aws-starter-kit/templates/apps/web/ (20 files)
    - packages/create-aws-starter-kit/templates/apps/mobile/ (18 files)
    - packages/create-aws-starter-kit/templates/apps/api/ (32 files)
    - packages/create-aws-starter-kit/templates/manifest.json
  modified:
    - packages/create-aws-starter-kit/src/templates/manifest.ts
    - packages/create-aws-starter-kit/src/templates/index.ts

key-decisions:
  - "Continue .template extension pattern for project.json files in app templates"

patterns-established:
  - "Platform templates organized by app type: apps/web, apps/mobile, apps/api"
  - "Template manifest with shared and byPlatform sections for conditional generation"
  - "Token placeholders for package scope, project name, and pascal case variants"

issues-created: []

# Metrics
duration: ~15min
completed: 2026-01-15
---

# Phase 3 Plan 3: Platform-Specific App Templates Summary

**Template files for web, mobile, and API applications with token placeholders, plus manifest.json for conditional file inclusion during project generation**

## Performance

- **Duration:** ~15 min
- **Started:** 2026-01-15 (continued session)
- **Completed:** 2026-01-15
- **Tasks:** 4
- **Files created:** 70+

## Accomplishments

- Created web app templates with React/Vite configuration and {{PACKAGE_SCOPE}} tokens
- Created mobile app templates with Expo/React Native configuration and {{PROJECT_NAME}} tokens
- Created API/CDK templates with Lambda handlers, DynamoDB models, and {{PROJECT_NAME_PASCAL}} tokens
- Created template manifest defining shared files and platform-specific file mappings

## Task Commits

Each task was committed atomically:

1. **Task 1: Create web app templates** - `bffacbc` (feat)
2. **Task 2: Create mobile app templates** - `5e74bb5` (feat)
3. **Task 3: Create API/infrastructure templates** - `5bb09d2` (feat)
4. **Task 4: Create template manifest** - `2bf490e` (feat)

## Files Created/Modified

### Web App Templates (`templates/apps/web/`)
- `project.json.template` - Nx project configuration
- `vite.config.ts`, `jest.config.ts` - Build and test configuration
- `tsconfig.json`, `tsconfig.app.json`, `tsconfig.spec.json` - TypeScript config
- `src/App.tsx`, `src/main.tsx` - Application entry points
- `src/config/api.ts` - {{PACKAGE_SCOPE}}/api-client import
- `src/store/user-store.ts` - {{PACKAGE_SCOPE}}/common-types import
- `src/__tests__/`, `src/__mocks__/` - Test infrastructure

### Mobile App Templates (`templates/apps/mobile/`)
- `app.json` - Expo config with {{PROJECT_NAME}} for slug/bundle identifiers
- `package.json` - Mobile-specific dependencies
- `project.json.template` - Nx project configuration
- `babel.config.js`, `metro.config.js` - {{PACKAGE_SCOPE}} module aliases
- `src/App.tsx`, `src/config/api.ts`, `src/store/user-store.ts` - Application code
- `src/__tests__/` - Test files

### API/CDK Templates (`templates/apps/api/`)
- `cdk/app.ts` - {{PROJECT_NAME_PASCAL}} stack naming
- `cdk/static-stack.ts` - CloudFront, S3, API Gateway with {{PROJECT_NAME}}
- `cdk/user-stack.ts`, `cdk/deployment-user-stack.ts`, `cdk/org-stack.ts` - Infrastructure stacks
- `src/handlers/users/` - Lambda handlers (5 CRUD operations)
- `src/services/user-service.ts` - Business logic layer
- `src/models/UserModel.ts` - DynamoDB model with {{PROJECT_NAME}}-table default
- `src/lib/dynamo/` - Abstract DynamoDB base class with GSI support
- `src/schemas/`, `src/utils/` - Validation and utilities

### Template Manifest
- `templates/manifest.json` - JSON manifest with shared and byPlatform sections
- `src/templates/manifest.ts` - TypeScript export of templateManifest constant
- `src/templates/index.ts` - Updated to export templateManifest

## Token Replacements Applied

| Token | Usage |
|-------|-------|
| `{{PACKAGE_SCOPE}}` | Import statements: `@aws-starter-kit/*` to `{{PACKAGE_SCOPE}}/*` |
| `{{PROJECT_NAME}}` | Resource names, S3 buckets, Expo slug, bundle IDs |
| `{{PROJECT_NAME_PASCAL}}` | CDK stack names in app.ts |
| `{{PROJECT_NAME_TITLE}}` | Display names in app titles |

## Decisions Made

- Continued using `.template` extension for project.json files to prevent Nx workspace detection
- Included comprehensive DynamoDB model abstraction in API templates for production readiness
- Created both JSON manifest and TypeScript export for flexibility in generation engine

## Deviations from Plan

None. All tasks completed as specified.

## Issues Encountered

None.

## Phase Completion

This completes Phase 03 (Template System). All template files are now in place:
- Root configuration templates (03-02)
- Shared package templates (03-02)
- Tooling templates (03-02)
- Web app templates (03-03)
- Mobile app templates (03-03)
- API/CDK templates (03-03)
- Template manifest (03-03)

## Next Phase Readiness

- All templates ready for Phase 04 (Generation Engine)
- Template manifest defines file mapping for conditional platform generation
- Token patterns established for project name, scope, and case variants
- Ready to implement file copying, token replacement, and platform selection logic

---
*Phase: 03-template-system*
*Completed: 2026-01-15*
