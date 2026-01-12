# @aws-starter-kit/dynamo-client

DynamoDB model base classes for AWS Starter Kit. Provides an abstract base class for DynamoDB CRUD operations with Global Secondary Index (GSI) support.

## Installation

This package is part of the AWS Starter Kit monorepo and is available as a workspace dependency.

```json
{
  "dependencies": {
    "@aws-starter-kit/dynamo-client": "*"
  }
}
```

## Peer Dependencies

This package requires the following peer dependencies:

- `@aws-sdk/client-dynamodb` - AWS SDK DynamoDB client
- `@aws-sdk/util-dynamodb` - DynamoDB marshalling utilities
- `@aws-lambda-powertools/logger` - AWS Lambda Powertools Logger

## Usage

### Define a Model

```typescript
import { DynamoModel, BaseModel, generateUUID } from '@aws-starter-kit/dynamo-client';

// Define your entity interface
interface UserModel extends BaseModel {
  email: string;
  name: string;
}

// Create a model class
class UserDynamoModel extends DynamoModel<UserModel> {
  constructor(tableName?: string, region?: string) {
    super(
      tableName || process.env['DYNAMODB_TABLE'] || 'users-table',
      region || process.env['AWS_REGION'] || 'us-east-1'
    );
  }

  protected getEntityName(): string {
    return 'User';
  }

  protected async generateId(): Promise<string> {
    return generateUUID();
  }

  protected setGSIKeys(entity: UserModel, now: string): void {
    // GSI1: Query by email
    entity.pk1 = 'USER';
    entity.sk1 = `EMAIL#${entity.email}`;

    // GSI2: Query by creation date
    entity.pk2 = 'USER';
    entity.sk2 = `CREATED#${now}`;
  }
}
```

### CRUD Operations

```typescript
const userModel = new UserDynamoModel();

// Create
const user = await userModel.create({
  email: 'john@example.com',
  name: 'John Doe',
});

// Read
const fetchedUser = await userModel.getById(user.id);

// Update
const updatedUser = await userModel.update(user.id, {
  name: 'John Smith',
});

// Delete
await userModel.delete(user.id);

// Batch Delete
const results = await userModel.batchDelete(['id1', 'id2', 'id3']);

// Scan All
const allUsers = await userModel.scanAll();

// Query by GSI
const usersByEmail = await userModel.queryByGSI(
  'GSI1',
  'pk1 = :pk AND sk1 = :sk',
  { ':pk': 'USER', ':sk': 'EMAIL#john@example.com' }
);
```

## API Reference

### BaseModel

Base interface that all entities must extend:

```typescript
interface BaseModel {
  id: string;
  createdAt: string;
  updatedAt?: string;
  // GSI keys (pk1-pk6, sk1-sk6)
}
```

### DynamoModel<T>

Abstract class providing CRUD operations:

| Method | Description |
|--------|-------------|
| `getById(id)` | Get entity by ID |
| `create(data)` | Create new entity |
| `update(id, updates)` | Update entity |
| `delete(id)` | Delete entity |
| `batchDelete(ids)` | Delete multiple entities |
| `scanAll(filter?, values?)` | Scan all entities |
| `queryByGSI(...)` | Query using GSI |

### Abstract Methods

Subclasses must implement:

- `getEntityName()` - Return entity name for logging
- `generateId(data)` - Generate unique ID
- `setGSIKeys(entity, now)` - Set GSI partition/sort keys

### Utility Functions

| Function | Description |
|----------|-------------|
| `removeGSIFields(entity)` | Strip GSI keys from entity |
| `generateUUID()` | Generate random UUID |
| `getCurrentTimestamp()` | Get ISO timestamp |

## GSI Pattern

The DynamoModel supports up to 6 GSIs with the following key pattern:

- `pk1/sk1` through `pk6/sk6`

GSI fields are automatically stripped when returning entities to clients.

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `SERVICE_NAME` | Logger service name | `dynamo-client` |
| `LOG_LEVEL` | Log level | `INFO` |
| `NODE_ENV` | Environment | `development` |
| `AWS_REGION` | AWS region | - |

## License

MIT
