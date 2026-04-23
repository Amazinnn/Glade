import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'fs';
import { createRequire } from 'module';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const initSqlJs = require('sql.js').default;

type SqlJsDatabase = {
  exec: (sql: string, params?: unknown[]) => Array<{ columns: string[]; values: unknown[][] }>;
  export: () => Uint8Array;
  prepare: (sql: string) => {
    bind: (params: unknown[]) => void;
    step: () => boolean;
    get: () => unknown[];
    free: () => void;
  };
  run: (sql: string, params?: unknown[]) => void;
};

let db: SqlJsDatabase | null = null;
let dbPath = '';

const builtinMigrations = [
  {
    version: '001_initial',
    sql: `
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

CREATE TABLE IF NOT EXISTS logs (
  id TEXT PRIMARY KEY,
  content TEXT NOT NULL,
  summary TEXT DEFAULT '',
  tags TEXT DEFAULT '',
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_logs_created ON logs(created_at);

CREATE TABLE IF NOT EXISTS records (
  id TEXT PRIMARY KEY,
  record_type TEXT NOT NULL,
  event_type TEXT,
  content TEXT NOT NULL,
  summary TEXT DEFAULT '',
  tags TEXT DEFAULT '[]',
  metadata TEXT DEFAULT '{}',
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  file_path TEXT,
  markdown_anchor TEXT,
  deleted_at INTEGER
);

CREATE INDEX IF NOT EXISTS idx_records_created ON records(created_at);
CREATE INDEX IF NOT EXISTS idx_records_type ON records(record_type);
CREATE INDEX IF NOT EXISTS idx_records_event_type ON records(event_type);
CREATE INDEX IF NOT EXISTS idx_records_deleted ON records(deleted_at);

INSERT OR IGNORE INTO records (
  id, record_type, event_type, content, summary, tags, metadata, created_at, updated_at
)
SELECT
  id,
  'log',
  NULL,
  content,
  COALESCE(summary, ''),
  CASE
    WHEN tags IS NULL OR tags = '' THEN '[]'
    ELSE '["' || REPLACE(tags, ',', '","') || '"]'
  END,
  '{}',
  created_at,
  updated_at
FROM logs;

INSERT OR IGNORE INTO records (
  id, record_type, event_type, content, summary, tags, metadata, created_at, updated_at
)
SELECT
  id,
  'event',
  type,
  content,
  '',
  CASE
    WHEN tags IS NULL OR tags = '' THEN '[]'
    ELSE '["' || REPLACE(tags, ',', '","') || '"]'
  END,
  COALESCE(metadata, '{}'),
  created_at,
  updated_at
FROM events;

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

CREATE TABLE IF NOT EXISTS scheduled_tasks (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  schedule TEXT NOT NULL,
  enabled INTEGER DEFAULT 1,
  last_run INTEGER,
  next_run INTEGER
);

CREATE TABLE IF NOT EXISTS config (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);
`,
  },
];

export async function initDatabase(dataDir: string): Promise<SqlJsDatabase> {
  mkdirSync(dataDir, { recursive: true });
  dbPath = join(dataDir, 'ai-life.db');

  const SQL = await initSqlJs({
    locateFile: (file: string) => require.resolve(`sql.js/dist/${file}`),
  });

  const database: SqlJsDatabase = existsSync(dbPath)
    ? new SQL.Database(readFileSync(dbPath))
    : new SQL.Database();

  db = database;
  runMigrations(database);
  saveDatabase();
  return database;
}

function runMigrations(database: SqlJsDatabase): void {
  database.exec(`
CREATE TABLE IF NOT EXISTS schema_migrations (
  version TEXT PRIMARY KEY,
  applied_at INTEGER NOT NULL
);
`);

  const applied = new Set<string>();
  const rows = database.exec('SELECT version FROM schema_migrations');
  for (const row of rows[0]?.values ?? []) {
    applied.add(String(row[0]));
  }

  for (const migration of loadMigrations()) {
    if (applied.has(migration.version)) continue;
    database.exec(migration.sql);
    database.run('INSERT INTO schema_migrations (version, applied_at) VALUES (?, ?)', [
      migration.version,
      Date.now(),
    ]);
  }
}

function loadMigrations(): Array<{ version: string; sql: string }> {
  const migrationsDir = findMigrationsDir();
  if (!migrationsDir) return builtinMigrations;

  const fileMigrations = readdirSync(migrationsDir)
    .filter((file) => file.endsWith('.sql'))
    .sort()
    .map((file) => ({
      version: file.replace(/\.sql$/, ''),
      sql: readFileSync(join(migrationsDir, file), 'utf-8'),
    }));

  return fileMigrations.length > 0 ? fileMigrations : builtinMigrations;
}

function findMigrationsDir(): string | null {
  const candidates = [
    join(__dirname, 'migrations'),
    join(__dirname, '../core/db/migrations'),
    join(process.cwd(), 'src/core/db/migrations'),
    join(process.cwd(), 'out/main/migrations'),
  ];

  return candidates.find((candidate) => existsSync(candidate)) ?? null;
}

export function saveDatabase(): void {
  if (!db || !dbPath) return;
  const data = db.export();
  writeFileSync(dbPath, Buffer.from(data));
}

export function getDatabase(): SqlJsDatabase {
  if (!db) throw new Error('Database not initialized');
  return db;
}
