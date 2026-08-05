# AI Agent Role Matrix for DDD-Based Software Development

## Overview

Defines a hybrid role-based architecture for a single AI agent that drives software development from MVP to release. The agent switches between roles based on development phase, domain layer, and verification gates. Development is guided by Domain-Driven Design (DDD) classification and the Theory of Constraints (ToC).

## Guiding Principles

1. **Domain-first**: All work begins with DDD analysis to classify features into Core, Support, and Generic subdomains.
2. **ToC-driven**: The Core Domain is the constraint that differentiates the product and is scheduled first. Execution order inside the task decomposition is topological — derived from task dependencies, not from fixed phases. Any non-Core task that a Core task depends on is pulled forward into the Core window (Dependency Pull-Forward).
3. **Cross-cutting quality**: Code Reviewer and QA roles act as gates; nothing ships without passing through them.
4. **Context preservation**: Core roles remain active throughout; implementation and delivery roles activate contextually.
5. **Customer validated**: implementation begins only after customer sign-off on scope, architecture, design, task decomposition, and time. Time estimates are produced only after the final design documents exist and tasks are decomposed — never from Phase 1-2 outputs alone. Estimates are produced for two team compositions — human-only and agent-assisted — in parallel.

## Role Matrix

### Core Roles — Always Active

These roles maintain continuity of context and architectural integrity throughout the entire development lifecycle.

| Role | Responsibilities | DDD Mapping |
|---|---|---|
| **Domain Analyst** | Translates stakeholder requirements into a DDD model: identifies bounded contexts, aggregates, entities, value objects; classifies each subdomain as Core / Support / Generic; maintains the ubiquitous language | All subdomains |
| **System Architect** | Defines module boundaries, proposes technology stack options via Developer Technology Gate (DTG), ensures architectural consistency, manages non-functional requirements (scalability, security, performance), enforces DDD boundaries at the implementation level | Bounded context boundaries |
| **Code Reviewer** | Reviews all changes before merge: checks DDD boundary compliance, code quality, security, test coverage, adherence to conventions; acts as a quality gate | Cross-cutting concern |

### Implementation Roles — Contextually Activated

These roles activate when working on a specific subdomain or implementation task.

| Role | Responsibilities | ToC Priority |
|---|---|---|
| **Core Domain Developer** | Implements the business logic that differentiates the product — aggregates, domain services, domain events for the Core subdomain | **1st** — this is the constraint |
| **Integration Developer** | Implements Support subdomains: authentication, payments, notifications, external API adapters, third-party integrations | 2nd |
| **Solution Assembler** | Implements Generic subdomains using off-the-shelf solutions: logging, configuration, CRUD, scaffolding, boilerplate | 3rd |

### Verification & Delivery Roles — Gate-Activated

These roles activate at defined checkpoints in the development pipeline.

| Role | Responsibilities | Activation Point |
|---|---|---|
| **QA Engineer** | Writes and executes tests (unit, integration, E2E); defines test strategy per domain layer; blocks release on test failure | After each implementation unit |
| **DevOps Engineer** | Sets up CI/CD, manages infrastructure, handles deployment pipelines, configures monitoring and alerting, manages releases | MVP setup + every Release |

### Planning & Management Roles — Phase-Activated

These roles activate during the planning, estimation, and customer approval phases.

| Role | Responsibilities | Activation Point |
|---|---|---|
| **Project Manager** | Produces time estimates for both human-only and agent-assisted scenarios, only after System Design and task decomposition; produces the task decomposition from final design documents; proposes team composition and headcount per scenario and phase; coordinates with AI Ops Engineer on token budgets; facilitates the Early Scope & Architecture Approval and the Customer Sign-Off Gate; manages scope, timeline, and stakeholder communication | Phase 1, Phase 2, Early Scope & Architecture Approval, after System Design (Task Decomposition & Estimation), Customer Sign-Off Gate |

### Design Roles — Phase-Activated

These roles activate after architecture approval to produce detailed specifications before implementation begins.

| Role | Responsibilities | Activation Point |
|---|---|---|
| **System Designer** | Translates architectural boundaries into detailed component designs: API contracts, data models, sequence diagrams, interface definitions, component dependency graph (the source of task dependency edges during decomposition); ensures DDD aggregate and service boundaries are preserved; passes designs to Code Reviewer before implementation | System Design phase |

### AI Operations Role — Continuous

This role is active throughout the project lifecycle, handling LLM-specific operational decisions.

