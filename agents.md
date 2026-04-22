# Agents.md

This file is the living project memory for the current TechUp project.

## Directive: Auto-Update This File

Any agent working on this project must update `agents.md` whenever it learns something new that changes or clarifies:

- what the project is
- how the project functions
- product goals
- user workflows
- data structures
- technical constraints
- naming decisions
- architecture decisions
- implementation status

Do not wait for a major milestone. Update this file incrementally as new understanding emerges.

## Current Project Summary

TechUp is starting as a lightweight task-management app focused on personal growth and skill development.

The core concept is:

- users create a task or ticket
- tasks move between swim lanes
- the board is used to track progress on learning goals
- example use case: tracking progress through a ReactJS Udemy course

## Product Direction

The app is not a generic enterprise ticketing tool.

It is a personal-growth-oriented board where tasks represent learning activities, milestones, or practice goals tied to specific skills.

Accessibility is a project-level quality goal, and the team should make an active effort to keep the product aligned with Section 508 accessibility expectations.

Examples of task types may include:

- complete a lesson
- finish a module
- build a small practice project
- review notes
- revisit a weak concept

## Initial Functional Understanding

Based on current project knowledge, the app should support:

- creating a ticket/task
- organizing tickets in swim lanes
- moving tickets between swim lanes
- using the board to reflect learning progress over time
- each swim lane should render as a container with a visible title/header section and a separate swim lane body section
- the swim lane title currently uses the lane `id` as its display text
- the current learning board implementation uses five swim lanes
- the current learning swim lane titles are `Selected for Learning`, `Learning in Progress`, `Learning Completed`, `Learning in Verification`, and `Learning Verified`
- the app now also has an early skill-tree direction centered on turning job or project requirements into suggested high-level learning paths

## Technical Direction

Current frontend decision:

