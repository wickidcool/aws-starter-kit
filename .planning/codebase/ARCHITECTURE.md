# Architecture

**Analysis Date:** 2026-01-13

## Pattern Overview

**Overall:** Nx Monorepo with Layered Architecture (3-tier distributed)

**Key Characteristics:**
- Presentation Layer: React Web (Vite) + React Native Mobile (Expo)
- API Layer: AWS Lambda Functions (Node.js 20)
- Data Layer: DynamoDB with GSI-based querying
- Shared Layer: TypeScript type definitions and API client library

## Layers

**Presentation Layer:**
- Purpose: User interface and state management
- Contains: React components, Zustand stores, theme configuration
- Location: `apps/web/src/`, `apps/mobile/src/`
- Depends on: `@aws-starter-kit/api-client`, `@aws-starter-kit/common-types`
- Used by: End users

**Handler Layer (Lambda):**
- Purpose: HTTP request handling, validation, routing
- Contains: Lambda handler functions, request parsing, response formatting
- Location: `apps/api/src/handlers/users/`
- Depends on: Service layer, validation schemas
- Used by: API Gateway

**Service Layer:**
- Purpose: Business logic and domain operations
- Contains: UserService class with CRUD operations
- Location: `apps/api/src/services/user-service.ts`
- Depends on: Model layer
- Used by: Handler layer

**Model Layer:**
- Purpose: Data access and DynamoDB operations
- Contains: UserDynamoModel extending DynamoModel base
- Location: `apps/api/src/models/UserModel.ts`
- Depends on: DynamoDB base abstraction
- Used by: Service layer

**DynamoDB Abstraction Layer:**
- Purpose: Generic DynamoDB CRUD operations with GSI support
- Contains: DynamoModel<T> abstract base class, utilities
- Location: `apps/api/src/lib/dynamo/`
- Depends on: AWS SDK v3
- Used by: Model classes

**Shared Libraries:**
- Purpose: Cross-cutting type definitions and API client
- Contains: TypeScript interfaces, constants, HTTP client
- Location: `packages/common-types/`, `packages/api-client/`
- Depends on: None (foundational)
- Used by: All layers

## Data Flow

**HTTP Request Lifecycle:**

1. User clicks button in `apps/web/src/App.tsx`
2. Component calls `apiClient.getUsers()` from `packages/api-client/`
3. Axios HTTP request sent to CloudFront CDN
4. CloudFront routes `/api/*` to API Gateway
5. API Gateway invokes Lambda handler (`apps/api/src/handlers/users/get-users.ts`)
6. `createLambdaHandler()` wrapper parses event to `ParsedRequest<T>`
7. Handler validates request, calls `userService.getAllUsers()`
8. UserService calls `UserDynamoModel.scanAll()`
9. DynamoModel executes AWS SDK Scan command
10. Data marshalled, GSI fields removed, returned up stack
11. Handler returns `successResponse(users)`
12. API Client parses `ApiResponse<User[]>`
13. Zustand store updated via `useUserStore().setUsers()`
14. React component re-renders with new data

**State Management:**
- Web: Zustand store (`apps/web/src/store/user-store.ts`)
- Mobile: Zustand store (`apps/mobile/src/store/user-store.ts`)
- API: Stateless Lambda handlers
- Database: DynamoDB with single-table design

## Key Abstractions

**DynamoModel<T>:**
- Purpose: Generic abstract base for all DynamoDB models
- Location: `apps/api/src/lib/dynamo/dynamo-model.ts`
- Pattern: Template Method - subclasses implement `getEntityName()`, `generateId()`, `setGSIKeys()`
- Methods: `getById()`, `create()`, `update()`, `delete()`, `scanAll()`, `queryByGSI()`, `batchDelete()`
- Supports: Up to 6 GSI (pk1-pk6, sk1-sk6)

**createLambdaHandler():**
- Purpose: Standardize Lambda handler structure
- Location: `apps/api/src/utils/lambda-handler.ts`
- Pattern: Higher-order function wrapping business logic
- Provides: Request parsing, error handling, logging
- Usage: `export const handler = createLambdaHandler(handlerFn, 'HandlerName')`

**ApiClient:**
- Purpose: Type-safe HTTP client for API communication
- Location: `packages/api-client/src/api-client.ts`
- Pattern: Factory with method-per-endpoint
- Methods: `getUsers()`, `getUser()`, `createUser()`, `updateUser()`, `deleteUser()`
- Error handling: Custom `ApiError` class with statusCode, code, details

**Zustand Store:**
- Purpose: Centralized state management
- Location: `apps/web/src/store/user-store.ts`, `apps/mobile/src/store/user-store.ts`
- Pattern: Flux-inspired with actions
- State: `user`, `users`, `isLoading`, `error`
- Actions: `setUser()`, `addUser()`, `updateUser()`, `removeUser()`

## Entry Points

**Web Application:**
- Location: `apps/web/src/main.tsx`
- Triggers: Browser navigation
- Responsibilities: Mount React app in ChakraProvider

**Mobile Application:**
- Location: `apps/mobile/src/App.tsx`
- Triggers: Expo app launch
- Responsibilities: Root React Native component

**Lambda Handlers:**
- Location: `apps/api/src/handlers/users/*.ts`
  - `create-user.ts` -> POST /users
  - `get-user.ts` -> GET /users/{id}
  - `get-users.ts` -> GET /users
  - `update-user.ts` -> PUT /users/{id}
  - `delete-user.ts` -> DELETE /users/{id}
- Triggers: API Gateway HTTP events
- Responsibilities: Request handling, validation, response

**CDK App:**
- Location: `apps/api/cdk/app.ts`
- Triggers: `cdk deploy` command
- Responsibilities: Infrastructure synthesis and deployment

## Error Handling

**Strategy:** Throw errors, catch at boundaries (handlers), return standardized responses

**Patterns:**
- Services throw `Error` with descriptive messages
- Handlers use `createErrorResult()` for validation failures
- `createLambdaHandler()` catches all errors, returns `errorResponse()`
- API Client throws `ApiError` with code, statusCode, details

**Error Types:**
- `ERROR_CODES.VALIDATION_ERROR` - Bad input (400)
- `ERROR_CODES.NOT_FOUND` - Resource missing (404)
- `ERROR_CODES.UNAUTHORIZED` - Auth failure (401)
- `ERROR_CODES.INTERNAL_ERROR` - Server error (500)

## Cross-Cutting Concerns

**Logging:**
- Lambda: AWS Lambda Powertools Logger available (`apps/api/src/lib/dynamo/dynamo-model.ts`)
- Currently: console.log in handlers (should migrate to logger)
- Web/Mobile: Console (development only)

**Validation:**
- AJV schemas at API boundary (`apps/api/src/schemas/`)
- Type guards via `validate()` function (`apps/api/src/utils/validator.ts`)
- Helpers: `validateBodyPresent()`, `validatePathParameters()`

**CORS:**
- Default headers in `apps/api/src/utils/response.ts`
- Currently: Allow all origins (*) - should restrict for production

**Authentication:**
- Not implemented (starter kit design - all endpoints public)

---

*Architecture analysis: 2026-01-13*
*Update when major patterns change*
