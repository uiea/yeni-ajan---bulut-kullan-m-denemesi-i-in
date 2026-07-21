# Skill: Outlier Research

## Purpose
Find breakout Instagram posts in your niche - posts performing 5x+ above the account's median engagement. Extract patterns (format, hook, topic, caption style) to inform your content creation.

## Serves Goals
- **Reach** - discover what formats and topics are getting distributed by the algorithm
- **Engagement** - study what drives saves and shares (the metrics Instagram rewards most)
- **Growth** - identify content patterns that convert viewers into followers

## Outlier Definition

**Two strategies (both used in daily collection):**

### Strategy 1: Per-Account (for competitor scraping)
```
Outlier Score = Post Engagement / Median Engagement of Account's Last 20 Posts
```
Best for: finding which posts break out from a known account's baseline.

### Strategy 2: Cross-Hashtag (for hashtag search)
```
Outlier Score = Post Engagement / Median Engagement of All Posts in That Hashtag Search
```
Best for: discovering new creators and posts in niche hashtags. Note: niche hashtags have very low baselines (median 2-6), so use higher thresholds or focus on absolute engagement.

**Engagement formula (Apify only provides likes + comments):**
```
Engagement = Likes + (Comments * 2)
```
Note: Saves and shares are NOT available via Apify scraping - only visible in your own Instagram Insights.

| Score | Classification |
|-------|---------------|
| 2-3x | Above average |
| 5-10x | Strong outlier |
| 10x+ | Viral - must analyze |

Use **median** (not mean) to avoid skew from previous outliers.

## Tools

### Primary: Apify (tested & working)

**Hashtag Search** - `{APIFY_ACTOR_ID}` (instagram-hashtag-scraper)
```bash
curl -X POST "https://api.apify.com/v2/acts/{APIFY_ACTOR_ID}/run-sync-get-dataset-items?token={YOUR_API_TOKEN}&timeout=120" \
  -H "Content-Type: application/json" \
  -d '{"hashtags": ["your_hashtag"], "resultsLimit": 20, "searchType": "top"}'
```
- `searchType`: `"top"` (higher engagement, better for outliers) or `"recent"` (discover new creators)
- Returns: likesCount, commentsCount, ownerUsername, type (Video/Sidecar/Image), caption, shortCode, url, displayUrl

**Account Scraping** - `{APIFY_ACTOR_ID}` (instagram-scraper)
```bash
curl -X POST "https://api.apify.com/v2/acts/{APIFY_ACTOR_ID}/run-sync-get-dataset-items?token={YOUR_API_TOKEN}&timeout=120" \
  -H "Content-Type: application/json" \
  -d '{"directUrls": ["https://www.instagram.com/{account}/"], "resultsType": "posts", "resultsLimit": 20}'
```
- Returns: same fields + ownerFollowerCount

**Pricing:** Free $5/month (~2,100 items). Each hashtag scan of 20 posts = 20 items.
**Config:** Store your Apify token securely in your environment or config file.
**Known issue:** JSON responses contain control characters in captions - always parse with `json.loads(strict=False)`

### Data Collection Script
- `scripts/daily_collect.sh [min_score] [posts_per_source]` - master script
  - Scans ALL keywords in `config/keywords.txt` as hashtags (both top + recent)
  - Scrapes ALL accounts in `config/competitors.txt`
  - Runs dual outlier detection (cross-hashtag + per-account)
  - Saves to `outputs/daily/YYYY-MM-DD/` -> `DAILY_RAW.md` + `outliers.json`
  - Default: 3x threshold, 30 posts/source

### Secondary: Virlo (virlo.ai)
- Tracks outlier short-form content across Reels/TikTok/Shorts
- Daily alerts on breakout content by keyword
- Use for cross-platform outlier validation

## Daily Process

### Step 1: Collect Data
Run the collection script:
```bash
zsh scripts/daily_collect.sh
```

Or manually via Apify API:
```bash
# Scrape a competitor's recent posts
curl -X POST "https://api.apify.com/v2/acts/{APIFY_ACTOR_ID}/runs" \
  -H "Authorization: Bearer {YOUR_API_TOKEN}" \
  -d '{
    "directUrls": ["https://www.instagram.com/{account}/"],
    "resultsType": "posts",
    "resultsLimit": 20
  }'
```

### Step 2: Calculate Outlier Scores
For each competitor account:
1. Pull last 20 posts
2. Calculate median engagement
3. Flag any post with 5x+ the median
4. Download: image/thumbnail, caption, comments, engagement metrics

### Step 3: Analyze Outliers
For each outlier:
1. **Format** - Reel, carousel, or single image?
2. **Hook** - First line of caption? First 3 seconds of Reel?
3. **Topic** - What specific topic? (tool demo, comparison, tutorial, news, meme)
4. **Visual style** - Clean/dark/colorful? Text overlay? Face?
5. **Caption structure** - Long/short? CTA type? Hashtag count?
6. **Comments** - What are people saying? What questions arise?
7. **Why it worked** - Algorithm signal (saves/shares) or audience resonance?

### Step 4: Push to Content Pipeline
Create an entry in your content pipeline with:
- **Title:** `[OUTLIER {score}x] {caption first line}`
- **Status:** Idea
- **Format:** Reel / Carousel / Single Image
- **Source Account:** @account_name
- **Details:** Screenshot/image, metrics, caption, top comments, your opportunity

## Keywords to Track
Maintained in `config/keywords.txt`:
- Your niche-specific keywords and hashtags
- Mix of English and local language terms
- Updated monthly based on what's producing outliers

## Competitor Accounts to Track
Maintained in `config/competitors.txt`:
- Accounts posting content in your niche with >10K followers
- Mix of languages relevant to your audience
- Updated monthly based on who's producing outliers

## Quality Bar
- Only flag 5x+ outliers (higher bar than YouTube's 3x because Instagram engagement is spikier)
- Every outlier must have a filled "Our Opportunity" section
- Deduplicate: don't push the same post twice
- Translate non-English captions/comments if needed (preserve original)
- Note whether the outlier is a Reel, carousel, or image - format matters

## Integration with Other Skills
- **REELS** - outlier Reels inform hook patterns, topics, pacing
- **CAROUSELS** - outlier carousels inform slide structure, visual style
- **SINGLE_IMAGE** - outlier images inform composition, text overlay
- **CAPTIONS** - outlier captions inform writing style, CTA patterns, hashtag strategy
