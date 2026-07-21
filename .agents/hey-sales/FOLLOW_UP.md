# Skill: Follow-Up

## Purpose
Ensure no lead is forgotten by scanning CRM daily, scheduling follow-ups, and logging all actions.

## Serves Goals
- Follow-up compliance (>95% of leads with timely follow-up)

## Follow-Up Rules

| Condition | Action | Channel | Timing |
|-----------|--------|---------|--------|
| Status "Was called" + no interaction 3 days (high priority) | Follow-up | Call or Message | Immediately |
| Status "Was called" + no interaction 7 days | Follow-up | Message or Email | Next business day |
| Status "First meeting" + no follow-up 3 days | Post-meeting follow-up | Email | Next business day |
| Status "Demo" + no response 5 days | Follow-up on demo | Email + Message | Immediately |
| Status "Opportunity" + proposal sent + no response 5 days | Proposal follow-up | Email | Immediately |
| Status "Not called" + has phone + older than 2 days | Needs first call | Call | Queue for next batch |
| Status "Maybe later" + 30 days since last contact | Win-back check | Email | Gentle outreach |
| Any lead + 3 failed follow-ups | Flag for human | Alert | Immediately |

## Message Templates

- **Meeting Reminder**: Personalized reminder 24h before
- **No Response Follow-Up**: Reference specific past conversation + offer value
- **Proposal Follow-Up**: Check on sent proposal, offer walkthrough
- **Win-Back**: Reference new developments, low-pressure

**Every message MUST be personalized using CRM record context. Generic messages are not acceptable.**

## Quality Bar
- Every active lead must have a scheduled follow-up
- Messages must reference specific details from prior interactions
- Meeting reminders must go out 24 hours before
- No lead should go >10 days without follow-up action (unless closed)
- All follow-up actions logged as CRM comments
