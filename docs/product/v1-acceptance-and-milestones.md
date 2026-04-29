# Glade V1 Acceptance And Milestones

Last updated: 2026-04-29

This document turns product intent into buildable acceptance checks.

## Acceptance Checklist

### A. Raw Input And Raw Log

V1 is acceptable only if all of these are true:

- The app opens to a raw input surface, not to chat, dashboard, or search.
- A user can write and save one freeform block within `30` seconds of opening the app.
- Saving a record does not require type, tag, project, mood, stream, or task fields.
- Every saved entry lands in an original raw log or raw local file.
- Raw saved material remains readable outside the app.
- AI availability does not control whether the save path works.
- If indexing fails after a successful raw write, the user sees a small local-save-success state rather than data loss.

### B. Light Handling During Input

V1 is acceptable only if all of these are true:

- The user can attach optional handling such as tags or stream intent during input.
- The user can ignore all handling options and still save normally.
- Handling choices do not change the original raw text.
- Detailed handling mechanics are deferred until the input interaction spec.

### C. Raw Recall

V1 is acceptable only if all of these are true:

- Search works locally without needing remote AI.
- Search can recover by text fragment, tag, and date-like clue.
- Search results show day and snippet, not only titles or IDs.
- Selecting a result reopens the original material in context.
- The user can browse historical files or diary files inside the app.
- Empty search does not dead-end into a blank technical state.

### D. Output Views

V1 is acceptable only if all of these are true:

- Output views are treated as views over raw material, not as writing forms.
- V1 supports at least one durable output view beyond raw recall, with long stream as the leading candidate.
- Output views can coexist with input on the working surface at the product-concept level.
- The source raw material remains reachable from each output view.

### E. Task Candidate Basket

V1 is acceptable only if all of these are true:

- Task candidates are clearly labeled as candidates.
- Task candidates are derived after writing, not required before writing.
- The user can keep or dismiss a candidate without editing the raw note.
- Zero extracted candidates is treated as normal, not as an error.
- V1 does not require due dates, priorities, projects, or recurrence.

### F. Light Review

V1 is acceptable only if all of these are true:

- The review is optional and collapsed by default.
- The review is visibly grounded in the day's records.
- The review stays within the hard format and tone rules from `v1-core-experience.md`.
- The review can be ignored with no penalty.
- Review failure does not block reading or writing the day.

### G. Product Feel

V1 is acceptable only if all of these are true:

- The main surface feels input-first, not widget-first.
- The user can complete the basic loop without building a system.
- Derived structure feels supportive rather than supervisory.
- The product never speaks as if it knows the user better than the user's records do.

### H. Long Streams And Tags

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
The loop still works: write, find, and lightly reflect.

### Scenario 5b: Input and output coexist

- Open the input card.
- Open one output view card such as a long stream, calendar, task view, review, or search result.
- Confirm that both can be visible on the working surface at the product-concept level.

Pass condition:
Input remains simple, while output views stay clearly separate from the raw writing form.

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

### M1: Raw Input + Raw Log

Deliverables:

- raw input as the default home surface
- freeform capture into original raw storage
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

### M3: Output View Foundation

Deliverables:

- sidebar concept for choosing input, output, settings, and Agent surfaces
- card concept for input and output views
- one first output view implemented or specified deeply enough for implementation
- raw source links from output view back to original material

Exit criteria:

- Scenario 5b passes
- output views are clearly not writing forms

### M4: Task Candidates + Light Review

Deliverables:

- post-save task candidate extraction
- keep / dismiss candidate actions
- evening or on-demand light review draft
- one regenerate action and clear dismissal path

Exit criteria:

- Scenario 2 passes
- Scenario 4 passes
- derived layers remain visibly secondary to raw material

### M5: Long Streams + Tag Library

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

## Default Assumptions Locked For Implementation

- Desktop is the primary v1 surface.
- Raw input is the default starting surface.
- Calendar day remains an important storage and browsing lens, but it is not the only frontstage input concept.
- Raw local material is written first; indexing and derived layers follow.
- Long streams are compiled continuity views built on top of raw material, not a second source-of-truth layer.
- Visible tags are user-owned; agent-expanded deeper tags are assistive and may remain hidden by default.
- Task candidates stop at candidate-level in v1 and do not grow into a full task system.
- Search is record-first and context-first before it is semantic or agentic.
- Agent-assisted processing requires a separate harness design discussion.
