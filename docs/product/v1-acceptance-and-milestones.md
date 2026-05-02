# Glade V1 Acceptance And Milestones

Last updated: 2026-05-01

This document turns product intent into buildable acceptance checks.

## Acceptance Checklist

### A. Raw Capture And Raw Log

V1 is acceptable only if all of these are true:

- The user can immediately give Glade raw material, not first enter chat, dashboard, search, or setup.
- A user can capture and save one short or messy raw signal within `30` seconds of opening the app.
- Saving a record does not require type, tag, project, mood, stream, or task fields.
- Every saved entry lands in an original raw log or raw local file.
- Raw saved material remains readable outside the app.
- AI availability does not control whether the save path works.
- If indexing fails after a successful raw write, the user sees a small local-save-success state rather than data loss.

### B. Transient Handling During Capture

V1 is acceptable only if all of these are true:

- The user can briefly open optional handling such as tag selection, stream intent, or an Agent note during capture.
- The user can ignore all handling options and still save normally.
- Handling choices do not change the original raw text.
- Handling appears as transient support, not as its own required scene.
- Detailed handling mechanics are deferred until the flow and interaction specs.

### C. Raw Recall

V1 is acceptable only if all of these are true:

- Search works locally without needing remote AI.
- Search can recover by text fragment, tag, and date-like clue.
- Search results show day and snippet, not only titles or IDs.
- Selecting a result reopens the original material in context.
- The user can browse historical files or diary files inside the app.
- Empty search does not dead-end into a blank technical state.

### D. Output Lens Views

V1 is acceptable only if all of these are true:

- Output lens views are treated as lenses over raw material, not as writing forms.
- V1 supports at least one durable output lens beyond raw recall, with long stream as the leading candidate.
- Output lens views can coexist with capture, recall, and Agent shaping in Canopy Flow at the product-concept level.
- The source raw material remains reachable from each output lens view.

### E. Agent-Assisted Shaping

V1 is acceptable only if all of these are true:

- Agent-assisted shaping is available as a core advanced function over saved or selected material.
- Agent can produce at least one useful shaping output such as a clean copy, task candidate, tag suggestion, stream suggestion, light review draft, or material summary.
- Agent output is clearly labeled as draft, candidate, suggestion, connection, or derived view.
- Agent output exposes its source scope, such as one record, multiple records, a search result, a day, or a stream.
- The user can accept, edit, dismiss, ignore, or defer Agent output.
- Agent failure does not block raw capture, raw recall, or output lens viewing.
- Agent shaping uses module capabilities instead of owning raw capture, recall, lens, tag, stream, and storage rules directly.

### F. Interface Orchestration Functions

V1 is acceptable only if all of these are true:

- `Canopy Flow` is treated as the open compositional workbench where multiple modules can coexist.
- `Limpid Zen` is treated as the focused surface where nonessential modules can be hidden.
- `Memory Flora` is treated as the memory-browsing surface centered on output, recall, Life Rendering, and Memory Agent.
- Interface orchestration surfaces can reveal, hide, and arrange module outputs without becoming source-of-truth owners.
- Interface orchestration surfaces do not duplicate module internals.

### G. Module And Plugin Boundaries

V1 is acceptable only if all of these are true:

- Each major ability module exposes a clear capability boundary before implementation grows.
- Large modules can contain internal plugins for subfeatures and micro-capabilities.
- A plugin belongs to one owning module and states its input, output, source rule, visibility, and failure behavior.
- Plugins can be enabled, disabled, replaced, or deferred without rewriting unrelated modules.
- Plugins do not directly mutate another module's source-of-truth state.
- Ideas from `temp.md` are treated as candidate module features or plugins, not as a fixed implementation roadmap.

### H. Advanced Ability Readiness

V1 design is acceptable only if all of these are true:

- `Life Rendering / Digest` has a clear boundary as advanced presentation, not raw capture or source truth.
- `Memory Agent / Reflective Recall` has a clear boundary as advanced memory work, not basic search replacement.
- Both advanced abilities can start with small plugins rather than one large monolithic feature.
- Their full implementation may be later, but their module interfaces must not contradict v1 raw capture, recall, output, or Agent shaping.
- Every future digest, rendering, or reflective recall output remains source-linked and dismissible.

