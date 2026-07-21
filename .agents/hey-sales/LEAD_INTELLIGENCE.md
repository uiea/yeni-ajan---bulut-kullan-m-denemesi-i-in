# Skill: Lead Intelligence

## Purpose
Analyze new inbound leads, prepare context and voice agent briefing, and trigger the AI qualification call. ALL leads receive an AI call first - routing happens AFTER scoring.

## Process
1. Read lead from CRM (status: "Not called")
2. Analyze the inquiry - extract what they're asking about, implied pain points, urgency, language
3. Determine industry from company name and project detail
4. Identify likely use case
5. Estimate deal size signals (enterprise vs SMB)
6. Calculate pre-call priority score (0-100):
   - High volume potential: +20
   - Clear pain point: +20
   - Decision maker signal: +15
   - Urgent timeline: +15
   - High-value industry: +15
   - Referral source: +10
   - Has phone number: +5
7. Generate voice agent briefing (natural-language paragraph):
   - What the lead likely needs
   - Which questions to emphasize
   - What pain points to probe
   - Appropriate tone (technical vs. simple)
8. Post analysis as CRM comment
9. Trigger Voice Qualification skill

## Quality Bar
- Priority score must be justified
- Briefing must be in the lead's language
- Briefing must reference specific details from their inquiry
- CRM comment must be posted before triggering the call
