# ADR-0003: Task ordering driven by dependency graph and critical path

Task decomposition is ordered by the task dependency graph (topological), not by a fixed Core → Support → Generic phase sequence. Implementation phases become reporting groupings, and the critical path (CPM) is computed per scenario and presented at the Customer Sign-Off Gate.

**Status**: accepted

**Considered Options**:
- *Fixed phase sequence (spec as-is)* — Phase 3 Core → Phase 4 Support → Phase 5 Generic governs execution order; the critical path stays implicit. Rejected because the order ignored real task dependencies: a non-Core dependency of a Core task would be delayed by its phase, and the schedule's longest chain was never identified or reviewed.
- *Critical-path-first scheduling* — tasks on the critical path run first regardless of subdomain, breaking DDD implementation phases for calendar gains. Rejected because the gain belongs in release planning, not in decomposition.
- *Dependency-graph ordering with phases as groupings (chosen)* — System Designer emits a component dependency graph; the Project Manager projects the edges onto tasks and orders them topologically; any non-Core dependency of a Core task is pulled forward into the Core window (Dependency Pull-Forward). The critical path is computed per scenario (human-only, agent-assisted) from edges and estimates, and both chains are shown at sign-off. Core is built through ports/interfaces, so adapters are not required to start it.

**Consequences**:
- `design-spec.md` gains a component dependency graph section (typed edges: port/event/data)
- `task-decomposition.md` gains "Depends on" and "Critical path" columns plus a per-scenario critical path section; rows are topologically ordered
- Phase 3-6 in the spec are reworded as reporting groupings, not execution gates
- Decision Rule #1 and Guiding Principle #2 reworded: schedule Core first, pull forward non-Core dependencies
- Project Manager skill gains dependency projection, topological ordering, and CPM computation steps
- System Designer skill gains the dependency-graph output
- TOC-constraint and Critical Path are distinct glossary terms
