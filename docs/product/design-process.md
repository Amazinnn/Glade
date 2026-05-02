# Glade Product Design Process

Last updated: 2026-05-01

This document is the governing process for Glade product design before product code expands.

Use it as the checklist before implementing any major product surface, feature, or behavior.

The goal is simple:

- do not code from vague product taste
- do not turn unresolved design questions into engineering decisions
- do not let UI details, Agent mechanics, or storage concerns take over before the user scene is clear

## Process Status

Current stage: `Step 2 - V1 Core Experience Spec`

Current status: `Step 1 locked; Step 2 active`

Current working question:

How should the locked Step 1 hierarchy behave in concrete v1 experience flows?

Locked Step 1 product hierarchy:

- Ability module: `Input / Raw Capture` receives original material from the user.
- Ability module: `Agent-Assisted Shaping` helps clarify, organize, connect, transform, delay, or sustain work around material.
- Ability module: `Output / View / Output Lens` shows material through useful views such as long streams, calendars, task candidates, reviews, search results, and history.
- Ability module: `Life Rendering / Digest` turns accumulated material into higher-level digests, rhythms, summaries, and gentle renderings.
- Ability module: `Recall / Raw Recall` finds and reopens original material.
- Ability module: `Memory Agent / Reflective Recall` helps revisit, connect, and reflect over past material without replacing source records.
- Interface orchestration function: `Canopy Flow` is the open compositional workbench where modules can coexist.
- Interface orchestration function: `Limpid Zen` hides nonessential complexity and gives the user a focused, clear workflow.
- Interface orchestration function: `Memory Flora` centers output and recall views so the user can browse, wander, and revisit past memory.

Current guardrails:

- `Long Stream` is an output or recovery view, not a writing form.
- Ability modules, interface functions, plugins, and storage must stay modular.
- Glade is `Agent-forward` but `raw-grounded`: users will usually prefer Agent help, but Agent work cannot replace or hide raw material.
- Transient input handling is not a separate scene. It is behavior such as opening a tag card and closing it again.
- `Canopy Flow` keeps the core idea that modules can sit together without merging responsibilities.
- `Limpid Zen` and `Memory Flora` are interface orchestration functions, not new source-of-truth layers.
- `temp.md` is a content and possibility reference, not a roadmap or implementation order.
- Large modules must also be internally modular. Subfeatures should be treated as plugins where practical: installable, removable, switchable, and replaceable through clear module interfaces.
- Concrete UI mechanics, tool permissions, and storage schema should wait until their later steps.

## Design Stage Gates

Glade product work moves through these gates.

No product code should be written for a major feature until the relevant gates have passed.

| Gate | Purpose | Main Artifact | Status |
| --- | --- | --- | --- |
| `G0 Philosophy` | Decide what Glade is and is not. | `philosophy.md`, `product-positioning.md`, `product-map.md` | substantially complete |
| `G1 Landscape` | Know what to borrow and refuse. | `competitive-landscape.md` | substantially complete |
| `G2 Usage Scenes` | Define what users are actually trying to do. | `v1-core-experience.md` | locked |
| `G3 Experience Spec` | Describe how Glade behaves in those scenes. | `v1-core-experience.md` | active, draft not locked |
| `G4 Object Model` | Define product objects and source of truth. | `v1-core-experience.md`, `local-memory-architecture.md` | partial |
| `G5 Flow States` | Define entry, action, feedback, exit, and failure states. | `v1-core-experience.md` | partial |
| `G6 Acceptance` | Define product checks before code. | `v1-acceptance-and-milestones.md` | partial |
| `G7 Low-Fi Interaction` | Sketch only after behavior is stable. | `v1-low-fi-wireframes.md` | provisional |
| `G8 Implementation Order` | Cut the work into safe milestones. | `v1-acceptance-and-milestones.md` | draft |

## Hard Rule Before Coding

Before implementing a major product feature, the feature must have:

- a named user scene, ability module role, or interface orchestration role
- an in-scope / out-of-scope boundary
- a source-of-truth rule
- at least one key flow with failure behavior
- acceptance checks
- a milestone assignment

If any of these are missing, the work stays in design.

Small technical fixes may bypass this process only when they do not change product behavior.

