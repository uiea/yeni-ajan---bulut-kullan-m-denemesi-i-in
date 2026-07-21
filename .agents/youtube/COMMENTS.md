# Skill: Comments

## Purpose
Extract and analyze comments from your own and competitors' YouTube videos to uncover audience sentiment, content gaps, objections, and emotional hooks.

## Serves Goals
- **CTR** - find emotional triggers and language the audience actually uses for titles/thumbnails
- **Retention** - discover what questions viewers ask so you can answer them in your videos
- **Conversions** - identify objections, complaints, and purchase-related signals in competitor audiences

## Two Modes - Never Mix

### 1. Your Channel (improvement tracking)
**Purpose:** Are you getting better? Are complaints decreasing? Are viewers satisfied?
- Weekly batch: run comment collection for your recent videos
- Output: categorized comment summaries
- Run as part of weekly review cycle
- **What to look for:** recurring complaints, sentiment trends week-over-week, did you fix the issues viewers flagged?

### 2. Competitor Videos (opportunity discovery)
**Purpose:** What can you do better? What are their audiences asking for that you can provide?
- Single video: pull top comments from competitor videos
- Used on-demand during RESEARCH skill
- **What to look for:** unanswered questions, pain points, content gaps, emotional hooks, language patterns

## When to Use
- **Weekly review (own channel)** - check sentiment on recent videos, spot recurring complaints
- **Audience research** - read what a competitor's audience is saying
- **Content gaps** - find questions in comments that the video didn't answer
- **Objection mining** - identify doubts or complaints to address in your content
- **Hook discovery** - spot emotionally charged language that resonates
- **Sentiment check** - gauge whether a video landed well or missed the mark

## Process
1. Identify the video(s) and the research goal
2. Pull comments using `youtube-comment-downloader` or similar tool
3. Categorize comments (questions, praise, complaints, requests, objections)
4. Extract actionable insights relevant to the research goal
5. Feed findings into the appropriate skill or output

## Outputs
- Categorized comment summary (questions, praise, complaints, requests)
- Key audience language and emotional triggers
- Content gap opportunities (unanswered questions, unmet needs)
- Fed as input into RESEARCH, SCRIPTS, or THUMBNAIL skills as needed

## Quality Bar
- Always have a clear research goal before pulling comments
- Focus on patterns across multiple comments, not individual outliers
- Extract the audience's language - don't paraphrase into generic terms
- Note the source video URL and date in any output
- For competitor videos: comments reflect their audience, not necessarily yours
- For own videos: comments take 3-4 days to mature. Don't analyze videos <3 days old
- Weight comments by likes - a 34-like comment represents far more people than a 0-like one

## Integration with Other Skills
- **RESEARCH** - mine comments for underserved topics and audience pain points
- **SCRIPTS** - use audience language and objections to shape script hooks and CTA framing
- **THUMBNAIL** - pull emotional triggers and common phrases for title ideas
- **TRANSCRIPTION** - pair with transcript analysis to see what the video said vs. how the audience reacted
