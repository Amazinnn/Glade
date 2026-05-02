# Glade V1 Low-Fidelity Wireframes

Last updated: 2026-05-01

These are structure sketches, not visual design finals.

Current status: provisional.

The macro product model changed on 2026-05-01:

- six ability modules define what Glade can do: `Input / Raw Capture`, `Agent-Assisted Shaping`, `Output / View`, `Life Rendering / Digest`, `Recall`, and `Memory Agent / Reflective Recall`
- three interface orchestration functions define how the user works with those abilities: `Canopy Flow`, `Limpid Zen`, and `Memory Flora`
- module subfeatures should become plugins where practical: installable, removable, switchable, and replaceable
- detailed movement, layout, and card mechanics belong to later UI design

This document should therefore be treated as a rough interaction reference, not as a locked screen plan.

## Layout Direction

The current renderer prototype already has a calm garden tone.

What must change in v1 is not the mood first. It is the hierarchy:

- raw capture stays simple and always available
- search becomes a clear recovery tool
- raw history/file browsing joins search as a recovery tool
- long streams, calendars, task candidate views, reviews, search results, and history are output lens cards
- Agent-assisted shaping is easy to summon and can work over one or many materials
- Agent chat is only one possible interface for shaping
- transient handling cards such as tags can appear and disappear without becoming scenes
- Canopy Flow is the open workbench for mixed-module work
- Limpid Zen is the focused flow with nonessential modules hidden
- Memory Flora is the output-centered memory browsing surface
- fixed equal-weight three-panel logic goes away

## Macro Surface Direction: Canopy Flow

```text
+--------------------------------------------------------------------------------------+
| [icons]  Canopy Flow                                                                  |
|                                                                                      |
|         +-------------------------------+       +--------------------------------+   |
|         | Raw Capture                   |       | Agent-Assisted Shaping         |   |
|         |                               |       |                                |   |
|         | short / messy / raw signal    |       | clarify / organize / connect   |   |
|         |                               |       |                                |   |
|         +-------------------------------+       +--------------------------------+   |
|                                                                                      |
|                         +------------------------------------------------------+     |
|                         | Output / Recall / Memory Card                        |     |
|                         | long stream / calendar / task / history / search      |     |
|                         +------------------------------------------------------+     |
+--------------------------------------------------------------------------------------+
```

### Why this direction matters

- The user can capture raw material without first choosing a document type.
- Agent-assisted shaping is present as the core advanced help path, not as a generic chat replacement.
- Output lenses are present as views, not as writing formats.
- Canopy Flow holds modules together, while exact placement is later UI design.

## Additional Interface Directions

### Limpid Zen

Limpid Zen should be sketched later as a focused mode:

- one main material or task is visible
- nonessential output lenses and handling cards are hidden
- Agent help is available without turning the surface into chat
- the mode does not create a separate data model

### Memory Flora

Memory Flora should be sketched later as a memory browsing surface:

- output lenses and recall views are central
- Memory Agent and Life Rendering can help organize browsing
- every rendered or reflective view keeps a path back to source records
- browsing past memory does not become a dashboard

## Earlier Today-Centered Sketches

The sketches below remain useful as examples of possible output or history views, but they should not be read as saying `Today` must be the only home surface.

## State 1: Home / Today

```text
+--------------------------------------------------------------------------------------+
| Glade                                       [ Search recent life... ]   Tue, Apr 29  |
+--------------------------------------------------------------------------------------+
| Today                                                                                |
|                                                                                      |
| [ Capture one block into today...                                             ]      |
| [ Save to Today ]                                                  [ Open Markdown ] |
|                                                                                      |
| 09:12  I saw a flower on the ride home and wanted to keep that color.               |
| 14:40  Need to reply to Lin tomorrow about the reading group.                       |
| 18:05  Tired, but the day felt less empty than yesterday.                           |
|                                                                                      |
|---------------------------------------------+----------------------------------------|
| Task Candidates                             | Gentle Review                          |
|                                             |                                        |
| - Reply to Lin tomorrow        [Keep][X]    | (collapsed until ready)                |
| - Bring reading notes           [Keep][X]   | Settle today?                          |
|                                             | Based on 3 records from today          |
+---------------------------------------------+----------------------------------------+
```

### Why this state matters

- The first read is `Today`, not `AI`.
- The capture box sits on top of the day it feeds.
- Derived layers sit beside the note, not in front of it.

## State 2: Writing Focus

