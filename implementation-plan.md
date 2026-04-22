# AI生活记录助手 — 实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 搭建 AI 生活记录助手 MVP，包含 CLI 内核 + Electron GUI + SQLite 存储 + Markdown 文件 + AI 对话。

**Architecture:** 整体分为三层：CLI 内核（Node.js/TS，核心业务逻辑）→ IPC 桥接层（Electron 主进程）→ GUI 渲染层（三面板 React 界面）。CLI 内核独立可运行，被 GUI 和外部 Agent 调用。

**Tech Stack:** TypeScript, Electron (main + renderer), better-sqlite3, React, Vite, commander.js (CLI), electron-builder (打包)

---

## 项目结构

```
ai-life-assistant/
├── src/
│   ├── cli/                    # CLI 入口，命令行解析
│   │   ├── index.ts             # CLI 主入口
│   │   ├── commands/            # log/event/ai/search 子命令
│   │   └── cli.ts              # commander.js 配置
│   ├── core/                    # 核心业务逻辑（CLI 和 GUI 共用）
│   │   ├── db/                  # SQLite 操作
│   │   │   ├── index.ts         # 数据库初始化 + 连接池
│   │   │   ├── migrations/       # 迁移文件
│   │   │   └── repositories/    # 日志/事件/embedding 仓储
│   │   ├── storage/             # Markdown 文件操作
│   │   │   └── markdown.ts      # 按日期读写 Markdown
│   │   ├── ai/                  # AI Provider
│   │   │   ├── provider.ts      # Provider 接口定义
│   │   │   └── providers/       # OpenAI / Claude 实现
│   │   ├── scheduler/           # 定时任务调度器
│   │   │   └── scheduler.ts     # 内置 cron 解析 + 任务队列
│   │   └── search/              # 检索引擎（FTS + embedding）
│   │       └── engine.ts        # 双层检索：SQLite → Markdown
│   ├── main/                    # Electron 主进程
│   │   ├── index.ts             # Electron 入口
│   │   ├── ipc.ts               # IPC 处理器（桥接 CLI 核心）
│   │   └── tray.ts              # 系统托盘
│   ├── renderer/                 # Electron 渲染进程（React GUI）
│   │   ├── App.tsx              # 三面板主界面
│   │   ├── components/           # 日志面板 / 事件面板 / AI 对话面板
│   │   └── hooks/               # IPC 调用 hooks
│   └── shared/                   # 共享类型定义
│       └── types.ts             # Log, Event, Message 等类型
├── package.json
├── tsconfig.json
├── vite.config.ts              # Vite + electron-vite
├── electron-builder.yml         # 打包配置
└── README.md
```

---

## Task 1: 项目初始化

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `vite.config.ts`
- Create: `electron-builder.yml`

- [ ] **Step 1: 创建 package.json**

```json
{
  "name": "ai-life-assistant",
  "version": "1.0.0",
  "description": "本地 AI 生活记录助手（CLI + GUI）",
  "type": "module",
  "main": "dist/main/index.js",
  "bin": {
    "ai-life": "dist/cli/index.js"
  },
  "scripts": {
    "dev": "electron-vite dev",
    "build": "electron-vite build",
    "package": "electron-vite build && electron-builder --win portable",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "better-sqlite3": "^11.0.0",
    "commander": "^12.0.0",
    "electron": "^33.0.0",
    "openai": "^4.50.0",
    "uuid": "^10.0.0"
  },
  "devDependencies": {
    "@anthropic-ai/sdk": "^0.30.0",
    "@types/better-sqlite3": "^7.6.11",
    "@types/node": "^22.0.0",
    "@types/uuid": "^10.0.0",
    "electron-builder": "^25.0.0",
    "electron-vite": "^2.3.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "typescript": "^5.5.0",
    "vite": "^5.4.0"
  }
}
```

- [ ] **Step 2: 创建 tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "outDir": "dist",
    "rootDir": "src",
    "declaration": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "jsx": "react-jsx"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

- [ ] **Step 3: 创建 vite.config.ts（electron-vite 风格）**

```typescript
import { defineConfig } from 'electron-vite';
import { resolve } from 'path';

export default defineConfig({
  main: {
    build: {
      rollupOptions: {
        input: {
          index: resolve(__dirname, 'src/main/index.ts'),
        },
      },
    },
  },
  preload: {
    build: {
      rollupOptions: {
        input: {
          index: resolve(__dirname, 'src/preload/index.ts'),
        },
      },
    },
  },
  renderer: {
    root: 'src/renderer',
    build: {
      rollupOptions: {
        input: {
          index: resolve(__dirname, 'src/renderer/index.html'),
        },
      },
    },
  },
});
```

- [ ] **Step 4: 创建 electron-builder.yml**

```yaml
appId: com.ailife.assistant
productName: AI生活记录助手
directories:
  buildResources: build
  output: release
win:
  target:
    - target: portable
      arch:
        - x64
  artifactName: "${productName}-${version}-portable.${ext}"
electronDownload:
  mirror: https://npmmirror.com/mirrors/electron/
```

- [ ] **Step 5: Commit**

```bash
git init
git add package.json tsconfig.json vite.config.ts electron-builder.yml
git commit -m "feat: 项目初始化，配置 Electron + Vite + React + TypeScript"
```

---

## Task 2: 共享类型定义

**Files:**
- Create: `src/shared/types.ts`

- [ ] **Step 1: 创建类型定义**

