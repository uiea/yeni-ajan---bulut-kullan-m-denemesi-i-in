# Reply Mining

## Purpose

Find high-visibility conversations to join with valuable replies. Strategic replies on viral tweets drive follower growth faster than original content for small accounts.

## Serves Goals

- Follower Growth
- Engagement Rate

## Process

### Step 1: Identify Target Conversations
Monitor for:
- Outlier tweets from `config/accounts.txt` (they have high visibility right now)
- **Accounts with 10x your follower count** in your niche - replying here exposes you to their full audience
- Trending topics in your niche
- Questions from followers or peers that you can answer authoritatively

### Step 2: Craft Reply
For each target conversation:
1. Read the full thread context
2. Identify what's missing or what value you can add
3. Draft a reply that:
   - Adds genuine value (not just "great post!")
   - Shows expertise without being preachy
   - Is concise (1-3 sentences ideal)
   - Optionally includes a relevant link or resource

### Step 3: Prioritize
Rank reply opportunities by:
1. **How early you can reply** - early replies get dramatically more visibility; being first on a viral thread is the highest-leverage action
2. Thread engagement level (higher = more eyeballs on your reply)
3. Topic relevance to your brand
4. Whether you have genuine expertise to add

### Step 4: After Posting
- **Reply to comments on your own tweets within 15 minutes** - signals activity to the algorithm and keeps the thread alive
- Engage with others' content *before* posting your own content each day

## Inputs

- Outlier reports (viral conversations happening now)
- `config/accounts.txt` (accounts to monitor)
- `knowledge/BRAND.md`

## Outputs

- Reply suggestions in `outputs/YYYY-MM-DD_twitter_drafts.md` (marked as reply type)

## Algorithm Context for Replies

> Full reference: `skills/ALGORITHM_PLAYBOOK.md`

### Why Replies Are Algorithmically Optimal
- **Reply weight = 13.5** (27x a like). Every reply you generate on someone's post boosts THEIR reach too - making you a valued commenter.
- **Reply-engaged-by-author = 75.0** (150x a like). When the original author replies to YOUR reply, both of you get massive signal boost.
- **Premium replies auto-rank first** in threads - if you have Premium, your reply gets seen first.
- **TweepCred matters**: replies from accounts with higher reputation scores (50+) get significantly more visibility.

### Strategic Reply Playbook
- **Reply to high-TweepCred accounts** (verified, high engagement, good follower ratio) - your reply inherits some of their distribution.
- **Write replies that invite author response** - ask a follow-up question, add a surprising data point, share a personal experience related to their tweet.
- **Be early**: first replies on viral tweets get dramatically more visibility due to the 2-hour engagement velocity window.
- Daily routine: 5-10 niche replies before posting your own content.

### What NOT to Do
- Don't reply with links (link penalty applies in replies too for non-Premium)
- Don't reply just "great post!" (no dwell time signal, no engagement trigger)
- Don't reply to outrage/political threads (even if high visibility - brand damage outweighs reach)

## Quality Bar

- Never reply just for visibility - must add real value
- No self-promotion in replies unless directly relevant
- Max 5-10 strategic replies per day (quality over quantity)
