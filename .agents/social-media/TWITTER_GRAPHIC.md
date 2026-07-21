# Skill: Twitter Graphic (Single Image Post)

## Purpose
Generate a single, bold, tweet-ready graphic image for standalone tweet posts. Used when a tweet needs a visual to increase engagement and stop scrolling.

## Serves Goals
- **Reach** - image tweets get significantly higher engagement than text-only
- **Saves & shares** - a well-designed graphic gets bookmarked and screenshot-shared

## Image Specs

### Dimensions
- **Size:** 1600x900px (16:9)
- **Format:** PNG

### Visual Style
- **Background:** #0D0D0D (near-black) - always dark mode
- **Primary text:** White (#FFFFFF) - bold, large
- **Secondary text/labels:** Dim gray (#B0B0B0) - smaller, uppercase
- **Accent colors:**
  - Green (#00E676) - positive numbers, gains
  - Red (#FF3B3B) - crossed-out numbers, warnings
  - Blue (#1D9BF0) - highlights, sparingly
- **Aesthetic:** Minimal, fintech/dashboard, high contrast

### Design Rules
- Ultra minimal - no gradients, no illustrations, no stock imagery
- Typography IS the design
- Maximum 3-4 text elements on screen
- Must be readable on mobile without zooming

## Graphic Types

### 1. Data Comparison (most common)
Old vs new pricing, before/after stats, benchmark results.

### 2. Single Stat / Claim
One big number or statement that shocks.

### 3. List / Steps
3-4 items maximum, clean vertical stack.

## Generation Process
1. Determine graphic type based on tweet content
2. Write the prompt following structure templates
3. Call AI image generation API (16:9, PNG)
4. Review output - verify text rendering accuracy
5. Save to outputs

## Quality Bar
- Text must be accurately rendered
- Must be readable on mobile
- Must feel "designed", not "AI-generated"
- Color usage must be purposeful (green = good, red = bad/old, white = neutral)
- No walls of text - if you need more than 4 text elements, use a carousel instead

## When to Use This vs. Other Formats
- **Single graphic:** One strong visual concept (comparison, stat, claim)
- **Carousel:** Multiple insights from a video
- **Thread:** Narrative arc or sequential storytelling
- **Text only:** Conversational, opinion, or question
