# Glade Product Map

## Purpose

This document consolidates the current product philosophy, positioning, comparative landscape, core loops, and agent direction for Glade.

It is meant to answer one practical question:

What product are we actually building, and how should we differentiate it?

---

## 1. Product Core

### One-Line Positioning

Glade is a local-first life system that helps people record, recover, and gently understand their days without turning life into a workspace.

### Core Belief

Life should not have to become a workspace in order to be remembered well.

### Product Promise

Glade should help people preserve life without asking them to spend too much of life operating the system.

Within five minutes, a user should be able to record life well.

### Emotional Thesis

Glade should feel like life itself:

- open
- breathable
- grounded
- quietly reliable

The product should feel like a garden, not a dashboard.

---

## 2. What Glade Is and Is Not

### Glade Is

- a local-first life recording system
- a long-memory companion for everyday life
- a gentle life reflection tool
- a product where structure grows out of living

### Glade Is Not

- a generic AI chat app
- a workspace for life
- a database-first note tool
- an efficiency dashboard
- a pure diary app with no structural growth

---

## 3. Primary User

Glade is for busy but sensitive people:

- people who want to hold onto life, not just manage obligations
- people who value memory, reflection, and continuity
- people who do not want to build a heavy system before using it
- people who want support without importing work logic into every private corner of life

This means Glade is not optimized first for:

- power users who want maximum database flexibility
- team collaboration workflows
- enterprise productivity
- quantified-self maximalism

---

## 4. Core Product Logic

Glade should follow one basic progression:

capture -> shape -> recover -> gently reflect

This progression defines the product better than any single feature.

### First Aha Sequence

The first meaningful experience should be:

1. I give Glade something real, even if it is short or messy.
2. It lands as raw material and feels safe.
3. I can let Agent help shape it instead of manually organizing everything.
4. Later, I can find the original material again.
5. Glade gently helps me notice what matters.

---

## 5. V1 Product Layers

The first version should be understood as layered, not as a flat feature list.

### 1. Ability Module Layer

The reusable abilities underneath the product:

Role:

- `Input / Raw Capture` receives original material
- `Agent-Assisted Shaping` helps shape material through Agent work
- `Output / View / Output Lens` shows material through useful views
- `Life Rendering / Digest` renders accumulated material into higher-level digests and rhythms
- `Recall / Raw Recall` finds and reopens original material
- `Memory Agent / Reflective Recall` helps revisit, connect, and reflect over past material

Why it matters:

- gives the user ownership
- reduces black-box feeling
- keeps the product grounded in real life records
- gives Agent and memory functions reliable material to compose
- lets future work extend one module without rewriting the whole product

### 2. Interface Orchestration Layer

The frontend-facing total consoles that coordinate ability modules:

Role:

- `Canopy Flow` is the open compositional workbench where modules coexist
- `Limpid Zen` hides nonessential functions for focused, clear work
- `Memory Flora` centers output and recall views for browsing past memory
- these surfaces dispatch modules but do not own source material or module internals

Why it matters:

- prevents the product from becoming a single-purpose diary, search page, or chat box
- keeps the experience expandable without becoming a workspace
- lets the same modules serve different user states: open composition, focus, and memory browsing

### 3. Internal Plugin Layer

Large modules must also be modular inside.

Role:

- turn subfeatures into bounded plugins where practical
- allow plugins to be enabled, disabled, replaced, or deferred
- keep plugin inputs, outputs, source rules, and failure behavior explicit
- let Output / View, Life Rendering, Agent shaping, and Memory Agent grow without hard-coded tangles

Why it matters:

- protects staged implementation
- makes experiments safer
- lets strange and rich `temp.md` ideas enter Glade one small capability at a time

---

## 6. Information Model

Glade should be built on a layered model, not a single rigid structure.

### Layer 1: Life Flow

The raw, freeform record:

- diary-like entries
- thoughts
- small events
- passing observations
- unfinished feelings

This layer should always remain primary.

### Layer 2: Signals

Signals extracted from life flow:

- task candidates
- mood hints
- health hints
- study hints
- recurring topics
- people / relationship signals

These are interpretations, not replacements for the original writing.

### Layer 3: Baskets

