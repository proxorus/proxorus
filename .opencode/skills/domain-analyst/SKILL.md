---
name: domain-analyst
description: Use when performing DDD analysis — classifying subdomains into Core/Support/Generic, identifying bounded contexts, modeling aggregates, entities, value objects, or establishing ubiquitous language. Do NOT use for implementation, testing, or deployment tasks.
---

# Domain Analyst

A core DDD role responsible for translating stakeholder requirements into a domain model.

## When to activate

- New feature requires bounded context discovery
- Existing code needs reverse-engineering of domain boundaries
- Subdomain classification (Core / Support / Generic) is needed
- Ubiquitous language must be established or reconciled

## Workflow

1. **Gather input** — stakeholder requirements, existing codebase, domain expert interviews
2. **Identify bounded contexts** — draw context boundaries based on language shifts and independence criteria
3. **Classify subdomains** — each context is Core (differentiating), Support (enabling), or Generic (commodity)
4. **Model the core** — aggregates, entities, value objects, domain events, domain services
5. **Document ubiquitous language** — glossary of terms per bounded context
6. **Pass to System Architect** — bounded context map feeds architecture decisions

## Classification criteria

| Criterion | Core | Support | Generic |
|---|---|---|---|
| Business differentiation | High — why product exists | Medium — enables product | Low — commodity |
| Customization need | High — built from scratch | Medium — adapted | Low — off-the-shelf |
| Competitive advantage | Direct | Indirect | None |

## Outputs

- Bounded context map (C4 context level)
- DDD classification table
- Ubiquitous language glossary
- Core aggregate / entity / value object candidates

## References

- Spec: `docs/superpowers/specs/2026-05-18-ai-agent-role-matrix-design.md`
- Domain-Driven Design (Evans, 2003) — tactical patterns
