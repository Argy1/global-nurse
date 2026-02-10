import { AdminLayout } from "@/components/layout/AdminLayout";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

export default function AdminChatEscalations() {
  const { data: tickets, isLoading: loadingTickets } = useQuery({
    queryKey: ["admin_escalation_tickets"],
    queryFn: async () => {
      const { data, error } = await supabase.from("chat_escalation_tickets" as any).select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data as any[];
    },
  });

  const { data: legacyMessages, isLoading: loadingLegacy } = useQuery({
    queryKey: ["admin_chat_messages"],
    queryFn: async () => {
      const { data, error } = await supabase.from("chat_messages").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const isLoading = loadingTickets || loadingLegacy;

  return (
    <AdminLayout>
      <h1 className="text-2xl font-extrabold text-foreground mb-2">Chat Escalations</h1>
      <p className="text-muted-foreground mb-6">SLA target: respond within 15 minutes</p>
      {isLoading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      ) : (
        <div className="space-y-8">
          {/* Escalation Tickets */}
          <div>
            <h2 className="text-lg font-bold text-foreground mb-4">Escalation Tickets ({tickets?.length || 0})</h2>
            <div className="space-y-4">
              {tickets && tickets.length > 0 ? tickets.map((t: any) => (
                <div key={t.id} className="bg-card rounded-xl p-6 border border-border">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      {t.name && <p className="font-bold text-foreground">{t.name}</p>}
                      {t.email && <p className="text-sm text-muted-foreground">{t.email}</p>}
                      {t.whatsapp && <p className="text-sm text-muted-foreground">{t.whatsapp}</p>}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${t.status === "Open" ? "bg-cta/10 text-cta" : "bg-secondary text-secondary-foreground"}`}>{t.status}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${t.priority === "High" ? "bg-destructive/10 text-destructive" : "bg-muted text-muted-foreground"}`}>{t.priority}</span>
                      <span className="text-xs text-muted-foreground">{new Date(t.created_at).toLocaleString()}</span>
                    </div>
                  </div>
                  <p className="text-foreground">{t.issue_summary}</p>
                  {t.assigned_to && <p className="text-xs text-muted-foreground mt-2">Assigned to: {t.assigned_to}</p>}
                </div>
              )) : (
                <p className="text-center py-8 text-muted-foreground">No escalation tickets yet.</p>
              )}
            </div>
          </div>

          {/* Legacy Chat Messages */}
          {legacyMessages && legacyMessages.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-foreground mb-4">Chat Messages ({legacyMessages.length})</h2>
              <div className="space-y-4">
                {legacyMessages.map((m: any) => (
                  <div key={m.id} className="bg-card rounded-xl p-6 border border-border">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-bold text-foreground">{m.visitor_name}</p>
                        {m.visitor_email && <p className="text-sm text-muted-foreground">{m.visitor_email}</p>}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${m.status === "new" ? "bg-cta/10 text-cta" : "bg-secondary text-secondary-foreground"}`}>{m.status}</span>
                        <span className="text-xs text-muted-foreground">{new Date(m.created_at).toLocaleString()}</span>
                      </div>
                    </div>
                    <p className="text-foreground">{m.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </AdminLayout>
  );
}