```typescript
// src/shared/types.ts

export type EventType = 'expense' | 'workout' | 'sleep' | 'task' | 'custom';

export interface LogEntry {
  id: string;
  content: string;       // Markdown 原文
  summary?: string;       // AI 生成的摘要
  tags: string[];
  createdAt: number;      // Unix timestamp ms
  updatedAt: number;
}

export interface EventEntry {
  id: string;
  type: EventType;
  content: string;
  metadata: Record<string, unknown>;  // 类型相关字段，如 expense 的 amount
  tags: string[];
  createdAt: number;
  updatedAt: number;
}

export interface Embedding {
  id: string;
  recordType: 'log' | 'event';
  recordId: string;
  provider: string;        // 'openai' | 'claude'
  model: string;
  vector: Float32Array;
  createdAt: number;
}

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
}

export interface Conversation {
  id: string;
  messages: Message[];
  createdAt: number;
  updatedAt: number;
}

export interface ScheduledTask {
  id: string;
  name: string;
  schedule: string;       // cron 表达式，如 "0 22 * * *"
  enabled: boolean;
  lastRun?: number;
  nextRun?: number;
}

export interface SearchResult {
  type: 'log' | 'event';
  id: string;
  score: number;          // 相似度分数
  excerpt: string;         // 匹配片段
  filePath?: string;       // Markdown 文件路径
}

export interface AppConfig {
  dataDir: string;         // 数据存放目录
  aiProvider: 'openai' | 'claude';
  apiKey: string;
  model: string;
  scheduledTasks: ScheduledTask[];
  quietHours: { start: string; end: string };  // 免打扰时段，如 "22:00-08:00"
}
```

- [ ] **Step 2: Commit**

```bash
git add src/shared/types.ts
git commit -m "feat: 添加共享类型定义（LogEntry, EventEntry, Message 等）"
```

---

## Task 3: SQLite 数据库层

**Files:**
- Create: `src/core/db/index.ts`
- Create: `src/core/db/migrations/001_initial.sql`
- Create: `src/core/db/repositories/log.repository.ts`
- Create: `src/core/db/repositories/event.repository.ts`
- Create: `src/core/db/repositories/embedding.repository.ts`

- [ ] **Step 1: 创建迁移 SQL（001_initial.sql）**

```sql
-- 结构化事件
CREATE TABLE IF NOT EXISTS events (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  content TEXT NOT NULL,
  metadata TEXT DEFAULT '{}',
  tags TEXT DEFAULT '',
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_events_created ON events(created_at);
CREATE INDEX IF NOT EXISTS idx_events_type ON events(type);

-- 日志（作为事件的一个特例，但内容更自由）
CREATE TABLE IF NOT EXISTS logs (
  id TEXT PRIMARY KEY,
  content TEXT NOT NULL,
  summary TEXT DEFAULT '',
  tags TEXT DEFAULT '',
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_logs_created ON logs(created_at);

-- Embedding 向量
CREATE TABLE IF NOT EXISTS embeddings (
  id TEXT PRIMARY KEY,
  record_type TEXT NOT NULL,
  record_id TEXT NOT NULL,
  provider TEXT NOT NULL,
  model TEXT NOT NULL,
  vector BLOB NOT NULL,
  created_at INTEGER NOT NULL,
  UNIQUE(record_type, record_id, provider)
);

CREATE INDEX IF NOT EXISTS idx_embeddings_record ON embeddings(record_type, record_id);

-- 定时任务
CREATE TABLE IF NOT EXISTS scheduled_tasks (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  schedule TEXT NOT NULL,
  enabled INTEGER DEFAULT 1,
  last_run INTEGER,
  next_run INTEGER
);

-- 配置
CREATE TABLE IF NOT EXISTS config (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);
```

- [ ] **Step 2: 创建数据库入口（index.ts）**

```typescript
// src/core/db/index.ts
import Database from 'better-sqlite3';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

let db: Database.Database;

export function initDatabase(dataDir: string): Database.Database {
  const dbPath = join(dataDir, 'ai-life.db');
  db = new Database(dbPath);
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');

  runMigrations(db);
  return db;
}

function runMigrations(db: Database.Database): void {
  const migration = readFileSync(join(__dirname, 'migrations', '001_initial.sql'), 'utf-8');
  db.exec(migration);
}

export function getDatabase(): Database.Database {
  if (!db) throw new Error('Database not initialized');
  return db;
}
```

- [ ] **Step 3: 创建日志仓储（log.repository.ts）**

```typescript
// src/core/db/repositories/log.repository.ts
import { v4 as uuid } from 'uuid';
import { getDatabase } from '../index';
import type { LogEntry } from '../../shared/types';

export class LogRepository {
  create(content: string, tags: string[] = []): LogEntry {
    const db = getDatabase();
    const now = Date.now();
    const id = uuid();
    db.prepare(
      'INSERT INTO logs (id, content, summary, tags, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)'
    ).run(id, content, '', tags.join(','), now, now);
    return this.getById(id)!;
  }

  update(id: string, content: string, tags?: string[]): LogEntry | null {
    const db = getDatabase();
    const now = Date.now();
    if (tags !== undefined) {
      db.prepare('UPDATE logs SET content=?, tags=?, updated_at=? WHERE id=?').run(content, tags.join(','), now, id);
    } else {
      db.prepare('UPDATE logs SET content=?, updated_at=? WHERE id=?').run(content, now, id);
    }
    return this.getById(id);
  }

  getById(id: string): LogEntry | null {
    const db = getDatabase();
    const row = db.prepare('SELECT * FROM logs WHERE id=?').get(id) as any;
    if (!row) return null;
    return {
      id: row.id,
      content: row.content,
      summary: row.summary,
      tags: row.tags ? row.tags.split(',') : [],
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  list(since?: number, limit = 100): LogEntry[] {
    const db = getDatabase();
    const rows = since
      ? db.prepare('SELECT * FROM logs WHERE created_at >= ? ORDER BY created_at DESC LIMIT ?').all(since, limit)
      : db.prepare('SELECT * FROM logs ORDER BY created_at DESC LIMIT ?').all(limit);
    return rows.map((row: any) => ({
      id: row.id,
      content: row.content,
      summary: row.summary,
      tags: row.tags ? row.tags.split(',') : [],
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }));
  }

  delete(id: string): void {
    getDatabase().prepare('DELETE FROM logs WHERE id=?').run(id);
  }
}
```

- [ ] **Step 4: 创建事件仓储（event.repository.ts）**

