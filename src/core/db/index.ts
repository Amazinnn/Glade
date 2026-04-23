// src/core/db/index.ts
import initSqlJs, { Database } from 'sql.js';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

let db: Database;
let dbPath: string;

export async function initDatabase(dataDir: string): Promise<Database> {
  dbPath = join(dataDir, 'ai-life.db');
  const SQL = await initSqlJs({
    locateFile: (file: string) => `https://sql.js.org/dist/${file}`,
  });

  if (existsSync(dbPath)) {
    const buffer = readFileSync(dbPath);
    db = new SQL.Database(buffer);
  } else {
    db = new SQL.Database();
  }

  runMigrations(db);
  saveDatabase();
  return db;
}

function runMigrations(db: Database): void {
  const migration = readFileSync(join(__dirname, 'migrations', '001_initial.sql'), 'utf-8');
  db.exec(migration);
}

export function saveDatabase(): void {
  if (!db || !dbPath) return;
  const data = db.export();
  const buffer = Buffer.from(data);
  writeFileSync(dbPath, buffer);
}

export function getDatabase(): Database {
  if (!db) throw new Error('Database not initialized');
  return db;
}