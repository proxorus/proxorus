# Customer Sign-Off Package

> Prepared by: planning-agent
> Date: {{date}}
> Project: {{project_name}}

## 1. Scope Summary

### Bounded Context Map
| Context | Type | MVP Feature List |
|---------|------|-----------------|
| {{context}} | {{type}} | {{features}} |

### MVP Goal
{{mvp_goal}}

## 2. Architecture

### C4 Level 1 (System Context)
{{system_context_diagram}}

### C4 Level 2 (Container)
{{container_diagram}}

### Key Decisions
{{architecture_decisions}}

## 3. Design & Task Decomposition

### Design Specs
{{design_spec_references}}

### Task Decomposition (appendix)
Detailed per-task estimates (human-only / agent-assisted time, token budget) live in the `task-decomposition.md` appendix attached to this package.

## 4. Time Estimates (aggregated by phase)

| Phase | Human-only | Agent-assisted |
|-------|-----------|---------------|
| Phase 3 — Core Implementation | {{estimate_human}} | {{estimate_agent}} |
| Phase 4 — Support | {{estimate_human}} | {{estimate_agent}} |
| Phase 5 — Generic | {{estimate_human}} | {{estimate_agent}} |
| Phase 6 — MVP Release | {{estimate_human}} | {{estimate_agent}} |
| **Total** | **{{total_human}}** | **{{total_agent}}** |

## 5. Token Budgets (Agent-Assisted Scenario)

| Role | Phase 3 | Phase 4 | Phase 5 | Phase 6 | Total |
|------|---------|---------|---------|---------|-------|
| {{role}} | {{tokens}} | {{tokens}} | {{tokens}} | {{tokens}} | {{total}} |
| **Total** | **{{phase_total}}** | **{{phase_total}}** | **{{phase_total}}** | **{{phase_total}}** | **{{grand_total}}** |

## 6. Team Composition

### Human-Only Scenario
| Role | Phase 3 | Phase 4 | Phase 5 | Phase 6 |
|------|---------|---------|---------|---------|
| {{role}} | {{headcount}} | {{headcount}} | {{headcount}} | {{headcount}} |

### Agent-Assisted Scenario
| Role | Phase 3 | Phase 4 | Phase 5 | Phase 6 |
|------|---------|---------|---------|---------|
| {{role}} | {{headcount}} | {{headcount}} | {{headcount}} | {{headcount}} |

---

**Customer Sign-Off**

- [ ] Scope approved
- [ ] Architecture approved
- [ ] Design specs approved
- [ ] Task decomposition approved
- [ ] Estimates approved
- [ ] Token budgets approved
- [ ] Team composition approved

*Signature: ___________________  Date: _____________*

*After sign-off, transition to development-agent for Phase 3 implementation.*
