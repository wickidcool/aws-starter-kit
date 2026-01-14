# External Integrations

**Analysis Date:** 2026-01-13

## APIs & External Services

**Payment Processing:**
- Not integrated

**Email/SMS:**
- Not integrated

**External APIs:**
- Not integrated

## Data Storage

**Databases:**
- AWS DynamoDB - Primary NoSQL data store
  - Connection: Table name via `DYNAMODB_TABLE` env var
  - Client: AWS SDK v3 (`@aws-sdk/client-dynamodb`, `@aws-sdk/lib-dynamodb`)
  - Operations: GetItem, PutItem, UpdateItem, DeleteItem, Scan, Query, BatchWriteItem
  - Location: `apps/api/src/lib/dynamo/dynamo-model.ts`
  - Model: `apps/api/src/models/UserModel.ts`
  - Table: `aws-starter-kit-table` (configurable)
  - Region: `AWS_REGION` env var (default: us-east-1)
  - GSI1: pk1/sk1 for email-based queries
  - GSI2: pk2/sk2 for time-based queries

**File Storage:**
- AWS S3 - Static web app hosting
  - Integration: `apps/api/cdk/static-stack.ts`
  - Bucket: Created by CDK for web app assets
  - Access: Via CloudFront distribution

**Caching:**
- None currently

## Authentication & Identity

**Auth Provider:**
- Not integrated (no authentication layer)

**OAuth Integrations:**
- Not integrated

## Monitoring & Observability

**Error Tracking:**
- Not integrated (no Sentry, etc.)

**Analytics:**
- Not integrated

**Logging:**
- AWS Lambda Powertools Logger
  - Package: `@aws-lambda-powertools/logger`
  - Location: `apps/api/src/lib/dynamo/dynamo-model.ts`
  - Configuration: SERVICE_NAME, LOG_LEVEL, NODE_ENV env vars
  - Output: CloudWatch Logs (via Lambda)

## CI/CD & Deployment

**Hosting:**
- AWS Lambda - API handlers
  - Functions defined in `apps/api/lambdas.yml`
  - Memory: 256MB per function
  - Timeout: 30 seconds
  - Bundled by CDK from source files
- AWS S3 + CloudFront - Static web hosting
  - Distribution URL in `apps/web/.env`, `apps/mobile/.env`
  - Current: `https://dpyhpv2i7swh8.cloudfront.net`
  - Deployment: `npm run deploy:web`, `npm run invalidate:cdn`

**Infrastructure:**
- AWS CDK
  - Entry: `apps/api/cdk/app.ts`
  - Stacks:
    - StaticStack: S3, CloudFront, API Gateway (`apps/api/cdk/static-stack.ts`)
    - UserStack: Lambda functions, DynamoDB integration (`apps/api/cdk/user-stack.ts`)
    - DeploymentUserStack: GitHub Actions IAM user (`apps/api/cdk/deployment-user-stack.ts`)
  - Deploy: `npm run cdk:deploy`
  - Diff: `npm run cdk:diff`

**CI Pipeline:**
- GitHub Actions (IAM user created by DeploymentUserStack)
  - Permissions: S3 write, CloudFront invalidation
  - Stack: `apps/api/cdk/deployment-user-stack.ts`

## Environment Configuration

**Development:**
- Required env vars:
  - API: `DYNAMODB_TABLE`, `AWS_REGION`
  - Web: `VITE_API_BASE_URL`
  - Mobile: `EXPO_PUBLIC_API_BASE_URL`, `EXPO_PUBLIC_API_DEBUG`
- Secrets location: `.env` files (gitignored in production)
- Local development: LocalStack supported (`aws-cdk-local` package)

**Production:**
- Environment vars: Configured via CDK Lambda environment
- API Gateway: CloudFront routes `/api/*` to API Gateway
- Database: Production DynamoDB table via CDK

## Webhooks & Callbacks

**Incoming:**
- None

**Outgoing:**
- None

## AWS Services Summary

| Service | Purpose | Configuration Location |
|---------|---------|------------------------|
| DynamoDB | Data storage | `apps/api/src/lib/dynamo/` |
| Lambda | API handlers | `apps/api/lambdas.yml` |
| API Gateway | HTTP routing | `apps/api/cdk/static-stack.ts` |
| S3 | Static hosting | `apps/api/cdk/static-stack.ts` |
| CloudFront | CDN | `apps/api/cdk/static-stack.ts` |
| IAM | Deployment permissions | `apps/api/cdk/deployment-user-stack.ts` |

## HTTP Client Configuration

**API Client:**
- Package: `packages/api-client/`
- Class: `ApiClient` (`packages/api-client/src/api-client.ts`)
- HTTP Library: Axios 1.13.2
- Features:
  - Request timeout: 30000ms (configurable)
  - Custom error class: `ApiError` with statusCode, code, details
  - Environment-aware base URL detection
- Environment variables:
  - `VITE_API_BASE_URL` (Vite/web)
  - `EXPO_PUBLIC_API_BASE_URL` (Expo/mobile)
  - `API_BASE_URL` (Node.js)
  - `API_TIMEOUT`, `API_KEY`, `API_WITH_CREDENTIALS`, `API_DEBUG`

---

*Integration audit: 2026-01-13*
*Update when adding/removing external services*
