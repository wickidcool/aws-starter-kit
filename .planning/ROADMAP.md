# Roadmap: AWS Starter Kit CLI

## Overview

Transform the existing AWS Starter Kit into an interactive CLI tool that scaffolds new projects. Starting from CLI foundation, we build the wizard interface, template system, and generation engine, then add feature customization and polish for npm publishing.

## Domain Expertise

None

## Phases

- [x] **Phase 1: CLI Foundation** - Set up CLI package with command parsing
- [x] **Phase 1.1: Address Codebase Concerns** - Fix tech debt before templating (INSERTED)
- [x] **Phase 2: Interactive Wizard** - Implement prompts for configuration
- [ ] **Phase 3: Template System** - Create template files with placeholders
- [ ] **Phase 4: Generation Engine** - Build file copying and replacement logic
- [ ] **Phase 5: Feature Toggles** - Add optional feature selection
- [ ] **Phase 6: Polish & Publish** - Documentation, testing, npm publishing

## Phase Details

### Phase 1: CLI Foundation

**Goal**: Create `packages/create-aws-starter-kit` with basic CLI structure
**Depends on**: Nothing (first phase)
**Research**: Unlikely (standard Node CLI setup)
**Plans**: TBD

Plans:

- [x] 01-01: Package setup and bin configuration
- [x] 01-02: Command parsing and help text

### Phase 1.1: Address Codebase Concerns (INSERTED)

**Goal**: Fix high-priority technical debt from CONCERNS.md before templating
**Depends on**: Phase 1
**Research**: Unlikely (fixes to existing code)
**Plans**: TBD

Plans:

- [x] 01.1-01: Add missing handler tests (update/delete)
- [x] 01.1-02: Fix CORS and add .env.example files

### Phase 2: Interactive Wizard

**Goal**: Implement the interactive prompt flow for gathering user configuration
**Depends on**: Phase 1
**Research**: Likely (CLI library choice)
**Research topics**: Best CLI prompt library for Node.js (inquirer vs prompts vs clack), validation patterns, UX best practices
**Plans**: TBD

Plans:

- [x] 02-01: Prompt dependencies and modules
- [x] 02-02: Wizard orchestration

### Phase 3: Template System

**Goal**: Create template versions of existing files with placeholder tokens
**Depends on**: Phase 1
**Research**: Unlikely (file templating patterns)
**Plans**: TBD

Plans:

- [ ] 03-01: Define placeholder token syntax
- [ ] 03-02: Create template files from existing code
- [ ] 03-03: Platform-conditional templates

### Phase 4: Generation Engine

**Goal**: Build the core logic that copies templates and replaces placeholders
**Depends on**: Phase 2, Phase 3
**Research**: Unlikely (file system operations)
**Plans**: TBD

Plans:

- [ ] 04-01: File copying with token replacement
- [ ] 04-02: Platform filtering logic
- [ ] 04-03: Post-generation setup

### Phase 5: Feature Toggles

**Goal**: Add optional feature selection to the wizard
**Depends on**: Phase 4
**Research**: Unlikely (extending existing wizard)
**Plans**: TBD

Plans:

- [ ] 05-01: Feature toggle prompts
- [ ] 05-02: Conditional template sections
- [ ] 05-03: Styling/theme preferences

### Phase 6: Polish & Publish

**Goal**: Documentation, testing, and npm publishing
**Depends on**: Phase 5
**Research**: Likely (npm publishing workflow)
**Research topics**: npm publish setup, package.json bin configuration, scoped vs unscoped packages, README badges
**Plans**: TBD

Plans:

- [ ] 06-01: CLI tests
- [ ] 06-02: README and documentation
- [ ] 06-03: npm publish setup

## Progress

| Phase                      | Plans Complete | Status      | Completed |
| -------------------------- | -------------- | ----------- | --------- |
| 1. CLI Foundation          | 2/2            | Complete    | 2026-01-14 |
| 1.1 Codebase Concerns      | 2/2            | Complete    | 2026-01-13 |
| 2. Interactive Wizard      | 2/2            | Complete    | 2026-01-14 |
| 3. Template System    | 0/3            | Not started | -         |
| 4. Generation Engine  | 0/3            | Not started | -         |
| 5. Feature Toggles    | 0/3            | Not started | -         |
| 6. Polish & Publish   | 0/3            | Not started | -         |
