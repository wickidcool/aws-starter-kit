import { handler } from '../../../handlers/users/delete-user';
import { userService } from '../../../services/user-service';
import { HTTP_STATUS, ERROR_CODES } from '@aws-starter-kit/common-types';
import type { ApiGatewayProxyEvent } from '@aws-starter-kit/common-types';

// Mock the userService
jest.mock('../../../services/user-service');

describe('Delete User Handler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should delete user successfully', async () => {
    const mockEvent = {
      pathParameters: { id: '123' },
    } as unknown as ApiGatewayProxyEvent;

    jest.spyOn(userService, 'deleteUser').mockResolvedValue(true);

    const result = await handler(mockEvent);

    expect(result.statusCode).toBe(HTTP_STATUS.OK);
    const body = JSON.parse(result.body);
    expect(body.success).toBe(true);
    expect(body.data).toBeNull();
    expect(body.message).toBe('User deleted successfully');
    expect(userService.deleteUser).toHaveBeenCalledWith('123');
  });

  it('should return 400 when path parameter id is missing', async () => {
    const mockEvent = {
      pathParameters: null,
    } as unknown as ApiGatewayProxyEvent;

    const result = await handler(mockEvent);

    expect(result.statusCode).toBe(HTTP_STATUS.BAD_REQUEST);
    const body = JSON.parse(result.body);
    expect(body.success).toBe(false);
    expect(body.error.code).toBe(ERROR_CODES.VALIDATION_ERROR);
  });

  it('should return 404 when user not found', async () => {
    const mockEvent = {
      pathParameters: { id: 'nonexistent' },
    } as unknown as ApiGatewayProxyEvent;

    jest.spyOn(userService, 'deleteUser').mockResolvedValue(false);

    const result = await handler(mockEvent);

    expect(result.statusCode).toBe(HTTP_STATUS.NOT_FOUND);
    const body = JSON.parse(result.body);
    expect(body.success).toBe(false);
    expect(body.error.code).toBe(ERROR_CODES.NOT_FOUND);
  });

  it('should handle service errors', async () => {
    const mockEvent = {
      pathParameters: { id: '123' },
    } as unknown as ApiGatewayProxyEvent;

    jest.spyOn(userService, 'deleteUser').mockRejectedValue(new Error('Database error'));

    const result = await handler(mockEvent);

    expect(result.statusCode).toBe(HTTP_STATUS.INTERNAL_SERVER_ERROR);
    const body = JSON.parse(result.body);
    expect(body.success).toBe(false);
    expect(body.error.code).toBe(ERROR_CODES.INTERNAL_ERROR);
  });
});