## Step 0A: Product Philosophy

Status: `substantially complete`

Primary documents:

- `philosophy.md`
- `product-positioning.md`
- `product-map.md`
- `decisions.md`

Purpose:

Define the product's center of gravity.

Current stable principles:

- Glade is a local-first life system.
- Glade is life-first, not workspace-first.
- The user should be able to record life lightly.
- Raw life material should remain user-owned and locally readable.
- AI supports the user's life records; it is not the protagonist.

Checks:

- The product statement does not describe a generic note app.
- The product statement does not describe an AI chat wrapper.
- The product statement does not describe a productivity dashboard.
- The product statement explains why local-first matters.
- The product statement explains why life-first matters.

Pass condition:

- Future feature ideas can be judged against the philosophy.

Reopen this step if:

- a new feature changes the product category
- the product begins to feel workspace-first
- AI becomes the default product surface

## Step 0B: Competitive Landscape

Status: `substantially complete`

Primary document:

- `competitive-landscape.md`

Purpose:

Clarify what Glade borrows from adjacent products and what it refuses.

Checks:

- Each comparison says what to borrow.
- Each comparison says what to avoid.
- The document covers notes, journaling, tasks, search, mood/health, calm, and gentle gamification.
- The document does not define Glade only by opposition to other tools.

Pass condition:

- A new feature can be compared against known risks such as workspace drift, dashboard drift, task-manager drift, and AI-wrapper drift.

Reopen this step if:

- a new competitor category becomes strategically relevant
- Glade's category definition changes

## Step 1: Core V1 Usage Scenes

Status: `locked`

Primary documents:

- `v1-core-experience.md`
- `design-discovery-log.md`

Purpose:

Name the major situations where users use Glade, then sort them into ability modules and interface orchestration functions.

This step is about user intent, not UI mechanics.

Locked Step 1 product hierarchy:

Ability modules:

- `Input / Raw Capture`
- `Agent-Assisted Shaping`
- `Output / View / Output Lens`
- `Life Rendering / Digest`
- `Recall / Raw Recall`
- `Memory Agent / Reflective Recall`

Interface orchestration functions:

- `Canopy Flow`
- `Limpid Zen`
- `Memory Flora`

Checks:

- Each ability module says what user need it serves and what capability it exposes.
- Each ability module says whether it is foundation-level or advanced-level.
- Each interface orchestration function says which modules it coordinates and what kind of user state it serves.
- Interface orchestration functions coordinate modules without owning their internal source-of-truth rules.
- Larger modules can be decomposed into plugins or micro-capabilities without changing the outer product model.
- Each item can be described without naming a database table, API, script, or AI implementation.
- Each item separates raw material, derived output, storage form, Agent behavior, and UI layout.
- Agent-assisted shaping is mapped by dimensions, not by a small set of chat examples.
- No scene depends on unresolved UI details such as exact buttons or slash commands.

Pass condition:

- The product hierarchy is accepted as the v1 macro model.
- Every later design section can point back to an ability module, an interface orchestration function, or an internal plugin boundary.

Reopen this step if:

- a new product surface appears without a module role, interface role, or plugin boundary
- a feature starts driving the product instead of a user situation
- input form, storage form, output lens, Agent shaping, and surface structure are mixed again

## Step 2: V1 Core Experience Spec

Status: `draft updated from locked Step 1 hierarchy, not locked`

Primary document:

- `v1-core-experience.md`

Purpose:

Describe how Glade behaves across the locked scenes.

Checks:

- The spec starts from the accepted scene set.
- The spec treats `Input / Raw Capture`, `Output / View`, and `Recall` as foundation ability modules.
- The spec treats `Agent-Assisted Shaping`, `Life Rendering / Digest`, and `Memory Agent / Reflective Recall` as advanced ability modules.
- The spec treats `Canopy Flow`, `Limpid Zen`, and `Memory Flora` as interface orchestration functions, not as data owners.
- The spec does not assume `Today` is the only home concept.
- The spec explains how output lens views relate to raw material.
- The spec explains how raw recall works.
- The spec explains how internal plugins can extend modules without tangling them.
- The spec keeps Agent tool, permission, and harness details out unless they are necessary to protect user experience.
- The spec stays at product-behavior level before detailed UI layout.

