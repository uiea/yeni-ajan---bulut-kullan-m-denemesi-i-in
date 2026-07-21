# Skill: Clip Extraction

## Purpose
Identify the 2-3 best segments from a YouTube video for short-form repurposing - with timestamps, hooks, and format notes.

## Serves Goals
- **Reach** - provides source material for Reels/TikTok scripts
- **Traffic** - clips drive viewers to the full video

## Inputs
- Video transcript with approximate timestamps
- Top comments (which parts got reactions)
- Video performance data (retention graph if available)

## Process
1. Read the full transcript and identify candidate segments by type:
   - **Surprise moments** - stats, results, or findings that would make someone stop scrolling
   - **Personal stories** - honest mistakes, real test results, behind-the-scenes
   - **Actionable tips** - specific how-to moments that work standalone
   - **Controversy/opinion** - strong takes that invite debate
2. For each candidate, assess:
   - Can this stand alone without the rest of the video? (must be YES)
   - Is there a natural hook in the first sentence? (must be YES)
   - Is it 15-60 seconds when spoken? (must be YES)
3. Rank candidates and pick the top 2-3
4. For each selected clip, document timestamp range, hook line, why it works, format suggestion

## Video Clip Cutting
After identifying candidates, download and cut actual video clips:

```bash
# Download
yt-dlp -f "bestvideo+bestaudio/best" --merge-output-format mp4 \
  --write-auto-sub --sub-lang tr --convert-subs srt \
  -o "full_video.%(ext)s" "{youtube_url}"

# Cut clips
ffmpeg -y -ss {start} -to {end} -i full_video.mp4 -c copy clip{N}_{slug}.mp4
```

## Quality Bar
- Each clip must pass the "scroll-stop test" - would the first 2 seconds make a stranger stop?
- Each clip must be self-contained - no "as I mentioned earlier" references
- 2-3 clips per video, not more. Quality over quantity.
- If a video has NO good clip candidates, say so explicitly

## Dependencies
- `yt-dlp` - video download
- `ffmpeg` - video cutting

## Integration
- This skill runs FIRST - its output feeds into SHORT_FORM and TWITTER skills
