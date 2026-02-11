import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Loader2, User, MessageCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSetting } from "@/hooks/useSiteSettings";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

/* ── Types ── */
interface ChatMsg {
  id: string;
  role: "user" | "assistant";
  text: string;
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

const QUICK_REPLIES = [
  "How do I start working abroad as a nurse?",
  "What English tests do I need?",
  "Tell me about licensing (NCLEX)",
  "How do I register?",
  "Talk to human",
];

/* ── Streaming helper ── */
async function streamChat({
  messages,
  onDelta,
  onDone,
  onError,
}: {
  messages: { role: string; content: string }[];
  onDelta: (text: string) => void;
  onDone: () => void;
  onError: (msg: string) => void;
}) {
  const resp = await fetch(CHAT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: JSON.stringify({ messages }),
  });

  if (!resp.ok) {
    const errBody = await resp.text();
    try {
      const parsed = JSON.parse(errBody);
      onError(parsed.error || "Terjadi kesalahan.");
    } catch {
      onError("Terjadi kesalahan menghubungi AI.");
    }
    onDone();
    return;
  }

  if (!resp.body) {
    onError("Tidak ada respons dari server.");
    onDone();
    return;
  }

  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    let newlineIndex: number;
    while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
      let line = buffer.slice(0, newlineIndex);
      buffer = buffer.slice(newlineIndex + 1);
      if (line.endsWith("\r")) line = line.slice(0, -1);
      if (line.startsWith(":") || line.trim() === "") continue;
      if (!line.startsWith("data: ")) continue;

      const jsonStr = line.slice(6).trim();
      if (jsonStr === "[DONE]") {
        onDone();
        return;
      }

