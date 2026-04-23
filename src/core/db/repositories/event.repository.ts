// src/core/db/repositories/event.repository.ts
import { v4 as uuid } from 'uuid';
import { getDatabase, saveDatabase } from '../index.js';
import type { EventEntry, EventType } from '../../../shared/types.js';

function rowToEvent(row: any[]): EventEntry {
  return {
    id: row[0] as string,
    type: row[1] as EventType,
    content: row[2] as string,
    metadata: JSON.parse((row[3] as string) || '{}'),
    tags: row[4] ? (row[4] as string).split(',') : [],
    createdAt: row[5] as number,
    updatedAt: row[6] as number,
  };
}

export class EventRepository {
  create(type: EventType, content: string, metadata: Record<string, unknown> = {}, tags: string[] = []): EventEntry {
    const db = getDatabase();
    const now = Date.now();
    const id = uuid();
    db.run(
      'INSERT INTO events (id, type, content, metadata, tags, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [id, type, content, JSON.stringify(metadata), tags.join(','), now, now]
    );
    saveDatabase();
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
    db.run(
      'UPDATE events SET content=?, metadata=?, tags=?, updated_at=? WHERE id=?',
      [updated.content, JSON.stringify(updated.metadata), updated.tags.join(','), now, id]
    );
    saveDatabase();
    return this.getById(id);
  }

  getById(id: string): EventEntry | null {
    const db = getDatabase();
    const stmt = db.prepare('SELECT * FROM events WHERE id=?');
    stmt.bind([id]);
    if (stmt.step()) {
      const row = stmt.get();
      stmt.free();
      return rowToEvent(row);
    }
    stmt.free();
    return null;
  }

  listByType(type: EventType, since?: number, limit = 100): EventEntry[] {
    const db = getDatabase();
    const sql = since
      ? 'SELECT * FROM events WHERE type=? AND created_at >= ? ORDER BY created_at DESC LIMIT ?'
      : 'SELECT * FROM events WHERE type=? ORDER BY created_at DESC LIMIT ?';
    const params = since ? [type, since, limit] : [type, limit];
    const stmt = db.prepare(sql);
    stmt.bind(params);
    const results: EventEntry[] = [];
    while (stmt.step()) {
      results.push(rowToEvent(stmt.get()));
    }
    stmt.free();
    return results;
  }

  delete(id: string): void {
    const db = getDatabase();
    db.run('DELETE FROM events WHERE id=?', [id]);
    saveDatabase();
  }
}