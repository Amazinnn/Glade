// src/main/ipc.ts
import { ipcMain } from 'electron';
import { LogRepository } from '../core/db/repositories/log.repository.js';
import { EventRepository } from '../core/db/repositories/event.repository.js';
import { createProvider, getProvider } from '../core/ai/index.js';

const logRepo = new LogRepository();
const eventRepo = new EventRepository();

export function registerIpcHandlers(): void {
  ipcMain.handle('log:new', (_, content: string) => logRepo.create(content));
  ipcMain.handle('log:list', (_, since?: number) => logRepo.list(since));
  ipcMain.handle('log:update', (_, id: string, content: string) => logRepo.update(id, content));
  ipcMain.handle('log:delete', (_, id: string) => logRepo.delete(id));

  ipcMain.handle('event:add', (_, type, content, metadata, tags) =>
    eventRepo.create(type, content, metadata, tags)
  );
  ipcMain.handle('event:list', (_, type, since?: number) =>
    eventRepo.listByType(type, since)
  );
  ipcMain.handle('event:delete', (_, id: string) => eventRepo.delete(id));

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