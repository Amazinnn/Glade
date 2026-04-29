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

The early product should prioritize review, quick capture, search, memory recovery, and schedule reminders. AI conversation and advanced AI operation are important later directions, but not the first product center.

### Rationale

The product must first become a reliable life recording system. AI capability is more valuable when it has trustworthy records and structure to work with.

### Consequences

- Improve record creation and retrieval before expanding AI surfaces.
- Keep AI integration useful but not dominant in the first stage.
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
