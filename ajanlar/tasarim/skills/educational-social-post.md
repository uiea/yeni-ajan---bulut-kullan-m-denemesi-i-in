# Skill: Create an Educational Instagram Post

## Purpose
Create one portrait Instagram post that teaches a focused idea and visually extends the latest award business-card direction.

## When to Use This Skill
- "Instagram için eğitim gönderisi hazırla"
- "Bu konuyu sosyal medyada öğretici bir görsele dönüştür"
- "Eğitim içeriği üret"
- "Bu başlıkla paylaşım görseli yap"

## Do NOT Use This Skill For
- Publishing, scheduling, or sending a post.
- Multi-slide carousels, reels, stories, ads, or a complete content calendar unless the member explicitly expands the scope.
- A visual without a stated output format and concept direction. Ask for both before beginning.

## Serves Goal
- Produce a useful educational social post in the established design line.
- Make the workspace feel concrete with a saved, shareable visual.

## Inputs
- Member context: `context.md`
- A topic, lesson, claim, or source material from the member
- Output format and concept direction from the member
- Latest card reference: `çıktılar/2026-06-06_tasarim_business-card-award-front.png` and `çıktılar/2026-06-06_tasarim_business-card-award-back.png`
- Existing files in `çıktılar/`
- This agent's `MEMORY.md`

## Process
1. Read `context.md`, `MEMORY.md`, and the latest two award-card reference images before composing the post.
2. Before generation, ask these two questions if the answer is absent:
   - "Çıktı formatı ne olsun?"
   - "Konsept yönü ne olsun?"
   Proceed with Instagram portrait at 1080x1350 and an educational concept only after the member selects them.
3. Reduce the requested subject to one teachable promise: one topic, one key takeaway, and at most three supporting points. If no topic is provided, ask for it instead of inventing an educational claim.
4. Write concise Turkish on-image copy. Use a short hook, a clear lesson title, and one practical takeaway. Do not place critical copy inside the image-generation prompt where exact typography matters.
5. Generate the visual base with `gpt-image-2`, only when the member explicitly requested AI image generation and safe credentials are configured. Request a 4:5 portrait composition without logos, watermarks, UI elements, or embedded text. Preserve generous negative space for later overlay text.
6. Apply the established award-card design line in the generation prompt and final composition:
   - near-black espresso background with very subtle square grid
   - warm muted gold accents and thin gold rules or rounded frames
   - ivory or warm cream text with a bold, high-contrast headline hierarchy
   - translucent oversized circular shapes in dark amber-brown
   - restrained, premium editorial mood with generous whitespace
   - no gradients that reduce readability, no neon, no stock-office imagery, and no crowded decorations
7. Add the approved Turkish copy as a clean overlay after image generation. Use `render-educational-social-post.ps1` when it fits the selected educational-post template. Keep one main alignment, use no more than three text sizes, and ensure sufficient contrast. Keep text at least 90 px from each edge on a 1080x1350 canvas.
8. Check factual and public-facing safety. Do not use unverified education, medical, legal, financial, customer, or private internal claims. Do not use a real person’s likeness unless supplied or explicitly approved by the member.
9. Save as `çıktılar/YYYY-MM-DD_tasarim_educational-instagram-post.png`. Never overwrite: append `-v2`, `-v3`, and so on when needed.
10. Reply in Turkish with the file path and one sentence describing the post. Do not publish it.

## Output
- One 1080x1350 PNG educational Instagram post saved under `çıktılar/`.
- Optional short Turkish caption only when the member asks for it.

## Quality Bar
- The feed-view hook is legible at a small size.
- The post teaches one clear idea rather than presenting a dense checklist.
- The visual closely follows the dark espresso, warm-gold, cream, grid, rounded-frame, and circular-shape direction of the latest award business card.
- Generated images contain no required text. Essential Turkish typography is added after generation and is accurate.
- The post contains no watermark, fabricated credential, copyright mark, or platform UI.
- The output is not published and never overwrites an earlier file.

## Rules & Feedback
- Ask for output format and concept direction before starting.
  Why: format and concept determine layout, hierarchy, and whether the asset will work in its intended channel.
  How to apply: do not draft or generate until both are supplied. For this setup, use Instagram portrait (1080x1350) and educational concept after the member confirms them.
- Use `gpt-image-2` for requested social-post visual generation.
  Why: the member specifically selected this model for visual production.
  How to apply: use it only with an explicit request and safely configured credentials; otherwise report the credential blocker without exposing any secret.
- Derive the design line from the latest award business card.
  Why: repeated visual cues make separate assets look like one brand.
  How to apply: preserve its dark espresso base, warm-gold accents, cream type, subtle grid, thin framing, and oversized low-contrast circles while adapting the layout to a 4:5 feed post.