- the frontend will be built with `Next.js`
- this is specifically to support both server-rendered and client-rendered components
- the `client` portion of the project now has its own scoped `AGENTS.md` file
- that file should be treated as local guidance for agent work within the `client` app
- the current `client/AGENTS.md` warns that the app's Next.js version may differ materially from older assumptions and instructs agents to consult the bundled docs under `node_modules/next/dist/docs/` before writing code
- the `client` app uses `pnpm` as its package manager
- `@mui/material` is installed in the `client` app and is being used for modal UI primitives
- the `client` app is currently using MUI 9, and Drawer paper customization should use `slotProps.paper` instead of the legacy `PaperProps` API
- `@xyflow/react` is now installed in the `client` app for the current skill-tree prototype
- `@mui/icons-material` is now installed in the `client` app for Material icon components
- the `client` app's MUI and Emotion packages remain in runtime `dependencies` because application code imports them directly
- the current `LearningTaskModal` implementation is intentionally bare minimum and uses a single component file with no barrel export
- `LearningTaskItem` now includes `title`, `description`, `learningResource`, and `progress` values that seed the current modal inputs as defaults
- the current learning task modal uses MUI form controls: `TextField` for task text values and `Slider` for progress
- the learning task modal currently treats the task title field as required
- the learning task modal now serves as both the create-task and edit-task surface for learning tasks
- the learning page add-task entry points now open the shared learning task modal in create mode
- the learning task modal currently includes MUI `Cancel` plus a context-sensitive submit action, with submit dispatching either `add_learning_tasks` or `update_learning_tasks` before the modal closes
- the learning task modal inputs and actions are wrapped in a form so browser validation can block save when required fields are empty
- newly created learning tasks currently receive a client-generated id and default into the first learning swim lane, `Selected for Learning`
- unit tests are set up with `Jest` using `next/jest` and React Testing Library
- shared Sass design variables are currently defined in `client/src/styles/_variables.scss`
- style modules that need shared breakpoint tokens should import the shared Sass variables file directly
- the current responsive direction is mobile-first, with swim lanes stacked vertically by default and switching to a horizontal row at the tablet breakpoint
- swim lane title areas should keep a consistent minimum header height so varying title lengths do not create mismatched header rows
- current UI semantics use a page-level `main`, swim lanes as `section` elements, and swim lane titles as heading content inside a `header`
- swim lane drop areas should have explicit accessible labels describing them as swim lane drop areas
- current swim lane test coverage includes page-level lane count/order/accessibility checks and component-level `LearningSwimlane` semantic/accessibility checks
- pull request CI is configured at the repository root with GitHub Actions so it can expand beyond the `client` app over time
- the current pull request workflow runs the `client` unit test suite with `pnpm`
- the current pull request workflow file is `.github/workflows/pull-request.yml`
- the current pull request workflow runs on `opened`, `synchronize`, and `reopened` pull request events
- the current pull request workflow uses `ubuntu-latest`, `pnpm` version `10`, and `Node.js` version `22`
- the current pull request workflow installs dependencies in the `client` directory with `pnpm install --frozen-lockfile`
- the current pull request workflow runs `client-unit-tests` for pull requests regardless of target branch
- the current pull request workflow runs a `client-audit` job in the `client` directory with `pnpm audit --audit-level high` only when the pull request targets `master`
- the current pull request workflow requires the `client-audit` job to pass before running `client-unit-tests` when the audit job runs, but still allows tests to run when the audit job is skipped on non-`master` targets
- the current pull request workflow runs tests from the `client` directory with `pnpm exec jest --runInBand`
- the repository now includes a root `.vscode/settings.json` that enables format-on-save and ESLint fix-on-save for the `client` app workspace
- internal swim lane naming should use `LearningSwimlane` terminology instead of `Droppable`, and component prop types should use the `LearningSwimlaneProps` name
- internal task naming should use `LearningTask` terminology instead of `Draggable`
- the current learning board page is using MUI layout primitives for its page shell, swimlanes, and task cards
- current learning task cards surface the task description directly on the board for quicker scanning
- the current learning page and swimlane presentation no longer rely on their prior local CSS module files because the board styling is now driven directly through MUI components
- the current learning swimlane headers no longer show task-count badges, and the header text is slightly smaller to behave better at tablet sizes
- the current learning task modal styling is now visually aligned with the task card previews through shared rounded corners, border treatment, and softer progress control styling
- the current learning board layout has reduced outer padding and tighter swimlane gaps to preserve more horizontal space at the `sm` breakpoint and above
- the current swimlanes no longer use their own contrasting border or background fill, and instead rely on tighter spacing with simpler header/body structure
- the current learning swimlane header and body padding have been reduced by half to create a denser board layout
- the learning page now seeds its local `learningTasks` state from imported example task data in `client/src/temp/learningTasks.ts`
- the current learning task preview and modal now share the same editable progress-field styling, using a slim progress slider with a compact percentage readout for look-and-feel work before persistence
- the shared learning progress field now treats the slider as the only input control, rather than pairing it with a boxed number field
- the swimlane board preview now shows progress in a non-editable display mode to avoid accidental mobile changes, while the modal remains the editable progress surface
- clicking anywhere on a learning task card now opens the modal again, including the progress display area on the board
- the learning task card trigger now uses a full-card accessible surface without the prior hover-position shift from the board interaction wrapper
- the learning task card now again uses a MUI button-base wrapper so click and focus ripple feedback are available on the full-card trigger without the earlier hover-position shift
- the learning task card full-card trigger now uses MUI `CardActionArea` so the card keeps its ripple feedback with more stable card-specific hover behavior
- learning task cards now include a dedicated close-icon button for deleting a task without using the full-card open action
- the learning task card open action and delete action now use distinct accessible button names so they are easier to target for assistive tech and tests
- the learning task delete icon button now uses a borderless minimal treatment with a light grey icon so it reads as a secondary card action
- the learning task card action-menu spacing should only reserve space in the title row; description, resource text, and progress content should keep the card's default content width
- icon buttons should include concise hover tooltips describing their action, and the current learning task delete button now uses a hover-only tooltip
- deleting a learning task from the card now requires confirming through a dialog before the reducer action is dispatched
- learning task cards and the learning task modal now share a gear-icon actions menu component, with delete currently exposed through the menu
- learning task deletion confirmation now lives in its own shared dialog component used by both the card and the modal
- the learning task modal now includes a dedicated close `X` icon button, and that icon is reserved for closing the modal rather than destructive actions
- the learning page now exposes add-task entry points in two responsive forms: a standard top-right button at `smd` and above, and a floating circular plus button on smaller screens
- learning page add-task flows now use the existing learning task modal instead of a separate creation UI
- unit test coverage now includes the shared learning progress field, the learning task card interaction behavior, and the learning task modal rendering/actions, including board progress being disabled while modal progress remains editable
- the learning task modal now exposes explicit dialog semantics with an accessible heading title
- current component unit tests now include accessibility assertions alongside rendering and interaction coverage
- the current mock learning board data now includes multiple realistic sample tasks distributed across all five swimlanes so the page better represents an in-progress personal learning workflow
- the client app now defines a custom MUI `smd` breakpoint at `750px`, positioned between the default `sm` and `md` breakpoints
- the learning page now uses the custom `smd` breakpoint instead of `sm` for its responsive layout and spacing adjustments
- the client app uses Next.js 16 with Turbopack for local development
- when the client app is opened from a LAN IP instead of `localhost`, Next.js development mode requires `allowedDevOrigins` to include that origin so HMR and other dev assets are not blocked
- Next.js components should default to server components; `'use client'` should only be added when a component actually needs client-only behavior
- responsive client components that branch between materially different layouts at first render should avoid `useMediaQuery(..., { noSsr: true })` unless the server and client fallback markup stay identical, because it can trigger hydration mismatches in Next.js
- the client app now includes a shared top-level navigation bar that renders on every page from the root layout
- the shared top-level navigation bar currently includes a home link labeled `TechUp` plus a `/learning` link labeled `My Learning`
- the shared top-level navigation bar lives inside the app theme provider and above the learning task context provider in `client/src/app/layout.tsx`
- the client home page now hosts a first React Flow skill-tree prototype for an entry-level frontend developer role
- the current skill-tree prototype intentionally models only big-ticket skills such as HTML, CSS, JavaScript, TypeScript, React, accessibility, tooling, APIs, and testing
- the current skill-tree prototype is read-only and is intended as a visual direction for future AI-generated requirement parsing
- the home page skill-tree surface now uses the available viewport beneath the shared navbar rather than a marketing-style intro layout
- the home page skill-tree surface is intended to fill the full available width and height beneath the shared navbar without extra outer card styling
- the current skill-tree info panel now lives in a sidebar intended to become the future job-description and AI-chat area
- the skill-tree sidebar is closed by default on mobile and opens as a full-width overlay above the graph content
- the mobile skill-tree sidebar should open as a full-width overlay below the shared navbar, and its shared toggle button should stay pinned in the overlay's top-right corner while open so it remains reachable on small screens without clipping the sidebar content
- the shared skill-tree sidebar toggle icon should reflect open and closed state on both mobile and `smd`+ layouts, not just the accessible label text
- the skill-tree sidebar is shown by default on `smd` and above, shares page width with the graph, and the graph area grows or shrinks when the sidebar is toggled
- the skill-tree graph should refit its viewport after `smd`+ sidebar open or close transitions so the visible skill-tree content responds to the resized desktop/tablet content area
- the learning page now uses its `onDragEnd` handler to move a dragged learning task into a new swim lane by dispatching `update_learning_tasks` with the task's updated `swimlane`
- current learning page unit tests now cover drag-end task movement plus guard cases for canceled drags and invalid swim lane targets

