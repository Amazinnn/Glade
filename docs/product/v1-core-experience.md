# Glade V1 Core Experience Spec

Last updated: 2026-05-01

This document answers one practical question before product code expands:

How should Glade actually be used in v1?

The point is not to add more philosophy. The point is to turn philosophy into product behavior.

## Product Backbone

Glade v1 stays inside one loop:

`record -> recover -> gently reflect`

The loop now has two structural layers:

- Ability module layer: six modules define what Glade can do.
- Interface orchestration layer: three surfaces define how the user works with those abilities.

The loop has seven hard rules:

- The user must be able to give Glade raw material quickly, even if the material is short, messy, or incomplete.
- The original material must be saved before any derived treatment becomes authoritative.
- Tags, streams, tasks, reviews, calendars, and Agent outputs are treatment or lens forms, not required writing forms.
- Agent-assisted shaping is central to the product's convenience and life, but it cannot replace or hide raw material.
- Output lens views can coexist with capture, recall, and Agent shaping, but they must remain grounded in source material.
- Modules expose capabilities to each other; no module swallows another module's source-of-truth rules.
- Modules can also contain internal plugins, but plugins must stay switchable, replaceable, and bounded by the owning module's interface.

### V1 Promise

Within five minutes, a busy but sensitive user should be able to:

- give Glade something real
- come back later and find it
- let Agent help shape it without being pressured or losing the original

## V1 Product Hierarchy

V1 is not a flat list of equal scenes. It is a layered product model.

### Ability Module Layer

Ability modules answer one question: what can Glade do?

They should expose clear capabilities to the rest of the product while keeping their own internal rules private.

#### 1. Input / Raw Capture

A user gives Glade original material.

This can be a sentence, a messy paragraph, a pasted fragment, a selected old record, a future voice transcript, or another raw signal. The user should not have to compose a polished diary entry before Glade becomes useful.

Success in Glade:

- the user does not first choose diary, note, task, or stream form
- capture feels blank, low-friction, and emotionally safe
- the material is saved as original raw material
- later treatment must not overwrite the raw material
- Agent availability does not control whether capture works

#### 2. Agent-Assisted Shaping

A user opens or calls Agent to help shape material.

This is Glade's core advanced function. Users will usually prefer this path because it is easier than manually writing long, structured records and then organizing them by hand.

Success in Glade:

- Agent can clarify, organize, connect, transform, delay, or sustain work around one or many pieces of material
- Agent uses module capabilities instead of owning raw capture, recall, output, tag, stream, or storage rules directly
- Agent output is labeled as draft, candidate, suggestion, link, or derived view
- Agent work can be accepted, ignored, edited, or traced back to source material
- Agent can make Glade feel alive without becoming the only doorway into the product

#### Agent-Assisted Shaping Behavior Matrix

These dimensions map the minimum behavior space:

| Material scope | Time mode | Goal scale | Example behavior | V1 stance |
| --- | --- | --- | --- | --- |
| Single material | Immediate | Short-term | Clean up one entry, extract a task candidate, suggest a tag, make a clean copy. | v1 light version |
| Single material | Immediate | Long-term | Mark one entry as a future thread seed, suggest a stream candidate, preserve a recurring theme hook. | v1 light version |
| Single material | Delayed or continuous | Short-term | Save now, ask Agent to organize tonight, remind tomorrow, or ask one later clarifying question. | v1 light version |
| Single material | Delayed or continuous | Long-term | Bring this entry back when similar material appears in later weeks. | later, design-aware |
| Many materials | Immediate | Short-term | Assemble today's fragments, summarize search results, create a next-day review or task candidate set. | v1 important |
| Many materials | Immediate | Long-term | Map a long stream, relationship thread, study thread, or health/mood observation without diagnosing. | v1 light through streams |
| Many materials | Delayed or continuous | Short-term | Support an exam week, trip, illness recovery, or project phase with daily gentle organization. | later |
| Many materials | Delayed or continuous | Long-term | Steward long-running life threads, recurring themes, yearly review, and external context over time. | north star |