Pass condition:

- A reader can explain how Glade is used in v1 without inventing missing product behavior.

Reopen this step if:

- a flow cannot be explained without guessing
- UI details are compensating for unclear product behavior
- output lens views start acting like writing forms

## Step 3: Boundaries And Anti-Goals

Status: `partial draft exists`

Primary document:

- `v1-core-experience.md`

Purpose:

Prevent product drift.

Required anti-goals:

- Glade v1 is not a task manager.
- Glade v1 is not a psychology analyzer.
- Glade v1 is not a dashboard.
- Glade v1 is not an AI-first chat product.
- Glade v1 is not a workspace.
- Glade v1 is not a tag-management product.

Checks:

- Each anti-goal has a judgment rule.
- Each anti-goal includes allowed behavior.
- Each anti-goal includes forbidden behavior.
- Each judgment rule can reject a concrete feature proposal.
- Raw input simplicity is protected.
- Output views cannot replace raw material.

Pass condition:

- A future feature can be accepted, redesigned, deferred, or rejected using these rules.

Reopen this step if:

- a feature adds pressure, scoring, dashboards, heavy setup, or workspace behavior
- tags become the main product surface
- Agent chat becomes required for basic use

## Step 4: Core Objects And Source Of Truth

Status: `partial draft exists, unresolved`

Primary documents:

- `v1-core-experience.md`
- `local-memory-architecture.md`

Purpose:

Define the product objects and what counts as truth.

Objects needing clear definitions:

- `Raw Entry`
- `Raw Log`
- `Raw Signal`
- `Daily Note`
- `Local File`
- `Tag`
- `Long Stream`
- `Output Lens View`
- `Search Result`
- `Task Candidate`
- `Light Review`
- `Signal`
- `Agent-Assisted Shaping Output`
- `Life Rendering Output`
- `Memory Agent Output`
- `Module Plugin`
- `External Context`

Checks:

- Each object has a clear definition.
- Each object says who creates it.
- Each object says whether the user can edit it.
- Each object says whether it is raw truth, derived state, or view-only.
- The relationship between `Raw Entry`, `Raw Log`, `Daily Note`, and local files is explicit.
- Long streams reference raw material without replacing it.
- Tags classify or retrieve material without becoming the main writing form.
- Derived objects cannot silently rewrite raw material.
- Agent shaping outputs remain drafts, candidates, links, or derived objects until the user accepts a change.
- Life Rendering and Memory Agent outputs remain derived and source-linked.
- Module plugins do not become independent source-of-truth systems.
- External context is source-aware and distinguishable from user-written raw material.

Pass condition:

- An implementer can tell where data should be stored and what must never be overwritten.

Reopen this step if:

- the same user material appears to have two competing sources of truth
- a derived view becomes editable in a way that changes raw history
- file structure starts defining the user-facing experience too directly

## Step 5: Key Flows And State Changes

Status: `not locked`

Primary document:

- `v1-core-experience.md`

Purpose:

Turn scenes into behavior.

Required flows:

- raw capture
- transient handling during capture
- raw recall by text search
- raw recall by tag search
- raw recall by historical file browsing
- opening an output view
- returning from an output view to raw source material
- opening Canopy Flow with several module cards
- entering Limpid Zen with nonessential modules hidden
- browsing Memory Flora through output and recall material
- enabling, disabling, or deferring a module plugin at the product-concept level
- optional task candidate handling
- optional light review handling

Each flow must include:

- entry point
- main action
- system feedback
- user exit path
- empty state
- failure state
- what happens to raw material

Checks:

- The user can complete the flow without understanding storage internals.
- The user can recover from mistakes.
- Saving raw material is never blocked by Agent behavior.
- Search failure does not erase or hide raw material.
- Output view failure still leaves raw material recoverable.
- Plugin failure does not break the owning module's core behavior.

Pass condition:

- Every v1 scene has at least one flow that can be tested.

Reopen this step if:

- a flow requires hidden assumptions
- a failure state is missing
- a user action has no clear exit

## Step 6: Agent Behavior Contract

Status: `deferred`

Future primary document:

- `agent-harness-design.md`

Purpose:

