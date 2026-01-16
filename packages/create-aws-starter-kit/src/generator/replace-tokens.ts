import { TOKEN_PATTERN } from '../templates/tokens.js';
import type { TokenValues } from '../templates/types.js';

/**
 * Replace all {{TOKEN}} placeholders in content with actual values
 * @param content - File content with {{TOKEN}} placeholders
 * @param tokens - Token values to substitute
 * @returns Content with all tokens replaced
 */
export function replaceTokens(content: string, tokens: TokenValues): string {
  return content.replace(TOKEN_PATTERN, (match, tokenName) => {
    const value = tokens[tokenName as keyof TokenValues];
    return value !== undefined ? value : match; // Keep original if unknown token
  });
}
