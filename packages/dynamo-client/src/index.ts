/**
 * @aws-starter-kit/dynamo-client
 *
 * DynamoDB model base classes for AWS Starter Kit
 * Provides abstract base class for DynamoDB CRUD operations with GSI support
 */

export { DynamoModel, BaseModel, DynamoModelConfig } from './dynamo-model';
export {
  removeGSIFields,
  generateUUID,
  getCurrentTimestamp,
  GSIFieldNames,
} from './utils';