## Project Management

Current project-management link:

- TechUp YouTrack project: `https://techup.youtrack.cloud/projects/TEC`

## Domain Framing

Current domain focus:

- personal development
- skill acquisition
- course progress tracking
- self-directed learning workflows

Example subject areas may include:

- ReactJS
- web development
- other learnable skills introduced later

## Working Assumptions

These are current assumptions and should be revised as the project becomes more concrete:

- this begins as a simple app, favoring clarity over complexity
- swim lanes likely represent stages of progress
- tickets likely represent actionable learning items
- the app may eventually expand as more requirements are revealed
- the root `README.md` should be kept updated when contributor-facing project, setup, testing, CI, architecture, or product-state information changes materially

## Collaboration Rules

Agent operating constraint for this project:

- do not write code unless the user explicitly asks
- do not run commands unless the user explicitly asks
- whenever editing markup or rendered HTML structure, accessibility semantics should be reviewed and updated as part of the change
- aria labels, roles, headings, and related accessibility attributes should be kept meaningful and in sync with the UI
- accessibility decisions should aim toward Section 508 compliance wherever practical
- whenever writing or updating unit tests for UI components, include accessibility assertions for labels, roles, required states, and keyboard behavior where practical
- whenever a form includes required fields, unit tests should cover the blocked-submission path as well as the valid submission path where practical
- functions and components should include concise, sensible TSDoc comments at their declaration headers, whether they are exported or local helpers
- any non-obvious or complex code should include brief explanatory comments close to the relevant logic

