# Glade Design Discovery Log

Last updated: 2026-04-29

This file records meaningful product discoveries from multi-round design discussions.

It sits between raw chat history and stable product decisions:

- `conversation-log.md` keeps broader dated conversation notes
- `design-discovery-log.md` keeps sharper design turns, corrections, and newly found structures
- `decisions.md` keeps only conclusions that are already firm enough to lock

## 2026-04-29

### Discovery 1: Product code should not start from feature expansion

The immediate next step after philosophy and competitive positioning is not more broad product writing and not direct UI polishing.

The missing layer is the pre-code product contract:

- usage scenes
- experience spec
- boundaries
- acceptance checks
- implementation order

This reframed the work from "more ideas" to "construction drawings".

### Discovery 2: `Today-first` is the surface; support layers come after

The first useful shape of Glade was clarified:

- `Today` is the home surface
- the user writes into today's Markdown first
- search helps reopen life
- light review helps settle life
- structure grows afterward

This made it clear that equal-weight panel design is the wrong hierarchy for the product, even if the current renderer already has a promising garden tone.

### Discovery 3: Task extraction is not a core scene

An early mistake was to treat "structure grows from writing" as one of the user's main scenarios.

That was corrected.

The better framing is:

- the user scenario is writing, searching, revisiting, or following a life thread
- task extraction is a background capability or agent-assisted support behavior

This protects Glade from sliding into task-software thinking.

### Discovery 4: Long-running life threads deserve their own surface

A new scenario was identified:

- the user may want to follow one long-running theme across months or years

Examples include:

- study
- recovery
- a relationship
- a season of life

This is not the same as a daily note and not the same as ad hoc search.

It requires a persistent continuity surface.

### Discovery 5: Frontstage and backstage must be separated

A key product tension was clarified:

- if the product exposes the file tree too directly, it becomes heavy and technical
- if the product ignores file architecture, long-term retrieval and derived layers become unstable

The resulting split is:

- frontstage: `Today-first` life recording
- backstage: day-tree-first file architecture and indexes

This means product experience and software architecture are tightly linked, but they should not be shown to the user in the same form.

### Discovery 6: `Long Stream` is compiled continuity, not live search

Another correction:

`Long Stream` should not be treated as a search result that is rebuilt every time the user opens it.

Instead, it should be:

- a continuously maintained time-ordered flow
- grounded in daily notes
- cheap to reopen later

This lowers repeated search cost through small ongoing maintenance rather than large repeated retrieval work.

### Discovery 7: Karpathy's `LLM Wiki` pattern maps well to Glade

The `LLM Wiki` reference helped reveal a strong product structure for Glade:

- raw life sources
- compiled life wiki
- rules and schemas for maintenance

Mapped into Glade:

- raw layer: daily Markdown notes, records, attachments
- compiled layer: long streams, reviews, people/topic traces, signal indexes
- contract layer: product rules for when the system may derive, label, or connect material

This made it possible to define Glade as more than a diary app and more than a file browser.

### Discovery 8: `Long Stream` should stay downstream from daily notes

The user clarified that long streams should not become a parallel source-of-truth system.

The preferred behavior is:

- the user writes into `Today` first
- the user may later add a whole day, file, or selected record into a long stream
- removing stream membership must not delete the original material

This preserves one factual ground while still allowing long-term thematic continuity.

### Discovery 9: User control over scope matters

Another important correction:

The system should not assume that every daily note belongs to long-stream processing.

Instead:

- some daily notes remain just daily notes
- some records are manually included into a stream
- some stream maintenance can happen after the user chooses the scope

This keeps Glade respectful and prevents silent overreach by the agent layer.

### Discovery 10: Tags are user-owned on the surface, agent-assisted underneath

The design of tagging became much sharper.

The current direction is:

- the user may create direct tags by hand, or
- the user may provide a broad top-level tag
- the agent may suggest more detailed second-level and third-level tags
- the user chooses whether to accept them

This implies a dedicated tag library.

But the important separation is:

- visible primary tags belong to the user
- detailed or internal tags may be maintained by the agent and hidden by default

This avoids turning the product into a taxonomy-management tool while still improving stream maintenance and search.

### Discovery 11: The user should primarily see streams and major tags

The preferred frontstage is now:

- the user sees a `Long Stream` as the main thematic object
- the user also sees a small number of major tags to understand what kind of material the stream contains
- more detailed tags may exist behind a disclosure layer

This balances orientation and simplicity.

### Discovery 12: Agent understanding and script speed should be split

The agent is useful for:

- extracting likely associations
- suggesting finer tags
- proposing related stream membership

Scripts are useful for:

- indexing
- materializing compiled stream views
- updating searchable structures quickly

This split prevents the product from depending on heavy live agent search every time the user opens a long stream.

### Discovery 13: Do not confuse writing form, feature form, and storage form

Another correction was necessary.

`Long Stream` had started to drift from "an important functional shape" toward "a kind of diary form".

That was the wrong direction.

The sharper split is:

- the user's raw writing form may stay plain, blank, and traditional
- the storage form may still be a day-based local file structure
- the feature form may include long stream, search, review, tags, and other recovery views

So the rule is:

- `Long Stream` is not what the user is fundamentally writing
- `Long Stream` is one way the system later organizes and reopens raw material
- product discussion must keep input form, data storage, and functional views separate

This is an important guardrail for future discussions, because mixing these layers makes the product look smarter on paper while becoming less clear in actual interaction design.

### Discovery 14: Return to the pre-code checklist before drilling into interaction details

The discussion drifted again into concrete interaction mechanics:

- slash commands
- exact button behavior
- draggable card placement
- Agent operation details

Those are useful later, but they belong to later checklist stages.

The current stage is still the first pre-code step:

- define the core v1 usage scenes

The clarified scene set is:

- raw input: the user opens Glade and writes freely into a blank input surface
- light handling during input: the user may optionally attach tags, stream intent, or handling notes while writing
- raw recall: the user can search by text or tags, and can also browse historical files or diary files inside the app
- output views: long streams, calendars, task views, reviews, and search results are v1 core output surfaces over raw material
- composed working surface: input, output, and Agent chat can coexist as cards selected from a sparse sidebar

Agent-assisted processing should be discussed separately as harness engineering.

This matters because the product should be designed from usage scenes outward, not from UI commands or backend mechanisms inward.

## Working Use

This file should be extended whenever a product conversation changes:

- the product's object model
- the meaning of a core scene
- the relationship between user surface and system structure
- the contract between user control and agent help

When a discovery becomes stable enough, it should move into:

- `v1-core-experience.md`
- `v1-acceptance-and-milestones.md`
- `decisions.md`
