# Skill: Data Explainer

## Purpose
Create step-by-step interactive explainers that walk viewers through a dataset, study, or concept - turning static research into a guided visual story.

## Serves Goals
- Visual clarity (complex study to digestible walkthrough)
- Engagement (guided reveal keeps attention)

## Inputs
- Source material: research paper, study chart, dataset, or article
- Key message: what should the viewer take away?
- Audience level: beginner (default), intermediate, advanced
- Video timestamp context: where in the video will this appear?

## Process
1. Extract the 3-5 key data points from the source material
2. Design a narrative flow:
   - Start with the surprising/hook insight
   - Build context (what was measured, why it matters)
   - Reveal data progressively (not all at once)
   - End with the actionable takeaway
3. Build as single-file HTML with step-by-step navigation
4. Add annotations and context (translate technical terms, add tooltips)
5. Test the full flow, verify narrative makes sense

## Outputs
- Single HTML file: `outputs/YYYY-MM-DD_explainer-name.html`

## Quality Bar
- A viewer with zero context must understand the story by step 3
- Each step adds exactly one new piece of information
- No jargon without explanation
- Total steps: 5-10 (sweet spot for video pacing)
- Works at 1920x1080, smooth transitions
