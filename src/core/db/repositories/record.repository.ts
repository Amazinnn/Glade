import { getDatabase, saveDatabase } from '../index.js';
import type {
  EventType,
  LifeRecord,
  RecordKind,
  RecordSearchQuery,
  SearchResult,
  TimelineQuery,
} from '../../../shared/types.js';

export interface CreateRecordInput {
  id: string;
  kind: RecordKind;
  eventType?: EventType;
  content: string;
  summary?: string;
  tags?: string[];
  metadata?: Record<string, unknown>;
  createdAt: number;
  updatedAt: number;
  filePath?: string;
  markdownAnchor?: string;
}

function safeJsonParse<T>(value: string | null | undefined, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function rowToRecord(row: unknown[]): LifeRecord {
  return {
    id: String(row[0]),
    kind: row[1] as RecordKind,
    eventType: row[2] ? (row[2] as EventType) : undefined,
    content: String(row[3] ?? ''),
    summary: String(row[4] ?? ''),
    tags: safeJsonParse<string[]>(String(row[5] ?? '[]'), []),
    metadata: safeJsonParse<Record<string, unknown>>(String(row[6] ?? '{}'), {}),
    createdAt: Number(row[7]),
    updatedAt: Number(row[8]),
    filePath: row[9] ? String(row[9]) : undefined,
    markdownAnchor: row[10] ? String(row[10]) : undefined,
    deletedAt: row[11] ? Number(row[11]) : null,
  };
}

function recordSelectSql(): string {
  return `
SELECT
  id,
  record_type,
  event_type,
  content,
  summary,
  tags,
  metadata,
  created_at,
  updated_at,
  file_path,
  markdown_anchor,
  deleted_at
FROM records
`;
}

function bindAndCollect(sql: string, params: unknown[]): LifeRecord[] {
  const db = getDatabase();
  const stmt = db.prepare(sql);
  stmt.bind(params);
  const results: LifeRecord[] = [];
  while (stmt.step()) {
    results.push(rowToRecord(stmt.get()));
  }
  stmt.free();
  return results;
}

function toDayRange(date: string): { start: number; end: number } {
  const start = new Date(`${date}T00:00:00`).getTime();
  const end = new Date(`${date}T23:59:59.999`).getTime();
  return { start, end };
}

function toDateStart(date: string): number {
  return new Date(`${date}T00:00:00`).getTime();
}

function toDateEnd(date: string): number {
  return new Date(`${date}T23:59:59.999`).getTime();
}

function likePattern(value: string): string {
  return `%${value}%`;
}

function toSearchResult(record: LifeRecord, query: string): SearchResult {
  const index = record.content.toLowerCase().indexOf(query.toLowerCase());
  const start = Math.max(0, index === -1 ? 0 : index - 24);
  const excerpt = record.content.slice(start, start + 120);
  return {
    type: record.kind,
    id: record.id,
    score: index === -1 ? 0.5 : 1,
    excerpt,
    filePath: record.filePath,
    markdownAnchor: record.markdownAnchor,
    createdAt: record.createdAt,
  };
}

export class RecordRepository {
  create(input: CreateRecordInput): LifeRecord {
    const db = getDatabase();
    db.run(
      `
INSERT INTO records (
  id,
  record_type,
  event_type,
  content,
  summary,
  tags,
  metadata,
  created_at,
  updated_at,
  file_path,
  markdown_anchor,
  deleted_at
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NULL)
`,
      [
        input.id,
        input.kind,
        input.eventType ?? null,
        input.content,
        input.summary ?? '',
        JSON.stringify(input.tags ?? []),
        JSON.stringify(input.metadata ?? {}),
        input.createdAt,
        input.updatedAt,
        input.filePath ?? null,
        input.markdownAnchor ?? null,
      ]
    );
    saveDatabase();
    return this.getById(input.id)!;
  }

  updateContent(id: string, content: string, tags?: string[]): LifeRecord | null {
    const existing = this.getById(id, true);
    if (!existing) return null;
    const db = getDatabase();
    const now = Date.now();
    db.run('UPDATE records SET content=?, tags=?, updated_at=? WHERE id=?', [
      content,
      JSON.stringify(tags ?? existing.tags),
      now,
      id,
    ]);
    saveDatabase();
    return this.getById(id, true);
  }

  updateEvent(
    id: string,
    content: string,
    metadata?: Record<string, unknown>,
    tags?: string[]
  ): LifeRecord | null {
    const existing = this.getById(id, true);
    if (!existing) return null;
    const db = getDatabase();
    const now = Date.now();
    db.run('UPDATE records SET content=?, metadata=?, tags=?, updated_at=? WHERE id=?', [
      content,
      JSON.stringify(metadata ?? existing.metadata),
      JSON.stringify(tags ?? existing.tags),
      now,
      id,
    ]);
    saveDatabase();
    return this.getById(id, true);
  }

  getById(id: string, includeDeleted = false): LifeRecord | null {
    const where = includeDeleted ? 'WHERE id=?' : 'WHERE id=? AND deleted_at IS NULL';
    const rows = bindAndCollect(`${recordSelectSql()} ${where} LIMIT 1`, [id]);
    return rows[0] ?? null;
  }

  list(query: TimelineQuery = {}): LifeRecord[] {
    const clauses: string[] = [];
    const params: unknown[] = [];

    if (!query.includeDeleted) clauses.push('deleted_at IS NULL');
    if (query.type) {
      clauses.push('record_type=?');
      params.push(query.type);
    }
    if (query.eventType) {
      clauses.push('event_type=?');
      params.push(query.eventType);
    }
    if (query.date) {
      const range = toDayRange(query.date);
      clauses.push('created_at BETWEEN ? AND ?');
      params.push(range.start, range.end);
    } else if (query.since) {
      clauses.push('created_at >= ?');
      params.push(query.since);
    }

    const where = clauses.length > 0 ? `WHERE ${clauses.join(' AND ')}` : '';
    params.push(query.limit ?? 100);
    return bindAndCollect(`${recordSelectSql()} ${where} ORDER BY created_at DESC LIMIT ?`, params);
  }

  search(query: RecordSearchQuery): SearchResult[] {
    const text = query.query.trim();
    if (!text) return [];

    const clauses = ['deleted_at IS NULL'];
    const params: unknown[] = [];
    const pattern = likePattern(text);
    clauses.push('(content LIKE ? OR tags LIKE ? OR metadata LIKE ? OR file_path LIKE ?)');
    params.push(pattern, pattern, pattern, pattern);

    if (query.type) {
      if (query.type === 'log' || query.type === 'event') {
        clauses.push('record_type=?');
      } else {
        clauses.push('event_type=?');
      }
      params.push(query.type);
    }

    if (query.dateFrom) {
      clauses.push('created_at >= ?');
      params.push(toDateStart(query.dateFrom));
    }

    if (query.dateTo) {
      clauses.push('created_at <= ?');
      params.push(toDateEnd(query.dateTo));
    }

    if (query.tags && query.tags.length > 0) {
      for (const tag of query.tags) {
        clauses.push('tags LIKE ?');
        params.push(likePattern(tag));
      }
    }

    params.push(query.limit ?? 20);
    const records = bindAndCollect(
      `${recordSelectSql()} WHERE ${clauses.join(' AND ')} ORDER BY created_at DESC LIMIT ?`,
      params
    );
    return records.map((record) => toSearchResult(record, text));
  }

  softDelete(id: string): void {
    const db = getDatabase();
    db.run('UPDATE records SET deleted_at=?, updated_at=? WHERE id=?', [Date.now(), Date.now(), id]);
    saveDatabase();
  }
}
