import { copyFileSync, existsSync, mkdirSync, readdirSync, statSync } from 'fs';
import { dirname, join, relative } from 'path';
import { ensureDataLayout, getDataDir } from './markdown.js';

function getBackupDir(): string {
  const backup = join(getDataDir(), '.aisnap');
  if (!existsSync(backup)) mkdirSync(backup, { recursive: true });
  return backup;
}

function copyTree(source: string, target: string): void {
  if (!existsSync(source)) return;
  const stats = statSync(source);
  if (stats.isDirectory()) {
    mkdirSync(target, { recursive: true });
    for (const item of readdirSync(source)) {
      copyTree(join(source, item), join(target, item));
    }
    return;
  }
  mkdirSync(dirname(target), { recursive: true });
  copyFileSync(source, target);
}

export function createBackup(): string {
  ensureDataLayout();
  const backupDir = getBackupDir();
  const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
  const backupPath = join(backupDir, `backup-${timestamp}`);
  mkdirSync(backupPath, { recursive: true });

  const dataDir = getDataDir();
  for (const item of ['ai-life.db', 'journal', 'reviews', 'indexes', 'attachments']) {
    const source = join(dataDir, item);
    const target = join(backupPath, relative(dataDir, source));
    copyTree(source, target);
  }

  return backupPath;
}

export function listBackups(): { path: string; date: string }[] {
  const backupDir = getBackupDir();
  if (!existsSync(backupDir)) return [];
  return readdirSync(backupDir)
    .filter((dir) => dir.startsWith('backup-'))
    .map((dir) => ({ path: join(backupDir, dir), date: dir.replace('backup-', '') }))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function restoreBackup(path: string): void {
  const dataDir = getDataDir();
  for (const item of ['ai-life.db', 'journal', 'reviews', 'indexes', 'attachments']) {
    copyTree(join(path, item), join(dataDir, item));
  }
}

export function autoRecovery(): void {
  const dataDir = getDataDir();
  const dbPath = join(dataDir, 'ai-life.db');
  if (!existsSync(dbPath)) {
    const backups = listBackups();
    if (backups.length > 0) {
      console.log(`Database missing, restoring from ${backups[0].path}`);
      restoreBackup(backups[0].path);
    }
  }
}
