import type { ProjectConfig } from '../types.js';
import type { TokenValues } from './types.js';

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
