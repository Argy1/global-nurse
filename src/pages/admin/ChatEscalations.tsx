import { AdminLayout } from "@/components/layout/AdminLayout";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

export default function AdminChatEscalations() {
  const { data: messages, isLoading } = useQuery({
    queryKey: ["admin_chat_messages"],
    queryFn: async () => {
      const { data, error } = await supabase.from("chat_messages").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  return (
    <AdminLayout>
      <h1 className="text-2xl font-extrabold text-foreground mb-2">Chat Escalations</h1>
      <p className="text-muted-foreground mb-6">SLA target: respond within 15 minutes</p>
      {isLoading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      ) : (
        <div className="space-y-4">
          {messages && messages.length > 0 ? messages.map((m: any) => (
            <div key={m.id} className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-bold text-foreground">{m.visitor_name}</p>
                  {m.visitor_email && <p className="text-sm text-muted-foreground">{m.visitor_email}</p>}
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${m.status === "new" ? "bg-cta/10 text-cta" : "bg-secondary text-secondary-foreground"}`}>
                    {m.status}
                  </span>
                  <span className="text-xs text-muted-foreground">{new Date(m.created_at).toLocaleString()}</span>
                </div>
              </div>
              <p className="text-foreground">{m.message}</p>
            </div>
          )) : (
            <p className="text-center py-12 text-muted-foreground">No chat messages yet.</p>
          )}
        </div>
      )}
    </AdminLayout>
  );
}
