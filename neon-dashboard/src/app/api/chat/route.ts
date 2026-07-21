import OpenAI from "openai";
import { agents, type AgentId } from "../../../lib/agents";
import { sql } from "../../../lib/db";
import "../../../lib/env";

export async function POST(request: Request) {
  const body = await request.json() as { agentId?: AgentId; message?: string; conversationId?: string; accessCode?: string };
  const agentId = body.agentId;
  const agent = agentId && agents[agentId];
  const message = body.message?.trim();
  const requiredCode = process.env.APP_ACCESS_CODE;

  if (requiredCode && body.accessCode !== requiredCode) return Response.json({ error: "Erişim kodu geçersiz." }, { status: 401 });
  if (!agentId || !agent || !message || message.length > 6000) return Response.json({ error: "Geçerli bir ajan ve mesaj gerekli." }, { status: 400 });
  if (!process.env.OPENAI_API_KEY) return Response.json({ error: "OPENAI_API_KEY yapılandırılmamış." }, { status: 500 });

  const conversationId = body.conversationId || crypto.randomUUID();
  await sql`
    create table if not exists agent_messages (
      id bigint generated always as identity primary key,
      conversation_id uuid not null,
      agent_id text not null,
      role text not null check (role in ('user', 'assistant')),
      content text not null,
      created_at timestamptz not null default now()
    )
  `;
  await sql`insert into agent_messages (conversation_id, agent_id, role, content) values (${conversationId}, ${agentId}, 'user', ${message})`;

  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const response = await client.responses.create({
      model: "gpt-5.6-sol",
      instructions: agent.instructions,
      input: message,
    });
    const answer = response.output_text || "Yanıt üretilemedi.";
    await sql`insert into agent_messages (conversation_id, agent_id, role, content) values (${conversationId}, ${agentId}, 'assistant', ${answer})`;
    return Response.json({ answer, conversationId });
  } catch (error) {
    const status = error instanceof OpenAI.APIError ? error.status : 500;
    const errorMessage = status === 401
      ? "OpenAI API anahtarı geçersiz veya süresi dolmuş. Vercel'deki OPENAI_API_KEY değerini yenileyin."
      : "Ajan yanıtı şu anda oluşturulamadı. Lütfen tekrar deneyin.";
    return Response.json({ error: errorMessage }, { status });
  }
}
