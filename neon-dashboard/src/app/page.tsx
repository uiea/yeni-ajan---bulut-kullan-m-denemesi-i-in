"use client";

import { FormEvent, useEffect, useState } from "react";
import { agents, type AgentId } from "../lib/agents";

type PlanItem = { day_number: number; topic: string; format: string; status: string };
type Message = { role: "user" | "assistant"; content: string };

export default function Home() {
  const [agentId, setAgentId] = useState<AgentId>("sosyal-medya");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [plan, setPlan] = useState<PlanItem[]>([]);
  const [conversationId, setConversationId] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => { fetch("/api/content-plan").then((r) => r.ok ? r.json() : []).then(setPlan).catch(() => setPlan([])); }, []);

  async function send(event: FormEvent) {
    event.preventDefault();
    if (!message.trim() || loading) return;
    const text = message.trim();
    setMessages((current) => [...current, { role: "user", content: text }]);
    setMessage(""); setLoading(true);
    try {
      const response = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ agentId, message: text, conversationId: conversationId || undefined, accessCode }) });
      const raw = await response.text();
      let data: { answer?: string; conversationId?: string; error?: string };
      try { data = JSON.parse(raw); }
      catch { throw new Error("Sunucu geçersiz bir yanıt döndürdü. Lütfen daha sonra tekrar deneyin."); }
      if (!response.ok) throw new Error(data.error || "İstek tamamlanamadı.");
      const answer = data.answer;
      const returnedConversationId = data.conversationId;
      if (!answer || !returnedConversationId) throw new Error("Sunucu eksik bir yanıt döndürdü.");
      setConversationId(returnedConversationId);
      setMessages((current) => [...current, { role: "assistant", content: answer }]);
    } catch (error) { setMessages((current) => [...current, { role: "assistant", content: error instanceof Error ? error.message : "Beklenmeyen hata." }]); }
    finally { setLoading(false); }
  }

  return <main>
    <header><p className="eyebrow">AJAN MERKEZİ · NEON</p><h1>İşlerin için tek ekran</h1><p className="intro">Bir ajan seç, isteğini yaz; konuşma geçmişi Neon’da saklansın.</p></header>
    <div className="layout">
      <section className="panel chat"><h2>Ajanla konuş</h2><div className="agent-tabs">{(Object.keys(agents) as AgentId[]).map((id) => <button className={id === agentId ? "active" : ""} onClick={() => setAgentId(id)} key={id}>{agents[id].name}</button>)}</div>
        <p className="agent-description">{agents[agentId].description}</p>
        <div className="messages">{messages.length === 0 && <p className="empty">Örnek: “Bu hafta için 5 günlük Instagram içerik planı hazırla.”</p>}{messages.map((item, index) => <p className={`message ${item.role}`} key={index}>{item.content}</p>)}{loading && <p className="message assistant">Düşünüyor…</p>}</div>
        <form onSubmit={send}><input type="password" value={accessCode} onChange={(e) => setAccessCode(e.target.value)} placeholder="Erişim kodu (varsa)" /><textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Ajanına ne yapmak istediğini yaz…" rows={4} /><button className="send" disabled={loading}>Gönder</button></form>
      </section>
      <aside className="panel"><h2>İçerik planı</h2>{plan.length ? <ol className="plan">{plan.map((item) => <li key={item.day_number}><span>Gün {item.day_number}</span><strong>{item.topic}</strong><small>{item.format} · {item.status}</small></li>)}</ol> : <p className="empty">Plan yüklenemedi.</p>}</aside>
    </div>
  </main>;
}