Design the Agent behavior contract for the core advanced function.

Step 1 may define Agent-assisted shaping as central to Glade. Step 6 defines how it is allowed to operate.

Topics to cover later:

- what context the Agent may read
- what tools the Agent may use
- what outputs must be structured
- what requires user confirmation
- what can run in the background
- what happens on Agent failure
- how scripts and Agent judgment divide work
- how Agent shaping calls module interfaces instead of swallowing module logic

Checks before this step starts:

- ability module roles and interface orchestration roles are locked
- source-of-truth rules are locked
- output lens concept is clear

Pass condition:

- Agent behavior cannot silently rewrite raw material.
- Agent behavior cannot publish important structure without the needed user confirmation.
- Agent failure cannot block basic recording or recall.
- Agent behavior cannot hide which module or source material it used.

Reopen this step if:

- Agent behavior becomes the only input route
- Agent behavior hides its source material
- Agent tools become too broad for the user's trust model

## Step 7: Search And Recall Semantics

Status: `partial draft exists`

Primary document:

- `v1-core-experience.md`

Purpose:

Define recovery behavior before implementation.

Search and recall modes:

- text search
- tag search
- date or time browsing
- historical file browsing
- output-view source backlinking

Checks:

- Search returns source context, not only answers.
- Search can recover raw material.
- Tag search supports recall without requiring tag bureaucracy.
- Historical file browsing exists as a non-search recovery path.
- Output views expose their raw sources.
- AI answer generation does not replace local recall.

Pass condition:

- The user can find raw material by memory fragment, tag, or direct browsing.

Reopen this step if:

- search results hide source text
- tags become mandatory for recall
- browsing original files becomes inaccessible

## Step 8: Light Review Rules

Status: `partial draft exists, not current focus`

Primary document:

- `v1-core-experience.md`

Purpose:

Define gentle reflection without turning the product into coaching or therapy.

Checks:

- Light review is grounded in raw material.
- Light review is short.
- Light review is optional.
- Light review is dismissible.
- Light review does not score, diagnose, moralize, or prescribe self-improvement.
- Light review remains an output view, not an input requirement.

Pass condition:

- Review helps the user revisit life without pressure.

Reopen this step if:

- review starts sounding like performance feedback
- review creates anxiety or obligation
- review hides the raw source material

## Step 9: Low-Fidelity Interaction Draft

Status: `provisional draft exists`

Primary document:

- `v1-low-fi-wireframes.md`

Purpose:

Sketch the interface only after behavior is stable enough.

Required surfaces to represent:

- `Canopy Flow`
- `Limpid Zen`
- `Memory Flora`
- raw capture card
- output lens card
- Agent-assisted shaping card or sidebar
- recall or history card
- transient handling cards such as tag selection, stream intent, or handling notes

Checks:

- The sketch reflects locked scenes.
- The sketch does not introduce new unapproved workflows.
- The sketch keeps raw capture simple.
- The sketch shows Agent-assisted shaping as core but not chat-only.
- The sketch separates ability modules, interface orchestration functions, and transient handling cards.
- The sketch shows how source material can be reached from output lens views.
- Exact drag mechanics are not over-specified unless they affect product behavior.

Pass condition:

- The wireframe can guide implementation without forcing unresolved product decisions.

Reopen this step if:

- visual layout starts driving product meaning
- output lens views start looking like required input forms
- Agent chat becomes the only way to record or recover material

## Step 10: Product Acceptance Checklist

Status: `partial draft exists`

Primary document:

- `v1-acceptance-and-milestones.md`

Purpose:

Turn product intent into checks.

Required acceptance categories:

- raw capture
- raw log or raw local file persistence
- transient handling during capture
- raw recall through search
- raw recall through browsing
- output lens views
- Agent-assisted shaping
- Life Rendering / Digest
- Memory Agent / Reflective Recall
- interface orchestration functions
- internal plugin boundaries
- module boundaries
- source backlinks
- product feel
- failure behavior

Checks:

- Each core scene has at least one scenario test.
- Each scenario has a pass condition.
- Checks are observable by a human tester.
- Checks do not depend on hidden implementation details.
- Checks include negative cases such as no tags, no Agent, no stream, search miss, and indexing delay.

