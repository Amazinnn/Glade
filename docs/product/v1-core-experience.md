# Glade V1 Core Experience Spec

Last updated: 2026-04-29

This document answers one practical question before product code expands:

How should Glade actually be used in v1?

The point is not to add more philosophy. The point is to turn philosophy into product behavior.

## Product Backbone

Glade v1 stays inside one loop:

`record -> recover -> gently reflect`

The loop has five hard rules:

- The raw input surface is the first product surface.
- The original entry must be saved as raw material before any derived treatment becomes authoritative.
- Tags, streams, tasks, reviews, and calendars are treatment or output forms, not required writing forms.
- Output views can coexist with input as movable cards, but they must remain grounded in raw material.
- Agent-assisted handling is important, but its harness design should be specified separately.

### V1 Promise

Within five minutes, a busy but sensitive user should be able to:

- record something real
- come back later and find it
- receive light help without being pressured

## Core Usage Scenes

These are the scenes v1 must serve well. They are concrete product moments, not implementation mechanisms.

### 1. Raw Input

A user opens Glade and writes freely into a blank input surface.

Success in Glade:

- the user does not first choose diary, note, task, or stream form
- the writing surface feels blank and low-friction
- the entry is saved as original raw material
- later treatment must not overwrite the raw text

### 2. Light Handling During Input

A user is writing and may optionally attach light handling instructions without turning the input surface into a form.

Success in Glade:

- the user can ignore all handling options and just write
- the user can attach tags, stream intent, or a handling note when needed
- the extra handling stays optional and quiet
- the raw entry remains valid even if no handling is chosen

### 3. Raw Recall

A user wants to find or inspect original material later.

Success in Glade:

- search works by text content and tags
- the user can directly browse historical files or diary files inside the app
- results and file browsing both lead back to original material
- recovery does not depend on Agent interpretation

### 4. Output Views

A user wants to view organized results produced from raw material.

Success in Glade:

- output views include long streams, calendars, task views, reviews, search results, and other later views
- these views are not writing forms
- opening an output view does not hide where its material came from
- output views are v1 core because they make recorded material useful again

### 5. Compose The Working Surface

A user may want input and output views visible at the same time.

Success in Glade:

- the sidebar lets the user choose which high-level surfaces are present
- the main background can hold cards such as input, long stream, calendar, task view, and Agent chat
- card position and layout are a UI design topic for later
- the product concept is clear now: input and output can coexist without becoming the same thing

## V1 Boundaries And Anti-Goals

These are hard boundaries. They exist so the product does not drift into the wrong category.

### Glade v1 is not a task manager

Judgment rule:
If a feature needs projects, priorities, deadlines, recurring logic, or productivity views before freeform recording works, it is out of v1.

Allowed in v1:

- task candidates
- keep / dismiss
- simple carry-forward later if needed

Not allowed in v1:

- project trees
- due-date workflows
- scheduling logic
- recurring tasks

### Glade v1 is not a psychology analyzer

Judgment rule:
If a feature interprets motives, diagnoses feelings, scores mental state, or speaks like a therapist, it is out of v1.

Allowed in v1:

- gentle observational language
- weak mood or tone signals as non-authoritative hints

Not allowed in v1:

- emotional scoring
- personality claims
- advice disguised as insight

### Glade v1 is not a dashboard

Judgment rule:
If the working surface becomes a fixed metrics board or operational control center, it is out of v1.

Allowed in v1:

- movable cards for input and output views
- a sparse sidebar for choosing high-level surfaces
- calm coexistence of input, output, and Agent chat cards

Not allowed in v1:

- homepage KPI blocks
- control-center density
- forcing every card to compete for equal attention

### Glade v1 is not an AI-first product

Judgment rule:
If the user must enter chat to record or recover raw material, it is out of v1.

Allowed in v1:

- AI drafting
- AI extraction
- AI review generation

Not allowed in v1:

- chat as the default home
- AI rewriting raw records without consent
- AI answers replacing search results
- defining the Agent harness before the product scenes are stable

### Glade v1 is not a workspace

Judgment rule:
If the experience begins with blank databases, templates, cells, or "build your system" behavior, it is out of v1.

Allowed in v1:

- daily notes
- derived baskets
- later views grown from life records

Not allowed in v1:

- database-first setup
- workspace language
- page-block-builder logic

### Glade v1 is not a tag-management product

Judgment rule:
If the user must spend meaningful effort designing, cleaning, or browsing a large tag taxonomy before recording and recovery feel good, it is out of bounds.

Allowed in v1:

- a user-approved tag library
- agent-suggested secondary tags
- optional visibility controls for detailed tags

