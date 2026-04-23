import { Command } from 'commander';
import { recordService } from '../../core/records/record.service.js';
import { printError, printOk } from '../output.js';

interface LogListOptions {
  date?: string;
  since?: string;
  limit?: string;
}

export function registerLogCommands(program: Command): void {
  const log = program.command('log').description('日志管理');

  log
    .command('new <content>')
    .description('新建日志')
    .option('--tags <tags>', '标签，逗号分隔')
    .action((content: string, opts: { tags?: string }) => {
      try {
        const tags = opts.tags ? opts.tags.split(',').map((tag) => tag.trim()).filter(Boolean) : [];
        const entry = recordService.createLog(content, tags);
        printOk({ entry });
      } catch (error) {
        printError(error);
      }
    });

  log
    .command('list')
    .option('--date <date>', '按日期查看，格式 YYYY-MM-DD')
    .option('--since <ms>', '只看最近 ms 毫秒的日志')
    .option('--limit <n>', '最多返回条数', '100')
    .description('列出日志')
    .action((opts: LogListOptions) => {
      try {
        const entries = recordService.listLogs({
          date: opts.date,
          since: opts.since ? Number(opts.since) : undefined,
          limit: opts.limit ? Number(opts.limit) : 100,
        });
        printOk({ entries });
      } catch (error) {
        printError(error);
      }
    });

  log
    .command('update <id> <content>')
    .description('更新日志索引内容，不改写 Markdown 历史块')
    .action((id: string, content: string) => {
      try {
        const entry = recordService.updateLog(id, content);
        if (!entry) {
          printError(new Error('Record not found'), 'NOT_FOUND');
          return;
        }
        printOk({ entry });
      } catch (error) {
        printError(error);
      }
    });

  log
    .command('delete <id>')
    .description('软删除日志')
    .action((id: string) => {
      try {
        recordService.deleteRecord(id);
        printOk({ id });
      } catch (error) {
        printError(error);
      }
    });
}
