// src/core/db/repositories/event.repository.ts
import { v4 as uuid } from 'uuid';
import { getDatabase } from '../index.js';
import type { EventEntry, EventType } from '../../../shared/types.js';

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
    return (rows as any[]).map(row => ({
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