## Known Unknowns

These details are not defined yet:

- exact swim lane names
- whether users are single-user only or multi-user
- ticket fields and metadata
- storage approach
- backend stack
- authentication needs
- reporting or analytics requirements

## Change Log

### 2026-04-21

- Installed `@mui/icons-material` in the `client` app with `pnpm`.
- Recorded that the `client` app keeps MUI and Emotion packages in runtime `dependencies` rather than `devDependencies` because the rendered application imports them directly.
- Recorded that learning task cards now render a dedicated delete icon button alongside the full-card open action.
- Recorded that deleting a learning task from the card now dispatches the `delete_learning_tasks` reducer action.
- Recorded that the learning task delete icon button now uses a borderless, light-grey presentation.
- Recorded the UI convention that icon buttons should expose concise hover-only tooltips, with the learning task delete button as the current example.
- Recorded that deleting a learning task from the card now opens a confirmation dialog before removal is finalized.
- Recorded that task-level destructive actions now sit behind a shared gear-icon actions menu on both cards and the modal.
- Recorded that the delete confirmation dialog is now a shared component used by both card and modal delete flows.
- Recorded that the modal now uses a dedicated close `X` icon button for dismissal, separating close behavior from task actions.
- Recorded that the learning page add-task entry points now open the existing modal in create mode instead of using a separate creation surface.
- Recorded that the shared learning task modal now handles both add and edit submissions through the reducer.
- Recorded that newly created learning tasks currently receive a client-generated id and default into the first swim lane, `Selected for Learning`.
- Strengthened the agent documentation rule so TSDoc is expected on local and exported functions/components, and brief comments are expected around complex or non-obvious code.
- Added matching documentation guidance to `client/AGENTS.md` for frontend work.
- Recorded that learning task cards should reserve action-menu spacing in the title row only, while the rest of the card body keeps the default content padding.
- Recorded that the client app now renders a shared top-level navigation bar from the root layout on every page.
- Recorded that the current top-level navigation bar includes `TechUp` home navigation and a `My Learning` link to `/learning`.
- Recorded the Next.js preference to keep components as server components by default and only add `'use client'` when client-only behavior is required.
- Installed `@xyflow/react` for the new skill-tree prototype on the client home page.
- Recorded that the home page now renders a React Flow skill-path example for an entry-level frontend developer role.
- Recorded that the first skill-tree prototype is focused on high-level prerequisite skills rather than detailed subtopics.
- Recorded that the home page now gives the skill-tree surface the full usable viewport height below the shared navbar.
- Recorded that the skill-tree surface should use the full available workspace beneath the navbar without extra outer padding, rounded corners, or decorative shell styling.
- Recorded that the current skill-tree info panel now lives in a responsive sidebar meant for future job-description and AI-chat content.
- Recorded that the sidebar is mobile-overlay/full-width by default and desktop split-panel on `smd` and above.
- Recorded that the learning page `onDragEnd` handler now dispatches swimlane changes for valid drag targets.
- Recorded that learning page unit tests now cover drag-end updates and drag guard cases.
- Recorded the responsive add-task entry pattern: desktop/tablet top-right button plus mobile floating action button.
- Recorded that the client app is now on MUI 9 drawer typings, where `Drawer` paper styling should be configured through `slotProps.paper` rather than `PaperProps`.
- Recorded that the skill-tree workspace should keep its initial responsive sidebar render hydration-safe by avoiding `useMediaQuery(..., { noSsr: true })` for mobile-versus-desktop branch selection.
- Recorded that the skill-tree flow now refits its viewport after desktop and tablet sidebar width transitions so the visible graph area updates with the resized `smd`+ workspace.
- Recorded that the mobile skill-tree drawer should stay offset below the shared navbar while keeping its toggle button fixed in the overlay's top-right corner so the close action stays on-screen without covering the first sidebar content.
- Recorded that the shared skill-tree sidebar toggle icon should flip for both mobile and desktop open states so the visual control matches the current sidebar state.
- Recorded that pull request CI should continue running `client-unit-tests` for pull requests to any target branch.
- Recorded that pull request CI now starts with a `client-audit` job only for pull requests targeting `master`, where it runs `pnpm audit --audit-level high` in `client`.
- Recorded that `client-unit-tests` now wait for the audit job only when that audit runs, while still running normally when the audit is skipped on non-`master` pull requests.

