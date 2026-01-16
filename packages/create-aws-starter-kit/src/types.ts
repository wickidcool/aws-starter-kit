export type Feature = 'github-actions' | 'vscode-config';

export type BrandColor = 'blue' | 'purple' | 'teal' | 'green' | 'orange';

export interface ProjectConfig {
  projectName: string;
  platforms: ('web' | 'mobile' | 'api')[];
  awsRegion: string;
  features: Feature[];
  brandColor: BrandColor;
}
