# Where Glade Stores Data

Glade stores data locally first.

On Windows, the default data directory is:

```text
%APPDATA%\ai-life-assistant\data
```

Depending on the environment, `%APPDATA%` usually resolves to a folder under your Windows user profile.

## Important Files

```text
ai-life.db
```

SQLite database used for indexes, search, timestamps, tags, metadata, and record links.

```text
journal/YYYY/MM/YYYY-MM-DD.md
```

Human-readable daily Markdown journal. You can open these files directly.

```text
indexes/
```

Generated or future index files for tasks, health, study, and topics.

```text
reviews/
```

Future daily, weekly, and monthly review files.

```text
.aisnap/
```

Local backup snapshots.

## Record Format

Daily Markdown entries include stable markers:

```md
<!-- ai-life:id=<uuid> type=log created=<iso-time> -->
### HH:mm · 随手记录

Your record
```

These markers let Glade connect Markdown blocks back to SQLite search results without hiding your text from you.
