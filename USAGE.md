# Usage Guide

## Setup

```bash
git clone <repo-url>
cd proxorus
cd .opencode && npm install && cd ..
```

OpenCode will automatically load `opencode.json` and `AGENTS.md` when you open this directory.

## Using Skills

Load a skill via the `skill` tool when a task matches its role description. Each `SKILL.md` contains activation triggers, workflow, experience level adaptation, and outputs.

Available skills: `domain-analyst`, `system-architect`, `code-reviewer` (includes Branch Analysis Mode for git diff business logic extraction), `core-domain-developer`, `integration-developer`, `solution-assembler`, `qa-engineer`, `devops-engineer`, `project-manager`, `system-designer`, `ai-ops-engineer`, `project-starter`.

### Starting a project with `project-starter`

The `project-starter` skill is the entry point to the full lifecycle. It orchestrates all phases from Onboarding through Release:

```bash
# Invoke the starter
/project-starter
```

The skill will:

1. **Scan** the project for existing artifacts (bounded contexts, ADRs, architecture diagrams, code, tests, CI/CD)
2. **Determine** the current phase based on artifacts found
3. **Propose** the next phase to execute
4. **Activate** the appropriate role skills for that phase
5. **Repeat** sequentially through all phases, respecting Guard-Agent gates between transitions

### Pipeline phases

| Phase | Active Roles | Key Output |
|---|---|---|
| Phase 0: Onboarding | Domain Analyst, System Architect, Code Reviewer | Onboarding report |
| Phase 1: Discovery | Domain Analyst, System Architect, Project Manager, AI Ops Engineer | DDD classification, MVP scope (no estimates) |
| Phase 2: Architecture | System Architect, Domain Analyst, Project Manager, AI Ops Engineer | Architecture diagram, ADRs (no estimates) |
| Early Scope & Architecture Approval | All planning roles | Scope + architecture approval (`scope-approval.md`) |
| System Design | System Designer, System Architect, Domain Analyst | API contracts, data models (design review before estimation) |
| Task Decomposition & Estimation | Project Manager, AI Ops Engineer | `task-decomposition.md`, time estimates, token budgets |
| Sign-Off Gate | All planning roles | Customer approval of design, decomposition, estimates |
| Phase 3: Core Impl | Core Domain Developer, QA, Code Reviewer | Working Core domain |
| Phase 4: Support Impl | Integration Developer, QA, Code Reviewer | Adapters, integrations |
| Phase 5: Generic Impl | Solution Assembler, QA, Code Reviewer | CRUD, config, scaffolding |
| Phase 6: MVP Release | DevOps Engineer, QA, Code Reviewer | Deployed MVP |
| Phase 7: Enhancement | All (cycling) | Incremental releases |

### Guard-Agent gates

Between each phase, a Guard-Agent checks the Handoff Report for unresolved Open Questions or Unconfirmed Decisions. If blocked, Clarification-Agent asks the user for answers before proceeding.

## Using Agents

Agents orchestrate multiple skills across a lifecycle phase. Defined in `.opencode/agents/` and registered in `opencode.json`.

| Agent | When | Skills loaded |
|---|---|---|
| `onboarding-agent` | Phase 0: reverse-engineer existing codebase (`scope: full`) or branch diff analysis (`scope: diff`) | domain-analyst, system-architect, code-reviewer |
| `planning-agent` | Phase 1-2 + early approval; after design: decomposition, estimation, final sign-off | domain-analyst, system-architect, project-manager, ai-ops-engineer |
| `design-agent` | Before sign-off: detailed component design | system-designer, system-architect, domain-analyst |
| `alignment-agent` | Gate between phases: design & code review | domain-analyst, system-architect, code-reviewer |
| `development-agent` | Phase 3-5: implement Core → Support → Generic | core-domain-developer, integration-developer, solution-assembler, qa-engineer, devops-engineer, code-reviewer |

### Transition gates

| Transition | Gate |
|---|---|
| Onboarding → Planning | Onboarding report complete |
| Planning → Early Approval | Scope + architecture ready, no open questions |
| Early Approval → Design | `scope-approval.md` recorded |
| Design → Decomposition | Design review passed (alignment-agent) |
| Decomposition → Sign-Off | `task-decomposition.md` complete, no open questions |
| Sign-Off → Development | Customer Sign-Off approved |
| Development → QA | Implementation complete |
| QA → Release | All tests pass, code reviewed |

## Scripts

Utility scripts in `.opencode/scripts/`:

- `branch-context.sh` — extract business logic delta from a git branch (`--base main --head feature`). Used by `onboarding-agent` in `scope: diff` mode and by `code-reviewer`'s Branch Analysis Mode.
- `md2html.js` — regenerate the HTML view of project artifacts into `html/` (gitignored, derived from markdown). Run after writing or updating any artifact: `node .opencode/scripts/md2html.js`.

## Templates

Output templates in `.opencode/templates/`:

- `onboarding-report.md` — bounded context map, architecture, conventions
- `scope-approval.md` — early scope + architecture approval (no estimates)
- `sign-off-package.md` — scope, design, decomposition, estimates, token budgets, team comp
- `task-decomposition.md` — tasks with per-task estimates (sign-off appendix)
- `design-spec.md` — API contracts, data models, sequence diagrams
- `review-report.md` — approve / request changes / block
- `adr.md` — Architecture Decision Record
- `ubiquitous-language-glossary.md` — terms per bounded context

## Project Stage Modes

The role matrix adapts to different project stages (see spec for details):

- **Greenfield** — default Phase 0→7 flow
- **Support & Maintenance** — Integration Developer first
- **Refactoring** — System Architect first
- **Microservices Split** — Domain Analyst first

## Customisation

### Changing default model

Edit `model` in `opencode.json` and agent `.md` frontmatter.

### Adding a new skill

```bash
mkdir -p .opencode/skills/your-role
# Create SKILL.md with frontmatter (name, description) and workflow
```

### Changing agent permissions

Edit `permission` block in agent `.md` frontmatter (`edit: allow/deny`, `bash: ask/deny`, `read: allow`).