Pass condition:

- A designer, engineer, or tester can tell whether v1 behavior meets the product intent.

Reopen this step if:

- a feature ships without an acceptance check
- a check validates implementation detail but not user experience
- a core scene has no test scenario

## Step 11: Implementation Order

Status: `draft exists, not final`

Primary document:

- `v1-acceptance-and-milestones.md`

Current draft milestones:

- `M1 Raw Capture + Raw Log`
- `M2 Raw Recall`
- `M3 Agent-Assisted Shaping Foundation`
- `M4 Output Lens Foundation`
- `M5 Task Candidates + Light Review`
- `M6 Long Streams + Tag Library`
- later milestones for `Life Rendering / Digest`, `Memory Agent / Reflective Recall`, and richer module plugins

Checks:

- Each milestone has a clear user-facing outcome.
- Each milestone has acceptance checks.
- Each milestone preserves local-first behavior.
- The first milestone proves raw capture.
- Later milestones do not require rebuilding raw storage.
- Agent-assisted shaping composes raw capture and recall rather than replacing them.
- Agent-assisted behavior does not precede the foundation abilities it needs.
- New subfeatures enter through module or plugin interfaces rather than by hard-coding across surfaces.

Open questions:

- How small can the first useful Agent-assisted shaping milestone be?
- Which Agent shaping dimensions must be v1 and which stay later?
- Is long stream v1 implementation scope or v1 design scope?
- Which milestone first needs the full Agent harness design?

Pass condition:

- Implementation can start without inventing product decisions during coding.

Reopen this step if:

- a milestone mixes too many unrelated product bets
- the first implementation milestone does not prove the core promise
- the sequence makes later source-of-truth changes likely

## Final Pre-Code Gate

Before implementing v1 product code, confirm all of this:

- Step 1 product hierarchy is locked.
- Step 2 experience spec is updated from those scenes.
- Step 3 boundaries are usable as rejection rules.
- Step 4 source-of-truth rules are explicit.
- Step 5 flows include failure states.
- Step 7 search and recall semantics are clear.
- Step 10 acceptance checks exist.
- Step 11 milestone order is accepted.

Agent-assisted shaping work additionally requires:

- Step 6 Agent behavior contract.
- A tool and permission model.
- A confirmation model for user-visible changes.
- A failure model that preserves raw capture and recall.

## Documentation Roles

- `design-process.md`: governs the design workflow and stage gates.
- `design-discovery-log.md`: records discoveries, corrections, and discussion turns.
- `v1-core-experience.md`: holds the v1 product behavior spec.
- `v1-acceptance-and-milestones.md`: holds acceptance checks and implementation order.
- `v1-low-fi-wireframes.md`: holds provisional interaction sketches.
- `philosophy.md`: holds stable product principles.
- `product-positioning.md`: holds concise positioning.
- `product-map.md`: consolidates product direction.
- `competitive-landscape.md`: holds comparison and differentiation.
- `decisions.md`: holds firm decisions only.
- `conversation-log.md`: holds broader dated conversation notes.
- `local-memory-architecture.md`: holds storage architecture references.

## Recording Rules

Use the right document for the right kind of thinking:

- Put process status and checklist progress in `design-process.md`.
- Put new insights and corrections in `design-discovery-log.md`.
- Put stable product behavior in `v1-core-experience.md`.
- Put testable standards and milestone order in `v1-acceptance-and-milestones.md`.
- Put stable decisions in `decisions.md`.

Do not bury important design changes only in chat.

## Working Rules

- Check this document before starting a new design topic.
- Name the current step before discussing details.
- If a conversation moves into a later step, either pause or explicitly mark the idea as future input.
- Do not let UI detail solve a product-scene problem.
- Do not let storage design define the user-facing model by accident.
- Do not let Agent capability define the product's basic flow.
- Keep raw material recoverable from every derived view.
- Treat provisional documents as provisional until their gate passes.

## Current Next Action

Proceed to Step 2 review.

Immediate task:

- Review `v1-core-experience.md` against the locked Step 1 hierarchy.
- Tighten the behavior spec for the six ability modules and three interface orchestration functions.
- Keep Agent harness, storage schema, exact UI controls, and plugin implementation details in their later steps.
