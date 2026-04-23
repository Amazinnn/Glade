// src/cli/commands/log.ts
import { Command } from 'commander';
import { LogRepository } from '../../core/db/repositories/log.repository.js';
import { appendEntry } from '../../core/storage/markdown.js';

const repo = new LogRepository();

export function registerLogCommands(program: Command): void {
  const log = program.command('log').description('日志管理');

  log
    .command('new <content>')
    .description('新建日志')
    .action((content: string) => {
      const entry = repo.create(content);
      const date = new Date(entry.createdAt).toISOString().slice(0, 10);
      appendEntry(date, 'log', content);
      console.log(JSON.stringify({ ok: true, id: entry.id }));
    });

  log
    .command('list')
    .option('--since <ms>', '只看最近 ms 毫秒的日志')
    .option('--limit <n>', '最多返回条数', '100')
    .description('列出日志')
    .action((opts) => {
      const since = opts.since ? parseInt(opts.since) : undefined;
      const limit = parseInt(opts.limit);
      const entries = repo.list(since, limit);
      console.log(JSON.stringify({ ok: true, entries }));
    });

  log
    .command('update <id> <content>')
    .description('更新日志')
    .action((id: string, content: string) => {
      const entry = repo.update(id, content);
      if (entry) {
        const date = new Date(entry.createdAt).toISOString().slice(0, 10);
        appendEntry(date, 'log', `[UPDATE] ${content}`);
        console.log(JSON.stringify({ ok: true, entry }));
      } else {
        console.log(JSON.stringify({ ok: false, error: 'Not found' }));
      }
    });

  log
    .command('delete <id>')
    .description('删除日志')
    .action((id: string) => {
      repo.delete(id);
      console.log(JSON.stringify({ ok: true }));
    });
}