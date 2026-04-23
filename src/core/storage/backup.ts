// src/core/storage/backup.ts
import { existsSync, mkdirSync, copyFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { getDataDir } from './markdown.js';

function getBackupDir(): string {
  const backup = join(getDataDir(), '.aisnap');
  if (!existsSync(backup)) mkdirSync(backup, { recursive: true });
  return backup;
}

export function createBackup(): string {
  const backupDir = getBackupDir();
  const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
  const backupPath = join(backupDir, `backup-${timestamp}`);
  mkdirSync(backupPath, { recursive: true });

  const dataDir = getDataDir();
  const dbPath = join(dataDir, 'ai-life.db');
  if (existsSync(dbPath)) {
    copyFileSync(dbPath, join(backupPath, 'ai-life.db'));
  }

  const logsDir = join(dataDir, 'logs');
  const convDir = join(dataDir, 'conversations');
  for (const dir of [logsDir, convDir]) {
    if (!existsSync(dir)) continue;
    const files = readdirSync(dir).filter(f => f.endsWith('.md'));
    for (const file of files) {
      const age = Date.now() - new Date(file).getTime();
      if (age <= 7 * 86400000) {
        copyFileSync(join(dir, file), join(backupPath, file));
      }
    }
  }

  return backupPath;
}

export function listBackups(): { path: string; date: string }[] {
  const backupDir = getBackupDir();
  if (!existsSync(backupDir)) return [];
  return readdirSync(backupDir)
    .filter(d => d.startsWith('backup-'))
    .map(d => ({ path: join(backupDir, d), date: d.replace('backup-', '') }))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function restoreBackup(path: string): void {
  const dataDir = getDataDir();
  const dbBackup = join(path, 'ai-life.db');
  if (existsSync(dbBackup)) {
    copyFileSync(dbBackup, join(dataDir, 'ai-life.db'));
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