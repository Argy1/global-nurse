import { useState } from "react";
import { MessageSquare, X, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSubmitChatMessage } from "@/hooks/useChatMessages";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const submitChat = useSubmitChatMessage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      toast({ title: "Please fill in your name and message", variant: "destructive" });
      return;
    }
    submitChat.mutate(
      { visitor_name: name.trim(), visitor_email: email.trim() || undefined, message: message.trim() },
      {
        onSuccess: () => {
          setSubmitted(true);
          setName("");
          setEmail("");
          setMessage("");
        },
        onError: () => {
          toast({ title: "Failed to send message. Please try again.", variant: "destructive" });
        },
      }
    );
  };

  return (
    <>
      {/* Chat toggle button */}
      <button
        onClick={() => { setIsOpen(!isOpen); setSubmitted(false); }}
        className={cn(
          "fixed bottom-20 right-20 z-50 flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-all hover:scale-105 active:scale-95",
          isOpen ? "bg-muted text-foreground" : "bg-primary text-primary-foreground"
        )}
        aria-label="Chat with us"
      >
        {isOpen ? <X className="h-5 w-5" /> : <MessageSquare className="h-5 w-5" />}
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-36 right-4 z-50 w-80 rounded-xl bg-card border border-border shadow-lg animate-slide-up">
          <div className="p-4 border-b border-border bg-primary rounded-t-xl">
            <h3 className="font-bold text-primary-foreground">Chat with Us</h3>
            <p className="text-xs text-primary-foreground/80">We aim to respond within 15 minutes</p>
          </div>
          <div className="p-4">
            {submitted ? (
              <div className="text-center py-4">
                <p className="font-semibold text-foreground mb-1">Message received! ✓</p>
                <p className="text-sm text-muted-foreground">Our team will get back to you shortly.</p>
                <Button variant="outline" size="sm" className="mt-4" onClick={() => setSubmitted(false)}>
                  Send another message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <Input placeholder="Your name *" value={name} onChange={(e) => setName(e.target.value)} maxLength={100} />
                <Input placeholder="Email (optional)" type="email" value={email} onChange={(e) => setEmail(e.target.value)} maxLength={255} />
                <textarea
                  placeholder="How can we help? *"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm min-h-[80px] resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  maxLength={1000}
                />
                <Button type="submit" className="w-full" variant="cta" size="sm" disabled={submitChat.isPending}>
                  {submitChat.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  Send Message
                </Button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
