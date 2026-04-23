// src/core/ai/providers/claude.provider.ts
import Anthropic from '@anthropic-ai/sdk';
import type { AIProvider } from '../provider.js';

export class ClaudeProvider implements AIProvider {
  readonly name = 'claude';
  private client: Anthropic;

  constructor(apiKey: string, model = 'claude-sonnet-4-20250514') {
    this.client = new Anthropic({ apiKey });
  }

  get model(): string {
    return 'claude-sonnet-4-20250514';
  }

  async chat(messages: { role: 'system' | 'user' | 'assistant'; content: string }[]): Promise<string> {
    const system = messages.find(m => m.role === 'system')?.content ?? '';
    const userMsgs = messages.filter(m => m.role !== 'system');
    const response = await this.client.messages.create({
      model: this.model,
      system,
      messages: userMsgs.map(m => ({ role: m.role as 'user' | 'assistant', content: m.content })),
      max_tokens: 4096,
    });
    return response.content[0]?.type === 'text' ? response.content[0].text : '';
  }

  async *chatStream(messages: { role: 'system' | 'user' | 'assistant'; content: string }[]): AsyncGenerator<string, void, unknown> {
    const system = messages.find(m => m.role === 'system')?.content ?? '';
    const userMsgs = messages.filter(m => m.role !== 'system');
    const stream = await this.client.messages.stream({
      model: this.model,
      system,
      messages: userMsgs.map(m => ({ role: m.role as 'user' | 'assistant', content: m.content })),
      max_tokens: 4096,
    });
    for await (const event of stream) {
      if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
        yield event.delta.text;
      }
    }
  }

  async embed(_text: string): Promise<number[]> {
    console.warn('Claude provider: embedding not supported, falling back to OpenAI');
    return [];
  }
}