# Glade Product Design Process

Last updated: 2026-04-29

This document is the governing process for Glade product design before product code expands.

Use it as the checklist before implementing any major product surface, feature, or behavior.

The goal is simple:

- do not code from vague product taste
- do not turn unresolved design questions into engineering decisions
- do not let UI details, Agent mechanics, or storage concerns take over before the user scene is clear

## Process Status

Current stage: `Step 1 - Core V1 Usage Scenes`

Current status: `active, close to locking`

Current working question:

What are the core v1 user scenes that Glade must serve?

Current scene set:

- `Raw Input`: the user opens Glade and writes freely into a blank input surface.
- `Light Handling During Input`: the user may optionally attach tags, stream intent, or handling notes while writing.
- `Raw Recall`: the user can search by text or tags, and can also browse historical files or diary files inside the app.
- `Output Views`: long streams, calendars, task views, reviews, and search results are v1 core output surfaces over raw material.
- `Composed Working Surface`: input, output, and Agent chat can coexist as cards selected from a sparse sidebar.

Current guardrails:

- `Long Stream` is an output or recovery view, not a writing form.
- Raw input, storage, output views, and Agent harness must stay separate in discussion.
- Agent-assisted processing should be designed in a separate harness process.
- Concrete UI mechanics should wait until the scene and flow layers are locked.

## Design Stage Gates

Glade product work moves through these gates.

No product code should be written for a major feature until the relevant gates have passed.

| Gate | Purpose | Main Artifact | Status |
| --- | --- | --- | --- |
| `G0 Philosophy` | Decide what Glade is and is not. | `philosophy.md`, `product-positioning.md`, `product-map.md` | substantially complete |
| `G1 Landscape` | Know what to borrow and refuse. | `competitive-landscape.md` | substantially complete |
| `G2 Usage Scenes` | Define what users are actually trying to do. | `v1-core-experience.md` | active |
| `G3 Experience Spec` | Describe how Glade behaves in those scenes. | `v1-core-experience.md` | draft, not locked |
| `G4 Object Model` | Define product objects and source of truth. | `v1-core-experience.md`, `local-memory-architecture.md` | partial |
| `G5 Flow States` | Define entry, action, feedback, exit, and failure states. | `v1-core-experience.md` | partial |
| `G6 Acceptance` | Define product checks before code. | `v1-acceptance-and-milestones.md` | partial |
| `G7 Low-Fi Interaction` | Sketch only after behavior is stable. | `v1-low-fi-wireframes.md` | provisional |
| `G8 Implementation Order` | Cut the work into safe milestones. | `v1-acceptance-and-milestones.md` | draft |

## Hard Rule Before Coding

Before implementing a major product feature, the feature must have:

- a named user scene
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

Status: `active`

Primary documents:

- `v1-core-experience.md`
- `design-discovery-log.md`

Purpose:

Name the major situations where users use Glade.

This step is about user intent, not UI mechanics.

Current scene candidates:

- `Raw Input`
- `Light Handling During Input`
- `Raw Recall`
- `Output Views`
- `Composed Working Surface`

Checks:

- Each scene begins with a real user intention.
- Each scene can be described without naming a database table, API, script, or AI implementation.
- Each scene says what the user is trying to accomplish.
- Each scene says what success feels like.
- Each scene separates raw input, output views, storage form, and Agent behavior.
- Each scene says whether it is v1 core, v1 support, or later.
- No scene depends on unresolved UI details such as exact buttons or slash commands.

Pass condition:

- The scene list is accepted as the v1 macro scene set.
- Every later design section can point back to one or more scenes.

Reopen this step if:

- a new product surface appears without a scene
- a feature starts driving the product instead of a user situation
- input form, storage form, and output view are mixed again

## Step 2: V1 Core Experience Spec

Status: `draft exists, needs rewrite after Step 1 locks`

Primary document:

- `v1-core-experience.md`

Purpose:

Describe how Glade behaves across the locked scenes.

Checks:

- The spec starts from the accepted scene set.
- The default surface is raw input, unless a later decision changes this explicitly.
- The spec does not assume `Today` is the only home concept.
- The spec explains how output views relate to raw material.
- The spec explains how raw recall works.
- The spec keeps Agent harness details out unless they are necessary to protect user experience.
- The spec stays at product-behavior level before detailed UI layout.

Pass condition:

