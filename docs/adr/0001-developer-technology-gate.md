# ADR-0001: Developer Technology Gate

The agent must not autonomously select any technology, framework, library, or infrastructure component. Before every technology choice, the responsible role must present a Technology Proposal (2-3 options with analysis and a recommendation) to the Developer (session operator), who makes the final call. If the Developer does not respond or delegates back, the role decides but records the question as unresolved.

**Status**: accepted

**Considered Options**:
- *Autonomous selection (spec as-is)* — System Architect selects tech stack independently in Phase 2, and implementation roles choose libraries ad-hoc. Rejected because the operator wants full control over technology choices; autonomous decisions may conflict with unstated constraints, preferences, or existing stack agreements.
- *One-time blanket approval* — Developer approves a full stack once in Phase 2. Rejected because library-level choices arise ad-hoc during implementation and cannot be predicted up front.
- *Developer Technology Gate (chosen)* — Every technology choice is proposed, not decided. Keeps Developer in control without blocking progress (fallback: role decides, flags as open).

**Consequences**:
- System Architect role changes from "selects technology stack" to "proposes technology stack options"
- All implementation roles (Core Domain Developer, Integration Developer, Solution Assembler) must apply DTG before adding any dependency
- A lightweight tracking mechanism for Open Technology Questions is needed
- Session latency increases slightly (Developer must respond to technology proposals)
