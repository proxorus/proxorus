# agnix for AI-Agent Configuration Validation

> Prepared by: System Designer
> Date: 2026-11-22
> Subdomain: Generic tooling and validation
> Type: Generic
> Status: Design agreed; implementation pending Customer Sign-Off
> Issue: [#1 — Подключить agnix для проверки конфигурации AI-агентов](https://git.evapps.ru/mprohorov/proxoroc/-/work_items/1)

## 1. Purpose

Add a repeatable validation gate for AI-agent instructions and configuration in
this repository. The same local command must run in CI, report actionable
diagnostics, and return a non-zero exit code for an invalid configuration.

This document specifies the design only. It does not authorize implementation;
implementation requires the project's Customer Sign-Off Gate.

## 2. Current State and Scope

The repository currently has no root test scripts, lint configuration, or CI
workflow. It has a root `package.json` and `package-lock.json`, separate
OpenCode dependencies under `.opencode/`, and these agent configuration inputs:

- `AGENTS.md`
- `opencode.json`
- `.opencode/agents/`
- `.opencode/skills/**/SKILL.md`

Validate all repository files and formats recognized by agnix, including
supported formats added in the future. Do not lint unrelated prose merely
because it is Markdown. Confirm during implementation that hidden `.opencode/`
paths are included in the scan.

The solution is limited to agnix validation, its test and documentation, and a
GitHub Actions workflow. It does not introduce another linter or test
framework, a multi-OS CI matrix, or GitLab CI.

## 3. Local Command and Dependency

- Add agnix as an exact-version root `devDependency`, recorded in the root
  `package-lock.json`. Keep existing `.opencode/` dependencies separate.
- Add `npm test` at the repository root as the single entry point for all
  repository checks.
- Initially, `npm test` runs the agnix repository scan and the permanent
  negative smoke test described below. Future checks must be added to this
  entry point rather than requiring another top-level command.
- A clean local setup uses `npm ci` at the repository root, followed by
  `npm test`. Existing OpenCode setup instructions remain applicable.
- Keep the exact agnix package version subject to the Developer Technology
  Gate when implementation begins; the committed lockfile must make the
  selected version reproducible.

## 4. Validation and Exception Policy

- Run agnix against the repository root so every recognized agent
  instruction/configuration file in scope is discovered.
- Use agnix's normal severity behavior: errors fail the check; warnings are
  reported but do not fail it. Do not enable strict mode.
- Fix genuine findings in the source configuration where appropriate.
- Add only necessary exceptions. Prefer a path-scoped exception for one rule
  and one file, with a rationale beside the exception. Do not add blanket
  directory exclusions or globally disable rules to make the initial scan
  pass.
- Add `.agnix.toml` only when configuration or exceptions are actually needed.
  Any excluded path or disabled rule must have a documented reason. If no
  exception is needed, do not add an empty configuration file.
- Generated files and dependency directories should rely on agnix defaults
  where possible. Any explicit exclusion must be narrow and justified.

## 5. Negative Smoke Test

Use Node's built-in `node:test`; do not add a test-framework dependency.

The test must create an isolated temporary, agnix-supported configuration
that deterministically produces an error, invoke the installed agnix CLI
against it, and assert a non-zero exit code. The fixture must live outside the
repository scan so it cannot make the normal repository validation fail. Clean
it up even when the assertion fails. The test must distinguish an agnix
diagnostic from an invocation/setup failure where practical.

This test runs as part of `npm test`, preserving the issue's controlled-error
acceptance criterion after the initial implementation check.

## 6. CI and Merge Gate

Add a GitHub Actions workflow with the following behavior:

- Run on pull requests targeting `master` and pushes to `master`.
- Use `ubuntu-latest` and Node.js 24.
- Install from the root lockfile with `npm ci`, then run `npm test`.
- Pin `actions/checkout` and `actions/setup-node` to full commit SHAs. Select
  and verify the exact SHAs during implementation.
- The successful `npm test` status check is required for merging into `master`.

Making the status check required is a repository-host setting, not a workflow
file change. An operator with GitHub repository administration access must
enable the corresponding branch-protection/ruleset requirement. If that access
is unavailable, record this as a blocking operational dependency; a workflow
that only reports a result does not enforce the merge gate.

## 7. Documentation

- Document root setup (`npm ci`), the local command (`npm test`), what it
  validates, severity behavior, and how justified exceptions are recorded in
  `USAGE.md`.
- Update the `README.md` Quick Start to point to the validation command while
  preserving the existing `.opencode/` dependency setup.
- Document the GitHub Actions check and the external branch-protection
  requirement.

## 8. Acceptance Criteria

The implementation is complete when:

1. The current repository passes the agnix scan.
2. A controlled invalid configuration makes the negative smoke test observe a
   non-zero agnix exit code.
3. `npm test` runs all configured checks locally and in GitHub Actions.
4. CI runs for pull requests to `master` and pushes to `master` on Ubuntu with
   Node.js 24.
5. Exceptions are minimal and their rationale is recorded next to the
   configuration.
6. The validation command, configuration, and merge-gate behavior are
   documented.
7. The `npm test` status check is configured as required for merges to
   `master`, subject to the operational dependency in §6.

## 9. Verification and Handoff

QA verifies the acceptance criteria, including both the passing repository
scan and the controlled failing fixture. Code Reviewer reviews the dependency,
agnix configuration, workflow, documentation, and exception scope before
merge. The normal project QA and Code Reviewer gates remain mandatory.

### Related Work Items

- Parent: [#1 — Подключить agnix для проверки конфигурации AI-агентов](https://git.evapps.ru/mprohorov/proxoroc/-/work_items/1)
- [#16 — Проверка конфигурации AI-агентов локально](https://git.evapps.ru/mprohorov/proxoroc/-/work_items/16) — no blockers.
- [#17 — Запуск проверки agnix в GitHub Actions](https://git.evapps.ru/mprohorov/proxoroc/-/work_items/17) — blocked by #16.
- [#18 — Сделать проверку agnix обязательной перед merge](https://git.evapps.ru/mprohorov/proxoroc/-/work_items/18) — blocked by #17.

### Open Questions and Dependencies

- **Open operational question:** who has GitHub administration access to make
  the `npm test` status check required for `master`?
- **Open Technology Gate item:** the exact agnix package release and exact
  action commit SHAs must be selected and recorded during implementation.
- Implementation remains blocked until the Customer Sign-Off Gate is
  completed. No estimates are included here; they belong after final design
  and task decomposition.
