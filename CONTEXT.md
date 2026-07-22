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
