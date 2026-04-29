# Product Conversation Log

## 2026-04-23

### Topic

Initial product philosophy for AI Life Assistant.

### Context

The project already has a TypeScript/Electron structure with GUI, CLI, local database, AI providers, scheduling, and storage modules. This suggests the product is not only a utility, but a long-running personal system.

### Valuable Ideas

- The product should be a local-first, long-memory, low-interruption life record and reflection assistant.
- AI should not be the main character. The user's life and records should be the center.
- The product's most important trust promise is that private life data belongs to the user.
- Recording should be easier than managing. The product should avoid turning personal life into a project-management system.
- AI should behave like someone helping organize a desk, not like a boss or judge.
- Time should be the product's backbone: now, today, recently, and long term.
- The first product loop should stay narrow: capture logs, manage events, search memory, summarize or reflect with AI, export or back up.
- The visual and interaction tone should be quiet, trustworthy, and durable.

### Working Product Statement

Help users preserve their lives gently and reliably, so their future selves can understand their past selves.

### Open Questions

- Who is the first target user: students, researchers, freelancers, people tracking emotions, ADHD users, or ordinary personal knowledge workers?
- What is the primary usage moment: quick capture, daily review, weekly reflection, search, reminder, or AI conversation?
- What should the product deliberately avoid becoming?

### Follow-up: Local Files, Long Memory, And Life Texture

The product owner strongly affirmed the core thesis and refined it.

Important additions:

- Local-first should also mean local-file-friendly. Users should be able to directly open and read their own records.
- Structured data should use SQLite. Text records should use Markdown, so the user's life data remains human-readable and easy to access.
- The product needs long-term memory because it is not just an AI chat tool. It should support long-term task tracking, life records, study, daily matters, and health management.
- Low-interruption should mean timely help without using data to bind the user's life rhythm or create self-anxiety.
- The product should accompany user growth instead of pressuring the user into optimization.
- Strong memory and organization should come from harness engineering and diverse automation scripts, not only from large-model capability.
- Time is the backbone, but long time spans require systematic configuration and careful file architecture.
- Files should be quickly searchable and linkable to other files, like a well-designed building rather than a loose pile of documents.
- The long-term ambition can be broad: multiple cards, beautiful panels, and user-customizable life dashboards.
- The product should still remain centered on life assistance, not become a generic everything app.
- CLI support is important because the product should be open to external agents, scripts, and internal native AI agents.
- The early focus should be review, quick capture, search, memory recovery, and schedule reminders. AI conversation organization can come later.
- The target users are people who want to record, embrace, and love life, but cannot spend much time formatting life records.
- The product should avoid becoming a common diary app or reducing beautiful life moments to hollow quantitative data.

### Memorable Scenario

A user finishes work or study and rides home along a familiar road. On the way, they see a beautiful flower, or have a sudden imaginative thought. They open the software and record it.

This small scene captures the emotional center of the product: helping users preserve the beauty and texture of ordinary life without friction.

### Visual And Emotional Metaphor: Backyard Garden

The desired first impression is like a backyard garden full of green plants.

The product should not feel colorful, crowded, indoor, or office-like. It should feel open and spacious: pleasant sunlight, grass, fresh air, and surrounding green life.

The user should feel that their thoughts can move freely here. They do not need to change the surrounding environment or adapt themselves to a rigid system. They simply enter the space and blend into it, letting thinking and recording become as natural as breathing.

This metaphor should guide the first-screen design, visual density, color palette, spacing, recording interaction, and the emotional tone of the product.

### First Garden Interface Prototype

The first renderer prototype translated the backyard garden metaphor into the app's main screen.

Implementation direction:

- Replace the previous dark three-column utility layout with a light, spacious garden-like surface.
- Make quick capture the largest and most important area.
- Present recent logs as a soft timeline rather than a data table.
- Keep events and reminders as a side path through the day, with simple event categories.
- Keep AI as a quiet helper in the shade, available but not dominant.
- Use restrained natural greens, warm sunlight tones, soft borders, and ample spacing.
- Repair visible Chinese text so the interface feels intentional instead of technical.

This is not the final visual system. It is a first experiential anchor for future product iteration.

### Prototype Feedback

The first garden interface was received positively. The color direction feels satisfying and close to the intended product mood.

Remaining design direction:

- The interface is still simple and does not yet have beautiful organic graphics.
- It still feels a bit nerd-like, partly because the layout remains close to panels and utility surfaces.
- Future window presentation and interactions should become more lively, fluid, and alive.
- The product should keep the current restrained natural palette while improving spatial richness, motion, and garden-like affordances.

This confirms that the current palette can serve as a foundation, but the product needs more expressive interaction design before it fully becomes the imagined backyard garden.

### Product Name

The product name was chosen: `Glade`.

The name fits the desired emotional space: a small open green clearing, quiet and breathable, where thoughts can move naturally. It keeps the product away from generic AI/tool naming and closer to a personal garden for life records.

### Core Value Statement Direction

The desired user feeling is:

- This is life itself.
- It does not become a workspace made of cells.
- It does not blur the boundary between work and life.
- It remains life first.

This sharpens Glade's positioning against workspace-style tools such as Notion. The product may borrow useful structural ideas, but it must not inherit the emotional frame of work software.

### Future Capability: Agent Web Search

The product owner wants Glade to eventually support agent web search so users can gain new knowledge.

This should be recorded as a future capability, not part of the first implementation milestone. It should remain explicit, source-aware, and separate from private local memory unless the user chooses to save search results into Glade.

### Multi-Layer Understanding Of A Day

The product owner does not want Glade to define a day in only one way.

Possible ways a day may be understood:

- Chronological time from morning to night.
- Work/rest or study/life schedule blocks.
- Physiological rhythm, including energy, hormones, and nervous-system activity.
- Psychological or atmospheric rhythm, including mood and felt texture.
- Longer super-day rhythms that stretch across multiple days or cycles.

The desired product direction is not to force a single interpretation, but to support multiple valid ways of understanding a day and let users prefer the one that fits them.

This implies a design where Glade has one stable underlying record system, but multiple ways of reading the same life data.

### Soft Decomposition From Freeform Diary

The product owner wants Glade to start from freeform diary input rather than from manual structured entry.

The desired direction is soft decomposition:

- The user writes naturally and freely.
- The agent extracts relevant signals from that diary-like input.
- The system places those signals into related baskets over time, such as tasks, health, study, topics, mood, or other lenses.

This is not meant to force the user to pre-classify life. The structure should grow after expression, not before it.

The product owner also wants the future agent to have initiative. In the long run, the agent should not only wait for direct commands; it should notice useful patterns, propose organization, and help life records grow into richer structures.

At the same time, this was recognized as a later-stage capability with possible feasibility and acceptance challenges. It should be implemented carefully so it feels helpful rather than intrusive.
## 2026-04-24

- Added a new core principle: Glade should let a user record life well within five minutes.
- This principle is meant to guard against feature bloat, even when most complexity is handled by software or AI.
- The idea is not merely speed for its own sake. It is about preserving the integrity of life recording for busy people who still want to remember, reflect, and stay close to their days.
