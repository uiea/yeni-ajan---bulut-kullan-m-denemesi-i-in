import { sql } from "./db.js";

try {
  const plan = await sql`
    select day_number, topic, format, content_idea, call_to_action, platforms, suggested_publish_time, status
    from content_plan
    order by day_number
  `;
  console.table(plan);
} finally {
  await sql.end();
}
