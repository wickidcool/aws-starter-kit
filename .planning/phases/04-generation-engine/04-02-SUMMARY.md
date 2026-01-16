# 04-02 Summary: Project Generation Orchestrator

## Completed
- Created `generate-project.ts` with the main `generateProject()` function
- Function derives token values from ProjectConfig using existing `deriveTokenValues()`
- Copies all shared templates first (root configs, packages, tooling files)
- Filters platform-specific templates based on user's selected platforms
- Handles both files and directories transparently using `copyFileWithTokens()` and `copyDirectoryWithTokens()`
- Warns (doesn't fail) when a template entry is missing
- Updated `generator/index.ts` barrel export to include `generateProject`

## Files Modified
- `packages/create-aws-starter-kit/src/generator/generate-project.ts` (created)
- `packages/create-aws-starter-kit/src/generator/index.ts` (updated)

## Key Decisions
- Used `getTemplatesDir()` to resolve templates relative to dist/src/generator (navigates up to templates/)
- Made `generateProject` async to allow for future expansion (e.g., async file operations)
- Used the existing `Platform` type from templates/types.ts for type safety
- Template entry copying is handled by a private `copyTemplateEntry()` helper that detects whether the source is a file or directory

## Ready For
- CLI integration in 04-03 can now import `generateProject` from `./generator`
- The function accepts `ProjectConfig` and `outputDir` parameters matching the wizard output
- Platform filtering works correctly: selecting `['web']` only copies web app, selecting `['web', 'api', 'mobile']` copies all platform apps
