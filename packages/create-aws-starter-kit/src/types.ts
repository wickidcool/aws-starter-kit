export type Feature = 'github-actions' | 'vscode-config';

export interface ProjectConfig {
  projectName: string;
  platforms: ('web' | 'mobile' | 'api')[];
  awsRegion: string;
  features: Feature[];
}
