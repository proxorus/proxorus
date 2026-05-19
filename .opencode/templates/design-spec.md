# Design Specification

> Prepared by: design-agent
> Date: {{date}}
> Subdomain: {{subdomain_name}}
> Type: {{core|support|generic}}

## 1. API Contracts

### Endpoints

| Method | Path | Request | Response | Errors |
|--------|------|---------|----------|--------|
| {{method}} | {{path}} | {{request_schema}} | {{response_schema}} | {{error_codes}} |

### Schema Definitions

```json
{{contract_schema}}
```

## 2. Data Models

### Entities & Value Objects

| Name | Type | Fields | Invariants |
|------|------|--------|------------|
| {{name}} | entity/value-object | {{fields}} | {{invariants}} |

### Database Schema

```sql
{{schema_ddl}}
```

### Event Schemas

| Event | Producer | Consumer | Payload |
|-------|----------|----------|---------|
| {{event_name}} | {{producer}} | {{consumer}} | {{payload_schema}} |

## 3. Sequence Diagrams

### {{flow_name}}

```
{{sequence_diagram}}
```

## 4. Interface Definitions

### Repository Interfaces

```typescript
{{repository_interface}}
```

### Service Interfaces

```typescript
{{service_interface}}
```

### Port Definitions

```typescript
{{port_definitions}}
```

---

*Pass to Code Reviewer (alignment-agent) before implementation.*
