// src/core/db/repositories/embedding.repository.ts
import { v4 as uuid } from 'uuid';
import { getDatabase, saveDatabase } from '../index.js';
import type { Embedding } from '../../../shared/types.js';

export class EmbeddingRepository {
  upsert(recordType: 'log' | 'event', recordId: string, provider: string, model: string, vector: Float32Array): Embedding {
    const db = getDatabase();
    const now = Date.now();
    const id = uuid();
    const vectorBlob = Buffer.from(vector.buffer);

    // Check if exists first
    const stmt = db.prepare('SELECT id FROM embeddings WHERE record_type=? AND record_id=? AND provider=?');
    stmt.bind([recordType, recordId, provider]);
    const exists = stmt.step();
    stmt.free();

    if (exists) {
      db.run('UPDATE embeddings SET model=?, vector=?, created_at=? WHERE record_type=? AND record_id=? AND provider=?',
        [model, vectorBlob, now, recordType, recordId, provider]);
    } else {
      db.run('INSERT INTO embeddings (id, record_type, record_id, provider, model, vector, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [id, recordType, recordId, provider, model, vectorBlob, now]);
    }
    saveDatabase();
    return { id, recordType, recordId, provider, model, vector, createdAt: now };
  }

  getByRecord(recordType: 'log' | 'event', recordId: string, provider: string): Embedding | null {
    const db = getDatabase();
    const stmt = db.prepare('SELECT * FROM embeddings WHERE record_type=? AND record_id=? AND provider=?');
    stmt.bind([recordType, recordId, provider]);
    if (stmt.step()) {
      const row = stmt.get();
      stmt.free();
      return {
        id: row[0] as string,
        recordType: row[1] as 'log' | 'event',
        recordId: row[2] as string,
        provider: row[3] as string,
        model: row[4] as string,
        vector: new Float32Array((row[5] as Buffer).buffer),
        createdAt: row[6] as number,
      };
    }
    stmt.free();
    return null;
  }

  listByType(recordType: 'log' | 'event'): { recordId: string; vector: Float32Array; provider: string }[] {
    const db = getDatabase();
    const stmt = db.prepare('SELECT record_id, vector, provider FROM embeddings WHERE record_type=?');
    stmt.bind([recordType]);
    const results: { recordId: string; vector: Float32Array; provider: string }[] = [];
    while (stmt.step()) {
      const row = stmt.get();
      results.push({
        recordId: row[0] as string,
        vector: new Float32Array((row[1] as Buffer).buffer),
        provider: row[2] as string,
      });
    }
    stmt.free();
    return results;
  }

  deleteByRecord(recordType: 'log' | 'event', recordId: string): void {
    const db = getDatabase();
    db.run('DELETE FROM embeddings WHERE record_type=? AND record_id=?', [recordType, recordId]);
    saveDatabase();
  }
}