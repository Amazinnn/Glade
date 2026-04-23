import { v4 as uuid } from 'uuid';
import type { EventEntry, EventType } from '../../../shared/types.js';
import { RecordRepository } from './record.repository.js';

const records = new RecordRepository();

function toEvent(record: NonNullable<ReturnType<RecordRepository['getById']>>): EventEntry {
  return {
    id: record.id,
    type: record.eventType ?? 'custom',
    content: record.content,
    metadata: record.metadata,
    tags: record.tags,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
    filePath: record.filePath,
    markdownAnchor: record.markdownAnchor,
    deletedAt: record.deletedAt,
  };
}

export class EventRepository {
  create(
    type: EventType,
    content: string,
    metadata: Record<string, unknown> = {},
    tags: string[] = []
  ): EventEntry {
    const now = Date.now();
    const record = records.create({
      id: uuid(),
      kind: 'event',
      eventType: type,
      content,
      tags,
      metadata,
      createdAt: now,
      updatedAt: now,
    });
    return toEvent(record);
  }

  update(id: string, content: string, metadata?: Record<string, unknown>, tags?: string[]): EventEntry | null {
    const existing = records.getById(id);
    if (!existing || existing.kind !== 'event') return null;
    const record = records.updateEvent(id, content, metadata, tags);
    return record ? toEvent(record) : null;
  }

  getById(id: string): EventEntry | null {
    const record = records.getById(id);
    return record && record.kind === 'event' ? toEvent(record) : null;
  }

  listByType(type: EventType, since?: number, limit = 100): EventEntry[] {
    return records.list({ since, limit, type: 'event', eventType: type }).map(toEvent);
  }

  list(since?: number, limit = 100): EventEntry[] {
    return records.list({ since, limit, type: 'event' }).map(toEvent);
  }

  delete(id: string): void {
    records.softDelete(id);
  }
}
