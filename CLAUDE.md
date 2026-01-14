# Claude Code Agent Rules

## Agent Roles

Agent role definitions are in the [agents/](agents/) directory:

- [Senior Software Developer](agents/senior-software-developer.md) - Full-stack TypeScript development
- [QA Engineer](agents/qa-engineer.md) - Playwright E2E testing

## Project Overview

This is an AWS Starter Kit - a full-stack Nx monorepo with:
- **Web App**: React 19 + Vite + Chakra UI (`apps/web`)
- **Mobile App**: React Native + Expo (`apps/mobile`)
- **API**: AWS Lambda + TypeScript (`apps/api`)
- **Infrastructure**: AWS CDK (`apps/api/infra`)
- **Shared Packages**: `packages/common-types`, `packages/api-client`

## Critical Requirements

### Node Version
- **Required**: Node.js 22.16.0+
- **Warning**: Node 25+ has Jest compatibility issues - avoid

### Package Manager
- Use `npm` (not yarn or pnpm)
- `legacy-peer-deps=true` is set in `.npmrc` for React 19 compatibility

## Task Execution

**Always use Nx CLI** - never run underlying tools directly:

```bash
# Correct
nx build web
nx test api
nx lint common-types
nx run-many -t build -p web,api

# Incorrect
npm run build          # in app directory
jest                   # directly
eslint .               # directly
```

### Common Commands
```bash
npm run web            # Start web dev server
npm run mobile         # Start mobile dev server
npm run build:api      # Build Lambda functions
npm run lint           # Lint all projects
npm run test           # Run all tests
npm run cdk:deploy     # Deploy infrastructure
npm run cdk:diff       # Preview infra changes
```

## Code Style

### File Naming
- **Files/Folders**: kebab-case (`user-store.ts`, `api-client/`)
- **Classes/Types/Interfaces**: PascalCase (`UserModel`, `ApiError`)
- **Functions/Variables**: camelCase (`getUsers`, `isValid`)

### Formatting
- **Indentation**: 2 spaces (all files)
- **Line endings**: LF (Unix)
- **Final newline**: Required
- **Trailing whitespace**: Trim (except markdown)

### TypeScript
- **Strict mode** is enabled - maintain type safety
- Avoid `any` - use proper types or `unknown`
- Unused variables with `_` prefix are allowed
- Use path aliases for monorepo imports:
  ```typescript
  import { User } from '@aws-starter-kit/common-types';
  import { apiClient } from '@aws-starter-kit/api-client';
  ```

## Project Structure Conventions

### API/Backend (`apps/api/src/`)
```
handlers/     # Lambda handler functions
services/     # Business logic layer
models/       # Database models (DynamoDB)
lib/dynamo/   # DynamoDB base classes and utilities
schemas/      # JSON schemas for validation
utils/        # Response helpers, validators
__tests__/    # Test files and mocks
```

### Web/Frontend (`apps/web/src/`)
```
components/   # React components
store/        # Zustand state management
config/       # Configuration
theme/        # Chakra UI theme
__tests__/    # Test files
```

## Testing

- **Framework**: Jest + React Testing Library
- **Location**: Colocate in `__tests__/` folders or use `.spec.ts` suffix
- **Run via Nx**: `nx test [project]`

```bash
nx test api                    # Test API project
nx test web                    # Test web project
nx test api --watch            # Watch mode
nx run-many -t test            # Test all projects
```

## Lambda Development

- Lambda handlers are defined in `apps/api/infra/lambdas.yml`
- CDK automatically bundles from source files
- Handler convention: `src/handlers/{resource}/{action}.handler`

## Infrastructure (CDK)

- All infrastructure changes via AWS CDK
- Environment support: dev, stage, prod
- Preview changes with `npm run cdk:diff` before deploying

## Git Conventions

- **Main branch**: `main`
- **Commit style**: Lowercase, descriptive messages
- Run `nx affected -t lint,test` before committing

## Don't

- Don't bypass Nx for task execution
- Don't use `any` types without justification
- Don't commit `.env` files or secrets
- Don't modify `cdk.out` manually
- Don't install packages without checking React 19 compatibility
