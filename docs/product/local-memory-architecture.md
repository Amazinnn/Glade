# Glade Local Memory Architecture

Glade is local-first. The user-readable Markdown journal and the SQLite index are both primary parts of the product.

## Data Layout

```text
data/
├─ ai-life.db
├─ journal/
│  └─ YYYY/
│     └─ MM/
│        └─ YYYY-MM-DD.md
├─ reviews/
│  ├─ daily/
│  ├─ weekly/
│  └─ monthly/
├─ indexes/
│  ├─ tasks.md
│  ├─ health.md
│  ├─ study.md
│  └─ topics/
├─ attachments/
└─ .aisnap/
```

## Storage Roles

- Markdown is the human-readable life record. It should remain directly openable outside Glade.
- SQLite is the index, search, relationship, and view engine.
- The renderer, CLI, and future agents should call the same core record service.

## Record Blocks

Every new record is appended to the daily journal with a stable ID marker:

```md
<!-- ai-life:id=<uuid> type=<log|event> created=<iso-time> -->
### HH:mm · 随手记录

Record content
```

The SQLite `records` table stores the same ID, content, type, timestamps, tags, metadata, file path, Markdown anchor, and soft-delete state.

## First-Stage Behavior

- Users only need to record. They do not need to manually classify everything.
- Events such as tasks, health, study, expenses, and custom moments live in the same daily timeline.
- Search uses the local SQLite index first.
- AI is optional and user-triggered. It does not own the source of truth.
- Deletes are soft deletes in SQLite. Markdown history is not physically removed in the first stage.

## Future Growth

- Generated index files can summarize tasks, health, study, and topics.
- Semantic search and embeddings can be layered over the local index.
- Agent web search can later help users gather new knowledge, but it must remain explicit and separate from private local memory.
