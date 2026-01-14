# Technology Stack

**Analysis Date:** 2026-01-13

## Languages

**Primary:**
- TypeScript 5.9.3 - All application code (`package.json`)

**Secondary:**
- JavaScript - Build scripts, Babel config, ESLint config
- YAML - Lambda configuration (`apps/api/lambdas.yml`)

## Runtime

**Environment:**
- Node.js 22.16.0+ (`.nvmrc`, `package.json` engines)
- Warning: Node 25+ has Jest compatibility issues - avoid

**Package Manager:**
- npm 10.0.0+ (`package.json` engines)
- Lockfile: `package-lock.json` present
- Config: `legacy-peer-deps=true` in `.npmrc` for React 19 compatibility

## Frameworks

**Core:**
- React 19.2.0 - Web UI framework (`apps/web/`)
- React Native 0.76.5 - Mobile app (`apps/mobile/`)
- Expo 52.0.0 - React Native development platform
- AWS Lambda - Serverless API runtime (Node.js 20)
- AWS CDK 2.224.0 - Infrastructure as Code (`apps/api/cdk/`)

**UI & Styling:**
- @chakra-ui/react 2.10.9 - Component library (`apps/web/src/theme/`)
- @emotion/react 11.14.0, @emotion/styled 11.14.1 - CSS-in-JS
- framer-motion 10.18.0 - Animation library

**State Management:**
- zustand 5.0.8 - Client state (`apps/web/src/store/`, `apps/mobile/src/store/`)

**Testing:**
- Jest 30.2.0 - Test framework (`jest.preset.js`)
- ts-jest 29.4.5 - TypeScript Jest support
- @testing-library/react 14.3.1 - React component testing
- @testing-library/react-native 12.4.0 - React Native testing
- jest-expo 52.0.0 - Expo testing

**Build/Dev:**
- Nx 22.3.3 - Monorepo management (`nx.json`)
- Vite 7.2.2 - Web bundler and dev server (`apps/web/vite.config.ts`)
- esbuild 0.27.0 - Lambda bundler (via @nx/esbuild)
- @vitejs/plugin-react 5.1.1 - React plugin for Vite

**Linting:**
- ESLint 9.39.1 - Code linting (`eslint.config.js`)
- @typescript-eslint/eslint-plugin 8.48.0 - TypeScript rules
- @nx/eslint-plugin - Monorepo boundary enforcement

## Key Dependencies

**AWS SDK & Services:**
- @aws-sdk/client-dynamodb 3.940.0 - DynamoDB client
- @aws-sdk/lib-dynamodb 3.940.0 - Document client
- @aws-sdk/util-dynamodb 3.940.0 - Marshalling utilities
- @aws-lambda-powertools/logger 2.29.0 - Structured Lambda logging
- aws-cdk-lib 2.224.0 - CDK constructs (`apps/api/cdk/`)
- aws-cdk 2.1100.1 - CDK CLI
- aws-cdk-local 3.0.1 - LocalStack CDK support

**HTTP & Validation:**
- axios 1.13.2 - HTTP client (`packages/api-client/`)
- ajv 8.17.1 - JSON schema validation (`apps/api/src/utils/validator.ts`)
- ajv-formats 3.0.1 - Format validators

**Other:**
- constructs 10.4.3 - CDK base library
- js-yaml 4.1.1 - YAML parsing for Lambda config
- @pepperize/cdk-organizations 0.7.987 - AWS Organizations support

## Configuration

**Environment:**
- Web: `VITE_*` prefix for environment variables (`apps/web/.env`)
  - `VITE_API_BASE_URL` - API endpoint
- Mobile: `EXPO_PUBLIC_*` prefix (`apps/mobile/.env`)
  - `EXPO_PUBLIC_API_BASE_URL`, `EXPO_PUBLIC_API_DEBUG`
- API: CDK context and environment variables
  - `DYNAMODB_TABLE`, `AWS_REGION`, `LOG_LEVEL`

**Build:**
- `tsconfig.base.json` - Root TypeScript config with path aliases
- `apps/web/vite.config.ts` - Vite with React plugin, port 3000, API proxy
- `apps/api/project.json` - Nx/esbuild bundling, Node 20 target
- `jest.preset.js` - Jest with ts-jest transformer
- `nx.json` - Caching, named inputs, target defaults

**Path Aliases:**
- `@aws-starter-kit/common-types` -> `packages/common-types/src/index.ts`
- `@aws-starter-kit/api-client` -> `packages/api-client/src/index.ts`

## Platform Requirements

**Development:**
- macOS/Linux/Windows (any platform with Node.js 22+)
- npm as package manager (not yarn or pnpm)
- Node.js 22.x recommended (avoid Node 25+)

**Production:**
- AWS Lambda (Node.js 20 runtime) for API handlers
- AWS DynamoDB for data storage
- AWS S3 + CloudFront for static hosting
- AWS API Gateway for API routing

---

*Stack analysis: 2026-01-13*
*Update after major dependency changes*
