# Skill: TikTok Upload

## Purpose
Upload finished reels to TikTok via the Content Posting API.

## Serves Goals
- **Reach** - TikTok has the highest organic reach ceiling for short-form
- **Speed** - automate the upload step

## TikTok Content Posting API

### Authentication
TikTok uses OAuth 2.0 with scopes:
- `video.publish` - upload and publish videos
- `video.upload` - upload videos (draft mode)

### Upload Flow
1. **Initialize upload** - POST to `/v2/post/publish/video/init/` with post_info and source_info
2. **Upload chunks** - PUT to upload_url with Content-Range header
3. **Check publish status** - POST to `/v2/post/publish/status/fetch/`

### Privacy Levels
| Level | Description |
|-------|-------------|
| `SELF_ONLY` | Only you can see (use for testing) |
| `MUTUAL_FOLLOW_FRIENDS` | Mutual followers only |
| `FOLLOWER_OF_CREATOR` | Your followers |
| `PUBLIC_TO_EVERYONE` | Public |

**Default: Upload as `SELF_ONLY` first, review, then manually publish.**

## Process
1. **Validate video** - check resolution (1080x1920), duration (3s-10min), codec (H.264+AAC), no watermarks
2. **Prepare metadata** - title/description max 2200 chars, hashtags (max 5), disclosure labels
3. **Upload** with --dry-run flag first for testing
4. **Log result** to `outputs/upload-logs/`

## Quality Bar
- Never upload directly as PUBLIC
- Video must pass platform preset validation
- No other platform's watermark on the video
- Caption must include at least 2 relevant hashtags

## Limitations
- TikTok API requires app review for `video.publish` scope
- Rate limit: 3 videos per day for unverified apps
- Token expires every 24 hours - refresh flow needed
- Some features (sounds, effects) not available via API
