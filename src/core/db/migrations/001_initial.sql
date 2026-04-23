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
