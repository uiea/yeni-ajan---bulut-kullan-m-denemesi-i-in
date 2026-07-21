import { sql } from "./db.js";

try {
  await sql`
    create table if not exists content_plan (
      id bigint generated always as identity primary key,
      day_number smallint not null unique check (day_number between 1 and 5),
      topic text not null,
      format text not null,
      content_idea text not null,
      call_to_action text not null,
      platforms text not null,
      suggested_publish_time text not null,
      status text not null default 'planned',
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now()
    )
  `;

  const plan = [
    [1, "Yapay zekâ ajanı nedir?", "Carousel", "Chatbot değil, dijital ekip arkadaşı: 5 kısa açıklama.", "İşinizde ilk hangi görevi devretmek isterdiniz?"],
    [2, "Günlük iş akışı", "Kısa video", "Bir ajanın e-posta, araştırma ve görev listesini nasıl hazırladığını göster.", "Bunu ekibinizde kullanır mıydınız?"],
    [3, "Yanlış inanışlar", "Carousel", "Yapay zekâ insanın yerini alır gibi 4 yaygın yanılgı ve gerçekleri.", "Sizce en büyük risk ne?"],
    [4, "Uygulama örneği", "Tek görsel + açıklama", "Bir işletmede müşteri taleplerini sınıflandıran ajan senaryosu.", "Süreçlerinizi birlikte haritalandıralım."],
    [5, "Başlangıç rehberi", "Kontrol listesi postu", "İlk ajanınızı kurmadan önce 5 adım.", "Listeyi kaydedin; ilk adımı bugün atın."],
  ] as const;

  for (const [dayNumber, topic, format, contentIdea, callToAction] of plan) {
    await sql`
      insert into content_plan (
        day_number, topic, format, content_idea, call_to_action, platforms, suggested_publish_time
      ) values (
        ${dayNumber}, ${topic}, ${format}, ${contentIdea}, ${callToAction},
        'Instagram + LinkedIn', '12:00-14:00 veya 19:00-21:00'
      )
      on conflict (day_number) do update set
        topic = excluded.topic,
        format = excluded.format,
        content_idea = excluded.content_idea,
        call_to_action = excluded.call_to_action,
        platforms = excluded.platforms,
        suggested_publish_time = excluded.suggested_publish_time,
        updated_at = now()
    `;
  }

  const savedPlan = await sql`
    select day_number, topic, format, status
    from content_plan
    order by day_number
  `;
  console.table(savedPlan);
} finally {
  await sql.end();
}
