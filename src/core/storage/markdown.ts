import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import type { EventType, RecordKind } from '../../shared/types.js';

export interface MarkdownEntry {
  date: string;
  type: 'log' | 'conversation';
  content: string;
  timestamp: number;
}

export interface JournalRecordBlock {
  id: string;
  kind: RecordKind;
  eventType?: EventType;
  content: string;
  createdAt: number;
  anchor: string;
}

function pad(value: number): string {
  return String(value).padStart(2, '0');
}

export function getDateKey(timestamp = Date.now()): string {
  const date = new Date(timestamp);
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function getTimeKey(timestamp = Date.now()): string {
  const date = new Date(timestamp);
  return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function getDataDir(): string {
  const home = process.env.APPDATA || process.env.HOME || '.';
  return join(home, 'ai-life-assistant', 'data');
}

export function ensureDataLayout(): void {
  const dataDir = getDataDir();
  const dirs = [
    dataDir,
    join(dataDir, 'journal'),
    join(dataDir, 'reviews', 'daily'),
    join(dataDir, 'reviews', 'weekly'),
    join(dataDir, 'reviews', 'monthly'),
    join(dataDir, 'indexes', 'topics'),
    join(dataDir, 'attachments'),
    join(dataDir, '.aisnap'),
  ];

  for (const dir of dirs) {
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  }

  ensureIndexFile('tasks.md', '# Tasks\n\nTasks will grow from life records.\n');
  ensureIndexFile('health.md', '# Health\n\nHealth notes will grow from life records.\n');
  ensureIndexFile('study.md', '# Study\n\nStudy notes will grow from life records.\n');
}

function ensureIndexFile(name: string, content: string): void {
  const filePath = join(getDataDir(), 'indexes', name);
  if (!existsSync(filePath)) writeFileSync(filePath, content, 'utf-8');
}

export function getJournalFilePath(date: string): string {
  const [year, month] = date.split('-');
  const dir = join(getDataDir(), 'journal', year, month);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  return join(dir, `${date}.md`);
}

export function ensureDailyJournal(date = getDateKey()): string {
  ensureDataLayout();
  const filePath = getJournalFilePath(date);
  if (!existsSync(filePath)) {
    writeFileSync(filePath, `# ${date}\n\n`, 'utf-8');
  }
  return filePath;
}

function getLegacyFilePath(date: string, type: 'logs' | 'conversations'): string {
  const dir = join(getDataDir(), type);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  return join(dir, `${date}.md`);
}

function recordTitle(block: JournalRecordBlock): string {
  if (block.kind === 'log') return '随手记录';
  const labels: Record<string, string> = {
    task: '任务',
    health: '健康',
    study: '学习',
    expense: '花费',
    custom: '事件',
    workout: '健康',
    sleep: '休息',
  };
  return labels[block.eventType ?? 'custom'] ?? '事件';
}

export function appendJournalRecord(block: JournalRecordBlock): { filePath: string; anchor: string; date: string } {
  ensureDataLayout();
  const date = getDateKey(block.createdAt);
  const filePath = getJournalFilePath(date);
  const created = new Date(block.createdAt).toISOString();
  const header = existsSync(filePath) ? '' : `# ${date}\n\n`;
  const entry = [
    `<!-- ai-life:id=${block.id} type=${block.kind} created=${created} -->`,
    `### ${getTimeKey(block.createdAt)} · ${recordTitle(block)}`,
    '',
    block.content,
    '',
    '',
  ].join('\n');

  const existing = existsSync(filePath) ? readFileSync(filePath, 'utf-8') : '';
  writeFileSync(filePath, `${header}${existing}${entry}`, 'utf-8');
  return { filePath, anchor: block.anchor, date };
}

export function readDailyJournal(date: string): string {
  const filePath = ensureDailyJournal(date);
  return readFileSync(filePath, 'utf-8');
}

export function listJournalDates(): string[] {
  const journalDir = join(getDataDir(), 'journal');
  if (!existsSync(journalDir)) return [];
  const dates: string[] = [];
  for (const year of readdirSync(journalDir)) {
    const yearDir = join(journalDir, year);
    if (!existsSync(yearDir)) continue;
    for (const month of readdirSync(yearDir)) {
      const monthDir = join(yearDir, month);
      if (!existsSync(monthDir)) continue;
      for (const file of readdirSync(monthDir)) {
        if (file.endsWith('.md')) dates.push(file.replace('.md', ''));
      }
    }
  }
  return dates.sort().reverse();
}

export function appendEntry(date: string, type: 'log' | 'conversation', content: string): void {
  const filePath = getLegacyFilePath(date, type === 'log' ? 'logs' : 'conversations');
  const header = `## ${date} ${new Date().toTimeString().slice(0, 8)}\n`;
  const entry = header + content + '\n\n';
  if (existsSync(filePath)) {
    writeFileSync(filePath, readFileSync(filePath, 'utf-8') + entry, 'utf-8');
  } else {
    mkdirSync(dirname(filePath), { recursive: true });
    writeFileSync(filePath, `# ${date}\n\n${entry}`, 'utf-8');
  }
}

export function readEntries(date: string, type: 'log' | 'conversation'): string {
  const filePath = getLegacyFilePath(date, type === 'log' ? 'logs' : 'conversations');
  if (!existsSync(filePath)) return '';
  return readFileSync(filePath, 'utf-8');
}

export function listLogDates(): string[] {
  const legacyDates = listLegacyLogDates();
  const journalDates = listJournalDates();
  return Array.from(new Set([...journalDates, ...legacyDates])).sort().reverse();
}

function listLegacyLogDates(): string[] {
  const logsDir = join(getDataDir(), 'logs');
  if (!existsSync(logsDir)) return [];
  return readdirSync(logsDir)
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.replace('.md', ''));
}
