# AI Agent Skills Library

A collection of 60+ reusable AI agent skills for content creation, marketing, sales, strategy, and operations. Each skill is a structured prompt template that can be used with Claude Code or any AI coding assistant.

## How to Use

1. Copy the skill files into your agent's `skills/` directory
2. Replace `{placeholders}` with your own values
3. Reference skills from your agent's main prompt

## Skills by Category

### YouTube (7 skills)
| Skill | Description |
|-------|-------------|
| [RESEARCH](youtube/RESEARCH.md) | Find high-potential video topics |
| [TRANSCRIPTION](youtube/TRANSCRIPTION.md) | Extract transcripts from videos |
| [COMMENTS](youtube/COMMENTS.md) | Analyze comments for audience insights |
| [IDEA_BOARD](youtube/IDEA_BOARD.md) | Daily outlier video discovery |
| [THUMBNAIL](youtube/THUMBNAIL.md) | Thumbnail & title generation |
| [SCRIPTS](youtube/SCRIPTS.md) | Video script management |
| [SEO_RESEARCH](youtube/SEO_RESEARCH.md) | SEO keyword research |

### Content Repurpose (11 skills)
| Skill | Description |
|-------|-------------|
| [CLIPS](social-media/CLIPS.md) | Extract best segments for short-form |
| [SHORT_FORM](social-media/SHORT_FORM.md) | 15-60s Reels/TikTok scripts |
| [REEL_CUT](social-media/REEL_CUT.md) | Produce ready-to-upload 9:16 reels |
| [CAPTION_BURN](social-media/CAPTION_BURN.md) | Burn subtitles into video |
| [TWITTER](social-media/TWITTER.md) | Video -> Twitter threads |
| [TWITTER_CAROUSEL](social-media/TWITTER_CAROUSEL.md) | Video -> Twitter carousel |
| [TWITTER_GRAPHIC](social-media/TWITTER_GRAPHIC.md) | Tweet-ready graphics |
| [LINKEDIN](social-media/LINKEDIN.md) | Video -> LinkedIn posts |
| [CAROUSEL](social-media/CAROUSEL.md) | Visual slide carousels |
| [MARKETING_VIDEO](social-media/MARKETING_VIDEO.md) | Marketing video concepts |
| [TIKTOK_UPLOAD](social-media/TIKTOK_UPLOAD.md) | Upload reels to TikTok |

### Visuals (5 skills)
| Skill | Description |
|-------|-------------|
| [DATA_EXPLAINER](visuals/DATA_EXPLAINER.md) | Interactive data explainers |
| [COMPARISON_VISUAL](visuals/COMPARISON_VISUAL.md) | Before/after comparisons |
| [INTERACTIVE_CHART](visuals/INTERACTIVE_CHART.md) | Animated HTML charts |
| [MOTION_GRAPH](visuals/MOTION_GRAPH.md) | Static -> animated MP4 via Remotion |
| [PRESENTATION](visuals/PRESENTATION.md) | Polished HTML presentations |

### Sales (5 skills)
| Skill | Description |
|-------|-------------|
| [CRM_MEMORY](hey-sales/CRM_MEMORY.md) | Log interactions to CRM |
| [FOLLOW_UP](hey-sales/FOLLOW_UP.md) | Automated follow-up scheduling |
| [VOICE_QUALIFICATION](hey-sales/VOICE_QUALIFICATION.md) | AI voice lead qualification |
| [LEAD_INTELLIGENCE](hey-sales/LEAD_INTELLIGENCE.md) | Analyze and qualify inbound leads |
| [SALES_STRATEGY](hey-sales/SALES_STRATEGY.md) | Analyze deal patterns |