Signals can accumulate into baskets such as:

- tasks
- topics
- reviews
- health
- study
- people

### Layer 4: Views

Views are how the user revisits the same life from different angles:

- daily timeline
- weekly review
- topic traces
- health or mood lens
- task follow-through

---

## 7. Local-First Memory Architecture

Glade should remain local-first.

### Storage Principles

- Markdown is a primary user-facing data layer, not just an export format.
- SQLite is the index, retrieval, and relationship engine.
- Raw records must remain readable outside the app.
- AI must not become a prerequisite for access to personal data.

### Baseline Data Shape

- `journal/YYYY/MM/YYYY-MM-DD.md`
- SQLite record index
- reviews
- indexes
- attachments

This supports:

- direct file access
- reliable local search
- future structured views
- future agent operations

---

## 8. Design Philosophy

### Garden, Not Workspace

Glade should not feel like:

- a spreadsheet
- a dashboard
- a productivity control center
- a blank enterprise workspace

Glade should feel like:

- a quiet garden
- a place for thought to breathe
- a calm personal system
- a space where life is held, not processed

### Design Consequences

- avoid dense setup-heavy interfaces
- avoid database-first presentation
- avoid coercive progress language
- avoid visual pressure and operational clutter
- preserve open space and calm hierarchy

---

## 9. Time Constraint

Glade should preserve one hard product constraint:

Within five minutes, a user should be able to record life well.

This is a design rule, not a small usability preference.

Implications:

- capture must stay low-friction
- structure must not block recording
- AI must reduce burden, not add ceremony
- advanced features must stay behind the core act of recording

Any feature that makes life capture slower, heavier, or more ceremonial should be redesigned, deferred, or removed.

---

## 10. Competitive Landscape

Glade should not be positioned narrowly against note apps alone.

It sits across several adjacent product categories.

### A. Notes / PKM / Workspaces

Examples:

- Notion
- Obsidian
- Evernote
- Joplin
- NoteGen
- Blinko
- Reflect
- Bear

What they teach:

- local ownership
- retrieval
- links and structure
- multi-view organization

What Glade must avoid:

- forcing users to build systems first
- becoming a workspace for life
- over-indexing on databases and templates

### B. Journaling / Memory Preservation

Examples:

- Day One
- Reflectly
- Mindsera
- stoic.

What they teach:

- memory value
- daily capture
- prompts and reflection
- emotional continuity

What Glade must avoid:

- becoming only a diary
- over-psychologizing daily life

### C. Task / Planning

Examples:

- Things
- Todoist
- Sunsama

What they teach:

- fast capture
- lightweight commitment handling
- daily and weekly rhythm

What Glade must avoid:

- letting task logic dominate life logic
- turning every note into work

### D. Mood / Health / State Tracking

Examples:

- Daylio
- Oura
- Apple Health

What they teach:

- trends
- state-based lenses
- longitudinal understanding

What Glade must avoid:

- flattening life into scores
- over-quantifying emotion or body state

### E. Focus / Calm / Meditation

Examples:

- OmmWriter
- iA Writer
- Headspace
- Calm
- Waking Up
- Insight Timer
- Tide
- Endel
- Brain.fm
- Forest
- Freedom

What they teach:

- calm modes
- focus entry rituals
- ambient support
- low-noise states

What Glade must avoid:

- becoming a bag of unrelated modes
- adding focus theater without real integration

### F. Self-Care / Gentle Gamification

Examples:

- Finch
- Plant Nanny
- Forest
- Fabulous

What they teach:

- soft growth feedback
- gentle continuity
- symbolic progress through care

What Glade must avoid:

- hard reward loops
- manipulative gamification
- reducing life to streak pressure

---

## 11. Key Competitive Edge

Glade should not compete by being:

- Notion but softer
- Obsidian but more visual
- AI journaling but prettier

Its real edge is this combination:

- local ownership
- natural capture
- recovery of the past
- soft structure growth
- calm emotional posture
- life-centered rather than work-centered design

In short:

Glade protects life from being translated too quickly into work software.

---

## 12. Modes and States

Some future modes appear strategically aligned with Glade, but they should be treated as states of the same product, not bolt-on mini-apps.

### Zen Mode

