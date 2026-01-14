# Testing Patterns

**Analysis Date:** 2026-01-13

## Test Framework

**Runner:**
- Jest 30.2.0
- Nx Jest preset with ts-jest transformer
- Config: `jest.preset.js` (root), individual `jest.config.ts` per project

**Assertion Library:**
- Jest built-in expect
- @testing-library/jest-dom for DOM matchers (web)
- Matchers: toBe, toEqual, toThrow, toHaveBeenCalledWith

**Run Commands:**
```bash
npm run test                    # Run all tests
npm run test:api                # API tests only
npm run test:web                # Web tests only
npm run test:mobile             # Mobile tests only
npm run test:watch              # Watch mode
npm run test:coverage           # Run with coverage reports
nx test api                     # Test specific project
nx test api --watch             # Watch mode for specific project
```

## Test File Organization

**Location:**
- `__tests__/` directories mirroring source structure
- Naming: `*.spec.ts` suffix

**Structure:**
```
apps/api/src/
├── handlers/users/
│   └── get-user.ts
├── __tests__/
│   └── handlers/users/
│       └── get-user.spec.ts
├── services/
│   └── user-service.ts
├── __tests__/
│   └── services/
│       └── user-service.spec.ts
```

**Test Files Present:**
- `apps/api/src/__tests__/handlers/users/get-user.spec.ts`
- `apps/api/src/__tests__/handlers/users/get-users.spec.ts`
- `apps/api/src/__tests__/handlers/users/create-user.spec.ts`
- `apps/api/src/__tests__/services/user-service.spec.ts`
- `apps/api/src/__tests__/utils/validator.spec.ts`
- `apps/api/src/__tests__/utils/response.spec.ts`
- `apps/api/src/__tests__/utils/lambda-handler.spec.ts`
- `apps/api/src/__tests__/schemas/user.schema.spec.ts`
- `apps/web/src/__tests__/store/user-store.spec.ts`
- `apps/mobile/src/__tests__/store/user-store.spec.ts`

## Test Structure

**Suite Organization:**
```typescript
import { describe, it, expect, beforeEach, jest } from '@jest/globals';

describe('UserService', () => {
  let userService: UserService;

  beforeEach(() => {
    jest.clearAllMocks();
    userService = new UserService();
  });

  describe('getAllUsers', () => {
    it('should return all users', async () => {
      // arrange
      const mockUsers = [createMockUserModel()];
      jest.spyOn(userModel, 'scanAll').mockResolvedValue(mockUsers);

      // act
      const result = await userService.getAllUsers();

      // assert
      expect(result).toHaveLength(1);
      expect(userModel.scanAll).toHaveBeenCalled();
    });

    it('should throw on database error', async () => {
      jest.spyOn(userModel, 'scanAll').mockRejectedValue(new Error('DB error'));

      await expect(userService.getAllUsers()).rejects.toThrow('DB error');
    });
  });
});
```

**Patterns:**
- Use `beforeEach` for per-test setup
- Call `jest.clearAllMocks()` to reset mock state
- Arrange/Act/Assert pattern for test body
- One assertion focus per test (multiple expects OK)

## Mocking

**Framework:**
- Jest built-in mocking
- `jest.mock()` for module mocking
- `jest.spyOn()` for method mocking

**Patterns:**
```typescript
// Mock module at top of test file
jest.mock('../../services/user-service');

// Spy on specific method
jest.spyOn(userService, 'getUserById').mockResolvedValue(mockUser);
jest.spyOn(userService, 'getUserById').mockRejectedValue(new Error('Not found'));

// Verify mock calls
expect(userService.getUserById).toHaveBeenCalledWith('123');
expect(userService.getUserById).toHaveBeenCalledTimes(1);
```

**What to Mock:**
- Database operations (DynamoDB model methods)
- External service calls
- Environment variables (via setup files)

**What NOT to Mock:**
- Pure functions and utilities
- TypeScript types
- Internal business logic

**Mock Locations:**
- `apps/api/src/__mocks__/@aws-lambda-powertools/logger.ts`
- `apps/web/src/__mocks__/config/api.ts`

## Fixtures and Factories

