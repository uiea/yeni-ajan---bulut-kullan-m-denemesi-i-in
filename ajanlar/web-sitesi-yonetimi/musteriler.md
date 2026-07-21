# Web Site Client Registry

This is the local index of confirmed web-site clients. It is not a place for secrets. Each client
must have a dedicated skill and a folder under `projeler/`.

| Client | Slug | Client skill | Client folder | Active projects | Status | Last confirmed |
|--------|------|--------------|---------------|-----------------|--------|----------------|
| ASELSAN | `aselsan` | `skills/musteri-aselsan.md` | `projeler/aselsan/` | `kurumsal-web-sitesi` | Target client | 2026-07-19 |
| Turkcell | `turkcell` | `skills/musteri-turkcell.md` | `projeler/turkcell/` | - | Target client | 2026-07-19 |
| Türk Telekom | `turk-telekom` | `skills/musteri-turk-telekom.md` | `projeler/turk-telekom/` | - | Target client | 2026-07-19 |

## Operating rules

- Add a row only after the member confirms the client identity.
- Use lowercase ASCII slugs with hyphens, for example `acme-danismanlik`.
- Keep domains, brand facts, contacts, scope, and working preferences in the client's skill.
- Never put passwords, API keys, tokens, or private credentials in this file.
- Add each new project to the matching client row and create its own folder below `projeler/[client-slug]/`.
