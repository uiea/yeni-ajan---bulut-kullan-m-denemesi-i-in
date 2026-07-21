# Skill: CRM Memory

## Purpose
Turn every interaction (calls, messages, emails, meetings, manual notes) into structured CRM comments on the lead record, plus local client memory files.

## Serves Goals
- CRM data completeness (>95% of interactions logged)

## Inputs
- Call transcripts
- Chat messages (WhatsApp/Slack/etc.)
- Email conversations
- Meeting transcripts
- Manual notes

## Process
1. Receive interaction data
2. Match to CRM record by company name, phone, or email
3. Read existing CRM comments - understand full history
4. Summarize the interaction in one paragraph
5. Extract structured data: pain points, buying signals, risks, action items, key quotes
6. Determine next action
7. Post as CRM comment using the appropriate format

### Comment Formats

**After AI qualification call:**
```
AI Qualification Call - [DATE]
Duration: [X] minutes
Outcome: [Qualified/Not Qualified/No Answer/Callback]
Summary: [1-2 sentences]
Pain Points: [bullets]
Current Solution: [what they use now]
Timeline: [when they want to act]
Decision Maker: [who]
Budget Signal: [info]
Next Action: [what happens next]
```

**After human call:**
```
Call - [DATE]
Duration: [X] minutes
Outcome: [Meeting Booked/Proposal/Follow-up/Closed]
Summary: [key takeaways]
Key Points: [bullets]
Next Action: [what happens next]
```

**Chat interaction / Email / Meeting / Status change / Follow-up sent:**
Similar structured formats with date, direction, summary, and next action.

## Quality Bar
- Every interaction MUST result in a CRM comment
- Comments must follow format templates
- Summary must be factual (based on transcript, not inferred)
- Next action must be concrete and actionable
- Client memory file must be updated within 15 minutes
- Duplicate interactions must be detected and not re-posted

## Integration
- Reads from: Voice Qualification skill (transcripts)
- Feeds into: Follow-Up skill (task scheduling)
- Feeds into: Sales Strategy skill (interaction data for pattern analysis)
