// src/cli/commands/ai.ts
import { Command } from 'commander';
import { getProvider } from '../../core/ai/index.js';
import { LogRepository } from '../../core/db/repositories/log.repository.js';
import { EventRepository } from '../../core/db/repositories/event.repository.js';

export function registerAICommands(program: Command): void {
  const ai = program.command('ai').description('AI 对话');

  ai
    .command('chat <message>')
    .description('AI 对话')
    .action(async (message: string) => {
      try {
        const provider = getProvider();
        const result = await provider.chat([
          { role: 'user', content: message },
        ]);
        console.log(JSON.stringify({ ok: true, reply: result }));
      } catch (err: any) {
        console.log(JSON.stringify({ ok: false, error: err.message }));
      }
    });

  ai
    .command('summarize')
    .description('生成今日摘要')
    .action(async () => {
      try {
        const provider = getProvider();
        const logRepo = new LogRepository();
        const eventRepo = new EventRepository();
        const today = Date.now() - 86400000;
        const logs = logRepo.list(today);
        const events = eventRepo.listByType('expense' as any, today);
        const context = `今日日志 ${logs.length} 条，事件 ${events.length} 条。请总结。`;
        const result = await provider.chat([{ role: 'user', content: context }]);
        console.log(JSON.stringify({ ok: true, summary: result }));
      } catch (err: any) {
        console.log(JSON.stringify({ ok: false, error: err.message }));
      }
    });
}