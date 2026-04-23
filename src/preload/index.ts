import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
  record: {
    createLog: (content: string, tags?: string[]) =>
      ipcRenderer.invoke('record:createLog', content, tags),
    listLogs: (query?: object) => ipcRenderer.invoke('record:listLogs', query),
    createEvent: (type: string, content: string, metadata?: object, tags?: string[]) =>
      ipcRenderer.invoke('record:createEvent', type, content, metadata, tags),
    listTimeline: (query?: object) => ipcRenderer.invoke('record:listTimeline', query),
    search: (query: object) => ipcRenderer.invoke('record:search', query),
    getDailyMarkdown: (date?: string) => ipcRenderer.invoke('record:getDailyMarkdown', date),
    openDailyMarkdown: (date?: string) => ipcRenderer.invoke('record:openDailyMarkdown', date),
    delete: (id: string) => ipcRenderer.invoke('record:delete', id),
  },
  log: {
    new: (content: string) => ipcRenderer.invoke('log:new', content),
    list: (since?: number) => ipcRenderer.invoke('log:list', since),
    update: (id: string, content: string) => ipcRenderer.invoke('log:update', id, content),
    delete: (id: string) => ipcRenderer.invoke('log:delete', id),
  },
  event: {
    add: (type: string, content: string, metadata?: object, tags?: string[]) =>
      ipcRenderer.invoke('event:add', type, content, metadata, tags),
    list: (type?: string, since?: number) => ipcRenderer.invoke('event:list', type, since),
    delete: (id: string) => ipcRenderer.invoke('event:delete', id),
  },
  ai: {
    chat: (messages: any[]) => ipcRenderer.invoke('ai:chat', messages),
    chatStream: (messages: any[]) => ipcRenderer.invoke('ai:chatStream', messages),
    onChunk: (callback: (chunk: string) => void) => {
      ipcRenderer.on('ai:chunk', (_, chunk) => callback(chunk));
    },
  },
  config: {
    setProvider: (type: string, apiKey: string) =>
      ipcRenderer.invoke('config:setProvider', type, apiKey),
  },
  on: (channel: string, callback: (...args: any[]) => void) => {
    ipcRenderer.on(channel, (_, ...args) => callback(...args));
  },
});
