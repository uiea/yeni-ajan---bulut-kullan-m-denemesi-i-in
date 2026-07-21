# Skill: Voice Qualification

## Purpose
Call ALL inbound leads via AI voice agent, qualify them through 5 structured BANT questions, score as HOT/WARM/COLD, and route accordingly.

## Serves Goals
- Speed to lead (<5 minutes from inquiry to first call)
- Lead qualification rate (>60% qualified)

## The 5 Qualification Questions

Each question is scored as **strong** or **weak**:

**Q1: Problem** - "What specific problem are you solving?"
- Strong: Clear, specific pain point
- Weak: Vague curiosity, "just exploring"

**Q2: Budget** - "Do you have budget allocated?"
- Strong: Confirmed budget or active spending on current solution
- Weak: No budget, "need to check"

**Q3: Timeline** - "Timeline to go live?"
- Strong: This quarter, "ASAP", within 1-3 months
- Weak: "Maybe next year", "no rush"

**Q4: Decision Maker** - "Are you the decision-maker?"
- Strong: Yes, or accessible decision maker
- Weak: "Need to ask my boss", unclear authority

**Q5: Competitive Landscape** - "Have you tried other solutions?"
- Strong: Tried alternatives and failed, or actively comparing
- Weak: Never looked into it, purely theoretical interest

## Lead Scoring

| Strong Answers | Score | Label | Meaning |
|---|---|---|---|
| 4-5 | HOT | Ready to buy | Budget + Timeline + DM confirmed |
| 2-3 | WARM | Interested but early | Needs nurturing |
| 0-1 | COLD | Window shopping | Newsletter only |

## Post-Scoring Routing

**HOT leads** - Determine deal size, then route:
- Enterprise signals (high volume, complex needs, multiple departments) -> 30min Discovery Call
- SMB signals (single location, straightforward use case) -> 20min Quick Demo

**WARM leads** - Enter nurture sequence, re-engage after 2-4 weeks
**COLD leads** - Monthly newsletter only, re-qualify in 90 days

## Dynamic Behavior Rules
- Never sound robotic - use natural conversation patterns
- Ask follow-up questions dynamically
- Short answers -> probe deeper
- Resistance -> acknowledge: "No pressure at all."
- Pricing questions -> redirect to demo
- Human request -> comply immediately

## Quality Bar
- Call must last at least 60 seconds for valid qualification
- ALL 5 questions must be attempted
- Each answer scored with clear justification
- Lead score must match strong-answer count
- Full transcript + structured report must be logged to CRM
- HOT leads must have meeting booked or attempted
