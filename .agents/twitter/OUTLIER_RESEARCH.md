# Outlier Research

## Purpose

Find tweets that massively outperform their author's typical engagement. These outliers reveal proven hooks, formats, and topics that resonate - your content should be informed by what's already working, not guesswork.

## Serves Goals

- Engagement Rate
- Reach / Impressions
- CTR

## How Outliers Are Defined

**Outlier Score = Tweet Engagement / Author's Recent Average Engagement**

Where engagement = likes + retweets + replies + quote tweets

Example:
- Tweet gets 2,400 likes, 180 RTs, 95 replies = 2,675 engagement
- Author's last 20 tweets average 320 engagement
- Outlier score = 2,675 / 320 = **8.4x**

**Threshold:** 3.0x+ is flagged as worth investigating

## Process

### Step 1: Keyword Scan
Run your outlier detection script for each keyword in `config/keywords.txt`:
1. Search Twitter for keyword (last 7 days)
2. For each tweet found, get author's recent average engagement
3. Calculate outlier score
4. Filter by minimum score (default: 3.0x)
5. Output markdown report

### Step 2: Account Scan
Run your account scan script for accounts in `config/accounts.txt`:
1. Fetch last 20 tweets from each account
2. Calculate per-account engagement average
3. Flag tweets scoring 3x+ above their own average
4. Output markdown report

### Step 3: Analysis (Agent)
For each outlier found:
1. Read the full tweet + thread (if threaded)
2. Analyze top replies for sentiment and signals
3. Identify **why** it worked through the algorithm lens (see `skills/ALGORITHM_PLAYBOOK.md`):
   - Hook pattern (question, bold claim, personal story, data point, contrarian take)
   - Format (text-only, image, video, poll, thread)
   - Topic angle (tutorial, opinion, news reaction, behind-the-scenes)
   - Timing (day of week, time)
   - Call-to-action (or lack thereof)
   - **Dwell time indicators**: Was it long-form? Did it use open loops or storytelling? How long would it take to read?
   - **Reply depth**: How many replies did it generate? Did the author reply back? (reply_engaged_by_author = 150x a like)
   - **Outrage vs. genuine engagement**: Did this go viral from intellectual curiosity or from emotional triggering? Flag outrage-driven outliers separately - study the dwell-time mechanics but don't replicate the format.
4. Write 2-3 sentence summary + opportunity for you

### Step 4: Push to Pipeline
For top outliers, create entries with:
- Original tweet link
- Outlier score
- What made it work
- Your angle / adaptation idea
- Suggested format and hook

## Inputs

- `config/keywords.txt` - One keyword per line
- `config/accounts.txt` - One @handle per line
- Twitter API v2 or scraping tool

## Outputs

- `outputs/outliers/KEYWORD_YYYY-MM-DD.md` - Per-keyword reports
- `outputs/daily/YYYY-MM-DD/DAILY_RAW.md` - Combined daily summary

## Quality Bar

- Every outlier entry must explain WHY it worked, not just that it did
- Minimum 3.0x score to be included
- Deduplicate by tweet ID across keywords
- Include at least one "small account outlier" (under 10K followers) per scan - proves the format works regardless of audience size

## Tools

- Twitter API v2 (`/2/tweets/search/recent`) - preferred
- Apify Twitter Scraper - fallback
  - Free plan actor: `{APIFY_ACTOR_ID}`
  - Correct input format: `{"searchTerms": ["from:handle OR keyword"], "maxItems": 50}`
- `twscrape` Python library - alternative fallback
- Your outlier detection scripts

## Integration

- Feeds into **Tweet Craft** skill (proven hooks and formats)
- Feeds into **Thread Strategy** skill (thread structures that work)
- Feeds into **Reply Mining** skill (which conversations to join)
- Weekly findings update `MEMORY.md` patterns