Additional dimensions refine each behavior:

- user-written material versus external context
- explicit user request versus quiet suggested help
- editing expression versus organizing material versus connecting life threads
- one-off output versus maintained object
- local-only context versus source-aware web context

#### 3. Output / View / Output Lens

A user wants to view organized results over raw material.

Success in Glade:

- output lens views include long streams, calendars, task candidates, light reviews, search results, history, and later lenses
- these lens views are not writing forms
- opening a lens does not hide where its material came from
- lens views make recorded material useful again without becoming a second source of truth

#### 4. Life Rendering / Digest

A user wants Glade to render accumulated life material into a higher-level shape.

This is the advanced presentation layer above output lenses. It can create digests, recaps, thread summaries, rhythmic views, or other gentle renderings over local records.

Success in Glade:

- rendering is grounded in selected source material
- rendering stays optional and dismissible
- rendering does not score, diagnose, moralize, or become a performance dashboard
- rendering can be implemented through small plugins such as daily digest, weekly digest, stream recap, or period review

#### 5. Recall / Raw Recall

A user or Agent needs to find or inspect original material later.

Success in Glade:

- search works by text content, tags, dates, and remembered clues
- the user can directly browse historical files or diary files inside the app
- Agent may help widen recall, but raw recall does not depend on Agent interpretation
- results and file browsing both lead back to original material

#### 6. Memory Agent / Reflective Recall

A user wants help revisiting past material, not only finding one record.

This is the advanced memory layer above raw recall. It may help connect related entries, surface forgotten threads, compare periods, or prepare reflective recall. It must not replace search results with confident AI prose.

Success in Glade:

- Memory Agent shows which records, days, streams, or lenses it used
- reflective output remains draft or derived material
- the user can open the source material behind every reflective result
- memory work can be decomposed into plugins such as similar-moment recall, thread resurfacing, period comparison, or reflective question drafting

### Interface Orchestration Layer

Interface orchestration functions answer a different question: how does the user work with Glade's abilities?

They are closer to frontend surfaces and total consoles. They schedule, reveal, hide, and compose modules. They do not own source material, derived objects, or module internals.

#### Canopy Flow

Canopy Flow is the open compositional workbench where input, Agent shaping, output lenses, recall, and transient cards can coexist. It is a table for a full meal, not the meal itself.

Success in Glade:

- several modules can be present together without becoming one tangled feature
- each card or surface keeps its own source-of-truth responsibility
- Agent can sit beside current material and help without becoming the only surface
- detailed position, drag, and sidebar mechanics remain later UI design topics

#### Limpid Zen

Limpid Zen is the focused interface mode.

It hides nonessential functions so the user can enter a simple, clear, efficient workflow. It should feel quiet and fluid, not empty or underpowered.

Success in Glade:

- only the modules needed for the current focused flow are visible
- Agent assistance can still be available without visual pressure
- optional handling and output views can be hidden until summoned
- focus mode remains an orchestration surface, not a separate data model

#### Memory Flora

Memory Flora is the memory-browsing interface.

It centers output and recall views so the user can browse, wander, and revisit past records. It should make memory feel alive without turning the product into a dashboard.

Success in Glade:

- output lenses, raw recall, Life Rendering, and Memory Agent can work together
- past material remains browseable through source records, days, streams, and histories
- reflective or rendered views stay grounded in original material
- the interface supports exploration without requiring the user to build a database

### Internal Plugin Principle

Large modules must be modular inside, not only modular outside.

A plugin is a bounded micro-capability inside a module. It can be installed, removed, enabled, disabled, replaced, or deferred without rewriting the owning module or interface surfaces.

A plugin should define:

- what module owns it
- what input it accepts
- what output it returns
- what source-of-truth rule it must respect
- whether it is visible, hidden, optional, or background
- what happens when it fails

Examples:

