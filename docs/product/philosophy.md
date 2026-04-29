# Product Philosophy

## Core Thesis

AI Life Assistant should be a local-first, long-memory, low-interruption life record and reflection assistant.

AI is not the protagonist. The user's life is the protagonist. The product should help the user record, organize, remember, reflect, and act with less friction.

## Product Belief

Help users preserve their lives gently and reliably, so their future selves can understand their past selves.

## Principles

### Local First

Life records, emotions, events, relationships, habits, and private reflections are sensitive. The default trust model should be that the user's data lives with the user.

- Store primary data locally by default.
- Make backup and export first-class capabilities.
- Keep data formats understandable and portable where possible.
- Make external AI calls transparent.
- Preserve useful offline behavior for recording, browsing, and searching.

### Local Files As A Product Interface

Local-first is not only a storage decision. It is also a user experience principle.

The product should be friendly to direct local file interaction. Users should be able to open, read, inspect, move, back up, and understand their own records without needing the app as the only doorway.

The intended storage model is a dual structure:

- SQLite for structured data, indexes, relationships, state, and efficient querying.
- Markdown files for human-readable life records, long-form notes, reflections, and durable text.

This keeps the system both machine-operable and human-accessible. The database helps the product think quickly. Markdown helps the user retain ownership and readability.

### Long-Term Companionship

The product is not merely an AI chat tool. It should support long-term task tracking, life recording, study records, daily matters, and health management.

It should behave like a long-term companion system: something the user can return to across months and years, with enough structure to preserve continuity and enough gentleness to avoid making life feel administratively heavy.

### Recording Over Managing

The product should not turn life into project management.

The lowest-friction behavior should be writing down what happened, what the user thought, what they promised, what they felt, and what may matter later.

Structured fields are useful only when they reduce future burden. They should not make the user feel like they are filling forms for the machine.

Recording should preserve the texture of life. Quantification is useful, but beautiful daily moments should not collapse into empty numbers.

### AI As Organizer, Not Supervisor

AI should help arrange, retrieve, summarize, and clarify. It should not become a judge, boss, or productivity scold.

Good AI behavior:

- Organizes scattered notes.
- Helps find patterns in past records.
- Turns vague thoughts into small possible actions.
- Offers observations gently when invited.
- Makes it easy to inspect what context was used.

Poor AI behavior:

- Scores the user's life.
- Over-optimizes private experience into metrics.
- Pushes constant improvement language.
- Interrupts without a clear benefit.

### Harness Before Model Magic

The product should not rely only on general large-model capability for memory, organization, and reasoning.

Strong data organization should come from careful harness engineering, scripts, workflows, indexes, file conventions, retrieval rules, scheduled jobs, and transparent automation. AI models can add reasoning power, but the product's reliability should come from system design.

### Time Is The Backbone

The product should treat time as a primary organizing structure.

Useful time scales:

- Now: quick capture, active thought, current reminder.
- Today: logs, events, unfinished fragments.
- Recently: weekly or monthly patterns.
- Long term: life projects, relationships, recurring themes, important memories.

Long time spans require architectural care. The file and database structure should make records easy to retrieve, cross-link, summarize, and migrate over years.

The system should feel closer to a well-designed building than a folder full of loose notes: highly organized, intentionally connected, and able to support future expansion.

### Open To Agents And Scripts

The CLI is a core part of the product's openness.

External agents, user scripts, internal native AI agents, and automation workflows should be able to call into the system without depending entirely on the GUI. This makes the product more durable, programmable, and extensible.

### Quiet, Trustworthy, Durable

The product should feel like a private workbench: calm, legible, and reliable.

Interface and interaction qualities:

- Clear quick-capture entry.
- Calm visual density.
- AI output that supports the user's records rather than dominating them.
- Easy review of history.
- Minimal decorative noise.
- No unnecessary gamification.

Low-interruption does not mean weakly connected to the user's life. It means the product should provide timely data, reminders, and guidance without binding the user's life rhythm to metrics or causing self-anxiety.

The product should accompany growth rather than pressure the user into optimization.

### Spatial Metaphor: A Garden, Not A Dashboard

The first impression should feel like a backyard garden filled with green plants.

It should not feel like a colorful productivity dashboard, a closed indoor office, or a busy command center. It should feel open, spacious, natural, and breathable.

Imagine lying on the grass in pleasant sunlight, smelling fresh grass, surrounded by quiet green life. In this space, the user's thoughts can flow freely. The user does not need to change the environment or perform for the system. They only need to enter it, settle into it, and let thinking and recording become as natural as breathing.

Design implications:

- Favor open space over dense control panels.
- Use a restrained green-centered palette with natural warmth, not loud multicolor decoration.
- Make record entry feel like placing a thought into a living garden, not submitting a form.
- Avoid visual pressure, achievement noise, and overly mechanical dashboards.
- Let panels and cards feel like parts of an outdoor landscape, not office widgets.
- Keep the interface calm enough for reflection and spacious enough for wandering thought.

### Life-Centered Universality

The long-term ambition may be broad and powerful, with multiple cards, beautiful panels, and a high degree of user freedom. But the center should remain life assistance.

The product can become capable, even expansive, as long as every expansion helps the user remember, understand, organize, review, or care for their life.

### Life, Not Workspace

Glade should feel like life itself, not a workspace made to contain life.

It should not collapse lived experience into grids, tables, cells, and systems thinking. It should also not blur the boundary between work and life by treating all experience as project management input.

Glade may contain tasks, structure, reminders, and organization, but these must remain in service of life rather than redefining life in the image of work.

## Anti-Goals

- Do not become a generic AI chat wrapper.
- Do not become a productivity surveillance system.
- Do not force social sharing.
- Do not make the user manage life through excessive forms.
- Do not hide user data behind opaque formats.
- Do not make cloud sync or remote AI a silent assumption.
- Do not become a generic diary app with interchangeable templates.
- Do not flatten personal memories into sterile metrics.
- Do not make AI conversation the only or primary product surface in the early stage.
- Do not become a cell-based workspace for personal life.
- Do not blur the boundary between work and life.

## Early Product Loop

The first strong loop should be:

1. Quickly record a life log.
2. Record or update important events.
3. Search and recover past context.
4. Review and reflect on recent life, tasks, and reminders.
5. Export or back up records in a durable format.

AI conversation and advanced AI operation are valuable long-term directions, but the early product should first become a reliable recording system.

## Primary Users

The product is for people who want to record life, embrace life, and notice life, but cannot spend much time and energy formatting their records.

This includes people busy with work, study, health, family, projects, or ordinary daily life who still want to preserve the small moments that would otherwise disappear.

## Core Usage Moments

- Review and reflection after a day, week, or study/work session.
- Quick capture of thoughts, moments, events, and observations.
- Search and memory recovery.
- Schedule and reminder support.
- Later-stage AI organization and autonomous operation.

## Emotional Design Scenario

A user finishes work or study, rides home along a familiar road, notices a beautiful flower, or has a sudden imaginative idea. They open the app and record it quickly.

That moment should feel natural, light, and worth preserving. This is one of the product's deepest reasons to exist.
## Five-Minute Integrity

Glade should help people preserve life without asking them to spend too much of life operating the system.

No matter how many supporting capabilities Glade may gain in the future, the product should protect one practical promise:

Within five minutes, a user should be able to record life well.

This means:

- capture must stay low-friction
- structure must not become a prerequisite for recording
- AI and automation should remove burden, not add ceremony
- advanced features should stay behind the act of recording, not in front of it

Glade should feel generous in what it can do, but light in what it asks from the user.
