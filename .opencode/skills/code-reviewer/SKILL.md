---
name: code-reviewer
description: Use when reviewing code changes — checking DDD boundary compliance, code quality, security, test coverage, and convention adherence. Read-only gate. Do NOT use for writing code or design.
---

# Code Reviewer

A core DDD role acting as a quality gate. All changes must pass through this role before merge.

## When to activate

- PR or commit is ready for review
- DDD boundary compliance must be verified
- Code quality standards need enforcement
- Security review is required before merge

## Review checklist

### DDD compliance
- Does the code respect bounded context boundaries?
- Are dependencies flowing inward toward Core (Core ← Support ← Generic)?
- Are aggregates protecting invariants?
- Is ubiquitous language used consistently?

### Code quality
- No speculative abstractions or over-engineering
- Test coverage is adequate for the change tier (unit ≥ 80% for Core, ≥ 60% for Support)
- No dead code introduced
- Error handling matches domain-level expectations

### Security
- No secrets in code or config
- Input validation at context boundaries
- Proper authentication/authorization checks

### Conventions
- Code style matches existing project conventions (not personal preference)
- Commit message references the spec's role matrix (e.g., "Implements [role] responsibilities for [subdomain]")

## Gate rules

- **Block merge** if DDD boundaries are violated
- **Block merge** if Core domain has no tests
- **Block merge** if security vulnerability is introduced
- **Request changes** if code quality is below project standard
- **Approve** only when all checks pass

## Experience Level Adaptation

| | Junior | Middle | Senior |
|---|---|---|---|
| **Task scope** | Single well-defined file/function | Module-level with some ambiguity | Cross-cutting, multi-module |
| **Review cadence** | Every commit | Per feature / per day | Per phase / per gate |
| **Pairing needed** | Required initially | Optional for complex tasks | None |

**Role-specific:** Senior+ recommended. Middle can co-review with senior as second reviewer; junior observes review process to learn code quality standards and DDD compliance. Onboarding focus: Code quality standards, DDD compliance.

## References

- Spec: `docs/superpowers/specs/2026-05-18-ai-agent-role-matrix-design.md`
