import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import pc from 'picocolors';
import { runWizard } from './wizard.js';

/**
 * Get the version from package.json
 */
function getVersion(): string {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const packageJsonPath = join(__dirname, '..', 'package.json');
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
  return packageJson.version;
}

/**
 * Print help message
 */
function printHelp(): void {
  console.log(`
create-aws-starter-kit [options] [project-name]

Scaffold a new AWS Starter Kit project with React, Lambda, and CDK infrastructure.

Options:
  --help, -h      Show this help message
  --version, -v   Show version number

Examples:
  create-aws-starter-kit my-app
  create-aws-starter-kit --help
  create-aws-starter-kit --version
`.trim());
}

/**
 * Print welcome banner
 */
function printWelcome(): void {
  console.log(`
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║            create-aws-starter-kit                     ║
║       AWS Starter Kit Project Generator               ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
`.trim());
}

/**
 * Parse command line arguments and run the CLI
 */
export async function run(): Promise<void> {
  const args = process.argv.slice(2);

  // Check for --help or -h
  if (args.includes('--help') || args.includes('-h')) {
    printHelp();
    process.exit(0);
  }

  // Check for --version or -v
  if (args.includes('--version') || args.includes('-v')) {
    console.log(getVersion());
    process.exit(0);
  }

  // Default: run interactive wizard
  printWelcome();
  console.log('');  // blank line after banner

  const config = await runWizard();

  if (!config) {
    console.log('\nNo configuration collected. Exiting.');
    process.exit(1);
  }

  // Display collected config (generation engine will use this later)
  console.log('');
  console.log(pc.green('✔') + ' Configuration collected:');
  console.log(`  Project: ${pc.cyan(config.projectName)}`);
  console.log(`  Platforms: ${pc.cyan(config.platforms.join(', '))}`);
  console.log(`  AWS Region: ${pc.cyan(config.awsRegion)}`);
  console.log('');
  console.log(pc.yellow('Project generation coming in Phase 4...'));

  process.exit(0);
}