Not allowed in v1:

- tag administration as a primary workflow
- forcing users to inspect internal tags before they can use streams
- exposing raw ontology maintenance as the main product experience

## Core Objects And Source Of Truth

V1 should treat the product as a layered system. Raw records are primary. Everything else is derived or view-level.

| Object | Definition | Created by | User editable in v1 | Source-of-truth role |
| --- | --- | --- | --- | --- |
| `Raw Entry` | One original freeform input written by the user before treatment. | User capture. | Yes, within the raw editing rules that will be specified later. | Primary raw material unit. |
| `Raw Log` | The appendable original-material archive used for backtracking and inspection. | System writes on save. | Mostly append-first in v1. | Primary human-readable truth. |
| `Daily Note` | A day-based file or view that can organize raw entries by date. | System creates from saved raw entries. | Yes. | One important raw-material organization form, not necessarily the only frontstage input form. |
| `View Card` | A movable card showing input, output, or Agent interaction on the working surface. | User opens through the sidebar or view controls. | Yes, layout details later. | View layer only. |
| `Long Stream` | A persistent long-running theme page that compiles selected records into one time-ordered flow. | User creates the stream; system maintains its compiled contents over time. | Yes. The user may add, remove, rename, or inspect membership. | Compiled view layer only. Never replaces the raw notes. |
| `Tag` | A user-approved tag attached to a stream or used to help classify stream content. | User creates directly, or user accepts an agent suggestion. | Yes. The user owns visible tag names. | Support structure only. Not a primary truth layer. |
| `Task Candidate` | A suggested action grown from one or more records. | AI or deterministic extraction after save. | Yes. The user may keep, rename, or dismiss. | Derived layer only. Never overrides the record. |
| `Light Review` | A small recap attached to a day and grounded in that day's records. | AI draft created on demand or quietly in the evening. | Yes. The user may open, ignore, or regenerate. | Derived layer only. Never becomes the day's authority. |
| `Search Result` | A retrieval package that points back to a day or record with enough snippet context to reopen it. | Local search engine. | No. It is a view object. | No source-of-truth status. |
| `Signal` | A weak extracted hint such as person, topic, mood, study, or health. | AI or light local extraction. | Not directly in v1. Signals remain inspectable hints. | Derived layer only. |

### Long Stream Rules

- A record may exist in zero streams, one stream, or multiple streams.
- If a user does not add a day or record into any stream, the note still exists normally inside the daily archive.
- The user may include a whole daily file, a selected block, or a later reopened record into a stream.
- Removing a record from a stream only changes stream membership. It does not delete the underlying record.
- The stream is a compiled time flow grounded in daily notes, not an alternate truth system.

### Tag Rules

- The user controls visible primary tags.
- The agent may propose secondary or deeper tags, but user approval is required before they become visible tags in the library.
- Detailed internal tags may remain hidden by default while still helping search and stream maintenance.
- A tag library exists to store approved tags and their relationships, but it must remain a support surface rather than the main home of the product.

### Authority Rules

- Raw material beats every derived layer.
- Human-readable local files beat opaque derived state.
- SQLite is the retrieval and relationship engine, not the emotional authority.
- Removing a record from a stream, or changing tag structure, must never rewrite the original record.
- Deleting or regenerating task candidates, reviews, or signals must never rewrite the original record.
- If derived layers conflict with the raw record, the raw record wins.

## State Model

This is the minimum state model needed before implementation.

### Daily Note

- `empty`: no saved records yet today
- `active`: at least one saved record exists
- `reopened`: the user came back to an existing day

### Raw Entry

- `draft`: text still in the capture box
- `saved_local`: written to the raw log or raw local file
- `indexed`: written to SQLite and available to search
- `index_retry_needed`: raw save succeeded but index/update failed
- `soft_deleted`: hidden from normal views but not physically erased from history in v1

### Long Stream

- `defined`: the stream exists but has little or no compiled material yet
- `collecting`: new material is being compiled into the stream
- `ready`: the stream view is available and up to date enough to open directly
- `review_needed`: the agent suggested additions or tag refinements need user confirmation

### Tag

- `approved_primary`: visible to the user by default
- `approved_secondary`: stored in the tag library but hidden unless expanded
- `suggested`: proposed by the agent but not yet accepted

### Task Candidate

- `suggested`: new and unseen
- `kept`: user accepted or lightly edited it
- `dismissed`: user rejected it

There is no separate full task engine in v1. The candidate basket is the end state.

### Light Review

- `unavailable`: not enough material or not requested yet
- `ready`: drafted and quietly waiting
- `opened`: user has viewed it
- `dismissed`: user chose to ignore it

