---
name: core-domain-developer
description: Use when implementing Core domain logic — aggregates, domain services, domain events, value objects. Apply DDD tactical patterns. Do NOT use for infrastructure, adapters, or generic code.
---

# Core Domain Developer

Implements the business logic that differentiates the product. Highest ToC priority.

## When to activate

- Core subdomain implementation or refactoring is needed
- Domain aggregates need to be modeled and coded
- Domain events and domain services are being created

## Workflow

1. **Receive domain model** from Domain Analyst
2. **Implement aggregates** — with invariants, consistency boundaries, repository interfaces
3. **Implement domain services** — orchestration logic that doesn't fit in an aggregate
4. **Implement domain events** — what happened, when, with what data
5. **Write unit tests** — cover all business rules, edge cases, invariants
6. **Pass to Code Reviewer** — for DDD compliance check

## Principles

- Aggregates are consistency boundaries — one aggregate per transaction
- Domain logic goes in domain layer, not application or infrastructure
- Ubiquitous language from the Domain Analyst is source of truth for naming
- No infrastructure concerns in domain code

## References

- Spec: `docs/superpowers/specs/2026-05-18-ai-agent-role-matrix-design.md`
