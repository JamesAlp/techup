# TechUp

TechUp is a lightweight task-management app focused on personal growth and skill development.

The current product direction is a learning board where tasks represent learning activities, milestones, and practice goals tied to specific skills. The initial example use case is tracking progress through a course such as a React learning path.

## README Maintenance

This README should be updated whenever project knowledge changes in a way that would help a new contributor understand the current state of the product or repository.

Update this file when appropriate, including changes to:

- project purpose or product direction
- repository structure
- setup or run instructions
- testing or CI workflows
- major architecture or technology decisions
- important user workflows or current implementation status

## Current Status

The repository currently contains a `client` application that implements the learning board UI.

Current learning-board capabilities include:

- rendering a persistent top-level app navigation bar across routes
- rendering a home-page React Flow prototype for AI-oriented skill-tree exploration
- rendering five learning swim lanes
- rendering learning task cards inside those lanes
- opening the shared learning task modal from task cards and add-task controls
- creating new tasks in the modal UI
- editing existing task fields in the same modal UI
- showing progress on the board as display-only
- editing progress in the modal

The current modal experience updates in-memory board state through the reducer, but it is not yet backed by longer-term persistence or storage.

## Tech Stack

The current frontend stack includes:

- `Next.js 16`
- `React 19`
- `TypeScript`
- `MUI`
- `@xyflow/react`
- `@dnd-kit/react`
- `Jest` and React Testing Library
- `pnpm`

## Repository Structure

Current top-level structure:

- `client/` - Next.js frontend application
- `.github/workflows/` - GitHub Actions workflow definitions
- `agents.md` - living project memory for agent collaboration

## Getting Started

Install dependencies:

```bash
cd client
pnpm install
```

Start the development server:

```bash
pnpm dev
```

Run unit tests:

```bash
pnpm test
```

## Testing

The project currently uses Jest with React Testing Library for frontend unit tests.

Current test coverage includes:

- learning page swim lane structure
- swim lane semantics and accessibility labels
- learning task card rendering and interaction behavior
- learning task modal rendering, accessibility, and form behavior
- progress field rendering and editable/display-only states

When writing or updating UI unit tests, include accessibility assertions where practical. When forms include required fields, tests should cover both valid submission and blocked submission paths where practical.

## Pull Request CI

Pull request validation is currently defined in:

- `.github/workflows/pull-request.yml`

The current workflow:

- runs on pull request `opened`, `synchronize`, `reopened`, and `ready_for_review`
- uses `ubuntu-latest`
- uses `pnpm` version `10`
- uses `Node.js` version `22`
- skips draft pull requests so CI only runs once the pull request is ready for review
- future pull request pipelines in this repository should also skip draft pull requests and wait until `ready_for_review`
- runs the client unit test suite on non-draft pull requests regardless of target branch
- runs a `pnpm audit --audit-level high` job in `client/` only for pull requests targeting `master`
- blocks the `master` pull request workflow when the client audit finds any vulnerability at `high` severity or above
- installs dependencies in `client/` with `pnpm install --frozen-lockfile`
- runs the client unit test suite with `pnpm exec jest --runInBand`, waiting for the audit job to pass when the pull request targets `master`

## Accessibility

Accessibility is a project-level goal. The current direction is to keep semantics, labels, headings, roles, and form behavior aligned with Section 508 expectations wherever practical.
