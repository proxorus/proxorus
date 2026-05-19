# Proxorus — AI Agent Role Matrix for DDD-Based Development

A methodology playbook that defines a **hybrid role-based architecture** for AI-driven software development, guided by Domain-Driven Design (DDD) and the Theory of Constraints (ToC).

## Contents

- `docs/superpowers/specs/` — authoritative specification for the role matrix
- `.opencode/skills/` — 11 skill files (one per role), loaded via the `skill` tool
- `.opencode/agents/` — 5 subagent definitions covering the full development lifecycle
- `.opencode/templates/` — 6 output templates (onboarding report, sign-off package, ADR, etc.)
- `AGENTS.md` — central instructions, linked from `opencode.json`
- `opencode.json` — OpenCode configuration registering all agents

## Roles

| Skill | Role group | Tier |
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

## Lifecycle

```
Onboarding → Planning → Design → Alignment → Development → Alignment → QA → Release
```

Each transition requires the upstream gate (Code Reviewer / QA) to pass before proceeding.

## Usage

Load a skill via the `skill` tool when a task matches its role description. Agents are invoked as subagents from `opencode.json`.

## Quick start

```bash
git clone <repo>
cd proxorus
# (optional) install OpenCode plugin for agent support
cd .opencode && npm install && cd ..
```
