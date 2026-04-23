// src/core/ai/index.ts
import type { AIProvider } from './provider.js';
import { OpenAIProvider } from './providers/openai.provider.js';
import { ClaudeProvider } from './providers/claude.provider.js';

export type ProviderType = 'openai' | 'claude';

let currentProvider: AIProvider | null = null;

export function createProvider(type: ProviderType, apiKey: string): AIProvider {
  switch (type) {
    case 'openai':
      currentProvider = new OpenAIProvider(apiKey);
      break;
    case 'claude':
      currentProvider = new ClaudeProvider(apiKey);
      break;
  }
  return currentProvider!;
}

export function getProvider(): AIProvider {
  if (!currentProvider) throw new Error('AI provider not initialized. Call createProvider first.');
  return currentProvider;
}

export { type AIProvider } from './provider.js';