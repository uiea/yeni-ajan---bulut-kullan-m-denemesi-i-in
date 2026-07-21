import { sql } from "./db.js";

try {
  await sql.begin(async (transaction) => {
    await transaction`delete from content_plan where day_number = 2`;
    await transaction`
      insert into content_plan (
        day_number, topic, format, content_idea, call_to_action, platforms, suggested_publish_time, status
      ) values (2, '9', '9', '9', '9', '9', '9', 'planned')
    `;
  });

  const [saved] = await sql`
    select day_number, topic, format, content_idea, call_to_action, platforms, suggested_publish_time, status
    from content_plan
    where day_number = 2
  `;
  console.log("2. gün kaydı:", saved);
} finally {
  await sql.end();
}
