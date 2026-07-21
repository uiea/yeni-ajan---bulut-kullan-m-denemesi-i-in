import { sql } from "../../../lib/db";

export async function GET() {
  const plan = await sql`
    select day_number, topic, format, content_idea, call_to_action, platforms, suggested_publish_time, status
    from content_plan order by day_number
  `;
  return Response.json(plan);
}
