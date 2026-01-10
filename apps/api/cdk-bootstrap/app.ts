#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { OrgStack } from './org-stack';

const appName = 'AwsStarterKit';

/**
 * AWS CDK App for AWS Starter Kit Organization Bootstrap
 *
 * This app creates AWS Organizations infrastructure (OrgStack):
 * - AWS Organization
 * - Organizational Units (nonprod, prod)
 * - AWS Accounts (dev, stage, prod)
 *
 * Deploy from the management account:
 *   npx cdk deploy AwsStarterKit-Org \
 *     -c devEmail=dev@example.com \
 *     -c stageEmail=stage@example.com \
 *     -c prodEmail=prod@example.com
 *
 * Note: GitHub deployment users are now managed in the main CDK app (apps/api/cdk).
 */
const app = new cdk.App();

// Get email addresses from context (required)
const devEmail = app.node.tryGetContext('devEmail');
const stageEmail = app.node.tryGetContext('stageEmail');
const prodEmail = app.node.tryGetContext('prodEmail');

// Validate required context parameters
if (!devEmail || !stageEmail || !prodEmail) {
  throw new Error(
    'Missing required context parameters. Please provide devEmail, stageEmail, and prodEmail.\n' +
    'Example: npx cdk deploy -c devEmail=dev@example.com -c stageEmail=stage@example.com -c prodEmail=prod@example.com'
  );
}

// Get AWS account and region from environment or use defaults
const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT || process.env.AWS_ACCOUNT_ID,
  region: process.env.CDK_DEFAULT_REGION || process.env.AWS_REGION || 'us-east-1',
};

// Common tags for all resources
const tags = {
  Project: 'AWS Starter Kit',
  ManagedBy: 'CDK',
};

// Create the Organization stack
new OrgStack(app, `${appName}-Org`, {
  env,
  description: 'AWS Starter Kit Organization structure with accounts',
  tags,
  devEmail,
  stageEmail,
  prodEmail,
});
