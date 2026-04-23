import { Command } from 'commander';
import type { EventType } from '../../shared/types.js';
import { recordService } from '../../core/records/record.service.js';
import { printError, printOk } from '../output.js';

interface EventAddOptions {
  type: EventType;
  content: string;
  amount?: string;
  tags?: string;
}

interface EventListOptions {
  type?: EventType;
  date?: string;
  since?: string;
  limit?: string;
}

export function registerEventCommands(program: Command): void {
  const event = program.command('event').description('事件管理');

  event
    .command('add')
    .requiredOption('--type <type>', '事件类型（task/health/study/expense/custom）')
    .requiredOption('--content <content>', '事件内容')
    .option('--amount <n>', '金额（expense 类型）')
    .option('--tags <tags>', '标签，逗号分隔')
    .description('添加事件')
    .action((opts: EventAddOptions) => {
      try {
        const metadata: Record<string, unknown> = {};
        if (opts.amount) metadata.amount = Number(opts.amount);
        const tags = opts.tags ? opts.tags.split(',').map((tag) => tag.trim()).filter(Boolean) : [];
        const entry = recordService.createEvent(opts.type, opts.content, metadata, tags);
        printOk({ entry });
      } catch (error) {
        printError(error);
      }
    });

  event
    .command('list')
    .option('--type <type>', '事件类型')
    .option('--date <date>', '按日期查看，格式 YYYY-MM-DD')
    .option('--since <ms>', '只看最近 ms 毫秒')
    .option('--limit <n>', '最多返回条数', '100')
    .description('列出事件')
    .action((opts: EventListOptions) => {
      try {
        const entries = recordService.listEvents({
          eventType: opts.type,
          date: opts.date,
          since: opts.since ? Number(opts.since) : undefined,
          limit: opts.limit ? Number(opts.limit) : 100,
        });
        printOk({ entries });
      } catch (error) {
        printError(error);
      }
    });

  event
    .command('delete <id>')
    .description('软删除事件')
    .action((id: string) => {
      try {
        recordService.deleteRecord(id);
        printOk({ id });
      } catch (error) {
        printError(error);
      }
    });
}