### Search

- `idle`: no query yet
- `results`: one or more hits found
- `empty`: query ran, nothing useful found
- `fallback`: search index failed, so only manual reopen paths remain

## Surface And Layout Priorities

V1 should stop treating the app as a fixed set of equal panels.

The current prototype already has the right garden tone, but the structure is too fixed. V1 should rebalance around one fact:

Raw input is the default entry point. Output views help the user reuse and understand what has been recorded.

### Surface Rules

- The sidebar chooses which high-level surface or card is visible.
- The input card is the default card.
- Output cards include long stream, calendar, task view, review, search result, and history/file browsing.
- Agent chat can exist as a card, but Agent behavior should be designed in a separate harness specification.
- Search is globally reachable, but visually secondary.
- Detailed card movement and layout mechanics are UI design work for later.

## Key Flow A: Raw Input

This is the most important flow in the product.

### Entry

- app launch opens the input surface by default
- keyboard focus lands in the raw input field
- sidebar and other cards remain secondary

### Main interaction

1. The user writes one freeform block.
2. No required fields appear.
3. The user may optionally attach light handling such as tags, stream intent, or a note to Agent.
4. On save, the system writes the original block into the raw log first.
5. After raw save succeeds, the system updates index and view state.

### Feedback

- visible saved state and timestamp
- lightweight success confirmation, not a celebratory animation

### Exit points

- keep writing
- open the raw entry in context
- open history or output views
- leave the app

### Failure behavior

- If raw save fails, the save fails clearly and the draft stays in place.
- If raw save succeeds but indexing fails, the entry stays saved and the UI shows a small retry state such as `saved locally, search update pending`.
- Agent handling failure must never block the save.

## Key Flow B: Grow Task Candidates From Writing

This flow begins only after a record already exists.

### Trigger

- automatic background check after a successful save
- no separate user ritual required

### Main interaction

1. The system reads the newest saved record, plus optional nearby same-day context.
2. If the content contains a likely commitment, it creates `0-3` task candidates.
3. Candidates appear in today's basket with explicit `candidate` labeling.
4. The user may keep, rename, or dismiss each one.

### Feedback

- no alert sound
- no modal
- no pressure if zero candidates are found

### Exit points

- keep a candidate
- dismiss a candidate
- ignore the basket entirely

### Failure behavior

- if extraction fails, nothing blocks the user
- the basket simply remains unchanged
- the product may show a quiet retry affordance, but only inside the basket

## Key Flow C: Add A Day Or Record Into A Long Stream

This flow exists because long streams are partly curated, not purely inferred.

### Entry

- from a record action inside `Today`
- from a reopened past day
- from a stream page that offers `Add this day` or `Add selected record`

### Main interaction

1. The user selects `Add to Stream`.
2. The user chooses an existing long stream or creates a new one.
3. If creating a new stream, the user provides a stream name and may provide one or more broad primary tags.
4. The system stores the membership immediately.
5. Agent-assisted maintenance may then suggest secondary tags or additional related records.
6. A background script updates the stream's compiled timeline so the view is ready without repeated large-text searches.

### Feedback

- the user sees which stream the record joined
- the stream page updates in near real time rather than blocking the writing flow

### Exit points

- open the stream
- keep writing in `Today`
- review tag suggestions later

### Failure behavior

- if stream compilation lags, the membership still saves and the UI shows a small `updating stream` state
- if tag suggestion fails, the stream still exists and the user-visible primary tags remain valid

## Key Flow D: Raw Recall

The job of recall is to reopen original material.

### Entry

- search by text content or tag
- history/file browsing inside the app

### Main interaction

1. The user enters words, tags, a date-like phrase, or a remembered clue.
2. Local search runs against indexed raw entries first.
3. The user may also browse historical files or diary files directly.
4. Results show enough context to understand why they matched.
5. Selecting a result opens the original material in context.

### Feedback

- visible date for every result
- visible snippet for every result
- visible file/day context when browsing history
- explicit empty state when nothing relevant is found

### Exit points

- open a result's raw context
- refine the query
- browse history files
- clear search and return to input

### Failure behavior

- if search returns nothing, the empty state should suggest recent-day recovery rather than dead-end language
- if the local index is unavailable, the UI should say so plainly and offer manual reopen paths such as today's note or recent days
- search failure must never silently call remote AI

## Key Flow E: View A Light Review

This flow should feel like closing a window softly, not attending a meeting.

### Trigger

- the user opens the review area explicitly, or
- after 20:00 local time, the app may prepare a draft quietly if enough material exists

