# Skill: Add a New Client

## Purpose
Create one confirmed client's skill, registry entry, and local client folder without mixing it with existing clients.

## When to Use This Skill
- "Yeni web sitesi müşterisi ekle"
- "Bu firmayı müşteri olarak tanımla"
- "[Firma adı] için müşteri alanı aç"

## Do NOT Use This Skill For
- Starting another project for a client already in the registry -> use `yeni-proje-baslat.md`.
- Doing work for an existing project -> use `musteri-projesini-yonet.md`.

## Serves Goal
- Keep client context retrievable.
- Route work to the right client.

## Inputs
- The confirmed client name.
- At minimum, one identifier: domain, primary contact role, or clear business description.
- Confirmed brand, scope, and approval details when available.

## Process
1. Search `musteriler.md` for the proposed name, aliases, and domain to prevent duplicates.
2. If a potential match exists, show it and ask the member whether it is the same client.
3. Propose a lowercase ASCII client slug and show the planned skill and folder paths.
4. After explicit approval, create `skills/musteri-[client-slug].md` from `_musteri-skill-sablonu.md` and create `projeler/[client-slug]/`.
5. Add one row to `musteriler.md` with the client name, slug, skill path, folder path, and status.
6. Record only confirmed facts. Mark unknown fields as `To be confirmed` instead of guessing.
7. If the member also has a project, continue with `yeni-proje-baslat.md`.

## Output
- One dedicated client skill.
- One client folder in `projeler/`.
- One registry row.

## Quality Bar
- The client has one unique slug, one skill, and one folder.
- No secrets appear in any created file.
- The registry path and skill path match exactly.

## Rules & Feedback
- Confirm identity before creating a client record.
  Why: duplicate clients make routing unreliable.
  How to apply: check names, aliases, and domain against the registry first.
- Never silently merge two client records.
  Why: similar company names can belong to different businesses.
  How to apply: ask the member whenever a match is not exact.
