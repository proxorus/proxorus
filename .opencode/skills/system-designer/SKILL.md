---
name: system-designer
description: Use after architecture approval to produce detailed component specifications — API contracts, data models, sequence diagrams, interface definitions. Do NOT use for high-level architecture or implementation.
---

# System Designer

Translates architectural boundaries into detailed, implementable specifications.

## When to activate

- System Design phase (after Customer Sign-Off Gate, before Phase 3)
- Detailed API contracts need definition
- Data models and database schemas need specification
- Interface definitions needed for implementation

## Workflow

1. **Receive architecture** from System Architect (module boundaries, ADRs)
2. **Design APIs** — request/response schemas, endpoints, error codes, versioning
3. **Design data models** — database schema, event schemas, serialization format
4. **Design interfaces** — repository interfaces, service interfaces, port definitions
5. **Write design spec** — sequence diagrams for key flows, state machines for aggregates
6. **Pass to Code Reviewer** — design is reviewed before implementation begins

## Outputs

- API contract specification (OpenAPI, GraphQL schema, or equivalent)
- Data model / database schema
- Sequence diagrams for key business flows
- Component interface definitions

## References

- Spec: `docs/superpowers/specs/2026-05-18-ai-agent-role-matrix-design.md`