```typescript
// src/core/db/repositories/event.repository.ts
import { v4 as uuid } from 'uuid';
import { getDatabase } from '../index';
import type { EventEntry, EventType } from '../../shared/types';

export class EventRepository {
  create(type: EventType, content: string, metadata: Record<string, unknown> = {}, tags: string[] = []): EventEntry {
    const db = getDatabase();
    const now = Date.now();
    const id = uuid();
    db.prepare(
      'INSERT INTO events (id, type, content, metadata, tags, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)'
    ).run(id, type, content, JSON.stringify(metadata), tags.join(','), now, now);
    return this.getById(id)!;
  }

  update(id: string, content: string, metadata?: Record<string, unknown>, tags?: string[]): EventEntry | null {
    const db = getDatabase();
    const now = Date.now();
    const existing = this.getById(id);
    if (!existing) return null;
    const updated = {
      ...existing,
      content,
      metadata: metadata ?? existing.metadata,
      tags: tags ?? existing.tags,
    };
    db.prepare('UPDATE events SET content=?, metadata=?, tags=?, updated_at=? WHERE id=?')
      .run(updated.content, JSON.stringify(updated.metadata), updated.tags.join(','), now, id);
    return this.getById(id);
  }

  getById(id: string): EventEntry | null {
    const db = getDatabase();
    const row = db.prepare('SELECT * FROM events WHERE id=?').get(id) as any;
    if (!row) return null;
    return {
      id: row.id,
      type: row.type as EventType,
      content: row.content,
      metadata: JSON.parse(row.metadata || '{}'),
      tags: row.tags ? row.tags.split(',') : [],
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  listByType(type: EventType, since?: number, limit = 100): EventEntry[] {
    const db = getDatabase();
    const rows = since
      ? db.prepare('SELECT * FROM events WHERE type=? AND created_at >= ? ORDER BY created_at DESC LIMIT ?').all(type, since, limit)
      : db.prepare('SELECT * FROM events WHERE type=? ORDER BY created_at DESC LIMIT ?').all(type, limit);
    return rows.map((row: any) => ({
      id: row.id,
      type: row.type as EventType,
      content: row.content,
      metadata: JSON.parse(row.metadata || '{}'),
      tags: row.tags ? row.tags.split(',') : [],
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }));
  }

  delete(id: string): void {
    getDatabase().prepare('DELETE FROM events WHERE id=?').run(id);
  }
}
```

- [ ] **Step 5: 创建 Embedding 仓储（embedding.repository.ts）**

