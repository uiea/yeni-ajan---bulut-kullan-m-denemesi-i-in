import { sql } from "./db.js";

try {
  const [note] = await sql`
    insert into notes (body) values ('Neon bağlantısı çalışıyor.')
    returning id, body, created_at
  `;
  console.log("Eklenen not:", note);

  const notes = await sql`
    select id, body, created_at
    from notes
    order by created_at desc
    limit 5
  `;
  console.table(notes);
} finally {
  await sql.end();
}
