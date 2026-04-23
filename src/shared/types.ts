// src/shared/types.ts

export type RecordKind = 'log' | 'event';

export type EventType =
  | 'expense'
  | 'task'
  | 'health'
  | 'study'
  | 'custom'
  | 'workout'
  | 'sleep';

export interface LogEntry {
  id: string;
  content: string;
  summary?: string;
  tags: string[];
  createdAt: number;
  updatedAt: number;
  filePath?: string;
  markdownAnchor?: string;
  deletedAt?: number | null;
}

export interface EventEntry {
  id: string;
  type: EventType;
  content: string;
  metadata: Record<string, unknown>;
  tags: string[];
  createdAt: number;
  updatedAt: number;
  filePath?: string;
  markdownAnchor?: string;
  deletedAt?: number | null;
}

export interface LifeRecord {
  id: string;
  kind: RecordKind;
  eventType?: EventType;
  content: string;
  summary: string;
  tags: string[];
  metadata: Record<string, unknown>;
  createdAt: number;
  updatedAt: number;
  filePath?: string;
  markdownAnchor?: string;
  deletedAt?: number | null;
}

export interface TimelineQuery {
  date?: string;
  since?: number;
  limit?: number;
  type?: RecordKind;
  eventType?: EventType;
  includeDeleted?: boolean;
}

export interface RecordSearchQuery {
  query: string;
  type?: RecordKind | EventType;
  dateFrom?: string;
  dateTo?: string;
  tags?: string[];
  limit?: number;
}

export interface Embedding {
  id: string;
  recordType: 'log' | 'event';
  recordId: string;
  provider: string;
  model: string;
  vector: Float32Array;
  createdAt: number;
}

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
}

export interface Conversation {
  id: string;
  messages: Message[];
  createdAt: number;
  updatedAt: number;
}

export interface ScheduledTask {
  id: string;
  name: string;
  schedule: string;
  enabled: boolean;
  lastRun?: number;
  nextRun?: number;
}

export interface SearchResult {
  type: 'log' | 'event';
  id: string;
  score: number;
  excerpt: string;
  filePath?: string;
  markdownAnchor?: string;
  createdAt?: number;
}

export interface AppConfig {
  dataDir: string;
  aiProvider: 'openai' | 'claude';
  apiKey: string;
  model: string;
  scheduledTasks: ScheduledTask[];
  quietHours: { start: string; end: string };
}
