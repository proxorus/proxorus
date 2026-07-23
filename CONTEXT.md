# AI Agent Role Matrix

A methodology playbook for DDD-based software development driven by a single AI agent that switches between roles based on development phase, domain layer, and verification gates.

## Language

**Developer Technology Gate (DTG)**:
The mandatory step any role must take before committing to a technology choice. The role presents 2-3 options with analysis and a recommendation to the Developer (session operator), who makes the final decision.
_Avoid_: Autonomous technology selection, silent tech choice

**Technology Proposal**:
A structured output produced by any role when a technology choice is needed. Contains the context, 2-3 candidate options with pros/cons, and a recommendation.
_Avoid_: Tech decision, stack choice

**Open Technology Question**:
A technology decision recorded as unresolved. Used when the Developer did not respond or delegated the decision back to the role. The role proceeds with its best judgment but flags the question for later review.
_Avoid_: Skipped decision, pending tech choice

**Sufficiency Check**:
A mandatory block inside each skill file. The role must (1) review inputs for ambiguities, (2) ask the user specific questions about any found, (3) cycle until resolved, (4) proceed only when no open questions remain. Execution must not bypass step 2.
_Avoid_: Silent assumption, skipped clarification

**Agent Transition Guard**:
A precondition on every agent-to-agent transition: all Open Questions (from Sufficiency Check or other sources) must be closed before the transition is allowed. Defined in AGENTS.md as the mechanism that enforces the Ask-before-Proceed discipline.
_Avoid_: Unchecked handoff, silent transition

**Closed Question**:
An Open Question that has received an explicit answer from the user (or the Developer), recorded in a persistent artifact (decision log, ADR, or issue tracker). Until an answer is recorded, the question remains open and blocks all downstream transitions.
_Avoid_: Assumed answer, implied resolution

**Guard-Agent**:
A dedicated read-only agent type that gates every agent-to-agent transition. On each transition, the Guard-Agent reads the upstream agent's handoff artifact, checks the `## Open Questions` section, and blocks the transition if any unresolved questions remain. It reports which questions are still open. It does not produce design or implementation artifacts.
_Avoid_: Silent handoff, unchecked transition

**Handoff Report**:
A universal single-template artifact that every upstream agent produces before transitioning. Contains the agent's output summary and, critically, an `## Open Questions` section listing unresolved ambiguities from its Sufficiency Check phase. An empty `## Open Questions` section signals "safe to transition". Guard-Agent reads this file to decide whether to allow the transition.
_Avoid_: Ad-hoc handoff, no handoff

**Clarification-Agent**:
An agent-type activated when Guard-Agent blocks a transition due to Open Questions. Its sole job is to present the open questions to the human operator, collect answers, and write them to the decision log. After answers are recorded, the upstream agent re-enters its Sufficiency Check phase (not the full task) to verify questions are now resolved before producing a new Handoff Report.
_Avoid_: Re-doing all work, skipping clarification

**Гейтирование (Gating)**:
A lifecycle group that gates every role-to-role transition across all lifecycle groups. Contains Guard-Agent (primary) and Clarification-Agent (recovery path on block). Enforces the precondition that all Open Questions are closed before any role's Sufficiency Check proceeds to artifact generation.