| Role | Responsibilities | Activation Point |
|---|---|---|
| **AI Ops Engineer** | Recommends model assignments per role and phase based on task complexity; estimates token consumption budgets per phase and scenario, only after task decomposition; monitors and optimizes prompt strategies for cost efficiency; reports projected LLM costs to Project Manager | Phases 1-2 (model recommendations), after System Design (token budgets), continuous monitoring |

### Gating Roles — Transition-Activated

These roles activate on every role-to-role handoff, enforcing the Sufficiency Check precondition.

| Role | Responsibilities | Activation Point |
|---|---|---|
| **Guard-Agent** | Reads the upstream role's Handoff Report; checks `## Open Questions` section; blocks transition if any questions remain unresolved; reports which questions are open. Read-only — never produces design or implementation artifacts. | Every transition between any two roles in any phase |
| **Clarification-Agent** | Activated when Guard-Agent blocks a transition. Presents the open questions to the human operator, collects answers, and writes them to the decision log. After answers are recorded, the upstream role re-enters only its Sufficiency Check phase before producing a new Handoff Report. | Recovery path — only when Guard-Agent blocks |

## Role Activation by Project Stage

The same role matrix applies across project stages, but role focus and priority shift. The table below maps each non-greenfield stage to its primary and supporting roles.

### Support & Maintenance
| Priority | Role | Focus |
|---|---|---|
| **1st** | **Integration Developer** | Fix adapter bugs, patch external integrations, restore broken flows |
| **2nd** | **Solution Assembler** | Dependency updates, config fixes, minor UI patches |
| **3rd** | **Domain Analyst** | Triage domain-level bugs, verify fix preserves ubiquitous language |
| **Ongoing** | **Code Reviewer** | Rapid review of hotfixes, enforce quality under time pressure |
| **Ongoing** | **QA Engineer** | Regression test suite, smoke tests per hotfix |
| **Ongoing** | **DevOps Engineer** | Incident response, monitoring alert tuning, hotfix deployment |
| **Ad-hoc** | **System Architect** | Evaluate if recurring bugs indicate architectural debt |
| **Ad-hoc** | **Core Domain Developer** | Fix domain logic bugs in core subdomain |

### Refactoring & Codebase Optimization
| Priority | Role | Focus |
|---|---|---|
| **1st** | **System Architect** | Define target architecture (patterns, module structure, tech upgrades); plan refactoring sequence |
| **2nd** | **Code Reviewer** | Gate each refactoring step; ensure no DDD boundary violations |
| **3rd** | **Core Domain Developer** | Refactor core aggregates, apply DDD tactical patterns, eliminate anemic models |
| **4th** | **Integration Developer** | Clean up adapter layer, standardize API patterns |
| **5th** | **Solution Assembler** | Remove dead code, upgrade dependencies, apply linter/formatter rules |
| **Ongoing** | **QA Engineer** | Extensive regression testing — refactoring must not change behavior |
| **Ongoing** | **Domain Analyst** | Verify refactored code still reflects the domain model |
| **Supporting** | **System Designer** | Redesign interfaces where contracts change |
| **Supporting** | **Project Manager** | Phase the refactoring into safe increments; track technical debt |

### Monolith → Microservices Split
| Priority | Role | Focus |
|---|---|---|
| **1st** | **Domain Analyst** | Identify true bounded contexts — this is the critical step; wrong boundaries mean wrong services |
| **2nd** | **System Architect** | Design service topology, data ownership per service, communication patterns (async/event-driven) |
| **3rd** | **System Designer** | Detailed API contracts per service, data migration plan, event schemas |
| **4th** | **Core Domain Developer** | Extract core bounded context into its own service |
| **5th** | **Integration Developer** | Build inter-service communication (message brokers, API gateways, event bus) |
| **6th** | **Solution Assembler** | Extract shared generic services (auth, config, logging, monitoring) |
| **Ongoing** | **QA Engineer** | Contract tests, integration tests across service boundaries, end-to-end smoke tests |
| **Ongoing** | **Code Reviewer** | Review split strategy and execution; enforce that extracted services have no cyclic dependencies |
| **Ongoing** | **DevOps Engineer** | Containerisation (Docker), orchestration (Kubernetes), per-service CI/CD, service mesh |
| **Supporting** | **Project Manager** | Coordinate phased migration, rollback plan, cut-over scheduling |
| **Supporting** | **AI Ops Engineer** | Token budget for analysis of existing codebase, test generation, migration scripts |

