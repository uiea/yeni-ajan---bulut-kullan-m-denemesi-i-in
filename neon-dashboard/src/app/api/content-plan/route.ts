import { sql } from "../../../lib/db";

export async function GET() {
  try {
    const plan = await sql`
      select day_number, topic, format, content_idea, call_to_action, platforms, suggested_publish_time, status
      from content_plan order by day_number
    `;
    return Response.json(plan);
  } catch (error) {
    return Response.json({ error: "İçerik planı şu anda kullanılamıyor. DATABASE_URL ayarlandığında tekrar deneyin." }, { status: 503 });
  }
}