- Output / View plugins: long stream, calendar, task candidate view, search result view, history view, review view
- Life Rendering plugins: daily digest, weekly digest, stream recap, period review, rhythm rendering
- Agent-Assisted Shaping plugins: clean copy, tag suggestion, stream suggestion, task extraction, delayed handling
- Memory Agent plugins: similar-moment recall, thread resurfacing, reflective question drafting, period comparison

Plugin rule:

Plugins extend a module. They do not bypass the module, mutate another module's state directly, or become hidden source-of-truth systems.

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

- Canopy Flow for raw capture, recall, output lenses, Agent shaping, and transient cards
- Limpid Zen for focused work with nonessential surfaces hidden
- Memory Flora for output-centered browsing and reflective recall
- a sparse way to summon or reveal high-level modules
- calm coexistence without equal-weight dashboard pressure

Not allowed in v1:

- homepage KPI blocks
- control-center density
- forcing every card to compete for equal attention

### Glade v1 is not an AI-first product

Judgment rule:
If the user must enter chat to record or recover raw material, it is out of v1.

Sharper rule:
Glade is Agent-forward, but raw-grounded. Agent-assisted shaping is core, but raw capture and recall must still work without Agent.

Allowed in v1:

- Agent-assisted shaping over one or many materials
- AI drafting, extraction, connection, and lens preparation
- user-requested or gently suggested Agent help that stays traceable to sources

Not allowed in v1:

- chat as the default home
- AI rewriting raw records without consent
- AI answers replacing search results
- Agent swallowing raw capture, recall, lens, tag, or storage rules into one tangled feature

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
| `Raw Signal` | Any original material the user gives Glade, including a short sentence, messy paragraph, paste, selected old material, or future voice transcript. | User capture or user-selected source. | Yes, where the source allows it. | Input material before shaping. |
| `Raw Entry` | One saved original-material unit before treatment. | Raw capture. | Yes, within the raw editing rules that will be specified later. | Primary raw material unit. |
| `Raw Log` | The appendable original-material archive used for backtracking and inspection. | System writes on save. | Mostly append-first in v1. | Primary human-readable truth. |
| `Daily Note` | A day-based file or view that can organize raw entries by date. | System creates from saved raw entries. | Yes. | One important raw-material organization form, not necessarily the only frontstage input form. |
| `Interface Surface Card` | A card or surface showing capture, recall, a lens, Agent shaping, memory browsing, focused work, or a transient handling aid. | User or product surface opens it. | Yes, layout details later. | View layer only. |
| `Long Stream` | A persistent long-running theme page that compiles selected records into one time-ordered flow. | User creates the stream; system maintains its compiled contents over time. | Yes. The user may add, remove, rename, or inspect membership. | Compiled view layer only. Never replaces the raw notes. |
| `Tag` | A user-approved tag attached to a stream or used to help classify stream content. | User creates directly, or user accepts an agent suggestion. | Yes. The user owns visible tag names. | Support structure only. Not a primary truth layer. |
| `Task Candidate` | A suggested action grown from one or more records. | AI or deterministic extraction after save. | Yes. The user may keep, rename, or dismiss. | Derived layer only. Never overrides the record. |
| `Light Review` | A small recap attached to a day and grounded in that day's records. | AI draft created on demand or quietly in the evening. | Yes. The user may open, ignore, or regenerate. | Derived layer only. Never becomes the day's authority. |
| `Search Result` | A retrieval package that points back to a day or record with enough snippet context to reopen it. | Local search engine. | No. It is a view object. | No source-of-truth status. |
| `Signal` | A weak extracted hint such as person, topic, mood, study, or health. | AI or light local extraction. | Not directly in v1. Signals remain inspectable hints. | Derived layer only. |
| `Agent-Assisted Shaping Output` | A draft, candidate, connection, transformation, reminder request, or maintained object proposed by Agent over source material. | Agent, using module capabilities. | Yes, the user can accept, edit, ignore, or dismiss. | Derived layer only until explicitly accepted into another object. |
| `Life Rendering Output` | A digest, recap, period rendering, stream rendering, or other higher-level presentation over accumulated material. | Life Rendering plugin, sometimes with Agent help. | Yes, as draft or derived output. | Derived presentation layer only. |
| `Memory Agent Output` | A reflective recall result, resurfaced thread, comparison, or question draft over past material. | Memory Agent plugin. | Yes, as draft or derived output. | Derived memory layer only. Never replaces raw recall. |
| `Module Plugin` | A bounded micro-capability owned by one ability module. | Product design or implementation. | Usually configurable later. | No source-of-truth role by itself. |
| `External Context` | Source-aware material from outside the user's local records, such as future web search results. | Agent only with explicit user intent or later allowed rules. | User can save or discard. | Reference material only, not user raw material. |

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
- Agent shaping output is never raw truth by default.
- External context is never user-written memory unless the user explicitly saves it as such.
- Modules expose capabilities to each other but keep their own authority rules.
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