- A reader can explain how Glade is used in v1 without inventing missing product behavior.

Reopen this step if:

- a flow cannot be explained without guessing
- UI details are compensating for unclear product behavior
- output views start acting like writing forms

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
- `Daily Note`
- `Local File`
- `Tag`
- `Long Stream`
- `Output View`
- `Search Result`
- `Task Candidate`
- `Light Review`
- `Signal`

Checks:

- Each object has a clear definition.
- Each object says who creates it.
- Each object says whether the user can edit it.
- Each object says whether it is raw truth, derived state, or view-only.
- The relationship between `Raw Entry`, `Raw Log`, `Daily Note`, and local files is explicit.
- Long streams reference raw material without replacing it.
- Tags classify or retrieve material without becoming the main writing form.
- Derived objects cannot silently rewrite raw material.

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

- raw input
- light handling during input
- raw recall by text search
- raw recall by tag search
- raw recall by historical file browsing
- opening an output view
- returning from an output view to raw source material
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

Design Agent-assisted processing separately from macro product scenes.

Topics to cover later:

- what context the Agent may read
- what tools the Agent may use
- what outputs must be structured
- what requires user confirmation
- what can run in the background
- what happens on Agent failure
- how scripts and Agent judgment divide work

Checks before this step starts:

- raw input and raw recall scenes are locked
- source-of-truth rules are locked
- output view concept is clear

Pass condition:

- Agent behavior cannot silently rewrite raw material.
- Agent behavior cannot publish important structure without the needed user confirmation.
- Agent failure cannot block basic recording or recall.

Reopen this step if:

- Agent behavior becomes the default input route
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

- sparse sidebar
- raw input card
- output view card
- Agent chat card
- recall or history card

Checks:

- The sketch reflects locked scenes.
- The sketch does not introduce new unapproved workflows.
- The sketch keeps raw input simple.
- The sketch separates input, output, and Agent chat.
- The sketch shows how source material can be reached from output views.
- Exact drag mechanics are not over-specified unless they affect product behavior.

Pass condition:

- The wireframe can guide implementation without forcing unresolved product decisions.

Reopen this step if:

- visual layout starts driving product meaning
- output views start looking like required input forms
- Agent chat becomes visually dominant without a product decision

## Step 10: Product Acceptance Checklist

Status: `partial draft exists`

Primary document:

- `v1-acceptance-and-milestones.md`

Purpose:

Turn product intent into checks.

Required acceptance categories:

- raw input
- raw log or raw local file persistence
- light handling during input
- raw recall through search
- raw recall through browsing
- output views
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

- `M1 Raw Input + Raw Log`
- `M2 Raw Recall`
- `M3 Output View Foundation`
- `M4 Task Candidates + Light Review`
- `M5 Long Streams + Tag Library`

Checks:

- Each milestone has a clear user-facing outcome.
- Each milestone has acceptance checks.
- Each milestone preserves local-first behavior.
- The first milestone proves raw capture.
- Later milestones do not require rebuilding raw storage.
- Agent-heavy features do not precede raw input and raw recall.

Open questions:

- Should output view foundation come before or after raw recall?
- Is light review v1 core or v1.1?
- Is long stream v1 implementation scope or v1 design scope?
- Which milestone first needs Agent harness design?

Pass condition:

- Implementation can start without inventing product decisions during coding.

Reopen this step if:

- a milestone mixes too many unrelated product bets
- the first implementation milestone does not prove the core promise
- the sequence makes later source-of-truth changes likely

## Final Pre-Code Gate

Before implementing v1 product code, confirm all of this:

- Step 1 scenes are locked.
- Step 2 experience spec is updated from those scenes.
- Step 3 boundaries are usable as rejection rules.
- Step 4 source-of-truth rules are explicit.
- Step 5 flows include failure states.
- Step 7 search and recall semantics are clear.
- Step 10 acceptance checks exist.
- Step 11 milestone order is accepted.

Agent-heavy work additionally requires:

- Step 6 Agent behavior contract.
- A tool and permission model.
- A confirmation model for user-visible changes.
- A failure model that preserves raw input and recall.

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

Finish Step 1.

Immediate task:

- Confirm the five v1 usage scenes.
- For each scene, add a short user story.
- Mark each scene as `v1 core`, `v1 support`, or `later`.
- Then rewrite `v1-core-experience.md` around the locked scene set.
