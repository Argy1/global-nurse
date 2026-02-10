import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Loader2, User, ArrowRight, MessageCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSetting } from "@/hooks/useSiteSettings";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

/* ── Types ── */
interface ChatMsg {
  id: string;
  role: "user" | "bot" | "system";
  text: string;
  links?: { label: string; href: string }[];
}

interface FaqRow {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const QUICK_REPLIES = [
  { label: "How to start?", keywords: ["start", "begin", "register", "join", "how"] },
  { label: "English requirements", keywords: ["english", "ielts", "oet", "language", "speaking"] },
  { label: "Licensing overview", keywords: ["license", "licensing", "nclex", "cgfns", "credential"] },
  { label: "Register help", keywords: ["register", "sign up", "application", "form"] },
  { label: "Talk to human", keywords: [] },
];

/* ── FAQ keyword search ── */
function searchFaq(faqs: FaqRow[], query: string): FaqRow | null {
  const q = query.toLowerCase();
  const words = q.split(/\s+/).filter((w) => w.length > 2);

  let best: FaqRow | null = null;
  let bestScore = 0;

  for (const faq of faqs) {
    const haystack = `${faq.question} ${faq.answer} ${faq.category}`.toLowerCase();
    let score = 0;
    for (const w of words) {
      if (haystack.includes(w)) score++;
    }
    if (score > bestScore) {
      bestScore = score;
      best = faq;
    }
  }
  return bestScore > 0 ? best : null;
}

/* ── Quickstart chapter links for enrichment ── */
const QUICKSTART_LINKS: Record<string, { label: string; href: string }[]> = {
  english: [{ label: "English Proficiency Guide", href: "/quickstart#english-requirements" }],
  ielts: [{ label: "English Proficiency Guide", href: "/quickstart#english-requirements" }],
  oet: [{ label: "English Proficiency Guide", href: "/quickstart#english-requirements" }],
  license: [{ label: "Licensing Pathway Overview", href: "/quickstart#licensing-overview" }],
  licensing: [{ label: "Licensing Pathway Overview", href: "/quickstart#licensing-overview" }],
  nclex: [{ label: "NCLEX Preparation", href: "/quickstart#licensing-overview" }],
  cgfns: [{ label: "CGFNS & VisaScreen", href: "/quickstart#licensing-overview" }],
  register: [{ label: "Register Now", href: "/register" }],
  start: [{ label: "Quickstart Guide", href: "/quickstart" }],
  begin: [{ label: "Quickstart Guide", href: "/quickstart" }],
};

function getRelevantLinks(query: string): { label: string; href: string }[] {
  const q = query.toLowerCase();
  const links: { label: string; href: string }[] = [];
  const seen = new Set<string>();
  for (const [keyword, items] of Object.entries(QUICKSTART_LINKS)) {
    if (q.includes(keyword)) {
      for (const item of items) {
        if (!seen.has(item.href)) {
          seen.add(item.href);
          links.push(item);
        }
      }
    }
  }
  return links;
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMsg[]>([
    { id: "welcome", role: "bot", text: "Hi! 👋 I'm here to help you learn about working abroad as a nurse. What would you like to know?" },
  ]);
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"chat" | "handoff" | "submitted">("chat");
  const [handoffForm, setHandoffForm] = useState({ name: "", email: "", whatsapp: "", issue_summary: "" });
  const scrollRef = useRef<HTMLDivElement>(null);

  const { value: whatsappLink } = useSetting("whatsapp_direct_chat_link");
  const { value: supportEmail } = useSetting("support_email");
  const whatsappHref = whatsappLink ?? "mailto:globalparo@gmail.com";
  const emailAddr = supportEmail ?? "globalparo@gmail.com";

  /* Fetch FAQs */
  const { data: faqs } = useQuery({
    queryKey: ["faq_items_chat"],
    queryFn: async () => {
      const { data, error } = await supabase.from("faq_items").select("*").order("priority", { ascending: true });
      if (error) throw error;
      return data as FaqRow[];
    },
  });

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

  /* ── Handle message ── */
  const addMsg = (msg: ChatMsg) => setMessages((p) => [...p, msg]);
  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

  const handleSend = (text?: string) => {
    const q = (text ?? input).trim();
    if (!q) return;
    setInput("");

    addMsg({ id: uid(), role: "user", text: q });

    // Check for human handoff
    if (q.toLowerCase().includes("talk to human") || q.toLowerCase().includes("speak to someone") || q.toLowerCase().includes("human")) {
      setMode("handoff");
      addMsg({ id: uid(), role: "bot", text: "I'll connect you with our support team. Please fill out the short form below." });
      return;
    }

    // Search FAQ
    const faqMatch = searchFaq(faqs ?? [], q);
    const links = getRelevantLinks(q);

    if (faqMatch) {
      addMsg({ id: uid(), role: "bot", text: faqMatch.answer, links: links.length > 0 ? links : undefined });
    } else {
      // No match — suggest human
      addMsg({
        id: uid(),
        role: "bot",
        text: "I'm not sure I have the right answer for that. Would you like to speak with our support team?",
        links: [{ label: "Talk to human", href: "#handoff" }],
      });
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
        onClick={() => { setIsOpen(!isOpen); }}
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
            <h3 className="font-bold text-primary-foreground text-sm">Chat Support</h3>
            <p className="text-[11px] text-primary-foreground/70">AI-powered FAQ • Human handoff available</p>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-3 min-h-[200px] max-h-[300px]">
            {messages.map((msg) => (
              <div key={msg.id} className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}>
                <div className={cn(
                  "max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed",
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground"
                )}>
                  <p>{msg.text}</p>
                  {msg.links && msg.links.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {msg.links.map((l) =>
                        l.href === "#handoff" ? (
                          <button
                            key={l.label}
                            onClick={() => { setMode("handoff"); addMsg({ id: uid(), role: "bot", text: "Please fill out the form below to connect with our team." }); }}
                            className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full hover:bg-primary/20 transition-colors"
                          >
                            {l.label}
                          </button>
                        ) : (
                          <a
                            key={l.href}
                            href={l.href}
                            className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full hover:bg-primary/20 transition-colors"
                          >
                            {l.label} →
                          </a>
                        )
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}

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
            {/* Quick replies — show only if in chat mode and few messages */}
            {mode === "chat" && messages.length <= 3 && (
              <div className="flex flex-wrap gap-1.5">
                {QUICK_REPLIES.map((qr) => (
                  <button
                    key={qr.label}
                    onClick={() => handleSend(qr.label)}
                    className="text-[11px] bg-secondary text-secondary-foreground px-2.5 py-1 rounded-full hover:bg-primary/10 hover:text-primary transition-colors font-medium"
                  >
                    {qr.label}
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
                />
                <Button type="submit" size="sm" variant="default" className="h-8 w-8 p-0 shrink-0">
                  <Send className="h-3.5 w-3.5" />
                </Button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
