#!/usr/bin/env node

// src/cli/index.ts
import { program } from 'commander';
import { initDatabase } from '../core/db/index.js';
import { createProvider } from '../core/ai/index.js';
import { registerLogCommands } from './commands/log.js';
import { registerEventCommands } from './commands/event.js';
import { registerAICommands } from './commands/ai.js';
import { registerSearchCommands } from './commands/search.js';
import { getDataDir } from '../core/storage/markdown.js';

const dataDir = getDataDir();
initDatabase(dataDir);

const apiKey = process.env.OPENAI_API_KEY || process.env.ANTHROPIC_API_KEY || '';
if (apiKey) {
  const type = process.env.OPENAI_API_KEY ? 'openai' : 'claude';
  createProvider(type, apiKey);
}

program.name('ai-life').description('AI 生活记录助手').version('1.0.0');

registerLogCommands(program);
registerEventCommands(program);
registerAICommands(program);
registerSearchCommands(program);

program.parse();