import { ipcMain, shell } from 'electron';
import type { EventType, RecordSearchQuery, TimelineQuery } from '../shared/types.js';
import { createProvider, getProvider } from '../core/ai/index.js';
import { recordService } from '../core/records/record.service.js';

export function registerIpcHandlers(): void {
  ipcMain.handle('record:createLog', (_, content: string, tags?: string[]) =>
    recordService.createLog(content, tags)
  );
  ipcMain.handle('record:listLogs', (_, query?: Omit<TimelineQuery, 'type' | 'eventType'>) =>
    recordService.listLogs(query ?? {})
  );
  ipcMain.handle(
    'record:createEvent',
    (_, type: EventType, content: string, metadata?: object, tags?: string[]) =>
      recordService.createEvent(type, content, metadata as Record<string, unknown> | undefined, tags)
  );
  ipcMain.handle('record:listTimeline', (_, query?: TimelineQuery) =>
    recordService.listTimeline(query ?? {})
  );
  ipcMain.handle('record:search', (_, query: RecordSearchQuery) =>
    recordService.searchRecords(query)
  );
  ipcMain.handle('record:getDailyMarkdown', (_, date?: string) =>
    recordService.getDailyMarkdown(date)
  );
  ipcMain.handle('record:openDailyMarkdown', async (_, date?: string) => {
    const markdown = recordService.getDailyMarkdown(date);
    const error = await shell.openPath(markdown.filePath);
    return { ok: error.length === 0, filePath: markdown.filePath, error };
  });
  ipcMain.handle('record:delete', (_, id: string) => {
    recordService.deleteRecord(id);
    return { ok: true };
  });

  ipcMain.handle('log:new', (_, content: string) => recordService.createLog(content));
  ipcMain.handle('log:list', (_, since?: number) => recordService.listLogs({ since }));
  ipcMain.handle('log:update', (_, id: string, content: string) => recordService.updateLog(id, content));
  ipcMain.handle('log:delete', (_, id: string) => {
    recordService.deleteRecord(id);
    return { ok: true };
  });

  ipcMain.handle('event:add', (_, type: EventType, content: string, metadata?: object, tags?: string[]) =>
    recordService.createEvent(type, content, metadata as Record<string, unknown> | undefined, tags)
  );
  ipcMain.handle('event:list', (_, type?: EventType, since?: number) =>
    recordService.listEvents({ eventType: type, since })
  );
  ipcMain.handle('event:delete', (_, id: string) => {
    recordService.deleteRecord(id);
    return { ok: true };
  });

  ipcMain.handle('ai:chat', async (_, messages) => {
    const provider = getProvider();
    return provider.chat(messages);
  });

  ipcMain.handle('ai:chatStream', async (event, messages) => {
    const provider = getProvider();
    const stream = provider.chatStream(messages);
    for await (const chunk of stream) {
      event.sender.send('ai:chunk', chunk);
    }
  });

  ipcMain.handle('config:setProvider', (_, type, apiKey) => {
    createProvider(type, apiKey);
    return { ok: true };
  });
}