### I. Task Candidate Basket

V1 is acceptable only if all of these are true:

- Task candidates are clearly labeled as candidates.
- Task candidates are derived after writing, not required before writing.
- The user can keep or dismiss a candidate without editing the raw note.
- Zero extracted candidates is treated as normal, not as an error.
- V1 does not require due dates, priorities, projects, or recurrence.

### J. Light Review

V1 is acceptable only if all of these are true:

- The review is optional and collapsed by default.
- The review is visibly grounded in the day's records.
- The review stays within the hard format and tone rules from `v1-core-experience.md`.
- The review can be ignored with no penalty.
- Review failure does not block reading or writing the day.

### K. Product Feel

V1 is acceptable only if all of these are true:

- The product feels Agent-forward but raw-grounded.
- The user can complete the basic loop without building a system.
- Derived structure feels supportive rather than supervisory.
- The product never speaks as if it knows the user better than the user's records do.

### L. Long Streams And Tags

V1 is acceptable only if all of these are true:

- A user can create a long stream without changing the raw daily-note model.
- A user can manually add a whole day, a file, or a selected record into a stream.
- A user can remove a record from a stream without deleting the original note.
- Records that never join any stream still work normally inside Glade.
- Visible primary tags are user-controlled.
- Agent-suggested secondary tags require user approval before becoming visible library tags.
- Detailed tags can stay hidden by default without breaking stream usefulness.

## Scenario Tests

These are the practical scenario checks to run against the product.

### Scenario 1: One-line capture

- Open the app from rest.
- Type one sentence.
- Save it.
- Confirm it appears in the raw log or raw local file.

Pass condition:
The user is not forced through any setup or classification step.

### Scenario 2: Mixed paragraph

- Write one paragraph containing memory, reminder, and feeling.
- Save it.
- Confirm the paragraph remains intact.
- Confirm task candidates, if any, appear outside the raw paragraph.

Pass condition:
The product does not split or rewrite the paragraph as a prerequisite for saving.

### Scenario 2b: Agent shapes a short raw signal

- Write or select a short messy signal.
- Ask Agent to help shape it.
- Confirm Agent output is labeled as a draft, candidate, suggestion, or derived view.
- Confirm the source raw signal remains unchanged and reachable.
- Accept, edit, dismiss, or defer the output.

Pass condition:
Agent makes the material more useful without becoming the source of truth.

### Scenario 3: Recover from a partial clue

- Search for a remembered fragment such as `flower road`.
- Confirm results show day context and a useful snippet.
- Open one result and confirm the original material returns.

Pass condition:
Recovery feels like reopening a life moment, not querying a database table.

### Scenario 3b: Browse original history

- Open the history or file browsing view.
- Navigate to a previous day or diary file.
- Open the original material.

Pass condition:
The user can recover raw material without relying only on search.

### Scenario 4: Night review

- Open a day with enough saved material after evening threshold.
- View the light review.
- Dismiss it or regenerate once.

Pass condition:
The review reads as gentle observation, not coaching or analysis.

### Scenario 5: No system building

- Use the app end to end without creating tags, templates, projects, or custom schemas.

Pass condition:
The loop still works: capture, find, shape, and lightly reflect.

### Scenario 5b: Canopy Flow coexistence

- Open the capture card.
- Open Agent-assisted shaping beside saved or selected material.
- Open one output lens card such as a long stream, calendar, task candidate view, review, or search result.
- Confirm that all can exist in Canopy Flow at the product-concept level.

Pass condition:
Capture remains simple, Agent shaping is available, and output lenses stay clearly separate from the raw material.

### Scenario 5c: Plugin boundary check

- Choose one module subfeature such as long stream view, task candidate view, digest, tag suggestion, or reflective recall.
- Confirm it has a named owning module.
- Confirm it has clear input, output, source rule, visibility, and failure behavior.
- Disable or defer it conceptually and confirm the owning module still makes sense.

Pass condition:
The product can add or remove a small capability without rewriting the whole module or interface surface.

### Scenario 6: Build a long stream on purpose

