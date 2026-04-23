// src/core/db/repositories/embedding.repository.ts
import { v4 as uuid } from 'uuid';
import { getDatabase } from '../index.js';
import type { Embedding } from '../../../shared/types.js';

export class EmbeddingRepository {
  upsert(recordType: 'log' | 'event', recordId: string, provider: string, model: string, vector: Float32Array): Embedding {
    const db = getDatabase();
    const now = Date.now();
    const id = uuid();
    const vectorBlob = Buffer.from(vector.buffer);
    db.prepare(`
      INSERT INTO embeddings (id, record_type, record_id, provider, model, vector, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(record_type, record_id, provider) DO UPDATE SET
        model=excluded.model, vector=excluded.vector, created_at=excluded.created_at
    `).run(id, recordType, recordId, provider, model, vectorBlob, now);
    return { id, recordType, recordId, provider, model, vector, createdAt: now };
  }

  getByRecord(recordType: 'log' | 'event', recordId: string, provider: string): Embedding | null {
    const db = getDatabase();
    const row = db.prepare('SELECT * FROM embeddings WHERE record_type=? AND record_id=? AND provider=?').get(recordType, recordId, provider) as any;
    if (!row) return null;
    return {
      id: row.id,
      recordType: row.record_type as 'log' | 'event',
      recordId: row.record_id,
      provider: row.provider,
      model: row.model,
      vector: new Float32Array(row.vector.buffer),
      createdAt: row.created_at,
    };
  }

  listByType(recordType: 'log' | 'event'): { recordId: string; vector: Float32Array; provider: string }[] {
    const db = getDatabase();
    const rows = db.prepare('SELECT record_id, vector, provider FROM embeddings WHERE record_type=?').all(recordType) as any[];
    return rows.map(row => ({
      recordId: row.record_id,
      vector: new Float32Array(row.vector.buffer),
      provider: row.provider,
    }));
  }

  deleteByRecord(recordType: 'log' | 'event', recordId: string): void {
    getDatabase().prepare('DELETE FROM embeddings WHERE record_type=? AND record_id=?').run(recordType, recordId);
  }
}