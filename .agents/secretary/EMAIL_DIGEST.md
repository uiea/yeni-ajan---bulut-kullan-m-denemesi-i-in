# Skill: Email Digest

## Purpose
Produce a structured daily email digest covering ALL emails (not just unread) so that agents with email access stay fully informed about client, partner, and operational communications.

## Serves Goals
- No important task forgotten
- Revenue-driving actions prioritized
- Cross-agent intelligence sharing

## Who Consumes This

| Agent / Advisor | Why |
|----------------|-----|
| Secretary | Daily brief, priority detection |
| Sales Agent | Lead follow-ups, client responses, deal signals |
| Strategist | Partner conversations, business decisions, financial signals |
| Member Journey | Member communications, onboarding signals |
| Advisory Board (on-demand) | Context for strategic counsel |

### Who Does NOT Get Email Access
- Content/marketing agents (YouTube, Instagram, LinkedIn, etc.)
- Execution agents (Visuals, Meta Ads)

## Email CLI Commands Reference

Replace these with your own email access tool/API:

### List all emails for a time range
```bash
# Example using a Gmail CLI tool
{your-email-cli} list --query "newer_than:1d" --max-results 50 --format json
```

### List with specific query filters
```bash
# Client/partner emails only (exclude newsletters, notifications)
{your-email-cli} list --query "newer_than:1d -category:promotions -category:updates -category:social -category:forums" --max-results 50

# Sent emails (what you replied to / initiated)
{your-email-cli} list --query "newer_than:1d in:sent" --max-results 50
```

### Get full message (headers + snippet)
```bash
{your-email-cli} get --id "MESSAGE_ID" --format metadata
```

### Get full message body (when deeper context needed)
```bash
{your-email-cli} get --id "MESSAGE_ID" --format full
```

## Process

### Step 1: Pull All Emails (Last 24h)
Fetch all messages from the last 24 hours across inbox and sent:
1. Inbox (excluding noise): `newer_than:1d -category:promotions -category:updates -category:social -category:forums`
2. Sent: `newer_than:1d in:sent`
3. For each message, get metadata (From, To, Cc, Subject, Date) + snippet

### Step 2: Classify by Relationship Type

**Clients** - active or potential customers
**Partners** - business partners, investors, collaborators
**Team** - team members, contractors, advisors
**Operational** - vendors, billing, legal, compliance
**Noise** - newsletters, marketing, notifications -> summarize in one line or skip

### Step 3: Extract Intelligence Per Email

For each meaningful email, capture:
- **Who**: sender/recipient + relationship
- **Subject**: what it's about
- **Status**: new thread / reply / follow-up needed / FYI
- **Action required?**: yes/no + by when
- **Which agent cares**: tag the relevant agent(s)

### Step 4: Build the Digest

```markdown
# Email Digest - [Date]

## Action Required
| From | Subject | Action | Deadline | Agent |
|------|---------|--------|----------|-------|
| ... | ... | ... | ... | ... |

## Awaiting Response (Sent by You)
| To | Subject | Sent | Days waiting |
|----|---------|------|-------------|
| ... | ... | ... | ... |

## Client & Partner Updates
- [Thread summary with context]

## Team Communications
- [Thread summary with context]

## Operational
- [Brief summary of billing, vendor, compliance items]

## Skipped (Noise)
[Count] newsletters/notifications filtered out
```

### Step 5: Distribute
- Write full digest to `outputs/YYYY-MM-DD_email-digest.md`
- Secretary uses it for daily brief
- Other consuming agents read from this output path

## Output
`outputs/YYYY-MM-DD_email-digest.md`

## Quality Checks
- [ ] ALL emails covered, not just unread
- [ ] Sent emails included (tracks outbound commitments)
- [ ] Each actionable item has a clear owner agent tagged
- [ ] Client/partner emails are never classified as noise
- [ ] Threads are grouped, not listed as individual messages
- [ ] No email content is forwarded to marketing/content agents

## Anti-Patterns to Avoid
- Only showing unread (misses important read-but-not-actioned items)
- Ignoring sent emails (outbound = commitments to track)
- Treating all emails equally (classify and prioritize)
- Leaking personal/client email content to content agents
