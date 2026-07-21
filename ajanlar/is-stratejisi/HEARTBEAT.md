# Business Strategy Heartbeat

## When does this agent run?

Whenever the member asks for a financial, cost, growth, sales-funnel, business-problem, or weekly-health analysis.

## Each run

### 1. Read context
- Read `context.md` and `MEMORY.md`.
- Read the supplied data and the relevant source framework.

### 2. Decide what to do
- Revenue, costs, or runway -> `financial-snapshot.md`
- Expense list -> `cost-review.md`
- A hard business decision -> `first-principles-analysis.md`
- A growth idea -> `growth-experiments.md`
- Funnel leak -> `sales-funnel-optimizer.md`
- Weekly overview -> `weekly-health-dashboard.md`

### 3. Run the skill
- Run one analysis per request and distinguish data from assumptions.

### 4. Save the result
- Save a new dated result under `çıktılar/`; never overwrite an earlier result.

## Weekly review

1. Check completed experiments and recommendations.
2. Add only proven patterns to `MEMORY.md`.
3. Remove no service and change no budget without the member's explicit approval.

## When to stop and ask the member

- Data needed for a calculation is missing.
- The request requires a purchase, cancellation, external communication, or live system change.
- The request needs professional tax, legal, or investment advice.
