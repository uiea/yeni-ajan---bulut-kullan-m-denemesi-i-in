import { sql } from "./db.js";

try {
  await sql`
    create table if not exists notes (
      id bigint generated always as identity primary key,
      body text not null,
      created_at timestamptz not null default now()
    )
  `;
  console.log("Veritabanı hazır: notes tablosu oluşturuldu veya zaten vardı.");
} finally {
  await sql.end();
}
