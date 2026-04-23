import { Command } from 'commander';
import type { EventType, RecordKind } from '../../shared/types.js';
import { recordService } from '../../core/records/record.service.js';
import { printError, printOk } from '../output.js';

interface SearchOptions {
  type?: RecordKind | EventType;
  from?: string;
  to?: string;
  tags?: string;
  limit?: string;
}

export function registerSearchCommands(program: Command): void {
  program
    .command('search <query>')
    .description('搜索记录')
    .option('--type <type>', '记录类型：log/event/task/health/study/expense/custom')
    .option('--from <date>', '开始日期 YYYY-MM-DD')
    .option('--to <date>', '结束日期 YYYY-MM-DD')
    .option('--tags <tags>', '标签，逗号分隔')
    .option('--limit <n>', '最多返回条数', '20')
    .action((query: string, opts: SearchOptions) => {
      try {
        const results = recordService.searchRecords({
          query,
          type: opts.type,
          dateFrom: opts.from,
          dateTo: opts.to,
          tags: opts.tags ? opts.tags.split(',').map((tag) => tag.trim()).filter(Boolean) : undefined,
          limit: opts.limit ? Number(opts.limit) : 20,
        });
        printOk({ results });
      } catch (error) {
        printError(error);
      }
    });
}
