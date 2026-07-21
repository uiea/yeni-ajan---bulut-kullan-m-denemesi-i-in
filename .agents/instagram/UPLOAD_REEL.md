# Skill: Upload Reel

## Purpose
Upload a video as a Trial Reel (or standard Reel) to Instagram via the Graph API.

## Script Location
`scripts/upload_reel.py`

## Prerequisites
1. Instagram Business/Creator account with 1K+ followers (for Trial Reels)
2. Facebook App with `instagram_content_publish` and `instagram_basic` permissions
3. Long-lived access token (60-day token, refresh before expiry)
4. Credentials stored securely in your environment config

## Quick Start

```bash
# Trial reel from local video
python scripts/upload_reel.py video.mp4 \
  -c "Your caption here" \
  -t hashtag1 hashtag2 hashtag3

# From a public URL
python scripts/upload_reel.py \
  --url "{your-url}/reel.mp4" \
  -c "Caption here"

# Dry run first
python scripts/upload_reel.py video.mp4 \
  -c "Test caption" --dry-run
```

## How It Works
1. If local file: uploads to temp host to get a public URL
2. Creates an Instagram media container (with `trial_params` if trial)
3. Polls container status until video processing is FINISHED
4. Publishes the reel
5. Logs result to `outputs/upload-logs/`

## Trial Reel Behavior
- Trial Reels are shown ONLY to non-followers for ~24h
- Two graduation strategies:
  - `SS_PERFORMANCE` (default) - Instagram auto-publishes if metrics are good
  - `MANUAL` - you decide after reviewing metrics
- Check Insights after 24h to evaluate performance
- If graduated, the reel appears on your grid and followers' feeds

## Options Reference

| Flag | Default | Description |
|------|---------|-------------|
| `file` | - | Local video file path |
| `--url` | - | Public video URL (skips temp upload) |
| `-c, --caption` | required | Reel caption |
| `-t, --hashtags` | none | Space-separated hashtags |
| `--no-trial` | false | Post as regular reel |
| `--graduation-strategy` | SS_PERFORMANCE | Trial graduation mode |
| `--no-feed` | false | Don't share to feed grid |
| `--host` | 0x0 | Temp host: 0x0 or fileio |
| `--dry-run` | false | Preview without uploading |

## Logs
Every upload is logged to `outputs/upload-logs/YYYY-MM-DD_HHMMSS_upload.json` with full payload and API response.
