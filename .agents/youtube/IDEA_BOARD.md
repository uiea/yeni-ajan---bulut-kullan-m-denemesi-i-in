# Skill: Daily Idea Board

## Purpose
Automatically find outlier competitor videos every day and push them to a project management board with thumbnail, title, link, video summary, and positive/negative comment highlights.

## Serves Goals
- **CTR** - discover what titles/thumbnails are overperforming right now
- **Retention** - study what structures and angles keep viewers watching
- **Conversions** - spot audience language and objections to inform your CTAs

## Tools

### Data Collection (shell scripts, no API keys needed)
- `scripts/daily_collect.sh [search_count] [min_score]` - master script that:
  1. Scans YouTube for all keywords in `config/keywords.txt`
  2. Calculates outlier score for each result (video views / channel avg)
  3. For each 3x+ outlier: downloads thumbnail, description, and top 50 comments
  4. Saves everything to `outputs/daily/YYYY-MM-DD/`
- Dependencies: `yt-dlp`, `youtube-comment-downloader`

### Board Push (via your project management API)
- Connect to Notion, Linear, or any tool via REST API
- New entries land in "Idea" stage
- Each entry includes: title, link, thumbnail, outlier score, summary, comment highlights

### Keywords
- Config: `config/keywords.txt` - one keyword per line
- Update regularly based on your niche and trending topics

## Daily Process

### Step 1: Collect Data
```bash
zsh scripts/daily_collect.sh 15 3.0
```
Creates `outputs/daily/YYYY-MM-DD/` with:
- `DAILY_RAW.md` - summary of all outliers found
- `<video_id>/thumbnail.jpg`, `description.txt`, `comments.json`, `metadata.txt`

### Step 2: Analyze
For each outlier:
1. Read the description and comments
2. Write a 2-3 sentence summary
3. Categorize top comments into Positive and Negative
4. Identify the key takeaway (angle, gap, or opportunity)

### Step 3: Push to Board
Create a card/page with:
- **Title:** `[OUTLIER {score}x] {video title}`
- **Status:** Idea
- **Body:** thumbnail, link, scores, summary, comment highlights, opportunity

## Card Template
```markdown
## {Video Title}
**Link:** https://www.youtube.com/watch?v={video_id}
**Channel:** {channel} | **Views:** {views} | **Channel Avg:** {ch_avg} | **Score:** {score}x

![Thumbnail](https://i.ytimg.com/vi/{video_id}/maxresdefault.jpg)

### Summary
{2-3 sentence summary}

### Positive Comments
- "{comment text}" - @{author} ({votes} likes)

### Negative Comments / Questions
- "{comment text}" - @{author} ({votes} likes)

### Our Opportunity
{What angle, gap, or insight can you use?}
```

## Quality Bar
- Only push 3x+ outliers
- Every entry must have a filled "Our Opportunity" section
- Deduplicate: don't push the same video ID twice
- Comments should be translated if in another language, with original preserved

## Integration with Other Skills
- **RESEARCH** - outliers feed directly into topic research
- **THUMBNAIL** - study outlier thumbnails for CTR patterns
- **SCRIPTS** - use outlier transcripts + comments to inform script structure
- **COMMENTS** - deep-dive when an outlier warrants further investigation
