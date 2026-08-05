# AGENTS.md

This repo defines an **AI agent role matrix** for DDD-based software development. It is a methodology playbook, not a code project.

## Core content

- `docs/superpowers/specs/2026-05-18-ai-agent-role-matrix-design.md` — the single authoritative spec. Read it first.
- `package.json` contains `@opencode-ai/plugin` as the only dependency; `.opencode/package.json` adds `markdown-it` (dev) for the artifact HTML renderer (`.opencode/scripts/md2html.js`). No build, test, lint, or CI infrastructure exists.

## Key concepts from the spec

- **DDD subdomain classification** — every feature is Core, Support, or Generic.
- **Theory of Constraints (ToC)** — always implement Core first (it is the bottleneck).
- **Role matrix** — Core roles (Domain Analyst, System Architect, Code Reviewer) are always active; implementation and delivery roles activate contextually. **Project Manager** is a planning role active in Phases 1-2, the Early Scope & Architecture Approval, and again after System Design for Task Decomposition & Estimation and the Sign-Off Gate. **System Designer** produces detailed designs before sign-off. **AI Ops Engineer** manages model recommendations across all phases and token budgets after task decomposition.
- **Dependency direction** — dependencies flow inward toward Core; Core must not depend on Generic internals.
- **Time estimation** — estimates are produced for two scenarios (human-only team and agent-assisted team) in parallel, and only after System Design and task decomposition. No time estimates are produced in Phase 1 or Phase 2. Token budgets per role accompany agent-assisted estimates and are also produced only after task decomposition.
- **Customer Sign-Off Gate** — mandatory approval of scope, architecture, design, task decomposition, estimates, and token budgets before any implementation begins. It is preceded by an Early Scope & Architecture Approval (no estimates) and sits between System Design/Task Decomposition and Phase 3.

## Workflow

1. Read the spec above before any implementation.
2. Identify the project stage — greenfield, support, refactoring, or microservices split — and use the role activation table in "Role Activation by Project Stage" to determine role focus and priority.
3. For existing projects, start with Phase 0 (Onboarding & Context Acquisition) — reverse-engineer bounded contexts, architecture, ADRs, and conventions from the codebase before Phase 1.
4. Follow the phase-to-role mapping in the spec.
5. No verification gate should be skipped: Customer Sign-Off → QA → Code Reviewer are all mandatory.
6. Estimation is produced for both human-only and agent-assisted scenarios in parallel, and only after final design documents and task decomposition exist. Team composition and headcount proposals accompany estimates. AI Ops Engineer computes token budgets per role for the agent-assisted scenario after task decomposition. Present all of these (design, decomposition, estimates, staffing, token budgets) to the customer at the Sign-Off Gate.

## Conventions

- No testing framework, linter, or formatter is configured. If one is added, update this file.
- Commits should reference the spec's role matrix (e.g., "Implements [role] responsibilities for [subdomain]").
- After writing or updating any project artifact (CONTEXT.md, ADRs, or any template output), run `node .opencode/scripts/md2html.js` to regenerate the HTML view in `html/`. `html/` is gitignored and derived from markdown — markdown is the source of truth.

## OpenCode agents & skills

Seven subagents implement the lifecycle groups; twelve skills encode individual role procedures plus one orchestration skill.

### Agents (`.opencode/agents/`)
| Agent | Model | Lifecycle group | Permission |
|---|---|---|---|
| `onboarding-agent` | big-pickle | Ввод в проект | read + bash |
| `planning-agent` | big-pickle | Планирование + Утверждение | read + bash |
| `design-agent` | big-pickle | Проектирование | read + bash |
| `alignment-agent` | big-pickle | Согласование | read-only (gate) |
| `development-agent` | big-pickle | Реализация + QA + Публикация + Post-Production | edit + bash |
| `guard-agent` | big-pickle | Гейтирование | read-only (transition gate) |
| `clarification-agent` | big-pickle | Гейтирование (recovery) | read + bash |

**Transitions:** onboarding → guard → planning → guard → design → guard → alignment → guard → development → guard → alignment → guard → QA → guard → release

**Gate rules:** A Guard-Agent transition gate runs between every role-to-role handoff. It reads the upstream role's Handoff Report and blocks the transition if **Open Questions** or **Unconfirmed Decisions** sections are non-empty. If blocked, a Clarification-Agent recovers by asking the human operator for answers. The upstream role then re-enters only its Sufficiency Check phase before retrying.

**Unconfirmed Decisions rule (in every role SKILL.md):** No technological decision (stack, framework, library, architectural pattern, protocol, infrastructure service) that is not explicitly specified in project docs may be made unilaterally. The role must stop, formulate 2+ alternatives, present them to the user, record in the Handoff Report, and not proceed until the user confirms.

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
| `project-starter` | Orchestration | High-Capability |

### Templates (`.opencode/templates/`)
`onboarding-report.md`, `scope-approval.md`, `sign-off-package.md`, `task-decomposition.md`, `design-spec.md`, `review-report.md`, `adr.md`, `ubiquitous-language-glossary.md`, `handoff-report.md`

## Skill usage requirement

All agents must load the appropriate skill from `.opencode/skills/` before performing work in any role. Skills are the single source of truth for role procedures — do not infer workflows, checklists, or quality criteria from general knowledge.


