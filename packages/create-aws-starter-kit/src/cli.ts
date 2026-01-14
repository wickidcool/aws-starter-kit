import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

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

Interactive wizard coming soon...
`.trim());
}

/**
 * Parse command line arguments and run the CLI
 */
export function run(): void {
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

  // Default: show welcome banner and placeholder
  printWelcome();
  process.exit(0);
}