      try {
        const parsed = JSON.parse(jsonStr);
        const content = parsed.choices?.[0]?.delta?.content as string | undefined;
        if (content) onDelta(content);
      } catch {
        buffer = line + "\n" + buffer;
        break;
      }
    }
  }

  // Final flush
  if (buffer.trim()) {
    for (let raw of buffer.split("\n")) {
      if (!raw) continue;
      if (raw.endsWith("\r")) raw = raw.slice(0, -1);
      if (raw.startsWith(":") || raw.trim() === "") continue;
      if (!raw.startsWith("data: ")) continue;
      const jsonStr = raw.slice(6).trim();
      if (jsonStr === "[DONE]") continue;
      try {
        const parsed = JSON.parse(jsonStr);
        const content = parsed.choices?.[0]?.delta?.content as string | undefined;
        if (content) onDelta(content);
      } catch { /* ignore */ }
    }
  }

  onDone();
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMsg[]>([
    { id: "welcome", role: "assistant", text: "Hi! 👋 I'm Global Paro's AI assistant. I can help you learn about working abroad as a nurse. What would you like to know?" },
  ]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [mode, setMode] = useState<"chat" | "handoff" | "submitted">("chat");
  const [handoffForm, setHandoffForm] = useState({ name: "", email: "", whatsapp: "", issue_summary: "" });
  const scrollRef = useRef<HTMLDivElement>(null);

  const { value: whatsappLink } = useSetting("whatsapp_direct_chat_link");
  const { value: supportEmail } = useSetting("support_email");
  const whatsappHref = whatsappLink ?? "mailto:globalparo@gmail.com";
  const emailAddr = supportEmail ?? "globalparo@gmail.com";

  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

  /* Create escalation ticket */
  const createTicket = useMutation({
    mutationFn: async (ticket: { name?: string; email?: string; whatsapp?: string; issue_summary: string }) => {
      const { data, error } = await supabase
        .from("chat_escalation_tickets")
        .insert(ticket)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
  });

  /* Auto-scroll */
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, mode]);

  /* ── Handle send ── */
  const handleSend = async (text?: string) => {
    const q = (text ?? input).trim();
    if (!q || isStreaming) return;
    setInput("");

    // Check for human handoff
    if (q.toLowerCase().includes("talk to human") || q.toLowerCase().includes("speak to someone") || q.toLowerCase().includes("bicara dengan manusia")) {
      setMessages((p) => [...p, { id: uid(), role: "user", text: q }]);
      setMode("handoff");
      setMessages((p) => [...p, { id: uid(), role: "assistant", text: "I'll connect you with our support team. Please fill out the short form below." }]);
      return;
    }

    const userMsg: ChatMsg = { id: uid(), role: "user", text: q };
    setMessages((p) => [...p, userMsg]);
    setIsStreaming(true);

    // Build conversation history for AI (last 10 messages for context)
    const historyForAI = [...messages, userMsg]
      .filter((m) => m.id !== "welcome")
      .slice(-10)
      .map((m) => ({ role: m.role as string, content: m.text }));

    let assistantSoFar = "";
    const assistantId = uid();

    try {
      await streamChat({
        messages: historyForAI,
        onDelta: (chunk) => {
          assistantSoFar += chunk;
          setMessages((prev) => {
            const last = prev[prev.length - 1];
            if (last?.id === assistantId) {
              return prev.map((m) => (m.id === assistantId ? { ...m, text: assistantSoFar } : m));
            }
            return [...prev, { id: assistantId, role: "assistant", text: assistantSoFar }];
          });
        },
        onDone: () => setIsStreaming(false),
        onError: (msg) => {
          toast({ title: msg, variant: "destructive" });
          setMessages((prev) => [...prev, { id: uid(), role: "assistant", text: "Maaf, terjadi kesalahan. Silakan coba lagi atau hubungi tim support kami." }]);
          setIsStreaming(false);
        },
      });
    } catch (e) {
      console.error(e);
      setIsStreaming(false);
      setMessages((prev) => [...prev, { id: uid(), role: "assistant", text: "Maaf, tidak bisa menghubungi AI saat ini. Silakan coba lagi nanti." }]);
    }
  };

  const handleHandoffSubmit = () => {
    if (!handoffForm.issue_summary.trim()) {
      toast({ title: "Please describe your issue", variant: "destructive" });
      return;
    }
    createTicket.mutate(
      {
        name: handoffForm.name.trim() || undefined,
        email: handoffForm.email.trim() || undefined,
        whatsapp: handoffForm.whatsapp.trim() || undefined,
        issue_summary: handoffForm.issue_summary.trim(),
      },
      {
        onSuccess: () => setMode("submitted"),
        onError: () => toast({ title: "Failed to submit. Please try again.", variant: "destructive" }),
      }
    );
  };

  return (
    <>
      {/* Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-20 right-20 z-50 flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-all hover:scale-105 active:scale-95",
          isOpen ? "bg-muted text-foreground" : "bg-primary text-primary-foreground"
        )}
        aria-label="Chat with us"
      >
        {isOpen ? <X className="h-5 w-5" /> : <MessageSquare className="h-5 w-5" />}
      </button>

      {/* Panel */}
      {isOpen && (
        <div className="fixed bottom-36 right-4 z-50 w-[340px] max-h-[500px] flex flex-col rounded-xl bg-card border border-border shadow-lg animate-slide-up">
          {/* Header */}
          <div className="p-4 border-b border-border bg-primary rounded-t-xl shrink-0">
            <h3 className="font-bold text-primary-foreground text-sm">AI Chat Support</h3>
            <p className="text-[11px] text-primary-foreground/70">Powered by AI • Human handoff available</p>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-3 min-h-[200px] max-h-[300px]">
            {messages.map((msg) => (
              <div key={msg.id} className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}>
                <div className={cn(
                  "max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed whitespace-pre-wrap",
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground"
                )}>
                  {msg.text}
                </div>
              </div>
            ))}

            {isStreaming && messages[messages.length - 1]?.role === "user" && (
              <div className="flex justify-start">
                <div className="bg-muted text-foreground rounded-xl px-3 py-2 text-sm">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              </div>
            )}

            {/* Handoff form */}
            {mode === "handoff" && (
              <div className="bg-secondary/50 rounded-xl p-3 space-y-2 border border-border">
                <p className="text-xs font-semibold text-foreground">Connect with our team</p>
                <Input placeholder="Name (optional)" value={handoffForm.name} onChange={(e) => setHandoffForm((p) => ({ ...p, name: e.target.value }))} maxLength={100} className="h-8 text-xs" />
                <Input placeholder="Email (optional)" type="email" value={handoffForm.email} onChange={(e) => setHandoffForm((p) => ({ ...p, email: e.target.value }))} maxLength={255} className="h-8 text-xs" />
                <Input placeholder="WhatsApp (optional)" value={handoffForm.whatsapp} onChange={(e) => setHandoffForm((p) => ({ ...p, whatsapp: e.target.value }))} maxLength={20} className="h-8 text-xs" />
                <textarea
                  placeholder="Describe your issue *"
                  value={handoffForm.issue_summary}
                  onChange={(e) => setHandoffForm((p) => ({ ...p, issue_summary: e.target.value }))}
                  className="w-full rounded-lg border border-input bg-background px-2 py-1.5 text-xs min-h-[60px] resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  maxLength={1000}
                />
                <Button size="sm" variant="cta" className="w-full h-8 text-xs" onClick={handleHandoffSubmit} disabled={createTicket.isPending}>
                  {createTicket.isPending ? <Loader2 className="h-3 w-3 animate-spin" /> : <Send className="h-3 w-3" />}
                  Submit to Support
                </Button>
              </div>
            )}

            {/* Submitted confirmation */}
            {mode === "submitted" && (
              <div className="bg-accent/10 rounded-xl p-3 space-y-2 border border-accent/30 text-center">
                <p className="text-sm font-semibold text-foreground">Ticket submitted ✓</p>
                <p className="text-xs text-muted-foreground">A human will respond within 15 minutes. You may also reach us directly:</p>
                <div className="flex gap-2 justify-center">
                  <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-primary hover:underline">
                    <MessageCircle className="h-3 w-3" /> WhatsApp
                  </a>
                  <a href={`mailto:${emailAddr}`} className="flex items-center gap-1 text-xs text-primary hover:underline">
                    <Mail className="h-3 w-3" /> Email
                  </a>
                </div>
                <Button variant="outline" size="sm" className="text-xs h-7 mt-1" onClick={() => { setMode("chat"); setHandoffForm({ name: "", email: "", whatsapp: "", issue_summary: "" }); }}>
                  Continue chatting
                </Button>
              </div>
            )}
          </div>

          {/* Quick replies + input */}
          <div className="border-t border-border p-3 shrink-0 space-y-2">
            {mode === "chat" && messages.length <= 2 && (
              <div className="flex flex-wrap gap-1.5">
                {QUICK_REPLIES.map((qr) => (
                  <button
                    key={qr}
                    onClick={() => handleSend(qr)}
                    className="text-[11px] bg-secondary text-secondary-foreground px-2.5 py-1 rounded-full hover:bg-primary/10 hover:text-primary transition-colors font-medium"
                  >
                    {qr}
                  </button>
                ))}
              </div>
            )}
            {mode === "chat" && (
              <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question..."
                  className="flex-1 h-8 text-xs"
                  maxLength={500}
                  disabled={isStreaming}
                />
                <Button type="submit" size="sm" variant="default" className="h-8 w-8 p-0 shrink-0" disabled={isStreaming}>
                  {isStreaming ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
                </Button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
