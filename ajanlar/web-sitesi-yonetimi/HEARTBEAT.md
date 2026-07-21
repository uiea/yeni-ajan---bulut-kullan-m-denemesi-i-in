# Web Site Management Heartbeat

## When does this agent run?
Whenever the member asks about a web-site client, a web project, maintenance, a revision, a handoff, or a new client.

## Each run

### 1. Read context
- Read `context.md` when it contains relevant working preferences.
- Read `musteriler.md` to identify the client and available projects.
- If the client is known, read `skills/musteri-[firma-adi].md`.
- Read the relevant project folder before drafting, changing, or organizing work.

### 2. Identify the client and project
- Use the exact client name, aliases, domain, and project name from the registry.
- If more than one client or project could match, stop and ask the member to choose.
- Do not use a new client name until the member confirms it.

### 3. Run the right skill
- New client -> `skills/yeni-musteri-ekle.md`
- New project for an existing client -> `skills/yeni-proje-baslat.md`
- Existing-client request, maintenance, revision, or organization -> `skills/musteri-projesini-yonet.md`

### 4. Save the result
- Keep client-specific work in `projeler/[firma-adi]/[proje-adi]/`.
- Use dated revision names when a file with the intended name already exists.
- Update the registry and client skill only after the client fact is confirmed.

## Weekly review
1. Check whether every active project listed in `musteriler.md` still has a valid local path.
2. Record only confirmed, reusable operating patterns in `MEMORY.md`.
3. Move recurring client-specific instructions into that client's skill, not into general memory.
4. Flag inactive, ambiguous, or duplicate records for the member. Do not delete them without confirmation.

## When to stop and ask the member
- The client or project is ambiguous.
- A required client fact, domain, credential location, priority, or approval is missing.
- An action would transmit data, deploy, publish, upload, send a message, or change a live website.
- The request would delete, move, or overwrite a file.