### Strategy (6 skills)
| Skill | Description |
|-------|-------------|
| [FINANCIAL_XRAY](hey-strategist/FINANCIAL_XRAY.md) | Company financial health scan |
| [FIRST_PRINCIPLES](hey-strategist/FIRST_PRINCIPLES.md) | Break problems to fundamentals |
| [GROWTH_HYPOTHESES](hey-strategist/GROWTH_HYPOTHESES.md) | Systematic growth testing |
| [SALES_OPTIMIZER](hey-strategist/SALES_OPTIMIZER.md) | Fix sales funnel leaks |
| [SURVIVAL_DASHBOARD](hey-strategist/SURVIVAL_DASHBOARD.md) | Weekly company health snapshot |
| [COST_KILLER](hey-strategist/COST_KILLER.md) | Audit and minimize expenses |

### Instagram (6 skills)
| Skill | Description |
|-------|-------------|
| [OUTLIER_RESEARCH](instagram/OUTLIER_RESEARCH.md) | Find breakout posts (5x+ engagement) |
| [REELS](instagram/REELS.md) | Script and plan Reels |
| [CAROUSELS](instagram/CAROUSELS.md) | Design carousel posts |
| [CAPTIONS](instagram/CAPTIONS.md) | Captions & hashtag strategy |
| [SINGLE_IMAGE](instagram/SINGLE_IMAGE.md) | High-impact single image posts |
| [UPLOAD_REEL](instagram/UPLOAD_REEL.md) | Upload via Graph API |

### Meta Ads (7 skills)
| Skill | Description |
|-------|-------------|
| [AD_CREATIVE_RESEARCH](meta-ads/AD_CREATIVE_RESEARCH.md) | Spy on competitor ads |
| [BUDGET_OPTIMIZER](meta-ads/BUDGET_OPTIMIZER.md) | Optimize budget for max ROAS |
| [AUDIENCE_STRATEGY](meta-ads/AUDIENCE_STRATEGY.md) | Build targeting audiences |
| [PERFORMANCE_REVIEW](meta-ads/PERFORMANCE_REVIEW.md) | Weekly ad performance analysis |
| [STATIC_IMAGE_DESIGN](meta-ads/STATIC_IMAGE_DESIGN.md) | Generate ad images |
| [AD_COPY](meta-ads/AD_COPY.md) | Write scroll-stopping ad copy |
| [CAMPAIGN_ARCHITECTURE](meta-ads/CAMPAIGN_ARCHITECTURE.md) | Design campaign structures |

### Secretary / Personal Assistant (5 skills)
| Skill | Description |
|-------|-------------|
| [DAILY_BRIEF](secretary/DAILY_BRIEF.md) | Prioritized daily action plan |
| [EMAIL_DIGEST](secretary/EMAIL_DIGEST.md) | Structured email digest |
| [PRIORITY_AUDIT](secretary/PRIORITY_AUDIT.md) | Mid-day priority reality check |
| [GOAL_ALIGNMENT](secretary/GOAL_ALIGNMENT.md) | Align actions with life goals |
| [WEEKLY_REVIEW](secretary/WEEKLY_REVIEW.md) | Honest weekly reflection |

### Twitter / X (6 skills)
| Skill | Description |
|-------|-------------|
| [ALGORITHM_PLAYBOOK](twitter/ALGORITHM_PLAYBOOK.md) | X algorithm reference |
| [TWEET_CRAFT](twitter/TWEET_CRAFT.md) | Draft high-engagement tweets |
| [THREAD_STRATEGY](twitter/THREAD_STRATEGY.md) | Create value-packed threads |
| [REPLY_MINING](twitter/REPLY_MINING.md) | Find conversations to join |
| [PERFORMANCE_REVIEW](twitter/PERFORMANCE_REVIEW.md) | Weekly Twitter analysis |
| [OUTLIER_RESEARCH](twitter/OUTLIER_RESEARCH.md) | Find outperforming tweets |

### Templates
| File | Description |
|------|-------------|
| [_SKILL_TEMPLATE](_SKILL_TEMPLATE.md) | Template for creating new skills |

## Creating Your Own Skills

Use `_SKILL_TEMPLATE.md` as a starting point. Each skill should define:
- **Purpose** - what it does
- **Inputs** - what data it needs
- **Process** - step-by-step instructions
- **Output** - what it produces
