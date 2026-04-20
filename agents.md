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

## Technical Direction

Current frontend decision:

- the frontend will be built with `Next.js`
- this is specifically to support both server-rendered and client-rendered components
- the `client` portion of the project now has its own scoped `AGENTS.md` file
- that file should be treated as local guidance for agent work within the `client` app
- its contents have not been reviewed yet and should only be inspected if the user explicitly asks
- the `client` app uses `pnpm` as its package manager
- `@mui/material` is installed in the `client` app and is being used for modal UI primitives
- the current `LearningTaskModal` implementation is intentionally bare minimum and uses a single component file with no barrel export
- `LearningTaskItem` now includes `title`, `description`, `learningResource`, and `progress` values that seed the current modal inputs as defaults
- the current learning task modal uses MUI form controls: `TextField` for task text values and `Slider` for progress
- the learning task modal currently treats the task title field as required
- the learning task modal currently includes MUI `Cancel` and `Save` action buttons, with both actions closing the modal until task persistence is implemented
- the learning task modal inputs and actions are wrapped in a form so browser validation can block save when required fields are empty
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
- the repository now includes a root `.vscode/settings.json` that enables format-on-save and ESLint fix-on-save for the `client` app workspace
- internal swim lane naming should use `LearningSwimlane` terminology instead of `Droppable`, and component prop types should use the `LearningSwimlaneProps` name
- internal task naming should use `LearningTask` terminology instead of `Draggable`

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

## Collaboration Rules

Agent operating constraint for this project:

- do not write code unless the user explicitly asks
- do not run commands unless the user explicitly asks
- whenever editing markup or rendered HTML structure, accessibility semantics should be reviewed and updated as part of the change
- aria labels, roles, headings, and related accessibility attributes should be kept meaningful and in sync with the UI
- accessibility decisions should aim toward Section 508 compliance wherever practical
- exported components and functions should use concise, sensible TSDoc comments at their declaration headers

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

### 2026-04-18

- Created `agents.md` as the canonical living memory file for the project.
- Captured the initial project concept: a light task manager for personal skill-growth tracking.
- Recorded the initial example use case: tracking progress in a ReactJS Udemy course.
- Added a standing directive to update this file whenever new project knowledge is learned.
- Recorded the frontend decision to use `Next.js` for both server-rendered and client-rendered components.
- Recorded the collaboration rule that no code or commands should be written or run unless explicitly requested by the user.
- Recorded that the `client` app has its own scoped `AGENTS.md`, likely for app-specific agent guidance.
- Recorded the TechUp YouTrack project link for project management: `https://techup.youtrack.cloud/projects/TEC`.
- Recorded that swim lanes should render as equal-width columns with a title/header area and a separate swim lane body section, using the lane `id` as the visible title.
- Recorded that the current learning board has five swim lanes with the titles `Selected for Learning`, `Learning in Progress`, `Learning Completed`, `Learning in Verification`, and `Learning Verified`.
- Recorded that the `client` app uses `pnpm` and now has a Jest + React Testing Library setup for unit tests.
- Recorded that the `client` app has a `client/src/components/learning/LearningTaskModal` component directory and now includes a basic reusable MUI modal component.
- Recorded that the current `LearningTaskModal` is intentionally minimal and kept as a single component file without a barrel export.
- Recorded that the current learning task modal uses a centered MUI `Box` with separate title and content areas, and seeds task title, description, learning resource, and progress inputs from `LearningTaskItem` default values.
- Recorded that the current learning task modal now renders those default values through MUI `TextField` and `Slider` controls.
- Recorded that the current learning task modal marks the title field as required.
- Recorded that the current learning task modal includes `Cancel` and `Save` action buttons and currently uses them to close the modal.
- Recorded that the current learning task modal now wraps its inputs and actions in a form so the required title field can trigger native validation on save.
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
