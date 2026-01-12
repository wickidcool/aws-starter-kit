/**
 * Mock for UserDynamoModel
 * Used in tests to avoid DynamoDB dependencies
 */
import type { BaseModel } from '@aws-starter-kit/dynamo-client';

// This file is only used in test environments where jest is available
declare const jest: { fn: () => unknown };

export class UserDynamoModel {
  scanAll = jest.fn();
  getById = jest.fn();
  getByEmail = jest.fn();
  create = jest.fn();
  update = jest.fn();
  delete = jest.fn();
  batchDelete = jest.fn();
  getByCreatedAfter = jest.fn();
  toUserType = jest.fn();
}

export interface UserModel extends BaseModel {
  email: string;
  name: string;
}

