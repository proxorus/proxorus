# Review Report

> Reviewed by: alignment-agent
> Date: {{date}}
> Source: {{design-agent|development-agent}}
> Artifact: {{artifact_name}}

## DDD Compliance

- [ ] Bounded context boundaries respected
- [ ] Dependencies flow inward toward Core
- [ ] Aggregates protect invariants
- [ ] Ubiquitous language used consistently

**Issues:** {{ddd_issues}}

## Architecture Consistency

- [ ] Module boundaries respected
- [ ] No circular dependencies
- [ ] Tech stack decisions followed
- [ ] Non-functional requirements addressed

**Issues:** {{architecture_issues}}

## Code Quality (if applicable)

- [ ] No speculative abstractions
- [ ] Error handling matches domain expectations
- [ ] No dead code
- [ ] Conventions followed

**Issues:** {{quality_issues}}

## Security

- [ ] No secrets exposed
- [ ] Input validation at boundaries
- [ ] Proper auth/z checks

**Issues:** {{security_issues}}

## Test Coverage

- [ ] Adequate coverage per domain tier
- [ ] Tests pass

**Issues:** {{test_issues}}

## Verdict

| Decision | Criteria |
|----------|----------|
| **{{APPROVE / REQUEST CHANGES / BLOCK}}** | {{rationale}} |

### Blockers (if any)
{{blockers}}

---

*Transition back to originating agent based on verdict.*