### Module Plugin

- `available`: plugin exists and can be used by its owning module
- `enabled`: plugin is active for the current user or surface
- `disabled`: plugin exists but is turned off
- `deferred`: plugin is designed as a future capability but not implemented yet
- `failed_soft`: plugin failed without breaking the owning module's core behavior

## Surface And Layout Priorities

V1 should stop treating the app as a fixed set of equal panels.

The current prototype already has the right garden tone, but the structure is too fixed. V1 should rebalance around one fact:

Raw capture is the foundation. Agent-assisted shaping is the core convenience path. Output lens views help the user reuse and understand what has been recorded. Canopy Flow, Limpid Zen, and Memory Flora decide how much of this is visible at once.

### Surface Rules

- Canopy Flow can hold capture, recall, output lenses, Agent shaping, and transient cards together.
- Limpid Zen can hide nonessential modules for a focused workflow.
- Memory Flora can center recall, output lenses, Life Rendering, and Memory Agent for memory browsing.
- The capture card stays simple and always available.
- Agent-assisted shaping should be easy to summon because it is the core advanced function.
- Output lens cards include long stream, calendar, task candidate view, review, search result, and history/file browsing.
- Plugin-backed views can be added or disabled without rewriting the interface orchestration layer.
- Agent chat may be one interface for shaping, but shaping is broader than chat.
- Search is globally reachable, but visually secondary.
- Detailed card movement and layout mechanics are UI design work for later.

## Key Flow A: Raw Capture

This is the foundation flow in the product.

### Entry

- the user can immediately give Glade a raw signal
- keyboard entry is available by default on desktop
- Agent help is nearby but does not gate capture

### Main interaction

1. The user provides a raw signal.
2. No required fields appear.
3. The user may optionally open a transient handling card such as tags, stream intent, or a note to Agent.
4. On save, the system writes the original block into the raw log first.
5. After raw save succeeds, the system updates index and view state.

### Feedback

- visible saved state and timestamp
- lightweight success confirmation, not a celebratory animation

### Exit points

- keep writing
- open the raw entry in context
- open history or output lens views
- leave the app

### Failure behavior

- If raw save fails, the save fails clearly and the draft stays in place.
- If raw save succeeds but indexing fails, the entry stays saved and the UI shows a small retry state such as `saved locally, search update pending`.
- Agent handling failure must never block the save.

## Key Flow B: Agent-Assisted Shaping

This is the core advanced flow in the product.

It begins from a raw signal, a saved record, a set of records, a search result, an output lens, or a future external context source.

### Trigger

- the user explicitly asks Agent to help
- the user opens Agent beside current material
- Glade offers a quiet suggestion based on local context, without interrupting capture

### Main interaction

1. The user gives or selects material.
2. Agent states what source scope it is using.
3. Agent proposes a draft, candidate, connection, transformation, delayed handling, or maintained object.
4. The user accepts, edits, ignores, dismisses, or asks for a different shape.
5. Accepted output becomes the correct derived object, such as a task candidate, stream membership, review draft, tag suggestion, or saved note.

### Feedback

