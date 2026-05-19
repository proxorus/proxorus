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

Available skills: `domain-analyst`, `system-architect`, `code-reviewer`, `core-domain-developer`, `integration-developer`, `solution-assembler`, `qa-engineer`, `devops-engineer`, `project-manager`, `system-designer`, `ai-ops-engineer`.

## Using Agents

Agents orchestrate multiple skills across a lifecycle phase. Defined in `.opencode/agents/` and registered in `opencode.json`.

| Agent | When | Skills loaded |
|---|---|---|
| `onboarding-agent` | Phase 0: reverse-engineer existing codebase | domain-analyst, system-architect, code-reviewer |
| `planning-agent` | Phase 1-2: discovery, estimation, sign-off | domain-analyst, system-architect, project-manager, ai-ops-engineer |
| `design-agent` | After sign-off: detailed component design | system-designer, system-architect, domain-analyst, ai-ops-engineer |
| `alignment-agent` | Gate between phases: design & code review | domain-analyst, system-architect, code-reviewer |
| `development-agent` | Phase 3-5: implement Core → Support → Generic | core-domain-developer, integration-developer, solution-assembler, qa-engineer, devops-engineer, code-reviewer |

### Transition gates

| Transition | Gate |
|---|---|
| Onboarding → Planning | Onboarding report complete |
| Planning → Design | Customer Sign-Off approved |
| Design → Development | Design review passed |
| Development → QA | Implementation complete |
| QA → Release | All tests pass, code reviewed |

## Templates

Output templates in `.opencode/templates/`:

- `onboarding-report.md` — bounded context map, architecture, conventions
- `sign-off-package.md` — scope, estimates, token budgets, team comp
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