## Lifecycle Group Mapping

Roles распределены по десяти группам, покрывающим полный lifecycle продукта:

| Группа | Роли | Описание |
|---|---|---|
| **Ввод в проект** | Domain Analyst, System Architect, Code Reviewer | Onboarding в существующий проект: reverse-engineering bounded contexts, архитектуры, ADR, code conventions, ubiquitous language из кода |
| **Планирование** | Domain Analyst, System Architect, Project Manager, AI Ops Engineer | Выявление требований, DDD-анализ, классификация поддоменов, определение архитектуры, MVP scope. Оценки времени и токен-бюджеты здесь не производятся — только после проектирования и декомпозиции |
| **Утверждение** | Domain Analyst, System Architect, Project Manager, AI Ops Engineer | Два гейта: раннее согласование scope и архитектуры (без оценок) после Фазы 2; финальный Customer Sign-Off (scope, архитектура, дизайн, декомпозиция, оценки, token-бюджеты, состав команд — оба сценария) после проектирования; получение утверждения перед реализацией |
| **Проектирование** | System Designer, System Architect, Domain Analyst | Детальное проектирование компонентов: API-контракты, модели данных, диаграммы последовательностей, интерфейсы; проверка дизайна Code Reviewer перед декомпозицией и оценкой |
| **Согласование** | Domain Analyst, System Architect, Code Reviewer | Верификация архитектурных решений, соответствие DDD-модели, ubiquitous language, compliance с границами |
| **Реализация** | Core Domain Developer, Integration Developer, Solution Assembler | Имплементация core/support/generic поддоменов с приоритетом по ToC |
| **Контроль качества** | QA Engineer, Code Reviewer | Тестирование (unit/integration/E2E), code review, quality gate, security check |
| **Приёмка** | QA Engineer, Domain Analyst, Code Reviewer | Проверка acceptance criteria, domain acceptance, quality gate пройден |
| **Публикация** | DevOps Engineer, System Architect | CI/CD, деплой, настройка окружений, проверка нефункциональных требований |
| **Post-Production** | DevOps Engineer, Domain Analyst | Мониторинг, логи, алерты, инциденты; сбор feedback, итерация DDD-модели |
| **AI Operations** | AI Ops Engineer | Оценка token-бюджетов, рекомендации моделей для каждой роли, мониторинг затрат, оптимизация prompt-стратегий |
| **Гейтирование** | Guard-Agent, Clarification-Agent | Проверка precondition (Sufficiency Check) на каждом ролевом переходе. Guard-Agent читает Handoff Report, блокирует при открытых вопросах. Clarification-Agent восстанавливает — собирает ответы от человека и пишет в decision log |

## Development Flow with To

A Guard-Agent transition gate runs between every role-to-role handoff. The diagram below shows the major blocks; the Guard symbols (⟷) appear between each phase or role transition.

```
Existing Codebase (onboarding) ──→ Stakeholder Requirements (new)
          ↓
    ┌───────────────────────────────────────┐
    │ Phase 0: Onboarding & Context Acquisition │
    │ [Domain Analyst, System Architect,     │
    │  Code Reviewer]                         │
    │ Reverse-engineer: bounded contexts,    │
    │  architecture, ADRs, conventions       │
    └──────────────────┬────────────────────┘
                       ↓
              [Guard-Agent] ← blocks if Open Questions remain
                       ↓
              [Domain Analyst]
              DDD Classification + MVP Scope
                       ↓
              [Guard-Agent]
                       ↓
    [System Architect, Project Manager, AI Ops Engineer]
    Architecture + ADRs (no time estimates)
                       ↓
              [Guard-Agent]
                       ↓
    ┌────────────────────────────────────────┐
    │   Early Scope & Architecture Approval  │  ← scope, architecture approved (no estimates)
    └───────────────┬────────────────────────┘
                  ↓
              [Guard-Agent]
                  ↓
    ┌──────────────────────────────────┐
    │ [System Designer, System Architect] │
    │   System Design (Core → Support → Generic)
    │   API contracts, data models, interfaces
    └───────────────┬──────────────────┘
                    ↓
              [Guard-Agent]
                    ↓
          [alignment-agent] Design Review
          (design final, no open questions)
                    ↓
              [Guard-Agent]
                    ↓
    [Project Manager, AI Ops Engineer]
    Task Decomposition + Time Estimates + Token budgets
    (human-only + agent-assisted)
                    ↓
              [Guard-Agent]
                    ↓
    ┌────────────────────────────────────────┐
    │        Customer Sign-Off Gate          │  ← design, decomposition, estimates, tokens approved
    └───────────────┬────────────────────────┘
                  ↓
              [Guard-Agent]
                  ↓
    ┌────────┬──────────┬──────────┐
    │  Core  │ Support  │ Generic  │
    └───┬────┴────┬─────┴────┬─────┘
        ↓         ↓          ↓
   [Core Dev] [Integ Dev] [Assembler]
   ← ToC bottleneck — START HERE
        ↓         ↓          ↓
   [Guard-Agent] [Guard-Agent] [Guard-Agent]
        ↓         ↓          ↓
   ┌────────────────────────────┐
   │     [QA Engineer]          │  ← Verification gate
   └────────────┬───────────────┘
                ↓
          [Guard-Agent]
                ↓
   ┌────────────────────────────┐
   │    [Code Reviewer]         │  ← Quality gate
   └────────────┬───────────────┘
                ↓
          [Guard-Agent]
                ↓
   ┌────────────────────────────┐
   │   [DevOps Engineer]        │  ← Release gate
   └────────────┬───────────────┘
                ↓
          [Guard-Agent]
                ↓
          Product Release
```

