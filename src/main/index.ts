// src/main/index.ts
import { app, BrowserWindow } from 'electron';
import { join } from 'path';
import { initDatabase } from '../core/db/index.js';
import { getDataDir } from '../core/storage/markdown.js';
import { registerIpcHandlers } from './ipc.js';
import { createTray } from './tray.js';
import { registerScheduler } from './scheduler-ipc.js';

let mainWindow: BrowserWindow | null = null;

app.on('window-all-closed', () => {
  // 不退出，后台运行
});

app.whenReady().then(async () => {
  try {
    await initDatabase(getDataDir());
  } catch (e) {
    console.error('initDatabase failed:', e);
  }

  mainWindow = new BrowserWindow({
    title: 'Glade',
    width: 1200,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    webPreferences: {
      preload: join(__dirname, '../preload/index.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
    },
    frame: true,
    show: false,
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }

  mainWindow.once('ready-to-show', () => mainWindow?.show());

  registerIpcHandlers();
  registerScheduler();
  createTray(mainWindow);
});

app.on('activate', () => {
  mainWindow?.show();
});
