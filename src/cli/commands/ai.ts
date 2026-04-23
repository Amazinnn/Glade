import { Command } from 'commander';
import { getProvider } from '../../core/ai/index.js';
import { recordService } from '../../core/records/record.service.js';
import { printError, printOk } from '../output.js';

export function registerAICommands(program: Command): void {
  const ai = program.command('ai').description('AI 整理');

  ai
    .command('chat <message>')
    .description('和 AI 对话')
    .action(async (message: string) => {
      try {
        const provider = getProvider();
        const reply = await provider.chat([{ role: 'user', content: message }]);
        printOk({ reply });
      } catch (error) {
        printError(error);
      }
    });

  ai
    .command('summarize')
    .description('整理今天的记录')
    .action(async () => {
      try {
        const provider = getProvider();
        const since = Date.now() - 86400000;
        const logs = recordService.listLogs({ since });
        const events = recordService.listEvents({ since });
        const context = [
          `今天的日志有 ${logs.length} 条，事件有 ${events.length} 条。`,
          '请用温和、不评判的语气，整理成三句简短摘要。',
        ].join('');
        const summary = await provider.chat([{ role: 'user', content: context }]);
        printOk({ summary });
      } catch (error) {
        printError(error);
      }
    });
}
