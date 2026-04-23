// src/cli/commands/event.ts
import { Command } from 'commander';
import { EventRepository } from '../../core/db/repositories/event.repository.js';

const repo = new EventRepository();

export function registerEventCommands(program: Command): void {
  const event = program.command('event').description('事件管理');

  event
    .command('add')
    .requiredOption('--type <type>', '事件类型（expense/workout/sleep/task/custom）')
    .requiredOption('--content <content>', '事件内容')
    .option('--amount <n>', '金额（expense 类型）')
    .option('--tags <tags>', '标签，逗号分隔')
    .description('添加事件')
    .action((opts) => {
      const metadata: Record<string, unknown> = {};
      if (opts.amount) metadata.amount = parseFloat(opts.amount);
      const tags = opts.tags ? opts.tags.split(',') : [];
      const entry = repo.create(opts.type as any, opts.content, metadata, tags);
      console.log(JSON.stringify({ ok: true, entry }));
    });

  event
    .command('list')
    .option('--type <type>', '事件类型')
    .option('--since <ms>', '只看最近 ms 毫秒')
    .option('--limit <n>', '最多返回条数', '100')
    .description('列出事件')
    .action((opts) => {
      const since = opts.since ? parseInt(opts.since) : undefined;
      const limit = parseInt(opts.limit);
      let entries;
      if (opts.type) {
        entries = repo.listByType(opts.type as any, since, limit);
      } else {
        entries = [];
      }
      console.log(JSON.stringify({ ok: true, entries }));
    });

  event
    .command('delete <id>')
    .description('删除事件')
    .action((id: string) => {
      repo.delete(id);
      console.log(JSON.stringify({ ok: true }));
    });
}