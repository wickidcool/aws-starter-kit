# Quick Start Guide

Get up and running with the AWS Starter Kit in minutes!

## Installation

```bash
npm install
```

## Development

### Start the Web Client

```bash
npm run web
```

Visit `http://localhost:3000` to see the React app in action.

The app includes:

- Modern UI with dark theme
- Example of using shared types
- Demo user management functionality

### Build Everything

```bash
npm run build:all
```

This builds:

- `common-types` - Shared TypeScript types
- `web` - React application
- `api` - Lambda functions

## Project Structure

```
aws-starter-kit/
├── apps/
│   ├── web/          # React web app (port 3000)
│   └── api/          # AWS Lambda handlers
├── packages/
│   └── common-types/ # Shared TypeScript types
└── dist/             # Build output (created after build)
```

## What's Included

### Web Application (`apps/web`)

- ⚛️ React 18 with TypeScript
- ⚡ Vite for fast HMR
- 🎨 Modern dark theme UI
- 📦 Uses shared types from common-types

### API (`apps/api`)

- 🚀 AWS Lambda handlers
- 🔒 Type-safe with TypeScript
- 🌐 RESTful user CRUD operations
- 📦 Uses shared types from common-types

### Common Types (`packages/common-types`)

- 📝 Shared TypeScript interfaces
- 🔄 Used by both web and API
- 🛡️ Ensures type consistency

## Key Commands

| Command             | Description                   |
| ------------------- | ----------------------------- |
| `npm run web`       | Start development server      |
| `npm run build:web` | Build web app for production  |
| `npm run build:api` | Build Lambda functions        |
| `npm run build:all` | Build all projects            |
| `npm run graph`     | View project dependency graph |

## Next Steps

1. **Explore the Code**

   - Check out `apps/web/src/App.tsx` for the React component
   - Look at `apps/api/src/handlers/users.ts` for Lambda handlers
   - Review `packages/common-types/src/index.ts` for shared types

2. **Deploy to AWS**

   - See the main README.md for AWS deployment instructions
   - Use the included `template.yaml` for SAM deployment

3. **Add Features**
   - Create new shared types in `packages/common-types`
   - Add new Lambda handlers in `apps/api/src/handlers`
   - Add new method in `packages/api-client/src/api-client.ts`
   - Build new components in `apps/web/src/components`

## Troubleshooting

**Q: Build fails?**  
A: Make sure all dependencies are installed: `npm install`

**Q: Types not found?**  
A: Build the common-types first: `npx nx build common-types`

**Q: Port 3000 in use?**  
A: Change the port in `apps/web/vite.config.ts`

## Learn More

- [Full README](./README.md) - Comprehensive documentation
- [API Documentation](./apps/api/README.md) - Lambda API details
- [Nx Documentation](https://nx.dev) - Monorepo management

Happy coding! 🚀
