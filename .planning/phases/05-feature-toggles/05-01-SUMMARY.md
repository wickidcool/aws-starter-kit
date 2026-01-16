# 05-01 Summary: Feature Toggle Prompts

## Completed

- Extended `ProjectConfig` interface with `features` array property
- Created `Feature` type with values `'github-actions' | 'vscode-config'`
- Created `featuresPrompt` multiselect prompt with both features selected by default
- Integrated features prompt into wizard flow between platforms and AWS region
- Added handling for empty features array (all features deselected)

## Files Modified

- `packages/create-aws-starter-kit/src/types.ts` - Added Feature type and features property
- `packages/create-aws-starter-kit/src/prompts/features.ts` - New multiselect prompt
- `packages/create-aws-starter-kit/src/wizard.ts` - Integrated features prompt

## Key Decisions

- Features placed after platforms, before AWS region in wizard flow (group related choices)
- Both features selected by default since most projects want CI/CD and editor config
- No minimum required (unlike platforms) - all features can be deselected
- Empty array default when features undefined ensures type safety

## Ready For

- 05-02: Conditional template generation based on feature selections
- Generation engine can now check `config.features.includes('github-actions')` etc.
