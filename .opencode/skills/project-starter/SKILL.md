---
name: project-starter
description: Use to launch the full AI Agent Role Matrix lifecycle — guides through all phases from Onboarding to Release, activating role skills sequentially with Guard-Agent gates. Entry point for any new or existing project.
---

# Project Starter

Orchestrates the full AI Agent Role Matrix lifecycle. Activates role skills sequentially, ensures Guard-Agent gates are respected, and guides the project from initial state to release.

## When to activate

- Starting work on a new or existing project
- User wants to run the complete development process
- Resuming work and need to determine current phase
- Explicit request to "start the process" or "run the pipeline"

## Grilling Protocol

При работе с пользователем следуй этим принципам:

1. **Один вопрос за раз** — задавай только один вопрос, жди ответа прежде чем продолжить.
2. **Рекомендация** — к каждому вопросу предлагай свой рекомендованный ответ.
3. **Факты из окружения** — если факт можно найти в файловой системе, коде или документации — найди сам, не спрашивай. Спрашивай только **решения**.
4. **Дерево решений** — иди по веткам, разрешая зависимости между решениями по порядку.
5. **Подтверждение** — не начинай работать, пока пользователь явно не подтвердит общее понимание.

## Phase Assessment

Before launching any phase, determine project state:

1. **Scan** the project for existing artifacts:
   - Bounded context maps, ADRs, ubiquitous language glossary
   - Architecture diagrams, sign-off packages
   - Implementation code, test coverage, CI/CD configs
2. **Identify** the highest completed phase based on artifacts present
3. **Propose** the next phase to execute
4. **Confirm** with user before proceeding

### Artifact-to-Phase mapping

| Artifacts present | Completed phase | Next phase |
|---|---|---|
| None or incomplete onboarding | — | Phase 0: Onboarding |
| Onboarding report complete | Phase 0 | Phase 1: Discovery |
| DDD classification, preliminary estimates | Phase 1 | Phase 2: Architecture |
| Architecture, refined estimates | Phase 2 | Customer Sign-Off |
| Sign-off approved | Sign-Off | System Design |
| Design specs, API contracts | System Design | Phase 3: Core Implementation |
| Core domain code + tests | Phase 3 | Phase 4: Support Implementation |
| Adapters, integrations | Phase 4 | Phase 5: Generic Assembly |
| CRUD, config, scaffolding | Phase 5 | Phase 6: MVP Release |
| Deployed MVP, monitoring | Phase 6 | Phase 7: Enhancement |

## Full Pipeline Workflow

Execute phases sequentially. Each phase activates specific role skills. Guard-Agent gates run between phases.

### Phase 0: Onboarding & Context Acquisition

**Activate:** `domain-analyst`, `system-architect`, `code-reviewer`

**Workflow:**
1. Load `domain-analyst` skill — reverse-engineer bounded contexts from codebase
2. Load `system-architect` skill — document existing architecture, ADRs
3. Load `code-reviewer` skill — establish quality baseline
4. Produce onboarding report (template: `onboarding-report.md`)

**Gate:** [Guard-Agent] — verify onboarding report has no Open Questions

### Phase 1: Discovery & Analysis

**Activate:** `domain-analyst`, `system-architect`, `project-manager`, `ai-ops-engineer`

**Workflow:**
1. Load `domain-analyst` skill — DDD classification, bounded context map, ubiquitous language
2. Load `project-manager` skill — preliminary estimates (human-only + agent-assisted)
3. Load `ai-ops-engineer` skill — preliminary token budgets
4. Produce discovery outputs: Event Storming diagram, classification table, glossary, preliminary estimates

**Gate:** [Guard-Agent] — verify classification confirmed, estimates produced

### Phase 2: Architecture

**Activate:** `system-architect`, `domain-analyst`, `project-manager`, `ai-ops-engineer`

**Workflow:**
1. Load `system-architect` skill — module boundaries, tech stack, ADRs
2. Load `project-manager` skill — refined estimates, team composition
3. Load `ai-ops-engineer` skill — refined token budgets per role and phase
4. Produce architecture outputs: architecture diagram, tech stack decisions, refined estimates

**Gate:** [Guard-Agent] — verify architecture decisions documented, estimates refined

### Customer Sign-Off Gate

**Activate:** `domain-analyst`, `system-architect`, `project-manager`, `ai-ops-engineer`

**Workflow:**
1. Assemble sign-off package (template: `sign-off-package.md`):
   - Scope summary (bounded context map + MVP feature list)
   - Architecture diagram
   - Time estimates (both scenarios)
   - Token budgets per role and phase
   - Team composition proposals
2. Present to customer
3. **Block implementation until written approval received**

**Gate:** [Guard-Agent] — block if sign-off not approved. [Clarification-Agent] recovers if blocked.

### System Design

**Activate:** `system-designer`, `system-architect`, `domain-analyst`

**Workflow:**
1. Load `system-designer` skill — API contracts, data models, sequence diagrams
2. Load `code-reviewer` skill — review designs before implementation
3. Produce design specs (template: `design-spec.md`)

**Gate:** [Guard-Agent] — verify design specs reviewed and approved

### Phase 3: Core Implementation (ToC Constraint)

**Activate:** `core-domain-developer`, `code-reviewer`, `qa-engineer`

