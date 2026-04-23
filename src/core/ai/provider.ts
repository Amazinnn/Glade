// src/core/ai/provider.ts
export interface AIProvider {
  readonly name: string;
  readonly model: string;

  chat(messages: { role: 'system' | 'user' | 'assistant'; content: string }[]): Promise<string>;
  chatStream(messages: { role: 'system' | 'user' | 'assistant'; content: string }[]): AsyncGenerator<string, void, unknown>;
  embed(text: string): Promise<number[]>;
}