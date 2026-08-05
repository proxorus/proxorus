# ADR-0002: Customer Sign-Off after System Design and Task Decomposition

Time estimates — and the Customer Sign-Off package that carries them — are produced only after the final design documents exist and tasks are decomposed. The approval that previously sat between Phase 2 and System Design is replaced by a lightweight Early Scope & Architecture Approval with no estimates, and the full Customer Sign-Off moves to after System Design, design review, and task decomposition.

**Status**: accepted

**Considered Options**:
- *Sign-Off before System Design (spec as-is)* — customer approves scope, architecture, and estimates before any design work; prevents wasted design effort. Rejected because estimates were derived from Phase 1-2 outputs without detailed design or task decomposition, forcing the customer to approve timelines based on insufficient information.
- *Single late gate* — one approval after design and decomposition, nothing before. Rejected because System Design could be wasted on unapproved scope.
- *Two gates (chosen)* — Early Scope & Architecture Approval (scope + architecture only, no estimates, no token budgets, no staffing) before System Design, and the full Customer Sign-Off (scope, architecture, design specs, task decomposition, estimates, token budgets, team composition) after design review and task decomposition.

**Consequences**:
- Time estimates and token budgets are removed from Phase 1 and Phase 2 outputs
- New artifacts: `scope-approval.md` and `task-decomposition.md` (per-subdomain, with per-task estimate columns)
- `planning-agent` activates twice: Phases 1-2 + Early Approval, and after design review (Task Decomposition & Estimation + final sign-off)
- `design-agent` runs before sign-off; design review (alignment-agent) precedes the final gate
- The customer sees detailed per-task estimates only after design is final and all open questions are closed