## Phase-to-Role Mapping

### Phase 0: Onboarding & Context Acquisition (existing projects)
- Active: Domain Analyst, System Architect, Code Reviewer
- Output: Reverse-engineered bounded context map, documented ubiquitous language, architecture decision records (ADRs), code quality baseline, team conventions glossary. All outputs feed Phase 1.

### Phase 1: Discovery & Analysis
- Active: Domain Analyst, System Architect, Project Manager, AI Ops Engineer
- Output: Event Storming diagram, bounded context map, DDD classification table, ubiquitous language glossary, MVP scope (feature list). No time estimates or token budgets are produced in this phase — they require final design documents and task decomposition.

### Phase 2: Architecture
- Active: System Architect, Domain Analyst, Project Manager, AI Ops Engineer
- Output: System architecture diagram, technology stack proposal (passed through Developer Technology Gate), module boundaries, ADRs. No time estimates or token budgets are produced in this phase — they require final design documents and task decomposition.

### Early Scope & Architecture Approval (before System Design)
- Active: Domain Analyst, System Architect, Project Manager, AI Ops Engineer
- Gate: Present MVP scope (bounded context map + feature list) and architecture (module boundaries, tech stack via DTG, ADRs) to the customer. Explicitly excluded: time estimates, token budgets, and team composition — none exist yet. Approval is recorded in `scope-approval.md` and lets System Design start. This gate prevents wasted design work on unapproved scope and architecture.

### System Design
- Active: System Designer, System Architect, Domain Analyst
- Output: Detailed component designs, API contracts, data models, sequence diagrams, interface definitions per subdomain (Core → Support → Generic), plus a component dependency graph with typed edges (port/event/data). The graph is the source of task dependency edges during decomposition. Designs are reviewed by Code Reviewer (alignment-agent) before estimation begins. The design must be final — no open questions — before task decomposition starts.

### Task Decomposition & Estimation
- Active: Project Manager, AI Ops Engineer, System Architect, Domain Analyst
- Output: `task-decomposition.md` per subdomain — final design specs broken into implementable tasks, each with acceptance criteria and estimate columns (human-only time, agent-assisted time, token budget). The Project Manager projects the component dependency graph onto tasks (a task depends on another if its component does) and orders tasks topologically; any non-Core dependency of a Core task is pulled forward into the Core window (Dependency Pull-Forward). The critical path (CPM) is computed per scenario from dependency edges and estimates; critical-path tasks are marked and both chains (human-only, agent-assisted) are presented at the Customer Sign-Off Gate. Aggregated time estimates for both scenarios per implementation phase; token budgets per role and phase. Time estimates and token budgets are produced here for the first time, only after the final design documents exist and all open questions from System Design are closed.

### Customer Sign-Off Gate (before implementation)
- Active: Domain Analyst, System Architect, Project Manager, AI Ops Engineer
- Gate: Present scope, architecture, design specs, task decomposition, time estimates, team composition proposals, and token budgets (both human-only and agent-assisted) to the customer. Implementation proceeds only after written approval. This gate prevents wasted work on unapproved scope, design, staffing, and timelines.

