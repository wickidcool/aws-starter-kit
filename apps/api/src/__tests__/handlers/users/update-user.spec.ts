import { handler } from '../../../handlers/users/update-user';
import { userService } from '../../../services/user-service';
import { HTTP_STATUS, ERROR_CODES } from '@aws-starter-kit/common-types';
import type { ApiGatewayProxyEvent } from '@aws-starter-kit/common-types';

// Mock the userService
jest.mock('../../../services/user-service');

describe('Update User Handler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should update user successfully', async () => {
    const requestBody = {
      name: 'Updated Name',
    };

    const mockUpdatedUser = {
      id: '123',
      email: 'user@example.com',
      name: 'Updated Name',
      createdAt: '2024-01-01',
    };

    const mockEvent = {
      body: JSON.stringify(requestBody),
      pathParameters: { id: '123' },
    } as unknown as ApiGatewayProxyEvent;

    jest.spyOn(userService, 'updateUser').mockResolvedValue(mockUpdatedUser);

    const result = await handler(mockEvent);

    expect(result.statusCode).toBe(HTTP_STATUS.OK);
    const body = JSON.parse(result.body);
    expect(body.success).toBe(true);
    expect(body.data).toEqual(mockUpdatedUser);
    expect(body.message).toBe('User updated successfully');
    expect(userService.updateUser).toHaveBeenCalledWith('123', requestBody);
  });

  it('should return 400 when path parameter id is missing', async () => {
    const requestBody = {
      name: 'Updated Name',
    };

    const mockEvent = {
      body: JSON.stringify(requestBody),
      pathParameters: null,
    } as unknown as ApiGatewayProxyEvent;

    const result = await handler(mockEvent);

    expect(result.statusCode).toBe(HTTP_STATUS.BAD_REQUEST);
    const body = JSON.parse(result.body);
    expect(body.success).toBe(false);
    expect(body.error.code).toBe(ERROR_CODES.VALIDATION_ERROR);
  });

  it('should return 400 when request body is missing', async () => {
    const mockEvent = {
      body: null,
      pathParameters: { id: '123' },
    } as unknown as ApiGatewayProxyEvent;

    const result = await handler(mockEvent);

    expect(result.statusCode).toBe(HTTP_STATUS.BAD_REQUEST);
    const body = JSON.parse(result.body);
    expect(body.success).toBe(false);
    expect(body.error.code).toBe(ERROR_CODES.VALIDATION_ERROR);
  });

  it('should return 400 when name is invalid (empty string)', async () => {
    const requestBody = {
      name: '',
    };

    const mockEvent = {
      body: JSON.stringify(requestBody),
      pathParameters: { id: '123' },
    } as unknown as ApiGatewayProxyEvent;

    const result = await handler(mockEvent);

    expect(result.statusCode).toBe(HTTP_STATUS.BAD_REQUEST);
    const body = JSON.parse(result.body);
    expect(body.success).toBe(false);
    expect(body.error.code).toBe(ERROR_CODES.VALIDATION_ERROR);
    expect(body.error.details?.errors).toBeDefined();
  });

  it('should return 404 when user not found', async () => {
    const requestBody = {
      name: 'Updated Name',
    };

    const mockEvent = {
      body: JSON.stringify(requestBody),
      pathParameters: { id: 'nonexistent' },
    } as unknown as ApiGatewayProxyEvent;

    jest.spyOn(userService, 'updateUser').mockResolvedValue(null);

    const result = await handler(mockEvent);

    expect(result.statusCode).toBe(HTTP_STATUS.NOT_FOUND);
    const body = JSON.parse(result.body);
    expect(body.success).toBe(false);
    expect(body.error.code).toBe(ERROR_CODES.NOT_FOUND);
  });

  it('should handle service errors', async () => {
    const requestBody = {
      name: 'Updated Name',
    };

    const mockEvent = {
      body: JSON.stringify(requestBody),
      pathParameters: { id: '123' },
    } as unknown as ApiGatewayProxyEvent;

    jest.spyOn(userService, 'updateUser').mockRejectedValue(new Error('Database error'));

    const result = await handler(mockEvent);

    expect(result.statusCode).toBe(HTTP_STATUS.INTERNAL_SERVER_ERROR);
    const body = JSON.parse(result.body);
    expect(body.success).toBe(false);
    expect(body.error.code).toBe(ERROR_CODES.INTERNAL_ERROR);
  });
});
