# Client Skill: [Client Name]

## Purpose
Provide the confirmed operating context for [Client Name] so all web-site work is routed to the correct client and project.

## When to Use This Skill
- The member names [Client Name], its confirmed alias, or its domain.
- The request concerns a project listed for [Client Name] in `musteriler.md`.

## Do NOT Use This Skill For
- A different client or an ambiguous company name -> check `musteriler.md` and ask the member to choose.
- Creating a new client record -> use `yeni-musteri-ekle.md`.

## Serves Goal
- Keep client context retrievable.
- Route work to the right client.

## Client identity
- Legal or display name: [confirmed name]
- Slug: [client-slug]
- Aliases and domain: [confirmed aliases]
- Client folder: `projeler/[client-slug]/`

## Confirmed context
- Business and audience: [confirmed information]
- Brand and tone: [confirmed information]
- Services and scope: [confirmed information]
- Contacts and approval path: [names/roles only, no private credentials]
- Credential references: [vault or approved local reference only, never secret values]

## Projects

| Project | Folder | Status | Notes |
|---------|--------|--------|-------|

## Process
1. Confirm that the request matches this client by name, alias, domain, or project folder.
2. Read the matching project files before preparing work.
3. Keep all new local work under this client's project folder.
4. Ask the member when an instruction conflicts with this skill or when the project is unclear.
5. Record confirmed, durable client changes here and update `musteriler.md` to match.

## Rules & Feedback
- Never mix this client's files, content, credentials, or brand details with another client.
  Why: client isolation prevents delivery and privacy mistakes.
  How to apply: verify the client slug before reading or saving any project file.
- Never store secrets in this skill.
  Why: skills are readable operational documents, not secure secret storage.
  How to apply: store only a reference to an approved secret manager or local secure location.