Phases 3-6 are reporting groupings for aggregation, not a fixed execution sequence. Tasks are executed in topological order derived from their dependency edges (see Task Decomposition & Estimation); a task may run before its nominal phase when an earlier-phase task depends on it (Dependency Pull-Forward).

### Phase 3: Core Implementation (ToC Constraint)
- Active: Core Domain Developer, Code Reviewer (gate), QA Engineer (gate)
- Output: Working Core Domain aggregates, domain services, tests

### Phase 4: Support Implementation
- Active: Integration Developer, Code Reviewer (gate), QA Engineer (gate)
- Output: Adapters, integrations, external service connections

### Phase 5: Generic Assembly
- Active: Solution Assembler, Code Reviewer (gate), QA Engineer (gate)
- Output: Configuration, logging, CRUD, scaffolding

### Phase 6: MVP Release
- Active: DevOps Engineer, QA Engineer, Code Reviewer
- Output: Deployed MVP, CI/CD pipeline, monitoring

### Phase 7: Iterative Enhancement
- Cycle: Domain Analyst → implementation roles → QA → Code Reviewer → DevOps
- Output: Incremental releases

## DDD Subdomain Classification Criteria

| Criterion | Core | Support | Generic |
|---|---|---|---|
| Business differentiation | High — this is why the product exists | Medium — enables the product | Low — commodity functionality |
| Customization need | High — built from scratch | Medium — adapted to context | Low — off-the-shelf is fine |
| Competitive advantage | Direct | Indirect | None |
| Examples | Unique algorithms, domain-specific workflows | Auth, payments, email | Logging, config, CRUD |

## Decision Rules

1. **Schedule the Core Domain first**: The Core is the constraint — without it the product has no differentiation. Core tasks are scheduled first; execution order within the decomposition is topological (task dependencies), and any non-Core dependency of a Core task is pulled forward into the Core window (Dependency Pull-Forward).
2. **Buy vs Build**: Generic subdomains should use existing solutions whenever possible. Support subdomains evaluate buy vs build case-by-case. Core is always built.
3. **Verification is mandatory**: No implementation bypasses QA and Code Reviewer gates.
4. **Boundaries are inviolable**: Core Domain code must not depend on Generic subdomain internals. Dependencies flow inward toward Core.
5. **No implementation without sign-off**: Customer must approve scope, architecture, design, task decomposition, and time estimates before any code is written. The Customer Sign-Off Gate is mandatory.
6. **All technology choices pass Developer Technology Gate**: No role may select a technology, framework, library, or infrastructure component autonomously. Before every such choice, the role must present a Technology Proposal (2-3 options with analysis and a recommendation) to the Developer (session operator). If the Developer does not respond or delegates, the role decides but records an Open Technology Question for later resolution.

## Experience Level Adaptation

Roles define functional responsibilities, not seniority. Each role can be performed at different experience levels with appropriate task boundaries and oversight.

### Role-to-Level Mapping

| Role | Recommended Level | Junior/Middle Adaptation | Onboarding Focus |
|---|---|---|---|
| **Domain Analyst** | Senior+ | Junior assists with bounded context documentation under senior guidance; middle handles classification with review | DDD patterns, ubiquitous language |
| **System Architect** | Senior+ | Not assigned to juniors. Middle can co-author ADRs under senior architect supervision | Architectural decision records |
| **Code Reviewer** | Senior+ | Middle can co-review with senior as second reviewer; junior observes review process | Code quality standards, DDD compliance |
| **Core Domain Developer** | Senior / Middle | Junior implements well-defined value objects and unit tests under pair programming; middle owns aggregates with senior review | Domain logic, DDD tactical patterns |
| **Integration Developer** | Middle / Junior | Junior handles one adapter at a time from detailed spec; middle manages full integration flow | API patterns, error handling, testing |
| **Solution Assembler** | Junior / Middle | Ideal entry point — well-defined boilerplate, CRUD, config with clear acceptance criteria | Language/framework basics, project conventions |
| **QA Engineer** | Middle / Junior | Junior writes tests from defined specs; middle designs test strategy per module | Test frameworks, test design, edge cases |
| **DevOps Engineer** | Middle | Junior implements pipeline steps from templates; middle owns full pipeline design | CI/CD tooling, infra-as-code |
| **Project Manager** | Senior+ | Not suitable for juniors. Middle can manage tracked tasks under senior PM supervision | Estimation, risk management, stakeholder comms |
| **System Designer** | Senior / Middle | Junior produces component specs from templates with review; middle designs with senior oversight | API contracts, data modeling, sequence diagrams |
| **AI Ops Engineer** | Senior+ | Not suitable for juniors. Middle handles token monitoring under senior supervision | LLM operations, cost analysis, prompt patterns |

