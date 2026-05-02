# Product Decisions

This file records explicit product decisions. Use short entries with date, decision, rationale, and implementation consequences.

## 2026-04-23: Create Product Thinking Library

### Decision

Create `docs/product/` as the home for product philosophy, conversation notes, and product decisions.

### Rationale

The project is likely to evolve through conversation. Valuable product thinking should not disappear into chat history or become mixed with implementation tasks.

### Consequences

- Product conversations should be summarized in `conversation-log.md`.
- Stable principles should move into `philosophy.md`.
- Clear decisions should be added here.

## 2026-04-23: Use SQLite Plus Markdown As The Core Storage Model

### Decision

Use SQLite for structured data and Markdown files for human-readable text records.

### Rationale

SQLite supports indexes, relationships, queries, state, and structured application behavior. Markdown lets users directly open, read, understand, back up, and move their own life records.

### Consequences

- The app should treat local files as a first-class user interface, not only as internal implementation detail.
- Database records and Markdown files need stable linking rules.
- Search and backup features should respect both the database and the file tree.

## 2026-04-23: Define Low-Interruption As Non-Anxious Assistance

### Decision

Low-interruption means the product can provide timely reminders, guidance, and data, but should not bind the user's life rhythm to metrics or create self-anxiety.

### Rationale

The product should accompany growth. It should not become a productivity pressure machine.

### Consequences

- Reminder and review features should be configurable and calm.
- Metrics should support awareness, not judgment.
- AI and automation should avoid scolding, ranking, or over-optimization language.

## 2026-04-23: Keep Early Product Focus On Reliable Recording

### Decision

The early product should prioritize reliable raw capture, search, memory recovery, review, and the first useful Agent-assisted shaping path. Broad autonomous AI operation is a later direction, but Agent shaping is part of the product center.

### Rationale

The product must first become a reliable life recording system. Agent capability is more valuable when it has trustworthy records and structure to work with.

### Consequences

- Improve record creation and retrieval before expanding broad autonomous AI surfaces.
- Keep Agent-assisted shaping useful, source-aware, and grounded in foundation abilities.
- Design future AI features around existing records, not empty chat.

## 2026-04-23: Treat CLI As A Core Openness Surface

### Decision

Keep CLI support as a core product surface.

### Rationale

The product should be open to external agents, user scripts, internal native AI agents, and automation workflows.

### Consequences

- Core capabilities should be callable outside the GUI.
- CLI contracts should be stable enough for scripts.
- Internal architecture should avoid trapping product logic inside renderer components.

## 2026-04-23: Make The First Screen A Garden-Like Capture Space

### Decision

The first GUI prototype should feel like an open backyard garden, with quick capture at the center, today's path beside it, and AI as a quiet optional helper.

### Rationale

This makes the product feel like a place for natural thought rather than a dashboard for performance. It supports the product belief that recording should feel close to breathing.

### Consequences

- The main screen should prioritize spaciousness, calm colors, and low-pressure writing.
- Quick capture should be visually primary.
- Events, search, reminders, and AI should support the recording flow without overwhelming it.
- Future UI work should compare itself against the garden metaphor before adding dense controls.

## 2026-04-23: Keep The Restrained Garden Palette

### Decision

Keep the restrained natural green and warm daylight palette as the visual foundation for the product.

### Rationale

The first prototype's color direction matches the intended feeling of an open backyard garden and was positively received.

### Consequences

- Future visual work should refine this palette rather than replace it with colorful dashboard styling.
- Organic graphics, richer window presentation, and livelier interactions should be added carefully around this palette.
- The interface should become less nerd-like without becoming visually noisy.

## 2026-04-23: Name The Product Glade

### Decision

Name the product `Glade`.

### Rationale

`Glade` means an open clearing in a wooded or green place. It is short, calm, memorable, and aligned with the backyard garden metaphor: open, breathable, green, and welcoming to wandering thought.

### Consequences

- User-facing product naming should gradually move from `AI Life Assistant` to `Glade`.
- Technical package names may remain unchanged until a dedicated rename pass.
- Future copy should avoid overexplaining AI and instead foreground the life garden metaphor.

## 2026-04-23: Keep Agent Web Search As A Future Capability

### Decision

Add agent web search for new knowledge in a later phase, not in the first local recording phase.

### Rationale

Web search is valuable for helping users learn and gather new context, but the first milestone should stay focused on reliable local recording, search, and Markdown ownership.

### Consequences

- First-stage local memory must not depend on network access.
- Future web search should be explicit and source-aware.
- Search results should become local records only when the user chooses to save them.

## 2026-04-23: Treat A Day As Multi-Layered, Not Singular

### Decision

Glade should not define a day using only one lens. It should support multiple interpretations of daily life, such as clock time, work/rest rhythm, physiology, mood, and longer cycles.

### Rationale

Different users inhabit their days differently. A single fixed definition of a day would flatten the richness of lived experience and make the product less personal.

### Consequences

- The underlying storage model should stay stable while views and summaries remain flexible.
- The product should support multiple lenses over the same record stream rather than multiple incompatible data models.
- Future interfaces should allow users to choose or prefer how their day is framed.

## 2026-04-23: Prefer Freeform First, Structured Growth Later

### Decision

Glade should prefer freeform diary-like capture first, with later soft decomposition into structured baskets such as tasks, health, study, topics, mood, and other lenses.

### Rationale

This preserves the texture of life and avoids forcing users to classify experience before they can express it. Structure should emerge from living records rather than from rigid upfront forms.

### Consequences

