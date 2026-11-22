# Proxorus — AI Agent Role Matrix for DDD-Based Development

A methodology playbook that defines a **hybrid role-based architecture** for AI-driven software development, guided by Domain-Driven Design (DDD) and the Theory of Constraints (ToC).

## Contents

- `docs/superpowers/specs/` — authoritative specification (read first)
- `.opencode/skills/` — 13 skill files (12 role skills + `project-starter` orchestrator)
- `.opencode/agents/` — 5 subagent definitions
- `.opencode/templates/` — output templates (onboarding report, ADR, etc.)
- `AGENTS.md` — central instructions
- `opencode.json` — OpenCode configuration
- `USAGE.md` — detailed setup and usage instructions

## Quick Start

```bash
git clone <repo-url>
cd proxorus
npm ci
npm test
cd .opencode && npm install && cd ..
```

`npm test` validates repository AI-agent configuration and runs the negative
validation smoke test. See `USAGE.md` for details and the GitHub Actions merge
gate.

### Starting a project

The `project-starter` skill is the entry point. It determines the current project phase and runs the full pipeline from Onboarding to Release:

1. Open the project in OpenCode
2. The agent loads `project-starter` automatically (or invoke via `/project-starter`)
3. The skill scans for existing artifacts, identifies the current phase, and proposes the next step
4. It then activates the appropriate role skills sequentially, respecting Guard-Agent gates

See `USAGE.md` for detailed instructions on using skills, agents, templates, and customisation.
