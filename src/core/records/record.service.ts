import { v4 as uuid } from 'uuid';
import type {
  EventEntry,
  EventType,
  LifeRecord,
  LogEntry,
  RecordSearchQuery,
  SearchResult,
  TimelineQuery,
} from '../../shared/types.js';
import { RecordRepository } from '../db/repositories/record.repository.js';
import {
  appendJournalRecord,
  ensureDataLayout,
  getDateKey,
  getJournalFilePath,
  readDailyJournal,
} from '../storage/markdown.js';

const recordRepo = new RecordRepository();

export interface DailyMarkdown {
  date: string;
  filePath: string;
  content: string;
}

function anchorFor(id: string): string {
  return `ai-life-${id}`;
}

function toLog(record: LifeRecord): LogEntry {
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

function toEvent(record: LifeRecord): EventEntry {
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

export class RecordService {
  createLog(content: string, tags: string[] = []): LogEntry {
    const id = uuid();
    const now = Date.now();
    const anchor = anchorFor(id);
    const date = getDateKey(now);
    const filePath = getJournalFilePath(date);

    appendJournalRecord({
      id,
      kind: 'log',
      content,
      createdAt: now,
      anchor,
    });

    const record = recordRepo.create({
      id,
      kind: 'log',
      content,
      tags,
      metadata: {},
      createdAt: now,
      updatedAt: now,
      filePath,
      markdownAnchor: anchor,
    });

    return toLog(record);
  }

  createEvent(
    type: EventType,
    content: string,
    metadata: Record<string, unknown> = {},
    tags: string[] = []
  ): EventEntry {
    const id = uuid();
    const now = Date.now();
    const anchor = anchorFor(id);
    const date = getDateKey(now);
    const filePath = getJournalFilePath(date);

    appendJournalRecord({
      id,
      kind: 'event',
      eventType: type,
      content,
      createdAt: now,
      anchor,
    });

    const record = recordRepo.create({
      id,
      kind: 'event',
      eventType: type,
      content,
      tags,
      metadata,
      createdAt: now,
      updatedAt: now,
      filePath,
      markdownAnchor: anchor,
    });

    return toEvent(record);
  }

  listTimeline(query: TimelineQuery = {}): LifeRecord[] {
    ensureDataLayout();
    return recordRepo.list(query);
  }

  listLogs(query: Omit<TimelineQuery, 'type' | 'eventType'> = {}): LogEntry[] {
    return recordRepo.list({ ...query, type: 'log' }).map(toLog);
  }

  listEvents(query: Omit<TimelineQuery, 'type'> = {}): EventEntry[] {
    return recordRepo.list({ ...query, type: 'event' }).map(toEvent);
  }

  updateLog(id: string, content: string, tags?: string[]): LogEntry | null {
    const updated = recordRepo.updateContent(id, content, tags);
    return updated ? toLog(updated) : null;
  }

  deleteRecord(id: string): void {
    recordRepo.softDelete(id);
  }

  searchRecords(query: RecordSearchQuery): SearchResult[] {
    return recordRepo.search(query);
  }

  getDailyMarkdown(date = getDateKey()): DailyMarkdown {
    ensureDataLayout();
    return {
      date,
      filePath: getJournalFilePath(date),
      content: readDailyJournal(date),
    };
  }
}

export const recordService = new RecordService();
