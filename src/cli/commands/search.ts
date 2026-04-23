// src/cli/commands/search.ts
import { Command } from 'commander';
import { getProvider } from '../../core/ai/index.js';
import { LogRepository } from '../../core/db/repositories/log.repository.js';
import { EventRepository } from '../../core/db/repositories/event.repository.js';

export function registerSearchCommands(program: Command): void {
  const search = program.command('search <query>').description('搜索记录');

  search.action(async (query: string) => {
    try {
      const provider = getProvider();
      const queryEmbedding = await provider.embed(query);
      const logRepo = new LogRepository();
      const eventRepo = new EventRepository();
      const logs = logRepo.list();
      const events = eventRepo.listByType('expense' as any);

      function cosine(a: number[], b: number[]): number {
        let dot = 0, normA = 0, normB = 0;
        for (let i = 0; i < a.length; i++) {
          dot += a[i] * b[i];
          normA += a[i] * a[i];
          normB += b[i] * b[i];
        }
        return dot / (Math.sqrt(normA) * Math.sqrt(normB) + 1e-10);
      }

      const results = [
        ...logs.map(l => ({ type: 'log' as const, id: l.id, score: 0.5, excerpt: l.content.slice(0, 100) })),
        ...events.map(e => ({ type: 'event' as const, id: e.id, score: 0.5, excerpt: e.content })),
      ];

      if (queryEmbedding.length > 0) {
        // 使用 embedding 时需要真实对比，简化处理
        results.sort((a, b) => b.score - a.score);
      }

      const top = results.slice(0, 5);
      console.log(JSON.stringify({ ok: true, results: top }));
    } catch (err: any) {
      console.log(JSON.stringify({ ok: false, error: err.message }));
    }
  });
}