Purpose:

- quiet conversation
- deep thinking
- minimal interface
- richer reflection through less visual noise

Closest references:

- OmmWriter
- iA Writer Focus Mode
- ZenPen

### Meditation Mode

Purpose:

- pause
- breathe
- settle attention
- return naturally into reflection or writing

Closest references:

- Headspace
- Calm
- Waking Up
- Insight Timer
- Tide

### Focus Mode

Purpose:

- reduce distraction
- support a bounded period of attention
- return usable traces into Glade afterward

Closest references:

- Forest
- Freedom
- Endel
- Brain.fm
- Tide

Design rule:

These modes should always feed back into Glade's core loop.
They should not become separate product lines inside the app.

---

## 13. Mood, Health, and Growth Design

Glade can differentiate through state-sensitive design, but it must stay gentle.

### Theme Adaptation

Possible themes:

- dawn
- morning
- sunlight
- late afternoon
- evening
- night

Purpose:

- match user state
- create atmosphere
- support reflective use

This should be treated as state-aware ambience, not cosmetic skinning.

### Flower Growth

The flower metaphor can work if used carefully.

It should represent:

- continuity of care
- quiet accumulation
- life being tended

It should not represent:

- points
- punishment
- rigid streak scoring

Closest references:

- Finch
- Plant Nanny
- Forest

Best interpretation:

not gamifying life, but making care visible

---

## 14. Agent Direction

Glade should have agent capabilities, but it should not be built as a generic agent platform.

### Principle

Agent-Assisted Shaping is one ability module and the core advanced function inside the product, but it is not the only doorway.

The sharper principle is:

Glade is Agent-forward and raw-grounded.

Users will usually prefer Agent-assisted shaping because it reduces effort. The product still needs raw capture, raw recall, output lenses, Life Rendering, and Memory Agent as separate abilities, because Agent work must stay source-aware, inspectable, and recoverable.

### Near-Term Agent Scope

The first agent abilities should be narrow and explicit:

- shape one raw signal into a useful draft, candidate, or clean copy
- shape several records into a short summary, connection, or candidate set
- extract task candidates
- draft light reviews
- tag mood / health / study signals
- summarize search results or daily records
- call module plugins through module interfaces instead of hard-coding every small behavior

### What To Avoid Early

- fully autonomous background agents
- unrestricted shell or browser access inside user runtime
- overactive prompts and interventions
- general-purpose always-on personal assistant behavior
- Agent logic directly owning raw capture, recall, storage, lens, tag, or stream internals

### Framework Comparison Summary

#### Claude Code / Codex

Best use:

- development-time engineering agent
- codebase automation
- tooling and implementation support

Not best for:

- end-user Glade runtime

#### OpenClaw

Best use:

- reference for personal agent runtime patterns

Risk:

- broad permissions
- too much runtime complexity for Glade's current stage

#### HermesAgent

Best use:

- inspiration for learning-loop and evolving skill systems

Risk:

- too much autonomy and uncertainty for core life-recording flows

#### LangGraph

Best use:

- future stateful orchestration
- review / extraction / confirmation flows

#### OpenHands SDK

Best use:

- future controlled execution and sandboxed agent workflows

### Recommended Implementation Route

Phase 1:

- build Glade's own lightweight agent harness
- use explicit tools and structured outputs

Phase 2:

- consider LangGraph or OpenHands SDK if orchestration becomes complex

Phase 3:

- selectively borrow learning-loop ideas from Hermes

---

## 15. Product Boundaries

Glade should remain open to structure, AI, panels, themes, and future views.

But every major feature should be tested against the same question:

Does this help Glade understand life more gently, or does it make Glade feel more like a workspace?

If the answer trends toward workspace, dashboard, control center, or habit machine, the feature needs redesign.

---

## 16. Current Strategic Summary

Glade's current center of gravity is:

- life first
- local first
- capture first
- Agent-forward but raw-grounded
- recovery before opaque automation
- gentle structure growth
- calm emotional design

The practical V1 path is:

1. raw capture and raw log
2. raw recall
3. first useful Agent-assisted shaping path
4. output lens foundation
5. task candidates, light review, long streams, and tag library

Everything else should serve this path rather than compete with it.