- every Agent output is labeled as draft, candidate, suggestion, connection, or derived view
- source material remains reachable from the output
- the user can tell whether the Agent used one material, many materials, local history, or external context

### Exit points

- return to raw capture
- open the source material
- open the relevant output lens
- save, accept, dismiss, or defer the Agent output

### Failure behavior

- Agent failure does not block raw capture, raw recall, or lens viewing
- partial Agent output stays draft-only until accepted
- if Agent cannot access enough context, it says so plainly and offers a smaller scope

## Key Flow C: Grow Task Candidates From Writing

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

## Key Flow D: Add A Day Or Record Into A Long Stream

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

## Key Flow E: Raw Recall

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

## Key Flow F: View A Light Review

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

Agent is the core advanced function, not a decorative add-on.

This contract exists so Agent shaping stays useful, modular, and raw-grounded instead of becoming an opaque chat product.

| Situation | AI allowed? | Context AI may read | Output type | Hard prohibition |
| --- | --- | --- | --- | --- |
| Saving a raw record | No, not for the save path itself | None required for persistence | None | AI cannot gate capture |
| Agent-assisted shaping over one material | Yes | The selected raw signal or saved record | draft, candidate, tag suggestion, clean copy, clarification, deferred handling request | AI cannot overwrite the source material |
| Agent-assisted shaping over many materials | Yes | User-selected records, search results, day, stream, or lens scope | summary, connection, thread map, candidate set, review draft | AI cannot hide which material was used |
| Agent-assisted shaping with external context | Later | Explicitly requested source-aware external material | reference, comparison, saved source candidate | AI cannot mix external context into user memory without labeling |
| Task candidate extraction | Yes | The newest record, plus nearby same-day records if needed | `Task Candidate[]` | AI cannot auto-create final tasks without user acknowledgment |
| Light review generation | Yes | Today's saved records only | `Light Review draft` | AI cannot diagnose, coach, or moralize |
| Life Rendering / Digest | Yes, optional | User-selected day, period, stream, or lens scope | digest, recap, period rendering, stream recap | AI cannot turn life into scores or dashboard metrics |
| Memory Agent / Reflective Recall | Yes, optional | User-selected records, recall results, stream, period, or lens scope | reflective recall, thread resurfacing, comparison, question draft | AI cannot replace raw recall or hide source material |
| Basic search | No by default | Local index only | `Search Result[]` | AI cannot replace search with a chat answer |
| Stream tag suggestion | Yes | User-approved primary tags, selected stream scope, and candidate records | `Tag[]` suggestions or membership suggestions | AI cannot publish new visible primary tags without user approval |
| Long stream maintenance | Yes | Selected records, stream membership, approved tags | compiled membership updates and secondary tag suggestions | AI cannot silently remove user-pinned records from a stream |
| Signal extraction | Yes, optional | Record text or day text | `Signal[]` | AI cannot rewrite raw records or mark hints as facts |

### AI Visibility Rules

- Every AI-generated object must be visibly labeled as a draft, candidate, or signal.
- The UI should reveal the scope used, for example `Based on today's note` or `From this record`.
- AI output must be separable from the raw note at a glance.
- Agent shaping should expose whether it used one material, many materials, a lens, or external context.

### AI Restraint Rules

AI must not:

- rewrite the user's raw note by default
- silently invent structure that appears authoritative
- trigger interruptions outside the current surface
- speak in coaching, diagnosis, or performance-management language
- auto-send notifications based on inferred meaning
- bypass module interfaces and directly mutate another module's source-of-truth state

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

1. Make raw capture and raw record persistence excellent.
2. Make raw recall reopen records and days reliably.
3. Add the first useful Agent-assisted shaping path on top of saved material.
4. Add output lens foundations such as long stream, task candidates, light review, search results, and history.
5. Expand Agent shaping through modular calls into recall, lens, tag, stream, review, and later external-context modules.

If a future implementation choice conflicts with this order, the default answer is to protect raw material and module boundaries.
