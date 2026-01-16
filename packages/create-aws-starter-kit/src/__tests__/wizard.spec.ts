import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import type { Answers, PromptObject } from 'prompts';

// Mock prompts module
jest.mock('prompts', () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Mock picocolors to avoid console output issues
jest.mock('picocolors', () => ({
  __esModule: true,
  default: {
    red: (s: string) => s,
    green: (s: string) => s,
    blue: (s: string) => s,
    yellow: (s: string) => s,
    cyan: (s: string) => s,
    magenta: (s: string) => s,
    bold: (s: string) => s,
    dim: (s: string) => s,
  },
}));

import prompts from 'prompts';
import { runWizard } from '../wizard.js';

const mockedPrompts = jest.mocked(prompts);

describe('runWizard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock process.exit to prevent test from exiting
    jest.spyOn(process, 'exit').mockImplementation((() => {
      throw new Error('process.exit called');
    }) as () => never);
  });

  describe('successful completion', () => {
    it('should return complete ProjectConfig when all prompts answered', async () => {
      mockedPrompts.mockResolvedValueOnce({
        projectName: 'my-test-app',
        platforms: ['web', 'api'],
        features: ['github-actions'],
        awsRegion: 'us-east-1',
        brandColor: 'blue',
      } as Answers<string>);

      const result = await runWizard();

      expect(result).not.toBeNull();
      expect(result).toEqual({
        projectName: 'my-test-app',
        platforms: ['web', 'api'],
        features: ['github-actions'],
        awsRegion: 'us-east-1',
        brandColor: 'blue',
      });
    });

    it('should return config with all platforms selected', async () => {
      mockedPrompts.mockResolvedValueOnce({
        projectName: 'full-stack-app',
        platforms: ['web', 'mobile', 'api'],
        features: ['github-actions', 'vscode-config'],
        awsRegion: 'eu-west-1',
        brandColor: 'purple',
      } as Answers<string>);

      const result = await runWizard();

      expect(result).not.toBeNull();
      expect(result?.platforms).toEqual(['web', 'mobile', 'api']);
      expect(result?.features).toEqual(['github-actions', 'vscode-config']);
    });

    it('should default features to empty array when none selected', async () => {
      mockedPrompts.mockResolvedValueOnce({
        projectName: 'minimal-app',
        platforms: ['api'],
        features: undefined, // No features selected
        awsRegion: 'ap-southeast-1',
        brandColor: 'teal',
      } as Answers<string>);

      const result = await runWizard();

      expect(result).not.toBeNull();
      expect(result?.features).toEqual([]);
    });
  });

  describe('incomplete responses', () => {
    it('should return null when projectName is missing', async () => {
      mockedPrompts.mockResolvedValueOnce({
        projectName: undefined,
        platforms: ['web'],
        awsRegion: 'us-east-1',
        brandColor: 'blue',
      } as Answers<string>);

      const result = await runWizard();

      expect(result).toBeNull();
    });

    it('should return null when platforms is empty', async () => {
      mockedPrompts.mockResolvedValueOnce({
        projectName: 'my-app',
        platforms: [],
        awsRegion: 'us-east-1',
        brandColor: 'blue',
      } as Answers<string>);

      const result = await runWizard();

      expect(result).toBeNull();
    });

    it('should return null when awsRegion is missing', async () => {
      mockedPrompts.mockResolvedValueOnce({
        projectName: 'my-app',
        platforms: ['web'],
        awsRegion: undefined,
        brandColor: 'blue',
      } as Answers<string>);

      const result = await runWizard();

      expect(result).toBeNull();
    });

    it('should return null when brandColor is missing', async () => {
      mockedPrompts.mockResolvedValueOnce({
        projectName: 'my-app',
        platforms: ['web'],
        awsRegion: 'us-east-1',
        brandColor: undefined,
      } as Answers<string>);

      const result = await runWizard();

      expect(result).toBeNull();
    });
  });

  describe('cancellation', () => {
    it('should exit when user cancels via onCancel', async () => {
      // Simulate prompts calling onCancel by storing the callback and calling it
      let storedOnCancel: ((prompt: PromptObject, _answers: Answers<string>) => void) | undefined;

      mockedPrompts.mockImplementationOnce(((_questions: unknown, options: { onCancel?: (prompt: PromptObject, answers: Answers<string>) => void }) => {
        storedOnCancel = options?.onCancel;
        // Trigger onCancel before returning
        if (storedOnCancel) {
          storedOnCancel({} as PromptObject, {} as Answers<string>);
        }
        return Promise.resolve({} as Answers<string>);
      }) as typeof prompts);

      await expect(runWizard()).rejects.toThrow('process.exit called');
      expect(process.exit).toHaveBeenCalledWith(0);
    });
  });

  describe('config structure verification', () => {
    it('should return config with all expected fields', async () => {
      mockedPrompts.mockResolvedValueOnce({
        projectName: 'test-app',
        platforms: ['web'],
        features: [],
        awsRegion: 'us-east-1',
        brandColor: 'green',
      } as Answers<string>);

      const result = await runWizard();

      expect(result).not.toBeNull();
      expect(result).toHaveProperty('projectName');
      expect(result).toHaveProperty('platforms');
      expect(result).toHaveProperty('features');
      expect(result).toHaveProperty('awsRegion');
      expect(result).toHaveProperty('brandColor');
    });

    it('should pass correct prompts to prompts library', async () => {
      mockedPrompts.mockResolvedValueOnce({
        projectName: 'my-app',
        platforms: ['web'],
        features: [],
        awsRegion: 'us-east-1',
        brandColor: 'orange',
      } as Answers<string>);

      await runWizard();

      expect(mockedPrompts).toHaveBeenCalledTimes(1);
      const [promptsArg] = mockedPrompts.mock.calls[0];

      // Verify 5 prompts are passed (projectName, platforms, features, awsRegion, brandColor)
      expect(Array.isArray(promptsArg)).toBe(true);
      expect((promptsArg as PromptObject[]).length).toBe(5);
    });
  });
});
