import { AdminLayout } from "@/components/layout/AdminLayout";
import { Users, Building2, MessageSquare, FileText } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

function useCount(table: "candidates" | "employer_inquiries" | "chat_messages" | "content") {
  return useQuery({
    queryKey: ["admin_count", table],
    queryFn: async () => {
      const { count, error } = await supabase.from(table).select("*", { count: "exact", head: true });
      if (error) throw error;
      return count || 0;
    },
  });
}

export default function AdminDashboard() {
  const candidates = useCount("candidates");
  const employers = useCount("employer_inquiries");
  const chat = useCount("chat_messages");
  const content = useCount("content");

  const stats = [
    { label: "Candidates", value: candidates.data, icon: Users, color: "text-primary" },
    { label: "Employer Inquiries", value: employers.data, icon: Building2, color: "text-accent" },
    { label: "Chat Messages", value: chat.data, icon: MessageSquare, color: "text-cta" },
    { label: "Content Articles", value: content.data, icon: FileText, color: "text-primary" },
  ];

  return (
    <AdminLayout>
      <h1 className="text-2xl font-extrabold text-foreground mb-8">Dashboard</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s) => (
          <div key={s.label} className="bg-card rounded-xl p-6 border border-border shadow-card">
            <s.icon className={`h-8 w-8 ${s.color} mb-3`} />
            <p className="text-3xl font-extrabold text-foreground">{s.value ?? "—"}</p>
            <p className="text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
