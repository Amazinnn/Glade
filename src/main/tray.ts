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
    { label: '新建记录', click: () => mainWindow?.webContents.send('action:newLog') },
    { label: '轻声整理', click: () => mainWindow?.webContents.send('action:openAI') },
    { type: 'separator' },
    { label: '退出', click: () => app.quit() },
  ]);

  tray.setToolTip('Glade');
  tray.setContextMenu(contextMenu);
  tray.on('double-click', () => mainWindow?.show());
}
