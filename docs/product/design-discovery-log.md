# Glade Design Discovery Log

Last updated: 2026-05-01

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

### Discovery 2: Earlier day-surface hypothesis

The first useful shape of Glade was initially clarified:

- Today was treated as the home surface
- the user was expected to write into today's Markdown before other flows
- search helps reopen life
- light review helps settle life
- structure grows afterward

This made it clear that equal-weight panel design is the wrong hierarchy for the product, even if the current renderer already has a promising garden tone.

This discovery is now superseded by the later Step 1 model:

- Glade has six ability modules: Input / Raw Capture, Agent-Assisted Shaping, Output / View, Life Rendering / Digest, Recall, and Memory Agent / Reflective Recall
- Glade has three interface orchestration functions: Canopy Flow, Limpid Zen, and Memory Flora
- Today / Daily Note remains an important time lens and storage or review container, but not the only home concept

### Discovery 3: Task extraction is not a core scene

An early mistake was to treat "structure grows from writing" as one of the user's main scenarios.

That was corrected.

The better framing is:

- the user scenario is writing, searching, revisiting, or following a life thread
- task extraction is a background capability or Agent-assisted derived behavior

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

- frontstage: day-surface life recording
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

The clarified scene set at that point was:

- raw capture: the user opens Glade and gives it original material
- transient handling: the user may optionally attach tags, stream intent, or handling notes while capturing
- raw recall: the user can search by text or tags, and can also browse historical files or diary files inside the app
- output lens views: long streams, calendars, task views, reviews, and search results are surfaces over raw material
- Canopy Flow: input, output, and Agent help can coexist as cards selected from a sparse sidebar

This is now superseded by the 2026-05-01 hierarchy:

- six ability modules define what Glade can do
- Canopy Flow, Limpid Zen, and Memory Flora define how the user works with those abilities
- transient handling during capture is behavior, not a scene

Agent tool permissions and harness details should be discussed separately as harness engineering.

This matters because the product should be designed from usage scenes outward, not from UI commands or backend mechanisms inward.

## 2026-04-30

### Discovery 15: Agent web search means external input, not only a tool

A new Agent direction was noted:

- the Agent may eventually use network search
- this would let Glade receive useful material that did not originate from the user's own writing
- that makes web search an external input source, not just an Agent convenience

This is important, because it changes the boundary of Glade's life system.

The user remains the center, but the material around the user's life may include:

- user-written raw entries
- local historical records
- Agent-suggested structure
- external information retrieved on request

This should not change the current Step 1 scene lock.

For now, the rule is:

- raw capture remains the foundation entry
- local recording and recall must work without network access
- web search belongs to later Agent harness design
- future web material must be explicit, source-aware, and distinguishable from the user's own raw records

The sharper phrasing is:

Glade's first input is the user's life record. Later, Agent web search may become a controlled external context source around that record.

## 2026-05-01

### Discovery 16: Use product dimensions to map possible behavior space

A major design method discovery emerged:

- Glade should not only list scenes from intuition
- Glade can use explicit dimensions to map possible user input, output, and interaction forms
- these dimensions can reveal missing behaviors before product design locks too early

This is especially important for Agent-assisted shaping.

The basic record, recall, and output-lens functions can stay simple and foundational. They are the extensible parts underneath the product:

- raw capture must be basic and complete
- raw recall must be reliable and complete
- output lens views must remain grounded in raw material

But Agent-assisted shaping should be richer. It is closer to the living layer of Glade.

The working distinction is:

- basic functions are the reusable parts
- Canopy Flow is one interface table that can hold them
- Agent-assisted shaping is where Glade actively helps the user across many different situations

This means Agent-assisted shaping should be designed by dimensions rather than by a small set of obvious chat examples.

Candidate dimensions include:

- single material versus many materials
- immediate output versus delayed or continuous output
- short-term goal versus long-term goal
- user-written material versus external context
- explicit user request versus quiet suggested help
- editing text versus organizing material versus connecting life threads