- The primary capture surface should stay open and low-friction.
- The data model should support extracted signals and secondary indexes without making them mandatory for capture.
- Future agent features should be able to propose structured growth from freeform text.

## 2026-04-23: Grow Toward A Proactive Agent Carefully

### Decision

Glade should eventually support a more proactive agent, but this should come after the local recording foundation and should be introduced carefully.

### Rationale

Initiative is valuable when it helps users notice patterns, surface tasks, and connect parts of life they would otherwise lose. But too much initiative too early would feel intrusive or controlling.

### Consequences

- Early stages should keep the agent optional and user-triggered.
- Later stages can add proactive suggestions, extracted baskets, and pattern prompts.
- Proactive behavior should remain suggestive, inspectable, and easy to dismiss.

## 2026-04-24: Position Glade As Life, Not Workspace

### Decision

Position Glade as a life-centered system, not a workspace for personal data.

### Rationale

The product should not turn life into rows, cells, or project structures, and it should not blur the boundary between work and life. Its value comes from helping users live with more awareness, not from making private life resemble work software.

### Consequences

- Future feature decisions should be checked against whether they make Glade feel like a workspace.
- Structured views are allowed, but they must remain secondary to lived experience.
- The primary product language should remain life-centered rather than productivity-centered.
## 2026-04-24 - Five-Minute Recording Constraint

- Status: accepted
- Decision:
  Glade should preserve a hard product constraint: within five minutes, a user should be able to record life well.
- Why:
  The product is meant for busy but sensitive people. Even if organization, search, review, and AI become powerful, the user should not have to spend long periods operating the system just to keep hold of daily life.
- Implications:
  - fast capture must remain the default path
  - advanced structure must stay optional or backgrounded
  - AI should reduce effort rather than introduce extra steps
  - new features should be evaluated against recording speed and emotional lightness

## 2026-05-01: Treat Agent-Assisted Shaping As The Core Advanced Function

### Decision

Glade v1 should treat six ability modules as the macro product model: `Input / Raw Capture`, `Agent-Assisted Shaping`, `Output / View`, `Life Rendering / Digest`, `Recall`, and `Memory Agent / Reflective Recall`.

### Rationale

Users are unlikely to prefer long manual input and manual organization when Agent can help shape short, messy, or incomplete material. Agent-assisted shaping is what makes Glade feel alive and convenient. The foundation abilities remain necessary because Agent help, output views, rendering, recall, and memory work must stay grounded in source material.

### Consequences

- Glade should be Agent-forward but raw-grounded.
- Agent shaping should be easy to summon, but raw capture and raw recall must work without Agent.
- Agent output must remain labeled, source-aware, and reversible until accepted by the user.
- Step 1 should no longer describe transient input handling or interface surfaces as equal user scenes.

## 2026-05-01: Keep Glade Modular From The Product Model Upward

### Decision

Design Glade as a modular product system. Ability modules should expose clear capabilities while keeping their own internal source-of-truth rules.

### Rationale

Agent-assisted shaping, Output / View, Life Rendering, and Memory Agent will grow across many situations. If one feature directly owns raw capture, search, lenses, tags, streams, storage, rendering, and memory reflection, the product will become hard to trust and hard to change.

### Consequences

- Agent shaping composes modules instead of swallowing them.
- Canopy Flow displays modules together without merging their responsibilities.
- New capabilities such as web search, voice capture, new lenses, or scheduling should be added as modules with clear boundaries.
- Implementation planning should protect module interfaces before adding broad Agent autonomy.

## 2026-05-01: Adopt Three Interface Orchestration Functions

### Decision

Glade should distinguish ability modules from interface orchestration functions. The three interface functions are `Canopy Flow`, `Limpid Zen`, and `Memory Flora`.

### Rationale

Ability modules answer what Glade can do. Interface functions answer how the user works with those abilities. Mixing these layers would make frontend surfaces own product logic and would make later redesign difficult.

### Consequences

- Canopy Flow is the open compositional workbench for mixed-module work.
- Limpid Zen is the focused surface that hides nonessential functions.
- Memory Flora is the memory-browsing surface centered on output, recall, Life Rendering, and Memory Agent.
- Interface functions orchestrate modules but do not own source material, derived objects, or module internals.

## 2026-05-01: Treat Module Subfeatures As Plugins Where Practical

### Decision

Large modules should support internal plugins where practical. A plugin is a bounded micro-capability that can be installed, removed, enabled, disabled, replaced, or deferred through the owning module's interface.

### Rationale

Output / View and Memory Agent will attract many strange and useful subfeatures. `temp.md` shows this clearly. If those small functions become hard-coded across modules and interface surfaces, staged implementation will be fragile.

### Consequences

- Plugins must have an owning module.
- Plugins must define input, output, source rule, visibility, and failure behavior.
- Plugins must not directly mutate another module's source-of-truth state.
- Ideas from `temp.md` should be treated as a capability and plugin reference pool, not as a fixed roadmap.

## 2026-05-01: Lock Step 1 Macro Product Model

### Decision

Step 1 is locked with six ability modules, three interface orchestration functions, and the internal plugin principle.

### Rationale

The remaining questions now belong to later stages: behavior details, object/source-of-truth design, flow states, Agent harness, low-fi interaction, acceptance, and implementation order. Continuing to expand Step 1 would mix macro scene definition with downstream design work.

### Consequences

- Step 2 becomes the active design stage.
- New ideas must be routed as module behavior, interface orchestration, plugin candidates, or later harness/storage/UI questions.
- Step 1 should reopen only if a new core product situation cannot fit the locked hierarchy.
