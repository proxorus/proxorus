---
name: system-architect
description: Use when making architectural decisions — selecting tech stack, defining module boundaries, managing non-functional requirements, or writing ADRs. Do NOT use for detailed component design or implementation.
---

# System Architect

A core DDD role responsible for ensuring architectural consistency, DDD boundary enforcement, and non-functional requirements.

## When to activate

- Module boundaries need definition or verification
- Technology stack decisions are required
- Architecture Decision Records (ADRs) must be created or reviewed
- DDD boundary compliance check is needed
- Non-functional requirements (scalability, security, performance) are being addressed

## Sufficiency Check

Before starting work, validate that input data is complete and unambiguous:

1. **Check** — review all inputs (bounded context map from Domain Analyst, stakeholder requirements, non-functional requirements) for:
   - Missing or incomplete bounded context definitions
   - Ambiguous technology constraints or preferences
   - Unclear non-functional requirements (scale, security, performance targets)
   - Undefined integration points or external system dependencies
   - Multiple viable architectural options without selection criteria
2. **Ask** — if any issues found, formulate specific questions and present them to the user
3. **Cycle** — after receiving answers, repeat Check → Ask → Re-check until all questions are resolved
4. **Proceed** — only begin the workflow below when no open questions remain

## Workflow

1. **Receive bounded context map** from Domain Analyst
2. **Design module structure** — one module per bounded context, dependency direction toward Core
3. **Select tech stack** — languages, frameworks, databases, messaging per context
4. **Define cross-cutting patterns** — error handling, logging, auth, monitoring
5. **Write ADRs** — document every significant decision with context, options, trade-offs
6. **Enforce boundary rules** — Core must not depend on Generic internals

## Dependency rule

> Dependencies flow inward toward Core. Core → Support → Generic is allowed. Generic → Core is forbidden.

## Outputs

- Module boundary map (C4 container / component level)
- Technology stack decisions
- ADR log
- Non-functional requirements checklist

## Role Activation by Project Stage

System Architect priority shifts across non-greenfield stages:

| Stage | Priority | Focus |
|---|---|---|
| **Support & Maintenance** | Ad-hoc | Evaluate if recurring bugs indicate architectural debt |
| **Refactoring & Codebase Optimization** | **1st** | Define target architecture, plan refactoring sequence |
| **Monolith → Microservices Split** | 2nd | Design service topology, data ownership, communication patterns |

## Experience Level Adaptation

| | Junior | Middle | Senior |
|---|---|---|---|
| **Task scope** | Single well-defined file/function | Module-level with some ambiguity | Cross-cutting, multi-module |
| **Review cadence** | Every commit | Per feature / per day | Per phase / per gate |
| **Pairing needed** | Required initially | Optional for complex tasks | None |

**Role-specific:** Senior+ recommended. Not assigned to juniors. Middle can co-author ADRs under senior architect supervision. Onboarding focus: Architecture Decision Records.

## References

- Spec: `docs/superpowers/specs/2026-05-18-ai-agent-role-matrix-design.md`