### Material threshold

The system should only prepare a review when there is enough material:

- at least `2` saved records today, or
- at least `120` characters of saved content today

### Main interaction

1. A small review card becomes available in a collapsed state.
2. The user may open it when ready.
3. The system shows a short draft grounded in today's records.
4. The user may close it, ignore it, or request one regeneration.

### Feedback

- the card must show that it is a draft, not a verdict
- the card should expose what it used, such as `Based on 3 records from today`

### Exit points

- open and read
- close without action
- regenerate once
- dismiss for today

### Failure behavior

- review generation failure must not interrupt the day view
- the card should fall back to a small retry affordance such as `Couldn't prepare a recap`

## AI Behavior Contract

AI is a support layer. This contract exists so it stays in its place.

| Situation | AI allowed? | Context AI may read | Output type | Hard prohibition |
| --- | --- | --- | --- | --- |
| Saving a raw record | No, not for the save path itself | None required for persistence | None | AI cannot gate capture |
| Task candidate extraction | Yes | The newest record, plus nearby same-day records if needed | `Task Candidate[]` | AI cannot auto-create final tasks without user acknowledgment |
| Light review generation | Yes | Today's saved records only | `Light Review draft` | AI cannot diagnose, coach, or moralize |
| Basic search | No by default | Local index only | `Search Result[]` | AI cannot replace search with a chat answer |
| Stream tag suggestion | Yes | User-approved primary tags, selected stream scope, and candidate records | `Tag[]` suggestions or membership suggestions | AI cannot publish new visible primary tags without user approval |
| Long stream maintenance | Yes | Selected records, stream membership, approved tags | compiled membership updates and secondary tag suggestions | AI cannot silently remove user-pinned records from a stream |
| Signal extraction | Yes, optional | Record text or day text | `Signal[]` | AI cannot rewrite raw records or mark hints as facts |

### AI Visibility Rules

- Every AI-generated object must be visibly labeled as a draft, candidate, or signal.
- The UI should reveal the scope used, for example `Based on today's note` or `From this record`.
- AI output must be separable from the raw note at a glance.

### AI Restraint Rules

AI must not:

- rewrite the user's raw note by default
- silently invent structure that appears authoritative
- trigger interruptions outside the current surface
- speak in coaching, diagnosis, or performance-management language
- auto-send notifications based on inferred meaning

## Search Semantics For V1

Search must be defined as product behavior before it is defined as engineering technique.

### Search job

Search should help the user recover:

- an original text fragment
- a day
- a person or recurring topic if signals exist
- a previously generated light review
- a long stream when the user already knows the theme they want

### Search should not do this

- answer with a synthetic essay instead of results
- hide the original record behind AI prose
- flatten different life moments into one undifferentiated list with no date context

### Search And Streams Are Different

- Search is for rediscovering something partially remembered.
- A long stream is for reopening a known life thread that has already been curated or compiled.
- Search may point the user toward a stream, but it must not replace stream maintenance.

### Result unit

The primary result unit is `record in day context`.

Every result should expose:

- day
- time
- matched snippet
- reason for match if not obvious
- one clear action back to the day

### Ranking rules

1. Exact text and phrase matches rank first.
2. Explicit date matches rank next when the query looks temporal.
3. Signal-assisted person/topic matches may appear after direct text matches.
4. Light reviews rank below raw records from the same day if both exist.

### Grouping rules

- Results group by day before they group by metadata.
- Multiple hits from the same day should fold into one day block with expandable snippets.
- Search should preserve recency cues without destroying relevance.

## Hard Rules For "Light" Review

`Light` must become a buildable constraint, not a vague adjective.

### Format

- `2-4` short bullets, or
- one short paragraph plus one optional loose-end line

### Length

- maximum `120` words total
- no bullet longer than `18` words

### Tone

- observational
- concrete
- non-clinical
- non-coaching

### Required behavior

- grounded in the user's actual records
- allowed to mention one possible loose end
- allowed to notice one recurring thread

### Forbidden behavior

- scoring the day
- prescribing self-improvement
- inventing feelings as facts
- interpreting the user's character

### Display rules

- collapsed by default
- expandable inline inside the day context
- dismissible without penalty
- regenerable once per day by explicit user action

## Implementation Consequences

This document implies a narrow v1 build order:

1. Make `Today` and raw record persistence excellent.
2. Make search reopen records and days reliably.
3. Add the user-controlled long-stream and tag-library foundation.
4. Add derived support layers: task candidates, light review, and agent-assisted stream maintenance.

If a future implementation choice conflicts with this order, the default answer is to protect `Today`.
