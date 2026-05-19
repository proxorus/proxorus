# Proxorus — AI Agent Role Matrix for DDD-Based Development

A methodology playbook that defines a **hybrid role-based architecture** for AI-driven software development, guided by Domain-Driven Design (DDD) and the Theory of Constraints (ToC).

## Contents

| Path | Description |
|------|-------------|
| `docs/superpowers/specs/` | Authoritative specification for the role matrix (read this first) |
| `.opencode/skills/<role>/SKILL.md` | 11 skill files — one per role, loaded via the `skill` tool |
| `.opencode/agents/<agent>.md` | 5 subagent definitions covering the full development lifecycle |
| `.opencode/templates/` | 6 output templates (onboarding report, sign-off package, ADR, etc.) |
| `.opencode/plans/` | Implementation plans for the skills/agents system itself |
| `AGENTS.md` | Central instructions linked from `opencode.json` |
| `opencode.json` | OpenCode configuration registering all agents and skills |
| `package.json` | Empty project placeholder |

## Quick Start

```bash
# 1. Clone
git clone <repo-url>
cd proxorus

# 2. Install OpenCode plugin (for agent subprocess support)
cd .opencode && npm install && cd ..
```

After setup, OpenCode will automatically load `opencode.json` and `AGENTS.md` when you open this directory.

## Roles

11 roles organised by group and capability tier:

| Skill | Role Group | Tier | Responsibility |
|---|---|---|---|
| `domain-analyst` | Core | High-Capability | DDD analysis, bounded contexts, ubiquitous language |
| `system-architect` | Core | High-Capability | Architecture decisions, module boundaries, ADRs |
| `code-reviewer` | Core | Standard | Quality gate: DDD compliance, code review |
| `core-domain-developer` | Implementation | High-Capability | Core domain logic, aggregates, domain services |
| `integration-developer` | Implementation | Standard | Support subdomains, API adapters, auth, payments |
| `solution-assembler` | Implementation | Efficiency | Generic subdomains, CRUD, config, boilerplate |
| `qa-engineer` | Verification | Standard | Test strategy, test execution, acceptance |
| `devops-engineer` | Delivery | Efficiency | CI/CD, infrastructure, monitoring, release |
| `project-manager` | Planning | Efficiency | Estimation, team composition, sign-off |
| `system-designer` | Design | Standard | API contracts, data models, sequence diagrams |
| `ai-ops-engineer` | AI Operations | Standard | Model selection, token budgets, cost monitoring |

## Using Skills

Skills provide role-specific instructions. Load them via the `skill` tool when a task matches the role:

```
User: "Analyse the requirements and classify subdomains"
Assistant: [loads `domain-analyst` skill via the `skill` tool,
            then follows the DDD classification workflow]
```

Each `SKILL.md` contains:
- **When to activate** — triggers for using this role
- **Workflow** — step-by-step process
- **Experience Level Adaptation** — task scope by junior/middle/senior
- **Outputs** — expected deliverables
- **References** — links to the spec

### Loading a skill in conversation

```markdown
<!-- The assistant loads the skill automatically when needed.
     The user can also request: "Load the qa-engineer skill and review tests" -->
```

## Using Agents

Agents are subprocesses that orchestrate multiple skills across a lifecycle phase. They are defined in `.opencode/agents/` and registered in `opencode.json`.

### Agent lifecycle

```
Phase 0: Onboarding ──→ Phase 1-2: Planning ──→ Customer Sign-Off ──→ System Design
     ↑                                                                      │
     │                                                                      ↓
     └─────────────────── Development ←── Alignment ←── Design ←────────────┘
                                │
                                ↓
                          QA → Release
```

### Agent reference

| Agent | When to use | Skills it loads | Entry point |
|---|---|---|---|
| `onboarding-agent` | Phase 0: reverse-engineer existing codebase | domain-analyst, system-architect, code-reviewer | New project / major refactoring |
| `planning-agent` | Phase 1-2: discovery, estimation, sign-off | domain-analyst, system-architect, project-manager, ai-ops-engineer | After onboarding |
| `design-agent` | After sign-off: detailed component design | system-designer, system-architect, domain-analyst, ai-ops-engineer | After customer approval |
| `alignment-agent` | Gate between phases: design & code review | domain-analyst, system-architect, code-reviewer | After design / after implementation |
| `development-agent` | Phase 3-5: implement Core → Support → Generic | core-domain-developer, integration-developer, solution-assembler, qa-engineer, devops-engineer, code-reviewer | After design approval |

### Invoking an agent

Agents are invoked via OpenCode's subagent mechanism. The agent's YAML frontmatter configures:

```yaml
---
description: What this agent does
model: opencode/big-pickle
mode: subagent
permission:
  edit: allow/deny
  bash: ask/deny
  read: allow
---
```

To start an agent, ask OpenCode to run the subagent (e.g., "Run onboarding-agent on this project").

### Transition gates

Each agent transition requires a gate to pass:

| Transition | Gate | Gate keeper |
|---|---|---|
| Onboarding → Planning | Onboarding report complete | Code Reviewer |
| Planning → Design | Customer Sign-Off approved | Project Manager |
| Design → Development | Design review passed | Alignment Agent |
| Development → QA | Implementation complete | QA Engineer |
| QA → Release | All tests pass, code reviewed | Code Reviewer |

## Templates

Output templates are in `.opencode/templates/`:

| Template | Used by | Purpose |
|---|---|---|
| `onboarding-report.md` | onboarding-agent | Bounded context map, architecture, conventions |
| `sign-off-package.md` | planning-agent | Scope, estimates, token budgets, team comp |
| `design-spec.md` | design-agent | API contracts, data models, sequence diagrams |
| `review-report.md` | alignment-agent | Approve / request changes / block |
| `adr.md` | system-architect skill | Architecture Decision Record |
| `ubiquitous-language-glossary.md` | domain-analyst skill | Terms per bounded context |

## Project Stage Modes

The role matrix adapts to different project stages. The spec (Section "Role Activation by Project Stage") defines priority shifts for:

- **Greenfield** — standard Phase 0→7 flow (default)
- **Support & Maintenance** — Integration Developer first, rapid hotfix gates
- **Refactoring & Codebase Optimization** — System Architect first, regression focus
- **Monolith → Microservices Split** — Domain Analyst first (critical boundary identification)

## Customisation

### Changing the default model

Edit `model` in `opencode.json` and all agent `.md` frontmatter files:

```json
"onboarding-agent": {
  "model": "your-provider/your-model",
  ...
}
```

### Adding a new skill

```bash
mkdir -p .opencode/skills/your-role
# Create SKILL.md with frontmatter (name, description) and workflow sections
```

Then reference it from the relevant agent's process section.

### Changing agent permissions

Edit the `permission` block in the agent's `.md` frontmatter:

```yaml
permission:
  edit: deny    # allow / deny
  bash: ask     # ask / deny / allow
  read: allow
```

## References

- Full spec: `docs/superpowers/specs/2026-05-18-ai-agent-role-matrix-design.md`
- Central instructions: `AGENTS.md`
- OpenCode docs: https://opencode.ai
