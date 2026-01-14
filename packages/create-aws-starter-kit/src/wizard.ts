import prompts from 'prompts';
import pc from 'picocolors';
import type { ProjectConfig } from './types.js';
import { projectNamePrompt } from './prompts/project-name.js';
import { platformsPrompt } from './prompts/platforms.js';
import { awsRegionPrompt } from './prompts/aws-config.js';

export async function runWizard(): Promise<ProjectConfig | null> {
  const response = await prompts(
    [projectNamePrompt, platformsPrompt, awsRegionPrompt],
    {
      onCancel: () => {
        console.log(`\n${pc.red('✖')} Setup cancelled`);
        process.exit(0);
      }
    }
  );

  // Validate all required fields present
  if (!response.projectName || !response.platforms?.length || !response.awsRegion) {
    return null;
  }

  return response as ProjectConfig;
}