### 2026-04-18

- Created `agents.md` as the canonical living memory file for the project.
- Captured the initial project concept: a light task manager for personal skill-growth tracking.
- Recorded the initial example use case: tracking progress in a ReactJS Udemy course.
- Added a standing directive to update this file whenever new project knowledge is learned.
- Recorded the frontend decision to use `Next.js` for both server-rendered and client-rendered components.
- Recorded the collaboration rule that no code or commands should be written or run unless explicitly requested by the user.
- Recorded that the `client` app has its own scoped `AGENTS.md`, likely for app-specific agent guidance.
- Recorded that the current `client/AGENTS.md` warns agents not to assume older Next.js behavior and directs them to the bundled docs under `node_modules/next/dist/docs/` before coding.
- Recorded the TechUp YouTrack project link for project management: `https://techup.youtrack.cloud/projects/TEC`.
- Recorded that swim lanes should render as equal-width columns with a title/header area and a separate swim lane body section, using the lane `id` as the visible title.
- Recorded that the current learning board has five swim lanes with the titles `Selected for Learning`, `Learning in Progress`, `Learning Completed`, `Learning in Verification`, and `Learning Verified`.
- Recorded that the `client` app uses `pnpm` and now has a Jest + React Testing Library setup for unit tests.
- Recorded that the pull request workflow file is `.github/workflows/pull-request.yml`.
- Recorded that the pull request workflow currently runs on `opened`, `synchronize`, and `reopened` pull request events.
- Recorded that the pull request workflow currently uses `ubuntu-latest`, `pnpm` version `10`, and `Node.js` version `22`.
- Recorded that the pull request workflow installs `client` dependencies with `pnpm install --frozen-lockfile`.
- Recorded that the pull request workflow runs tests from the `client` directory with `pnpm exec jest --runInBand`.
- Recorded that the `client` app has a `client/src/components/learning/LearningTaskModal` component directory and now includes a basic reusable MUI modal component.
- Recorded that the current `LearningTaskModal` is intentionally minimal and kept as a single component file without a barrel export.
- Recorded that the current learning task modal uses a centered MUI `Box` with separate title and content areas, and seeds task title, description, learning resource, and progress inputs from `LearningTaskItem` default values.
- Recorded that the current learning task modal now renders those default values through MUI `TextField` and `Slider` controls.
- Recorded that the current learning task modal marks the title field as required.
- Recorded that the current learning task modal includes `Cancel` and `Save` action buttons and currently uses them to close the modal.
- Recorded that the current learning task modal now wraps its inputs and actions in a form so the required title field can trigger native validation on save.
- Recorded that the current learning board page, swimlanes, and task cards now use MUI-first layout primitives.
- Recorded that learning task cards now render task descriptions directly on the board.
- Recorded that the current learning page and swimlane presentation no longer use their prior local CSS module files because those visuals are now handled directly through MUI.
- Recorded that the current swimlane headers no longer show task-count badges and now use slightly smaller heading text for better tablet behavior.
- Recorded that the current learning task modal styling has been aligned more closely with the task card preview styling.
- Recorded that the current learning board layout now uses reduced outer padding and narrower swimlane gaps to preserve more space after the board began switching to rows at the `sm` breakpoint.
- Recorded that the current swimlanes no longer use their own contrasting border or background fill and instead use a more minimal structure.
- Recorded that the current learning swimlane header and body padding were reduced by half to make the board layout denser.
- Recorded that the learning page now seeds local `learningTasks` state from `client/src/temp/learningTasks.ts`.
- Recorded that the learning task preview and modal now share an editable progress field made of a slim styled slider and compact percentage readout, with local-only UI editing for now.
- Recorded that the shared learning progress field now treats the slider as the only input control instead of using a boxed number field beside it.
- Recorded that board-level progress is now display-only to reduce accidental mobile changes, while the modal keeps progress editing enabled.
- Recorded that the entire learning task card is once again the modal trigger, including the board progress display region.
- Recorded that the learning task card now uses a stable full-card interactive wrapper to avoid the small hover-position shift seen with the prior trigger wrapper.
- Recorded that the learning task card now again uses a MUI button-base wrapper so click and focus ripple feedback are available without the earlier hover-position shift.
- Recorded that the learning task card full-card trigger now uses MUI `CardActionArea` so the card keeps ripple feedback with more stable card-specific hover behavior.
- Recorded that test coverage now includes the shared progress field, task-card interaction behavior, and modal rendering/actions, including checks that board progress is disabled and modal progress stays editable.
- Recorded the standing rule that component unit tests should include accessibility assertions where practical.
- Recorded the standing rule that forms with required fields should have unit-test coverage for blocked submission when required inputs are empty.
- Recorded that the learning task modal now exposes explicit dialog semantics with an accessible heading title.
- Recorded that current component unit tests now include accessibility assertions alongside rendering and interaction coverage.
- Recorded that the root `README.md` now documents the current project state and should be updated when contributor-facing repository or product information changes materially.
- Recorded that the current mock learning board data now includes multiple realistic sample tasks across all five swimlanes to better represent a real board state.
- Recorded that the client app now has a custom MUI `smd` breakpoint at `750px` between `sm` and `md`.
- Recorded that the learning page now uses `smd` instead of `sm` for its responsive spacing and row-layout breakpoint.
- Recorded that the client app is currently running on Next.js 16 with Turbopack in local development.
- Recorded that opening the client app from a LAN IP requires `allowedDevOrigins` to include that origin or Next.js will block dev-only resources like HMR.
- Recorded that shared breakpoint values are now being handled through the shared Sass variables file `client/src/styles/_variables.scss`.
- Recorded that swim lane headers should maintain a consistent minimum height to reduce mismatched title-row heights when titles wrap differently.
- Recorded the current semantic structure: learning page content uses `main`, each swim lane is a `section`, and each lane title is rendered as heading content inside a `header`.
- Recorded that swim lane drop areas now use explicit accessible labels describing each lane as a swim lane drop area.
- Recorded the standing rule that any markup edits should include an accessibility pass so aria labels, roles, headings, and related semantics stay meaningful and current.
- Recorded that the project should make an active effort to be Section 508 compliant.
- Recorded that swim lane unit tests now cover lane count, heading order, drop-area accessibility labels, and `LearningSwimlane` component semantics.
- Recorded the convention that exported components and functions should include concise, sensible TSDoc comments at their declaration headers.
- Recorded that a root GitHub Actions pull request workflow now runs the `client` unit tests with `pnpm`.
- Recorded that the repository now includes root VS Code workspace settings to run editor formatting on save and apply ESLint fixes on save for the `client` app.
- Recorded the naming decision to replace internal `Droppable` terminology with `LearningSwimlane`, using `LearningSwimlaneProps` for component prop types.
- Recorded the naming decision to replace internal `Draggable` terminology with `LearningTask`.
