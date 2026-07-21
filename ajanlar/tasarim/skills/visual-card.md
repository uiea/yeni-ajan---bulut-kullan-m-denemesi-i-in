# Skill: Create a Business Card

## Purpose
Create one proper horizontal business card from the member's context and, when provided, a source photo or screenshot.

## When to Use This Skill
- "bir business card yap"
- "bir kartvizit gibi gorsel yap"
- "kendimi tanitan bir kart hazirla"
- "ilk is kartimi uret"
- "bu fotografla bir kart hazirla"
- "LinkedIn icin gorsel yap"
- "Skool'da kendimi tanitacagim kart lazim"
- "ilk business card ciktimi uret"
- "bunu nasil yaptin, aynisini benim icin yap"

## Do NOT Use This Skill For
- Full websites or apps -> this agent should stop and say it only creates business-card style visuals.
- Full slide decks or presentations -> this agent should stop and keep the scope to one card.
- Real AI image generation through paid APIs -> only do that if the member explicitly asks and safe credentials are already configured.
- Publishing or sending the card -> show the final file and wait for explicit approval.

## Serves Goal
- Produce a useful first business card.
- Keep the first design workflow simple.
- Make the workspace feel concrete.

## Inputs
- Member context: `context.md`
- Source image path, if provided by the member
- Existing files in `çıktılar/`
- This agent's `MEMORY.md`

## Process
1. Read `context.md` and identify the member's route, audience, and immediate goal.
2. Parse the card request into five decisions: name/working name, role/direction, motto or purpose line, portrait source, and destination filename. Ask at most two short questions before drafting:
   - "Kartta hangi isim yazsın?"
   - "Motto'n / yaşam amacın / topluluktaki amacın tek cümle ne olsun?"
   If the member already gave enough context, infer role/direction from `context.md` and only ask for the missing name or motto.
3. If a source image is provided, inspect it before using it. Check for public-facing risk: private finance, health, legal, customer details, internal team decisions, secrets, or any "real name + private decision" combination.
4. Default format is a horizontal business card, not a vertical social card:
   - PNG at 1400x800 or 1050x600 for photo-based cards. This keeps a real business-card ratio close to 3.5:2.
   - SVG with the same horizontal ratio when no source photo is needed.
   - Avoid 1080x1350 unless the member explicitly asks for a social post.
5. Use this default layout unless the member asks otherwise:
   - One clean canvas with one background color, one text color, and one accent color.
   - Left side: square or rounded-square portrait crop from the source image. Crop around the head and shoulders; do not use the whole photo as a background.
   - Right side: name, role, motto/purpose line, and a compact contact block.
   - Optional: 1-2 small tags only if they help the card. Avoid tool labels like `çıktılar/`, `context.md`, or `Claude Code` on the final business card.
6. If contact details are missing, use tasteful placeholders so the card still looks complete:
   - Email: `merhaba@ornek.com`
   - Phone: `+90 555 000 00 00`
   - Website: `ornek-site.com`
   - Address only if the card has space: `Ornek Mah. Demo Sok. No: 12, Istanbul`
   These are placeholders, not real private data. Keep them visually quiet.
7. For PNG cards, use a local image workflow like Python/Pillow: create a horizontal canvas, crop the portrait into a square, place it on the left, then set a strong name/role/motto hierarchy on the right.
8. Keep the design focused. One business card gets one professional identity and one purpose line. Do not crowd it with a bio, long paragraph, QR code, random address, or full service menu unless the member asks.
9. Save the result to `çıktılar/YYYY-MM-DD_tasarim_business-card.png` or `.svg`. Never overwrite.
10. Reply in Turkish with the file path and a short explanation. If the member asks "how did you make it?", explain the pipeline plainly: inspected the photo, cropped a square portrait, built a horizontal card, placed name/role/motto, saved as a local file.

## Output
- A saved business-card style visual under `çıktılar/`.
- Optional short explanation in the chat.
- Optional notes file only when the member asks for documentation.

## Quality Bar
- The card uses a horizontal business-card ratio, roughly 7:4.
- A supplied portrait/photo is cropped into a square or rounded-square area, usually on the left.
- Text never sits on top of the face.
- The hierarchy is clear: name, role, motto/purpose line, optional contact block.
- Use at most three type sizes: large name, medium role/motto, small contact.
- Use one alignment principle, preferably left-aligned for readability.
- Leave at least 25-35% of the card visually empty. A crowded card fails even if all text fits.
- Missing contact details can use safe placeholders so the card looks complete.
- The file opens without a server, API key, external account, or paid tool.
- Public-facing sensitive details are removed or replaced with fictional analogs.
- No em dash is used in member-facing text.
- Dot/grid backgrounds are very subtle and must not compete with text. Keep them low opacity, especially behind the content area.

## Rules & Feedback
- Default to local generation, not external image APIs.
  Why: the first lesson must not depend on credits, API keys, or account differences.
  How to apply: choose PNG/SVG/HTML outputs unless the member explicitly requests an API-backed image model.
- Make it feel like a business card, not a quote post or vertical social post.
  Why: the first output should make the member feel closer to having a real professional identity or offer.
  How to apply: use a horizontal ratio, portrait block, name/role/motto/contact hierarchy, and avoid generic motivational text.
- Remove system-training labels from the final card.
  Why: `çıktılar/`, `context.md`, and similar labels teach the lesson but make the artifact look amateur.
  How to apply: explain those labels verbally or in the lesson, not on the member's business card.
- Prefer a real supplied photo when available.
  Why: members feel more ownership when the result uses their own material.
  How to apply: use the photo as the background or focal image, then design around it.
- Ask for name and motto/purpose first, not contact details.
  Why: the first member card should feel personal without forcing them to provide private information.
  How to apply: ask for the display name and one motto/life-purpose/community-purpose sentence; use safe contact placeholders if real contact is missing.
- Ask at most two clarifying questions before the first draft.
  Why: the first output should feel fast and concrete.
  How to apply: if the goal is unclear, pick a safe default and make a draft.
- Keep public-facing cards safe.
  Why: cards, slides, and social visuals can leak private workspace details.
  How to apply: remove private finance, health, legal, customer, team, and secret details before designing.
- Never overwrite outputs.
  Why: the member should see progress and versions.
  How to apply: if the filename exists, append `-v2`, `-v3`, etc.
