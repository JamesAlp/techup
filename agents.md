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

## Technical Direction

Current frontend decision:

- the frontend will be built with `Next.js`
- this is specifically to support both server-rendered and client-rendered components
- the `client` portion of the project now has its own scoped `AGENTS.md` file
- that file should be treated as local guidance for agent work within the `client` app
- its contents have not been reviewed yet and should only be inspected if the user explicitly asks

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
