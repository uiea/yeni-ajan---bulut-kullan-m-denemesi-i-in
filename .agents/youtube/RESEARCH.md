# Skill: YouTube Research

## Purpose
Find high-potential video topics that will drive subscribers, views, and conversions.

## Serves Goals
- Subscriber growth (topics that attract the right audience)
- View count (topics with proven search/browse demand)
- Conversions (topics where your product/offer is a natural fit)

## Inputs
- Current strategy and priorities
- Audience pain points and interests
- Recent journal entries (competitor moves, performance trends, audience signals)
- Agent memory (what topics worked before)

## Process
1. Review context (strategy, audience, recent journal)
2. Run outlier scan scripts to find videos outperforming their channel average
3. For top outliers (3x+), pull comments and transcripts to understand why they overperformed
4. Transcribe top-performing competitor videos on candidate topics using the TRANSCRIPTION skill to:
   - Understand what angles and hooks they used
   - Identify gaps they missed or underserved
   - Study structure and talking points that drove engagement
5. For each topic, assess:
   - Search volume / demand signals
   - Competition level (how many creators covering this?)
   - What competitors actually said (from transcripts) vs. what's still unsaid
   - Audience alignment (does your audience care?)
   - Strategic fit (does it serve your goals?)
   - Your unique angle (what can you say that others can't?)
6. Rank topics by composite score
7. Deliver top 5-7 topics with rationale

## Outputs
- Ranked topic list with:
  - Topic / working title
  - Why this topic (demand + alignment + angle)
  - Competition assessment
  - Suggested priority (make now vs. queue)
- Saved as `outputs/YYYY-MM-DD_youtube_research_description.md`

## Quality Bar
- Every topic must answer "why this, why now, why us"
- No vague categories - topics should be specific enough to script
- Include at least one "contrarian" or underserved topic per batch

## Tools

### Outlier Detection
- `scripts/find_outliers.sh <keyword> [count] [history]` - searches YouTube for a keyword, compares each result's views to the channel's recent average, ranks by outlier score (3x+ = worth investigating)
- `scripts/weekly_outlier_scan.sh [count] [history]` - runs outlier detection for all keywords in `config/keywords.txt`
- Keywords config: `config/keywords.txt` - one keyword per line, edit to add/remove tracked topics
- Reports saved to: `outputs/outliers/`

### Video Metadata
- `yt-dlp --skip-download --print "%(title)s|%(view_count)s|%(channel)s|%(upload_date)s" <url>` - pull title, views, channel, date for any video

### Competitor Deep-Dive
- TRANSCRIPTION skill - transcribe outlier videos to study structure, hooks, talking points
- COMMENTS skill - pull comments from outlier videos for audience language, objections, content gaps

### Other
- SERP API for search volume and competition data (when available)
- Manual research as fallback
