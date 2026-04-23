# Glade Implementation Roadmap

## Product Direction

Glade combines:

- Obsidian-style local file ownership.
- Evernote-style quick capture and search.
- Notion-style multi-view potential.
- Joplin-style offline-first reliability.

The central principle is:

> Recording is natural and flowing. Organization grows automatically.

## Phase 1: Reliable Local Recording

- Keep the current garden interface as the visual baseline.
- Route GUI, CLI, and future agent calls through a shared record service.
- Store each record in both SQLite and the daily Markdown journal.
- Support local keyword search with type and date filters.
- Let users open daily Markdown files directly.
- Keep AI optional and non-blocking.

## Phase 2: Grown Indexes

- Generate task, health, study, and topic index files from records.
- Add manual confirmation for extracted tasks or health notes.
- Add daily and weekly review files.
- Improve search with richer filters and possibly SQLite FTS.

## Phase 3: Agent-Assisted Knowledge

- Add explicit agent web search for new knowledge.
- Keep web search separated from private local records unless the user chooses to save results.
- Let users turn useful search results into records, references, or study notes.
- Add source links and timestamps to saved research notes.

## Phase 4: Richer Garden Experience

- Make the interface less panel-like and more spatial.
- Add restrained organic graphics and lively but calm interactions.
- Preserve the current natural green and daylight palette.
- Avoid turning Glade into a dashboard or database admin surface.
