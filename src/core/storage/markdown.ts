// src/core/storage/markdown.ts
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'fs';
import { join } from 'path';

export interface MarkdownEntry {
  date: string;
  type: 'log' | 'conversation';
  content: string;
  timestamp: number;
}

function getDataDir(): string {
  const home = process.env.APPDATA || process.env.HOME || '.';
  return join(home, 'ai-life-assistant', 'data');
}

function getFilePath(date: string, type: 'logs' | 'conversations'): string {
  const dir = join(getDataDir(), type);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  return join(dir, `${date}.md`);
}

export function appendEntry(date: string, type: 'log' | 'conversation', content: string): void {
  const filePath = getFilePath(date, type === 'log' ? 'logs' : 'conversations');
  const header = `## ${date} ${new Date().toTimeString().slice(0, 8)}\n`;
  const entry = header + content + '\n\n';
  if (existsSync(filePath)) {
    writeFileSync(filePath, readFileSync(filePath, 'utf-8') + entry, 'utf-8');
  } else {
    writeFileSync(filePath, `# ${date}\n\n${entry}`, 'utf-8');
  }
}

export function readEntries(date: string, type: 'log' | 'conversation'): string {
  const filePath = getFilePath(date, type === 'log' ? 'logs' : 'conversations');
  if (!existsSync(filePath)) return '';
  return readFileSync(filePath, 'utf-8');
}

export function listLogDates(): string[] {
  const logsDir = join(getDataDir(), 'logs');
  if (!existsSync(logsDir)) return [];
  return readdirSync(logsDir)
    .filter(f => f.endsWith('.md'))
    .map(f => f.replace('.md', ''))
    .sort()
    .reverse();
}

export { getDataDir };