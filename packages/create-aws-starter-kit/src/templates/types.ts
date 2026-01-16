import type { ProjectConfig, Feature } from '../types.js';

/** Mapping of token names to their replacement values */
export interface TokenValues {
  PROJECT_NAME: string;
  PROJECT_NAME_PASCAL: string;
  PROJECT_NAME_TITLE: string;
  AWS_REGION: string;
  PACKAGE_SCOPE: string;
  BRAND_COLOR: string;
}

/** Platform identifiers for conditional templates */
export type Platform = 'web' | 'mobile' | 'api';

/** A single template file entry */
export interface TemplateFile {
  /** Source path relative to templates/ directory */
  src: string;
  /** Destination path relative to output directory (may contain tokens) */
  dest: string;
  /** Which platforms this file belongs to (undefined = all platforms) */
  platforms?: Platform[];
}

/** Complete template manifest */
export interface TemplateManifest {
  /** Files that are always included */
  shared: TemplateFile[];
  /** Files grouped by platform */
  byPlatform: Record<Platform, TemplateFile[]>;
  /** Files grouped by feature */
  byFeature: Record<Feature, TemplateFile[]>;
}

/** Function to derive token values from ProjectConfig */
export type DeriveTokenValues = (config: ProjectConfig) => TokenValues;

/** Re-export Feature type for convenience */
export type { Feature };
