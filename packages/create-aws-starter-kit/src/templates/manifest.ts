import type { ProjectConfig } from '../types.js';
import type { TokenValues, TemplateManifest } from './types.js';

/**
 * Convert kebab-case to PascalCase
 * my-awesome-app -> MyAwesomeApp
 */
function toPascalCase(str: string): string {
  return str
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

/**
 * Convert kebab-case to Title Case
 * my-awesome-app -> My Awesome App
 */
function toTitleCase(str: string): string {
  return str
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Derive all token values from user's ProjectConfig
 */
export function deriveTokenValues(config: ProjectConfig): TokenValues {
  return {
    PROJECT_NAME: config.projectName,
    PROJECT_NAME_PASCAL: toPascalCase(config.projectName),
    PROJECT_NAME_TITLE: toTitleCase(config.projectName),
    AWS_REGION: config.awsRegion,
    PACKAGE_SCOPE: `@${config.projectName}`,
  };
}

/**
 * Template manifest defining shared and platform-specific files
 * This matches the structure in templates/manifest.json
 */
export const templateManifest: TemplateManifest = {
  shared: [
    { src: 'root/package.json', dest: 'package.json' },
    { src: 'root/tsconfig.base.json', dest: 'tsconfig.base.json' },
    { src: 'root/nx.json', dest: 'nx.json' },
    { src: 'root/jest.preset.js', dest: 'jest.preset.js' },
    { src: 'root/eslint.config.js', dest: 'eslint.config.js' },
    { src: 'root/.npmrc', dest: '.npmrc' },
    { src: 'root/.nvmrc', dest: '.nvmrc' },
    { src: 'root/.editorconfig', dest: '.editorconfig' },
    { src: 'root/.gitignore', dest: '.gitignore' },
    { src: 'packages/common-types', dest: 'packages/common-types' },
    { src: 'packages/api-client', dest: 'packages/api-client' },
  ],
  byPlatform: {
    web: [{ src: 'apps/web', dest: 'apps/web' }],
    mobile: [{ src: 'apps/mobile', dest: 'apps/mobile' }],
    api: [{ src: 'apps/api', dest: 'apps/api' }],
  },
  byFeature: {
    'github-actions': [{ src: '.github', dest: '.github' }],
    'vscode-config': [{ src: '.vscode', dest: '.vscode' }],
  },
};
