# Coding Conventions

**Analysis Date:** 2026-01-13

## Naming Patterns

**Files:**
- kebab-case for all files: `user-service.ts`, `get-user.ts`, `lambda-handler.ts`
- `.spec.ts` suffix for tests: `get-user.spec.ts`, `user-service.spec.ts`
- `.schema.ts` suffix for validation schemas: `user.schema.ts`
- `index.ts` for barrel exports

**Functions:**
- camelCase for all functions: `getAllUsers()`, `getUserById()`, `createUser()`
- Handler pattern: `{action}{Entity}Handler()` - `getUsersHandler()`, `createUserHandler()`
- No special prefix for async functions

**Variables:**
- camelCase for variables: `userService`, `apiClient`, `parsedRequest`
- UPPER_SNAKE_CASE for constants: `HTTP_STATUS`, `ERROR_CODES`, `DYNAMODB_TABLE`
- Underscore prefix for unused parameters: `_pk1`, `_item` (ESLint configured)

**Types:**
- PascalCase for interfaces, no I prefix: `User`, `UserModel`, `BaseModel`
- PascalCase for type aliases: `CreateUserRequest`, `ApiResponse`
- PascalCase for classes: `UserService`, `UserDynamoModel`, `ApiClient`

## Code Style

**Formatting:**
- 2 space indentation (`.editorconfig`)
- LF line endings (Unix format)
- Final newline required
- Trailing whitespace trimmed (except markdown)

**Linting:**
- ESLint 9 flat config (`eslint.config.js`)
- `@nx/enforce-module-boundaries` - Enforces library boundaries
- `@typescript-eslint/no-explicit-any: warn` - Discourage `any`
- `@typescript-eslint/no-unused-vars: warn` with `argsIgnorePattern: "^_"`

## Import Organization

**Order:**
1. External packages (react, @aws-sdk/*, etc.)
2. Internal monorepo packages (`@aws-starter-kit/*`)
3. Relative imports (../services/, ./utils/)
4. Type imports (`import type { User }`)

**Grouping:**
- Blank line between external and internal imports
- Type imports can be separate or combined

**Path Aliases:**
- `@aws-starter-kit/common-types` - Shared types
- `@aws-starter-kit/api-client` - HTTP client

**Examples:**
```typescript
import type { User, CreateUserRequest } from '@aws-starter-kit/common-types';
import { HTTP_STATUS, ERROR_CODES } from '@aws-starter-kit/common-types';
import { UserDynamoModel } from '../models/UserModel';
import { successResponse } from '../../utils/response';
```

## Error Handling

**Patterns:**
- Throw errors in services, catch in handlers
- Use `createErrorResult()` for validation failures in handlers
- `createLambdaHandler()` wrapper catches all errors

**Error Types:**
- Throw `Error` with descriptive message in services
- Return `ApiGatewayProxyResult` for HTTP error responses
- Custom `ApiError` class in api-client with code, statusCode, details

**Examples:**
```typescript
// Service layer - throw errors
throw new Error(`User with ID ${id} not found`);
throw new Error(`User with email ${email} already exists`);

// Handler layer - use error result
throw createErrorResult(
  ERROR_CODES.VALIDATION_ERROR,
  'Request body is required',
  HTTP_STATUS.BAD_REQUEST
);
```

## Logging

**Framework:**
- Lambda: AWS Lambda Powertools Logger
- Service name, log level, environment configured

**Patterns:**
- Structured logging with context objects
- Log at service boundaries, not in utilities
- Include relevant IDs and action names

**Examples:**
```typescript
this.logger.info('Getting all users');
this.logger.info(`Getting user by ID: ${id}`);
this.logger.error('Error getting user by email', { email, error });
```

## Comments

**When to Comment:**
- Explain why, not what: `// GSI1: For email lookups`
- Document public APIs with JSDoc
- Explain business rules and non-obvious logic

**JSDoc/TSDoc:**
- Required for public API functions and classes
- Use `@param`, `@returns`, `@throws` tags
- Include description of purpose

**Examples:**
```typescript
/**
 * User Service
 * Handles all business logic for user management with DynamoDB backend
 */
export class UserService {
  /**
   * Get all users from the database
   * @returns Promise<User[]> Array of all users
   */
  async getAllUsers(): Promise<User[]> {
```

## Function Design

**Size:**
- Keep functions focused on single responsibility
- Extract helpers for complex logic

**Parameters:**
- Max 3 positional parameters
- Use options object for more: `function create(options: CreateOptions)`
- Destructure in parameter list when needed

**Return Values:**
- Explicit return types on public functions
- Return early for guard clauses
- Use `Promise<T>` for async operations

## Module Design

**Exports:**
- Named exports preferred
- Use `index.ts` for public API
- Keep internal helpers private

**Barrel Files:**
- `index.ts` re-exports public API
- Example: `packages/common-types/src/index.ts`

```typescript
export * from './user.types';
export * from './api.types';
export * from './lambda.types';
export * from './common.types';
```

## TypeScript Specifics

**Strict Mode:**
- `strict: true` enabled in all tsconfig files
- `noImplicitReturns: true`
- `noFallthroughCasesInSwitch: true`

**Type Safety:**
- Avoid `any` - use proper types or `unknown`
- Use generics for reusable patterns: `DynamoModel<T>`
- Import types with `import type` when possible

**Environment Variables:**
- Access via bracket notation: `process.env['DYNAMODB_TABLE']`
- Provide default values: `process.env['AWS_REGION'] || 'us-east-1'`

---

*Convention analysis: 2026-01-13*
*Update when patterns change*
