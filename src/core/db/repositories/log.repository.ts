// src/core/db/repositories/log.repository.ts
import { v4 as uuid } from 'uuid';
import { getDatabase, saveDatabase } from '../index.js';
import type { LogEntry } from '../../../shared/types.js';

function rowToLog(row: any[]): LogEntry {
  return {
    id: row[0] as string,
    content: row[1] as string,
    summary: row[2] as string,
    tags: row[3] ? (row[3] as string).split(',') : [],
    createdAt: row[4] as number,
    updatedAt: row[5] as number,
  };
}

export class LogRepository {
  create(content: string, tags: string[] = []): LogEntry {
    const db = getDatabase();
    const now = Date.now();
    const id = uuid();
    db.run(
      'INSERT INTO logs (id, content, summary, tags, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)',
      [id, content, '', tags.join(','), now, now]
    );
    saveDatabase();
    return this.getById(id)!;
  }

  update(id: string, content: string, tags?: string[]): LogEntry | null {
    const db = getDatabase();
    const now = Date.now();
    if (tags !== undefined) {
      db.run('UPDATE logs SET content=?, tags=?, updated_at=? WHERE id=?', [content, tags.join(','), now, id]);
    } else {
      db.run('UPDATE logs SET content=?, updated_at=? WHERE id=?', [content, now, id]);
    }
    saveDatabase();
    return this.getById(id);
  }

  getById(id: string): LogEntry | null {
    const db = getDatabase();
    const stmt = db.prepare('SELECT * FROM logs WHERE id=?');
    stmt.bind([id]);
    if (stmt.step()) {
      const row = stmt.get();
      stmt.free();
      return rowToLog(row);
    }
    stmt.free();
    return null;
  }

  list(since?: number, limit = 100): LogEntry[] {
    const db = getDatabase();
    const sql = since
      ? 'SELECT * FROM logs WHERE created_at >= ? ORDER BY created_at DESC LIMIT ?'
      : 'SELECT * FROM logs ORDER BY created_at DESC LIMIT ?';
    const params = since ? [since, limit] : [limit];
    const stmt = db.prepare(sql);
    stmt.bind(params);
    const results: LogEntry[] = [];
    while (stmt.step()) {
      results.push(rowToLog(stmt.get()));
    }
    stmt.free();
    return results;
  }

  delete(id: string): void {
    const db = getDatabase();
    db.run('DELETE FROM logs WHERE id=?', [id]);
    saveDatabase();
  }
}