**Test Data:**
```typescript
// Factory function pattern
const createMockUserModel = (data?: Partial<UserModel>): UserModel => ({
  id: data?.id || 'USER#test-id',
  email: data?.email || 'test@example.com',
  name: data?.name || 'Test User',
  createdAt: data?.createdAt || '2024-01-01T00:00:00.000Z',
  ...data,
});

const createExpectedUser = (data?: Partial<User>): User => ({
  id: data?.id || 'test-id',
  email: data?.email || 'test@example.com',
  name: data?.name || 'Test User',
  createdAt: data?.createdAt || '2024-01-01T00:00:00.000Z',
  ...data,
});
```

**Location:**
- Factory functions defined in test files near usage
- Shared fixtures in `__tests__/` or `__mocks__/` directories

## Coverage

**Requirements:**
- No enforced coverage target
- Coverage tracked for awareness
- Focus on critical paths (handlers, services)

**Configuration:**
- Vitest coverage via c8 (built-in)
- Reporters: `html`, `text`, `json`, `json-summary`
- Output: `coverage/apps/{project}/`

**Exclusions (API):**
- DynamoDB base model classes (integration test responsibility)
- CDK infrastructure code

**View Coverage:**
```bash
npm run test:coverage
open coverage/apps/api/index.html
open coverage/apps/web/index.html
```

## Test Types

**Unit Tests:**
- Test single function/class in isolation
- Mock all external dependencies
- Fast execution (<100ms per test)
- Files: `apps/api/src/__tests__/utils/*.spec.ts`

**Service Tests:**
- Test business logic with mocked data layer
- Mock DynamoDB model, verify service behavior
- Files: `apps/api/src/__tests__/services/*.spec.ts`

**Handler Tests:**
- Test Lambda handlers with mocked services
- Verify request parsing, validation, response format
- Files: `apps/api/src/__tests__/handlers/**/*.spec.ts`

**Store Tests:**
- Test Zustand store state and actions
- Reset state before each test
- Files: `apps/web/src/__tests__/store/*.spec.ts`

## Common Patterns

**Async Testing:**
```typescript
it('should handle async operation', async () => {
  const result = await asyncFunction();
  expect(result).toBe('expected');
});
```

**Error Testing:**
```typescript
it('should throw on invalid input', () => {
  expect(() => parse(null)).toThrow('Cannot parse null');
});

// Async error
it('should reject on not found', async () => {
  await expect(getUser('invalid')).rejects.toThrow('Not found');
});
```

**Response Structure Testing:**
```typescript
it('should return success response', async () => {
  const result = await handler(event);

  expect(result.statusCode).toBe(200);
  const body = JSON.parse(result.body);
  expect(body.success).toBe(true);
  expect(body.data).toEqual(expectedData);
});
```

**Zustand Store Testing:**
```typescript
describe('useUserStore', () => {
  beforeEach(() => {
    useUserStore.setState({
      user: null,
      users: [],
      isLoading: false,
      error: null,
    });
  });

  it('should set users', () => {
    const users = [createMockUser()];
    useUserStore.getState().setUsers(users);
    expect(useUserStore.getState().users).toEqual(users);
  });
});
```

## Test Setup

**API Setup (`apps/api/src/__tests__/setup.ts`):**
```typescript
process.env['DYNAMODB_TABLE'] = 'test-table';
process.env['AWS_REGION'] = 'us-east-1';
process.env['SERVICE_NAME'] = 'test-service';
process.env['LOG_LEVEL'] = 'silent';
process.env['NODE_ENV'] = 'test';
```

**Web Setup (`apps/web/src/test-setup.ts`):**
```typescript
import '@testing-library/jest-dom';
```

## Jest Configuration

**API (`apps/api/jest.config.ts`):**
- `testEnvironment: 'node'`
- `maxWorkers: 1` (Node.js 25+ localStorage workaround)
- `workerIdleMemoryLimit: '512MB'`
- `clearMocks: true, resetMocks: true, restoreMocks: true`

**Web (`apps/web/jest.config.ts`):**
- `testEnvironment: 'jsdom'`
- Module name mapper for path aliases
- Setup files for @testing-library/jest-dom

---

*Testing analysis: 2026-01-13*
*Update when test patterns change*