This matters because a narrow Agent design would make Glade feel like a text-polishing helper. A dimensional design can make Agent assistance cover more real life situations without making Agent the default entry point.

The sharper phrasing is:

Glade's basic scenes are foundational parts. Agent-assisted shaping is the rich living layer built from those parts.

### Discovery 17: Modular product design is a precondition for extensible Agent shaping

A modularity constraint was clarified:

- Glade's basic functions should not be tangled together as nested product or code logic
- raw capture, recall, output lenses, Agent shaping, and future tools should expose clear interfaces to each other
- each module should own its internal rules and implementation details
- later versions should be able to replace, extend, or add modules without rewriting the whole product

This matters because Agent-assisted shaping will grow in many directions.

If every Agent behavior directly reaches into raw capture, search, lens rendering, storage, tags, and scheduling, the product will become hard to change. It will also become hard to trust, because no one will know which part owns which decision.

The better direction is:

- basic modules expose stable capabilities
- Agent-assisted shaping calls those capabilities instead of owning everything
- modules keep their own source-of-truth rules
- Canopy Flow displays modules together without merging their responsibilities

This is a product design rule before it is a code architecture rule.

The sharper phrasing is:

Glade should be modular from the product model upward. Agent shaping is powerful because it composes modules, not because it swallows them.

### Discovery 18: Step 1 hierarchy replaces the flat scene list

Step 1 is no longer best described as five equal scenes.

The stronger hierarchy is:

- ability modules: Input / Raw Capture, Agent-Assisted Shaping, Output / View, Life Rendering / Digest, Recall, and Memory Agent / Reflective Recall
- interface orchestration functions: Canopy Flow, Limpid Zen, and Memory Flora

This matters because users are unlikely to prefer long manual input and manual organization when Agent can help. The foundation abilities must still be excellent, because they make the product trustworthy and give Agent shaping reliable capabilities to compose.

The product stance is:

- Agent-forward: the convenient path should make Agent help easy to use
- raw-grounded: raw material, recall, and source links must remain inspectable and durable
- modular: modules expose capabilities without losing their own internal rules

The sharper phrasing is:

Glade's abilities define what it can do. Canopy Flow, Limpid Zen, and Memory Flora define how the user works with those abilities.

### Discovery 19: Interface functions are total consoles, not ability modules

The three named interface functions are product surfaces:

- Canopy Flow: open compositional workbench
- Limpid Zen: focused, clear workflow with nonessential functions hidden
- Memory Flora: output-centered memory browsing surface

They should coordinate modules, not own data or duplicate module internals.

This matters because these surfaces are closer to frontend orchestration than to core ability logic. They can decide what is visible, hidden, adjacent, or emphasized, but they should not become new source-of-truth layers.

The sharper phrasing is:

Interface functions are conductors. Ability modules are instruments.

### Discovery 20: Module internals should grow through plugins

The modularity rule now applies inside modules, not only between modules.

Large modules such as Output / View, Life Rendering, Agent-Assisted Shaping, and Memory Agent will attract many small functions. The ideas in `temp.md` show this clearly.

The better structure is to treat small capabilities as plugins where practical:

- installable or removable
- enabled or disabled
- replaceable
- owned by one module
- clear about input, output, source rule, visibility, and failure behavior

This matters because Glade will be built in stages. If every small function is hard-coded across modules and surfaces, later design changes will become expensive and risky.

The sharper phrasing is:

Modules should expose interfaces. Their subfeatures should become plugins when they are likely to vary.

### Discovery 21: `temp.md` is a capability reference, not a roadmap

`temp.md` contains useful feature material and many strange or rich future uses.

It should be treated as:

- a reference pool for ability modules
- a source of candidate plugins
- a place to harvest later interaction ideas

It should not be treated as:

- a locked implementation order
- a v1 scope promise
- a reason to skip Step 1 hierarchy

The sharper phrasing is:

`temp.md` is a seed bank, not a construction schedule.

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
