// src/core/db/repositories/log.repository.ts
import { v4 as uuid } from 'uuid';
import { getDatabase } from '../index.js';
import type { LogEntry } from '../../../shared/types.js';

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
    return (rows as any[]).map(row => ({
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