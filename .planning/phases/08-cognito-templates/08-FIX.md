---
phase: 08-cognito-templates
plan: FIX
type: fix
wave: 1
depends_on: []
files_modified:
  - packages/create-aws-starter-kit/project.json
autonomous: true
---

<objective>
Fix 1 UAT issue from Phase 8: templates not copied to dist during build.

Source: 08-ISSUES.md
Priority: 0 critical, 1 major, 0 minor
</objective>

<execution_context>
@~/.claude/get-shit-done/workflows/execute-plan.md
@~/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/STATE.md
@.planning/ROADMAP.md

**Issues being fixed:**
@.planning/phases/08-cognito-templates/08-ISSUES.md

**Files to understand:**
@packages/create-aws-starter-kit/project.json
@packages/create-aws-starter-kit/src/generator/generate-project.ts
</context>

<tasks>

<task type="auto">
  <name>Task 1: Add assets configuration to build target</name>
  <files>packages/create-aws-starter-kit/project.json</files>
  <action>
Update the build target in project.json to copy the templates directory to dist.

The @nx/js:tsc executor supports an `assets` option to copy non-TypeScript files.

Add assets configuration to copy templates:

```json
{
  "targets": {
    "build": {
      "executor": "@nx/js:tsc",
      "outputs": ["{projectRoot}/dist"],
      "options": {
        "outputPath": "packages/create-aws-starter-kit/dist",
        "main": "packages/create-aws-starter-kit/src/index.ts",
        "tsConfig": "packages/create-aws-starter-kit/tsconfig.json",
        "assets": [
          {
            "input": "packages/create-aws-starter-kit/templates",
            "glob": "**/*",
            "output": "templates"
          }
        ]
      }
    }
  }
}
```

This will copy all files from templates/ to dist/templates/, which is where getTemplatesDir() expects them (navigating from dist/src/generator up to dist/templates).
  </action>
  <verify>nx build create-aws-starter-kit && ls packages/create-aws-starter-kit/dist/templates/</verify>
  <done>Templates directory exists in dist after build.</done>
</task>

<task type="auto">
  <name>Task 2: Verify generator works with dist</name>
  <files></files>
  <action>
Run the generator programmatically using the built dist to confirm templates are found:

1. Build: `nx build create-aws-starter-kit`
2. Check templates exist: `ls packages/create-aws-starter-kit/dist/templates/`
3. Run a test generation and verify no "Template not found" warnings appear

If issues remain, check the path resolution in getTemplatesDir() - it should resolve to dist/templates from dist/src/generator.
  </action>
  <verify>No "Template not found" warnings during generation</verify>
  <done>Generator finds templates when run from dist output.</done>
</task>

</tasks>

<verification>
Before declaring plan complete:
- [ ] `nx build create-aws-starter-kit` succeeds
- [ ] `ls packages/create-aws-starter-kit/dist/templates/` shows template files
- [ ] Generator can find templates when run from dist
- [ ] No "Template not found" warnings during generation
</verification>

<success_criteria>
- UAT-001 from 08-ISSUES.md addressed
- Templates copied to dist during build
- Generator works end-to-end from built dist
</success_criteria>

<output>
After completion, create `.planning/phases/08-cognito-templates/08-FIX-SUMMARY.md`
</output>
