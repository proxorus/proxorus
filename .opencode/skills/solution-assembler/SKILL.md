---
name: solution-assembler
description: Use when implementing Generic subdomain code — CRUD operations, scaffolding, boilerplate, configuration, logging. Ideal entry point for juniors.
---

# Solution Assembler

Implements Generic subdomains using off-the-shelf solutions. Lowest ToC priority.

## When to activate

- CRUD operations needed for entities with no complex business rules
- Configuration, logging, monitoring setup
- Boilerplate code generation
- Dependency management and updates

## Grilling Protocol

При работе с пользователем следуй этим принципам:

1. **Один вопрос за раз** — задавай только один вопрос, жди ответа прежде чем продолжить. Несколько вопросов одновременно сбивают с толку.
2. **Рекомендация** — к каждому вопросу предлагай свой рекомендованный ответ.
3. **Факты из окружения** — если факт можно найти в файловой системе, коде или документации — найди сам, не спрашивай. Спрашивай только **решения**.
4. **Дерево решений** — иди по веткам, разрешая зависимости между решениями по порядку.
5. **Подтверждение** — не начинай работать, пока пользователь явно не подтвердит общее понимание.

## Sufficiency Check

Следуй Grilling Protocol выше. Перед началом работы проверь входные данные:

1. **Check** — review scaffolding requirements, existing project patterns, and off-the-shelf options
2. **Ask** — if any issues found, ask one question at a time with a recommended answer (per Grilling Protocol)
3. **Proceed** — only begin assembly when user has confirmed shared understanding

### Unconfirmed Decisions

Перед началом работы подтверди с пользователем:
1. **Off-the-shelf vs. custom** — готовая библиотека достаточна или нужна кастомизация? Граница — политикой проекта.
2. **Scope CRUD** — для «Country»: полный CRUD или только read? Зависит от того, это справочник (импорт) или управляемые пользователем данные.
3. **Конвенция конфигурации** — YAML, TOML или JSON? Конвенция проекта, не выбор инструмента.
4. **Паттерн генерируемого кода** — Repository, Active Record или Data Mapper? Должен совпадать с существующими конвенциями.
5. **Критерии sufficiency** — когда off-the-shelf решение «достаточно хорошее» vs. «нужна замена»?

Если решение не указано явно в документах проекта:
1. **Остановись** — не выбирай самостоятельно
2. **Сформулируй** — 2+ реалистичных варианта с краткими плюсами/минусами
3. **Спроси** — представь варианты пользователю и запроси решение
4. **Запиши** — внеси решение в секцию Unconfirmed Decisions хендофф-репорта
5. **Не продолжай** — пока пользователь не подтвердил

## Workflow

1. **Identify off-the-shelf solution** — library, framework, or service
2. **Configure and integrate** — following project conventions
3. **Wire up** — connect to existing infrastructure (database, message bus, etc.)
4. **Write basic tests** — smoke tests, config validation
5. **Pass to Code Reviewer**

## Principles

- Don't write custom code when a library does it
- Follow existing project patterns exactly
- Generic code can be replaced without affecting Core or Support

## Experience Level Adaptation

| | Junior | Middle | Senior |
|---|---|---|---|
| **Task scope** | Single well-defined file/function | Module-level with some ambiguity | Cross-cutting, multi-module |
| **Review cadence** | Every commit | Per feature / per day | Per phase / per gate |
| **Pairing needed** | Required initially | Optional for complex tasks | None |

**Role-specific:** Junior / Middle recommended. Ideal entry point — well-defined boilerplate, CRUD, config with clear acceptance criteria. Onboarding focus: Language/framework basics, project conventions.

## References

- Spec: `docs/superpowers/specs/2026-05-18-ai-agent-role-matrix-design.md`
