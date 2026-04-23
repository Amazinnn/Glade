import { BrowserWindow } from 'electron';
import { scheduler } from '../core/scheduler/scheduler.js';
import { getProvider } from '../core/ai/index.js';
import { recordService } from '../core/records/record.service.js';

export function registerScheduler(): void {
  scheduler.register('evening-reminder', '晚安提醒', '0 22 * * *', () => {
    const windows = BrowserWindow.getAllWindows();
    windows.forEach((win) => win.webContents.send('scheduler:prompt', {
      title: '晚安提醒',
      message: '今天有什么想轻轻放进 Glade 吗？',
    }));
  });

  scheduler.register('daily-summary', '每日摘要', '0 8 * * *', async () => {
    try {
      const provider = getProvider();
      const today = Date.now() - 86400000;
      const logs = recordService.listLogs({ since: today, limit: 20 });
      const prompt = `今天有 ${logs.length} 条生活记录。请用温和、不评判的语气整理成三句话。`;
      await provider.chat([{ role: 'user', content: prompt }]);
      const windows = BrowserWindow.getAllWindows();
      windows.forEach((win) => win.webContents.send('scheduler:summary', { logs: logs.length }));
    } catch (error) {
      console.error('Daily summary failed:', error);
    }
  });

  scheduler.start();
}

export function setPowerState(state: 'online' | 'sleep'): void {
  scheduler.setPowerState(state);
}
