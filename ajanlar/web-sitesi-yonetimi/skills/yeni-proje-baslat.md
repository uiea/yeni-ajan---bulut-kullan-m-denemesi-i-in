# Skill: Start a New Project

## Purpose
Create a consistent local workspace for a new web-site project belonging to one confirmed client.

## When to Use This Skill
- "[Firma] için yeni web sitesi projesi başlat"
- "Bu müşteri için yeni landing page aç"
- "[Proje adı] klasörünü oluştur"

## Do NOT Use This Skill For
- Adding a new client -> use `yeni-musteri-ekle.md` first.
- Routine work in an existing project -> use `musteri-projesini-yonet.md`.

## Serves Goal
- Keep project files organized.

## Inputs
- Confirmed client slug and client skill.
- Project name, scope, and current status.
- Any confirmed domain, repository, platform, or delivery deadline references.

## Process
1. Read `musteriler.md` and the client's skill to confirm the client and check for duplicate project names.
2. Propose a lowercase ASCII project slug and the folder `projeler/[client-slug]/[project-slug]/`.
3. After explicit approval, create the project folder from `projeler/_proje-sablonu/`.
4. Fill the starter files with confirmed information only. Keep unknown fields marked `To be confirmed`.
5. Add the project to the client's skill and update the active-projects cell in `musteriler.md`.
6. Save all future drafts, assets, notes, source files, and delivery records inside this project folder.

## Output
- One project folder with standard documentation files.
- A matching project reference in the client skill and registry.

## Quality Bar
- The project path is unique and belongs to the correct client folder.
- The brief names a concrete scope or explicitly marks scope as pending.
- No secret values are stored in project documentation.

## Rules & Feedback
- One project belongs to one client folder.
  Why: a single canonical location prevents lost or mixed files.
  How to apply: never create a project directly below `projeler/`.
- Preserve revisions instead of overwriting.
  Why: web work needs an audit trail and safe rollback.
  How to apply: use dated or versioned filenames for replaced drafts.
