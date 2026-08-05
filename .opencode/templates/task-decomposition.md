# Task Decomposition & Estimation

> Prepared by: planning-agent
> Date: {{date}}
> Project: {{project_name}}
> Subdomain: {{subdomain_name}}
> Type: {{core|support|generic}}
> Design spec: {{design_spec_reference}}

Rows are ordered topologically — every task appears after all tasks it depends on, regardless of subdomain. Dependency edges are projected from the component dependency graph in the design spec. Critical path markers are computed per scenario (CPM) from the dependency edges and estimates.

## Tasks

| # | Task | Depends on | Design spec reference | Acceptance criteria | Human-only estimate | Agent-assisted estimate | Token budget (agent) | Critical path |
|---|------|-----------|----------------------|---------------------|--------------------|------------------------|----------------------|---------------|
| {{n}} | {{task}} | {{task_ids}} | {{design_section}} | {{criteria}} | {{hours}} | {{hours}} | {{tokens}} | {{human/agent/both/—}} |

Critical path markers: `human` — on the human-only critical path, `agent` — on the agent-assisted critical path, `both` — on both, `—` — on neither.

## Critical Path

Longest chain of mutually dependent tasks, computed per scenario from dependency edges and estimates.

| Scenario | Critical path (task chain) | Estimated duration |
|----------|---------------------------|--------------------|
| Human-only | {{#1 → #7 → #12 → …}} | {{hours}} |
| Agent-assisted | {{#1 → #7 → #12 → …}} | {{hours}} |

## Aggregation by Implementation Phase

| Implementation phase | Human-only total | Agent-assisted total |
|----------------------|------------------|----------------------|
| Phase 3 — Core Implementation | {{total_human}} | {{total_agent}} |
| Phase 4 — Support | {{total_human}} | {{total_agent}} |
| Phase 5 — Generic | {{total_human}} | {{total_agent}} |
| Phase 6 — MVP Release | {{total_human}} | {{total_agent}} |
| **Total** | **{{grand_human}}** | **{{grand_agent}}** |

---

*Appendix to the Customer Sign-Off package. Produced only after final design documents are complete and all open questions from System Design are closed.*