**Workflow:**
1. Load `core-domain-developer` skill — implement aggregates, domain services, domain events
2. Load `qa-engineer` skill — write and execute tests
3. Load `code-reviewer` skill — review before merge
4. Produce working Core Domain with tests

**Gate:** [Guard-Agent] — verify tests pass, review approved

### Phase 4: Support Implementation

**Activate:** `integration-developer`, `code-reviewer`, `qa-engineer`

**Workflow:**
1. Load `integration-developer` skill — adapters, external APIs, integrations
2. Load `qa-engineer` skill — integration tests
3. Load `code-reviewer` skill — review before merge
4. Produce working integrations with tests

**Gate:** [Guard-Agent] — verify tests pass, review approved

### Phase 5: Generic Assembly

**Activate:** `solution-assembler`, `code-reviewer`, `qa-engineer`

**Workflow:**
1. Load `solution-assembler` skill — CRUD, config, logging, scaffolding
2. Load `qa-engineer` skill — unit tests for generic code
3. Load `code-reviewer` skill — review before merge
4. Produce working Generic subdomain code

**Gate:** [Guard-Agent] — verify tests pass, review approved

### Phase 6: MVP Release

**Activate:** `devops-engineer`, `qa-engineer`, `code-reviewer`

**Workflow:**
1. Load `devops-engineer` skill — CI/CD, infrastructure, deployment
2. Load `qa-engineer` skill — E2E tests, acceptance criteria verification
3. Load `code-reviewer` skill — final pre-release review
4. Deploy MVP, configure monitoring

**Gate:** [Guard-Agent] — verify all acceptance criteria met, deploy successful

### Phase 7: Iterative Enhancement

**Cycle:** Domain Analyst → implementation roles → QA → Code Reviewer → DevOps

**Workflow:**
1. Collect feedback, identify next features
2. Return to Phase 1 (Discovery) for new features
3. Cycle through phases 1-6 per feature increment

## Sufficiency Check

Before launching any phase:

1. **Check** — verify prerequisites for the target phase:
   - Previous phase artifacts exist and are complete
   - No unresolved Open Questions from prior phase
   - Guard-Agent gate passed for prior transition
2. **Ask** — if prerequisites missing, ask user how to proceed:
   - Skip to requested phase without prerequisites?
   - Complete missing prerequisites first?
3. **Proceed** — only when prerequisites met or user explicitly overrides

## Unconfirmed Decisions

At pipeline level, confirm with user:

1. **Project stage** — greenfield, support, refactoring, or microservices split? Determines role priority.
2. **Starting phase** — begin from Phase 0 or jump to a later phase?
3. **Scenario priority** — human-only or agent-assisted as primary scenario?
4. **Phase skipping** — any phases to skip or fast-track?
5. **Risk tolerance** — conservative (more gates, slower) vs. aggressive (faster iteration)?

Если решение не указано явно в документах проекта:
1. **Остановись** — не выбирай самостоятельно
2. **Сформулируй** — 2+ реалистичных варианта с краткими плюсами/минусами
3. **Спроси** — представь варианты пользователю и запроси решение
4. **Запиши** — внеси решение в секцию Unconfirmed Decisions хендофф-репорта
5. **Не продолжай** — пока пользователь не подтвердил

## Handoff Between Phases

Each phase transition follows this pattern:

1. **Upstream role** produces Handoff Report with:
   - Completed artifacts
   - Open Questions (if any)
   - Unconfirmed Decisions (if any)
2. **Guard-Agent** reads Handoff Report:
   - If Open Questions or Unconfirmed Decisions → **block transition**
   - If Clarification-Agent recovery needed → present questions to user
   - If clean → **allow transition**
3. **Downstream role** receives approved artifacts and begins work

## Outputs

- Phase-appropriate artifacts per phase (see Artifact-to-Phase mapping)
- Handoff Reports at each phase boundary
- Decision log (architectural decisions, trade-offs made)
- Final: shipped product with monitoring

## Role Activation Reference

| Phase | Primary Roles | Gate Roles |
|---|---|---|
| Phase 0: Onboarding | Domain Analyst, System Architect, Code Reviewer | Guard-Agent |
| Phase 1: Discovery | Domain Analyst, System Architect, Project Manager, AI Ops Engineer | Guard-Agent |
| Phase 2: Architecture | System Architect, Domain Analyst, Project Manager, AI Ops Engineer | Guard-Agent |
| Sign-Off | Domain Analyst, System Architect, Project Manager, AI Ops Engineer | Guard-Agent, Clarification-Agent |
| System Design | System Designer, System Architect, Domain Analyst | Guard-Agent, Code Reviewer |
| Phase 3: Core Impl | Core Domain Developer | Guard-Agent, QA Engineer, Code Reviewer |
| Phase 4: Support Impl | Integration Developer | Guard-Agent, QA Engineer, Code Reviewer |
| Phase 5: Generic Impl | Solution Assembler | Guard-Agent, QA Engineer, Code Reviewer |
| Phase 6: MVP Release | DevOps Engineer | Guard-Agent, QA Engineer, Code Reviewer |
| Phase 7: Enhancement | All (cycling) | Guard-Agent, QA Engineer, Code Reviewer |

## References

- Spec: `docs/superpowers/specs/2026-05-18-ai-agent-role-matrix-design.md`
- All role skills: `.opencode/skills/*/SKILL.md`
- Templates: `.opencode/templates/`
