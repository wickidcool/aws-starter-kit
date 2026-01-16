import { describe, it, expect } from '@jest/globals';
import { replaceTokens } from '../../generator/replace-tokens.js';
import type { TokenValues } from '../../templates/types.js';

describe('replaceTokens', () => {
  const mockTokens: TokenValues = {
    PROJECT_NAME: 'my-awesome-app',
    PROJECT_NAME_PASCAL: 'MyAwesomeApp',
    PROJECT_NAME_TITLE: 'My Awesome App',
    AWS_REGION: 'us-west-2',
    PACKAGE_SCOPE: '@my-awesome-app',
    BRAND_COLOR: 'blue',
  };

  describe('single token replacement', () => {
    it('should replace PROJECT_NAME token', () => {
      const content = 'name: {{PROJECT_NAME}}';
      const result = replaceTokens(content, mockTokens);
      expect(result).toBe('name: my-awesome-app');
    });

    it('should replace PROJECT_NAME_PASCAL token', () => {
      const content = 'class {{PROJECT_NAME_PASCAL}}Stack {}';
      const result = replaceTokens(content, mockTokens);
      expect(result).toBe('class MyAwesomeAppStack {}');
    });

    it('should replace AWS_REGION token', () => {
      const content = 'region: {{AWS_REGION}}';
      const result = replaceTokens(content, mockTokens);
      expect(result).toBe('region: us-west-2');
    });

    it('should replace PACKAGE_SCOPE token', () => {
      const content = "import { User } from '{{PACKAGE_SCOPE}}/common-types';";
      const result = replaceTokens(content, mockTokens);
      expect(result).toBe("import { User } from '@my-awesome-app/common-types';");
    });

    it('should replace BRAND_COLOR token', () => {
      const content = 'color: {{BRAND_COLOR}}';
      const result = replaceTokens(content, mockTokens);
      expect(result).toBe('color: blue');
    });
  });

  describe('multiple token replacement', () => {
    it('should replace multiple different tokens', () => {
      const content = `{
  "name": "{{PROJECT_NAME}}",
  "region": "{{AWS_REGION}}",
  "scope": "{{PACKAGE_SCOPE}}"
}`;
      const result = replaceTokens(content, mockTokens);
      expect(result).toBe(`{
  "name": "my-awesome-app",
  "region": "us-west-2",
  "scope": "@my-awesome-app"
}`);
    });

    it('should replace same token multiple times', () => {
      const content = '{{PROJECT_NAME}} and {{PROJECT_NAME}} again';
      const result = replaceTokens(content, mockTokens);
      expect(result).toBe('my-awesome-app and my-awesome-app again');
    });
  });

  describe('unknown token handling', () => {
    it('should preserve unknown tokens', () => {
      const content = '{{UNKNOWN_TOKEN}} stays';
      const result = replaceTokens(content, mockTokens);
      expect(result).toBe('{{UNKNOWN_TOKEN}} stays');
    });

    it('should replace known tokens and preserve unknown ones', () => {
      const content = '{{PROJECT_NAME}} and {{UNKNOWN_TOKEN}}';
      const result = replaceTokens(content, mockTokens);
      expect(result).toBe('my-awesome-app and {{UNKNOWN_TOKEN}}');
    });
  });

  describe('passthrough for content without tokens', () => {
    it('should return unchanged content when no tokens present', () => {
      const content = 'Regular content without any tokens';
      const result = replaceTokens(content, mockTokens);
      expect(result).toBe('Regular content without any tokens');
    });

    it('should return empty string unchanged', () => {
      const content = '';
      const result = replaceTokens(content, mockTokens);
      expect(result).toBe('');
    });

    it('should not match partial token patterns', () => {
      const content = '{ PROJECT_NAME } and {{ broken';
      const result = replaceTokens(content, mockTokens);
      expect(result).toBe('{ PROJECT_NAME } and {{ broken');
    });
  });
});