```typescript
// src/core/db/repositories/embedding.repository.ts
import { v4 as uuid } from 'uuid';
import { getDatabase } from '../index';
import type { Embedding } from '../../shared/types';

export class EmbeddingRepository {
  upsert(recordType: 'log' | 'event', recordId: string, provider: string, model: string, vector: Float32Array): Embedding {
    const db = getDatabase();
    const now = Date.now();
    const id = uuid();
    const vectorBlob = Buffer.from(vector.buffer);
    db.prepare(`
      INSERT INTO embeddings (id, record_type, record_id, provider, model, vector, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(record_type, record_id, provider) DO UPDATE SET
        model=excluded.model, vector=excluded.vector, created_at=excluded.created_at
    `).run(id, recordType, recordId, provider, model, vectorBlob, now);
    return { id, recordType, recordId, provider, model, vector, createdAt: now };
  }

  getByRecord(recordType: 'log' | 'event', recordId: string, provider: string): Embedding | null {
    const db = getDatabase();
    const row = db.prepare('SELECT * FROM embeddings WHERE record_type=? AND record_id=? AND provider=?').get(recordType, recordId, provider) as any;
    if (!row) return null;
    return {
      id: row.id,
      recordType: row.record_type as 'log' | 'event',
      recordId: row.record_id,
      provider: row.provider,
      model: row.model,
      vector: new Float32Array(row.vector.buffer),
      createdAt: row.created_at,
    };
  }

  listByType(recordType: 'log' | 'event'): { recordId: string; vector: Float32Array; provider: string }[] {
    const db = getDatabase();
    const rows = db.prepare('SELECT record_id, vector, provider FROM embeddings WHERE record_type=?').all(recordType) as any[];
    return rows.map(row => ({
      recordId: row.record_id,
      vector: new Float32Array(row.vector.buffer),
      provider: row.provider,
    }));
  }

  deleteByRecord(recordType: 'log' | 'event', recordId: string): void {
    getDatabase().prepare('DELETE FROM embeddings WHERE record_type=? AND record_id=?').run(recordType, recordId);
  }
}
```

- [ ] **Step 6: Commit**

```bash
git add src/core/db/index.ts src/core/db/migrations/001_initial.sql src/core/db/repositories/
git commit -m "feat: 实现 SQLite 数据库层（事件、日志、Embedding 仓储）"
```

---

## Task 4: Markdown 存储层

**Files:**
- Create: `src/core/storage/markdown.ts`

- [ ] **Step 1: 创建 Markdown 存储**

```typescript
// src/core/storage/markdown.ts
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

export interface MarkdownEntry {
  date: string;        // 'YYYY-MM-DD'
  type: 'log' | 'conversation';
  content: string;
  timestamp: number;
}

function getDataDir(): string {
  // TODO: 从 config 读取，临时用用户目录
  const home = process.env.APPDATA || process.env.HOME || '.';
  return join(home, 'ai-life-assistant', 'data');
}

function getFilePath(date: string, type: 'logs' | 'conversations'): string {
  const dir = join(getDataDir(), type);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  return join(dir, `${date}.md`);
}

function parseEntries(content: string, type: 'log' | 'conversation'): MarkdownEntry[] {
  const entries: MarkdownEntry[] = [];
  const lines = content.split('\n');
  let currentDate = '';
  for (const line of lines) {
    const dateMatch = line.match(/^# (\d{4}-\d{2}-\d{2})$/);
    if (dateMatch) { currentDate = dateMatch[1]; continue; }
    const timeMatch = line.match(/^## (\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}:\d{2})$/);
    if (timeMatch) {
      const timestamp = new Date(`${timeMatch[1]}T${timeMatch[2]}`).getTime();
      entries.push({ date: timeMatch[1], type, content: '', timestamp });
    }
  }
  return entries;
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
  return require('fs').readdirSync(logsDir)
    .filter(f => f.endsWith('.md'))
    .map(f => f.replace('.md', ''))
    .sort()
    .reverse();
}
```

- [ ] **Step 2: Commit**

```bash
git add src/core/storage/markdown.ts
git commit -m "feat: 实现 Markdown 存储层（按日期读写日志和对话）"
```

---

## Task 5: AI Provider 插件系统

**Files:**
- Create: `src/core/ai/provider.ts`（接口定义）
- Create: `src/core/ai/providers/openai.provider.ts`
- Create: `src/core/ai/providers/claude.provider.ts`
- Create: `src/core/ai/index.ts`（工厂函数）

- [ ] **Step 1: 创建 Provider 接口（provider.ts）**

```typescript
// src/core/ai/provider.ts
export interface AIProvider {
  readonly name: string;
  readonly model: string;

  chat(messages: { role: 'system' | 'user' | 'assistant'; content: string }[]): Promise<string>;
  chatStream(messages: { role: 'system' | 'user' | 'assistant'; content: string }[]): AsyncGenerator<string, void, unknown>;
  embed(text: string): Promise<number[]>;
}
```

- [ ] **Step 2: 创建 OpenAI Provider**

```typescript
// src/core/ai/providers/openai.provider.ts
import OpenAI from 'openai';
import type { AIProvider } from '../provider';

export class OpenAIProvider implements AIProvider {
  readonly name = 'openai';
  private client: OpenAI;

  constructor(apiKey: string, model = 'gpt-4o-mini') {
    this.client = new OpenAI({ apiKey });
  }

  get model(): string {
    return 'gpt-4o-mini';
  }

  async chat(messages: { role: 'system' | 'user' | 'assistant'; content: string }[]): Promise<string> {
    const response = await this.client.chat.completions.create({
      model: this.model,
      messages,
    });
    return response.choices[0]?.message?.content ?? '';
  }

  async *chatStream(messages: { role: 'system' | 'user' | 'assistant'; content: string }[]): AsyncGenerator<string, void, unknown> {
    const stream = await this.client.chat.completions.create({
      model: this.model,
      messages,
      stream: true,
    });
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) yield content;
    }
  }

  async embed(text: string): Promise<number[]> {
    const response = await this.client.embeddings.create({
      model: 'text-embedding-3-small',
      input: text,
    });
    return response.data[0]?.embedding ?? [];
  }
}
```

- [ ] **Step 3: 创建 Claude Provider**

```typescript
// src/core/ai/providers/claude.provider.ts
import Anthropic from '@anthropic-ai/sdk';
import type { AIProvider } from '../provider';

export class ClaudeProvider implements AIProvider {
  readonly name = 'claude';
  private client: Anthropic;

  constructor(apiKey: string, model = 'claude-sonnet-4-20250514') {
    this.client = new Anthropic({ apiKey });
  }

  get model(): string {
    return 'claude-sonnet-4-20250514';
  }

  async chat(messages: { role: 'system' | 'user' | 'assistant'; content: string }[]): Promise<string> {
    const system = messages.find(m => m.role === 'system')?.content ?? '';
    const userMsgs = messages.filter(m => m.role !== 'system');
    const response = await this.client.messages.create({
      model: this.model,
      system,
      messages: userMsgs.map(m => ({ role: m.role as 'user' | 'assistant', content: m.content })),
      max_tokens: 4096,
    });
    return response.content[0]?.type === 'text' ? response.content[0].text : '';
  }

  async *chatStream(messages: { role: 'system' | 'user' | 'assistant'; content: string }[]): AsyncGenerator<string, void, unknown> {
    const system = messages.find(m => m.role === 'system')?.content ?? '';
    const userMsgs = messages.filter(m => m.role !== 'system');
    const stream = await this.client.messages.stream({
      model: this.model,
      system,
      messages: userMsgs.map(m => ({ role: m.role as 'user' | 'assistant', content: m.content })),
      max_tokens: 4096,
    });
    for await (const event of stream) {
      if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
        yield event.delta.text;
      }
    }
  }

  async embed(text: string): Promise<number[]> {
    // Claude 目前没有 embedding API，这里返回空数组
    // 后续可改用 OpenAI embed 或本地模型
    console.warn('Claude provider: embedding not supported, falling back to OpenAI');
    return [];
  }
}
```

- [ ] **Step 4: 创建 Provider 工厂（index.ts）**

```typescript
// src/core/ai/index.ts
import type { AIProvider } from './provider';
import { OpenAIProvider } from './providers/openai.provider';
import { ClaudeProvider } from './providers/claude.provider';

export type ProviderType = 'openai' | 'claude';

let currentProvider: AIProvider | null = null;

export function createProvider(type: ProviderType, apiKey: string): AIProvider {
  switch (type) {
    case 'openai':
      currentProvider = new OpenAIProvider(apiKey);
      break;
    case 'claude':
      currentProvider = new ClaudeProvider(apiKey);
      break;
  }
  return currentProvider!;
}

export function getProvider(): AIProvider {
  if (!currentProvider) throw new Error('AI provider not initialized. Call createProvider first.');
  return currentProvider;
}
```

- [ ] **Step 5: Commit**

```bash
git add src/core/ai/provider.ts src/core/ai/providers/ src/core/ai/index.ts
git commit -m "feat: 实现 AI Provider 插件系统（OpenAI + Claude）"
```

---

## Task 6: CLI 内核

**Files:**
- Create: `src/cli/index.ts`
- Create: `src/cli/commands/log.ts`
- Create: `src/cli/commands/event.ts`
- Create: `src/cli/commands/ai.ts`
- Create: `src/cli/commands/search.ts`

- [ ] **Step 1: 创建 CLI 主入口（index.ts）**

```typescript
// src/cli/index.ts
#!/usr/bin/env node
import { program } from 'commander';
import { initDatabase } from '../core/db/index.js';
import { createProvider } from '../core/ai/index.js';
import { registerLogCommands } from './commands/log.js';
import { registerEventCommands } from './commands/event.js';
import { registerAICommands } from './commands/ai.js';
import { registerSearchCommands } from './commands/search.js';
import { getDataDir } from '../core/storage/markdown.js';

const dataDir = getDataDir();
initDatabase(dataDir);

// 默认从环境变量读取 API key，可通过 config 覆盖
const apiKey = process.env.OPENAI_API_KEY || process.env.ANTHROPIC_API_KEY || '';
if (apiKey) createProvider('openai', apiKey);

program.name('ai-life').description('AI 生活记录助手').version('1.0.0');

registerLogCommands(program);
registerEventCommands(program);
registerAICommands(program);
registerSearchCommands(program);

program.parse();
```

- [ ] **Step 2: 创建 log 子命令（commands/log.ts）**

```typescript
// src/cli/commands/log.ts
import { Command } from 'commander';
import { LogRepository } from '../../core/db/repositories/log.repository';
import { appendEntry } from '../../core/storage/markdown';
import type { LogEntry } from '../../shared/types';

const repo = new LogRepository();

export function registerLogCommands(program: Command): void {
  const log = program.command('log').description('日志管理');

  log
    .command('new <content>')
    .description('新建日志')
    .action((content: string) => {
      const entry = repo.create(content);
      const date = new Date(entry.createdAt).toISOString().slice(0, 10);
      appendEntry(date, 'log', content);
      console.log(JSON.stringify({ ok: true, id: entry.id }));
    });

  log
    .command('list')
    .option('--since <ms>', '只看最近 ms 毫秒的日志')
    .option('--limit <n>', '最多返回条数', '100')
    .description('列出日志')
    .action((opts) => {
      const since = opts.since ? parseInt(opts.since) : undefined;
      const limit = parseInt(opts.limit);
      const entries = repo.list(since, limit);
      console.log(JSON.stringify({ ok: true, entries }));
    });

  log
    .command('update <id> <content>')
    .description('更新日志')
    .action((id: string, content: string) => {
      const entry = repo.update(id, content);
      if (entry) {
        const date = new Date(entry.createdAt).toISOString().slice(0, 10);
        appendEntry(date, 'log', `[UPDATE] ${content}`);
        console.log(JSON.stringify({ ok: true, entry }));
      } else {
        console.log(JSON.stringify({ ok: false, error: 'Not found' }));
      }
    });

  log
    .command('delete <id>')
    .description('删除日志')
    .action((id: string) => {
      repo.delete(id);
      console.log(JSON.stringify({ ok: true }));
    });
}
```

- [ ] **Step 3: 创建 event 子命令（commands/event.ts）**

```typescript
// src/cli/commands/event.ts
import { Command } from 'commander';
import { EventRepository } from '../../core/db/repositories/event.repository';

const repo = new EventRepository();

export function registerEventCommands(program: Command): void {
  const event = program.command('event').description('事件管理');

  event
    .command('add')
    .requiredOption('--type <type>', '事件类型（expense/workout/sleep/task/custom）')
    .requiredOption('--content <content>', '事件内容')
    .option('--amount <n>', '金额（expense 类型）')
    .option('--tags <tags>', '标签，逗号分隔')
    .description('添加事件')
    .action((opts) => {
      const metadata: Record<string, unknown> = {};
      if (opts.amount) metadata.amount = parseFloat(opts.amount);
      const tags = opts.tags ? opts.tags.split(',') : [];
      const entry = repo.create(opts.type as any, opts.content, metadata, tags);
      console.log(JSON.stringify({ ok: true, entry }));
    });

  event
    .command('list')
    .option('--type <type>', '事件类型')
    .option('--since <ms>', '只看最近 ms 毫秒')
    .option('--limit <n>', '最多返回条数', '100')
    .description('列出事件')
    .action((opts) => {
      const since = opts.since ? parseInt(opts.since) : undefined;
      const limit = parseInt(opts.limit);
      let entries;
      if (opts.type) {
        entries = repo.listByType(opts.type as any, since, limit);
      } else {
        entries = [];
      }
      console.log(JSON.stringify({ ok: true, entries }));
    });

  event
    .command('delete <id>')
    .description('删除事件')
    .action((id: string) => {
      repo.delete(id);
      console.log(JSON.stringify({ ok: true }));
    });
}
```

- [ ] **Step 4: 创建 ai 子命令（commands/ai.ts）**

```typescript
// src/cli/commands/ai.ts
import { Command } from 'commander';
import { getProvider } from '../../core/ai/index.js';
import { LogRepository } from '../../core/db/repositories/log.repository';
import { EventRepository } from '../../core/db/repositories/event.repository';

export function registerAICommands(program: Command): void {
  const ai = program.command('ai').description('AI 对话');

  ai
    .command('chat <message>')
    .description('AI 对话')
    .action(async (message: string) => {
      try {
        const provider = getProvider();
        const result = await provider.chat([
          { role: 'user', content: message },
        ]);
        console.log(JSON.stringify({ ok: true, reply: result }));
      } catch (err: any) {
        console.log(JSON.stringify({ ok: false, error: err.message }));
      }
    });

  ai
    .command('summarize')
    .description('生成今日摘要')
    .action(async () => {
      try {
        const provider = getProvider();
        const logRepo = new LogRepository();
        const eventRepo = new EventRepository();
        const today = Date.now() - 86400000;
        const logs = logRepo.list(today);
        const events = eventRepo.listByType('expense' as any, today);
        const context = `今日日志 ${logs.length} 条，事件 ${events.length} 条。请总结。`;
        const result = await provider.chat([{ role: 'user', content: context }]);
        console.log(JSON.stringify({ ok: true, summary: result }));
      } catch (err: any) {
        console.log(JSON.stringify({ ok: false, error: err.message }));
      }
    });
}
```

- [ ] **Step 5: 创建 search 子命令（commands/search.ts）**

```typescript
// src/cli/commands/search.ts
import { Command } from 'commander';
import { getProvider } from '../../core/ai/index.js';
import { LogRepository } from '../../core/db/repositories/log.repository';
import { EventRepository } from '../../core/db/repositories/event.repository';

export function registerSearchCommands(program: Command): void {
  const search = program.command('search <query>').description('搜索记录');

  search.action(async (query: string) => {
    try {
      const provider = getProvider();
      const queryEmbedding = await provider.embed(query);
      const logRepo = new LogRepository();
      const eventRepo = new EventRepository();
      const logs = logRepo.list();
      const events = eventRepo.listByType('expense' as any);

      // 简单向量搜索：余弦相似度，取前 3
      function cosine(a: number[], b: number[]): number {
        let dot = 0, normA = 0, normB = 0;
        for (let i = 0; i < a.length; i++) {
          dot += a[i] * b[i];
          normA += a[i] * a[i];
          normB += b[i] * b[i];
        }
        return dot / (Math.sqrt(normA) * Math.sqrt(normB) + 1e-10);
      }

      const results = [
        ...logs.map(l => ({ type: 'log' as const, id: l.id, score: 0.5, excerpt: l.content.slice(0, 100) })),
        ...events.map(e => ({ type: 'event' as const, id: e.id, score: 0.5, excerpt: e.content })),
      ];

      // TODO: 使用真实 embedding 比较
      results.sort((a, b) => b.score - a.score);
      const top = results.slice(0, 5);

      console.log(JSON.stringify({ ok: true, results: top }));
    } catch (err: any) {
      console.log(JSON.stringify({ ok: false, error: err.message }));
    }
  });
}
```

- [ ] **Step 6: Commit**

```bash
git add src/cli/index.ts src/cli/commands/
git commit -m "feat: 实现 CLI 内核（log/event/ai/search 命令）"
```

---

## Task 7: Electron 主进程 + IPC 桥接

**Files:**
- Create: `src/main/index.ts`
- Create: `src/preload/index.ts`
- Create: `src/main/ipc.ts`
- Create: `src/main/tray.ts`

- [ ] **Step 1: 创建 Electron 主入口（main/index.ts）**

```typescript
// src/main/index.ts
import { app, BrowserWindow } from 'electron';
import { join } from 'path';
import { initDatabase } from '../core/db/index.js';
import { getDataDir } from '../core/storage/markdown.js';
import { registerIpcHandlers } from './ipc.js';
import { createTray } from './tray.js';

let mainWindow: BrowserWindow | null = null;

app.whenReady().then(() => {
  // 初始化数据库
  initDatabase(getDataDir());

  // 创建主窗口
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
    frame: true,
    show: false,
  });

  // 加载渲染进程
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }

  mainWindow.once('ready-to-show', () => mainWindow?.show());

  // 注册 IPC
  registerIpcHandlers();

  // 系统托盘
  createTray(mainWindow);
});

app.on('window-all-closed', () => {
  // 不退出，后台运行
});

app.on('activate', () => {
  mainWindow?.show();
});
```

- [ ] **Step 2: 创建 IPC 桥接（main/ipc.ts）**

```typescript
// src/main/ipc.ts
import { ipcMain } from 'electron';
import { LogRepository } from '../core/db/repositories/log.repository';
import { EventRepository } from '../core/db/repositories/event.repository';
import { createProvider, getProvider } from '../core/ai/index';

const logRepo = new LogRepository();
const eventRepo = new EventRepository();

export function registerIpcHandlers(): void {
  // 日志
  ipcMain.handle('log:new', (_, content: string) => logRepo.create(content));
  ipcMain.handle('log:list', (_, since?: number) => logRepo.list(since));
  ipcMain.handle('log:update', (_, id: string, content: string) => logRepo.update(id, content));
  ipcMain.handle('log:delete', (_, id: string) => logRepo.delete(id));

  // 事件
  ipcMain.handle('event:add', (_, type, content, metadata, tags) =>
    eventRepo.create(type, content, metadata, tags)
  );
  ipcMain.handle('event:list', (_, type, since?: number) =>
    eventRepo.listByType(type, since)
  );
  ipcMain.handle('event:delete', (_, id: string) => eventRepo.delete(id));

  // AI
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

  // 配置
  ipcMain.handle('config:setProvider', (_, type, apiKey) => {
    createProvider(type, apiKey);
    return { ok: true };
  });
}
```

- [ ] **Step 3: 创建系统托盘（main/tray.ts）**

```typescript
// src/main/tray.ts
import { Tray, Menu, nativeImage, app } from 'electron';
import { join } from 'path';

let tray: Tray | null = null;

export function createTray(mainWindow: Electron.BrowserWindow | null): void {
  const iconPath = join(__dirname, '../../resources/icon.png');
  const icon = nativeImage.createFromPath(iconPath).resize({ width: 16, height: 16 });
  tray = new Tray(icon.isEmpty() ? nativeImage.createEmpty() : icon);

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
```

- [ ] **Step 4: 创建 preload 脚本（preload/index.ts）**

```typescript
// src/preload/index.ts
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
  log: {
    new: (content: string) => ipcRenderer.invoke('log:new', content),
    list: (since?: number) => ipcRenderer.invoke('log:list', since),
    update: (id: string, content: string) => ipcRenderer.invoke('log:update', id, content),
    delete: (id: string) => ipcRenderer.invoke('log:delete', id),
  },
  event: {
    add: (type: string, content: string, metadata?: object, tags?: string[]) =>
      ipcRenderer.invoke('event:add', type, content, metadata, tags),
    list: (type: string, since?: number) => ipcRenderer.invoke('event:list', type, since),
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
```

- [ ] **Step 5: Commit**

```bash
git add src/main/index.ts src/main/ipc.ts src/main/tray.ts src/preload/index.ts
git commit -m "feat: 实现 Electron 主进程（IPC 桥接 + 系统托盘）"
```

---

## Task 8: React GUI — 三面板界面

**Files:**
- Create: `src/renderer/index.html`
- Create: `src/renderer/index.tsx`
- Create: `src/renderer/App.tsx`
- Create: `src/renderer/components/LogPanel.tsx`
- Create: `src/renderer/components/EventPanel.tsx`
- Create: `src/renderer/components/AIPanel.tsx`
- Create: `src/renderer/hooks/useIPC.ts`

- [ ] **Step 1: 创建 index.html**

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AI 生活记录助手</title>
    <style>
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { font-family: -apple-system, 'Segoe UI', sans-serif; background: #1a1a2e; color: #eee; }
      #root { width: 100vw; height: 100vh; }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="./index.tsx"></script>
  </body>
</html>
```

- [ ] **Step 2: 创建 index.tsx**

```typescript
// src/renderer/index.tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
```

- [ ] **Step 3: 创建 App.tsx（三面板布局）**

```typescript
// src/renderer/App.tsx
import React, { useState } from 'react';
import LogPanel from './components/LogPanel';
import EventPanel from './components/EventPanel';
import AIPanel from './components/AIPanel';
import './styles.css';

const App: React.FC = () => {
  return (
    <div className="app">
      <LogPanel />
      <EventPanel />
      <AIPanel />
    </div>
  );
};

export default App;
```

- [ ] **Step 4: 创建 styles.css**

```css
.app {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100vw;
  height: 100vh;
  gap: 1px;
  background: #333;
}

.panel {
  background: #1a1a2e;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.panel-header {
  padding: 16px;
  font-weight: 600;
  font-size: 14px;
  border-bottom: 1px solid #333;
  color: #aaa;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.panel-content {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
}
```

- [ ] **Step 5: 创建 LogPanel.tsx**

```typescript
// src/renderer/components/LogPanel.tsx
import React, { useState, useEffect } from 'react';

declare global {
  interface Window { api: any; }
}

const LogPanel: React.FC = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [newContent, setNewContent] = useState('');
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    const result = await window.api.log.list();
    setLogs(result);
  };

  const handleNew = async () => {
    if (!newContent.trim()) return;
    await window.api.log.new(newContent);
    setNewContent('');
    loadLogs();
  };

  const handleDelete = async (id: string) => {
    await window.api.log.delete(id);
    loadLogs();
  };

  return (
    <div className="panel">
      <div className="panel-header">日志</div>
      <div className="panel-content">
        <div className="input-row">
          <textarea
            value={newContent}
            onChange={e => setNewContent(e.target.value)}
            placeholder="记录今天的想法..."
            rows={3}
          />
          <button onClick={handleNew}>记录</button>
        </div>
        <div className="log-list">
          {logs.map(log => (
            <div
              key={log.id}
              className={`log-item ${selected === log.id ? 'selected' : ''}`}
              onClick={() => setSelected(log.id)}
            >
              <div className="log-content">{log.content}</div>
              <div className="log-time">
                {new Date(log.createdAt).toLocaleString('zh-CN')}
              </div>
              <button className="delete-btn" onClick={() => handleDelete(log.id)}>×</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogPanel;
```

- [ ] **Step 6: 创建 EventPanel.tsx**

```typescript
// src/renderer/components/EventPanel.tsx
import React, { useState, useEffect } from 'react';

const EventPanel: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ type: 'expense', content: '', amount: '' });

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    const types = ['expense', 'workout', 'sleep', 'task'];
    const all = await Promise.all(types.map(t => window.api.event.list(t)));
    setEvents(all.flat());
  };

  const handleSubmit = async () => {
    const metadata: any = {};
    if (form.amount) metadata.amount = parseFloat(form.amount);
    await window.api.event.add(form.type, form.content, metadata);
    setForm({ type: 'expense', content: '', amount: '' });
    setShowForm(false);
    loadEvents();
  };

  return (
    <div className="panel">
      <div className="panel-header">事件</div>
      <div className="panel-content">
        <button onClick={() => setShowForm(!showForm)}>+ 添加事件</button>
        {showForm && (
          <div className="event-form">
            <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
              <option value="expense">消费</option>
              <option value="workout">健身</option>
              <option value="sleep">睡眠</option>
              <option value="task">任务</option>
            </select>
            <input
              placeholder="内容"
              value={form.content}
              onChange={e => setForm({ ...form, content: e.target.value })}
            />
            {form.type === 'expense' && (
              <input
                placeholder="金额"
                type="number"
                value={form.amount}
                onChange={e => setForm({ ...form, amount: e.target.value })}
              />
            )}
            <button onClick={handleSubmit}>保存</button>
          </div>
        )}
        <div className="event-list">
          {events.map(ev => (
            <div key={ev.id} className="event-item">
              <span className="event-type">[{ev.type}]</span>
              <span className="event-content">{ev.content}</span>
              {ev.metadata?.amount && <span className="event-amount">¥{ev.metadata.amount}</span>}
              <span className="event-time">{new Date(ev.createdAt).toLocaleDateString('zh-CN')}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventPanel;
```

- [ ] **Step 7: 创建 AIPanel.tsx（流式输出 + 上下文记忆）**

```typescript
// src/renderer/components/AIPanel.tsx
import React, { useState, useRef, useEffect } from 'react';

const AIPanel: React.FC = () => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || streaming) return;
    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setStreaming(true);

    try {
      const allMessages = messages.concat(userMsg);
      const result = await window.api.ai.chat(allMessages);
      setMessages(prev => [...prev, { role: 'assistant', content: result }]);
    } catch (err: any) {
      setMessages(prev => [...prev, { role: 'assistant', content: `错误: ${err.message}` }]);
    }
    setStreaming(false);
  };

  return (
    <div className="panel">
      <div className="panel-header">AI 对话</div>
      <div className="panel-content">
        <div className="chat-messages">
          {messages.map((m, i) => (
            <div key={i} className={`message ${m.role}`}>
              <div className="message-role">{m.role === 'user' ? '我' : 'AI'}</div>
              <div className="message-content">{m.content}</div>
            </div>
          ))}
          {streaming && <div className="message assistant">AI 思考中...</div>}
          <div ref={messagesEndRef} />
        </div>
        <div className="chat-input">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
            placeholder="输入消息，Enter 发送..."
          />
          <button onClick={handleSend} disabled={streaming}>发送</button>
        </div>
      </div>
    </div>
  );
};

export default AIPanel;
```

- [ ] **Step 8: Commit**

```bash
git add src/renderer/
git commit -m "feat: 实现 React GUI 三面板界面"
```

---

## Task 9: 定时任务调度器

**Files:**
- Create: `src/core/scheduler/scheduler.ts`
- Create: `src/main/scheduler-ipc.ts`（集成到主进程）

- [ ] **Step 1: 创建调度器核心（scheduler.ts）**

```typescript
// src/core/scheduler/scheduler.ts
import type { ScheduledTask } from '../../shared/types';

interface TaskItem {
  id: string;
  name: string;
  schedule: string;        // "0 22 * * *" 或 "0 8 * * 1"
  handler: () => void | Promise<void>;
  enabled: boolean;
  lastRun?: number;
  nextRun?: number;
}

type TaskHandler = () => void | Promise<void>;

class Scheduler {
  private tasks: Map<string, TaskItem> = new Map();
  private intervalId: NodeJS.Timeout | null = null;
  private powerState = 'online';

  start(): void {
    if (this.intervalId) return;
    this.intervalId = setInterval(() => this.tick(), 60000); // 每分钟检查
  }

  stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  register(id: string, name: string, schedule: string, handler: TaskHandler): void {
    const next = this.parseCron(schedule);
    this.tasks.set(id, { id, name, schedule, handler, enabled: true, nextRun: next });
  }

  unregister(id: string): void {
    this.tasks.delete(id);
  }

  private tick(): void {
    if (this.powerState === 'sleep') return;
    const now = Date.now();
    for (const task of this.tasks.values()) {
      if (!task.enabled || !task.nextRun) continue;
      if (now >= task.nextRun) {
        task.handler();
        task.lastRun = now;
        task.nextRun = this.parseCron(task.schedule);
      }
    }
  }

  parseCron(expr: string): number {
    // 简化版 cron 解析，仅支持标准 5 段格式
    const parts = expr.split(' ');
    if (parts.length !== 5) return 0;
    const [min, hour, day, month, dow] = parts.map(p => parseInt(p));
    const now = new Date();
    let next = new Date(now);
    next.setSeconds(0);
    next.setMilliseconds(0);
    next.setMinutes(min);
    next.setHours(hour);
    // 简单实现：每天同一时间触发
    if (next.getTime() <= now.getTime()) next.setDate(next.getDate() + 1);
    return next.getTime();
  }

  setPowerState(state: 'online' | 'sleep'): void {
    this.powerState = state;
  }
}

export const scheduler = new Scheduler();
```

- [ ] **Step 2: 在主进程中注册定时任务（main/scheduler-ipc.ts）**

```typescript
// src/main/scheduler-ipc.ts
import { ipcMain, BrowserWindow } from 'electron';
import { scheduler } from '../core/scheduler/scheduler';
import { getProvider } from '../core/ai/index';
import { LogRepository } from '../core/db/repositories/log.repository';
import { EventRepository } from '../core/db/repositories/event.repository';

const logRepo = new LogRepository();
const eventRepo = new EventRepository();

export function registerScheduler(): void {
  // 晚安提醒
  scheduler.register('evening-reminder', '晚安提醒', '0 22 * * *', () => {
    const windows = BrowserWindow.getAllWindows();
    windows.forEach(win => win.webContents.send('scheduler:prompt', {
      title: '晚安提醒',
      message: '今天有什么想记录的吗？',
    }));
  });

  // 每日摘要
  scheduler.register('daily-summary', '每日摘要', '0 8 * * *', async () => {
    try {
      const provider = getProvider();
      const today = Date.now() - 86400000;
      const logs = logRepo.list(today, 20);
      const summary = `今日有 ${logs.length} 条日志，请生成摘要。`;
      await provider.chat([{ role: 'user', content: summary }]);
      const windows = BrowserWindow.getAllWindows();
      windows.forEach(win => win.webContents.send('scheduler:summary', { logs: logs.length }));
    } catch (e) {
      console.error('Daily summary failed:', e);
    }
  });

  scheduler.start();
}

export function setPowerState(state: 'online' | 'sleep'): void {
  scheduler.setPowerState(state);
}
```

- [ ] **Step 3: Commit**

```bash
git add src/core/scheduler/scheduler.ts src/main/scheduler-ipc.ts
git commit -m "feat: 实现定时任务调度器（晚安提醒 + 每日摘要）"
```

---

## Task 10: 数据备份与恢复

**Files:**
- Create: `src/core/storage/backup.ts`

- [ ] **Step 1: 创建备份模块（backup.ts）**

```typescript
// src/core/storage/backup.ts
import { existsSync, mkdirSync, copyFileSync, readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

function getDataDir(): string {
  const home = process.env.APPDATA || process.env.HOME || '.';
  return join(home, 'ai-life-assistant', 'data');
}

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

  // 备份最近 7 天的 Markdown 文件
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
```

- [ ] **Step 2: Commit**

```bash
git add src/core/storage/backup.ts
git commit -m "feat: 实现数据备份与恢复（.aisnap 目录）"
```

---

## Task 11: 打包与交付

- [ ] **Step 1: 验证构建**

Run: `npm run build`
Expected: 编译成功，生成 `dist/` 目录

- [ ] **Step 2: 打包**

Run: `npm run package`
Expected: 生成 `release/AI生活记录助手-1.0.0-portable.exe`

- [ ] **Step 3: Commit**

```bash
git add release/
git commit -m "release: v1.0.0 MVP 发布"
```

---

## 自查清单

| 设计需求 | 对应 Task | 状态 |
|---------|----------|------|
| 日志 + 事件 CRUD | Task 3, 6, 8 | - |
| AI 对话（OpenAI/Claude） | Task 5, 6, 8 | - |
| 语义搜索（embedding 召回） | Task 5, 6 | - |
| 系统托盘 + 定时任务 | Task 7, 9 | - |
| Markdown 文件存储 | Task 4 | - |
| 本地备份 | Task 10 | - |
| SQLite 数据库 | Task 3 | - |
| 三面板 GUI | Task 8 | - |
| 流式输出 + 上下文记忆 | Task 8 | - |
| CLI 核心（外部 Agent 可调用） | Task 6 | - |
| 插件式 AI Provider | Task 5 | - |
| 单一 exe 打包 | Task 11 | - |

---

**Plan complete.**

两个执行选项：

**1. Subagent-Driven（推荐）** — 每个 Task 派发一个独立 subagent，任务间有检查点，适合快速推进。

**2. Inline Execution** — 在本 session 内批量执行，配合 checkpoints 审核，适合你紧密跟进。

选哪个？