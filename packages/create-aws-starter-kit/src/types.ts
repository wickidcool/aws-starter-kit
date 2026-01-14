export interface ProjectConfig {
  projectName: string;
  platforms: ('web' | 'mobile' | 'api')[];
  awsRegion: string;
}
