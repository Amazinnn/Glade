import { v4 as uuid } from 'uuid';
import type { LogEntry } from '../../../shared/types.js';
import { RecordRepository } from './record.repository.js';

const records = new RecordRepository();

function toLog(record: NonNullable<ReturnType<RecordRepository['getById']>>): LogEntry {
  return {
    id: record.id,
    content: record.content,
    summary: record.summary,
    tags: record.tags,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
    filePath: record.filePath,
    markdownAnchor: record.markdownAnchor,
    deletedAt: record.deletedAt,
  };
}

export class LogRepository {
  create(content: string, tags: string[] = []): LogEntry {
    const now = Date.now();
    const record = records.create({
      id: uuid(),
      kind: 'log',
      content,
      tags,
      metadata: {},
      createdAt: now,
      updatedAt: now,
    });
    return toLog(record);
  }

  update(id: string, content: string, tags?: string[]): LogEntry | null {
    const record = records.updateContent(id, content, tags);
    return record ? toLog(record) : null;
  }

  getById(id: string): LogEntry | null {
    const record = records.getById(id);
    return record && record.kind === 'log' ? toLog(record) : null;
  }

  list(since?: number, limit = 100): LogEntry[] {
    return records.list({ since, limit, type: 'log' }).map(toLog);
  }

  delete(id: string): void {
    records.softDelete(id);
  }
}
