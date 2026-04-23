// src/main/tray.ts
import { Tray, Menu, nativeImage, app } from 'electron';
import { join } from 'path';

let tray: Tray | null = null;

export function createTray(mainWindow: Electron.BrowserWindow | null): void {
  const iconPath = join(__dirname, '../../resources/icon.png');
  let icon = nativeImage.createEmpty();
  try {
    icon = nativeImage.createFromPath(iconPath).resize({ width: 16, height: 16 });
  } catch {}
  tray = new Tray(icon);

  const contextMenu = Menu.buildFromTemplate([
    { label: '显示窗口', click: () => mainWindow?.show() },
    { label: '新建日志', click: () => mainWindow?.webContents.send('action:newLog') },
    { label: 'AI 对话', click: () => mainWindow?.webContents.send('action:openAI') },
    { type: 'separator' },
    { label: '退出', click: () => app.quit() },
  ]);

  tray.setToolTip('AI 生活记录助手');
  tray.setContextMenu(contextMenu);
  tray.on('double-click', () => mainWindow?.show());
}