```text
+--------------------------------------------------------------------------------------+
| Glade                                       [ Search recent life... ]   Tue, Apr 29  |
+--------------------------------------------------------------------------------------+
| Today                                                                                |
|                                                                                      |
| [ I finally remembered why the road felt different tonight. It was the smell of     |
|   rain and the yellow flowers near the turn. Also need to bring the charger to the   |
|   library tomorrow.                                                           ]      |
|                                                                                      |
| [ Save to Today ]  [ Clear ]                                                        |
|                                                                                      |
| Quiet hint: write first. Structure can grow later.                                   |
|--------------------------------------------------------------------------------------|
| Earlier today                                                                         |
| 09:12  ...                                                                            |
| 14:40  ...                                                                            |
+--------------------------------------------------------------------------------------+
```

### Why this state matters

- Focus stays on freeform writing.
- The product does not ask for type, tag, priority, or date before saving.
- Earlier context remains visible but secondary.

## State 3: Search Results

```text
+--------------------------------------------------------------------------------------+
| Glade                                       [ flower road ]               Tue, Apr 29|
+--------------------------------------------------------------------------------------+
| Search Results                                                                       |
|                                                                                      |
| Apr 27, Sunday                                                                       |
| 18:05  "I saw a flower on the ride home..."                           [ Open Day ]   |
|        match: text snippet                                                           |
|                                                                                      |
| Apr 24, Thursday                                                                     |
| 21:11  "The road felt gentler because..."                            [ Open Day ]   |
|        match: related phrase                                                         |
|                                                                                      |
| Apr 22, Tuesday                                                                      |
| Review: "You kept noticing small living things..."                   [ Open Day ]   |
|        match: light review                                                           |
|                                                                                      |
| [ Refine search ]   [ Clear ]                                                        |
+--------------------------------------------------------------------------------------+
```

### Why this state matters

- Search returns context-rich entries, not a giant flat list.
- Raw record hits come before derived review hits.
- Every result leads back to a day.

## State 4: Day Lookback + Light Review

```text
+--------------------------------------------------------------------------------------+
| Glade                                       [ Search recent life... ]   Sun, Apr 27  |
+--------------------------------------------------------------------------------------+
| Apr 27                                                                               |
|                                                                                      |
| 09:30  Slept badly, but the light outside was kind.                                  |
| 12:10  Need to reply to Lin after dinner.                                            |
| 18:05  I saw a flower on the ride home and wanted to keep that color.               |
|                                                                                      |
|---------------------------------------------+----------------------------------------|
| Task Candidates                             | Gentle Review                          |
|                                             |                                        |
| - Reply to Lin after dinner   [Kept]        | - The day carried tiredness, but not   |
|                                             |   emptiness.                            |
|                                             | - Small outside details mattered more   |
|                                             |   than they first seemed.               |
|                                             | Loose end: reply to Lin.                |
|                                             | [ Regenerate once ] [ Dismiss ]         |
+---------------------------------------------+----------------------------------------+
```

### Why this state matters

- Review sits next to the day, not on a separate analytics screen.
- The user can reread the raw day while reading the recap.
- The recap stays short, grounded, and ignorable.

## State 5: Long Stream View

```text
+--------------------------------------------------------------------------------------+
| Glade                          [ Search recent life... ]            Stream: Study     |
+--------------------------------------------------------------------------------------+
| Study                                                                                |
| Primary tags: [ study ] [ exam notes ] [ textbooks ]                                |
| [ Add this day ] [ Add selected record ] [ Manage tags ]                            |
|                                                                                      |
| Apr 29, Tue                                                                          |
| 14:40  Need to reply to Lin about the reading group notes.      [ Remove ]           |
| 18:20  Wrote down the textbook section that finally made sense. [ Remove ]           |
|                                                                                      |
| Apr 27, Sun                                                                          |
| 10:15  Marked weak points in chapter 3.                           [ Remove ]         |
|                                                                                      |
| Related tags (optional): [ reading group ] [ chapter 3 ] [ finals ]                 |
| [ Hide detailed tags ]                                                               |
+--------------------------------------------------------------------------------------+
```

### Why this state matters

- The user opens a time-ordered stream, not a one-off search result.
- Primary tags are visible enough to orient the user.
- Detailed tags exist, but they do not take over the page.
- A record can be removed from the stream without harming the original day note.

## Structural Rules For Implementation

- Keep raw capture as the simplest foundation card.
- Treat long streams, calendars, task candidate views, search results, history, and reviews as output lens cards.
- Keep output lens views downstream from raw material.
- Do not return to fixed equal-width primary panels.
- Treat Agent-assisted shaping as the core advanced function, but do not make chat the only input route.
- Keep transient handling cards, such as tag selection, temporary and optional.
- Keep module responsibilities separate even when cards appear together.
- Treat Canopy Flow, Limpid Zen, and Memory Flora as interface orchestration surfaces, not as data owners.
- Add future lens, digest, shaping, and memory capabilities as module plugins where practical.
