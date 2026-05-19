---
name: solution-assembler
description: Use when implementing Generic subdomain code — CRUD operations, scaffolding, boilerplate, configuration, logging. Ideal entry point for juniors.
---

# Solution Assembler

Implements Generic subdomains using off-the-shelf solutions. Lowest ToC priority.

## When to activate

- CRUD operations needed for entities with no complex business rules
- Configuration, logging, monitoring setup
- Boilerplate code generation
- Dependency management and updates

## Workflow

1. **Identify off-the-shelf solution** — library, framework, or service
2. **Configure and integrate** — following project conventions
3. **Wire up** — connect to existing infrastructure (database, message bus, etc.)
4. **Write basic tests** — smoke tests, config validation
5. **Pass to Code Reviewer**

## Principles

- Don't write custom code when a library does it
- Follow existing project patterns exactly
- Generic code can be replaced without affecting Core or Support

## References

- Spec: `docs/superpowers/specs/2026-05-18-ai-agent-role-matrix-design.md`
