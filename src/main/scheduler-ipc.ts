// src/main/scheduler-ipc.ts
import { BrowserWindow } from 'electron';
import { scheduler } from '../core/scheduler/scheduler.js';
import { getProvider } from '../core/ai/index.js';
import { LogRepository } from '../core/db/repositories/log.repository.js';

const logRepo = new LogRepository();

export function registerScheduler(): void {
  scheduler.register('evening-reminder', '晚安提醒', '0 22 * * *', () => {
    const windows = BrowserWindow.getAllWindows();
    windows.forEach(win => win.webContents.send('scheduler:prompt', {
      title: '晚安提醒',
      message: '今天有什么想记录的吗？',
    }));
  });

  scheduler.register('daily-summary', '每日摘要', '0 8 * * *', async () => {
    try {
      const provider = getProvider();
      const today = Date.now() - 86400000;
      const logs = logRepo.list(today, 20);
      const summary = `今日有 ${logs.length} 条日志，请生成摘要。`;
      await provider.chat([{ role: 'user', content: summary }]);
      const windows = BrowserWindow.getAllWindows();
      windows.forEach(win => win.webContents.send('scheduler:summary', { logs: logs.length }));
    } catch (e) {
      console.error('Daily summary failed:', e);
    }
  });

  scheduler.start();
}

export function setPowerState(state: 'online' | 'sleep'): void {
  scheduler.setPowerState(state);
}