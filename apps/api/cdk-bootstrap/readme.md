# CDK Bootstrap

This directory contains CDK stacks for bootstrapping AWS Organization infrastructure.

> **Note:** GitHub deployment users are now managed in the main CDK app (`apps/api/cdk`).

## Prerequisites

- AWS CLI configured with management account credentials
- CDK CLI installed (`npm install -g aws-cdk` or use `npx cdk`)
- CDK bootstrapped in management account (`npx cdk bootstrap`)

## Organization Stack (`OrgStack`)

Creates the AWS Organization structure including:
- AWS Organization
- Organizational Units (nonprod, prod)
- AWS Accounts (dev, stage, prod)

**Deploy from the management account:**

```bash
cd apps/api/cdk-bootstrap

npx cdk deploy AwsStarterKit-Org \
  -c devEmail=dev@example.com \
  -c stageEmail=stage@example.com \
  -c prodEmail=prod@example.com
```

## Stack Outputs

| Output | Description |
|--------|-------------|
| `DevAccountId` | AWS Account ID for dev |
| `StageAccountId` | AWS Account ID for stage |
| `ProdAccountId` | AWS Account ID for prod |

## Legacy Policy Reference

The original manual IAM policy (for reference):

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Action": [
                "cloudformation:CreateChangeSet",
                "cloudformation:DeleteChangeSet",
                "cloudformation:DescribeChangeSet",
                "cloudformation:DescribeStacks",
                "cloudformation:ExecuteChangeSet",
                "cloudformation:CreateStack",
                "cloudformation:UpdateStack",
                "cloudformation:RollbackStack",
                "cloudformation:ContinueUpdateRollback",
                "cloudformation:DescribeStackEvents",
                "cloudformation:GetTemplate",
                "cloudformation:DeleteStack",
                "cloudformation:UpdateTerminationProtection",
                "sts:GetCallerIdentity",
                "cloudformation:GetTemplateSummary",
                "cloudformation:CreateStackRefactor",
                "cloudformation:DescribeStackRefactor",
                "cloudformation:ExecuteStackRefactor",
                "cloudformation:ListStackRefactorActions",
                "cloudformation:ListStackRefactors",
                "cloudformation:ListStacks"
            ],
            "Resource": "*",
            "Effect": "Allow",
            "Sid": "CloudFormationPermissions"
        },
        {
            "Action": [
                "cloudfront:ListDistributions",
                "cloudfront:CreateInvalidation"
            ],
            "Resource": "*",
            "Effect": "Allow",
            "Sid": "CloudFrontPermissions"
        },
        {
            "Action": [
                "ssm:GetParameter",
                "ssm:GetParameters"
            ],
            "Resource": [
                "arn:aws:ssm:us-east-2:873739386824:parameter/cdk-bootstrap/hnb659fds/version"
            ],
            "Effect": "Allow",
            "Sid": "ReadVersion"
        },
        {
            "Condition": {
                "StringEquals": {
                    "s3:ResourceAccount": "873739386824"
                }
            },
            "Action": [
                "s3:GetObject*",
                "s3:GetBucket*",
                "s3:List*",
                "s3:Abort*",
                "s3:DeleteObject*",
                "s3:PutObject*",
                "s3:ListAllMyBuckets"
            ],
            "Resource": "*",
            "Effect": "Allow",
            "Sid": "PipelineCrossAccountArtifactsBucket"
        },
        {
            "Condition": {
                "StringEquals": {
                    "kms:ViaService": "s3.us-east-2.amazonaws.com"
                }
            },
            "Action": [
                "kms:Decrypt",
                "kms:DescribeKey",
                "kms:Encrypt",
                "kms:ReEncrypt*",
                "kms:GenerateDataKey*"
            ],
            "Resource": "*",
            "Effect": "Allow",
            "Sid": "PipelineCrossAccountArtifactsKey"
        },
        {
            "Action": "iam:PassRole",
            "Resource": "arn:aws:iam::873739386824:role/cdk-hnb659fds-cfn-exec-role-873739386824-us-east-2",
            "Effect": "Allow"
        },
        {
            "Action": [
                "s3:GetObject*",
                "s3:GetBucket*",
                "s3:List*"
            ],
            "Resource": [
                "arn:aws:s3:::cdk-hnb659fds-assets-873739386824-us-east-2",
                "arn:aws:s3:::cdk-hnb659fds-assets-873739386824-us-east-2/*"
            ],
            "Effect": "Allow",
            "Sid": "CliStagingBucket"
        }
    ]
}
```