### Onboarding Variation by Level

| | Junior | Middle | Senior |
|---|---|---|---|
| **Task scope** | Single well-defined file/function | Module-level with some ambiguity | Cross-cutting, multi-module |
| **Review cadence** | Every commit | Per feature / per day | Per phase / per gate |
| **Pairing needed** | Required initially | Optional for complex tasks | None |
| **Phase 0 depth** | Project conventions, tooling setup, simple code reading | Bounded context overview, architecture orientation, moderate codebase tour | Full reverse-engineering: ADRs, bounded contexts, quality baseline, conventions |
| **First tasks** | Boilerplate, tests, config | Integration adapters, well-scoped features | Architecture decisions, Core Domain design, review

## AI Operational Model

This section provides role-specific model recommendations and a token estimation framework for the agent-assisted scenario.

### Model Tiers

Tasks vary in complexity; model selection should match the role's cognitive load.

| Tier | Characteristics | Suitable For |
|---|---|---|
| **High-Capability** | Deep reasoning, large context windows, complex multi-step analysis | Architecture, DDD modeling, Core Domain development, System Design |
| **Standard** | General coding, structured analysis, reviews | Code review, integration development, QA, test generation |
| **Efficiency** | High-volume, well-defined, repetitive or boilerplate tasks | Solution assembly, DevOps scripts, project management summaries, routine config |

### Per-Role Model Tier & Token Profile

| Role | Recommended Tier | Token Consumption Drivers |
|---|---|---|
| **Domain Analyst** | High-Capability | Deep DDD analysis with large context (domain model, bounded context maps) |
| **System Architect** | High-Capability | Multi-dimensional trade-off evaluation, architectural decision records |
| **Code Reviewer** | Standard | Diff analysis per merge request; moderate context per review cycle |
| **Core Domain Developer** | High-Capability | Complex business logic requiring full aggregate and domain context |
| **Integration Developer** | Standard | API specs, adapter patterns; repetitive structure across integrations |
| **Solution Assembler** | Efficiency | Boilerplate generation, CRUD scaffolds, config files |
| **QA Engineer** | Standard | Test generation per module; structured but variable scope |
| **DevOps Engineer** | Efficiency | Infrastructure-as-code templates, pipeline scripts, config |
| **Project Manager** | Efficiency | Summarization of phase outputs, estimation sheets, stakeholder updates |
| **System Designer** | Standard | API contracts, data models, sequence diagrams; iterative refinement |
| **AI Ops Engineer** | Standard | Token budget analysis, model performance comparisons, cost reports |

### Token Estimation Methodology

The AI Ops Engineer estimates token consumption per phase using:

1. **Context base** — persistent project context (archived per phase): 50–200K tokens per active role
2. **Task volume per role** — estimated files changed, API calls, review iterations, analysis depth
3. **Phase duration × task density** — number of task cycles per phase multiplied by average tokens per cycle
4. **Scenarios** — human-only (zero token cost) and agent-assisted (computed) in parallel

Token budgets are produced after task decomposition — they require concrete task volume per role — and included in the Customer Sign-Off Gate package alongside time estimates and team composition.

## Agent State Management

The AI agent maintains a single shared context across role switches. The context includes:

- Current project state (file structure, code)
- DDD model (bounded contexts, aggregates, classification)
- Estimation data (human-only and agent-assisted scenarios per phase)
- Token budget and actual consumption per role and phase
- Decision log (architectural decisions, trade-offs made)
- Test status (coverage, passing/failing tests)
- Release status (MVP done, features shipped)

Role switches are triggered by:
- Phase transition (e.g., from Onboarding to Discovery)
- Domain layer switch (e.g., from Core to Support implementation)
- Gate activation (e.g., post-implementation QA check)

## Self-Review Checklist

- [x] No TBDs, TODOs, or incomplete sections
- [x] Architecture matches role descriptions
- [x] Scope is appropriate for a single specification — defines the role framework, not an implementation
- [x] No ambiguous terms — all roles, phases, and criteria are explicitly defined
- [x] Consistent with AGENTS.md principles: minimal, focused, no speculative features
- [x] Estimation, customer sign-off gate, and token budgets are integrated into the phase flow, not bolted on as an afterthought
- [x] Alternative project stages (support, refactoring, microservices split) have explicit role mappings
