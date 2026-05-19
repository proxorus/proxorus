# Plan: Complete Skills & Agents for OpenCode (v2)

Based on the authoritative spec: `docs/superpowers/specs/2026-05-18-ai-agent-role-matrix-design.md`

## Status

v1 (committed): 10 skill files + 5 agent files created from the initial plan.
Gaps vs spec identified below.

---

## Gap Analysis

| # | Gap | Location | Severity |
|---|-----|----------|----------|
| G1 | **AI Ops Engineer skill missing** — referenced by planning-agent and design-agent but no skill file exists | `.opencode/skills/ai-ops-engineer/` | **blocking** |
| G2 | **Agent files lack `model:` field** — spec recommends model tiers per agent, plan specified models but frontmatter is incomplete | `.opencode/agents/*.md` | high |
| G3 | **No Experience Level Adaptation** in skills — spec has seniority mapping that should inform task assignment | All skills | medium |
| G4 | **No Role Activation by Project Stage** — spec defines support/refactoring/microservices mappings, skills don't reference them | domain-analyst, system-architect | medium |
| G5 | **No output templates** — spec defines concrete outputs per phase (ADRs, sign-off packages, onboarding reports, etc.) | `.opencode/templates/` | medium |
| G6 | **No validation/testing** — no way to verify agents load skills correctly and produce expected outputs | — | low (v2) |
| G7 | **Agent transitions informal** — the flow diagram (Phase 0→1→2→Sign-Off→Design→3→4→5→6→7) isn't encoded in agent files | `.opencode/agents/*.md` | low |

---

## Implementation Plan

### Phase 1: Fix Blocking Gaps

#### 1.1 Create AI Ops Engineer skill

File: `.opencode/skills/ai-ops-engineer/SKILL.md`

Content checklist:
- Description: model recommendations, token budgets, cost monitoring
- When to activate: all phases (continuous)
- Token estimation methodology from spec:
  - Context base: 50–200K tokens per active role
  - Task volume per role (files, API calls, review iterations)
  - Phase duration × task density
  - Produce parallel scenarios (human-only = zero, agent-assisted = computed)
- Model tier recommendations table from spec:
  - High-Capability → Domain Analyst, System Architect, Core Domain Developer
  - Standard → Code Reviewer, Integration Developer, QA, System Designer, AI Ops Engineer
  - Efficiency → Solution Assembler, DevOps, Project Manager
- Prompt strategy optimization guidelines
- Cost reporting format

#### 1.2 Add `model` field to all agent files

| File | Model |
|------|-------|
| `onboarding-agent.md` | `anthropic/claude-opus-4-6` |
| `planning-agent.md` | `anthropic/claude-sonnet-4-6` |
| `design-agent.md` | `anthropic/claude-opus-4-6` |
| `alignment-agent.md` | `anthropic/claude-sonnet-4-6` |
| `development-agent.md` | `anthropic/claude-sonnet-4-6` |

---

### Phase 2: Enhance Skills with Spec Details

#### 2.1 Add Experience Level Adaptation to all skills

Each SKILL.md should include a section like:

```markdown
## Experience Level Adaptation

| Level | Task scope | Review cadence | Pairing |
|-------|-----------|----------------|---------|
| Junior | Single well-defined file/function | Every commit | Required initially |
| Middle | Module-level with some ambiguity | Per feature / per day | Optional |
| Senior | Cross-cutting, multi-module | Per phase / per gate | None |
```

Plus role-specific detail from the spec's "Role-to-Level Mapping" table.

Files to update: all 10 skills + new ai-ops-engineer.

#### 2.2 Add Role Activation by Project Stage to domain-analyst and system-architect

Reference the three alternative stages from spec:
- **Support & Maintenance** — Integration Developer 1st
- **Refactoring & Codebase Optimization** — System Architect 1st
- **Monolith → Microservices Split** — Domain Analyst 1st

Files: `domain-analyst/SKILL.md`, `system-architect/SKILL.md`

---

### Phase 3: Create Templates

#### 3.1 Create `.opencode/templates/` directory

| Template | Purpose | Used by |
|----------|---------|---------|
| `onboarding-report.md` | Bounded context map, architecture summary, conventions | onboarding-agent |
| `sign-off-package.md` | Scope, architecture, estimates, token budgets, team comp | planning-agent |
| `design-spec.md` | API contracts, data models, sequence diagrams | design-agent |
| `review-report.md` | Approve / request changes / block | alignment-agent |
| `adr.md` | Architecture Decision Record | system-architect skill |
| `ubiquitous-language-glossary.md` | Terms per bounded context | domain-analyst skill |

Each template is a Markdown file with placeholder sections.

---

### Phase 4: Strengthen Agent Transitions

#### 4.1 Encode phase flow in agent files

Add to each agent's Process:
- Explicit "Transition to X when complete" with gate criteria
- Reference the phase flow diagram from spec

#### 4.2 Update `opencode.json` if needed

Verify agent model fields match actual available models.

---

### Phase 5: Validation

#### 5.1 Manual smoke test

For each agent, verify:
- `skill <name>` loads the corresponding SKILL.md
- Agent file parses correctly (YAML frontmatter)
- Referenced skills exist

#### 5.2 Update `AGENTS.md`

Ensure the "Agents & Skills" section in AGENTS.md is consistent with actual files.

---

## File Manifest

### New files to create (3)
```
.opencode/skills/ai-ops-engineer/SKILL.md
.opencode/templates/onboarding-report.md
.opencode/templates/sign-off-package.md
.opencode/templates/design-spec.md
.opencode/templates/review-report.md
.opencode/templates/adr.md
.opencode/templates/ubiquitous-language-glossary.md
```

### Existing files to modify (15)
```
.opencode/agents/onboarding-agent.md       +model field, +transitions
.opencode/agents/planning-agent.md         +model field, +transitions
.opencode/agents/design-agent.md           +model field, +transitions
.opencode/agents/alignment-agent.md        +model field, +transitions
.opencode/agents/development-agent.md      +model field, +transitions
.opencode/skills/domain-analyst/SKILL.md   +experience levels, +project stages
.opencode/skills/system-architect/SKILL.md +experience levels, +project stages
.opencode/skills/code-reviewer/SKILL.md    +experience levels
.opencode/skills/core-domain-developer/SKILL.md +experience levels
.opencode/skills/integration-developer/SKILL.md +experience levels
.opencode/skills/solution-assembler/SKILL.md +experience levels
.opencode/skills/qa-engineer/SKILL.md      +experience levels
.opencode/skills/devops-engineer/SKILL.md  +experience levels
.opencode/skills/project-manager/SKILL.md  +experience levels
.opencode/skills/system-designer/SKILL.md  +experience levels
AGENTS.md                                  +verify consistency
```

## Execution Order

1. Create AI Ops Engineer skill (G1)
2. Add model fields to agents (G2)
3. Add Experience Level Adaptation to all skills (G3)
4. Add project stage mappings (G4)
5. Create template files (G5)
6. Strengthen agent transitions (G7)
7. Smoke test + update AGENTS.md
8. Commit

---

## References

- Spec: `docs/superpowers/specs/2026-05-18-ai-agent-role-matrix-design.md`
- v1 plan: `.opencode/plans/agents-and-skills-setup.md`
