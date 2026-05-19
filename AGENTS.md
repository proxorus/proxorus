# AGENTS.md

This repo defines an **AI agent role matrix** for DDD-based software development. It is a methodology playbook, not a code project.

## Core content

- `docs/superpowers/specs/2026-05-18-ai-agent-role-matrix-design.md` — the single authoritative spec. Read it first.
- `package.json` is empty (`{}`). No build, test, lint, or CI infrastructure exists.

## Key concepts from the spec

- **DDD subdomain classification** — every feature is Core, Support, or Generic.
- **Theory of Constraints (ToC)** — always implement Core first (it is the bottleneck).
- **Role matrix** — Core roles (Domain Analyst, System Architect, Code Reviewer) are always active; implementation and delivery roles activate contextually. **Project Manager** is a planning role active in Phases 1-2 and the Sign-Off Gate. **System Designer** produces detailed designs after sign-off. **AI Ops Engineer** manages model recommendations and token budgets across all phases.
- **Dependency direction** — dependencies flow inward toward Core; Core must not depend on Generic internals.
- **Time estimation** — estimates are produced for two scenarios (human-only team and agent-assisted team) in parallel. Preliminary in Phase 1, refined in Phase 2. Token budgets per role accompany agent-assisted estimates.
- **Customer Sign-Off Gate** — mandatory approval of scope, architecture, estimates, and token budgets before any implementation begins (between Phase 2 and Phase 3).

## Workflow

1. Read the spec above before any implementation.
2. Identify the project stage — greenfield, support, refactoring, or microservices split — and use the role activation table in "Role Activation by Project Stage" to determine role focus and priority.
3. For existing projects, start with Phase 0 (Onboarding & Context Acquisition) — reverse-engineer bounded contexts, architecture, ADRs, and conventions from the codebase before Phase 1.
4. Follow the phase-to-role mapping in the spec.
5. No verification gate should be skipped: Customer Sign-Off → QA → Code Reviewer are all mandatory.
6. Estimation is produced for both human-only and agent-assisted scenarios in parallel — preliminary in Phase 1, refined in Phase 2. Team composition and headcount proposals accompany estimates. AI Ops Engineer computes token budgets per role for the agent-assisted scenario. Present all three (estimates, staffing, token budgets) to customer at the Sign-Off Gate.

## Conventions

- No testing framework, linter, or formatter is configured. If one is added, update this file.
- Commits should reference the spec's role matrix (e.g., "Implements [role] responsibilities for [subdomain]").

## OpenCode agents & skills

Five subagents implement the lifecycle groups; eleven skills encode individual role procedures.

### Agents (`.opencode/agents/`)
| Agent | Model | Lifecycle group | Permission |
|---|---|---|---|
| `onboarding-agent` | claude-opus-4-6 | Ввод в проект | read + bash |
| `planning-agent` | claude-sonnet-4-6 | Планирование + Утверждение | read + bash |
| `design-agent` | claude-opus-4-6 | Проектирование | read + bash |
| `alignment-agent` | claude-sonnet-4-6 | Согласование | read-only (gate) |
| `development-agent` | claude-sonnet-4-6 | Реализация + QA + Публикация + Post-Production | edit + bash |

**Transitions:** onboarding → planning → design → alignment → development → alignment → QA → release

**Gate rules:** Every transition requires the upstream gate (Code Reviewer / QA) to pass before proceeding.

### Skills (`.opencode/skills/<role>/SKILL.md`)

| Skill | Role | Tier |
|---|---|---|
| `domain-analyst` | Core | High-Capability |
| `system-architect` | Core | High-Capability |
| `code-reviewer` | Core | Standard |
| `core-domain-developer` | Implementation | High-Capability |
| `integration-developer` | Implementation | Standard |
| `solution-assembler` | Implementation | Efficiency |
| `qa-engineer` | Verification | Standard |
| `devops-engineer` | Delivery | Efficiency |
| `project-manager` | Planning | Efficiency |
| `system-designer` | Design | Standard |
| `ai-ops-engineer` | AI Operations | Standard |

### Templates (`.opencode/templates/`)
`onboarding-report.md`, `sign-off-package.md`, `design-spec.md`, `review-report.md`, `adr.md`, `ubiquitous-language-glossary.md`

## Existing instruction sources

The repo previously had a `CLAUDE.md` with generic behavioral guidelines (Think Before Coding, Simplicity First, Surgical Changes, Goal-Driven Execution). Those principles are reasonable defaults but are not repo-specific — apply them where they help, override where the spec prescribes something different.
