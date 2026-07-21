# Skill: Carousel Generation

## Purpose
Turn carousel content into visual slide images using AI image generation, then combine into a PDF for LinkedIn upload.

## Serves Goals
- **Reach** - LinkedIn carousel documents (PDFs) get significantly higher organic reach
- **Authority** - professional, branded visuals

## Slide Types

**Cover Slide (Slide 1):**
- Large bold headline (the hook)
- Optional one-line subtext
- Your photo (mood-matched to content)
- Author name + handle

**Content Slides (Slides 2-N-1):**
- Bold headline (5-8 words)
- Supporting body text (1-2 sentences)
- Clean background, no photo
- Slide number indicator

**CTA Slide (Last):**
- Your photo
- "Follow for more [topic]"
- One-line bio + handle

## Generation Process
1. Parse slide content - headlines, body text, photo moods
2. For each slide, build the AI image prompt
3. Generate images (1:1 aspect ratio for LinkedIn)
4. Save images and combine into a single PDF

## Quality Bar
- Text must be readable at mobile size
- Consistent visual style across all slides
- Photo mood must match content tone
- No more than 8 slides total (sweet spot: 5-7)
- Cover slide must pass the "feed scroll test"

## Tools
- AI Image Generation API (Fal AI, Midjourney, etc.)
- ImageMagick or similar - PDF assembly
- Carousel content from LINKEDIN skill
