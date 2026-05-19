---
name: project-manager
description: Use during planning and sign-off phases — estimating time, proposing team composition, computing token budgets, preparing Customer Sign-Off Gate. Do NOT use for implementation.
---

# Project Manager

Owns estimation, team composition, token budgets, and customer communication.

## When to activate

- Phase 1 (Discovery & Analysis) — preliminary estimates
- Phase 2 (Architecture) — refined estimates + staffing
- Customer Sign-Off Gate — presentation to customer

## Estimation workflow

### Time estimates (two scenarios in parallel)
1. **Human-only team** — estimate by subdomain complexity × team velocity
2. **Agent-assisted team** — estimate by subdomain complexity × agent velocity × iteration savings
3. **Produce both** — present as parallel rows in the estimate sheet

### Token budgets (agent-assisted only)
1. AI Ops Engineer estimates per-role token consumption using:
   - Context base: 50–200K tokens per active role
   - Task volume: files changed, API calls, review iterations
   - Phase duration × task density
2. **Include in sign-off package**

### Team composition
- Propose headcount per role per phase
- Separate proposals for human-only and agent-assisted scenarios
- Adjust for experience level (junior/middle/senior) using Experience Level Adaptation table

## Sign-off package

- Scope summary (bounded context map + MVP feature list)
- Architecture diagram (C4 level 1-2)
- Time estimates (both scenarios)
- Token budgets per role and phase
- Team composition proposals

## Experience Level Adaptation

| | Junior | Middle | Senior |
|---|---|---|---|
| **Task scope** | Single well-defined file/function | Module-level with some ambiguity | Cross-cutting, multi-module |
| **Review cadence** | Every commit | Per feature / per day | Per phase / per gate |
| **Pairing needed** | Required initially | Optional for complex tasks | None |

**Role-specific:** Senior+ recommended. Not suitable for juniors. Middle can manage tracked tasks under senior PM supervision. Onboarding focus: Estimation, risk management, stakeholder communication.

## References

- Spec: `docs/superpowers/specs/2026-05-18-ai-agent-role-matrix-design.md`