- Create a stream such as `Study`.
- Add one saved record from today.
- Add one older record from a past day.
- Open the stream and confirm the entries are listed in time order.
- Remove one entry from the stream.

Pass condition:
The stream changes, but the original daily records remain untouched.

## Milestones

The build should follow this order. Do not shuffle it unless there is a hard technical reason.

### M1: Raw Capture + Raw Log

Deliverables:

- raw capture as the default foundation path
- capture of short, messy, or incomplete signals into original raw storage
- visible saved state after capture
- open raw local file or raw history affordance
- stable local persistence before any AI dependency

Exit criteria:

- Scenario 1 passes
- raw local material is the human-readable ground truth
- save failures are clear and non-destructive

### M2: Raw Recall

Deliverables:

- local search index usable from the working surface
- text and tag search
- original material reopen from search result
- in-app historical file or diary browsing
- empty and fallback search states

Exit criteria:

- Scenario 3 passes
- Scenario 3b passes
- raw record recovery works before any AI answer layer exists

### M3: Agent-Assisted Shaping Foundation

Deliverables:

- first Agent shaping path over saved or selected material
- source-scope visibility for Agent output
- user acceptance, dismissal, and edit path for Agent output
- draft/candidate/suggestion labels
- module-boundary rule: Agent calls capture, recall, and lens capabilities instead of owning their internals
- first shaping plugin boundary, such as clean copy, task extraction, tag suggestion, or stream suggestion

Exit criteria:

- Scenario 2b passes
- at least one Agent shaping case is useful without requiring a long manual entry
- Agent failure does not block raw capture or recall

### M4: Output Lens Foundation

Deliverables:

- Canopy Flow concept for capture, recall, Agent shaping, and output lenses
- documented relationship to Limpid Zen and Memory Flora as later interface directions
- card concept for foundation abilities and Agent shaping
- one first output lens implemented or specified deeply enough for implementation
- raw source links from output lens back to original material
- first output plugin boundary, such as long stream, calendar, task candidate view, review view, search result view, or history view

Exit criteria:

- Scenario 5b passes
- Scenario 5c passes for the first output plugin
- output lens views are clearly not writing forms

### M5: Task Candidates + Light Review

Deliverables:

- post-save task candidate extraction
- keep / dismiss candidate actions
- evening or on-demand light review draft
- one regenerate action and clear dismissal path

Exit criteria:

- Scenario 2 passes
- Scenario 4 passes
- derived layers remain visibly secondary to raw material

### M6: Long Streams + Tag Library

Deliverables:

- user-created long streams
- manual add/remove record membership
- visible primary tags owned by the user
- agent-assisted secondary tag suggestions
- background stream materialization for direct reopening

Exit criteria:

- Scenario 6 passes
- stream membership never rewrites source records
- stream viewing reduces repeated large-text searches for recurring themes

### Later: Life Rendering, Memory Agent, And Plugin Expansion

Deliverables:

- Life Rendering / Digest plugins such as daily digest, weekly digest, stream recap, or period review
- Memory Agent plugins such as similar-moment recall, thread resurfacing, reflective question drafting, or period comparison
- plugin enable/disable rules for user-facing and background capabilities
- clear source backlinks from every rendered or reflective output

Exit criteria:

- richer memory and rendering functions grow by plugin boundaries, not by cross-module hard-coding
- every advanced output remains traceable to raw material

## Default Assumptions Locked For Implementation

- Desktop is the primary v1 surface.
- Raw capture is the default foundation path.
- Agent-assisted shaping is the core advanced function users are expected to prefer for convenience.
- Glade is Agent-forward but raw-grounded.
- Calendar day remains an important storage and browsing lens, but it is not the only frontstage input concept.
- Raw local material is written first; indexing and derived layers follow.
- Long streams are compiled continuity views built on top of raw material, not a second source-of-truth layer.
- Visible tags are user-owned; agent-expanded deeper tags are assistive and may remain hidden by default.
- Task candidates stop at candidate-level in v1 and do not grow into a full task system.
- Search is record-first and context-first before it is semantic or agentic.
- Agent-assisted shaping requires a separate harness design discussion before deep tool, permission, scheduling, or external web capabilities.
- Foundation modules should expose capabilities while keeping their own source-of-truth rules.
