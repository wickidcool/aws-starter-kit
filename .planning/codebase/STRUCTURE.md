# Codebase Structure

**Analysis Date:** 2026-01-13

## Directory Layout

```
aws-starter-kit/
├── apps/
│   ├── web/                    # React 19 web application
│   ├── mobile/                 # React Native + Expo mobile app
│   └── api/                    # AWS Lambda API + CDK infrastructure
├── packages/
│   ├── common-types/           # Shared TypeScript type definitions
│   └── api-client/             # HTTP client library
├── agents/                     # Claude Code agent role definitions
├── .planning/                  # Project planning documents
│   └── codebase/               # Codebase analysis documents
├── nx.json                     # Nx monorepo configuration
├── tsconfig.base.json          # Root TypeScript config with path aliases
├── package.json                # Root dependencies and npm scripts
├── jest.preset.js              # Jest configuration preset
└── eslint.config.js            # ESLint flat config
```

## Directory Purposes

**apps/web/**
- Purpose: React 19 web application with Chakra UI
- Contains: React components, Zustand store, theme, tests
- Key files:
  - `src/main.tsx` - Entry point (ReactDOM, ChakraProvider)
  - `src/App.tsx` - Root component
  - `src/store/user-store.ts` - Zustand state management
  - `src/config/api.ts` - API client configuration
  - `src/theme/index.ts` - Chakra UI theme (dark mode default)
  - `vite.config.ts` - Vite config (port 3000, API proxy)
- Subdirectories: `src/__tests__/`, `src/__mocks__/`, `public/`

**apps/mobile/**
- Purpose: React Native mobile app with Expo
- Contains: React Native components, Zustand store, tests
- Key files:
  - `src/App.tsx` - Root component
  - `src/store/user-store.ts` - State management
  - `src/config/api.ts` - API client configuration
  - `app.json` - Expo configuration
- Subdirectories: `src/__tests__/`, `assets/`

**apps/api/**
- Purpose: AWS Lambda serverless API and CDK infrastructure
- Contains: Lambda handlers, services, models, utilities, CDK stacks
- Key files:
  - `lambdas.yml` - Lambda function definitions (method, path, memory, timeout)
  - `project.json` - Nx project config
  - `jest.config.ts` - Test configuration (node environment)
- Subdirectories: `src/`, `cdk/`, `cdk-bootstrap/`

**apps/api/src/**
```
handlers/users/         # Lambda entry points
  ├── index.ts         # Barrel exports
  ├── create-user.ts   # POST /users
  ├── get-user.ts      # GET /users/{id}
  ├── get-users.ts     # GET /users
  ├── update-user.ts   # PUT /users/{id}
  └── delete-user.ts   # DELETE /users/{id}
services/              # Business logic layer
  └── user-service.ts  # UserService class (singleton pattern)
models/                # DynamoDB models
  └── UserModel.ts     # UserDynamoModel extending base class
lib/dynamo/            # DynamoDB abstraction
  ├── dynamo-model.ts  # Generic base class (504 lines)
  ├── utils.ts         # GSI utilities
  └── index.ts         # Barrel export
schemas/               # JSON validation schemas
  └── user.schema.ts   # CreateUser, UpdateUser schemas
utils/                 # Response helpers, lambda-handler, validator
  ├── lambda-handler.ts # createLambdaHandler HOF
  ├── response.ts      # successResponse, errorResponse
  ├── validator.ts     # AJV validation
  └── common/helpers.ts
__tests__/             # Test files organized by source structure
  ├── handlers/users/  # Handler tests
  ├── services/        # Service tests
  ├── schemas/         # Schema tests
  └── utils/           # Utility tests
__mocks__/             # Mock implementations
tools/                 # Development tools
  └── db-export/       # DynamoDB export utility
```

**apps/api/cdk/**
- Purpose: AWS CDK infrastructure as code
- Key files:
  - `app.ts` - CDK App entry point
  - `user-stack.ts` - Lambda functions from lambdas.yml, API Gateway integration
  - `static-stack.ts` - S3, CloudFront, API Gateway
  - `deployment-user-stack.ts` - GitHub Actions IAM user
  - `org-stack.ts` - AWS Organizations
  - `cdk.json` - CDK configuration

**packages/common-types/**
- Purpose: Shared TypeScript type definitions
- Key files:
  - `src/user.types.ts` - User, CreateUserRequest, UpdateUserRequest
  - `src/api.types.ts` - ApiResponse, ApiError interfaces
  - `src/lambda.types.ts` - LambdaContext, ApiGatewayProxyEvent/Result
  - `src/common.types.ts` - HTTP_STATUS, ERROR_CODES constants
  - `src/index.ts` - Public API exports

**packages/api-client/**
- Purpose: Type-safe HTTP client for API communication
- Key files:
  - `src/api-client.ts` - ApiClient class with CRUD methods, ApiError
  - `src/config.ts` - createApiClient factory
  - `src/index.ts` - Public API exports
  - `src/__tests__/api-client.spec.ts` - Tests

## Key File Locations

**Entry Points:**
- `apps/web/src/main.tsx` - Web app entry
- `apps/mobile/src/App.tsx` - Mobile app entry
- `apps/api/src/handlers/users/*.ts` - Lambda handlers
- `apps/api/cdk/app.ts` - CDK app entry

**Configuration:**
- `tsconfig.base.json` - TypeScript with path aliases
- `nx.json` - Nx monorepo settings
- `jest.preset.js` - Jest configuration
- `eslint.config.js` - ESLint rules
- `.nvmrc` - Node.js version (22.16.0)
- `.npmrc` - npm settings (legacy-peer-deps)

**Core Logic:**
- `apps/api/src/services/user-service.ts` - Business logic
- `apps/api/src/models/UserModel.ts` - Data model
- `apps/api/src/lib/dynamo/dynamo-model.ts` - DynamoDB abstraction

**Testing:**
- `apps/api/src/__tests__/` - API test files (1482 total lines)
- `apps/web/src/__tests__/` - Web test files
- `apps/mobile/src/__tests__/` - Mobile test files
- `packages/api-client/src/__tests__/` - API client tests

**Documentation:**
- `CLAUDE.md` - Claude Code instructions
- `README.md` - Project overview
- `apps/*/README.md` - App-specific docs

## Naming Conventions

**Files:**
- kebab-case for all files: `user-service.ts`, `get-user.ts`, `user-store.ts`
- `.spec.ts` suffix for tests: `get-user.spec.ts`
- `.schema.ts` suffix for schemas: `user.schema.ts`
- `.types.ts` suffix for type files: `user.types.ts`

**Directories:**
- kebab-case: `common-types/`, `api-client/`, `lib/dynamo/`
- Plural for collections: `handlers/`, `services/`, `models/`
- `__tests__/` for test directories
- `__mocks__/` for mock implementations

**Classes/Types/Interfaces:**
- PascalCase: `UserModel`, `UserDynamoModel`, `UserService`, `DynamoModel<T>`, `ApiClient`

**Functions/Variables:**
- camelCase: `userService`, `apiClient`, `createLambdaHandler()`, `successResponse()`

**Constants:**
- UPPER_SNAKE_CASE: `HTTP_STATUS`, `ERROR_CODES`

**Special Patterns:**
- `index.ts` for barrel exports
- Handler pattern: `{verb}-{noun}.ts` (get-user.ts, create-user.ts)

## Where to Add New Code

**New API Endpoint:**
- Handler: `apps/api/src/handlers/{resource}/{action}.ts`
- Tests: `apps/api/src/__tests__/handlers/{resource}/{action}.spec.ts`
- Add to `apps/api/lambdas.yml`
- Update CDK stack if needed

**New Domain Entity:**
- Types: `packages/common-types/src/{entity}.types.ts`
- Model: `apps/api/src/models/{Entity}Model.ts`
- Service: `apps/api/src/services/{entity}-service.ts`
- Handlers: `apps/api/src/handlers/{entity}/`
- Schema: `apps/api/src/schemas/{entity}.schema.ts`

**New Web Component:**
- Component: `apps/web/src/components/{ComponentName}.tsx`
- Tests: `apps/web/src/__tests__/components/{ComponentName}.spec.tsx`

**Shared Utilities:**
- API utilities: `apps/api/src/utils/`
- Shared types: `packages/common-types/src/`
- API client methods: `packages/api-client/src/api-client.ts`

**New CDK Stack:**
- Implementation: `apps/api/cdk/{name}-stack.ts`
- Register in: `apps/api/cdk/app.ts`

## Special Directories

**.planning/**
- Purpose: GSD planning documents and codebase analysis
- Contains: Roadmaps, phase plans, codebase/ analysis
- Committed: Yes (version-controlled documentation)

**cdk.out/**
- Purpose: Synthesized CloudFormation templates
- Source: Generated by `cdk synth`
- Committed: No (in .gitignore)

**node_modules/**
- Purpose: npm dependencies
- Source: Generated by `npm install`
- Committed: No (in .gitignore)

**dist/, tmp/, coverage/**
- Purpose: Build output and test coverage
- Source: Generated by build/test
- Committed: No (in .gitignore)

---

*Structure analysis: 2026-01-13*
*Update when directory structure changes*
